<?php

namespace App\Services;

use App\Models\ItineraryBooking;
use App\Models\Order;
use App\Models\TourBooking;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use RuntimeException;

class PaymongoPaymentVerifier
{
    public function refreshPaidStatus(Order $order): ?string
    {
        if ($order->payment_status === 'paid') {
            return null;
        }

        $session = $this->retrieveSession($order);
        if ($session === null) {
            return null;
        }

        if ($this->hasPaidPayment($session)) {
            $this->markPaid($order);

            return null;
        }

        return $this->failureReason($session);
    }

    public function reusableCheckoutUrl(Order $order): ?string
    {
        $session = $this->retrieveSession($order);
        if ($session === null) {
            return null;
        }

        if ($this->hasPaidPayment($session)) {
            $this->markPaid($order);

            return null;
        }

        $attributes = data_get($session, 'data.attributes');

        return data_get($attributes, 'status') === 'active'
            && is_string(data_get($attributes, 'checkout_url'))
            ? data_get($attributes, 'checkout_url')
            : null;
    }

    /**
     * @return array<string, mixed>|null
     */
    private function retrieveSession(Order $order): ?array
    {
        $sessionId = $order->paymongo_checkout_session_id;
        if (! is_string($sessionId) || $sessionId === '') {
            return null;
        }

        $secretKey = config('services.paymongo.secret_key');
        if (! is_string($secretKey) || trim($secretKey) === '') {
            throw new RuntimeException('PayMongo payment verification is not configured.');
        }

        try {
            $response = Http::withBasicAuth($secretKey, '')
                ->timeout(10)
                ->get(
                    'https://api.paymongo.com/v1/checkout_sessions/'
                        . rawurlencode($sessionId)
                );
        } catch (ConnectionException $exception) {
            throw new RuntimeException(
                'Unable to connect to PayMongo to verify payment.',
                previous: $exception,
            );
        }

        if ($response->failed()) {
            throw new RuntimeException('Unable to verify payment with PayMongo.');
        }

        $session = $response->json();
        $payments = data_get($session, 'data.attributes.payments');
        if (
            data_get($session, 'data.id') !== $sessionId
            || data_get($session, 'data.attributes.reference_number') !== $order->reference_number
            || ! is_array($payments)
        ) {
            throw new RuntimeException('PayMongo returned an unexpected checkout session.');
        }

        return $session;
    }

    /**
     * @param array<string, mixed> $session
     */
    private function hasPaidPayment(array $session): bool
    {
        $payments = data_get($session, 'data.attributes.payments', []);

        foreach ($payments as $payment) {
            if (data_get($payment, 'attributes.status') === 'paid') {
                return true;
            }
        }

        return false;
    }

    private function markPaid(Order $order): void
    {
        DB::transaction(function () use ($order): void {
            $order->update([
                'payment_status' => 'paid',
                'status' => 'paid',
            ]);

            ItineraryBooking::where(
                'booking_reference',
                $order->reference_number
            )
                ->where('user_id', $order->user_id)
                    ->update(['status' => 'confirmed', 'payment_status' => 'paid']);

            TourBooking::where(
                'booking_reference',
                $order->reference_number
            )
                ->where('user_id', $order->user_id)
                    ->update(['status' => 'confirmed', 'payment_status' => 'paid']);
        });
    }

    /**
     * @param array<string, mixed> $session
     */
    private function failureReason(array $session): ?string
    {
        $error = data_get(
            $session,
            'data.attributes.payment_intent.attributes.last_payment_error'
        );

        if (! is_array($error) || $error === []) {
            return null;
        }

        $code = strtolower(implode(' ', array_filter([
            $error['code'] ?? null,
            $error['sub_code'] ?? null,
            $error['decline_code'] ?? null,
            $error['type'] ?? null,
        ], fn ($value) => is_string($value) && $value !== '')));

        return match (true) {
            str_contains($code, 'insufficient_funds'),
            str_contains($code, 'credit_limit_exceeded'),
            str_contains($code, 'debit_card_usage_limit_exceeded')
                => 'insufficient_funds',
            str_contains($code, 'expired_card'),
            str_contains($code, 'card_expired')
                => 'expired_card',
            str_contains($code, 'card_number_invalid'),
            str_contains($code, 'card_type_mismatch'),
            str_contains($code, 'cvc_invalid'),
            str_contains($code, 'cvc_incorrect'),
            str_contains($code, 'incorrect_number'),
            str_contains($code, 'invalid_number')
                => 'invalid_card_details',
            str_contains($code, 'authentication')
                => 'authentication_failed',
            str_contains($code, 'timeout')
                => 'connection_timeout',
            str_contains($code, 'duplicate')
                => 'duplicate_payment',
            default => 'payment_declined',
        };
    }
}
