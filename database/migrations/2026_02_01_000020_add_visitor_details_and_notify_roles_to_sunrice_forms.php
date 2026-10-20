<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('sunrice_form_submissions', function (Blueprint $table): void {
            // Who sent it, for telling spam and abuse apart (personal data: see packages/cms/docs/forms.md).
            $table->string('ip_address', 45)->nullable();
            $table->string('user_agent', 512)->nullable();
            $table->string('referrer', 2000)->nullable();
        });
        Schema::table('sunrice_forms', function (Blueprint $table): void {
            // Role names whose members are emailed each submission, besides the addresses.
            $table->json('notify_roles')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('sunrice_form_submissions', function (Blueprint $table): void {
            $table->dropColumn(['ip_address', 'user_agent', 'referrer']);
        });
        Schema::table('sunrice_forms', function (Blueprint $table): void {
            $table->dropColumn('notify_roles');
        });
    }
};
