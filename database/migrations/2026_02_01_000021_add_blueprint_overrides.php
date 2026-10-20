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
            // More blueprints its entries may use (handles), besides its own.
            $table->json('blueprints')->nullable();
        });
        Schema::table('sunrice_entries', function (Blueprint $table): void {
            // The entry's own blueprint (a handle); null: the collection's.
            $table->string('blueprint', 64)->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('sunrice_entries', function (Blueprint $table): void {
            $table->dropColumn('blueprint');
        });
        Schema::table('sunrice_collections', function (Blueprint $table): void {
            $table->dropColumn('blueprints');
        });
    }
};
