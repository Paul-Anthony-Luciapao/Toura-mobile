<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ItineraryBooking;
use App\Models\ItineraryPackage;
use App\Models\Order;
use App\Models\TourBooking;
use App\Models\User;
use App\Services\PaymongoPaymentVerifier;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Carbon;
use RuntimeException;

class ItineraryBookingController extends Controller
{
    public function index(
        Request $request,
        PaymongoPaymentVerifier $paymentVerifier
    ): JsonResponse
    {
        $this->syncPaidBookings($request->user()->id, $paymentVerifier);
        $this->expirePendingBookings($request->user()->id);

        return response()->json(
            $this->userBookings($request)
                ->with(['itineraryPackage', 'guests'])
                ->latest()
                ->get()
        );
    }

    public function show(
        Request $request,
        ItineraryBooking $booking,
        PaymongoPaymentVerifier $paymentVerifier
    ): JsonResponse
    {
        // Return 404 rather than disclose that another user's booking exists.
        abort_unless($booking->user_id === $request->user()->id, 404);

        $this->syncPaidBookings(
            $request->user()->id,
            $paymentVerifier,
            $booking->booking_reference
        );
        $this->expirePendingBookings($request->user()->id, $booking->id);

        return response()->json(
            $booking->refresh()->load(['itineraryPackage', 'guests'])
        );
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'itinerary_package_id' => 'required|string|exists:itinerary_packages,id',
            'arrival_date' => 'required|date_format:Y-m-d|after_or_equal:today',
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

        $booking = DB::transaction(function () use ($request, $validated) {
            $package = ItineraryPackage::whereKey($validated['itinerary_package_id'])
                ->lockForUpdate()
                ->firstOrFail();

            $priceBreakdown = $package->price_breakdown;
            if (! is_array($priceBreakdown) || $priceBreakdown === []) {
                throw ValidationException::withMessages([
                    'itinerary_package_id' => 'This itinerary package has no valid price.',
                ]);
            }

            $unitPrice = 0.0;
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
                $unitPrice += (float) $line['amount'];
            }

            if ($unitPrice <= 0) {
                throw ValidationException::withMessages([
                    'itinerary_package_id' => 'This itinerary package has no valid price.',
                ]);
            }

            $guestCount = count($validated['guests']);
            if (
                $package->price_type === 'per_group'
                && $package->group_size !== null
                && $guestCount !== $package->group_size
            ) {
                throw ValidationException::withMessages([
                    'guests' => "This package price applies to exactly {$package->group_size} guests.",
                ]);
            }

            $totalPrice = $package->price_type === 'per_person'
                ? $unitPrice * $guestCount
                : $unitPrice;

            User::query()
                ->whereKey($request->user()->id)
                ->lockForUpdate()
                ->firstOrFail();

            $hasOverlappingBooking = ItineraryBooking::query()
                ->where('user_id', $request->user()->id)
                ->where('itinerary_package_id', $validated['itinerary_package_id'])
                ->whereNotIn('status', ['cancelled', 'expired'])
                ->whereDate('arrival_date', '<=', $validated['departure_date'])
                ->whereDate('departure_date', '>=', $validated['arrival_date'])
                ->exists();

            if ($hasOverlappingBooking) {
                throw ValidationException::withMessages([
                    'itinerary_package_id' => 'You already have a booking for this itinerary package during overlapping dates.',
                ]);
            }

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
                'price_type' => $package->price_type,
                'unit_price' => $unitPrice,
                'pricing_snapshot' => [
                    'package_title' => $package->title,
                    'price_type' => $package->price_type,
                    'group_size' => $package->group_size,
                    'unit_price' => $unitPrice,
                    'guest_count' => $guestCount,
                    'total_price' => $totalPrice,
                ],
                'expires_at' => now()->addMinutes(30),
                'status' => 'pending',
                'payment_status' => 'pending',
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

    private function syncPaidBookings(
        int $userId,
        PaymongoPaymentVerifier $paymentVerifier,
        ?string $bookingReference = null
    ): void
    {
        $orders = Order::query()
            ->where('user_id', $userId)
            ->where('payment_status', '!=', 'paid')
            ->whereNotNull('paymongo_checkout_session_id');

        if ($bookingReference !== null) {
            $orders->where('reference_number', $bookingReference);
        }

        foreach ($orders->get() as $order) {
            try {
                $paymentVerifier->refreshPaidStatus($order);
            } catch (RuntimeException $exception) {
                Log::warning('Could not verify PayMongo payment while loading itinerary bookings.', [
                    'order_id' => $order->id,
                    'message' => $exception->getMessage(),
                ]);
            }
        }

        $paidOrderReferences = Order::query()
            ->select('reference_number')
            ->where('user_id', $userId)
            ->where('payment_status', 'paid');

        $bookings = ItineraryBooking::query()
            ->where('user_id', $userId)
            ->whereIn('booking_reference', $paidOrderReferences);

        if ($bookingReference !== null) {
            $bookings->where('booking_reference', $bookingReference);
        }

        $bookings->where('status', '!=', 'confirmed')
            ->update(['status' => 'confirmed', 'payment_status' => 'paid']);

        $tourBookings = TourBooking::query()
            ->where('user_id', $userId)
            ->whereIn('booking_reference', $paidOrderReferences)
            ->where('status', '!=', 'confirmed');

        if ($bookingReference !== null) {
            $tourBookings->where('booking_reference', $bookingReference);
        }

        $tourBookings->update(['status' => 'confirmed', 'payment_status' => 'paid']);
    }

    private function expirePendingBookings(int $userId, ?int $bookingId = null): void
    {
        $bookings = ItineraryBooking::query()
            ->where('user_id', $userId)
            ->where('status', 'pending')
            ->whereNotNull('expires_at')
            ->where('expires_at', '<=', Carbon::now());

        if ($bookingId !== null) {
            $bookings->whereKey($bookingId);
        }

        $bookings->update(['status' => 'expired']);
    }

    public function destroy(
        Request $request,
        ItineraryBooking $booking,
        PaymongoPaymentVerifier $paymentVerifier
    ): JsonResponse
    {
        abort_unless($booking->user_id === $request->user()->id, 404);
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
                    Log::warning('Could not verify checkout before cancelling itinerary booking.', [
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
        return response()->json($booking->refresh());
    }
}
