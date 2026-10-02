<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Accommodation;
use App\Models\Resort;
use Illuminate\Http\Request;

class AccommodationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Accommodation::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'resort_id' => 'required|exists:resorts,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price_per_night' => 'required|numeric|min:0',
            'capacity' => 'required|integer|min:1',
            'bed_type' => 'required|string|max:255',
            'bed_count' => 'nullable|integer|min:1',
            'available_units' => 'nullable|integer|min:0',
            'size' => 'nullable|numeric|min:0',
            'image' => 'nullable|string|max:255',
            'amenities' => 'nullable|array',
        ]);

        $resort = Resort::findOrFail($validated['resort_id']);

        if ($resort->owner_id !== $request->user()->id) {
            return response()->json([
                'message' => 'You are not authorized to manage accommodations for this resort.',
            ], 403);
        }        

        $accommodation = Accommodation::create($validated);

        return response()->json($accommodation, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $accommodation = Accommodation::findOrFail($id);

        return response()->json($accommodation);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $accommodation = Accommodation::findOrFail($id);

        $resort = Resort::findOrFail($accommodation->resort_id);

        if ($resort->owner_id !== $request->user()->id) {
            return response()->json([
                'message' => 'You are not authorized to manage accommodations for this resort.',
            ], 403);
        }        

        $validated = $request->validate([
            'resort_id' => 'sometimes|exists:resorts,id',
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'price_per_night' => 'sometimes|numeric|min:0',
            'capacity' => 'sometimes|integer|min:1',
            'bed_type' => 'sometimes|string|max:255',
            'bed_count' => 'nullable|integer|min:1',
            'available_units' => 'nullable|integer|min:0',
            'size' => 'nullable|numeric|min:0',
            'image' => 'nullable|string|max:255',
            'amenities' => 'nullable|array',
        ]);

        $accommodation->update($validated);

        return response()->json($accommodation);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        $accommodation = Accommodation::findOrFail($id);

        $resort = Resort::findOrFail($accommodation->resort_id);

        if ($resort->owner_id !== $request->user()->id) {
            return response()->json([
                'message' => 'You are not authorized to manage accommodations for this resort.',
            ], 403);
        }
        
        $accommodation->delete();

        return response()->json([
            'message' => 'Accommodation deleted successfully.',
        ]);
    }
}