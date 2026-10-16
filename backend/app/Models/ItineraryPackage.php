<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ItineraryPackage extends Model
{
    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'spot_id',
        'resort_id',
        'title',
        'destination',
        'image',
        'start_date',
        'days',
        'price_breakdown',
        'inclusions',
        'reviews',
    ];

    protected function casts(): array
    {
        return [
            'start_date' => 'date:Y-m-d',
            'days' => 'array',
            'price_breakdown' => 'array',
            'inclusions' => 'array',
            'reviews' => 'array',
        ];
    }
}
