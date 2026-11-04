
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Convert existing tourist accounts to traveler.
        DB::table('users')
            ->where('role', 'tourist')
            ->update(['role' => 'traveler']);

        // Set the default role for newly created accounts.
        Schema::table('users', function (Blueprint $table) {
            $table->string('role')->default('traveler')->change();
        });
    }

    public function down(): void
    {
        // Intentionally do not revert the role data or default.
        // The team has adopted "traveler" as the standard role.
    }
};
