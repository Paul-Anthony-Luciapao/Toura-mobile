<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('itinerary_packages', function (Blueprint $table) {
            $table->string('price_type')->default('per_person');
            $table->unsignedInteger('group_size')->nullable();
        });

        Schema::table('itinerary_bookings', function (Blueprint $table) {
            $table->string('price_type')->default('per_person');
            $table->decimal('unit_price', 10, 2)->default(0);
            $table->json('pricing_snapshot')->nullable();
            $table->timestamp('expires_at')->nullable()->index();
            $table->string('payment_status')->default('pending');
        });

        DB::table('itinerary_packages')
            ->where('id', 'not like', 'itinerary-%')
            ->update(['price_type' => 'per_group']);

        $paidReferences = DB::table('orders')
            ->select('reference_number')
            ->where('payment_status', 'paid');
        DB::table('itinerary_bookings')
            ->whereIn('booking_reference', $paidReferences)
            ->update(['payment_status' => 'paid']);

        DB::table('itinerary_bookings')
            ->where('status', 'pending')
            ->whereNull('expires_at')
            ->orderBy('id')
            ->chunkById(100, function ($bookings): void {
                foreach ($bookings as $booking) {
                    DB::table('itinerary_bookings')
                        ->where('id', $booking->id)
                        ->update([
                            'expires_at' => Carbon::parse($booking->created_at)
                                ->addMinutes(30),
                        ]);
                }
            });
    }

    public function down(): void
    {
        Schema::table('itinerary_bookings', function (Blueprint $table) {
            $table->dropColumn(['price_type', 'unit_price', 'pricing_snapshot', 'expires_at', 'payment_status']);
        });

        Schema::table('itinerary_packages', function (Blueprint $table) {
            $table->dropColumn(['price_type', 'group_size']);
        });
    }
};
