<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('sunrice_menu_items', function (Blueprint $table): void {
            // Links to a taxonomy's index page: alone the shared one, with collection_id that collection's.
            $table->foreignId('taxonomy_id')->nullable()->constrained('sunrice_taxonomies')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('sunrice_menu_items', function (Blueprint $table): void {
            $table->dropConstrainedForeignId('taxonomy_id');
        });
    }
};
