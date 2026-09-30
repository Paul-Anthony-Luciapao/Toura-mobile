<?php

use App\Http\Controllers\Api\AccommodationController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\OfferController;
use App\Http\Controllers\Api\ResortController;
use App\Http\Controllers\Api\TouristSpotController;
use App\Http\Controllers\Api\BookingController;
use Illuminate\Support\Facades\Route;

Route::get('/test', function () {
    return response()->json([
        'message' => 'Laravel API is working!',
    ]);
});

Route::prefix('v1')->group(function () {

    // Public auth
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/login', [AuthController::class, 'login']);

    // Authenticated
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/auth/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);
    });

    // Public resort routes
    Route::get('/resorts', [ResortController::class, 'index']);
    Route::get('/resorts/{resort}', [ResortController::class, 'show']);

    // Authenticated resort management
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/resorts', [ResortController::class, 'store']);
        Route::put('/resorts/{resort}', [ResortController::class, 'update']);
        Route::patch('/resorts/{resort}', [ResortController::class, 'update']);
        Route::delete('/resorts/{resort}', [ResortController::class, 'destroy']);
    });

    // Accommodations
    Route::apiResource('accommodations', AccommodationController::class);

    // Offers
    Route::apiResource('offers', OfferController::class);

    // Tourist Spots
    Route::apiResource('tourist-spots', TouristSpotController::class);

    // Bookings
    Route::middleware('auth:sanctum')->group(function () {
        Route::apiResource('bookings', BookingController::class)->except(['destroy']);
    });
});