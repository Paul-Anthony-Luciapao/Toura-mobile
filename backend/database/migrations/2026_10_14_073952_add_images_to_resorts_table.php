<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasColumn('resorts', 'images')) {
            Schema::table('resorts', function (Blueprint $table) {
                $table->json('images')->nullable();
            });
        }
    }

    public function down(): void
    {
        // The images column is also defined by the original
        // create_resorts_table migration.
        // Keep it intact when rolling back this migration.
    }
};
