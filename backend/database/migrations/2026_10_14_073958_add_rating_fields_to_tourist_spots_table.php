<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('tourist_spots', function (Blueprint $table) {
            if (!Schema::hasColumn('tourist_spots', 'rating')) {
                $table->decimal('rating', 3, 2)->default(0);
            }

            if (!Schema::hasColumn('tourist_spots', 'review_count')) {
                $table->unsignedInteger('review_count')->default(0);
            }

            if (!Schema::hasColumn('tourist_spots', 'price')) {
                $table->decimal('price', 10, 2)->default(0);
            }
        });
    }

    public function down(): void
    {
        // These columns are also defined by the original
        // create_tourist_spots_table migration.
        // Keep them intact when rolling back this migration.
    }
};
