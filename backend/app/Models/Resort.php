<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Resort extends Model
{
    protected $fillable = [
        'owner_id',
        'name',
        'tagline',
        'municipality',
        'location',
        'description',
        'cover_image',
        'rating',
        'review_count',
        'base_price',
        'amenities',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'amenities' => 'array',
        ];
    }
    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function accommodations(): HasMany
    {
        return $this->hasMany(Accommodation::class);
    }

    public function offers(): HasMany
    {
        return $this->hasMany(Offer::class);
    }
}