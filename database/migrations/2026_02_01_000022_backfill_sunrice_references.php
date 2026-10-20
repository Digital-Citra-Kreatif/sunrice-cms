<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Sunrice\Cms\Actions\References\RebuildReferences;

/*
 * Data only: records the references of content saved before
 * sunrice_references existed (000019), in chunks, as sunrice:references
 * does. Nothing to do on an empty database.
 */
return new class extends Migration
{
    public function up(): void
    {
        app(RebuildReferences::class)->handle(media: false);
    }

    public function down(): void
    {
        // Nothing to undo: the references stay right whichever way.
    }
};
