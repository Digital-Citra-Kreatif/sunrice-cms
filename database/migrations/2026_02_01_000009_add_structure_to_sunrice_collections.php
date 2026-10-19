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
            // Entries may have a parent entry (pages under pages); URLs stay flat.
            $table->boolean('hierarchical')->default(false);
            // Entries are in the order editors put them in, not by date or title.
            $table->boolean('ordered')->default(false);
        });
        Schema::table('sunrice_entries', function (Blueprint $table): void {
            $table->unsignedBigInteger('parent_id')->nullable()->index();
            $table->unsignedInteger('sort_order')->default(0);
            // A Blade view for this entry alone.
            $table->string('template', 100)->nullable();
            $table->index(['collection_id', 'sort_order'], 'sunrice_entries_collection_order_index');
        });
    }

    public function down(): void
    {
        Schema::table('sunrice_entries', function (Blueprint $table): void {
            $table->dropIndex('sunrice_entries_collection_order_index');
            $table->dropIndex(['parent_id']);
            $table->dropColumn(['parent_id', 'sort_order', 'template']);
        });
        Schema::table('sunrice_collections', function (Blueprint $table): void {
            $table->dropColumn(['hierarchical', 'ordered']);
        });
    }
};
