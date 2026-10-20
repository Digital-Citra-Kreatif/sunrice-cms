<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Counted up on each save, like entry translations: a save over someone else's newer one is refused.
        foreach (['sunrice_global_values', 'sunrice_term_translations', 'sunrice_collection_listings'] as $table) {
            Schema::table($table, function (Blueprint $table): void {
                $table->unsignedInteger('version')->default(1);
            });
        }
    }

    public function down(): void
    {
        foreach (['sunrice_global_values', 'sunrice_term_translations', 'sunrice_collection_listings'] as $table) {
            Schema::table($table, fn (Blueprint $table) => $table->dropColumn('version'));
        }
    }
};
