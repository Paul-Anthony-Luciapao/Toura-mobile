<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TourPackage;
use Illuminate\Http\JsonResponse;

class TourPackageController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(TourPackage::query()->orderBy('name')->get());
    }

    public function show(string $id): JsonResponse
    {
        return response()->json(TourPackage::findOrFail($id));
    }
}
