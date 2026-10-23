<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Sunrice\Admin\Media\MediaUsages;

/*
 * Data only. Structured data's logo moved from Settings → Site to
 * Settings → SEO, which has the share image too: the media library's
 * "Used by" names Settings: SEO for both (cms.settings, seo) instead of
 * Settings: Site. Reads the stored values straight from the table (a new
 * site has none). Running it again changes nothing.
 */
return new class extends Migration
{
    public function up(): void
    {
        if (DB::connection()->pretending()) {
            return; // data only: nothing to show
        }
        DB::table('sunrice_media_usages')->where('type', 'sunrice.settings')->where('item_id', 'site')->delete();
        $json = DB::table('sunrice_settings')->where('key', 'site')->value('values');
        $values = is_string($json) ? json_decode($json, true) : null;
        $ids = is_array($values) ? array_values(array_filter([$values['image'] ?? null, $values['logo'] ?? null], is_int(...))) : [];
        if ($ids !== []) {
            $url = Route::has('sunrice.admin.settings.seo.edit') ? route('sunrice.admin.settings.seo.edit') : null;
            app(MediaUsages::class)->sync('cms.settings', 'seo', $ids, 'Settings: SEO', $url);
        }
    }

    public function down(): void
    {
        DB::table('sunrice_media_usages')->where('type', 'cms.settings')->where('item_id', 'seo')->delete();
    }
};
