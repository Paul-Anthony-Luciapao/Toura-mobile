<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\Accommodation */
class AccommodationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => (string) $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'pricePerNight' => (float) $this->price_per_night,
            'capacity' => $this->capacity,
            'bedType' => $this->bed_type,
            'bedCount' => $this->bed_count,
            'availableUnits' => $this->available_units,
            'size' => $this->size !== null ? "{$this->size} sqm" : null,
            'image' => $this->image,
            'amenities' => $this->amenities ?? [],
        ];
    }
}