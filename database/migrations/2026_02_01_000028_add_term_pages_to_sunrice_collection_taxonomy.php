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
        Schema::table('sunrice_collection_taxonomy', function (Blueprint $table): void {
            // The taxonomy's term pages in this collection (/books/tags/featured, only its entries): on for new attachments.
            $table->boolean('term_pages')->default(true);
            // Their URL pattern instead of {listing}/{taxonomy}/{slug}, and other languages' own: {"id": "/buku/tag/{slug}"}.
            $table->string('term_route')->nullable();
            $table->json('term_routes')->nullable();
        });
        // Sites attached before keep the pages they had.
        DB::table('sunrice_collection_taxonomy')->update(['term_pages' => false]);
    }

    public function down(): void
    {
        Schema::table('sunrice_collection_taxonomy', function (Blueprint $table): void {
            $table->dropColumn(['term_pages', 'term_route', 'term_routes']);
        });
    }
};
