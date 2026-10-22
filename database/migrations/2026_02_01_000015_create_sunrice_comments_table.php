<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Visitors' comments on entries (collections' `comments`, entries' `comments_closed`).
        Schema::create('sunrice_comments', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('entry_id')->constrained('sunrice_entries')->cascadeOnDelete();
            $table->foreignId('parent_id')->nullable()->constrained('sunrice_comments')->nullOnDelete();
            // Signed in: the user; a guest: a name and an email (never shown).
            $table->unsignedBigInteger('user_id')->nullable()->index();
            $table->string('author_name', 100)->nullable();
            $table->string('author_email', 255)->nullable();
            $table->text('body');
            $table->string('status', 16);
            $table->string('locale', 10);
            // Email the author when someone replies; when that was done for this comment.
            $table->boolean('notify_replies')->default(false);
            $table->timestamp('reply_notified_at')->nullable();
            // The visitor's IP address as a keyed hash: enough to spot spam, not to read back.
            $table->string('ip_hash', 64)->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->index(['entry_id', 'status'], 'sunrice_comments_entry_status_index');
            $table->index(['status', 'created_at'], 'sunrice_comments_status_created_index');
            $table->index('parent_id');
            $table->index('author_email');
            $table->index('deleted_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sunrice_comments');
    }
};
