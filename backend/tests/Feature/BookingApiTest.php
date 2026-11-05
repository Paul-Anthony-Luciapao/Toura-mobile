<?php

namespace Tests\Feature;

use App\Models\Accommodation;
use App\Models\Booking;
use App\Models\Resort;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BookingApiTest extends TestCase
{
    use RefreshDatabase;

    private function createAccommodation(
        User $owner,
        int $capacity = 4,
        int $availableUnits = 2
    ): array {
        $resort = Resort::create([
            'owner_id' => $owner->id,
            'name' => 'Test Resort',
            'municipality' => 'Cebu City',
            'location' => 'Cebu, Philippines',
            'description' => 'Test resort description',
            'base_price' => 1000,
        ]);

        $accommodation = Accommodation::create([
            'resort_id' => $resort->id,
            'title' => 'Deluxe Room',
            'price_per_night' => 2000,
            'capacity' => $capacity,
            'bed_type' => 'Queen',
            'bed_count' => 1,
            'available_units' => $availableUnits,
        ]);

        return [$resort, $accommodation];
    }

    private function bookingPayload(Resort $resort, Accommodation $accommodation): array
    {
        return [
            'resort_id' => $resort->id,
            'accommodation_id' => $accommodation->id,
            'check_in_date' => now()->addDays(5)->toDateString(),
            'check_out_date' => now()->addDays(7)->toDateString(),
            'guests_count' => 2,
        ];
    }

    public function test_authenticated_user_can_create_booking(): void
    {
        $user = User::factory()->create();
        [$resort, $accommodation] = $this->createAccommodation($user);

        $response = $this->actingAs($user, 'sanctum')
            ->postJson('/api/v1/bookings', $this->bookingPayload($resort, $accommodation));

        $response->assertCreated()
            ->assertJsonPath('user_id', $user->id)
            ->assertJsonPath('nights', 2)
            ->assertJsonPath('total_price', 4000)
            ->assertJsonPath('status', 'pending');

        $this->assertDatabaseHas('bookings', [
            'user_id' => $user->id,
            'resort_id' => $resort->id,
            'accommodation_id' => $accommodation->id,
        ]);
    }

    public function test_unauthenticated_user_cannot_create_booking(): void
    {
        $user = User::factory()->create();
        [$resort, $accommodation] = $this->createAccommodation($user);

        $response = $this->postJson(
            '/api/v1/bookings',
            $this->bookingPayload($resort, $accommodation)
        );

        $response->assertUnauthorized();
    }

    public function test_booking_rejects_guests_exceeding_capacity(): void
    {
        $user = User::factory()->create();
        [$resort, $accommodation] = $this->createAccommodation($user, 2);

        $payload = $this->bookingPayload($resort, $accommodation);
        $payload['guests_count'] = 3;

        $response = $this->actingAs($user, 'sanctum')
            ->postJson('/api/v1/bookings', $payload);

        $response->assertUnprocessable()
            ->assertJsonValidationErrors('guests_count');
    }

    public function test_booking_rejects_accommodation_from_another_resort(): void
    {
        $user = User::factory()->create();

        [$resort, $accommodation] = $this->createAccommodation($user);

        $anotherResort = Resort::create([
            'owner_id' => $user->id,
            'name' => 'Another Resort',
            'municipality' => 'Mandaue City',
            'location' => 'Cebu, Philippines',
            'description' => 'Another test resort',
            'base_price' => 1500,
        ]);

        $payload = $this->bookingPayload($anotherResort, $accommodation);

        $response = $this->actingAs($user, 'sanctum')
            ->postJson('/api/v1/bookings', $payload);

        $response->assertUnprocessable()
            ->assertJsonValidationErrors('accommodation_id');
    }

    public function test_booking_rejects_overlapping_reservation_when_units_are_full(): void
    {
        $user = User::factory()->create();
        [$resort, $accommodation] = $this->createAccommodation($user, 4, 1);

        $payload = $this->bookingPayload($resort, $accommodation);

        Booking::create([
            'booking_reference' => 'TOURA-EXISTING1',
            'user_id' => $user->id,
            'resort_id' => $resort->id,
            'accommodation_id' => $accommodation->id,
            'check_in_date' => $payload['check_in_date'],
            'check_out_date' => $payload['check_out_date'],
            'nights' => 2,
            'guests_count' => 2,
            'total_price' => 4000,
            'status' => 'confirmed',
        ]);

        $response = $this->actingAs($user, 'sanctum')
            ->postJson('/api/v1/bookings', $payload);

        $response->assertStatus(409);
    }

    public function test_user_can_only_view_their_own_bookings(): void
    {
        $owner = User::factory()->create();
        $anotherUser = User::factory()->create();

        [$resort, $accommodation] = $this->createAccommodation($owner);

        $booking = Booking::create([
            'booking_reference' => 'TOURA-PRIVATE01',
            'user_id' => $owner->id,
            'resort_id' => $resort->id,
            'accommodation_id' => $accommodation->id,
            'check_in_date' => now()->addDays(5)->toDateString(),
            'check_out_date' => now()->addDays(7)->toDateString(),
            'nights' => 2,
            'guests_count' => 2,
            'total_price' => 4000,
            'status' => 'pending',
        ]);

        $response = $this->actingAs($anotherUser, 'sanctum')
            ->getJson("/api/v1/bookings/{$booking->id}");

        $response->assertNotFound();
    }

    public function test_user_can_cancel_their_own_booking(): void
    {
        $user = User::factory()->create();
        [$resort, $accommodation] = $this->createAccommodation($user);

        $booking = Booking::create([
            'booking_reference' => 'TOURA-CANCEL01',
            'user_id' => $user->id,
            'resort_id' => $resort->id,
            'accommodation_id' => $accommodation->id,
            'check_in_date' => now()->addDays(5)->toDateString(),
            'check_out_date' => now()->addDays(7)->toDateString(),
            'nights' => 2,
            'guests_count' => 2,
            'total_price' => 4000,
            'status' => 'pending',
        ]);

        $response = $this->actingAs($user, 'sanctum')
            ->patchJson("/api/v1/bookings/{$booking->id}", [
                'status' => 'cancelled',
            ]);

        $response->assertOk()
            ->assertJsonPath('status', 'cancelled');

        $this->assertDatabaseHas('bookings', [
            'id' => $booking->id,
            'status' => 'cancelled',
        ]);
    }
}