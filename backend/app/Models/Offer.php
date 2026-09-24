<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Offer extends Model
{
    public function resort(): BelongsTo
    {
        return $this->belongsTo(Resort::class);
    }
}