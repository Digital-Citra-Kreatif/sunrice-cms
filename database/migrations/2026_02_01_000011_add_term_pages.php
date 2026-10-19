<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('sunrice_taxonomies', function (Blueprint $table): void {
            // Term pages: a pattern like /topics/{slug}; none: terms have no pages.
            $table->string('route', 255)->nullable()->unique('sunrice_taxonomies_route_unique');
            // Terms' own fields, and the view their pages render with.
            $table->string('blueprint', 64)->nullable();
            $table->string('template', 100)->nullable();
        });
        Schema::table('sunrice_terms', function (Blueprint $table): void {
            $table->string('template', 100)->nullable();
            $table->softDeletes();
        });
        Schema::table('sunrice_term_translations', function (Blueprint $table): void {
            // Fields and SEO, in this language.
            $table->json('data')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('sunrice_term_translations', fn (Blueprint $table) => $table->dropColumn('data'));
        Schema::table('sunrice_terms', function (Blueprint $table): void {
            $table->dropSoftDeletes();
            $table->dropColumn('template');
        });
        Schema::table('sunrice_taxonomies', function (Blueprint $table): void {
            $table->dropUnique('sunrice_taxonomies_route_unique');
            $table->dropColumn(['route', 'blueprint', 'template']);
        });
    }
};
