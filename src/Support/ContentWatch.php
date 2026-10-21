<?php

declare(strict_types=1);

namespace Sunrice\Cms\Support;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Event;
use Sunrice\Admin\Events\SettingsSaved;
use Sunrice\Admin\Media\Media;
use Sunrice\Cms\Models;
use Sunrice\Cms\Settings\CacheSettings;
use Sunrice\Cms\Settings\CodeSettings;
use Sunrice\Cms\Settings\SiteSettings;
use Sunrice\Cms\Site\PageCache;

/**
 * Notices changes to what the site shows, from any source (the admin,
 * AI tools, code), and tells SiteCache which areas they touch. Drafts
 * are not on the site, so saving one changes nothing.
 *
 * @internal
 */
final class ContentWatch
{
    /**
     * Saved or deleted, they change the site: the cache areas each one
     * touches (empty: all of them).
     *
     * @var array<class-string<Model>, list<string>>
     */
    private const MODELS = [
        // Routes, menus and the sitemap all follow collections, taxonomies and terms.
        Models\Collection::class => [],
        Models\CollectionListing::class => [],
        Models\Taxonomy::class => [],
        Models\Term::class => [],
        Models\TermTranslation::class => [],
        Models\Menu::class => [SiteCache::MENUS, SiteCache::PAGES],
        Models\MenuItem::class => [SiteCache::MENUS, SiteCache::PAGES],
        // What templates render: only kept pages change.
        Models\GlobalSet::class => [SiteCache::PAGES],
        Models\GlobalValue::class => [SiteCache::PAGES],
        Models\Blueprint::class => [SiteCache::PAGES],
        Models\Fieldset::class => [SiteCache::PAGES],
        Models\Form::class => [SiteCache::PAGES],
        Media::class => [SiteCache::PAGES],
        // Only looked up when no page is at the address, and those aren't kept.
        Models\Redirect::class => [SiteCache::ROUTES],
    ];

    /** What of an entry translation the site shows (the rest is its draft). */
    private const LIVE = ['status', 'title', 'slug', 'data', 'published_at'];

    /** What of an entry changes pages. */
    private const ENTRY = ['parent_id', 'sort_order', 'template', 'collection_id', 'blueprint', 'comments_closed'];

    public static function register(): void
    {
        foreach (self::MODELS as $class => $areas) {
            foreach (['saved', 'deleted', 'restored'] as $event) {
                Event::listen("eloquent.{$event}: {$class}", fn (Model $model) => self::changed($model, $areas));
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
        // Comments are read from the database on every render, so only a kept
        // page shows them, and only approved ones. Visitors post comments, so
        // nothing else of theirs may touch the cache.
        Event::listen('eloquent.saved: '.Models\Comment::class, function (Models\Comment $comment): void {
            if ($comment->isApproved() || $comment->getOriginal('status') === Models\Comment::APPROVED) {
                self::comment($comment);
            }
        });
        foreach (['deleted', 'restored'] as $event) {
            Event::listen("eloquent.{$event}: ".Models\Comment::class, function (Models\Comment $comment): void {
                if ($comment->isApproved()) {
                    self::comment($comment);
                }
            });
        }
        Event::listen(SettingsSaved::class, function (SettingsSaved $event): void {
            if ($event->section === SiteSettings::key() || $event->section === CacheSettings::key()) {
                app(SiteCache::class)->changed("settings {$event->section}");
            } elseif ($event->section === CodeSettings::key()) {
                app(SiteCache::class)->changed("settings {$event->section}", SiteCache::PAGES);
            }
        });
    }

    /**
     * A record changed with a query, which fires no model events
     * (Versioned::update()): what its saved event would have said.
     */
    public static function updated(Model $model): void
    {
        if (array_key_exists($model::class, self::MODELS)) {
            self::changed($model, self::MODELS[$model::class]);
        }
    }

    /** @param  list<string>  $areas */
    private static function changed(Model $model, array $areas = []): void
    {
        $key = $model->getKey();
        app(SiteCache::class)->changed(strtolower(class_basename($model)).(is_scalar($key) ? ' '.$key : ''), ...$areas);
    }

    private static function comment(Models\Comment $comment): void
    {
        if (PageCache::enabled()) {
            self::changed($comment, [SiteCache::PAGES]);
        }
    }
}
