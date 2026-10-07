<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\TouristSpot */
class TouristSpotResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => (string) $this->id,
            'name' => $this->name,
            'municipality' => $this->municipality,
            'category' => $this->category,
            'description' => $this->description,
            'image' => $this->image,
            'tags' => $this->tags ?? [],
            'rating' => (float) $this->rating,
            'reviewCount' => $this->review_count, // raw integer; format to "1.3M" on the frontend
            'price' => (float) $this->price,
        ];
    }
}