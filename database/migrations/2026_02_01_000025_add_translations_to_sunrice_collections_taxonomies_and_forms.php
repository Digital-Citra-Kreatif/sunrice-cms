<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // What visitors read in the other languages: {"id": {"title": "Properti"}} ({"id": {"message": "…"}} for forms).
        foreach (['sunrice_collections', 'sunrice_taxonomies', 'sunrice_forms'] as $name) {
            Schema::table($name, function (Blueprint $table): void {
                $table->json('translations')->nullable();
            });
        }
    }

    public function down(): void
    {
        foreach (['sunrice_collections', 'sunrice_taxonomies', 'sunrice_forms'] as $name) {
            Schema::table($name, function (Blueprint $table): void {
                $table->dropColumn('translations');
            });
        }
    }
};
