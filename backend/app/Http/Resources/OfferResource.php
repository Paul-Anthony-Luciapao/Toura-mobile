<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\Offer */
class OfferResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => (string) $this->id,
            'title' => $this->title,
            'tag' => $this->tag,
            'description' => $this->description,
            // Assumes discount_rate is stored as a plain percentage number (e.g. 18 -> "18% OFF").
            'discountRate' => $this->discount_rate !== null ? "{$this->discount_rate}% OFF" : null,
            'validUntil' => $this->valid_until?->toDateString(),
            'inclusions' => $this->inclusions ?? [],
        ];
    }
}