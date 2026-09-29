<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Offer extends Model
{
    protected $fillable = [
        'resort_id',
        'title',
        'tag',
        'description',
        'discount_rate',
        'valid_until',
        'inclusions',
    ];

    protected function casts(): array
    {
        return [
            'inclusions' => 'array',
        ];
    }

    public function resort(): BelongsTo
    {
        return $this->belongsTo(Resort::class);
    }
}