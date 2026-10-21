<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Entries;

use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Actions\Settings\SaveSettings;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Settings\SiteSettings;

/**
 * Makes a live page the site's homepage (Settings → Site's Homepage): an
 * entry of a collection whose entries can be the homepage (offers()), not
 * in the trash, whose main language is live. The entry editor's "Make
 * this the homepage" (cms.homepage); Settings → Site can choose any live
 * entry with a URL.
 *
 * @api
 */
final class SetHomepage
{
    public function __construct(private readonly SaveSettings $save) {}

    /** @throws ValidationException */
    public function handle(Entry $entry): void
    {
        if ($entry->trashed() || $entry->collection->route === null) {
            throw ValidationException::withMessages(['homepage' => __('Only a page (an entry of a collection with a URL) can be the homepage.')]);
        }
        if (! self::offers($entry->collection)) {
            throw ValidationException::withMessages(['homepage' => __('Only a page at the root of the site (like /about) can be made the homepage here. To use another, choose it in Settings → Site.')]);
        }
        if ($entry->mainTranslation()?->isLive() !== true) {
            throw ValidationException::withMessages(['homepage' => __('Publish it first: the homepage must be live.')]);
        }
        $this->save->handle(app(SiteSettings::class), ['homepage' => $entry->id]);
    }

    /**
     * Whether "Make this the homepage" is offered in the collection: pages
     * at the root of the site (a route starting with its slug, "/{slug}",
     * like the usual Pages), and the collection the homepage already
     * comes from. Not posts, products or profiles, whose addresses sit
     * under a prefix (/blog/{slug}).
     */
    public static function offers(Collection $collection): bool
    {
        if ($collection->route === null) {
            return false;
        }
        if (str_starts_with($collection->route, '/{')) {
            return true;
        }
        $current = app(SiteSettings::class)->homepage;

        return $current !== null && Entry::withTrashed()->whereKey($current)->where('collection_id', $collection->id)->exists();
    }
}
