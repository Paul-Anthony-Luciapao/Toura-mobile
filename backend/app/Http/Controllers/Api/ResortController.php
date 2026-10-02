<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ResortResource;
use App\Models\Resort;
use Illuminate\Http\Request;

class ResortController extends Controller
{
    public function index(Request $request)
    {
        $resorts = Resort::query()
            ->where('status', 'published')
            ->when($request->filled('municipality'), fn ($q) => $q->where('municipality', $request->string('municipality')))
            ->latest()
            ->paginate($request->integer('per_page', 15));

        return ResortResource::collection($resorts);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'tagline' => 'nullable|string|max:255',
            'municipality' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'description' => 'required|string',
            'cover_image' => 'nullable|string|max:255',
            'images' => 'nullable|array',
            'images.*' => 'string',
            'base_price' => 'required|numeric|min:0',
            'amenities' => 'nullable|array',
            'status' => 'nullable|in:draft,published,archived',
        ]);

        $resort = Resort::create([
            ...$validated,
            'owner_id' => $request->user()->id,
        ]);

        return new ResortResource($resort);
    }

    public function show(string $id)
    {
        $resort = Resort::with(['accommodations', 'offers'])
            ->where('status', 'published')
            ->findOrFail($id);

        return new ResortResource($resort);
    }

    public function update(Request $request, string $id)
    {
        $resort = Resort::findOrFail($id);
        abort_unless($resort->owner_id === $request->user()->id, 403, 'Not your resort.');

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'tagline' => 'nullable|string|max:255',
            'municipality' => 'sometimes|string|max:255',
            'location' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'cover_image' => 'nullable|string|max:255',
            'images' => 'nullable|array',
            'images.*' => 'string',
            'base_price' => 'sometimes|numeric|min:0',
            'amenities' => 'nullable|array',
            'status' => 'nullable|in:draft,published,archived',
        ]);

        $resort->update($validated);

        return new ResortResource($resort);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        $resort = Resort::findOrFail($id);
        abort_unless($resort->owner_id === $request->user()->id, 403, 'Not your resort.');

        if ($resort->owner_id !== $request->user()->id) {
            return response()->json([
                'message' => 'You are not authorized to delete this resort.',
            ], 403);
        }

        $resort->delete();

        return response()->json(['message' => 'Resort deleted successfully.']);
    }
}