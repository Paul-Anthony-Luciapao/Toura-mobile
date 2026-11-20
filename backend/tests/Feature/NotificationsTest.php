<?php

namespace Tests\Feature;

use App\Models\Conversation;
use App\Models\User;
use App\Notifications\InAppNotification;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class NotificationsTest extends TestCase
{
    use RefreshDatabase;

    public function test_notifications_are_available_only_to_the_authenticated_user(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $user->notify(new InAppNotification('booking', 'Booking received', 'Awaiting payment.', '/my-bookings'));
        $otherUser->notify(new InAppNotification('message', 'New message', 'Hello.', '/chat/1'));

        $this->getJson('/api/v1/notifications')->assertUnauthorized();

        $this->actingAs($user, 'sanctum')
            ->getJson('/api/v1/notifications')
            ->assertOk()
            ->assertJsonPath('unread_total', 1)
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.kind', 'booking')
            ->assertJsonPath('data.0.read', false);
    }

    public function test_user_can_mark_one_notification_read_without_affecting_another_user(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $user->notify(new InAppNotification('booking', 'Booking received', 'Awaiting payment.'));
        $otherUser->notify(new InAppNotification('booking', 'Private', 'Other user.'));
        $notification = $user->notifications()->firstOrFail();

        $this->actingAs($user, 'sanctum')
            ->postJson("/api/v1/notifications/{$notification->id}/read")
            ->assertOk();

        $this->assertNotNull($notification->fresh()->read_at);
        $this->assertNull($otherUser->notifications()->firstOrFail()->read_at);
        $this->assertSame(0, $user->unreadNotifications()->count());
    }

    public function test_user_can_mark_all_notifications_read(): void
    {
        $user = User::factory()->create();
        $user->notify(new InAppNotification('booking', 'First', 'First booking.'));
        $user->notify(new InAppNotification('payment', 'Second', 'Payment received.'));

        $this->actingAs($user, 'sanctum')
            ->postJson('/api/v1/notifications/read-all')
            ->assertOk();

        $this->assertSame(0, $user->unreadNotifications()->count());
    }

    public function test_new_message_notifies_the_other_participant_once(): void
    {
        $traveler = User::factory()->create(['role' => 'traveler']);
        $owner = User::factory()->create(['role' => 'owner']);
        $conversation = Conversation::query()->create([
            'traveler_id' => $traveler->id,
            'owner_id' => $owner->id,
            'status' => 'open',
        ]);
        $payload = ['body' => 'Hello from the traveler.', 'client_id' => 'message-123'];

        $this->actingAs($traveler, 'sanctum')
            ->postJson("/api/v1/conversations/{$conversation->id}/messages", $payload)
            ->assertCreated();
        $this->postJson("/api/v1/conversations/{$conversation->id}/messages", $payload)
            ->assertCreated();

        $notifications = $owner->notifications()->get();
        $this->assertCount(1, $notifications);
        $this->assertSame('message', $notifications[0]->data['kind']);
        $this->assertSame('/chat/'.$conversation->id, $notifications[0]->data['href']);
        $this->assertSame(0, $traveler->notifications()->count());
    }
}
