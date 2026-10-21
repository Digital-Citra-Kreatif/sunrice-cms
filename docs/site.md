# The site

The CMS serves entries as pages: each collection with a **URL** (`route`) shows its live entries there.

## URLs

Set a collection's URL under Structure → Collections: a path with `{slug}` once, like `/blog/{slug}`, or `/{slug}` for pages at the root (and [related entries' slugs](#related-entries-in-the-url) if you like). Collections without one have no pages of their own (their entries can still be shown by your templates).

- The main language has no prefix; others start with their code: `/blog/hello`, `/id/blog/halo`. The app's locale is set from the address as soon as the CMS's route takes over, so 404 pages, redirects and the search page are in that language too. The main language's own prefix (`/en/about`, from before the main language changed) redirects (301) to the plain address, query string kept, and so do `/about/` and `/index.php/about`: each page has one address. Your app's own routes aren't touched.
- The more specific pattern is tried first (more fixed characters): `/blog/{slug}` before `/{slug}`. The first pattern that matches decides: `/blog/about` looks for a blog entry "about", and is a 404 if there's none, even when a page "about" exists.
- Two collections can't have the same URL.
- Only live entries have pages: published, past their date, not in the trash, of a collection not deleted. Anything else is a 404.
- The CMS's route is the app's **fallback**: your own routes (`routes/web.php`) always come first. Turn the site off with `sunrice-cms.site.enabled` (the admin and previews keep working); its middleware is `sunrice-cms.site.middleware` (`web`).

`$translation->url()` gives an entry's address (null without a route). For a visitor reading another language, `Sunrice\Cms\Site\Site::urlIn($translation, $locale)` gives the page to link to: the translation's own address when it's in that language, else, for a main-language translation of an entry not live there and with the [fallback](#untranslated-pages) on, its page at that language's address (`/id/blog/hello`), else its own. `app(Site::class)->termUrlIn($termTranslation, $locale)` does the same for term pages. Entries from `Cms::entries()`, linked entries and `$entry->shownIn($locale)` already link this way.

### Untranslated pages

An entry that isn't live in a language other than the main one (no translation there, or one still a draft or scheduled) shows its main language's content at that language's address, with the main language's slug: `/id/blog/hello`. The same goes for term pages without a translation and for the homepage (`/id`). On such a page:

- the app's locale and `$locale` are the address's language, so the layout's own words are in it; templates get `$fallback = true` (and `Cms::page()->fallback`), to say "Not translated yet" if you like;
- the content is in another language than the page: `$contentLocale` (and `Cms::page()->contentLocale()`) is its language, and `Cms::page()->langAttribute()` prints ` lang="en"` on such pages (nothing on others) for the element around it, so screen readers read it in the right language: `<article{{ cms_page()?->langAttribute() }}>`. The CMS's plain pages and the starter templates do this;
- `<x-sunrice-cms::seo />` gives the main language's page as the canonical URL and no `hreflang` links, and the main page's `hreflang` links leave the language out; the sitemap lists only the main page;
- menus, entry and term links (`$translation->url()` of a linked entry or a listed one, `$term->url()`) and `Cms::localeUrls()` link it in that language, so visitors stay in it;
- listing pages, term pages, site search, `Cms::entries()` and the components (`<x-sunrice-cms::entries>`, `<x-sunrice-cms::entry-filter>`, the counts of `<x-sunrice-cms::terms>`) include it, in the main language: one row per entry, its translation where that's live, else the main language's, whose `url()` is its page at that language's address. `Cms::entries(...)->fallback(false)` keeps a query to what's translated.

A translation's own slug works once it's live, and the main language's slug then redirects (301) to it in that language (`/id/about` → `/id/tentang-kami`, `Site::translatedAddress()`); terms likewise. Turn this off with `sunrice-cms.site.fallback` (`SUNRICE_FALLBACK=false`): untranslated pages are then 404s in other languages, lists and search show only what's translated, and menus and links go to the main language's page.

### Related entries in the URL

A collection's URL may also hold the slug of an entry its entries link to: put the handle of a single-value **Entries** field of its blueprint in braces, `/projects/{project}/{slug}`. The URL is checked when the collection is saved (each `{field}` must be an Entries field without *Several entries*).

- URLs are filled from the linked entry's slug in the same language (else its main language's slug); an entry that links to nothing live gets `-` there: `/projects/-/unit-1`.
- A path matches only with the linked entry's current slug: `/projects/bridge/unit-1` is a 404 when unit 1 belongs to Tower.
- When the linked entry's slug changes, or an entry links to another one, publishing adds redirects from the old URLs (`Site::moved()`), as for a slug of its own.
- Listing pages, the sitemap, menus, links and structured data all use the filled URLs. The slugs are read once per request for every entry a field may link to (and kept in the [site cache](caching.md)), not once per entry.

## Templates

An entry renders with the first view that exists:

