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
            // What its entries are in structured data (schema.org): Article, WebPage … ; null: by whether it's dated.
            $table->string('schema_type', 40)->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('sunrice_collections', function (Blueprint $table): void {
            $table->dropColumn('schema_type');
        });
    }
};
