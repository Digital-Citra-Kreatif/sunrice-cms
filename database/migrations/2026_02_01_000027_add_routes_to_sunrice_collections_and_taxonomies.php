<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        foreach (['sunrice_collections', 'sunrice_taxonomies'] as $name) {
            Schema::table($name, function (Blueprint $table): void {
                // A language's own URL patterns: {"id": {"route": "/buku/{slug}", "listing_route": "/buku"}}; none: the main ones under its prefix.
                $table->json('routes')->nullable();
                // The ones a language had before, whose addresses redirect: {"id": {"route": ["/kitab/{slug}"]}}.
                $table->json('previous_routes')->nullable();
            });
        }
    }

    public function down(): void
    {
        foreach (['sunrice_collections', 'sunrice_taxonomies'] as $name) {
            Schema::table($name, function (Blueprint $table): void {
                $table->dropColumn(['routes', 'previous_routes']);
            });
        }
    }
};
