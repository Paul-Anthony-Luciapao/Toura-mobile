<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ItineraryBooking;
use App\Models\Order;
use App\Models\TourBooking;
use Illuminate\Http\Request;

class WebhookController extends Controller
{
    public function paymongo(Request $request)
    {
        $payload = $request->getContent();
        $signatureHeader = $request->header('Paymongo-Signature');

        $secret = config('services.paymongo.webhook_secret');
        if (! is_string($secret) || trim($secret) === '') {
            return response()->json([
                'message' => 'Webhook signature verification is not configured.',
            ], 503);
        }

        if (! is_string($signatureHeader) || ! $this->verifySignature($payload, $signatureHeader, $secret)) {
            return response()->json(['message' => 'Invalid signature.'], 401);
        }

        $event = $request->input('data', []);
        $event = is_array($event) ? $event : [];
        $eventAttributes = $event['attributes'] ?? [];
        $eventAttributes = is_array($eventAttributes) ? $eventAttributes : [];

        $session = $event['data']
            ?? $eventAttributes['data']
            ?? $eventAttributes;
        $session = is_array($session) ? $session : [];
        $sessionAttributes = $session['attributes'] ?? [];
        $sessionAttributes = is_array($sessionAttributes) ? $sessionAttributes : [];

        $sessionId = $session['id'] ?? null;
        $referenceNumber = $sessionAttributes['reference_number']
            ?? $session['reference_number']
            ?? null;
        $eventType = $eventAttributes['type']
            ?? $event['type']
            ?? $request->input('event_type')
            ?? $request->input('type');

        if ($eventType === 'checkout_session.payment.paid') {
            $order = null;
            if ($sessionId) {
                $order = Order::where('paymongo_checkout_session_id', $sessionId)->first();
            }
            if (! $order && $referenceNumber) {
                $order = Order::where('reference_number', $referenceNumber)->first();
            }

            if ($order) {
                $order->update([
                    'payment_status' => 'paid',
                    'status' => 'paid',
                ]);

                // Keep the related itinerary booking in sync when possible.
                $booking = ItineraryBooking::where('booking_reference', $order->reference_number)->first();
                if ($booking) {
                    $booking->update(['status' => 'confirmed', 'payment_status' => 'paid']);
                }

                $tourBooking = TourBooking::where('booking_reference', $order->reference_number)->first();
                if ($tourBooking) {
                    $tourBooking->update(['status' => 'confirmed', 'payment_status' => 'paid']);
                }
            }
        }

        return response()->json(['received' => true]);
    }

    private function verifySignature(string $payload, string $header, string $secret): bool
    {
        $parts = [];
        foreach (explode(',', $header) as $segment) {
            $segment = trim($segment);
            if (str_contains($segment, '=')) {
                [$key, $value] = explode('=', $segment, 2);
                $parts[$key] = $value;
            }
        }

        $timestamp = $parts['t'] ?? null;
        $signatures = array_filter([
            $parts['v1'] ?? null,
            $parts['te'] ?? null,
            $parts['li'] ?? null,
        ], fn ($signature) => is_string($signature) && $signature !== '');

        if (! $timestamp || $signatures === []) {
            return false;
        }

        $expected = hash_hmac('sha256', $timestamp.'.'.$payload, $secret);

        foreach ($signatures as $signature) {
            if (hash_equals($expected, $signature)) {
                return true;
            }
        }

        return false;
    }
}