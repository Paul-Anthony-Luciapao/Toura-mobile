<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->string('booking_reference')->unique();

            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('resort_id')->constrained('resorts')->onDelete('cascade');
            $table->foreignId('accommodation_id')->constrained('accommodations')->onDelete('cascade');

            $table->date('check_in_date');
            $table->time('check_in_time')->nullable();
            $table->date('check_out_date');

            $table->unsignedInteger('nights');
            $table->unsignedInteger('guests_count');

            $table->text('bed_requirements')->nullable();
            $table->text('special_requests')->nullable();

            $table->decimal('total_price', 10, 2);

            $table->string('status')->default('pending');
            $table->text('payment_note')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
