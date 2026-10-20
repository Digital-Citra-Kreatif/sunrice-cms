<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/*
 * The main translation's version a translation was made or last saved
 * from: when the main one has moved on since, the translation is
 * outdated (EntryTranslation::isOutdated()).
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('sunrice_entry_translations', function (Blueprint $table): void {
            $table->unsignedInteger('main_version')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('sunrice_entry_translations', fn (Blueprint $table) => $table->dropColumn('main_version'));
    }
};
