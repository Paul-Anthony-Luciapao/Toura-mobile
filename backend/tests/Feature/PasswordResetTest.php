<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Auth\Notifications\ResetPassword as ResetPasswordNotification;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Password;
use Tests\TestCase;

class PasswordResetTest extends TestCase
{
    use RefreshDatabase;

    public function test_forgot_password_sends_a_reset_notification(): void
    {
        Notification::fake();

        $user = User::factory()->create([
            'email' => 'traveler@example.com',
        ]);

        $response = $this->postJson('/api/v1/auth/forgot-password', [
            'email' => $user->email,
        ]);

        $response
            ->assertOk()
            ->assertJson([
                'message' => 'If an account exists for that email, a password reset link has been sent.',
            ]);

        Notification::assertSentTo(
            $user,
            ResetPasswordNotification::class,
        );
    }

    public function test_valid_reset_token_changes_password(): void
    {
        $user = User::factory()->create([
            'email' => 'traveler@example.com',
            'password' => 'old-password',
        ]);

        $token = Password::createToken($user);

        $response = $this->postJson('/api/v1/auth/reset-password', [
            'email' => $user->email,
            'token' => $token,
            'password' => 'new-password-123',
            'password_confirmation' => 'new-password-123',
        ]);

        $response->assertOk();

        $this->assertTrue(
            Hash::check('new-password-123', $user->fresh()->password),
        );
    }

    public function test_unknown_email_gets_the_same_forgot_password_response(): void
    {
        Notification::fake();

        $registered = $this->postJson('/api/v1/auth/forgot-password', [
            'email' => 'registered@example.com',
        ]);

        $unknown = $this->postJson('/api/v1/auth/forgot-password', [
            'email' => 'unknown@example.com',
        ]);

        $this->assertSame($registered->status(), $unknown->status());
        $this->assertSame($registered->json(), $unknown->json());
    }
}