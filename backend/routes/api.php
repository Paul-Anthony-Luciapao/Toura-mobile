
<?php

use App\Http\Controllers\Api\AccommodationController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\ItineraryBookingController;
use App\Http\Controllers\Api\ItineraryPackageController;
use App\Http\Controllers\Api\OfferController;
use App\Http\Controllers\Api\ResortController;
use App\Http\Controllers\Api\TouristSpotController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\WebhookController;
use Illuminate\Support\Facades\Route;

Route::get('/test', fn () => response()->json([
    'message' => 'Laravel API is working!'
]));

Route::prefix('v1')->group(function () {

    // Public auth
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/login', [AuthController::class, 'login'])
        ->middleware('throttle:10,1');

    Route::post('/auth/forgot-password', [AuthController::class, 'forgotPassword'])
        ->middleware('throttle:3,1');

    Route::post('/auth/reset-password', [AuthController::class, 'resetPassword'])
        ->middleware('throttle:5,1');

    // Public browsing
    Route::get('/resorts', [ResortController::class, 'index']);
    Route::get('/resorts/{resort}', [ResortController::class, 'show']);

    Route::get('/accommodations', [AccommodationController::class, 'index']);
    Route::get('/accommodations/{accommodation}', [AccommodationController::class, 'show']);

    Route::get('/offers', [OfferController::class, 'index']);
    Route::get('/offers/{offer}', [OfferController::class, 'show']);

    Route::apiResource('tourist-spots', TouristSpotController::class)
        ->only(['index', 'show']);

    Route::get('/itinerary-packages', [ItineraryPackageController::class, 'index']);
     // PayMongo webhook (public, no auth)
     Route::post('/webhooks/paymongo', [WebhookController::class, 'paymongo']);


    Route::get('/itinerary-packages/{id}', [ItineraryPackageController::class, 'show']);

    // Any logged-in user
    Route::middleware('auth:sanctum')->group(function () {

        // Authentication
        Route::post('/auth/logout', [AuthController::class, 'logout']);
        Route::delete('/auth/account', [AuthController::class, 'deleteAccount']);
        Route::get('/me', [AuthController::class, 'me']);

        // Bookings
        Route::apiResource('bookings', BookingController::class)
            ->except(['destroy']);

        // Tourist spot management
        Route::apiResource('tourist-spots', TouristSpotController::class)
            ->only(['store', 'update', 'destroy']);

        // Accommodation management
        Route::post('/accommodations', [AccommodationController::class, 'store']);

        Route::match(
            ['put', 'patch'],
            '/accommodations/{accommodation}',
            [AccommodationController::class, 'update']
        );

        Route::delete(
            '/accommodations/{accommodation}',
            [AccommodationController::class, 'destroy']
        );

        // Offer management
        Route::post('/offers', [OfferController::class, 'store']);

        Route::match(
            ['put', 'patch'],
            '/offers/{offer}',
            [OfferController::class, 'update']
        );

        Route::delete('/offers/{offer}', [OfferController::class, 'destroy']);

        // Itinerary bookings
        Route::post('/itinerary-bookings', [ItineraryBookingController::class, 'store']);
        Route::get('/itinerary-bookings', [ItineraryBookingController::class, 'index']);
        Route::get('/itinerary-bookings/{booking}', [ItineraryBookingController::class, 'show']);

        Route::delete(
            '/itinerary-bookings/{booking}',
            [ItineraryBookingController::class, 'destroy']
        );

        // Payment checkout
        Route::post(
            '/payments/checkout',
            [PaymentController::class, 'createCheckout']
        );
    });

    // Owner-only resort management
    Route::middleware(['auth:sanctum', 'owner'])->group(function () {

        Route::post('/resorts', [ResortController::class, 'store']);

        Route::match(
            ['put', 'patch'],
            '/resorts/{resort}',
            [ResortController::class, 'update']
        );

        Route::delete('/resorts/{resort}', [ResortController::class, 'destroy']);
    });

});
