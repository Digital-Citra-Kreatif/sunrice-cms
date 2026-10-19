<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Ways to group entries: categories, tags, topics.
        Schema::create('sunrice_taxonomies', function (Blueprint $table): void {
            $table->id();
            $table->string('handle', 64)->unique();
            $table->string('title');
            $table->boolean('hierarchical')->default(false);
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('sunrice_collection_taxonomy', function (Blueprint $table): void {
            $table->foreignId('collection_id')->constrained('sunrice_collections')->cascadeOnDelete();
            $table->foreignId('taxonomy_id')->constrained('sunrice_taxonomies')->cascadeOnDelete();
            $table->primary(['collection_id', 'taxonomy_id']);
        });

        Schema::create('sunrice_terms', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('taxonomy_id')->constrained('sunrice_taxonomies')->cascadeOnDelete();
            $table->foreignId('parent_id')->nullable()->constrained('sunrice_terms')->nullOnDelete();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
            $table->index(['taxonomy_id', 'parent_id', 'sort_order']);
        });

        // A term in one language. Terms have no drafts: they show as saved.
        Schema::create('sunrice_term_translations', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('term_id')->constrained('sunrice_terms')->cascadeOnDelete();
            // Copied from the term so slugs can be unique per taxonomy and language.
            $table->unsignedBigInteger('taxonomy_id');
            $table->string('locale', 16);
            $table->string('title');
            $table->string('slug');
            $table->timestamps();
            $table->unique(['term_id', 'locale'], 'sunrice_term_tr_term_locale_unique');
            $table->unique(['taxonomy_id', 'locale', 'slug'], 'sunrice_term_tr_slug_unique');
        });

        // Which terms published entries have, from their terms fields: for queries.
        Schema::create('sunrice_entry_term', function (Blueprint $table): void {
            $table->foreignId('entry_id')->constrained('sunrice_entries')->cascadeOnDelete();
            $table->foreignId('term_id')->constrained('sunrice_terms')->cascadeOnDelete();
            $table->primary(['entry_id', 'term_id']);
            $table->index('term_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sunrice_entry_term');
        Schema::dropIfExists('sunrice_term_translations');
        Schema::dropIfExists('sunrice_terms');
        Schema::dropIfExists('sunrice_collection_taxonomy');
        Schema::dropIfExists('sunrice_taxonomies');
    }
};
