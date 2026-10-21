<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('sunrice_entry_translations', function (Blueprint $table): void {
            // "Submit for review": when, and by whom (a user id); cleared when it's published.
            $table->timestamp('review_requested_at')->nullable()->index();
            $table->unsignedBigInteger('review_requested_by')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('sunrice_entry_translations', function (Blueprint $table): void {
            $table->dropIndex(['review_requested_at']);
            $table->dropColumn(['review_requested_at', 'review_requested_by']);
        });
    }
};
