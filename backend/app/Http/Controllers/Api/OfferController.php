<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Offer;
use Illuminate\Http\Request;

class OfferController extends Controller
{
    public function index()
    {
        return response()->json(Offer::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'resort_id' => 'required|exists:resorts,id',
            'title' => 'required|string|max:255',
            'tag' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'discount_rate' => 'nullable|numeric|min:0|max:100',
            'valid_until' => 'nullable|date',
            'inclusions' => 'nullable|array',
        ]);

        $offer = Offer::create($validated);

        return response()->json($offer, 201);
    }

    public function show(string $id)
    {
        $offer = Offer::findOrFail($id);

        return response()->json($offer);
    }

    public function update(Request $request, string $id)
    {
        $offer = Offer::findOrFail($id);

        $validated = $request->validate([
            'resort_id' => 'sometimes|exists:resorts,id',
            'title' => 'sometimes|string|max:255',
            'tag' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'discount_rate' => 'nullable|numeric|min:0|max:100',
            'valid_until' => 'nullable|date',
            'inclusions' => 'nullable|array',
        ]);

        $offer->update($validated);

        return response()->json($offer);
    }

    public function destroy(string $id)
    {
        $offer = Offer::findOrFail($id);

        $offer->delete();

        return response()->json([
            'message' => 'Offer deleted successfully.',
        ]);
    }
}