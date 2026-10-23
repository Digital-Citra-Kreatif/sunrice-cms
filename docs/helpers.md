# Helpers and the `Cms` facade

Templates reach the CMS through one class, `Sunrice\Cms\Content` (`@api`), aliased as **`Cms`** unless your app already uses that name, and through short global functions that do the same. The details of each (the query methods, components, SEO, hooks) are in [The site](site.md); this page is the reference.

## `Cms`

| Method | Returns |
| --- | --- |
| `Cms::entries(string ...$collections)` | An [`EntryQuery`](#entryquery) over the live entries of those collections (all when none given), in the current language. |
| `Cms::menu(string $handle)` | A menu's links in the current language: `label`, `url`, `new_tab`, `active`, `active_trail`, `children`. Links to pages that aren't live are left out. See [Menus](menus.md). |
| `Cms::global(string $handle)` | A global set's values in the current language, as templates get fields (media as `Media`, dates as Carbon …); an unknown handle gives `[]`. See [Globals](globals.md). |
| `Cms::page()` | The CMS page being shown (`Sunrice\Cms\Site\Page`: `type`, `locale`, `view`, `entry`, `collection`, `term`, `preview`, `home`, `pageNumber`, `fallback`, `draft`; `contentLocale()`, the language its content is in, and `langAttribute()`, ` lang="en"` on an untranslated page), or `null` on your app's own pages. |
| `Cms::bodyClass(array\|string $extra = [])` | The page's body classes as one string (kind of page, collection, entry or term, template, language, `logged-in` …), plus yours. See [Layout helpers](site.md#layout-helpers). |
| `Cms::localeUrls()` | `[locale => url]`: the page shown in each language it's on, for a language switcher of your own (`[]` on your app's own pages); `<x-sunrice-cms::language-switcher />` is a ready-made one ([Components](site.md#components)). |
| `Cms::site()` | Settings → Site (`Sunrice\Cms\Settings\SiteSettings`): `name()`, `title('About')` ("About \| Acme"), `hidden()` (the whole site hidden from search engines), `twitterHandle()`, and its properties (`description`, `image` (a media id), `separator` …). |
| `Cms::resolveTemplateUsing(Closure(Page): ?string $hook)` | In a service provider's `boot()`: choose the view of the CMS's pages. See [Hooks](site.md#hooks). |
| `Cms::bodyClassUsing(Closure(Page): array $hook)` | In a service provider's `boot()`: add body classes. |

```blade
<body @bodyClass('dark')>
    <nav>
        @foreach (Cms::menu('main') as $item)
            <a href="{{ $item['url'] }}" @if ($item['active']) aria-current="page" @endif>{{ $item['label'] }}</a>
        @endforeach
    </nav>

    @foreach (Cms::entries('blog')->latest()->limit(3)->get() as $post)
        <a href="{{ $post->url() }}">{{ $post->title }}</a>
    @endforeach

    <footer>{{ Cms::global('contact')['phone'] ?? '' }} · {{ Cms::site()->name() }}</footer>
</body>
```

## Global functions

Defined in `packages/cms/src/helpers.php` (Composer `files` autoload), each only if your app hasn't defined a function of that name first:

| Function | Same as |
| --- | --- |
| `cms_entries(string ...$collections)` | `Cms::entries()` |
| `cms_menu(string $handle, ?string $locale = null)` | `Cms::menu()`, in another language if given |
| `cms_global(string $handle, ?string $locale = null)` | `Cms::global()`, in another language if given |
| `cms_locale_urls()` | `Cms::localeUrls()` |
| `cms_body_class(array\|string $extra = [])` | `Cms::bodyClass()` |
| `cms_page()` | `Cms::page()` |
| `cms_nonce()` | The nonce of the site's CSP, `''` while it's off or has none: `<script nonce="{{ cms_nonce() }}">` (`SiteCsp::nonce()`, see [Content-Security-Policy](site.md#content-security-policy)) |

## `@bodyClass`

The Blade directive prints the whole attribute: `<body @bodyClass>` or `<body @bodyClass('dark')>` gives `<body class="page-entry collection-blog … dark">`, escaped.

## `EntryQuery`

`Sunrice\Cms\Query\EntryQuery`, from `Cms::entries()` or `cms_entries()`, finds live `EntryTranslation`s (published, past their date, not trashed, of a collection not deleted) in the current language. Every method but the last group returns the query, to chain:

| Method | |
| --- | --- |
| `locale(string $locale)` | Another language than the current one. |
| `preview(bool $preview = true)` | Every entry not in the trash, by its draft, as the site's preview shows it; never cached. |
| `where(string $field, $operator, $value = null)` | A field, or `title`, `slug`, `published_at`, `parent_id`; operators `=`, `!=`, `<`, `>`, `<=`, `>=`, `in`, `not in`; `null` for "no value". Numbers and dates compare as such. |
| `whereTerm($term, $terms = null, bool $includeChildren = false, ...$more)` | Entries with a term (their own, live): `Term` models or ids, or a taxonomy handle and slugs (`whereTerm('topics', ['news', 'tips'])`). |
| `whereFieldTerm(string $field, $terms, bool $includeChildren = false)` | Entries whose terms field holds a term. |
| `whereEntry(string $field, $entries)` | Entries whose entries field links to an entry (or any of a list). |
| `whereContains(string $field, array $values)` | Entries whose list field (a select with several choices) holds any of the values. |
| `whereSlug(string $slug)` | The entry with that slug. |
| `childrenOf(Entry\|int\|null $parent)` | The entries under a parent (`null`: the top level) in a hierarchical collection. |
| `except(Entry\|EntryTranslation\|int ...$entries)` | Leave these out. |
| `search(string $text)` | Entries whose title or field text holds the words, as the site's search matches them, title matches first. |
| `orderBy(string $field, string $direction = 'asc')` | A column or a field; numbers and dates sort as such. |
| `latest()`, `oldest()`, `alphabetical()`, `ordered()` | By date, newest or oldest first; by title; in the collection's manual order. |
| `limit(int $count)` | At most so many. |
| `remember(bool $remember = true)` | Keep the matched ids in the site's cache until the content changes. |
| `get()` | The entries (`Items`, a Laravel collection). |
| `first()` | The first entry, or `null`. |
| `count()` | How many. |
| `paginate(int $perPage = 10, string $pageName = 'page')` | A paginator that keeps the rest of the query string. |
| `toBase()` | The Eloquent query (`Builder<EntryTranslation>`) for anything else. |

Each result is an `EntryTranslation`: `->title`, `->slug`, `->published_at`, `->url()`, `->values()` (its fields as templates get them), `->terms` and `->termsOf('topics')` (the entry's own terms, read for the whole result at once), `->entry` (the `Entry`, with `->terms`, its live terms, and `->collection`), `->isOutdated()`. The entries of one result share a `HydrationContext`, so `values()` in a loop runs no queries of its own. Examples and the matching components (`<x-sunrice-cms::entries>`, `<x-sunrice-cms::entry-filter>`) are in [Querying entries](site.md#querying-entries).
