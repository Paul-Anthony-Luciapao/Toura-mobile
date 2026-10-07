<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsOwner
{
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user()?->role !== 'owner') {
            abort(403, 'Owners only.');
        }

        return $next($request);
    }
}