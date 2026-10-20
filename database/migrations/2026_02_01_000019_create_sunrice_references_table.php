<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/*
 * Which entries and terms content points at through its fields (entries
 * and terms fields, at any depth): an entry's, a term's or a global set's
 * values in a language (source) point at an entry or a term (target).
 * Rebuilt from the field definitions on every save (Support\References).
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sunrice_references', function (Blueprint $table): void {
            $table->id();
            $table->string('source_type', 20);
            $table->unsignedBigInteger('source_id');
            $table->string('locale', 20)->default('');
            $table->string('target_type', 20);
            $table->unsignedBigInteger('target_id');
            $table->string('field');
            $table->index(['source_type', 'source_id', 'locale'], 'sunrice_references_source_index');
            $table->index(['target_type', 'target_id'], 'sunrice_references_target_index');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sunrice_references');
    }
};
