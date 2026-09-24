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
        Schema::create('accommodations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('resort_id')->constrained('resorts')->onDelete('cascade');
            $table->string('title');
            $table->text('description')->nullable();
            $table->decimal('price_per_night', 10, 2);
            $table->unsignedInteger('capacity');
            $table->string('bed_type');
            $table->unsignedInteger('bed_count')->default(1);
            $table->unsignedInteger('available_units')->default(1);
            $table->decimal('size', 8, 2)->nullable();
            $table->string('image')->nullable();
            $table->json('amenities')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accommodations');
    }
};
