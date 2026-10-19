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
            // Links to a term's page or a collection's listing page, besides entries and addresses.
            $table->foreignId('term_id')->nullable()->constrained('sunrice_terms')->nullOnDelete();
            $table->foreignId('collection_id')->nullable()->constrained('sunrice_collections')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('sunrice_menu_items', function (Blueprint $table): void {
            $table->dropConstrainedForeignId('term_id');
            $table->dropConstrainedForeignId('collection_id');
        });
    }
};
