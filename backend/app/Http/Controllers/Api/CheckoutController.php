<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class CheckoutController extends Controller
{
    public function createCheckout(Request $request)
    {
        $request->validate([
            'order_id' => 'required|integer',
        ]);

        // Find the order in the database
        $order = Order::findOrFail($request->order_id);

        // Create PayMongo checkout session
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
                                    $order->total * 100
                                ),
                                'currency' => 'PHP',
                                'quantity' => 1,
                            ],
                        ],
                        'payment_method_types' => [
                            'card',
                            'gcash',
                            'qrph',
                        ],
                        'reference_number' =>
                            (string) $order->id,
                        'success_url' =>
                            url('/payment/success'),
                        'cancel_url' =>
                            url('/payment/cancel'),
                    ],
                ],
            ]
        );

        if ($response->failed()) {
            return response()->json([
                'message' =>
                    'Unable to create checkout session',
            ], 502);
        }

        $checkoutUrl = $response->json(
            'data.attributes.checkout_url'
        );

        return response()->json([
            'checkout_url' => $checkoutUrl,
        ]);
    }
}
