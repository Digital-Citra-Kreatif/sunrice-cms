<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
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
            // More blueprints its entries may use (handles), besides its own.
            $table->json('blueprints')->nullable();
            $table->boolean('dated')->default(false);
            // Entries may have a parent entry (pages under pages); URLs stay flat.
            $table->boolean('hierarchical')->default(false);
            // Entries are in the order editors put them in, not by date or title.
            $table->boolean('ordered')->default(false);
            // Entries can have a version in each language; off: the main language only.
            $table->boolean('translatable')->default(true);
            // Visitors may comment on its entries.
            $table->boolean('comments')->default(false);
            // The entries' public URL ("/blog/{slug}"); none: they have no page.
            $table->string('route')->nullable();
            // The Blade view entries render with; none: cms.{handle}, then cms.entry.
            $table->string('template')->nullable();
            // The collection's listing (archive) page: a fixed URL like /blog.
            $table->string('listing_route', 255)->nullable()->unique('sunrice_collections_listing_route_unique');
            $table->string('listing_blueprint', 64)->nullable();
            // The Blade view its listing page renders with; none: cms.collections.{handle}.index, then cms.collections.index.
            $table->string('listing_template')->nullable();
            $table->unsignedSmallInteger('per_page')->default(10);
            // A language's own URL patterns: {"id": {"route": "/buku/{slug}", "listing_route": "/buku"}}; none: the main ones under its prefix.
            $table->json('routes')->nullable();
            // The ones a language had before, whose addresses redirect: {"id": {"route": ["/kitab/{slug}"]}}.
            $table->json('previous_routes')->nullable();
            // What its entries are in structured data (schema.org): Article, WebPage … ; null: by whether it's dated.
            $table->string('schema_type', 40)->nullable();
            // Field handles whose values fill in what a page's SEO card leaves empty.
            $table->string('seo_title_field', 64)->nullable();
            $table->string('seo_description_field', 64)->nullable();
            $table->string('seo_image_field', 64)->nullable();
            // What visitors read in the other languages: {"id": {"title": "Properti"}}.
            $table->json('translations')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('sunrice_entries', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('collection_id')->constrained('sunrice_collections')->cascadeOnDelete();
            $table->unsignedBigInteger('parent_id')->nullable()->index();
            $table->unsignedInteger('sort_order')->default(0);
            // The entry's own blueprint (a handle); null: the collection's.
            $table->string('blueprint', 64)->nullable();
            // A Blade view for this entry alone.
            $table->string('template', 100)->nullable();
            // The app's users table is the app's: no foreign key.
            $table->unsignedBigInteger('author_id')->nullable()->index();
            // This entry takes no new comments (its approved ones stay).
            $table->boolean('comments_closed')->default(false);
            $table->timestamps();
            $table->softDeletes();
            // Its terms (shared by its languages) chosen and not published yet, as term ids; null: the live ones (sunrice_entry_term).
            $table->json('draft_terms')->nullable();
            $table->index(['collection_id', 'sort_order'], 'sunrice_entries_collection_order_index');
            // The trash.
            $table->index('deleted_at');
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
            // The live version's field text, for site search.
            $table->longText('search_text')->nullable();
            $table->string('draft_title');
            $table->string('draft_slug');
            $table->json('draft_data');
            $table->timestamp('published_at')->nullable();
            // Goes up on every save, so a save from a stale page is caught.
            $table->unsignedInteger('version')->default(1);
            // The main translation's version this one was made or last saved from: when the
            // main one has moved on since, this one is outdated (EntryTranslation::isOutdated()).
            $table->unsignedInteger('main_version')->nullable();
            // "Submit for review": when, and by whom (a user id); cleared when it's published.
            $table->timestamp('review_requested_at')->nullable()->index();
            $table->unsignedBigInteger('review_requested_by')->nullable();
            $table->timestamps();
            // Its version when last published, so discarding the main translation's changes leaves the
            // other languages that were up to date with it up to date (EntryTranslation::isOutdated()),
            // and when it was last published: the date the site gives as modified (saving a draft doesn't change it).
            $table->unsignedInteger('live_version')->nullable();
            $table->timestamp('live_updated_at')->nullable();

            // Named, as generated names pass MySQL's 64 characters.
            $table->unique(['entry_id', 'locale'], 'sunrice_entry_tr_entry_locale_unique');
            $table->unique(['collection_id', 'locale', 'slug'], 'sunrice_entry_tr_slug_unique');
            $table->index(['collection_id', 'locale', 'draft_slug'], 'sunrice_entry_tr_draft_slug_index');
            $table->index(['collection_id', 'locale', 'status', 'published_at'], 'sunrice_entry_tr_live_index');
            // The scheduled-publish sweep.
            $table->index(['status', 'published_at'], 'sunrice_entry_tr_status_published_index');
        });

        /*
         * A full-text index for site search (Site\Search), the way each database
         * does it: MySQL and MariaDB a FULLTEXT index on the title and field text,
         * Postgres a GIN index on their words (the 'simple' dictionary: every
         * language, no stemming). SQLite, for development only, keeps the LIKE scan.
         */
        $driver = Schema::getConnection()->getDriverName();
        if ($driver === 'mysql' || $driver === 'mariadb') {
            Schema::table('sunrice_entry_translations', function (Blueprint $table): void {
                $table->fullText(['title', 'search_text'], 'sunrice_entry_tr_search_fulltext');
            });
        } elseif ($driver === 'pgsql') {
            // Site\Search queries this exact expression, so the index is used.
            DB::statement("create index sunrice_entry_tr_search_index on sunrice_entry_translations using gin (to_tsvector('simple', coalesce(title, '') || ' ' || coalesce(search_text, '')))");
        }

        // The published versions of an entry translation.
        Schema::create('sunrice_revisions', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('entry_translation_id')->constrained('sunrice_entry_translations')->cascadeOnDelete();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->string('title');
            $table->string('slug');
            $table->json('data');
            $table->timestamp('created_at')->nullable();
            // The entry's terms when it was published (term ids), so restoring brings them back.
            $table->json('terms')->nullable();
            // Postgres and SQLite don't index a foreign key by themselves.
            $table->index('entry_translation_id', 'sunrice_revisions_translation_index');
        });

        // A listing page's own fields, per language (its blueprint's).
        Schema::create('sunrice_collection_listings', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('collection_id')->constrained('sunrice_collections')->cascadeOnDelete();
            $table->string('locale', 16);
            $table->json('data');
            // Counted up on each save: a save over someone else's newer one is refused.
            $table->unsignedInteger('version')->default(1);
            $table->timestamps();
            $table->unique(['collection_id', 'locale'], 'sunrice_collection_listings_unique');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sunrice_collection_listings');
        Schema::dropIfExists('sunrice_revisions');
        Schema::dropIfExists('sunrice_entry_translations');
        Schema::dropIfExists('sunrice_entries');
        Schema::dropIfExists('sunrice_collections');
    }
};
