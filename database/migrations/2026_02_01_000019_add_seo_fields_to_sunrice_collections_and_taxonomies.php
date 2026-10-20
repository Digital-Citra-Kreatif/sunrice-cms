<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    private const COLUMNS = ['seo_title_field', 'seo_description_field', 'seo_image_field'];

    public function up(): void
    {
        foreach (['sunrice_collections', 'sunrice_taxonomies'] as $name) {
            Schema::table($name, function (Blueprint $table): void {
                // Field handles whose values fill in what a page's SEO card leaves empty.
                foreach (self::COLUMNS as $column) {
                    $table->string($column, 64)->nullable();
                }
            });
        }
    }

    public function down(): void
    {
        foreach (['sunrice_collections', 'sunrice_taxonomies'] as $name) {
            Schema::table($name, function (Blueprint $table): void {
                $table->dropColumn(self::COLUMNS);
            });
        }
    }
};
