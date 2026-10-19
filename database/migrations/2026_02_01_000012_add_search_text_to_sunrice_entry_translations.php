<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Sunrice\Cms\Support\SearchText;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('sunrice_entry_translations', function (Blueprint $table): void {
            // The live version's field text, for site search.
            $table->longText('search_text')->nullable();
        });
        DB::table('sunrice_entry_translations')->whereNotNull('data')->orderBy('id')->select(['id', 'data'])
            ->chunkById(200, function ($rows): void {
                foreach ($rows as $row) {
                    $data = is_string($row->data) ? json_decode($row->data, true) : null;
                    DB::table('sunrice_entry_translations')->where('id', $row->id)->update(['search_text' => SearchText::of(is_array($data) ? $data : [])]);
                }
            });
    }

    public function down(): void
    {
        Schema::table('sunrice_entry_translations', function (Blueprint $table): void {
            $table->dropColumn('search_text');
        });
    }
};
