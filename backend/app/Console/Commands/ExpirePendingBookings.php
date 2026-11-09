<?php

namespace App\Console\Commands;

use App\Models\ItineraryBooking;
use App\Models\TourBooking;
use Illuminate\Console\Command;

class ExpirePendingBookings extends Command
{
    protected $signature = 'bookings:expire-pending';

    protected $description = 'Expire unpaid itinerary and tour bookings past their payment deadline.';

    public function handle(): int
    {
        $expiredItineraries = ItineraryBooking::query()
            ->where('status', 'pending')
            ->whereNotNull('expires_at')
            ->where('expires_at', '<=', now())
            ->update(['status' => 'expired']);

        $expiredTours = TourBooking::query()
            ->where('status', 'pending')
            ->whereNotNull('expires_at')
            ->where('expires_at', '<=', now())
            ->update(['status' => 'expired']);

        $this->info('Expired '.($expiredItineraries + $expiredTours).' unpaid bookings.');

        return self::SUCCESS;
    }
}
