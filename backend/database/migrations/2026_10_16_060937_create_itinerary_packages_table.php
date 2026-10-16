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
        Schema::create('itinerary_packages', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('spot_id')->nullable();
            $table->string('resort_id')->nullable();
            $table->string('title');
            $table->string('destination')->nullable();
            $table->string('image')->nullable();
            $table->date('start_date')->nullable();
            $table->json('days');
            $table->json('price_breakdown');
            $table->json('inclusions')->nullable();
            $table->json('reviews')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('itinerary_packages');
    }
};
