<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Accommodation extends Model
{
    protected $fillable = [
        'resort_id',
        'title',
        'description',
        'price_per_night',
        'capacity',
        'bed_type',
        'bed_count',
        'available_units',
        'size',
        'image',
        'amenities',
    ];

    protected function casts(): array
    {
        return [
            'amenities' => 'array',
        ];
    }

    public function resort(): BelongsTo
    {
        return $this->belongsTo(Resort::class);
    }
}