<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TourPackage extends Model
{
    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'name',
        'municipality',
        'description',
        'image',
        'rating',
        'category',
        'duration',
        'price',
        'price_type',
        'inclusions',
        'exclusions',
        'destinations',
        'activities',
        'available_days',
        'max_participants',
        'meeting_point',
        'meeting_time',
        'requirements',
        'cancellation_policy',
    ];

    protected function casts(): array
    {
        return [
            'rating' => 'decimal:1',
            'price' => 'decimal:2',
            'inclusions' => 'array',
            'exclusions' => 'array',
            'destinations' => 'array',
            'activities' => 'array',
            'available_days' => 'array',
            'requirements' => 'array',
        ];
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(TourBooking::class);
    }
}
