<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Kinds of content: pages, articles, products.
        Schema::create('sunrice_collections', function (Blueprint $table): void {
            $table->id();
            $table->string('handle', 64)->unique();
            $table->string('title');
            // A blueprint's handle; entries keep their data if it changes or goes.
            $table->string('blueprint', 64)->nullable();
            $table->boolean('dated')->default(false);
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('sunrice_entries', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('collection_id')->constrained('sunrice_collections')->cascadeOnDelete();
            // The app's users table is the app's: no foreign key.
            $table->unsignedBigInteger('author_id')->nullable()->index();
            $table->timestamps();
            $table->softDeletes();
        });

        // An entry in one language: the live version (title, slug, data) and the draft.
        Schema::create('sunrice_entry_translations', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('entry_id')->constrained('sunrice_entries')->cascadeOnDelete();
            // Copied from the entry so slugs can be unique per collection and language.
            $table->unsignedBigInteger('collection_id');
            $table->string('locale', 16);
            $table->string('status', 16)->default('draft');
            $table->string('title')->nullable();
            $table->string('slug')->nullable();
            $table->json('data')->nullable();
            $table->string('draft_title');
            $table->string('draft_slug');
            $table->json('draft_data');
            $table->timestamp('published_at')->nullable();
            // Goes up on every save, so a save from a stale page is caught.
            $table->unsignedInteger('version')->default(1);
            $table->timestamps();

            // Named, as generated names pass MySQL's 64 characters.
            $table->unique(['entry_id', 'locale'], 'sunrice_entry_tr_entry_locale_unique');
            $table->unique(['collection_id', 'locale', 'slug'], 'sunrice_entry_tr_slug_unique');
            $table->index(['collection_id', 'locale', 'draft_slug'], 'sunrice_entry_tr_draft_slug_index');
            $table->index(['collection_id', 'locale', 'status', 'published_at'], 'sunrice_entry_tr_live_index');
        });

        // The published versions of an entry translation.
        Schema::create('sunrice_revisions', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('entry_translation_id')->constrained('sunrice_entry_translations')->cascadeOnDelete();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->string('title');
            $table->string('slug');
            $table->json('data');
            $table->timestamp('created_at')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sunrice_revisions');
        Schema::dropIfExists('sunrice_entry_translations');
        Schema::dropIfExists('sunrice_entries');
        Schema::dropIfExists('sunrice_collections');
    }
};
