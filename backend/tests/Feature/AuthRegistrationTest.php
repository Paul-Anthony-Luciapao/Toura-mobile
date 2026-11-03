<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthRegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_registration_saves_the_phone_number(): void
    {
        $response = $this->postJson('/api/v1/auth/register', [
            'name' => 'Test Traveler',
            'email' => 'traveler@example.com',
            'phone' => '+63 917 555 0000',
            'password' => 'password-123',
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('user.phone', '+63 917 555 0000');

        $this->assertDatabaseHas('users', [
            'email' => 'traveler@example.com',
            'phone' => '+63 917 555 0000',
        ]);
    }

    public function test_registration_requires_a_phone_number(): void
    {
        $this->postJson('/api/v1/auth/register', [
            'name' => 'Test Traveler',
            'email' => 'traveler@example.com',
            'password' => 'password-123',
        ])->assertUnprocessable()
          ->assertJsonValidationErrors('phone');
    }
}