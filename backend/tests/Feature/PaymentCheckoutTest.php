<?php

namespace Tests\Feature;

use App\Models\Order;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class PaymentCheckoutTest extends TestCase
{
    use RefreshDatabase;

    public function test_checkout_uses_the_selected_gcash_payment_method(): void
    {
        config([
            'services.paymongo.secret_key' => 'sk_test_secret',
            'services.paymongo.payment_method_types' => ['card', 'gcash', 'paymaya'],
        ]);
        Http::fake([
            'https://api.paymongo.com/v2/checkout_sessions' => Http::response([
                'data' => [
                    'id' => 'cs_test_gcash',
                    'attributes' => [
                        'checkout_url' => 'https://checkout.paymongo.com/test',
                    ],
                ],
            ]),
        ]);

        $user = User::factory()->create();
        $order = Order::create([
            'user_id' => $user->id,
            'total' => 1000,
            'reference_number' => 'TOURA-GCASH-TEST',
            'status' => 'pending',
            'payment_status' => 'pending',
        ]);

        $this->actingAs($user, 'sanctum')
            ->postJson('/api/v1/payments/checkout', [
                'order_id' => $order->id,
                'payment_method_type' => 'gcash',
            ])
            ->assertOk()
            ->assertJson([
                'checkout_url' => 'https://checkout.paymongo.com/test',
            ]);

        Http::assertSent(fn ($request) => $request->url() === 'https://api.paymongo.com/v2/checkout_sessions'
            && $request['data']['attributes']['payment_method_types'] === ['gcash']
        );

        $this->assertDatabaseHas('orders', [
            'id' => $order->id,
            'paymongo_checkout_session_id' => 'cs_test_gcash',
        ]);
    }

    public function test_checkout_rejects_a_payment_method_not_enabled_in_paymongo_config(): void
    {
        config([
            'services.paymongo.payment_method_types' => ['card', 'gcash'],
        ]);
        $user = User::factory()->create();
        $order = Order::create([
            'user_id' => $user->id,
            'total' => 1000,
            'reference_number' => 'TOURA-PAYMENT-TEST',
            'status' => 'pending',
            'payment_status' => 'pending',
        ]);

        $this->actingAs($user, 'sanctum')
            ->postJson('/api/v1/payments/checkout', [
                'order_id' => $order->id,
                'payment_method_type' => 'paymaya',
            ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('payment_method_type');

        Http::assertNothingSent();
    }
}
