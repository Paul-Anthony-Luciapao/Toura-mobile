<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Booking extends Model
{
    protected $fillable = [
        'booking_reference',
        'user_id',
        'resort_id',
        'accommodation_id',
        'check_in_date',
        'check_in_time',
        'check_out_date',
        'nights',
        'guests_count',
        'bed_requirements',
        'special_requests',
        'total_price',
        'status',
        'payment_note',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function resort(): BelongsTo
    {
        return $this->belongsTo(Resort::class);
    }

    public function accommodation(): BelongsTo
    {
        return $this->belongsTo(Accommodation::class);
    }
}