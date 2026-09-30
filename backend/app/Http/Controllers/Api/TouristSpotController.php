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

    public function show(string $id)
    {
        return new TouristSpotResource(TouristSpot::findOrFail($id));
    }
}