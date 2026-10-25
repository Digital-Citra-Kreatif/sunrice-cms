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
            // Terms' own fields, and the view their pages render with.
            $table->string('blueprint', 64)->nullable();
            $table->string('template', 100)->nullable();
            // Term pages: a pattern like /topics/{slug}; none: terms have no pages.
            $table->string('route', 255)->nullable()->unique('sunrice_taxonomies_route_unique');
            // The shared index page listing its terms (/tags): off until set.
            $table->string('index_route', 255)->nullable()->unique('sunrice_taxonomies_index_route_unique');
            // Its index pages' own fields.
            $table->string('index_blueprint', 64)->nullable();
            // The Blade view its index pages render with; none: cms.taxonomies.{handle}.index, then cms.taxonomies.index.
            $table->string('index_template')->nullable();
            // A language's own URL patterns: {"id": {"route": "/topik/{slug}", "index_route": "/topik"}}; none: the main ones under its prefix.
            $table->json('routes')->nullable();
            // The ones a language had before, whose addresses redirect: {"id": {"route": ["/kitab/{slug}"]}}.
            $table->json('previous_routes')->nullable();
            // Field handles whose values fill in what a page's SEO card leaves empty.
            $table->string('seo_title_field', 64)->nullable();
            $table->string('seo_description_field', 64)->nullable();
            $table->string('seo_image_field', 64)->nullable();
            // What visitors read in the other languages: {"id": {"title": "Topik"}}.
            $table->json('translations')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('sunrice_collection_taxonomy', function (Blueprint $table): void {
            $table->foreignId('collection_id')->constrained('sunrice_collections')->cascadeOnDelete();
            $table->foreignId('taxonomy_id')->constrained('sunrice_taxonomies')->cascadeOnDelete();
            // The taxonomy's term pages in this collection (/books/tags/featured, only its entries).
            $table->boolean('term_pages')->default(true);
            // Their URL pattern instead of {listing}/{taxonomy}/{slug}, and other languages' own: {"id": "/buku/tag/{slug}"}.
            $table->string('term_route')->nullable();
            $table->json('term_routes')->nullable();
            // The index page of its terms in this collection (/books/tags, only terms with its entries).
            $table->boolean('index_page')->default(true);
            // Its URL instead of {listing}/{taxonomy}, and other languages' own: {"id": "/buku/tag"}.
            $table->string('index_route')->nullable();
            $table->json('index_routes')->nullable();
            // Its entries may have one of its terms at most ("One term only").
            $table->boolean('single')->default(false);
            $table->primary(['collection_id', 'taxonomy_id']);
        });

        Schema::create('sunrice_terms', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('taxonomy_id')->constrained('sunrice_taxonomies')->cascadeOnDelete();
            $table->foreignId('parent_id')->nullable()->constrained('sunrice_terms')->nullOnDelete();
            $table->unsignedInteger('sort_order')->default(0);
            $table->string('template', 100)->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->index(['taxonomy_id', 'parent_id', 'sort_order']);
            // The trash.
            $table->index('deleted_at');
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
            // Fields and SEO, in this language.
            $table->json('data')->nullable();
            // Counted up on each save: a save over someone else's newer one is refused.
            $table->unsignedInteger('version')->default(1);
            $table->timestamps();
            $table->unique(['term_id', 'locale'], 'sunrice_term_tr_term_locale_unique');
            $table->unique(['taxonomy_id', 'locale', 'slug'], 'sunrice_term_tr_slug_unique');
        });

        // Which terms published entries have (their live terms, chosen in the editor's Taxonomies card): for queries.
        Schema::create('sunrice_entry_term', function (Blueprint $table): void {
            $table->foreignId('entry_id')->constrained('sunrice_entries')->cascadeOnDelete();
            $table->foreignId('term_id')->constrained('sunrice_terms')->cascadeOnDelete();
            $table->primary(['entry_id', 'term_id']);
            $table->index('term_id');
        });

        // Index pages' own fields, per page (collection_id null: the shared one) and language.
        Schema::create('sunrice_taxonomy_listings', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('taxonomy_id')->constrained('sunrice_taxonomies')->cascadeOnDelete();
            $table->foreignId('collection_id')->nullable()->constrained('sunrice_collections')->cascadeOnDelete();
            $table->string('locale', 16);
            $table->json('data');
            $table->unsignedInteger('version')->default(1);
            $table->timestamps();
            $table->unique(['taxonomy_id', 'collection_id', 'locale'], 'sunrice_taxonomy_listings_unique');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sunrice_taxonomy_listings');
        Schema::dropIfExists('sunrice_entry_term');
        Schema::dropIfExists('sunrice_term_translations');
        Schema::dropIfExists('sunrice_terms');
        Schema::dropIfExists('sunrice_collection_taxonomy');
        Schema::dropIfExists('sunrice_taxonomies');
    }
};
