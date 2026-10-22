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
        Schema::table('sunrice_taxonomies', function (Blueprint $table): void {
            // The shared index page listing its terms (/tags): off until set.
            $table->string('index_route', 255)->nullable()->unique('sunrice_taxonomies_index_route_unique');
            // Its index pages' own fields.
            $table->string('index_blueprint', 64)->nullable();
        });
        Schema::table('sunrice_collection_taxonomy', function (Blueprint $table): void {
            // The index page of its terms in this collection (/books/tags, only terms with its entries): on for new attachments.
            $table->boolean('index_page')->default(true);
            // Its URL instead of {listing}/{taxonomy}, and other languages' own: {"id": "/buku/tag"}.
            $table->string('index_route')->nullable();
            $table->json('index_routes')->nullable();
        });
        // Sites attached before keep the pages they had.
        DB::table('sunrice_collection_taxonomy')->update(['index_page' => false]);

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
        Schema::table('sunrice_collection_taxonomy', function (Blueprint $table): void {
            $table->dropColumn(['index_page', 'index_route', 'index_routes']);
        });
        Schema::table('sunrice_taxonomies', function (Blueprint $table): void {
            $table->dropUnique('sunrice_taxonomies_index_route_unique');
            $table->dropColumn(['index_route', 'index_blueprint']);
        });
    }
};
