<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TourBooking extends Model
{
    protected $fillable = [
        'booking_reference',
        'user_id',
        'tour_package_id',
        'tour_date',
        'number_of_adults',
        'number_of_children',
        'total_participants',
        'pickup_location',
        'special_requests',
        'unit_price',
        'total_amount',
        'pricing_snapshot',
        'status',
        'expires_at',
        'payment_status',
    ];

    protected function casts(): array
    {
        return [
            'tour_date' => 'date:Y-m-d',
            'unit_price' => 'decimal:2',
            'total_amount' => 'decimal:2',
            'pricing_snapshot' => 'array',
            'expires_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function tourPackage(): BelongsTo
    {
        return $this->belongsTo(TourPackage::class);
    }
}
