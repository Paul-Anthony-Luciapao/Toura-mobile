<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Hotel;
use Illuminate\Http\JsonResponse;

class HotelController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(
            Hotel::query()
                ->where('is_active', true)
                ->orderBy('sort_order')
                ->orderBy('name')
                ->get(['id', 'name', 'municipality', 'description', 'image_key'])
        );
    }

    public function show(Hotel $hotel): JsonResponse
    {
        abort_unless($hotel->is_active, 404);

        return response()->json($hotel->only([
            'id', 'name', 'municipality', 'description', 'image_key',
            'address', 'amenities', 'phone',
        ]));
    }
}
