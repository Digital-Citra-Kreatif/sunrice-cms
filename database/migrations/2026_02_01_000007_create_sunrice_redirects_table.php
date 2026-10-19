<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Old addresses that moved: made when a published entry's slug changes, or by hand.
        Schema::create('sunrice_redirects', function (Blueprint $table): void {
            $table->id();
            $table->string('from_path', 512)->unique();
            $table->string('to_url', 2048);
            $table->unsignedSmallInteger('status')->default(301);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sunrice_redirects');
    }
};
