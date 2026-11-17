<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Conversation extends Model
{
    protected $fillable = [
        'traveler_id',
        'owner_id',
        'resort_id',
        'booking_id',
        'subject',
        'status',
        'traveler_last_read_at',
        'owner_last_read_at',
        'last_message_at',
    ];

    protected function casts(): array
    {
        return [
            'traveler_last_read_at' => 'datetime',
            'owner_last_read_at' => 'datetime',
            'last_message_at' => 'datetime',
        ];
    }

    public function traveler(): BelongsTo
    {
        return $this->belongsTo(User::class, 'traveler_id');
    }

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function resort(): BelongsTo
    {
        return $this->belongsTo(Resort::class);
    }

    public function messages(): HasMany
    {
        return $this->hasMany(ConversationMessage::class);
    }

    public function latestMessage(): HasOne
    {
        return $this->hasOne(ConversationMessage::class)->latestOfMany();
    }
}
