<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tour_packages', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('name');
            $table->string('municipality');
            $table->text('description');
            $table->string('image')->nullable();
            $table->decimal('rating', 3, 1)->nullable();
            $table->string('category');
            $table->string('duration');
            $table->decimal('price', 10, 2);
            $table->string('price_type')->default('per_person');
            $table->json('inclusions');
            $table->json('exclusions');
            $table->json('destinations');
            $table->json('activities');
            $table->json('available_days')->nullable();
            $table->unsignedInteger('max_participants')->nullable();
            $table->string('meeting_point')->nullable();
            $table->string('meeting_time')->nullable();
            $table->json('requirements')->nullable();
            $table->text('cancellation_policy')->nullable();
            $table->timestamps();
        });

        Schema::create('tour_bookings', function (Blueprint $table) {
            $table->id();
            $table->string('booking_reference')->unique();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('tour_package_id');
            $table->foreign('tour_package_id')
                ->references('id')
                ->on('tour_packages')
                ->restrictOnDelete();
            $table->date('tour_date');
            $table->unsignedInteger('number_of_adults');
            $table->unsignedInteger('number_of_children');
            $table->unsignedInteger('total_participants');
            $table->string('pickup_location')->nullable();
            $table->text('special_requests')->nullable();
            $table->decimal('unit_price', 10, 2);
            $table->decimal('total_amount', 10, 2);
            $table->json('pricing_snapshot');
            $table->string('status')->default('pending');
            $table->string('payment_status')->default('pending');
            $table->timestamp('expires_at')->nullable()->index();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tour_bookings');
        Schema::dropIfExists('tour_packages');
    }
};
