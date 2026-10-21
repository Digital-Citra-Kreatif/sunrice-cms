<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Entries;

use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Actions\Settings\SaveSettings;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Settings\SiteSettings;

/**
 * Makes a live page the site's homepage (Settings → Site's Homepage): an
 * entry of a collection with a URL, not in the trash, whose main language
 * is live. The entry editor's "Make this the homepage" (cms.homepage).
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
            throw ValidationException::withMessages(['homepage' => 'Only a page (an entry of a collection with a URL) can be the homepage.']);
        }
        if ($entry->mainTranslation()?->isLive() !== true) {
            throw ValidationException::withMessages(['homepage' => 'Publish it first: the homepage must be live.']);
        }
        $this->save->handle(app(SiteSettings::class), ['homepage' => $entry->id]);
    }
}
