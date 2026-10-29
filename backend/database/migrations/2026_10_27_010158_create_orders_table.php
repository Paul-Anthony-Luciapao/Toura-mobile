
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();

            // Customer who placed the order
            $table->foreignId('user_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();

            // Order details
            $table->decimal('total', 10, 2);
            $table->string('currency', 3)->default('PHP');

            // Order and payment status
            $table->string('status')->default('pending');
            $table->string('payment_status')->default('pending');

            // PayMongo references
            $table->string('reference_number')->unique();
            $table->string('paymongo_checkout_session_id')
                ->nullable()
                ->unique();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};

?>