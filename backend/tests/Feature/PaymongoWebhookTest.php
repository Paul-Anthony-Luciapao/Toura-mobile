<?php

namespace Tests\Feature;

use App\Models\Order;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PaymongoWebhookTest extends TestCase
{
    use RefreshDatabase;

    public function test_webhook_rejects_events_when_signature_secret_is_not_configured(): void
    {
        config(['services.paymongo.webhook_secret' => null]);
        $order = $this->createPendingOrder();

        $this->postJson('/api/v1/webhooks/paymongo', $this->paidEvent($order))
            ->assertServiceUnavailable();

        $this->assertOrderIsPending($order);
    }

    public function test_webhook_rejects_events_without_a_signature(): void
    {
        config(['services.paymongo.webhook_secret' => 'test-webhook-secret']);
        $order = $this->createPendingOrder();

        $this->postJson('/api/v1/webhooks/paymongo', $this->paidEvent($order))
            ->assertUnauthorized();

        $this->assertOrderIsPending($order);
    }

    public function test_webhook_rejects_events_with_an_invalid_signature(): void
    {
        config(['services.paymongo.webhook_secret' => 'test-webhook-secret']);
        $order = $this->createPendingOrder();

        $this->call(
            'POST',
            '/api/v1/webhooks/paymongo',
            [],
            [],
            [],
            [
                'CONTENT_TYPE' => 'application/json',
                'HTTP_PAYMONGO_SIGNATURE' => 't=1234567890,v1=invalid',
            ],
            json_encode($this->paidEvent($order), JSON_THROW_ON_ERROR),
        )->assertUnauthorized();

        $this->assertOrderIsPending($order);
    }

    public function test_webhook_updates_the_order_after_a_valid_signature(): void
    {
        $secret = 'test-webhook-secret';
        $timestamp = '1234567890';
        config(['services.paymongo.webhook_secret' => $secret]);
        $order = $this->createPendingOrder();
        $payload = json_encode($this->paidEvent($order), JSON_THROW_ON_ERROR);
        $signature = hash_hmac('sha256', $timestamp.'.'.$payload, $secret);

        $this->call(
            'POST',
            '/api/v1/webhooks/paymongo',
            [],
            [],
            [],
            [
                'CONTENT_TYPE' => 'application/json',
                'HTTP_PAYMONGO_SIGNATURE' => "t={$timestamp},v1={$signature}",
            ],
            $payload,
        )->assertOk()->assertJson(['received' => true]);

        $this->assertDatabaseHas('orders', [
            'id' => $order->id,
            'status' => 'paid',
            'payment_status' => 'paid',
        ]);
    }

    private function createPendingOrder(): Order
    {
        return Order::create([
            'total' => 1000,
            'reference_number' => 'TOURA-TEST0001',
            'status' => 'pending',
            'payment_status' => 'pending',
        ]);
    }

    private function paidEvent(Order $order): array
    {
        return [
            'data' => [
                'type' => 'checkout_session.payment.paid',
                'id' => 'cs_test_123',
                'attributes' => [
                    'reference_number' => $order->reference_number,
                ],
            ],
        ];
    }

    private function assertOrderIsPending(Order $order): void
    {
        $this->assertDatabaseHas('orders', [
            'id' => $order->id,
            'status' => 'pending',
            'payment_status' => 'pending',
        ]);
    }
}
