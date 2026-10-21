<?php

declare(strict_types=1);

namespace Sunrice\Cms\Ai;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Laravel\Mcp\Server\Tools\Annotations\IsReadOnly;
use Sunrice\Admin\Media\Media;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Settings\SiteSettings;
use Sunrice\Cms\Support\Locales;
use Sunrice\Cms\Support\Seo;

/**
 * @phpstan-import-type SeoTags from Seo
 */
#[IsReadOnly]
#[Description('Check live pages for SEO problems, 50 a page, as their head shows them (the SEO card, SEO from fields, Settings → Site; a template can still override them): meta titles (aim for 30-60 characters) and descriptions (70-160) missing or badly sized, no share image, hidden from search engines, thin content, long slugs, and languages the page isn\'t live in; plus titles used by more than one page and images without alt text, site-wide. Fix them with cms_save_entry ("seo": title, description, image) and update_media (alt).')]
final class SeoAudit extends CmsTool
{
    protected string $name = 'cms_seo_audit';

    private const PER_PAGE = 50;

    public function handle(Request $request): Response
    {
        if (! $this->may('view')) {
            return $this->denied('view entries');
        }
        /** @var array{collection?: string|null, locale?: string|null, page?: int|null} $args */
        $args = $request->validate([
            'collection' => ['nullable', 'string'],
            'locale' => ['nullable', 'string', 'in:'.implode(',', Locales::all())],
            'page' => ['nullable', 'integer', 'min:1'],
        ]);
        $collections = Collection::query()->whereNotNull('route')->orderBy('title')->get()
            ->filter(fn (Collection $c): bool => $this->may('view', $c) && (! isset($args['collection']) || $c->handle === $args['collection']));
        if (isset($args['collection']) && $collections->isEmpty()) {
            return Response::error('No such collection with pages. cms_list_entries lists them.');
        }
        $locale = $args['locale'] ?? Locales::default();
        $ids = $collections->pluck('id')->all();

        $translations = EntryTranslation::query()->live()->whereIn('collection_id', $ids)->where('locale', $locale)
            ->with('entry.collection', 'entry.translations')->orderByDesc('id')
            ->paginate(self::PER_PAGE, ['*'], 'page', $args['page'] ?? 1);
        $site = app(SiteSettings::class);
        $siteImage = $site->image !== null;

        $pages = [];
        foreach ($translations->items() as $translation) {
            $tags = Seo::for($translation);
            $issues = self::issues($translation, $tags, $locale, $siteImage, trim($site->description) !== '');
            if ($issues !== []) {
                $pages[] = ['id' => $translation->entry_id, 'locale' => $locale, 'title' => $translation->title, 'meta_title' => $tags['title'], 'url' => $translation->url(), 'issues' => $issues];
            }
        }

        // Site-wide, in one query each: titles on several pages, images without alt text.
        $duplicates = EntryTranslation::query()->live()->whereIn('collection_id', $ids)->where('locale', $locale)
            ->selectRaw('title, count(*) as pages')->groupBy('title')->havingRaw('count(*) > 1')->orderBy('title')->limit(50)->get()
            ->map(fn (EntryTranslation $t): array => ['title' => $t->title, 'pages' => $t->getAttribute('pages')])->all();
        $images = Media::query()->where(fn (Builder $q) => $q->whereNull('alt')->orWhere('alt', ''));
        Media::whereTypes($images, ['image']);

        return $this->json([
            'locale' => $locale,
            'checked' => count($translations->items()),
            'pages_with_issues' => $pages,
            'page' => $translations->currentPage(),
            'last_page' => $translations->lastPage(),
            'total' => $translations->total(),
            'duplicate_titles' => $duplicates,
            'images_without_alt' => $images->count(),
            'site' => ['description' => $site->description !== '' ? $site->description : null, 'share_image' => $siteImage, 'hidden_from_search_engines' => $site->hidden()],
        ]);
    }

    /**
     * @param  SeoTags  $tags  what the page's head gets (Seo::for())
     * @return list<string>
     */
    private static function issues(EntryTranslation $translation, array $tags, string $locale, bool $siteImage, bool $siteDescription): array
    {
        $data = $translation->data ?? [];
        $seo = is_array($data[Seo::KEY] ?? null) ? $data[Seo::KEY] : [];
        $issues = [];
        // What the page's head gets: the SEO card, then the fields the collection names (SEO from
        // fields), then Settings → Site; the title with the site's name added, the homepage's the name.

        $title = $tags['title'];
        $length = mb_strlen($title);
        if ($length > 60) {
            $issues[] = "The meta title \"{$title}\" is {$length} characters; keep it under 60 (seo.title).";
        } elseif ($length < 30) {
            $issues[] = "The meta title \"{$title}\" is short ({$length} characters); 30-60 works best (seo.title).";
        }
        $description = trim((string) $tags['description']);
        $own = $description !== '' && $description !== Str::squish(app(SiteSettings::class)->description);
        if (! $own) {
            $issues[] = $siteDescription ? 'No meta description of its own (the site\'s is used): write one (seo.description).' : 'No meta description (seo.description).';
        } elseif (($d = mb_strlen($description)) > 160) {
            $issues[] = "The meta description is {$d} characters; keep it under 160.";
        } elseif ($d < 70) {
            $issues[] = "The meta description is short ({$d} characters); 70-160 works best.";
        }
        if ($tags['image'] === null) {
            $issues[] = $siteImage ? 'No share image: the one set for the site can\'t be shown.' : 'No share image (seo.image, a media id) and none for the site.';
        }
        if (($seo['noindex'] ?? false) === true) {
            $issues[] = 'Hidden from search engines (seo.noindex).';
        }
        $words = str_word_count((string) $translation->search_text);
        if ($words < 150) {
            $issues[] = "Thin content: about {$words} words of text in its fields (fine for a page that is mostly a form or a listing).";
        }
        if (mb_strlen((string) $translation->slug) > 75) {
            $issues[] = 'A long slug: shorten it.';
        }
        if ($locale === Locales::default()) {
            $missing = array_values(array_filter(Locales::all(), fn (string $code): bool => $code !== $locale && ! ($translation->entry->translation($code)?->isLive() ?? false)));
            if ($missing !== []) {
                $issues[] = 'Not live in '.implode(', ', $missing).' (the page isn\'t translated, or the translation isn\'t published).';
            }
        }

        return array_map(fn (string $issue): string => Str::limit($issue, 200), $issues);
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'collection' => $schema->string()->description('Only this collection.'),
            'locale' => $schema->string()->description('The language to check; the main one when left out.'),
            'page' => $schema->integer(),
        ];
    }
}
