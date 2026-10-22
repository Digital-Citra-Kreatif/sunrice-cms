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
            // The Blade view its listing page renders with; none: cms.collections.{handle}.index, then cms.collections.index.
            $table->string('listing_template')->nullable();
        });
        Schema::table('sunrice_taxonomies', function (Blueprint $table): void {
            // The Blade view its index pages render with; none: cms.taxonomies.{handle}.index, then cms.taxonomies.index.
            $table->string('index_template')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('sunrice_taxonomies', function (Blueprint $table): void {
            $table->dropColumn('index_template');
        });
        Schema::table('sunrice_collections', function (Blueprint $table): void {
            $table->dropColumn('listing_template');
        });
    }
};
