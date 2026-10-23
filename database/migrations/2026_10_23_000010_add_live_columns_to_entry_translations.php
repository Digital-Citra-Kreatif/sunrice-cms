<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/*
 * What a translation's live version is: its version when last published,
 * so discarding the main translation's changes leaves the other languages
 * that were up to date with it up to date (EntryTranslation::isOutdated()),
 * and when it was last published, the date the site gives as modified
 * (saving a draft doesn't change it).
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('sunrice_entry_translations', function (Blueprint $table): void {
            $table->unsignedInteger('live_version')->nullable();
            $table->timestamp('live_updated_at')->nullable();
        });

        // Published before: when its latest revision was made.
        DB::table('sunrice_entry_translations')->whereNotNull('data')->update([
            'live_updated_at' => DB::table('sunrice_revisions')->selectRaw('max(created_at)')
                ->whereColumn('sunrice_revisions.entry_translation_id', 'sunrice_entry_translations.id'),
        ]);
    }

    public function down(): void
    {
        Schema::table('sunrice_entry_translations', fn (Blueprint $table) => $table->dropColumn(['live_version', 'live_updated_at']));
    }
};
