<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ResortController;
use Illuminate\Support\Facades\Route;

Route::get('/test', fn () => response()->json(['message' => 'Laravel API is working!']));

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:10,1');

// Public: browsing resorts
Route::apiResource('resorts', ResortController::class)->only(['index', 'show']);

// Logged-in only
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::apiResource('resorts', ResortController::class)->except(['index', 'show']);
});