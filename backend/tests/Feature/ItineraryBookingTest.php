<?php

namespace Tests\Feature;

use App\Models\ItineraryBooking;
use App\Models\ItineraryPackage;
use App\Models\Order;
use App\Models\User;
use Database\Seeders\ItineraryPackageSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class ItineraryBookingTest extends TestCase
{
    use RefreshDatabase;

    public function test_itinerary_package_seeder_populates_mock_package_ids(): void
    {
        $this->seed(ItineraryPackageSeeder::class);

        $this->assertDatabaseCount('itinerary_packages', 26);
        $this->assertDatabaseHas('itinerary_packages', [
            'id' => 'spot-1',
            'title' => 'Kayangan Lake Itinerary Package',
        ]);
        $this->assertDatabaseHas('itinerary_packages', [
            'id' => 'spot-13',
            'title' => 'Lio Beach Itinerary Package',
        ]);
        $this->assertDatabaseMissing('itinerary_packages', ['id' => 'spot-7']);
        $this->assertDatabaseHas('itinerary_packages', [
            'id' => 'itinerary-01',
            'title' => 'El Nido Island Hopping Adventure',
        ]);

        $expectedPrices = [
            'itinerary-01' => 8500,
            'itinerary-02' => 5500,
            'itinerary-03' => 9000,
            'itinerary-04' => 15000,
            'itinerary-05' => 8000,
            'itinerary-06' => 12500,
            'itinerary-07' => 6000,
            'itinerary-08' => 18000,
            'itinerary-09' => 4500,
            'itinerary-10' => 6500,
            'itinerary-11' => 5000,
            'itinerary-12' => 7000,
            'itinerary-13' => 7500,
            'itinerary-14' => 28000,
            'itinerary-15' => 25000,
        ];

        foreach ($expectedPrices as $id => $expectedPrice) {
            $package = ItineraryPackage::findOrFail($id);
            $this->assertEquals(
                $expectedPrice,
                array_sum(array_column($package->price_breakdown, 'amount')),
            );
        }

        $this->getJson('/api/v1/itinerary-packages')
            ->assertOk()
            ->assertJsonCount(26);
    }

    public function test_authenticated_traveler_can_book_a_new_itinerary_package_at_its_listed_price(): void
    {
        $this->seed(ItineraryPackageSeeder::class);
        $user = User::factory()->create();

        $this->actingAs($user, 'sanctum')
            ->postJson('/api/v1/itinerary-bookings', [
                'itinerary_package_id' => 'itinerary-01',
                'arrival_date' => now()->addDays(2)->toDateString(),
                'departure_date' => now()->addDays(5)->toDateString(),
                'guests' => [
                    [
                        'first_name' => 'Alex',
                        'last_name' => 'Reyes',
                        'date_of_birth' => '1995-06-10',
                        'phone' => '+639175550000',
                        'email' => null,
                    ],
                ],
            ])
            ->assertCreated()
            ->assertJsonPath('itinerary_package_id', 'itinerary-01')
            ->assertJsonPath('total_price', '8500.00');
    }

    public function test_per_group_itinerary_price_requires_the_listed_group_size(): void
    {
        $this->seed(ItineraryPackageSeeder::class);
        $user = User::factory()->create();
        $payload = [
            'itinerary_package_id' => 'itinerary-04',
            'arrival_date' => now()->addDays(2)->toDateString(),
            'departure_date' => now()->addDays(5)->toDateString(),
            'guests' => [
                [
                    'first_name' => 'Alex',
                    'last_name' => 'Reyes',
                    'date_of_birth' => '1995-06-10',
                    'phone' => '+639175550000',
                    'email' => null,
                ],
                [
                    'first_name' => 'Sam',
                    'last_name' => 'Reyes',
                    'date_of_birth' => '1996-07-11',
                    'phone' => '+639175550001',
                    'email' => null,
                ],
            ],
        ];

        $this->actingAs($user, 'sanctum')
            ->postJson('/api/v1/itinerary-bookings', [
                ...$payload,
                'guests' => [$payload['guests'][0]],
            ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('guests');

        $this->postJson('/api/v1/itinerary-bookings', $payload)
            ->assertCreated()
            ->assertJsonPath('total_price', '15000.00')
            ->assertJsonPath('price_type', 'per_group')
            ->assertJsonPath('guest_count', 2);
    }

    public function test_authenticated_traveler_can_create_an_itinerary_booking(): void
    {
        $user = User::factory()->create();
        $arrivalDate = now()->addDays(10);
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
                'arrival_date' => now()->addDays(2)->toDateString(),
                'arrival_time' => '09:30',
                'departure_date' => now()->addDays(6)->toDateString(),
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

    public function test_user_cannot_create_overlapping_booking_for_same_package(): void
    {
        $user = User::factory()->create();
        $arrivalDate = now()->addDays(10);
        $package = ItineraryPackage::create([
            'id' => 'spot-duplicate-test',
            'title' => 'Duplicate test package',
            'days' => [],
            'price_breakdown' => [['label' => 'Package', 'amount' => 1000]],
        ]);
        $bookingPayload = [
            'itinerary_package_id' => $package->id,
            'arrival_date' => $arrivalDate->toDateString(),
            'departure_date' => $arrivalDate->copy()->addDays(4)->toDateString(),
            'guests' => [
                [
                    'first_name' => 'Alex',
                    'last_name' => 'Reyes',
                    'date_of_birth' => '1995-06-10',
                    'phone' => '+639175550000',
                    'email' => null,
                ],
            ],
        ];

        $this->actingAs($user, 'sanctum')
            ->postJson('/api/v1/itinerary-bookings', $bookingPayload)
            ->assertCreated();

        $this->postJson('/api/v1/itinerary-bookings', [
            ...$bookingPayload,
            'arrival_date' => $arrivalDate->copy()->addDays(2)->toDateString(),
            'departure_date' => $arrivalDate->copy()->addDays(6)->toDateString(),
        ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('itinerary_package_id');

        $this->assertDatabaseCount('itinerary_bookings', 1);
    }

    public function test_user_can_book_same_package_for_non_overlapping_dates(): void
    {
        $user = User::factory()->create();
        $arrivalDate = now()->addDays(10);
        $package = ItineraryPackage::create([
            'id' => 'spot-non-overlap-test',
            'title' => 'Non-overlap test package',
            'days' => [],
            'price_breakdown' => [['label' => 'Package', 'amount' => 1000]],
        ]);
        $bookingPayload = [
            'itinerary_package_id' => $package->id,
            'arrival_date' => $arrivalDate->toDateString(),
            'departure_date' => $arrivalDate->copy()->addDays(4)->toDateString(),
            'guests' => [
                [
                    'first_name' => 'Alex',
                    'last_name' => 'Reyes',
                    'date_of_birth' => '1995-06-10',
                    'phone' => '+639175550000',
                    'email' => null,
                ],
            ],
        ];

        $this->actingAs($user, 'sanctum')
            ->postJson('/api/v1/itinerary-bookings', $bookingPayload)
            ->assertCreated();

        $this->postJson('/api/v1/itinerary-bookings', [
            ...$bookingPayload,
            'arrival_date' => $arrivalDate->copy()->addDays(5)->toDateString(),
            'departure_date' => $arrivalDate->copy()->addDays(8)->toDateString(),
        ])->assertCreated();

        $this->assertDatabaseCount('itinerary_bookings', 2);
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

    public function test_my_itineraries_confirms_bookings_with_a_paid_order(): void
    {
        $user = User::factory()->create();
        $package = ItineraryPackage::create([
            'id' => 'spot-paid',
            'title' => 'Paid itinerary package',
            'days' => [],
            'price_breakdown' => [['label' => 'Package', 'amount' => 1000]],
        ]);
        $booking = ItineraryBooking::create([
            'booking_reference' => 'TOURA-PAID-BOOKING',
            'user_id' => $user->id,
            'itinerary_package_id' => $package->id,
            'arrival_date' => '2026-11-01',
            'departure_date' => '2026-11-02',
            'guest_count' => 1,
            'total_price' => 1000,
            'status' => 'pending',
        ]);
        Order::create([
            'user_id' => $user->id,
            'total' => 1000,
            'reference_number' => $booking->booking_reference,
            'status' => 'paid',
            'payment_status' => 'paid',
        ]);

        $this->actingAs($user, 'sanctum')
            ->getJson('/api/v1/itinerary-bookings')
            ->assertOk()
            ->assertJsonPath('0.status', 'confirmed');

        $this->assertDatabaseHas('itinerary_bookings', [
            'id' => $booking->id,
            'status' => 'confirmed',
        ]);
    }

    public function test_my_itineraries_verifies_pending_checkout_with_paymongo(): void
    {
        config(['services.paymongo.secret_key' => 'sk_test_secret']);
        Http::fake([
            'https://api.paymongo.com/v1/checkout_sessions/cs_test_itinerary' => Http::response([
                'data' => [
                    'id' => 'cs_test_itinerary',
                    'attributes' => [
                        'reference_number' => 'TOURA-PENDING-SESSION',
                        'payments' => [
                            [
                                'attributes' => [
                                    'status' => 'paid',
                                ],
                            ],
                        ],
                    ],
                ],
            ]),
        ]);

        $user = User::factory()->create();
        $package = ItineraryPackage::create([
            'id' => 'spot-pending-session',
            'title' => 'Paid itinerary package',
            'days' => [],
            'price_breakdown' => [['label' => 'Package', 'amount' => 1000]],
        ]);
        $booking = ItineraryBooking::create([
            'booking_reference' => 'TOURA-PENDING-SESSION',
            'user_id' => $user->id,
            'itinerary_package_id' => $package->id,
            'arrival_date' => '2026-11-01',
            'departure_date' => '2026-11-02',
            'guest_count' => 1,
            'total_price' => 1000,
            'status' => 'pending',
        ]);
        Order::create([
            'user_id' => $user->id,
            'total' => 1000,
            'reference_number' => $booking->booking_reference,
            'paymongo_checkout_session_id' => 'cs_test_itinerary',
            'status' => 'pending',
            'payment_status' => 'pending',
        ]);

        $this->actingAs($user, 'sanctum')
            ->getJson('/api/v1/itinerary-bookings')
            ->assertOk()
            ->assertJsonPath('0.status', 'confirmed');

        $this->assertDatabaseHas('orders', [
            'reference_number' => $booking->booking_reference,
            'status' => 'paid',
            'payment_status' => 'paid',
        ]);
    }

    public function test_booking_details_confirm_booking_with_a_paid_order(): void
    {
        $user = User::factory()->create();
        $package = ItineraryPackage::create([
            'id' => 'spot-paid-detail',
            'title' => 'Paid itinerary package',
            'days' => [],
            'price_breakdown' => [['label' => 'Package', 'amount' => 1000]],
        ]);
        $booking = ItineraryBooking::create([
            'booking_reference' => 'TOURA-PAID-DETAIL',
            'user_id' => $user->id,
            'itinerary_package_id' => $package->id,
            'arrival_date' => '2026-11-01',
            'departure_date' => '2026-11-02',
            'guest_count' => 1,
            'total_price' => 1000,
            'status' => 'pending',
        ]);
        Order::create([
            'user_id' => $user->id,
            'total' => 1000,
            'reference_number' => $booking->booking_reference,
            'status' => 'paid',
            'payment_status' => 'paid',
        ]);

        $this->actingAs($user, 'sanctum')
            ->getJson("/api/v1/itinerary-bookings/{$booking->id}")
            ->assertOk()
            ->assertJsonPath('status', 'confirmed');

        $this->assertDatabaseHas('itinerary_bookings', [
            'id' => $booking->id,
            'status' => 'confirmed',
        ]);
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
