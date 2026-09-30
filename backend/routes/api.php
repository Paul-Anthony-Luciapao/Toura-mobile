<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ResortController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TouristSpotController;

Route::get('/test', fn () => response()->json(['message' => 'Laravel API is working!']));

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:10,1');

// Public: browsing resorts
Route::apiResource('resorts', ResortController::class)->only(['index', 'show']);

// Public: browsing tourist spots
Route::apiResource('tourist-spots', TouristSpotController::class)->only(['index', 'show']);

// Owner-only: managing resorts
Route::middleware(['auth:sanctum', 'owner'])->group(function () {
    Route::apiResource('resorts', ResortController::class)->only(['store', 'update', 'destroy']);
});

// Logged-in only (any role)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
});