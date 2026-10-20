<?php

declare(strict_types=1);

namespace Sunrice\Cms;

use Sunrice\Cms\Fields\HydrationContext;
use Sunrice\Cms\Models\GlobalSet;
use Sunrice\Cms\Support\Locales;

/**
 * Reads global sets' values for templates, loading them once per request:
 *
 *     app(Globals::class)->get('contact', 'id')['phone']
 *
 * @api
 */
final class Globals
{
    /** @var array<string, GlobalSet>|null */
    private ?array $sets = null;

    /** @var array<string, array<mixed>> */
    private array $hydrated = [];

    /**
     * A global set's values in a language (the current one when left out,
     * as Cms::global()), as templates get them; empty for an unknown set.
     *
     * @return array<mixed>
     */
    public function get(string $handle, ?string $locale = null): array
    {
        $locale ??= Locales::current();
        $key = "{$handle}:{$locale}";
        if (! array_key_exists($key, $this->hydrated)) {
            $set = $this->sets()[$handle] ?? null;
            $this->hydrated[$key] = $set === null ? [] : $set->hydrated(new HydrationContext($locale));
        }

        return $this->hydrated[$key];
    }

    /** Forget what was loaded, after a save. */
    public function flush(): void
    {
        $this->sets = null;
        $this->hydrated = [];
    }

    /** @return array<string, GlobalSet> */
    private function sets(): array
    {
        return $this->sets ??= GlobalSet::query()->with('values')->get()
            ->mapWithKeys(fn (GlobalSet $set): array => [$set->handle => $set])->all();
    }
}
