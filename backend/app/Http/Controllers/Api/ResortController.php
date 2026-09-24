<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Resort;
use Illuminate\Http\Request;

class ResortController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Resort::all());
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'owner_id' => 'required|exists:users,id',
            'name' => 'required|string|max:255',
            'tagline' => 'nullable|string|max:255',
            'municipality' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'description' => 'required|string',
            'cover_image' => 'nullable|string|max:255',
            'rating' => 'nullable|numeric|min:0|max:5',
            'review_count' => 'nullable|integer|min:0',
            'base_price' => 'required|numeric|min:0',
            'amenities' => 'nullable|array',
            'status' => 'nullable|string|max:255',
        ]);

        $resort = Resort::create($validated);

        return response()->json($resort, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $resort = Resort::findOrFail($id);

        return response()->json($resort);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $resort = Resort::findOrFail($id);

        $validated = $request->validate([
            'owner_id' => 'sometimes|exists:users,id',
            'name' => 'sometimes|string|max:255',
            'tagline' => 'nullable|string|max:255',
            'municipality' => 'sometimes|string|max:255',
            'location' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'cover_image' => 'nullable|string|max:255',
            'rating' => 'nullable|numeric|min:0|max:5',
            'review_count' => 'nullable|integer|min:0',
            'base_price' => 'sometimes|numeric|min:0',
            'amenities' => 'nullable|array',
            'status' => 'nullable|string|max:255',
        ]);

        $resort->update($validated);

        return response()->json($resort);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $resort = Resort::findOrFail($id);

        $resort->delete();

        return response()->json([
            'message' => 'Resort deleted successfully.',
        ]);
    }
}
