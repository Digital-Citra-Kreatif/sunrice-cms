<?php

declare(strict_types=1);

namespace Sunrice\Cms\Fields;

use Illuminate\Support\Collection;
use Sunrice\Admin\Media\Media;
use Sunrice\Cms\Models\Term;

/**
 * What hydrating values needs to know: the language and whether this is a
 * preview. It also remembers the records it loads, so a repeater of fifty
 * images costs one query, not fifty.
 *
 * @api
 */
final class HydrationContext
{
    /** @var array<int, Media|null> */
    private array $media = [];

    /** @var array<int, Term|null> */
    private array $terms = [];

    public function __construct(
        public readonly string $locale,
        public readonly bool $preview = false,
    ) {}

    /**
     * Loads these media files in one query, for media() and mediaMany().
     *
     * @param  list<int>  $ids
     */
    public function preloadMedia(array $ids): void
    {
        $missing = array_values(array_diff(array_unique($ids), array_keys($this->media)));
        if ($missing === []) {
            return;
        }
        $found = Media::query()->whereKey($missing)->get()->keyBy('id');
        foreach ($missing as $id) {
            $this->media[$id] = $found->get($id);
        }
    }

    public function media(int $id): ?Media
    {
        $this->preloadMedia([$id]);

        return $this->media[$id];
    }

    /**
     * In the given order, skipping files that no longer exist.
     *
     * @param  list<int>  $ids
     * @return Collection<int, Media>
     */
    public function mediaMany(array $ids): Collection
    {
        $this->preloadMedia($ids);

        return collect($ids)->map(fn (int $id): ?Media => $this->media[$id] ?? null)->filter()->values();
    }

    /**
     * Terms with their translations, in the given order, skipping deleted
     * ones; loaded once per context.
     *
     * @param  list<int>  $ids
     * @return Collection<int, Term>
     */
    public function terms(array $ids): Collection
    {
        $missing = array_values(array_diff(array_unique($ids), array_keys($this->terms)));
        if ($missing !== []) {
            $found = Term::query()->with('translations')->whereKey($missing)->get()->keyBy('id');
            foreach ($missing as $id) {
                $this->terms[$id] = $found->get($id);
            }
        }

        return collect($ids)->map(fn (int $id): ?Term => $this->terms[$id] ?? null)->filter()->values();
    }
}
