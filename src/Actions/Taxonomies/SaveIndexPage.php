<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Taxonomies;

use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Models\TaxonomyListing;
use Sunrice\Cms\Support\LanguageValues;
use Sunrice\Cms\Support\Locales;
use Sunrice\Cms\Support\Seo;
use Sunrice\Cms\Support\Versioned;

/**
 * Saves a taxonomy index page's fields and SEO in a language: the shared
 * index page's, or with a collection that collection's (/books/tags).
 * Fields left out keep their values; fields not translated are saved in
 * the main language. The page must be on.
 *
 *     app(SaveIndexPage::class)->handle($tags, $books, ['intro' => 'Browse by tag'], 'en');
 *
 * @api
 */
final class SaveIndexPage
{
    public function __construct(private readonly ActivityLog $activity) {}

    /**
     * @param  array<mixed>  $data
     * @param  int|string|null  $version  the one the editor opened: a save over someone else's newer one is refused
     * @param  mixed  $seo  its SEO card (title, description, image, noindex, canonical; see Seo::validate()); null keeps it
     *
     * @throws ValidationException
     */
    public function handle(Taxonomy $taxonomy, ?Collection $collection, array $data, ?string $locale = null, int|string|null $version = null, mixed $seo = null): TaxonomyListing
    {
        $locale ??= Locales::default();
        if (! Locales::has($locale)) {
            throw ValidationException::withMessages(['locale' => __('Choose one of the site\'s languages: :languages.', ['languages' => implode(', ', Locales::all())])]);
        }
        if (! $taxonomy->hasIndexPage($collection)) {
            throw ValidationException::withMessages(['collection' => __('This index page is switched off.')]);
        }
        $expected = Versioned::expected($version);
        $page = $taxonomy->listings()->firstOrNew(['collection_id' => $collection?->id, 'locale' => $locale], ['data' => []]);
        $main = $locale === Locales::default() ? null : ($taxonomy->listings()->where('collection_id', $collection?->id)->where('locale', Locales::default())->first()->data ?? []);
        ['before' => $before, 'data' => $normalized] = LanguageValues::save($taxonomy->indexSchema(), $page->data, $data, $main);
        if ($seo !== null) {
            $normalized[Seo::KEY] = Seo::validate($seo);
        }

        $changed = array_keys(array_filter($normalized, fn (mixed $v, int|string $k): bool => ! array_key_exists($k, $before) || $before[$k] != $v, ARRAY_FILTER_USE_BOTH));
        /** @var array<string, mixed> $normalized */
        if ($page->exists) {
            // Only if nobody saved in between: the version check and the write are one statement.
            Versioned::update($page, $expected, ['data' => json_encode($normalized, JSON_THROW_ON_ERROR)]);
        } else {
            $page->data = $normalized;
            $page->save();
        }
        $taxonomy->unsetRelation('listings');
        $this->activity->updated('index page', $taxonomy, $collection === null ? $taxonomy->title : $collection->title.' · '.$taxonomy->title, array_map(strval(...), $changed));

        return $page;
    }
}
