<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ItineraryPackage;

class ItineraryPackageController extends Controller
{
    public function index()
    {
        return response()->json(
            ItineraryPackage::query()->orderBy('title')->get()
        );
    }

    public function show(string $id)
    {
        return response()->json(ItineraryPackage::findOrFail($id));
    }
}
