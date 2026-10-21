<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('sunrice_redirects', function (Blueprint $table): void {
            // Also from the same path in each language's prefix (/listings and /id/listings).
            $table->boolean('every_language')->default(false);
        });
    }

    public function down(): void
    {
        Schema::table('sunrice_redirects', function (Blueprint $table): void {
            $table->dropColumn('every_language');
        });
    }
};
