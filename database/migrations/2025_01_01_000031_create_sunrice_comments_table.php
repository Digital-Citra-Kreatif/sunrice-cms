<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Visitor discussions on entries of collections with comments on.
     * Replies point at the comment they answer (parent_id); every
     * language shares an entry's thread, and `locale` records the
     * language a comment was written in.
     */
    public function up(): void
    {
        Schema::create('sunrice_comments', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('entry_id')->constrained('sunrice_entries')->cascadeOnDelete();
            $table->foreignId('parent_id')->nullable()->constrained('sunrice_comments')->nullOnDelete();
            // Signed-in commenters; guests give a name and email instead.
            $table->unsignedBigInteger('user_id')->nullable()->index();
            $table->string('author_name', 100);
            $table->string('author_email')->nullable()->index();
            $table->text('body');
            $table->string('status', 20)->default('pending'); // pending | approved | spam
            $table->string('locale', 20);
            // The commenter asked to be emailed when someone replies.
            $table->boolean('notify_replies')->default(false);
            // Hashed with the app key: enough to rate-limit and spot spam, not to identify.
            $table->string('ip_hash', 64)->nullable()->index();
            $table->string('user_agent')->nullable();
            $table->timestamp('approved_at')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index(['entry_id', 'status', 'created_at']);
            $table->index(['status', 'created_at']);
        });

        Schema::table('sunrice_entries', function (Blueprint $table): void {
            // Closes one entry's comments while its collection keeps them on.
            $table->boolean('comments_closed')->default(false);
        });
    }

    public function down(): void
    {
        Schema::table('sunrice_entries', function (Blueprint $table): void {
            $table->dropColumn('comments_closed');
        });
        Schema::dropIfExists('sunrice_comments');
    }
};
