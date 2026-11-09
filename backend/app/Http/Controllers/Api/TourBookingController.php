<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\TourBooking;
use App\Models\TourPackage;
use App\Services\PaymongoPaymentVerifier;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use RuntimeException;

class TourBookingController extends Controller
{
    public function index(
        Request $request,
        PaymongoPaymentVerifier $paymentVerifier
    ): JsonResponse {
        $this->syncPaidBookings($request, $paymentVerifier);
        TourBooking::query()
            ->where('user_id', $request->user()->id)
            ->where('status', 'pending')
            ->whereNotNull('expires_at')
            ->where('expires_at', '<=', now())
            ->update(['status' => 'expired']);

        return response()->json(
            TourBooking::query()
                ->where('user_id', $request->user()->id)
                ->with('tourPackage')
                ->latest()
                ->get()
        );
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'tour_package_id' => 'required|string|exists:tour_packages,id',
            'tour_date' => 'required|date_format:Y-m-d|after_or_equal:today',
            'number_of_adults' => 'required|integer|min:0|max:20',
            'number_of_children' => 'required|integer|min:0|max:20',
            'pickup_location' => 'nullable|string|max:255',
            'special_requests' => 'nullable|string|max:2000',
        ]);

        $participantCount = $validated['number_of_adults'] + $validated['number_of_children'];
        if ($participantCount < 1 || $participantCount > 20) {
            throw ValidationException::withMessages([
                'number_of_adults' => 'A tour booking must include between 1 and 20 participants.',
            ]);
        }

        $booking = DB::transaction(function () use ($request, $validated, $participantCount) {
            $package = TourPackage::whereKey($validated['tour_package_id'])
                ->lockForUpdate()
                ->firstOrFail();

            if (
                $package->max_participants !== null
                && $participantCount > $package->max_participants
            ) {
                throw ValidationException::withMessages([
                    'number_of_adults' => 'The participant count exceeds this tour’s maximum.',
                ]);
            }

            $unitPrice = (float) $package->price;
            if ($unitPrice <= 0 || $package->price_type !== 'per_person') {
                throw ValidationException::withMessages([
                    'tour_package_id' => 'This tour does not have a valid per-person price.',
                ]);
            }

            $totalAmount = $unitPrice * $participantCount;
            $booking = TourBooking::create([
                'booking_reference' => 'TOURA-'.Str::upper(Str::random(8)),
                'user_id' => $request->user()->id,
                'tour_package_id' => $package->id,
                'tour_date' => $validated['tour_date'],
                'number_of_adults' => $validated['number_of_adults'],
                'number_of_children' => $validated['number_of_children'],
                'total_participants' => $participantCount,
                'pickup_location' => $validated['pickup_location'] ?? null,
                'special_requests' => $validated['special_requests'] ?? null,
                'unit_price' => $unitPrice,
                'total_amount' => $totalAmount,
                'pricing_snapshot' => [
                    'package_name' => $package->name,
                    'price_type' => $package->price_type,
                    'unit_price' => $unitPrice,
                    'participant_count' => $participantCount,
                    'total_amount' => $totalAmount,
                ],
                'status' => 'pending',
                'payment_status' => 'pending',
                'expires_at' => now()->addMinutes(30),
            ]);

            return $booking;
        });

        return response()->json(
            $booking->load('tourPackage'),
            201,
        );
    }

    public function show(
        Request $request,
        TourBooking $booking,
        PaymongoPaymentVerifier $paymentVerifier
    ): JsonResponse {
        abort_unless($booking->user_id === $request->user()->id, 404);
        $this->syncPaidBookings($request, $paymentVerifier, $booking->booking_reference);
        $this->expireIfDue($booking);

        return response()->json($booking->refresh()->load('tourPackage'));
    }

    public function destroy(
        Request $request,
        TourBooking $booking,
        PaymongoPaymentVerifier $paymentVerifier
    ): JsonResponse {
        abort_unless($booking->user_id === $request->user()->id, 404);
        $this->expireIfDue($booking);
        abort_unless($booking->status === 'pending', 409, 'Only pending bookings can be cancelled.');

        $order = Order::query()
            ->where('reference_number', $booking->booking_reference)
            ->first();

        if ($order !== null) {
            if ($order->payment_status === 'paid') {
                abort(409, 'Paid bookings cannot be cancelled here.');
            }

            if ($order->paymongo_checkout_session_id !== null) {
                try {
                    $activeCheckoutUrl = $paymentVerifier->reusableCheckoutUrl($order);
                } catch (RuntimeException $exception) {
                    Log::warning('Could not verify checkout before cancelling tour booking.', [
                        'order_id' => $order->id,
                        'message' => $exception->getMessage(),
                    ]);

                    return response()->json([
                        'message' => 'Payment status could not be verified. Try cancelling again later.',
                    ], 503);
                }

                $booking->refresh();
                abort_unless($booking->status === 'pending', 409, 'Paid bookings cannot be cancelled here.');
                abort_if($activeCheckoutUrl !== null, 409, 'Complete or close the active payment checkout before cancelling.');
            }
        }

        $booking->update(['status' => 'cancelled']);

        return response()->json($booking->refresh()->load('tourPackage'));
    }

    private function expireIfDue(TourBooking $booking): void
    {
        if (
            $booking->status === 'pending'
            && $booking->expires_at !== null
            && $booking->expires_at->isPast()
        ) {
            $booking->update(['status' => 'expired']);
        }
    }

    private function syncPaidBookings(
        Request $request,
        PaymongoPaymentVerifier $paymentVerifier,
        ?string $bookingReference = null,
    ): void {
        $orders = Order::query()
            ->where('user_id', $request->user()->id)
            ->where('payment_status', '!=', 'paid')
            ->whereNotNull('paymongo_checkout_session_id');

        if ($bookingReference !== null) {
            $orders->where('reference_number', $bookingReference);
        }

        foreach ($orders->get() as $order) {
            try {
                $paymentVerifier->refreshPaidStatus($order);
            } catch (RuntimeException $exception) {
                Log::warning('Could not verify PayMongo payment while loading tour bookings.', [
                    'order_id' => $order->id,
                    'message' => $exception->getMessage(),
                ]);
            }
        }
    }
}
