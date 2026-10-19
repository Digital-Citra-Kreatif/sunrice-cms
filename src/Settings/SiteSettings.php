<?php

declare(strict_types=1);

namespace Sunrice\Cms\Settings;

use Sunrice\Admin\Resources\Forms\Form;
use Sunrice\Admin\Resources\Forms\Select;
use Sunrice\Admin\Settings\Settings;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Support\Locales;

/**
 * Settings → Site, guarded by cms.settings.site: the homepage.
 *
 * @api
 */
final class SiteSettings extends Settings
{
    /** The entry shown at / (and /{locale}), by id; null: none. */
    public ?int $homepage = null;

    public static function key(): string
    {
        return 'site';
    }

    public static function description(): string
    {
        return 'The site\'s homepage.';
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            Select::make('homepage')->label('Homepage')->options(self::homepages())
                ->help('The entry shown at the site\'s address (/), in each language it\'s published in. Its own address redirects there.'),
        ]);
    }

    /** @return array<int|string, string> entries with pages, by id: "Pages: About" */
    private static function homepages(): array
    {
        $routed = Collection::query()->whereNotNull('route')->get()->keyBy('id');

        $options = [];
        $translations = EntryTranslation::query()->where('locale', Locales::default())->whereIn('collection_id', $routed->keys())
            ->whereHas('entry', fn ($q) => $q->withoutTrashed())->orderBy('draft_title')->limit(500)->get();
        foreach ($translations as $t) {
            $options[(string) $t->entry_id] = ($routed->get($t->collection_id)->title ?? '').': '.$t->draft_title;
        }

        return $options;
    }
}
