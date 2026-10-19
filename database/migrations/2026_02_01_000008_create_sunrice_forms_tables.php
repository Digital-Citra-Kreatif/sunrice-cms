<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Forms visitors fill in on the site, with a blueprint's fields.
        Schema::create('sunrice_forms', function (Blueprint $table): void {
            $table->id();
            $table->string('handle', 64)->unique();
            $table->string('title');
            $table->string('blueprint', 64)->nullable();
            $table->json('notify')->nullable();
            $table->text('message')->nullable();
            $table->timestamps();
        });

        Schema::create('sunrice_form_submissions', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('form_id')->constrained('sunrice_forms')->cascadeOnDelete();
            $table->string('locale', 16);
            $table->json('data');
            $table->timestamps();
            $table->index(['form_id', 'created_at'], 'sunrice_form_sub_form_created_index');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sunrice_form_submissions');
        Schema::dropIfExists('sunrice_forms');
    }
};
