<?php

declare(strict_types=1);

namespace Sunrice\Cms\Support;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Event;
use Sunrice\Admin\Events\SettingsSaved;
use Sunrice\Admin\Media\Media;
use Sunrice\Cms\Models;
use Sunrice\Cms\Settings\CodeSettings;
use Sunrice\Cms\Settings\SiteSettings;

/**
 * Notices changes to what the site shows, from any source (the admin,
 * AI tools, code), and tells SiteCache. Drafts are not on the site, so
 * saving one changes nothing.
 *
 * @internal
 */
final class ContentWatch
{
    /** Saved or deleted, they change the site. */
    private const MODELS = [
        Models\Collection::class, Models\CollectionListing::class, Models\Taxonomy::class, Models\Term::class,
        Models\TermTranslation::class, Models\Menu::class, Models\MenuItem::class, Models\GlobalSet::class,
        Models\GlobalValue::class, Models\Blueprint::class, Models\Fieldset::class, Models\Redirect::class,
        Models\Form::class, Models\Comment::class, Media::class,
    ];

    /** What of an entry translation the site shows (the rest is its draft). */
    private const LIVE = ['status', 'title', 'slug', 'data', 'published_at'];

    /** What of an entry changes pages. */
    private const ENTRY = ['parent_id', 'sort_order', 'template', 'collection_id'];

    public static function register(): void
    {
        foreach (self::MODELS as $class) {
            foreach (['saved', 'deleted', 'restored'] as $event) {
                Event::listen("eloquent.{$event}: {$class}", fn (Model $model) => self::changed($model));
            }
        }
        Event::listen('eloquent.saved: '.Models\EntryTranslation::class, function (Models\EntryTranslation $translation): void {
            if ($translation->wasChanged(self::LIVE) || ($translation->wasRecentlyCreated && $translation->isPublished())) {
                self::changed($translation);
            }
        });
        Event::listen('eloquent.deleted: '.Models\EntryTranslation::class, fn (Models\EntryTranslation $t) => self::changed($t));
        Event::listen('eloquent.saved: '.Models\Entry::class, function (Models\Entry $entry): void {
            if (! $entry->wasRecentlyCreated && $entry->wasChanged(self::ENTRY)) {
                self::changed($entry);
            }
        });
        foreach (['deleted', 'restored'] as $event) {
            Event::listen("eloquent.{$event}: ".Models\Entry::class, fn (Models\Entry $entry) => self::changed($entry));
        }
        Event::listen(SettingsSaved::class, function (SettingsSaved $event): void {
            if (in_array($event->section, [SiteSettings::key(), CodeSettings::key()], true)) {
                app(SiteCache::class)->changed("settings {$event->section}");
            }
        });
    }

    private static function changed(Model $model): void
    {
        $key = $model->getKey();
        app(SiteCache::class)->changed(strtolower(class_basename($model)).(is_scalar($key) ? ' '.$key : ''));
    }
}
