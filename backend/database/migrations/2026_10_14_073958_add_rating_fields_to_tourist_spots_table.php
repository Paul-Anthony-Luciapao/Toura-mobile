
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('tourist_spots', function (Blueprint $table) {
            $table->decimal('rating', 3, 2)->default(0);
            $table->unsignedInteger('review_count')->default(0);
            $table->decimal('price', 10, 2)->default(0);
        });
    }

    public function down(): void
    {
        Schema::table('tourist_spots', function (Blueprint $table) {
            $table->dropColumn([
                'rating',
                'review_count',
                'price',
            ]);
        });
    }
};
