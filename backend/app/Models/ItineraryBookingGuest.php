<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ItineraryBookingGuest extends Model
{
    protected $fillable = [
        'first_name',
        'last_name',
        'date_of_birth',
        'phone',
        'email',
    ];

    protected function casts(): array
    {
        return [
            'date_of_birth' => 'date:Y-m-d',
        ];
    }

    public function itineraryBooking(): BelongsTo
    {
        return $this->belongsTo(ItineraryBooking::class);
    }
}
