<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('sunrice_collections', function (Blueprint $table): void {
            // The collection's listing (archive) page: a fixed URL like /blog.
            $table->string('listing_route', 255)->nullable()->unique('sunrice_collections_listing_route_unique');
            $table->string('listing_blueprint', 64)->nullable();
            $table->unsignedSmallInteger('per_page')->default(10);
        });

        // A listing page's own fields, per language (its blueprint's).
        Schema::create('sunrice_collection_listings', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('collection_id')->constrained('sunrice_collections')->cascadeOnDelete();
            $table->string('locale', 16);
            $table->json('data');
            $table->timestamps();
            $table->unique(['collection_id', 'locale'], 'sunrice_collection_listings_unique');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sunrice_collection_listings');
        Schema::table('sunrice_collections', function (Blueprint $table): void {
            $table->dropUnique('sunrice_collections_listing_route_unique');
            $table->dropColumn(['listing_route', 'listing_blueprint', 'per_page']);
        });
    }
};
