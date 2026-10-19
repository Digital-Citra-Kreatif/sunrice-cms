<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // The fields of collections, taxonomies, globals and forms.
        Schema::create('sunrice_blueprints', function (Blueprint $table): void {
            $table->id();
            $table->string('handle', 64)->unique();
            $table->string('title');
            $table->json('fields');
            $table->timestamps();
        });

        // Fields shared between blueprints, and the kinds of flexible block.
        Schema::create('sunrice_fieldsets', function (Blueprint $table): void {
            $table->id();
            $table->string('handle', 64)->unique();
            $table->string('title');
            $table->json('fields');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sunrice_fieldsets');
        Schema::dropIfExists('sunrice_blueprints');
    }
};
