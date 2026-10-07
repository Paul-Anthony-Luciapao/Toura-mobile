<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TouristSpot extends Model
{
    protected $fillable = [
        'name',
        'municipality',
        'category',
        'description',
        'image',
        'tags',
        'rating',
        'review_count',
        'price',
    ];

    protected function casts(): array
    {
        return [
            'tags' => 'array',
        ];
    }
}