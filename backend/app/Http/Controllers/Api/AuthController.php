<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Password as PasswordBroker;

class AuthController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $request->merge(['email' => Str::lower(trim((string) $request->input('email')))]);

        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', Password::min(8)],
            'phone' => ['required', 'string', 'max:30'],
        ]);

        // Public signup is always a traveler. Owner/admin accounts never come from this endpoint.
        $user = new User($data);
        $user->role = 'traveler';
        $user->status = 'active';
        $user->save();

        return $this->tokenResponse($user, 201);
    }

    public function login(Request $request): JsonResponse
    {
        $request->merge(['email' => Str::lower(trim((string) $request->input('email')))]);

        $data = $request->validate([
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
            'role' => ['nullable', 'string', 'in:traveler,owner'],
        ]);

        $user = User::where('email', $data['email'])->first();

        if (! $user || ! Hash::check($data['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['These credentials do not match our records.'],
            ]);
        }

        if (! in_array($user->role, ['traveler', 'owner'], true)) {
            return response()->json([
            'message' => 'This account type is not supported.',
        ], 403);
        }

        if ($user->status !== 'active') {
            return response()->json(['message' => 'This account is not active.'], 403);
        }

        // Checked only after the password is verified, so it can't be used to probe accounts.
        if (isset($data['role']) && $user->role !== $data['role']) {
            return response()->json(
                ['message' => "This account is not registered as {$data['role']}."],
                403,
            );
        }

        return $this->tokenResponse($user);
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json(['user' => new UserResource($request->user())]);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out.']);
    }


public function deleteAccount(Request $request): JsonResponse
{
    $user = $request->user();

    // Remove all tokens for the user
    $user->tokens()->delete();

    // Delete the user record
    $user->delete();

    return response()->json([
        'message' => 'Account deleted successfully.',
    ]);
}

    private function tokenResponse(User $user, int $status = 200): JsonResponse
    {
        return response()->json([
            'user' => new UserResource($user),
            'token' => $user->createToken('toura-mobile')->plainTextToken,
        ], $status);
    }


public function forgotPassword(Request $request): JsonResponse
{
    $request->merge([
        'email' => Str::lower(trim((string) $request->input('email'))),
    ]);

    $data = $request->validate([
        'email' => ['required', 'string', 'email', 'max:255'],
    ]);

    PasswordBroker::sendResetLink([
        'email' => $data['email'],
    ]);

    // Same response whether or not this email belongs to an account.
    return response()->json([
        'message' => 'If an account exists for that email, a password reset link has been sent.',
    ]);
}

public function resetPassword(Request $request): JsonResponse
{
    $request->merge([
        'email' => Str::lower(trim((string) $request->input('email'))),
    ]);

    $data = $request->validate([
        'email' => ['required', 'string', 'email', 'max:255'],
        'token' => ['required', 'string'],
        'password' => [
            'required',
            'string',
            'confirmed',
            Password::min(8),
        ],
    ]);

    $status = PasswordBroker::reset(
        $data,
        function (User $user, string $password): void {
            $user->forceFill([
                'password' => $password,
                'remember_token' => Str::random(60),
            ])->save();

            // Invalidate every existing login token after a password reset.
            $user->tokens()->delete();
        },
    );

    if ($status === PasswordBroker::PASSWORD_RESET) {
        return response()->json([
            'message' => 'Your password has been reset. You can now log in.',
        ]);
    }

    return response()->json([
        'message' => 'This reset link is invalid or has expired.',
    ], 422);
}
}