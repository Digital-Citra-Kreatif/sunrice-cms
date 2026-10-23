<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/*
 * An entry's terms are its own, shared by its languages, chosen in the
 * editor's Taxonomies card for the taxonomies attached to its collection.
 */
return new class extends Migration
{
    public function up(): void
    {
        // A taxonomy attached to a collection may allow one term per entry there.
        Schema::table('sunrice_collection_taxonomy', function (Blueprint $table): void {
            $table->boolean('single')->default(false);
        });

        // The terms chosen and not published yet (term ids); null: the live ones (sunrice_entry_term).
        Schema::table('sunrice_entries', function (Blueprint $table): void {
            $table->json('draft_terms')->nullable();
        });

        // The entry's terms when the revision was published (term ids), so restoring brings them back.
        Schema::table('sunrice_revisions', function (Blueprint $table): void {
            $table->json('terms')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('sunrice_revisions', fn (Blueprint $table) => $table->dropColumn('terms'));
        Schema::table('sunrice_entries', fn (Blueprint $table) => $table->dropColumn('draft_terms'));
        Schema::table('sunrice_collection_taxonomy', fn (Blueprint $table) => $table->dropColumn('single'));
    }
};