1. the entry's own **template** (its Page settings), like `cms.landing`;
1. the collection's **template** (Structure → Collections), like `cms.article`;
2. `cms.{handle}`: `resources/views/cms/blog.blade.php`;
3. `cms.entry`: `resources/views/cms/entry.blade.php`;
4. the CMS's plain page, which shows the title and text fields.

An entry's or a term's own template must be under one of the site's template prefixes, `cms.` unless `sunrice-cms.site.template_prefixes` says otherwise (`['cms.', 'pages.']`), so no other view of the app (`layouts.app`, `emails.invoice`) can be made a public page; a stored one outside them is ignored. Only the collection's editors (`cms.entries.update`) pick it: authors with `cms.entries.update-own` change the other page settings and keep the template as it is.

Views get:

| | |
| --- | --- |
| `$entry` | the `EntryTranslation` (`$entry->title`, `->slug`, `->published_at`, `->url()`, `->entry->collection`) |
| `$title` | the title (the draft's in a preview) |
| `$values` | the fields as templates get them (see [fields](fields.md#field-types)), by handle; a field never filled in may be missing, so read it with `$values['intro'] ?? null` |
| `$richText` | the handles of its rich text fields, the only HTML a template may print as is |
| `$collection` | the `Collection` |
| `$locale` | the language; the app's locale is set to it too |
| `$preview` | whether this is a preview of the draft (from the editor, or `?draft`) |
| `$draft` | whether this is the newer draft seen with `?draft` by someone signed in ([drafts on the site](#drafts-on-the-site)) |
| `$fallback` | whether this is the main language's content in another language ([untranslated pages](#untranslated-pages)) |
| `$contentLocale` | the language the entry's content is in: the main language's on an untranslated page, else `$locale` |

Rich text is cleaned when it's saved, so print it as is: `{!! $values['body'] !!}`. Print everything else escaped: `{{ $values['intro'] }}`.

### Starter templates

A working set of templates to start from, and edit freely:

```bash
php artisan vendor:publish --tag=sunrice-cms-templates
```

It copies them into `resources/views/cms/`, where the rules above pick them up, the error pages into `resources/views/errors/`, and a small stylesheet to `public/cms/site.css`:

| File | Used for | Shows how to |
| --- | --- | --- |
| `cms/layout.blade.php` | every page (`@extends('cms.layout')`, `@section('content')`, `@push('head')`) | `<x-sunrice-cms::seo>`, site code, the `main` and `footer` menus, the language switcher, a footer (the `footer` global's `text`), `@bodyClass`, a skip link |
| `cms/entry.blade.php` | any entry | the title, date and fields; a note on [untranslated pages](#untranslated-pages); comments |
| `cms/listing.blade.php` | listing pages | the listing's fields, cards, pagination |
| `cms/term.blade.php` | term pages | the term's fields and its entries |
| `cms/search.blade.php` | the search page | the search box, results |
| `cms/comment-unsubscribe.blade.php` | a reply email's "stop these emails" link | the confirm button, then the done message, in the layout ([Comments](comments.md)) |
| `cms/partials/fields.blade.php` | the pages above | text, rich text, images, galleries, links and flexible blocks, by kind |
| `cms/partials/blocks.blade.php`, `block.blade.php` | flexible blocks | `cms/blocks/{fieldset}.blade.php` per kind of block when you make one (it gets `$block`), else the block's fields |
| `cms/partials/card.blade.php` | lists of entries | title, date, and an `image` and `excerpt` field when there are |
| `cms/partials/pagination.blade.php` | lists of entries | previous and next links |
| `cms/partials/language-switcher.blade.php` | the layout | `cms_locale_urls()`, with `hreflang` and `lang` |
| `cms/partials/menu.blade.php` | the layout | a menu with its sub-menus, `aria-current` on the page shown |
| `errors/404.blade.php`, `errors/500.blade.php` | error pages | the 404 in the layout with a search box; the 500 on its own (whatever failed would fail again in the layout) |
| `public/cms/site.css` | all of the above | plain CSS with light and dark colours; replace it with your own build and change the `<link>` in the layout |

Every template works on a fresh install: missing menus, globals and fields render nothing. Layouts and partials read the page from `cms_page()`, not from `$entry` or `$term`: Blade hands a page's variables to its layout, so after a listing's `@foreach` those would be its last card. Words are wrapped in `__()`, so a `lang/{locale}.json` translates them.

## SEO

Each entry's **Search and sharing** card holds an SEO title, a description, a share image, *Hide from search engines* and, for a page that copies one elsewhere, a canonical address, per language, with the draft and its revisions (stored under the reserved `seo` key). Put the tags in your layout's `<head>`:

```blade
<head>
    <x-sunrice-cms::seo />
</head>
```

On the CMS's pages it reads the page shown (entry, term or listing page; or name it: `:entry="$entry" :preview="$preview"`, `:term="$term"`), and on your app's own pages it gives the site's tags with `title="Contact"`. It prints the `<title>` (the SEO title, else the page's, then the site name: "About | Acme"; past the first page of a listing or term page with the page number, "Blog (page 2) | Acme", `sunrice-cms::site.page_title`), the description, `robots` noindex (`noindex` for a page that asks not to be indexed and for the search page, so its links are still followed; `noindex, nofollow` in previews and on a hidden site), the canonical URL (none on error pages: an `errors::*` view, such as your `errors/404.blade.php`, is also `noindex`), `hreflang` links to the page's other languages with `x-default` (the main language), Open Graph tags (`og:type` *article* for dated collections, else *website*; `og:site_name`, `og:locale` and `og:locale:alternate` for each other language, as `language_TERRITORY` (`id_ID`, `en_US`, `pt_BR`: `Seo::ogLocale()`); `article:published_time` and `article:modified_time` for dated entries) and an X (Twitter) card (`twitter:card`, `twitter:site`, `twitter:title`, `twitter:description`, `twitter:image`). Attributes: `title` (instead of the page's), `default-title` (when the page has no SEO title of its own), `description`, `noindex`, `author` (an article's author in the structured data, below) and `:collection` for a listing page; see [the components](#components). `Sunrice\Cms\Support\Seo::for($entry)` (and `forTerm()`, `forListing()`, `forPage()`) gives the same as an array if you'd rather write the tags yourself.

**SEO from fields**: **Settings → SEO** (`/admin/cms/seo`, `cms.settings.site`; a collection's and taxonomy's rows for those who may edit them, `cms.collections.update`, `cms.taxonomies.update`) names, for each collection and taxonomy, the fields that fill in what an entry's or term page's SEO card leaves empty: a text field for the title, a text or textarea field for the description (plain text, at most 300 characters) and a media field whose first image is the share image (`seo_title_field`, `seo_description_field`, `seo_image_field`). A listing page has a **Search and sharing** card of its own on its page in the admin (stored per language with the listing page's fields, under `seo`), read by `Seo::forListing()`; its title falls back to the collection's.

**Settings → Site** (`cms.settings.site`) holds the site name (else `app.name`) and a description; **Settings → SEO** the rest of what pages don't set: hiding the whole site from search engines, a share image, whether titles get the site name and its separator, and the site's X account (`twitter:site`), all stored in `SiteSettings`. In code, `Actions\Seo\SaveSeoSettings` (`@api`) saves that page. The homepage's title is the site name. `Cms::site()` gives these settings to templates (`->name()`, `->title('About')`).

*Hide the whole site from search engines* (or `SUNRICE_NOINDEX=true`, config `sunrice-cms.seo.noindex`, for a staging copy) marks every page noindex, also in an `X-Robots-Tag` header, and empties the sitemap.

Past the first page of a listing, term or search page, the canonical and `hreflang` URLs (and `Cms::localeUrls()`) carry the page number (`/blog?page=2`), so each page is its own, not a copy of the first.

`/sitemap.xml` lists every live entry of a collection with a URL (with `lastmod` and its other languages), term pages (with `lastmod` and their other languages) and listing pages (with their other languages), but those hidden from search engines. It's built in chunks and kept in the cache until the content changes. Search engines read at most 50,000 addresses from one file, so past that `/sitemap.xml` becomes an index of `/sitemap-1.xml`, `/sitemap-2.xml`, … (route `sunrice.cms.sitemap.part`); `/sitemap-1.xml` always works.

### Structured data

The seo component also prints structured data (schema.org, as JSON-LD), so search engines know what pages are and can show richer results:

- every page: the **WebSite** (one per language: its `@id` is the language's home), with its search box (a SearchAction, when the search page is on), and who publishes it (Settings → Site → Structured data): an **Organization**, or the more specific type given as **Kind of organization** (`LocalBusiness`, `RealEstateAgent` …), with its logo, or a **Person**; with its **Name** (else the site name), phone, address (as text) and profiles elsewhere (`sameAs`, one URL per line; `SiteSettings::profiles()`);
- entries: an **Article** (dated collections) or a **WebPage**, or the collection's **Structured data type** (Structure → Collections: Article, Blog post, News article, Web page, About page, Contact page, Real estate listing; or a thing the page is about: Person, on a **ProfilePage**, Place, on a **WebPage**, Product, on an **ItemPage**, as the page's `mainEntity` with its name, URL, description and share image, `@id` the page's URL with `#main`, so a template's node with that `@id` adds to it: `:schema="[['@id' => $entry->url().'#main', 'offers' => [...]]]"`). Articles get a headline, publish and change dates, the share image, author and publisher (the author is who publishes the site, unless the template names one: `author="Ayu Lestari"` for a Person, or a node of its own, `:author="['@type' => 'Person', 'name' => $agent->title, 'url' => $agent->url()]"`);
- **BreadcrumbList**: Home (`sunrice-cms::site.home`), the collection's listing page (its title in the page's language), parent entries (as visitors in that language see them), the page;
- listing and term pages: a **CollectionPage**; the search page: a **SearchResultsPage**.

A template adds nodes of its own (an event, a product, FAQs) with `:schema`:

```blade
<x-sunrice-cms::seo :schema="[[
    '@type' => 'Event',
    'name' => $entry->title,
    'startDate' => $values['starts_at'],
    'location' => ['@type' => 'Place', 'name' => $values['venue']],
]]" />
```

What's printed can't end the script (`<`, `>`, `&` and quotes are escaped). `Sunrice\Cms\Support\StructuredData::graph($page, $extra, $author)` gives the nodes as an array. Turn it off in Settings → Site.

## Site code

**Settings → Site code** (`cms.settings.code`) takes HTML for every page, as is: analytics, chat widgets, verification tags. Your layout says where:

```blade
<head>
    …
    <x-sunrice-cms::code place="head" />
</head>
<body>
    <x-sunrice-cms::code place="body-start" />
    …
    <x-sunrice-cms::code place="body-end" />
</body>
```

Code there runs in every visitor's browser, so give the permission only to people you trust with the whole site. Each change is a `site code changed` security event and emails the [security alerts](../../admin/docs/security.md#email-alerts).

## Layout helpers

```blade
<body class="{{ Cms::bodyClass('dark') }}">
@foreach (Cms::localeUrls() as $locale => $url)
    <a href="{{ $url }}" hreflang="{{ $locale }}">{{ strtoupper($locale) }}</a>
@endforeach
```

- `Cms::bodyClass($extra)`: what the page is, for CSS and scripts. Entries: `page-entry collection-{handle} entry-{id} entry-{slug}`, with `home`, `has-parent parent-{id}` and `is-preview` when they apply; listing pages: `page-listing collection-{handle}`; term pages: `page-term taxonomy-{handle} term-{id} term-{slug}`; pages past the first: `paged paged-{n}`; always `template-{view} lang-{locale}`, and `logged-in` for people signed in to the panel. On your app's own pages: `lang-{locale}` and your extras.
- `Cms::localeUrls()`: the page shown in each language it's live in (and, with the [main-language fallback](#untranslated-pages), the others), in the order of `sunrice-cms.locales`, for a language switcher (none on your app's own pages); a listing's or term page's keep its query string (filters, sort, page).
- `Cms::page()`: the page shown (`Sunrice\Cms\Site\Page`: `type`, `locale`, `view`, `entry`, `collection`, `term`, `preview`, `home`, `pageNumber`, `fallback`; `contentLocale()` and `langAttribute()`), or null.

`@bodyClass` prints the whole attribute: `<body @bodyClass>` or `<body @bodyClass('dark')>` gives `<body class="page-entry … dark">`.

The same as functions, for templates that prefer them (each defined only if the app hasn't defined it first): `cms_entries(...$collections)`, `cms_menu($handle, $locale = null)`, `cms_global($handle, $locale = null)`, `cms_locale_urls()`, `cms_body_class($extra = [])` and `cms_page()`.

### Hooks

In a service provider's `boot()`, change what every page of the CMS does (entries, listing, term and search pages):

```php
use Sunrice\Cms\Content as Cms;
use Sunrice\Cms\Site\Page;

// The view: return another one's name, or null to keep $page->view (what the rules above chose, or an earlier hook).
Cms::resolveTemplateUsing(fn (Page $page): ?string => $page->entry?->entry->parent_id !== null ? 'cms.child-page' : null);

// More body classes (Cms::bodyClass(), @bodyClass), after the CMS's own.
Cms::bodyClassUsing(fn (Page $page): array => $page->collection?->dated ? ['has-date'] : []);
```

Hooks run in the order they were registered, on every request; keep them cheap. How long the page cache keeps a page has its own hook, [`PageCache::lifetimeUsing()`](caching.md).

## Redirects

When a published entry's address changes (a new slug), publishing it adds a permanent redirect from the old address, so links and search results keep working. Chains are flattened: every old address points straight at the newest. The query string comes along (`/old?utm_source=mail` → `/new?utm_source=mail`). Structure → Redirects (`cms.redirects.*`) lists them and takes your own, from a path on the site to a path or a web address, 301 or 302. A live page always wins over a redirect from its address.

## Listing pages

A collection with a **listing page URL** (`listing_route`, like `/blog`) gets a page listing its live entries, `per_page` at a time (`?page=2`), newest first for dated collections, in Manual order for ordered ones, else by title; other languages under their prefix (`/id/blog`). Its own fields come from the collection's listing blueprint and are edited from the entries list (**Listing page**, `cms.entries.update`; `SaveListing` in code), per language. It renders with the first view that exists: `cms.{handle}-listing`, `cms.listing`, or the CMS's plain one, with:

| | |
| --- | --- |
| `$collection` | the `Collection` (`->listingUrl($locale)`) |
| `$entries` | a paginator of `EntryTranslation`s (`{{ $entries->links() }}`; an `Illuminate\Contracts\Pagination\LengthAwarePaginator`), queried only when the template first uses it, so a template that lists entries its own way (an [entry filter](#filtering-entries), `Cms::entries()`) costs nothing for it; a page past the last is a 404 |
| `$values`, `$richText` | the listing page's fields, as for entries: only those of the collection's listing blueprint, and empty without one, so read them with `$values['intro'] ?? null` |
| `$title`, `$locale`, `$url` | the collection's title in the page's language (`titleIn()`), the language and the page's URL |

Listing URLs are fixed, so they're matched before any `{slug}` pattern; they're in the sitemap.

## The homepage

Pick the entry shown at `/` in **Settings → Site** (`cms.settings.site`; a searchable list of live pages), or, with `cms.homepage` (*Choose the homepage*, in the editor role), with **Make this the homepage** in a live page's editor (`SetHomepage`, `POST cms/entries/{entry}/homepage`). In other languages, `/{locale}` shows its translation there. The entry's own address redirects (301) to `/`, and `$translation->url()` gives `/`. Your app's own `/` route, if it has one, wins.

## Querying entries

In any view, `Cms::entries()` finds live entries in the current language (`Sunrice\Cms\Content`, aliased as `Cms` unless your app uses that name):

```blade
@foreach (Cms::entries('blog')->latest()->limit(3)->get() as $post)
    <a href="{{ $post->url() }}">{{ $post->title }}</a>
@endforeach

{{ Cms::entries('blog')->whereTerm($news)->paginate(10)->links() }}
{{ Cms::global('contact')['phone'] ?? '' }}
```

`entries(...$collections)` (none: every collection), then `locale()`, `fallback()`, `preview()`, `whereTerm()`, `whereFieldTerm()`, `whereSlug()`, `childrenOf($entry)` (`null`: top-level entries), `where()`, `whereContains()`, `whereEntry()`, `except()`, `search()`, `latest()`, `oldest()`, `alphabetical()`, `ordered()` (Manual order), `orderBy()`, `limit()`, `remember()`, and `get()`, `first()`, `count()`, `paginate($perPage, $pageName = 'page')` or `toBase()`.

```php
Cms::entries('events')->where('featured', true)->where('date', '>=', today())->orderBy('date')->get();
Cms::entries('shop')->where('price', '<', 100)->where('color', 'in', ['red', 'blue'])->orderBy('price', 'desc')->get();
Cms::entries('blog')->where('city', '!=', 'Jakarta')->except($entry)->limit(3)->get();   // "more like this"
Cms::entries('blog')->whereEntry('related', $entry)->get();                             // pointing at $entry
Cms::entries('blog')->whereTerm('topics', 'news', includeChildren: true)->latest()->paginate(10);
Cms::entries('blog')->search($request->query('q', ''))->paginate(10);
```

- `locale($locale)`: another language than the current one; entries not live in it come in the main language with the [main-language fallback](#untranslated-pages) on, unless `fallback(false)`. `preview()`: every entry not in the trash, by its draft title, slug and fields (`values()` give the draft's too), as the site's preview does; never cached.
- `where($field, [$operator,] $value)`: a field, or `title`, `slug`, `published_at`, `parent_id`; operators `=`, `!=`, `<`, `>`, `<=`, `>=`, and `in`, `not in` with a list; `null` for "no value" (`where('subtitle', null)`, `where('subtitle', '!=', null)`). Number and date fields compare as such (`9 < 100`, a `Carbon` or `2026-01-01` for dates); the others as text.
- `whereTerm($term, ...)`: entries with a term (or any of several): `Term` models or ids (`whereTerm($news, $tips)`, `whereTerm([$news, $tips])`), or a taxonomy handle and a slug or list of slugs (`whereTerm('topics', 'news')`, `whereTerm('topics', ['news', 'tips'])`); `includeChildren: true` takes the terms under them too. Looks at the terms of every terms field.
- `whereFieldTerm($field, $terms, includeChildren: false)`: the same for one terms field, with slugs looked up in that field's taxonomy.
- `whereEntry($field, $entries)`: entries whose entries field links to an entry (or any of a list).
- `whereContains($field, $values)`: entries whose list field (a select with several choices) holds any of the values.
- `search($text)`: entries whose title or field text holds the words, as the site's search matches them; title matches first, then in the query's order.
- `orderBy($field, 'asc'|'desc')`: a column or a field; numbers and dates sort as such.
- `except(...$entries)`: leave these out.
- `remember()`: keep the matched ids in the site's cache (`SiteCache`, when it's on) until the content changes, so the query runs once; the entries themselves are always read fresh.
- `toBase()`: the Eloquent query (`Builder<EntryTranslation>`, a new one each time) for what the methods here don't do.

Field filters read the main language's published values (shared fields, like entries and terms, live there).

A result's entries share one `HydrationContext`: the first `values()` loads whatever all their fields point at (media, entries, terms), one query per kind, so `$post->values()` in a loop costs no queries of its own; the entries an entries field gives share it too (see [Using fields in code](fields.md#using-fields-in-code)). The `$entries` of listing and term pages and the search page's `$results` are hydrated the same way.

### Components

For a part of a template without PHP, `<x-sunrice-cms::entries>` and `<x-sunrice-cms::terms>` run the query and leave the markup to you, as `$component->entries` and `$component->terms`. Every component and its attributes are listed below.

```blade
<x-sunrice-cms::entries collection="blog" :limit="3" :term="$news" :except="$entry" order="-date">
    @foreach ($component->entries as $post)
        <a href="{{ $post->url() }}">{{ $post->title }}</a>
    @endforeach
</x-sunrice-cms::entries>

<x-sunrice-cms::terms taxonomy="categories" collection="blog" hide-empty tree>
    @foreach ($component->terms as $term)
        <a href="{{ $term->url() }}">{{ $term->title() }}</a> ({{ $term->entries_count }})
        {{-- $term->children: the terms under it --}}
    @endforeach
</x-sunrice-cms::terms>
```

#### `<x-sunrice-cms::entries>`

| Attribute | |
| --- | --- |
| `collection` | Handles, comma-separated (`"blog,news"`) or a list; none for every collection. |
| `limit` | At most this many. |
| `paginate` | Entries per page (1–100): `$component->entries` is then a paginator (`->links()`), keeping the rest of the query string. |
| `page-name` | The query string's page number for `paginate` (`page`): give two lists on one page their own. |
| `order` | `latest` (default), `oldest`, `alphabetical`, `ordered` (Manual order), or fields: `price`, `-price` for descending, several comma-separated (`-date,title`). |
| `term` | A `Term` or id, or a list: entries with any of them. |
| `terms` | Terms by slug, per taxonomy: `:terms="['topics' => ['news', 'tips']]"` or `terms="topics:news,tips"`. Each slug takes the terms under it too; each taxonomy narrows the list further. |
| `where` | `:where="['featured' => true]"`, or rows with an operator: `:where="[['price', '<', 100], ['city', 'in', ['Jakarta', 'Bandung']]]"` (operators as `where()`). |
| `parent` | An entry (or id): those directly under it; `top`: the top-level ones. |
| `except` | Entries to leave out (the one shown, in a "related" list). |
| `search` | Words to find, as `search()`. |
| `remember` | Keep the matched ids in the site's cache. |

#### `<x-sunrice-cms::terms>`

| Attribute | |
| --- | --- |
| `taxonomy` | Its handle (required). |
| `collection` | Count only that collection's entries in `entries_count`. |
| `hide-empty` | Leave out terms without live entries. With `tree`, a term with entries keeps its parents. |
| `include-children` | `entries_count` also counts the entries of the terms under each term (each entry once), as a filter by the term finds them. |
| `tree` | Only the top-level terms, each with `children` (to any depth). |
| `parent` | The terms directly under a term (its slug, in any language, or id); `top`: the top-level ones. |
| `order-by` | `manual` (the editors' order, default), `title`, `entries` (by `entries_count`), `created_at`; `-title` for the other way round. |
| `limit` | At most this many (of the top level, with `tree`). |
| `entry` | Only that entry's terms. |

Each term has `entries_count` (its live entries in the current language). `$component->isCurrent($term)` says whether it's the term page shown, for an `aria-current` link.

#### `<x-sunrice-cms::seo>`

See [SEO](#seo): `entry` with `preview`, `term`, `collection` (a `Collection` or handle: its listing page), or none (the page shown); `title` (instead of the page's), `default-title` (when the page has no SEO title of its own), `description` (instead of the page's), `noindex` (keep this page out of search results), `author` (an article's author: a name or a schema.org node), `schema` (JSON-LD nodes of your own). Titles and descriptions given are taken as plain text.

#### `<x-sunrice-cms::search>`

See [Search](#search): `results`, `collection`, `per-page`, `name` (the query string's name, `q`) and `page-name` (`page`). In the slot: `$component->action`, `->name`, `->query`, `->results`.

#### `<x-sunrice-cms::entry-filter>`

See [Filtering entries](#filtering-entries): `collection`, `filters`, `sorts`, `per-page`, `page-name`, `sort-name`, `where`, `terms`.

#### `<x-sunrice-cms::form>`

See [Forms](forms.md#on-the-site): `handle`, `submit`, `replace`, other attributes on the `<form>`; empty, it prints the fields, with a slot the markup is yours (`$component->old()`, `->error()`, `->success()`, `->captcha()`).

#### `<x-sunrice-cms::comments>`

See [Comments](comments.md#on-the-site): `entry` (an `Entry` or `EntryTranslation`).

#### `<x-sunrice-cms::code>`

See [Site code](#site-code): `place` (`head`, `body-start`, `body-end`).

### Filtering entries

`<x-sunrice-cms::entry-filter>` lists a collection's entries filtered, sorted and paginated by the address (`/shop?q=kettle&topic[]=kitchen&price_max=100&sort=cheap`), so a result can be shared or bookmarked and works without JavaScript. Put it on a listing page's template:

```blade
<x-sunrice-cms::entry-filter collection="shop" :per-page="12"
    :filters="[
        'q' => 'search',
        'topic' => ['type' => 'terms', 'taxonomy' => 'topics', 'hide_empty' => true],
        'color' => ['type' => 'select', 'multiple' => true],
        'price' => ['type' => 'range', 'label' => 'Price'],
        'made' => ['type' => 'date_range', 'field' => 'made_on'],
        'sale' => ['type' => 'toggle', 'label' => 'On sale'],
    ]"
    :sorts="['new' => ['label' => 'Newest', 'order' => 'latest'], 'cheap' => ['label' => 'Price, low to high', 'order' => 'price'], 'dear' => '-price']" />
```

Without a slot it prints a plain, accessible form (labels for every input, fieldsets with legends for groups, a `role="search"` form), the applied filters as links that remove each one and *Clear all*, the number of results (`role="status"`), the entries as links and the page links. Its classes start `sunrice-entry-filter`; it has no styles of its own. With a slot, the markup is yours:

```blade
<x-sunrice-cms::entry-filter collection="shop" :filters="['q' => 'search', 'color' => 'select']" :sorts="['cheap' => 'price', 'dear' => '-price']">
    <form action="{{ $component->action }}">
        <label for="q">Search</label>
        <input id="q" type="search" name="q" value="{{ $component->filter('q')->value }}">
        <label for="color">Colour</label>
        <select id="color" name="color">
            <option value="">Any</option>
            @foreach ($component->filter('color')->options as $option)
                <option value="{{ $option['value'] }}" @selected($option['selected'])>{{ $option['label'] }}</option>
            @endforeach
        </select>
        <button>Show</button>
    </form>
    @if ($component->filtered())
        @foreach ($component->active as $chip)
            <a href="{{ $chip->removeUrl }}">{{ $chip->label }}: {{ $chip->value }} ×</a>
        @endforeach
        <a href="{{ $component->clearUrl() }}">Clear all</a>
    @endif
    @foreach ($component->entries as $product) … @endforeach
    {{ $component->entries->links() }}
</x-sunrice-cms::entry-filter>
```

| Attribute | |
| --- | --- |
| `collection` | The collection's handle (required). |
| `filters` | Query string name => type, or an array with `type`, `field` (default: the name), `label` (default: the name as a headline) and the type's own keys. |
| `sorts` | Query string value => order (`latest`, `oldest`, `alphabetical`, `ordered`, a field, `-field`, or several comma-separated), or `['label' => …, 'order' => …]`. The first is the default; none: the collection's own order. |
| `per-page` | Entries per page (default: the collection's *Entries per listing page*). |
| `page-name`, `sort-name` | The query string's page number (`page`) and sort (`sort`) names. |
| `where`, `terms` | Fixed conditions, as on `entries`. |

| Type | Reads | Filters |
| --- | --- | --- |
| `search` | `?q=words` | `search()`: title and field text. |
| `terms` | `?topic[]=slug` (`multiple: false`: `?topic=slug`) | Entries with any of the terms, or the terms under them (`whereTerm(..., includeChildren: true)`). Options: the taxonomy's terms (`taxonomy`, default the name) by slug in the page's language, each with `count` and `depth`; counts include the entries of the terms under each one, as the filter finds them; `hide_empty` leaves out terms without entries, but never the parents of a term that has some. |
| `select` | `?color=red` (`multiple: true`: `?color[]=red&color[]=blue`) | The field equals one of the values; a select field with several choices holds any of them. Options: `options` given (value => label, or `[value, label]` rows), else the field's own; without either, any value. |
| `range` | `?price_min=10&price_max=100` | Number fields between the two (either may be left out). |
| `date_range` | `?made_from=2026-01-01&made_to=2026-01-31` | Date fields from the start of one day to the end of the other. |
| `toggle` | `?sale=1` | The field is on. |

Only the filters declared are read, and only values among a filter's options (numbers for ranges, `YYYY-MM-DD` dates); anything else is ignored, so a link can't make it query what you didn't offer. A terms filter also takes a term's slug in another language, or its id, as that term (shown in the page's language): `/id/properties?listing_type=for-sale` works as `?listing_type=dijual` does, so a [menu link with filters](menus.md) or a language switcher keeps them. Other query string parameters are kept by the links and the form, and `Cms::localeUrls()` keeps a listing's or term page's query string. With the [page cache](caching.md#whole-pages) on, add the filters' parameters (and the sort's) to `sunrice-cms.cache.query` so each result is kept apart; a page given a value the filter ignores isn't kept at all (`PageCache::dontKeep()`), so made-up values can't fill the cache store.

The query string names are the template's: `filters` keys (and `_min`/`_max`, `_from`/`_to` for ranges), `sort-name` (`sort`) and `page-name` (`page`). Write them down for editors (the Guide's menus page tells them to copy a filtered page's address), as they link to filtered listings.

In the slot: `$component->entries` (a paginator of `EntryTranslation`s), `->filters` (`Filter\FilterControl`: `name`, `type`, `field`, `label`, `multiple`, `value`, `options` with `value`, `label`, `selected` (and `count`, `depth` for terms), `inputs` (input names: `['value' => 'topic[]']`, `['min' => 'price_min', 'max' => 'price_max']`), `id()`, `applied()`), `->filter('q')`, `->sorts` (`Filter\SortChoice`: `value`, `label`, `order`, `selected`) with `->sortName`, `->active` (`Filter\ActiveFilter`: `filter`, `label`, `value`, `removeUrl`), `->filtered()`, `->clearUrl()`, `->action` (this page), `->others` (the other query parameters) and `->query()` (the filtered `EntryQuery`, for a count or a map).

In hierarchical collections, `$entry->entry->parent`, `->children` and `->ancestors()` (top-down) give breadcrumbs and sub-menus. `$entry->shownIn($locale)` is what a visitor reading a language sees of an entry: its live translation there, else (with the [main-language fallback](#untranslated-pages)) the main language's, whose `url()` is its page at that language's address; null when it isn't live:

```blade
@foreach ($entry->entry->ancestors() as $ancestor)
    @if ($crumb = $ancestor->shownIn($locale))
        <a href="{{ $crumb->url() }}">{{ $crumb->title }}</a> ›
    @endif
@endforeach
@foreach (Cms::entries('pages')->childrenOf($entry->entry)->ordered()->get() as $child)
    <a href="{{ $child->url() }}">{{ $child->title }}</a>
@endforeach
```

## Search

`/search?q=…` (and `/{locale}/search`) searches the live entries that have pages, in that language (with the [main-language fallback](#untranslated-pages), the main language's of entries not live in it, linked at that language's address): their title and field text (the words only: no field handles, HTML tags, addresses or SEO), titles first, then newest first. It renders with `cms.search`, or the CMS's plain page, with `$query`, `$results` (a paginator of `EntryTranslation`s), `$title` and `$locale`. Search pages are never indexed or kept by the page cache, and one visitor may search `per_minute` times a minute, everyone together `per_minute_global` times. Your app's own `/search` route wins; the search page wins over an entry at that address.

Each database searches its own way, with the index of migration `000017`: MySQL and MariaDB by whole words with a FULLTEXT index (natural language mode, so words shorter than `innodb_ft_min_token_size`, three characters, and stopwords aren't found), Postgres by words with a GIN index (the `simple` dictionary: every language, no stemming), and SQLite, for development only, by matching what's typed anywhere (`%` and `_` aren't wildcards). The same search within a minute is answered from the [site cache](caching.md) (ids only), gone with the next change to content.

```php
// config/sunrice-cms.php
'search' => [
    'enabled' => env('SUNRICE_SEARCH', true),
    'path' => 'search',
    'collections' => null,   // handles; null: every collection with pages
    'per_page' => 10,
    'per_minute' => 30,         // searches per visitor
    'per_minute_global' => 300, // and for everyone together
],
```

`<x-sunrice-cms::search>` makes a search box anywhere, or results of your own:

```blade
<x-sunrice-cms::search>
    <form action="{{ $component->action }}" role="search">
        <input type="search" name="{{ $component->name }}" value="{{ $component->query }}">
    </form>
</x-sunrice-cms::search>

<x-sunrice-cms::search results collection="help" :per-page="20">
    @foreach ($component->results as $entry)
        <a href="{{ $entry->url() }}">{{ $entry->title }}</a>
    @endforeach
</x-sunrice-cms::search>
```

In code: `app(\Sunrice\Cms\Site\Search::class)->entries('coffee', ['blog'], perPage: 20, locale: 'id')`. Field text is kept when an entry is published (`search_text`, its first 20,000 characters).

## The site's words

What the CMS's own views say to visitors (the plain pages' **Newer** and **Older**, the search page, comments, the forms' **Send**, the reply emails, and the messages after posting) are translation keys, `sunrice-cms::site.*`, in English and Indonesian, shown in the page's language. To change them or add a language, put your own lines in `lang/vendor/sunrice-cms/{locale}/site.php` (only the keys you change):

```php
// lang/vendor/sunrice-cms/id/site.php
return ['comments' => ['post' => 'Kirim']];
```

Laravel's own lines (`pagination`, `validation`, `auth`, `passwords`, and the pagination view's words) come in English only; the CMS brings Indonesian ones, read like the app's own language files (only when a page needs them): the lines in your `lang/id/validation.php` win, line by line (lines it leaves out stay the CMS's), as do the lines in `lang/id.json`. Form and comment errors, and paginator links, are then in Indonesian on Indonesian pages.

## Previews

The entry editor's **Preview** opens the saved draft in its template through a signed link that works for 30 minutes, for anyone who has it. Previews are marked `noindex` and `Cache-Control: no-store, private`, so no cache keeps a draft. Save first to see changes.

### Drafts on the site

Signed-in panel users with `cms.entries.view-drafts` (and view access to the collection; the author and editor roles have it) see a small banner on a live page whose entry has a newer draft, with a **View draft** link. `?draft` renders the draft the way a preview does: the view gets `$draft = true`, `Cms::page()->draft` is set, the body class gets `is-draft`, and the response is `noindex` and `Cache-Control: no-store, private`, never kept by the page cache. The banner is `sunrice-cms::draft-banner`, inserted right after `<body>`, so it works with any template.
