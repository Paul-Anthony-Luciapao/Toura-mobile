<?php

namespace Tests\Feature;

use App\Models\ItineraryBooking;
use App\Models\ItineraryPackage;
use App\Models\User;
use Database\Seeders\ItineraryPackageSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ItineraryBookingTest extends TestCase
{
    use RefreshDatabase;

    public function test_itinerary_package_seeder_populates_mock_package_ids(): void
    {
        $this->seed(ItineraryPackageSeeder::class);

        $this->assertDatabaseCount('itinerary_packages', 11);
        $this->assertDatabaseHas('itinerary_packages', [
            'id' => 'spot-1',
            'title' => 'Kayangan Lake Itinerary Package',
        ]);
        $this->assertDatabaseHas('itinerary_packages', [
            'id' => 'spot-13',
            'title' => 'Lio Beach Itinerary Package',
        ]);
        $this->assertDatabaseMissing('itinerary_packages', ['id' => 'spot-7']);

        $this->getJson('/api/v1/itinerary-packages')
            ->assertOk()
            ->assertJsonCount(11);
    }

    public function test_authenticated_traveler_can_create_an_itinerary_booking(): void
    {
        $user = User::factory()->create();
        $package = ItineraryPackage::create([
            'id' => 'spot-13',
            'title' => 'Lio Beach Itinerary Package',
            'days' => [['id' => 'day-1', 'title' => 'Arrival', 'notes' => []]],
            'price_breakdown' => [
                ['label' => 'Stay', 'amount' => 5000],
                ['label' => 'Tours', 'amount' => 1200],
            ],
        ]);

        $response = $this->actingAs($user, 'sanctum')->postJson(
            '/api/v1/itinerary-bookings',
            [
                'itinerary_package_id' => $package->id,
                'arrival_date' => '2026-11-01',
                'arrival_time' => '09:30',
                'departure_date' => '2026-11-05',
                'departure_time' => '17:00',
                'guests' => [
                    [
                        'first_name' => 'Alex',
                        'last_name' => 'Reyes',
                        'date_of_birth' => '1995-06-10',
                        'phone' => '+639175550000',
                        'email' => null,
                    ],
                ],
            ],
        );

        $response
            ->assertCreated()
            ->assertJsonPath('itinerary_package_id', 'spot-13')
            ->assertJsonPath('guest_count', 1)
            ->assertJsonPath('total_price', '6200.00')
            ->assertJsonPath('status', 'pending')
            ->assertJsonCount(1, 'guests');

        $this->assertDatabaseHas('itinerary_bookings', [
            'user_id' => $user->id,
            'itinerary_package_id' => 'spot-13',
            'total_price' => 6200,
        ]);
        $this->assertDatabaseHas('itinerary_booking_guests', [
            'first_name' => 'Alex',
            'last_name' => 'Reyes',
        ]);
    }

    public function test_a_traveler_cannot_read_another_users_itinerary_booking(): void
    {
        $owner = User::factory()->create();
        $otherUser = User::factory()->create();
        $package = ItineraryPackage::create([
            'id' => 'spot-1',
            'title' => 'Kayangan Lake Package',
            'days' => [],
            'price_breakdown' => [['label' => 'Package', 'amount' => 1000]],
        ]);
        $booking = ItineraryBooking::create([
            'booking_reference' => 'TOURA-TEST0001',
            'user_id' => $owner->id,
            'itinerary_package_id' => $package->id,
            'arrival_date' => '2026-11-01',
            'departure_date' => '2026-11-02',
            'guest_count' => 1,
            'total_price' => 1000,
            'status' => 'pending',
        ]);

        $this->actingAs($otherUser, 'sanctum')
            ->getJson("/api/v1/itinerary-bookings/{$booking->id}")
            ->assertNotFound();
    }

    public function test_booking_requires_contact_details_for_each_guest(): void
    {
        $user = User::factory()->create();
        $package = ItineraryPackage::create([
            'id' => 'spot-1',
            'title' => 'Kayangan Lake Package',
            'days' => [],
            'price_breakdown' => [['label' => 'Package', 'amount' => 1000]],
        ]);

        $this->actingAs($user, 'sanctum')
            ->postJson('/api/v1/itinerary-bookings', [
                'itinerary_package_id' => $package->id,
                'arrival_date' => '2026-11-01',
                'departure_date' => '2026-11-02',
                'guests' => [
                    [
                        'first_name' => 'Alex',
                        'last_name' => 'Reyes',
                        'date_of_birth' => '1995-06-10',
                        'phone' => null,
                        'email' => null,
                    ],
                ],
            ])
            ->assertUnprocessable();

        $this->assertDatabaseCount('itinerary_bookings', 0);
    }
}
