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
            // Role names whose members are emailed each submission, besides the addresses.
            $table->json('notify_roles')->nullable();
            $table->text('message')->nullable();
            // Visitors pass the captcha (sunrice-admin.captcha) to send it.
            $table->boolean('captcha')->default(false);
            // Where visitors go once it's sent; null: back to the page.
            $table->string('redirect_url', 2000)->nullable();
            // Sends one visitor may make per minute; null: sunrice-cms.forms.per_minute.
            $table->unsignedSmallInteger('per_minute')->nullable();
            // The thank-you message in the other languages: {"id": {"message": "Terima kasih"}}.
            $table->json('translations')->nullable();
            $table->timestamps();
        });

        Schema::create('sunrice_form_submissions', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('form_id')->constrained('sunrice_forms')->cascadeOnDelete();
            $table->string('locale', 16);
            $table->json('data');
            // Who sent it, for telling spam and abuse apart (personal data: see packages/cms/docs/forms.md).
            $table->string('ip_address', 45)->nullable();
            $table->string('user_agent', 512)->nullable();
            $table->string('referrer', 2000)->nullable();
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
