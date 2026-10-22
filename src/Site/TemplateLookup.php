<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Illuminate\Support\Facades\View;
use Sunrice\Cms\Actions\Entries\SaveEntrySettings;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Models\TermTranslation;
use Sunrice\Cms\Support\Locales;

/**
 * Which Blade view a site page renders with: the views tried, in order,
 * the first that exists winning, else the CMS's built-in one.
 *
 *   resources/views/cms/collections/index.blade.php           any listing page
 *   resources/views/cms/collections/show.blade.php            any entry
 *   resources/views/cms/collections/{c}/index|show|{slug}     one collection's
 *   resources/views/cms/collections/{c}/{t}/index|show|{slug} its term and index pages of a taxonomy
 *   resources/views/cms/taxonomies/index|show.blade.php       any index or term page
 *   resources/views/cms/taxonomies/{t}/index|show|{slug}      one taxonomy's
 *
 * A slug view is the main language's slug of the entry or term, so one
 * file serves every language; `index` and `show` never select one. The
 * templates picked in the CMS come first; an entry's or term's own only
 * under the site's template prefixes.
 *
 * @internal
 */
final class TemplateLookup
{
    public const ENTRY = 'sunrice-cms::entry';

    public const LISTING = 'sunrice-cms::listing';

    public const TERM = 'sunrice-cms::term';

    public const INDEX = 'sunrice-cms::taxonomy-index';

    /** What a slug may be to name a view: one plain segment, never index or show. */
    private const SLUG = '/^[a-z0-9][a-z0-9_-]*$/';

    /** @var array<string, bool> the views looked for, so each is looked for once */
    private array $exists = [];

    /**
     * An entry's views.
     *
     * @return list<string>
     */
    public static function entry(Collection $collection, ?string $slug, ?string $own = null): array
    {
        $c = $collection->handle;

        return self::views([self::own($own), self::slugged("cms.collections.{$c}", $slug), $collection->template, "cms.collections.{$c}.show", 'cms.collections.show']);
    }

    /**
     * A collection's listing page's views.
     *
     * @return list<string>
     */
    public static function listing(Collection $collection): array
    {
        return self::views([$collection->listing_template, "cms.collections.{$collection->handle}.index", 'cms.collections.index']);
    }

    /**
     * A term page's views: the shared one's, or in a collection
     * (`$collection`) that collection's first.
     *
     * @return list<string>
     */
    public static function term(Taxonomy $taxonomy, ?Collection $collection, ?string $slug, ?string $own = null): array
    {
        $t = $taxonomy->handle;
        $in = $collection === null ? [] : [self::slugged("cms.collections.{$collection->handle}.{$t}", $slug), "cms.collections.{$collection->handle}.{$t}.show"];

        return self::views([self::own($own), ...$in, self::slugged("cms.taxonomies.{$t}", $slug), $taxonomy->template, "cms.taxonomies.{$t}.show", 'cms.taxonomies.show']);
    }

    /**
     * A taxonomy index page's views: the shared one's, or in a collection
     * (`$collection`) that collection's first.
     *
     * @return list<string>
     */
    public static function index(Taxonomy $taxonomy, ?Collection $collection): array
    {
        $t = $taxonomy->handle;

        return self::views([$taxonomy->index_template, $collection === null ? null : "cms.collections.{$collection->handle}.{$t}.index", "cms.taxonomies.{$t}.index", 'cms.taxonomies.index']);
    }

    /** The main language's slug of an entry (its live one, else its draft's), which picks its slug view. */
    public static function entrySlug(EntryTranslation $translation): string
    {
        $main = $translation->locale === Locales::default() ? $translation : ($translation->entry->mainTranslation() ?? $translation);

        return $main->slug ?? $main->draft_slug;
    }

    /** The main language's slug of a term, which picks its slug view. */
    public static function termSlug(TermTranslation $translation): string
    {
        return $translation->locale === Locales::default() ? $translation->slug : ($translation->term->translation(Locales::default()) ?? $translation)->slug;
    }

    /**
     * The first of the views that exists, else the built-in one.
     *
     * @param  list<string>  $views
     */
    public function first(array $views, string $builtIn): string
    {
        foreach ($views as $view) {
            if ($this->exists($view)) {
                return $view;
            }
        }

        return $builtIn;
    }

    /** Whether a view exists, looked for once per lookup (the view finder remembers only those it found). */
    public function exists(string $view): bool
    {
        return $this->exists[$view] ??= View::exists($view);
    }

    /** "cms.collections.pages" + "about" → "cms.collections.pages.about"; null for a slug that can't name a view. */
    private static function slugged(string $folder, ?string $slug): ?string
    {
        return $slug !== null && $slug !== 'index' && $slug !== 'show' && preg_match(self::SLUG, $slug) === 1 ? "{$folder}.{$slug}" : null;
    }

    /** An entry's or term's own template, only under the site's template prefixes (never another view of the app). */
    private static function own(?string $template): ?string
    {
        return $template !== null && $template !== '' && SaveEntrySettings::allowed($template) ? $template : null;
    }

    /**
     * @param  list<string|null>  $views
     * @return list<string>
     */
    private static function views(array $views): array
    {
        return array_values(array_unique(array_filter($views, fn (?string $view): bool => $view !== null && $view !== '')));
    }
}
