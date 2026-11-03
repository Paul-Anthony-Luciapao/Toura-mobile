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

    public function test_user_can_check_their_order_payment_status(): void
    {
        $user = User::factory()->create();
        $order = Order::create([
            'user_id' => $user->id,
            'total' => 1000,
            'reference_number' => 'TOURA-PAYMENT-STATUS',
            'status' => 'paid',
            'payment_status' => 'paid',
        ]);

        $this->actingAs($user, 'sanctum')
            ->getJson("/api/v1/payments/orders/{$order->id}/status")
            ->assertOk()
            ->assertJson(['payment_status' => 'paid']);
    }

    public function test_status_check_confirms_paid_session_directly_with_paymongo(): void
    {
        config(['services.paymongo.secret_key' => 'sk_test_secret']);
        Http::fake([
            'https://api.paymongo.com/v1/checkout_sessions/cs_test_status' => Http::response([
                'data' => [
                    'id' => 'cs_test_status',
                    'attributes' => [
                        'reference_number' => 'TOURA-PAYMENT-VERIFY',
                        'payments' => [
                            [
                                'attributes' => [
                                    'status' => 'paid',
                                ],
                            ],
                        ],
                    ],
                ],
            ]),
        ]);

        $user = User::factory()->create();
        $order = Order::create([
            'user_id' => $user->id,
            'total' => 1000,
            'reference_number' => 'TOURA-PAYMENT-VERIFY',
            'paymongo_checkout_session_id' => 'cs_test_status',
            'status' => 'pending',
            'payment_status' => 'pending',
        ]);

        $this->actingAs($user, 'sanctum')
            ->getJson("/api/v1/payments/orders/{$order->id}/status")
            ->assertOk()
            ->assertJson(['payment_status' => 'paid']);

        $this->assertDatabaseHas('orders', [
            'id' => $order->id,
            'status' => 'paid',
            'payment_status' => 'paid',
        ]);
    }

    public function test_status_check_returns_a_safe_card_failure_reason(): void
    {
        config(['services.paymongo.secret_key' => 'sk_test_secret']);
        Http::fake([
            'https://api.paymongo.com/v1/checkout_sessions/cs_test_declined' => Http::response([
                'data' => [
                    'id' => 'cs_test_declined',
                    'attributes' => [
                        'reference_number' => 'TOURA-PAYMENT-DECLINED',
                        'payments' => [],
                        'payment_intent' => [
                            'attributes' => [
                                'last_payment_error' => [
                                    'code' => 'insufficient_funds',
                                ],
                            ],
                        ],
                    ],
                ],
            ]),
        ]);

        $user = User::factory()->create();
        $order = Order::create([
            'user_id' => $user->id,
            'total' => 1000,
            'reference_number' => 'TOURA-PAYMENT-DECLINED',
            'paymongo_checkout_session_id' => 'cs_test_declined',
            'status' => 'pending',
            'payment_status' => 'pending',
        ]);

        $this->actingAs($user, 'sanctum')
            ->getJson("/api/v1/payments/orders/{$order->id}/status")
            ->assertOk()
            ->assertJson([
                'payment_status' => 'failed',
                'failure_reason' => 'insufficient_funds',
            ]);

        $this->assertDatabaseHas('orders', [
            'id' => $order->id,
            'payment_status' => 'pending',
        ]);
    }

    public function test_status_check_maps_paymongo_failure_codes_to_app_reasons(): void
    {
        config(['services.paymongo.secret_key' => 'sk_test_secret']);
        $failureCases = [
            'card_number_invalid' => 'invalid_card_details',
            'expired_card' => 'expired_card',
            'generic_decline' => 'payment_declined',
            'authentication_error' => 'authentication_failed',
            'processor_timeout' => 'connection_timeout',
            'duplicate_payment' => 'duplicate_payment',
        ];

        Http::fake(function ($request) use ($failureCases) {
            $sessionId = basename(parse_url($request->url(), PHP_URL_PATH));
            $code = substr($sessionId, strlen('cs_test_'));
            $reference = 'TOURA-'.strtoupper(str_replace('_', '-', $code));

            return Http::response([
                'data' => [
                    'id' => $sessionId,
                    'attributes' => [
                        'reference_number' => $reference,
                        'payments' => [],
                        'payment_intent' => [
                            'attributes' => [
                                'last_payment_error' => ['code' => $code],
                            ],
                        ],
                    ],
                ],
            ]);
        });

        $user = User::factory()->create();

        foreach ($failureCases as $code => $expectedReason) {
            $reference = 'TOURA-'.strtoupper(str_replace('_', '-', $code));
            $order = Order::create([
                'user_id' => $user->id,
                'total' => 1000,
                'reference_number' => $reference,
                'paymongo_checkout_session_id' => "cs_test_{$code}",
                'status' => 'pending',
                'payment_status' => 'pending',
            ]);

            $this->actingAs($user, 'sanctum')
                ->getJson("/api/v1/payments/orders/{$order->id}/status")
                ->assertOk()
                ->assertJson([
                    'payment_status' => 'failed',
                    'failure_reason' => $expectedReason,
                ]);
        }
    }

    public function test_checkout_reuses_an_active_session_instead_of_creating_a_duplicate(): void
    {
        config([
            'services.paymongo.secret_key' => 'sk_test_secret',
            'services.paymongo.payment_method_types' => ['card'],
        ]);
        Http::fake([
            'https://api.paymongo.com/v1/checkout_sessions/cs_test_active' => Http::response([
                'data' => [
                    'id' => 'cs_test_active',
                    'attributes' => [
                        'reference_number' => 'TOURA-ACTIVE-SESSION',
                        'status' => 'active',
                        'checkout_url' => 'https://checkout.paymongo.com/existing',
                        'payments' => [],
                    ],
                ],
            ]),
        ]);

        $user = User::factory()->create();
        $order = Order::create([
            'user_id' => $user->id,
            'total' => 1000,
            'reference_number' => 'TOURA-ACTIVE-SESSION',
            'paymongo_checkout_session_id' => 'cs_test_active',
            'status' => 'pending',
            'payment_status' => 'pending',
        ]);

        $this->actingAs($user, 'sanctum')
            ->postJson('/api/v1/payments/checkout', [
                'order_id' => $order->id,
                'payment_method_type' => 'card',
            ])
            ->assertOk()
            ->assertJson([
                'checkout_url' => 'https://checkout.paymongo.com/existing',
                'order_id' => $order->id,
            ]);

        Http::assertSentCount(1);
    }

    public function test_checkout_reports_a_duplicate_when_the_order_is_already_paid(): void
    {
        $user = User::factory()->create();
        $order = Order::create([
            'user_id' => $user->id,
            'total' => 1000,
            'reference_number' => 'TOURA-ALREADY-PAID',
            'status' => 'paid',
            'payment_status' => 'paid',
        ]);

        $this->actingAs($user, 'sanctum')
            ->postJson('/api/v1/payments/checkout', [
                'order_id' => $order->id,
                'payment_method_type' => 'card',
            ])
            ->assertStatus(409)
            ->assertJson(['code' => 'already_paid']);

        Http::assertNothingSent();
    }

    public function test_user_cannot_check_another_users_order_payment_status(): void
    {
        $order = Order::create([
            'user_id' => User::factory()->create()->id,
            'total' => 1000,
            'reference_number' => 'TOURA-OTHER-USER-STATUS',
            'status' => 'pending',
            'payment_status' => 'pending',
        ]);

        $this->actingAs(User::factory()->create(), 'sanctum')
            ->getJson("/api/v1/payments/orders/{$order->id}/status")
            ->assertNotFound();
    }
}
