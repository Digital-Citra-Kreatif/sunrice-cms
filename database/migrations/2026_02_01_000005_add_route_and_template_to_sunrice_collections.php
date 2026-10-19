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
            // The entries' public URL ("/blog/{slug}"); none: they have no page.
            $table->string('route')->nullable()->after('dated');
            // The Blade view entries render with; none: cms.{handle}, then cms.entry.
            $table->string('template')->nullable()->after('route');
        });
    }

    public function down(): void
    {
        Schema::table('sunrice_collections', function (Blueprint $table): void {
            $table->dropColumn(['route', 'template']);
        });
    }
};
