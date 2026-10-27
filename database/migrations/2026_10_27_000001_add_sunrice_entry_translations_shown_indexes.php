<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/*
 * Live entries as a language shows them (EntryTranslation::live() and
 * shownIn()), found from the indexes alone: a collection's live
 * translations in a language with their entries, and the entries live in a
 * language, the ones the main language doesn't stand in for. The first
 * replaces the live index, which it starts with.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('sunrice_entry_translations', function (Blueprint $table): void {
            $table->index(['collection_id', 'locale', 'status', 'published_at', 'entry_id'], 'sunrice_entry_tr_shown_index');
            $table->index(['locale', 'status', 'published_at', 'entry_id'], 'sunrice_entry_tr_locale_live_index');
        });
        Schema::table('sunrice_entry_translations', function (Blueprint $table): void {
            $table->dropIndex('sunrice_entry_tr_live_index');
        });
    }

    public function down(): void
    {
        Schema::table('sunrice_entry_translations', function (Blueprint $table): void {
            $table->index(['collection_id', 'locale', 'status', 'published_at'], 'sunrice_entry_tr_live_index');
        });
        Schema::table('sunrice_entry_translations', function (Blueprint $table): void {
            $table->dropIndex('sunrice_entry_tr_shown_index');
            $table->dropIndex('sunrice_entry_tr_locale_live_index');
        });
    }
};
