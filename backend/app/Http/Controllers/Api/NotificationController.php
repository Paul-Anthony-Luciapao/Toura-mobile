<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Notifications\DatabaseNotification;

class NotificationController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $notifications = $request->user()->notifications()->latest()->limit(100)->get();

        return response()->json([
            'success' => true,
            'unread_total' => $request->user()->unreadNotifications()->count(),
            'data' => $notifications->map(fn (DatabaseNotification $notification) => [
                'id' => $notification->id,
                'kind' => $notification->data['kind'] ?? 'system',
                'title' => $notification->data['title'] ?? '',
                'body' => $notification->data['body'] ?? '',
                'href' => $notification->data['href'] ?? null,
                'created_at' => $notification->created_at?->toISOString(),
                'read' => $notification->read_at !== null,
            ]),
        ]);
    }

    public function unreadCount(Request $request): JsonResponse
    {
        return response()->json([
            'success' => true,
            'unread_total' => $request->user()->unreadNotifications()->count(),
        ]);
    }

    public function markRead(Request $request, string $notificationId): JsonResponse
    {
        $notification = $request->user()->notifications()->whereKey($notificationId)->firstOrFail();
        if ($notification->read_at === null) {
            $notification->markAsRead();
        }

        return response()->json(['success' => true]);
    }

    public function markAllRead(Request $request): JsonResponse
    {
        $request->user()->unreadNotifications()->update(['read_at' => now()]);

        return response()->json(['success' => true]);
    }
}
