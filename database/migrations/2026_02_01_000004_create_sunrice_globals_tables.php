<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Site-wide values (contact details, footer text…), filled in with a blueprint.
        Schema::create('sunrice_global_sets', function (Blueprint $table): void {
            $table->id();
            $table->string('handle', 64)->unique();
            $table->string('title');
            $table->string('blueprint', 64)->nullable();
            $table->timestamps();
        });

        // A global set's values in one language. No drafts: saved is live.
        Schema::create('sunrice_global_values', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('global_set_id')->constrained('sunrice_global_sets')->cascadeOnDelete();
            $table->string('locale', 16);
            $table->json('data');
            $table->timestamps();
            $table->unique(['global_set_id', 'locale']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sunrice_global_values');
        Schema::dropIfExists('sunrice_global_sets');
    }
};
