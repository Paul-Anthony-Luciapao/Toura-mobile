<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ChangePasswordTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_change_password_with_the_current_password(): void
    {
        $user = User::factory()->create(['password' => 'old-password']);
        $currentToken = $user->createToken('current-device');
        $otherToken = $user->createToken('other-device');

        $this->withToken($currentToken->plainTextToken)
            ->postJson('/api/v1/auth/change-password', [
                'current_password' => 'old-password',
                'password' => 'new-password',
                'password_confirmation' => 'new-password',
            ])
            ->assertOk()
            ->assertJson(['message' => 'Your password has been changed.']);

        $this->assertTrue(password_verify('new-password', $user->fresh()->password));
        $this->assertDatabaseHas('personal_access_tokens', ['id' => $currentToken->accessToken->id]);
        $this->assertDatabaseMissing('personal_access_tokens', ['id' => $otherToken->accessToken->id]);
    }

    public function test_change_password_rejects_an_incorrect_current_password(): void
    {
        $user = User::factory()->create(['password' => 'old-password']);

        $this->actingAs($user, 'sanctum')
            ->postJson('/api/v1/auth/change-password', [
                'current_password' => 'wrong-password',
                'password' => 'new-password',
                'password_confirmation' => 'new-password',
            ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('current_password');

        $this->assertTrue(password_verify('old-password', $user->fresh()->password));
    }

    public function test_change_password_requires_confirmation_and_a_new_password(): void
    {
        $user = User::factory()->create(['password' => 'old-password']);

        $this->actingAs($user, 'sanctum')
            ->postJson('/api/v1/auth/change-password', [
                'current_password' => 'old-password',
                'password' => 'short',
                'password_confirmation' => 'different',
            ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('password');
    }

    public function test_change_password_requires_authentication(): void
    {
        $this->postJson('/api/v1/auth/change-password', [
            'current_password' => 'old-password',
            'password' => 'new-password',
            'password_confirmation' => 'new-password',
        ])->assertUnauthorized();
    }
}
