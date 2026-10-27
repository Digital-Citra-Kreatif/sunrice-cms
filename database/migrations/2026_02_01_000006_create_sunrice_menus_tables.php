<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sunrice_menus', function (Blueprint $table): void {
            $table->id();
            $table->string('handle', 64)->unique();
            $table->string('title');
            // Counted up each time its links change: a save from an editor opened before is refused.
            $table->unsignedInteger('version')->default(1);
            $table->timestamps();
        });

        // A link in a menu: to an entry, a term's page, a collection's listing page or a
        // taxonomy's index page (their URL in each language), or to an address.
        Schema::create('sunrice_menu_items', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('menu_id')->constrained('sunrice_menus')->cascadeOnDelete();
            $table->foreignId('parent_id')->nullable()->constrained('sunrice_menu_items')->cascadeOnDelete();
            $table->unsignedInteger('sort_order')->default(0);
            $table->foreignId('entry_id')->nullable()->constrained('sunrice_entries')->nullOnDelete();
            $table->foreignId('term_id')->nullable()->constrained('sunrice_terms')->nullOnDelete();
            $table->foreignId('collection_id')->nullable()->constrained('sunrice_collections')->nullOnDelete();
            // A taxonomy's index page: alone the shared one, with collection_id that collection's.
            $table->foreignId('taxonomy_id')->nullable()->constrained('sunrice_taxonomies')->nullOnDelete();
            $table->string('url', 2048)->nullable();
            // A listing page's filters, "listing_type=for-sale": added to its address in each language.
            $table->string('query_string', 500)->nullable();
            // {"en": "About us", "id": "Tentang kami"}; empty: the entry's title.
            $table->json('labels');
            $table->boolean('new_tab')->default(false);
            $table->timestamps();
            $table->index(['menu_id', 'parent_id', 'sort_order']);
            // Postgres and SQLite don't index a foreign key by themselves.
            $table->index('entry_id');
            $table->index('term_id');
            $table->index('collection_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sunrice_menu_items');
        Schema::dropIfExists('sunrice_menus');
    }
};
