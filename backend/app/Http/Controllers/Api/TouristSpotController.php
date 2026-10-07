<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TouristSpotResource;
use App\Models\TouristSpot;
use Illuminate\Http\Request;

class TouristSpotController extends Controller
{
    public function index(Request $request)
    {
        $spots = TouristSpot::query()
            ->when($request->filled('municipality'), fn ($q) => $q->where('municipality', $request->string('municipality')))
            ->latest()
            ->paginate($request->integer('per_page', 15));

        return TouristSpotResource::collection($spots);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'municipality' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|string|max:255',
            'tags' => 'nullable|array',
        ]);

        $touristSpot = TouristSpot::create($validated);

        return (new TouristSpotResource($touristSpot))->response()->setStatusCode(201);
    }

    public function show(string $id)
    {
        return new TouristSpotResource(TouristSpot::findOrFail($id));
    }

    public function update(Request $request, string $id)
    {
        $touristSpot = TouristSpot::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'municipality' => 'sometimes|string|max:255',
            'category' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|string|max:255',
            'tags' => 'nullable|array',
        ]);

        $touristSpot->update($validated);

        return new TouristSpotResource($touristSpot);
    }

    public function destroy(string $id)
    {
        $touristSpot = TouristSpot::findOrFail($id);

        $touristSpot->delete();

        return response()->json([
            'message' => 'Tourist spot deleted successfully.',
        ]);
    }
}