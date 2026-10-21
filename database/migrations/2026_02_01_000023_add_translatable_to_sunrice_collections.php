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
            // Entries can have a version in each language; off: the main language only.
            $table->boolean('translatable')->default(true);
        });
    }

    public function down(): void
    {
        Schema::table('sunrice_collections', function (Blueprint $table): void {
            $table->dropColumn('translatable');
        });
    }
};
