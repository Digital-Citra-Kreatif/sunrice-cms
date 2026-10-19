<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('sunrice_forms', function (Blueprint $table): void {
            // Visitors pass the captcha (sunrice-admin.captcha) to send it.
            $table->boolean('captcha')->default(false);
            // Where visitors go once it's sent; null: back to the page.
            $table->string('redirect_url', 2000)->nullable();
            // Sends one visitor may make per minute; null: sunrice-cms.forms.per_minute.
            $table->unsignedSmallInteger('per_minute')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('sunrice_forms', function (Blueprint $table): void {
            $table->dropColumn(['captcha', 'redirect_url', 'per_minute']);
        });
    }
};
