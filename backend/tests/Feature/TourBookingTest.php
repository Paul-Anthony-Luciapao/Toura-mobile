<?php

namespace Tests\Feature;

use App\Models\Order;
use App\Models\TourBooking;
use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Database\Seeders\TourPackageSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class TourBookingTest extends TestCase
{
    use RefreshDatabase;

    public function test_database_seeder_includes_tour_packages(): void
    {
        $this->seed(DatabaseSeeder::class);

        $this->assertDatabaseCount('tour_packages', 10);
        $this->assertDatabaseCount('itinerary_packages', 26);
    }

    public function test_tour_packages_are_public_and_seeded(): void
    {
        $this->seed(TourPackageSeeder::class);

        $this->getJson('/api/v1/tour-packages')
            ->assertOk()
            ->assertJsonCount(10)
            ->assertJsonFragment([
                'id' => 'tour-el-nido-a',
                'name' => 'El Nido Island Hopping Tour A',
                'price_type' => 'per_person',
            ]);
    }

    public function test_authenticated_traveler_can_book_and_get_a_server_calculated_total(): void
    {
        $this->seed(TourPackageSeeder::class);
        $user = User::factory()->create();

        $response = $this->actingAs($user, 'sanctum')->postJson(
            '/api/v1/tour-bookings',
            [
                'tour_package_id' => 'tour-el-nido-a',
                'tour_date' => now()->addDays(3)->toDateString(),
                'number_of_adults' => 2,
                'number_of_children' => 1,
                'pickup_location' => 'Hotel lobby',
                'special_requests' => 'Vegetarian lunch',
            ],
        );

        $response
            ->assertCreated()
            ->assertJsonPath('total_participants', 3)
            ->assertJsonPath('unit_price', '1500.00')
            ->assertJsonPath('total_amount', '4500.00')
            ->assertJsonPath('status', 'pending')
            ->assertJsonPath('tour_package.name', 'El Nido Island Hopping Tour A');

        $this->assertDatabaseHas('tour_bookings', [
            'user_id' => $user->id,
            'tour_package_id' => 'tour-el-nido-a',
            'total_amount' => 4500,
            'status' => 'pending',
        ]);
    }

    public function test_tour_booking_requires_at_least_one_participant(): void
    {
        $this->seed(TourPackageSeeder::class);
        $user = User::factory()->create();

        $this->actingAs($user, 'sanctum')
            ->postJson('/api/v1/tour-bookings', [
                'tour_package_id' => 'tour-el-nido-a',
                'tour_date' => now()->addDays(3)->toDateString(),
                'number_of_adults' => 0,
                'number_of_children' => 0,
            ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('number_of_adults');
    }

    public function test_tour_checkout_uses_the_booking_snapshot_total(): void
    {
        $this->seed(TourPackageSeeder::class);
        $user = User::factory()->create();
        $this->actingAs($user, 'sanctum')
            ->postJson('/api/v1/tour-bookings', [
                'tour_package_id' => 'tour-el-nido-a',
                'tour_date' => now()->addDays(3)->toDateString(),
                'number_of_adults' => 2,
                'number_of_children' => 1,
            ])
            ->assertCreated();
        $booking = TourBooking::firstOrFail();

        config([
            'services.paymongo.secret_key' => 'test-secret',
            'app.frontend_url' => 'https://example.test',
        ]);
        Http::fake([
            'https://api.paymongo.com/v2/checkout_sessions' => Http::response([
                'data' => [
                    'id' => 'cs_tour_test_123',
                    'attributes' => ['checkout_url' => 'https://checkout.example.test/session'],
                ],
            ]),
        ]);

        $this->postJson('/api/v1/payments/checkout', [
            'booking_id' => $booking->id,
            'booking_type' => 'tour',
            'payment_method_type' => 'card',
        ])
            ->assertOk()
            ->assertJsonPath('order_id', 1);

        Http::assertSent(fn ($request) => $request['data']['attributes']['line_items'][0]['amount'] === 450000
            && $request['data']['attributes']['reference_number'] === $booking->booking_reference
        );
    }

    public function test_tour_booking_expires_and_cannot_be_paid_after_deadline(): void
    {
        $this->seed(TourPackageSeeder::class);
        $user = User::factory()->create();
        $booking = TourBooking::create([
            'booking_reference' => 'TOURA-EXPIRE01',
            'user_id' => $user->id,
            'tour_package_id' => 'tour-el-nido-a',
            'tour_date' => now()->addDays(3)->toDateString(),
            'number_of_adults' => 1,
            'number_of_children' => 0,
            'total_participants' => 1,
            'unit_price' => 1500,
            'total_amount' => 1500,
            'pricing_snapshot' => ['total_amount' => 1500],
            'status' => 'pending',
            'expires_at' => now()->subMinute(),
        ]);

        $this->actingAs($user, 'sanctum')
            ->postJson('/api/v1/payments/checkout', [
                'booking_id' => $booking->id,
                'booking_type' => 'tour',
            ])
            ->assertConflict()
            ->assertJsonPath('code', 'booking_expired');

        $this->assertDatabaseHas('tour_bookings', [
            'id' => $booking->id,
            'status' => 'expired',
        ]);
    }

    public function test_tour_booking_cannot_be_cancelled_while_checkout_is_active(): void
    {
        $this->seed(TourPackageSeeder::class);
        $user = User::factory()->create();
        $booking = TourBooking::create([
            'booking_reference' => 'TOURA-ACTIVE01',
            'user_id' => $user->id,
            'tour_package_id' => 'tour-el-nido-a',
            'tour_date' => now()->addDays(3)->toDateString(),
            'number_of_adults' => 1,
            'number_of_children' => 0,
            'total_participants' => 1,
            'unit_price' => 1500,
            'total_amount' => 1500,
            'pricing_snapshot' => ['total_amount' => 1500],
            'status' => 'pending',
            'expires_at' => now()->addMinutes(30),
        ]);
        Order::create([
            'user_id' => $user->id,
            'total' => 1500,
            'reference_number' => $booking->booking_reference,
            'status' => 'pending',
            'payment_status' => 'pending',
            'paymongo_checkout_session_id' => 'cs_active_tour_123',
        ]);
        config(['services.paymongo.secret_key' => 'test-secret']);
        Http::fake([
            'https://api.paymongo.com/v1/checkout_sessions/cs_active_tour_123' => Http::response([
                'data' => [
                    'id' => 'cs_active_tour_123',
                    'attributes' => [
                        'reference_number' => $booking->booking_reference,
                        'payments' => [],
                        'status' => 'active',
                        'checkout_url' => 'https://checkout.example.test/active',
                    ],
                ],
            ]),
        ]);

        $this->actingAs($user, 'sanctum')
            ->deleteJson("/api/v1/tour-bookings/{$booking->id}")
            ->assertConflict();

        $this->assertDatabaseHas('tour_bookings', [
            'id' => $booking->id,
            'status' => 'pending',
        ]);
    }
}
