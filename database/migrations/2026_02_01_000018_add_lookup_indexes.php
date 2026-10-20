<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/*
 * Indexes for lookups the CMS makes: foreign keys (Postgres and SQLite
 * don't index them by themselves), the trash (deleted_at), comments by
 * email, and the scheduled-publish sweep over status and published_at.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('sunrice_entries', function (Blueprint $table): void {
            $table->index('deleted_at');
        });
        Schema::table('sunrice_entry_translations', function (Blueprint $table): void {
            $table->index(['status', 'published_at'], 'sunrice_entry_tr_status_published_index');
        });
        Schema::table('sunrice_revisions', function (Blueprint $table): void {
            $table->index('entry_translation_id', 'sunrice_revisions_translation_index');
        });
        Schema::table('sunrice_terms', function (Blueprint $table): void {
            $table->index('deleted_at');
        });
        Schema::table('sunrice_comments', function (Blueprint $table): void {
            $table->index('parent_id');
            $table->index('author_email');
            $table->index('deleted_at');
        });
        Schema::table('sunrice_menu_items', function (Blueprint $table): void {
            $table->index('entry_id');
            $table->index('term_id');
            $table->index('collection_id');
        });
    }

    public function down(): void
    {
        Schema::table('sunrice_menu_items', function (Blueprint $table): void {
            $table->dropIndex(['entry_id']);
            $table->dropIndex(['term_id']);
            $table->dropIndex(['collection_id']);
        });
        Schema::table('sunrice_comments', function (Blueprint $table): void {
            $table->dropIndex(['parent_id']);
            $table->dropIndex(['author_email']);
            $table->dropIndex(['deleted_at']);
        });
        Schema::table('sunrice_terms', function (Blueprint $table): void {
            $table->dropIndex(['deleted_at']);
        });
        Schema::table('sunrice_revisions', function (Blueprint $table): void {
            $table->dropIndex('sunrice_revisions_translation_index');
        });
        Schema::table('sunrice_entry_translations', function (Blueprint $table): void {
            $table->dropIndex('sunrice_entry_tr_status_published_index');
        });
        Schema::table('sunrice_entries', function (Blueprint $table): void {
            $table->dropIndex(['deleted_at']);
        });
    }
};
