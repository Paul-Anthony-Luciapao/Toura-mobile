<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Accommodation;
use App\Models\Booking;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BookingController extends Controller
{
    public function index(Request $request)
    {
        return response()->json(
            Booking::where('user_id', $request->user()->id)->get()
        );
    }

    public function show(Request $request, string $id)
    {
        $booking = Booking::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        return response()->json($booking);
    }

    public function update(Request $request, string $id)
    {
        $booking = Booking::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $validated = $request->validate([
            'status' => 'required|in:cancelled',
        ]);

        $booking->update([
            'status' => $validated['status'],
        ]);

        return response()->json($booking);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'resort_id' => 'required|exists:resorts,id',
            'accommodation_id' => 'required|exists:accommodations,id',
            'check_in_date' => 'required|date',
            'check_in_time' => 'nullable|date_format:H:i',
            'check_out_date' => 'required|date|after:check_in_date',
            'guests_count' => 'required|integer|min:1|max:' . Accommodation::findOrFail($request->accommodation_id)->capacity,
            'bed_requirements' => 'nullable|string',
            'special_requests' => 'nullable|string',
        ]);

        $accommodation = Accommodation::findOrFail($validated['accommodation_id']);

        if ($accommodation->resort_id != $validated['resort_id']) {
            return response()->json([
                'message' => 'The selected accommodation does not belong to the selected resort.',
            ], 422);
        }        

        $overlappingBookings = Booking::where('accommodation_id', $accommodation->id)
            ->where('check_in_date', '<', $validated['check_out_date'])
            ->where('check_out_date', '>', $validated['check_in_date'])
            ->where('status', '!=', 'cancelled')
            ->count();

        if ($overlappingBookings >= $accommodation->available_units) {
            return response()->json([
                'message' => 'No accommodation units are available for the selected dates.',
            ], 409);
        }
        
        $nights = Carbon::parse($validated['check_in_date'])
            ->diffInDays(Carbon::parse($validated['check_out_date']));        

        $totalPrice = $accommodation->price_per_night * $nights; 

        $bookingReference = 'TOURA-' . Str::upper(Str::random(8)); 
        
        $booking = Booking::create([
            'booking_reference' => $bookingReference,
            'user_id' => $request->user()->id,
            'resort_id' => $validated['resort_id'],
            'accommodation_id' => $validated['accommodation_id'],
            'check_in_date' => $validated['check_in_date'],
            'check_in_time' => $validated['check_in_time'] ?? null,
            'check_out_date' => $validated['check_out_date'],
            'nights' => $nights,
            'guests_count' => $validated['guests_count'],
            'bed_requirements' => $validated['bed_requirements'] ?? null,
            'special_requests' => $validated['special_requests'] ?? null,
            'total_price' => $totalPrice,
            'status' => 'pending',
        ]);
        
        return response()->json($booking, 201);
    }
}