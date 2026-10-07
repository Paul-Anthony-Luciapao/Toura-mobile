<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\Resort */
class ResortResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => (string) $this->id,
            'ownerId' => (string) $this->owner_id,
            'name' => $this->name,
            'tagline' => $this->tagline,
            'municipality' => $this->municipality,
            'location' => $this->location,
            'description' => $this->description,
            'coverImage' => $this->cover_image,
            'images' => $this->images ?? [],
            'rating' => (float) $this->rating,
            'reviewCount' => $this->review_count,
            'basePrice' => (float) $this->base_price,
            'amenities' => $this->amenities ?? [],
            'status' => $this->status,
            'accommodations' => AccommodationResource::collection($this->whenLoaded('accommodations')),
            'offers' => OfferResource::collection($this->whenLoaded('offers')),
        ];
    }
}