<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/*
 * A full-text index for site search (Site\Search), the way each database
 * does it: MySQL and MariaDB a FULLTEXT index on the title and field text,
 * Postgres a GIN index on their words (the 'simple' dictionary: every
 * language, no stemming). SQLite, for development only, keeps the LIKE scan.
 */
return new class extends Migration
{
    public function up(): void
    {
        $driver = Schema::getConnection()->getDriverName();
        if ($driver === 'mysql' || $driver === 'mariadb') {
            Schema::table('sunrice_entry_translations', function (Blueprint $table): void {
                $table->fullText(['title', 'search_text'], 'sunrice_entry_tr_search_fulltext');
            });
        } elseif ($driver === 'pgsql') {
            // Site\Search queries this exact expression, so the index is used.
            DB::statement("create index sunrice_entry_tr_search_index on sunrice_entry_translations using gin (to_tsvector('simple', coalesce(title, '') || ' ' || coalesce(search_text, '')))");
        }
    }

    public function down(): void
    {
        $driver = Schema::getConnection()->getDriverName();
        if ($driver === 'mysql' || $driver === 'mariadb') {
            Schema::table('sunrice_entry_translations', function (Blueprint $table): void {
                $table->dropFullText('sunrice_entry_tr_search_fulltext');
            });
        } elseif ($driver === 'pgsql') {
            DB::statement('drop index if exists sunrice_entry_tr_search_index');
        }
    }
};
