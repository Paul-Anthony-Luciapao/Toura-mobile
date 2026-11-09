<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ItineraryBooking;
use App\Models\Order;
use App\Models\TourBooking;
use App\Services\PaymongoPaymentVerifier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\Rule;
use RuntimeException;

class PaymentController extends Controller
{
    public function createCheckout(
        Request $request,
        PaymongoPaymentVerifier $paymentVerifier
    )
    {
        $request->validate([
            'order_id' => ['required_without:booking_id', 'integer'],
            'booking_id' => ['required_without:order_id', 'integer'],
            'booking_type' => ['sometimes', 'required', 'string', Rule::in(['itinerary', 'tour'])],
            'payment_method_type' => [
                'sometimes',
                'required',
                'string',
                Rule::in(config(
                    'services.paymongo.payment_method_types',
                    ['card', 'gcash', 'paymaya', 'qrph']
                )),
            ],
        ]);

        // Resolve the order, creating one from an itinerary booking when needed.
        if ($request->filled('order_id')) {
            $order = Order::where('user_id', $request->user()->id)
                ->findOrFail($request->order_id);
        } else {
            $bookingType = $request->input('booking_type', 'itinerary');
            $booking = $bookingType === 'tour'
                ? TourBooking::where('user_id', $request->user()->id)->findOrFail($request->booking_id)
                : ItineraryBooking::where('user_id', $request->user()->id)->findOrFail($request->booking_id);

            if ($booking->status !== 'pending') {
                return response()->json([
                    'message' => 'This booking is no longer available for payment.',
                    'code' => 'booking_not_payable',
                ], 409);
            }

            if ($booking->expires_at !== null && $booking->expires_at->isPast()) {
                $booking->update(['status' => 'expired']);

                return response()->json([
                    'message' => 'This booking has expired. Please create a new booking.',
                    'code' => 'booking_expired',
                ], 409);
            }

            $order = Order::firstOrCreate(
                ['reference_number' => $booking->booking_reference],
                [
                    'user_id' => $request->user()->id,
                    'total' => $booking instanceof TourBooking
                        ? $booking->total_amount
                        : $booking->total_price,
                    'currency' => 'PHP',
                    'status' => 'pending',
                    'payment_status' => 'pending',
                ]
            );
        }

        if ($order->payment_status === 'paid') {
            return response()->json([
                'message' => 'This order has already been paid.',
                'code' => 'already_paid',
            ], 409);
        }

        if ($order->paymongo_checkout_session_id) {
            try {
                $existingCheckoutUrl = $paymentVerifier->reusableCheckoutUrl($order);
            } catch (RuntimeException $exception) {
                return response()->json([
                    'message' => $exception->getMessage(),
                    'code' => 'checkout_verification_unavailable',
                ], 502);
            }

            $order->refresh();
            if ($order->payment_status === 'paid') {
                return response()->json([
                    'message' => 'This order has already been paid.',
                    'code' => 'already_paid',
                ], 409);
            }

            if ($existingCheckoutUrl !== null) {
                return response()->json([
                    'checkout_url' => $existingCheckoutUrl,
                    'order_id' => $order->id,
                ]);
            }
        }

        $response = Http::withBasicAuth(
            config('services.paymongo.secret_key'),
            ''
        )->post(
            'https://api.paymongo.com/v2/checkout_sessions',
            [
                'data' => [
                    'attributes' => [
                        'line_items' => [
                            [
                                'name' => 'Order #' . $order->id,
                                'amount' => (int) round(
                                    (float) $order->total * 100
                                ),
                                'currency' => 'PHP',
                                'quantity' => 1,
                            ],
                        ],
                        'payment_method_types' => $request->filled('payment_method_type')
                            ? [$request->input('payment_method_type')]
                            : config(
                                'services.paymongo.payment_method_types',
                                ['card', 'gcash', 'paymaya', 'qrph']
                            ),
                        'reference_number' =>
                            $order->reference_number,
                        'success_url' =>
                            config('app.frontend_url')
                                . '/payment/success',
                        'cancel_url' =>
                            config('app.frontend_url')
                                . '/payment/cancel',
                    ],
                ],
            ]
        );

        if ($response->failed()) {
            return response()->json([
                'message' => 'Unable to create checkout session.',
            ], 502);
        }

        $checkoutUrl = $response->json(
            'data.attributes.checkout_url'
        );

        $sessionId = $response->json('data.id');

        if (!$checkoutUrl || !$sessionId) {
            return response()->json([
                'message' => 'Invalid checkout response from PayMongo.',
            ], 502);
        }

        $order->update([
            'paymongo_checkout_session_id' => $sessionId,
        ]);

        return response()->json([
            'checkout_url' => $checkoutUrl,
            'order_id' => $order->id,
        ]);
    }

    public function status(
        Request $request,
        int $orderId,
        PaymongoPaymentVerifier $paymentVerifier
    )
    {
        $order = Order::where('user_id', $request->user()->id)
            ->findOrFail($orderId);

        try {
            $failureReason = $paymentVerifier->refreshPaidStatus($order);
        } catch (RuntimeException $exception) {
            $status = $exception->getMessage() === 'PayMongo payment verification is not configured.'
                ? 503
                : 502;

            return response()->json([
                'message' => $exception->getMessage(),
            ], $status);
        }

        $order->refresh();

        return response()->json([
            'payment_status' => $order->payment_status === 'paid'
                ? 'paid'
                : ($failureReason !== null ? 'failed' : 'pending'),
            'failure_reason' => $failureReason,
        ]);
    }
}
