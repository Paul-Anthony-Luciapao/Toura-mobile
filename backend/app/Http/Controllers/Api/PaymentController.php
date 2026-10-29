<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ItineraryBooking;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class PaymentController extends Controller
{
    public function createCheckout(Request $request)
    {
        $request->validate([
            'order_id' => ['required_without:booking_id', 'integer'],
            'booking_id' => ['required_without:order_id', 'integer'],
        ]);

        // Resolve the order, creating one from an itinerary booking when needed.
        if ($request->filled('order_id')) {
            $order = Order::where('user_id', $request->user()->id)
                ->findOrFail($request->order_id);
        } else {
            $booking = ItineraryBooking::where('user_id', $request->user()->id)
                ->findOrFail($request->booking_id);

            $order = Order::firstOrCreate(
                ['reference_number' => $booking->booking_reference],
                [
                    'user_id' => $request->user()->id,
                    'total' => $booking->total_price,
                    'currency' => 'PHP',
                    'status' => 'pending',
                    'payment_status' => 'pending',
                ]
            );
        }

        if ($order->payment_status === 'paid') {
            return response()->json([
                'message' => 'This order has already been paid.',
            ], 422);
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
                        'payment_method_types' => config(
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
        ]);
    }
}
