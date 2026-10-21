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
            // A listing page's filters, "listing_type=for-sale": added to its address in each language.
            $table->string('query_string', 500)->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('sunrice_menu_items', function (Blueprint $table): void {
            $table->dropColumn('query_string');
        });
    }
};
