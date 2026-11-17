<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('conversations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('traveler_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('owner_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('resort_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('booking_id')->nullable()->constrained()->nullOnDelete();
            $table->string('subject')->nullable();
            $table->string('status')->default('open');
            $table->timestamp('traveler_last_read_at')->nullable();
            $table->timestamp('owner_last_read_at')->nullable();
            $table->timestamp('last_message_at')->nullable()->index();
            $table->timestamps();
            $table->index(['traveler_id', 'status']);
            $table->index(['owner_id', 'status']);
        });

        Schema::create('conversation_messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('conversation_id')->constrained()->cascadeOnDelete();
            $table->foreignId('sender_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('sender_name');
            $table->string('sender_role')->nullable();
            $table->text('body');
            $table->string('client_id')->nullable();
            $table->timestamps();
            $table->index(['conversation_id', 'id']);
            $table->unique(['conversation_id', 'sender_id', 'client_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('conversation_messages');
        Schema::dropIfExists('conversations');
    }
};
