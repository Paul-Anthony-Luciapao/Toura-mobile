<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\User */
class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => (string) $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'role' => $this->role,
            'avatar' => $this->avatar,
            'phone' => $this->phone,
            'joinedAt' => $this->created_at?->toDateString(),
            'status' => $this->status,
            'resortId' => $this->when(
                $this->role === 'owner',
                fn () => ($id = $this->resorts()->value('id')) ? (string) $id : null,
            ),
        ];
    }
}