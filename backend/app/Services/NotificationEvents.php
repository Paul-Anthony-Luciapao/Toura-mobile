<?php

namespace App\Services;

use App\Models\Conversation;
use App\Models\ConversationMessage;
use App\Models\ItineraryBooking;
use App\Models\Order;
use App\Models\TourBooking;
use App\Models\User;
use App\Notifications\InAppNotification;
use Illuminate\Support\Facades\DB;

class NotificationEvents
{
    public function bookingReceived(User $user, string $name, string $href): void
    {
        $user->notify(new InAppNotification(
            'booking',
            'Booking received',
            "Your booking for {$name} has been received and is awaiting payment.",
            $href,
        ));
    }

    public function messageReceived(Conversation $conversation, ConversationMessage $message): void
    {
        $recipientId = $conversation->traveler_id === $message->sender_id
            ? $conversation->owner_id
            : $conversation->traveler_id;
        $recipient = User::query()->find($recipientId);
        if ($recipient === null) {
            return;
        }

        $preview = mb_strlen($message->body) > 100
            ? mb_substr($message->body, 0, 97).'...'
            : $message->body;

        $recipient->notify(new InAppNotification(
            'message',
            "New message from {$message->sender_name}",
            $preview,
            "/chat/{$conversation->id}",
        ));
    }

    public function markOrderPaid(Order $order): void
    {
        DB::transaction(function () use ($order): void {
            $lockedOrder = Order::query()->lockForUpdate()->findOrFail($order->id);
            $newlyPaid = $lockedOrder->payment_status !== 'paid';
            $lockedOrder->update([
                'payment_status' => 'paid',
                'status' => 'paid',
            ]);

            $itineraryBooking = ItineraryBooking::query()
                ->where('booking_reference', $lockedOrder->reference_number)
                ->where('user_id', $lockedOrder->user_id)
                ->first();
            $itineraryBooking?->update(['status' => 'confirmed', 'payment_status' => 'paid']);
            $tourBooking = TourBooking::query()
                ->where('booking_reference', $lockedOrder->reference_number)
                ->where('user_id', $lockedOrder->user_id)
                ->first();
            $tourBooking?->update(['status' => 'confirmed', 'payment_status' => 'paid']);

            if ($newlyPaid) {
                $user = User::query()->find($lockedOrder->user_id);
                $user?->notify(new InAppNotification(
                    'payment',
                    'Payment received',
                    "Payment for booking {$lockedOrder->reference_number} was successful.",
                    $itineraryBooking !== null
                        ? '/my-itineraries'
                        : ($tourBooking !== null ? '/my-tours' : '/my-bookings'),
                ));
            }
        });
    }
}
