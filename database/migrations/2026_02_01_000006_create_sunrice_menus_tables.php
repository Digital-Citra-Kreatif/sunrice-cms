<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sunrice_menus', function (Blueprint $table): void {
            $table->id();
            $table->string('handle', 64)->unique();
            $table->string('title');
            $table->timestamps();
        });

        // A link in a menu: to an entry (its URL in each language) or to an address.
        Schema::create('sunrice_menu_items', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('menu_id')->constrained('sunrice_menus')->cascadeOnDelete();
            $table->foreignId('parent_id')->nullable()->constrained('sunrice_menu_items')->cascadeOnDelete();
            $table->unsignedInteger('sort_order')->default(0);
            $table->foreignId('entry_id')->nullable()->constrained('sunrice_entries')->nullOnDelete();
            $table->string('url', 2048)->nullable();
            // {"en": "About us", "id": "Tentang kami"}; empty: the entry's title.
            $table->json('labels');
            $table->boolean('new_tab')->default(false);
            $table->timestamps();
            $table->index(['menu_id', 'parent_id', 'sort_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sunrice_menu_items');
        Schema::dropIfExists('sunrice_menus');
    }
};
