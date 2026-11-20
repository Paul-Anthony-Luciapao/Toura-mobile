<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use App\Models\ConversationMessage;
use App\Models\Resort;
use App\Services\NotificationEvents;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ConversationController extends Controller
{
    private const PAGE_SIZE = 100;

    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        $conversations = $this->visibleTo($user->id)
            ->with(['traveler', 'owner', 'resort', 'latestMessage'])
            ->orderByDesc('last_message_at')
            ->orderByDesc('id')
            ->get();

        $data = $conversations->map(fn (Conversation $conversation) => $this->conversationPayload($conversation, $user->id)
        );

        return response()->json([
            'success' => true,
            'count' => $data->count(),
            'unread_total' => $data->sum('unread_count'),
            'data' => $data,
        ]);
    }

    public function unreadCount(Request $request): JsonResponse
    {
        $userId = $request->user()->id;
        $total = $this->visibleTo($userId)->get()->sum(
            fn (Conversation $conversation) => $this->calculateUnreadCount($conversation, $userId)
        );

        return response()->json(['success' => true, 'unread_total' => $total]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'resort_id' => ['required', 'integer', 'exists:resorts,id'],
            'subject' => ['nullable', 'string', 'max:255'],
        ]);

        $traveler = $request->user();
        abort_unless($traveler->role === 'traveler', 403);

        $resort = Resort::query()->with('owner')->findOrFail($validated['resort_id']);
        abort_unless($resort->owner !== null && $resort->owner->role === 'owner', 422);

        $conversation = Conversation::query()
            ->where('traveler_id', $traveler->id)
            ->where('owner_id', $resort->owner_id)
            ->where('resort_id', $resort->id)
            ->where('status', 'open')
            ->first();
        $created = $conversation === null;

        if ($created) {
            $conversation = Conversation::query()->create([
                'traveler_id' => $traveler->id,
                'owner_id' => $resort->owner_id,
                'resort_id' => $resort->id,
                'subject' => $validated['subject'] ?? null,
                'status' => 'open',
                'traveler_last_read_at' => now(),
                'owner_last_read_at' => now(),
            ]);
        }

        $conversation->load(['traveler', 'owner', 'resort', 'latestMessage']);

        return response()->json([
            'success' => true,
            'created' => $created,
            'data' => $this->conversationPayload($conversation, $traveler->id),
        ], $created ? 201 : 200);
    }

    public function show(Request $request, Conversation $conversation): JsonResponse
    {
        $this->authorizeParticipant($request, $conversation);
        $conversation->load(['traveler', 'owner', 'resort', 'latestMessage']);

        return response()->json([
            'success' => true,
            'data' => $this->conversationPayload($conversation, $request->user()->id),
        ]);
    }

    public function messages(Request $request, Conversation $conversation): JsonResponse
    {
        $this->authorizeParticipant($request, $conversation);
        $validated = $request->validate([
            'after_id' => ['nullable', 'integer', 'min:0'],
        ]);

        $hasCursor = ! empty($validated['after_id']);
        $query = $conversation->messages();
        if ($hasCursor) {
            $query->where('id', '>', (int) $validated['after_id']);
            $query->orderBy('id');
        } else {
            $query->orderByDesc('id');
        }

        $rows = $query->limit(self::PAGE_SIZE + 1)->get();
        $hasMore = $rows->count() > self::PAGE_SIZE;
        $messages = $rows->take(self::PAGE_SIZE)->values();
        if (! $hasCursor) {
            $messages = $messages->reverse()->values();
        }
        $nextCursor = $messages->last()?->id
            ?? (int) ($validated['after_id'] ?? 0);

        return response()->json([
            'success' => true,
            'next_cursor' => $nextCursor,
            'has_more' => $hasMore,
            'data' => $messages->map(fn (ConversationMessage $message) => $this->messagePayload($message)
            ),
        ]);
    }

    public function sendMessage(Request $request, Conversation $conversation): JsonResponse
    {
        $this->authorizeParticipant($request, $conversation);
        abort_unless($conversation->status === 'open', 409);

        $validated = $request->validate([
            'body' => ['required', 'string', 'max:5000'],
            'client_id' => ['nullable', 'string', 'max:100'],
        ]);

        $user = $request->user();
        $message = DB::transaction(function () use ($conversation, $user, $validated) {
            if (! empty($validated['client_id'])) {
                $existing = $conversation->messages()
                    ->where('sender_id', $user->id)
                    ->where('client_id', $validated['client_id'])
                    ->first();
                if ($existing) {
                    return $existing;
                }
            }

            $message = $conversation->messages()->create([
                'sender_id' => $user->id,
                'sender_name' => $user->name,
                'sender_role' => $user->role,
                'body' => trim($validated['body']),
                'client_id' => $validated['client_id'] ?? null,
            ]);

            $conversation->forceFill([
                'last_message_at' => $message->created_at,
            ])->save();

            return $message;
        });

        if ($message->wasRecentlyCreated) {
            app(NotificationEvents::class)->messageReceived($conversation, $message);
        }

        return response()->json([
            'success' => true,
            'data' => $this->messagePayload($message),
        ], 201);
    }

    public function markRead(Request $request, Conversation $conversation): JsonResponse
    {
        $this->authorizeParticipant($request, $conversation);
        $userId = $request->user()->id;
        $field = $conversation->traveler_id === $userId
            ? 'traveler_last_read_at'
            : 'owner_last_read_at';

        $conversation->forceFill([$field => now()])->save();

        return response()->json(['success' => true]);
    }

    private function visibleTo(int $userId): Builder
    {
        return Conversation::query()
            ->where(fn (Builder $query) => $query
                ->where('traveler_id', $userId)
                ->orWhere('owner_id', $userId));
    }

    private function authorizeParticipant(Request $request, Conversation $conversation): void
    {
        abort_unless(
            $conversation->traveler_id === $request->user()->id
                || $conversation->owner_id === $request->user()->id,
            404,
        );
    }

    private function calculateUnreadCount(Conversation $conversation, int $userId): int
    {
        $readAt = $conversation->traveler_id === $userId
            ? $conversation->traveler_last_read_at
            : $conversation->owner_last_read_at;

        return $conversation->messages()
            ->where(fn (Builder $query) => $query
                ->whereNull('sender_id')
                ->orWhere('sender_id', '!=', $userId))
            ->when($readAt, fn (Builder $query) => $query->where('created_at', '>', $readAt))
            ->count();
    }

    private function conversationPayload(Conversation $conversation, int $userId): array
    {
        $otherParty = $conversation->traveler_id === $userId
            ? $conversation->owner
            : $conversation->traveler;
        $lastMessage = $conversation->latestMessage;

        return [
            'id' => $conversation->id,
            'subject' => $conversation->subject,
            'status' => $conversation->status,
            'my_role' => $conversation->traveler_id === $userId ? 'traveler' : 'owner',
            'other_party' => $otherParty ? [
                'id' => $otherParty->id,
                'name' => $otherParty->name,
                'email' => $otherParty->email,
                'avatar' => $otherParty->avatar,
                'role' => $otherParty->role,
            ] : null,
            'resort' => $conversation->resort ? [
                'id' => $conversation->resort->id,
                'name' => $conversation->resort->name,
                'municipality' => $conversation->resort->municipality,
                'cover_image' => $conversation->resort->cover_image,
            ] : null,
            'booking_id' => $conversation->booking_id,
            'last_message_at' => $conversation->last_message_at?->toISOString(),
            'unread_count' => $this->calculateUnreadCount($conversation, $userId),
            'last_message' => $lastMessage ? $this->messagePayload($lastMessage) : null,
            'created_at' => $conversation->created_at?->toISOString(),
        ];
    }

    private function messagePayload(ConversationMessage $message): array
    {
        return [
            'id' => $message->id,
            'conversation_id' => $message->conversation_id,
            'sender_id' => $message->sender_id,
            'sender_name' => $message->sender_name,
            'sender_role' => $message->sender_role,
            'body' => $message->body,
            'client_id' => $message->client_id,
            'created_at' => $message->created_at?->toISOString(),
        ];
    }
}
