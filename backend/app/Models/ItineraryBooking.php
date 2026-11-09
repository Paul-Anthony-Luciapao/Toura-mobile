<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ItineraryBooking extends Model
{
    protected $fillable = [
        'booking_reference',
        'user_id',
        'itinerary_package_id',
        'arrival_date',
        'arrival_time',
        'departure_date',
        'departure_time',
        'guest_count',
        'total_price',
        'price_type',
        'unit_price',
        'pricing_snapshot',
        'expires_at',
        'payment_status',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'arrival_date' => 'date:Y-m-d',
            'departure_date' => 'date:Y-m-d',
            'total_price' => 'decimal:2',
            'unit_price' => 'decimal:2',
            'pricing_snapshot' => 'array',
            'expires_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function itineraryPackage(): BelongsTo
    {
        return $this->belongsTo(ItineraryPackage::class);
    }

    public function guests(): HasMany
    {
        return $this->hasMany(ItineraryBookingGuest::class);
    }
}
