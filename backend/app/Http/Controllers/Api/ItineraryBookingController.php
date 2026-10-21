<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ItineraryBooking;
use App\Models\ItineraryPackage;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class ItineraryBookingController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        return response()->json(
            $this->userBookings($request)
                ->with(['itineraryPackage', 'guests'])
                ->latest()
                ->get()
        );
    }

    public function show(Request $request, ItineraryBooking $booking): JsonResponse
    {
        // Return 404 rather than disclose that another user's booking exists.
        abort_unless($booking->user_id === $request->user()->id, 404);

        return response()->json(
            $booking->load(['itineraryPackage', 'guests'])
        );
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'itinerary_package_id' => 'required|string|exists:itinerary_packages,id',
            'arrival_date' => 'required|date_format:Y-m-d',
            'arrival_time' => 'nullable|date_format:H:i',
            'departure_date' => 'required|date_format:Y-m-d|after:arrival_date',
            'departure_time' => 'nullable|date_format:H:i',
            'guests' => 'required|array|min:1|max:20',
            'guests.*.first_name' => 'required|string|max:255',
            'guests.*.last_name' => 'required|string|max:255',
            'guests.*.date_of_birth' => 'required|date_format:Y-m-d|before_or_equal:today',
            'guests.*.phone' => 'nullable|string|max:40|required_without:guests.*.email',
            'guests.*.email' => 'nullable|email|max:255|required_without:guests.*.phone',
        ]);

        $package = ItineraryPackage::findOrFail($validated['itinerary_package_id']);
        $priceBreakdown = $package->price_breakdown;
        if (! is_array($priceBreakdown) || $priceBreakdown === []) {
            throw ValidationException::withMessages([
                'itinerary_package_id' => 'This itinerary package has no valid price.',
            ]);
        }

        // Derive the booking price from stored package data rather than trusting a client-calculated total.
        $totalPrice = 0.0;
        foreach ($priceBreakdown as $line) {
            if (
                ! is_array($line)
                || ! is_numeric($line['amount'] ?? null)
                || (float) $line['amount'] < 0
            ) {
                throw ValidationException::withMessages([
                    'itinerary_package_id' => 'This itinerary package has an invalid price breakdown.',
                ]);
            }
            $totalPrice += (float) $line['amount'];
        }

        if ($totalPrice <= 0) {
            throw ValidationException::withMessages([
                'itinerary_package_id' => 'This itinerary package has no valid price.',
            ]);
        }

        // Keep the reservation and its guest records atomic to avoid partial bookings.
        $booking = DB::transaction(function () use ($request, $validated, $totalPrice) {
            $booking = ItineraryBooking::create([
                'booking_reference' => 'TOURA-'.Str::upper(Str::random(8)),
                'user_id' => $request->user()->id,
                'itinerary_package_id' => $validated['itinerary_package_id'],
                'arrival_date' => $validated['arrival_date'],
                'arrival_time' => $validated['arrival_time'] ?? null,
                'departure_date' => $validated['departure_date'],
                'departure_time' => $validated['departure_time'] ?? null,
                'guest_count' => count($validated['guests']),
                'total_price' => $totalPrice,
                'status' => 'pending',
            ]);

            $booking->guests()->createMany($validated['guests']);

            return $booking;
        });

        return response()->json(
            $booking->load(['itineraryPackage', 'guests']),
            201,
        );
    }

    /**
     * @return Builder<ItineraryBooking>
     */
    private function userBookings(Request $request): Builder
    {
        return ItineraryBooking::query()->where('user_id', $request->user()->id);
    }

    public function destroy(Request $request, ItineraryBooking $booking): JsonResponse
    {
        // Match the read behavior so deletion cannot confirm another user's booking exists.
        abort_unless($booking->user_id === $request->user()->id, 404);
        $booking->delete();
        return response()->json(['message' => 'Itinerary deleted.']);
    }
}
