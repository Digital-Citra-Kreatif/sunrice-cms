# Templates

## Starter templates

Publish a working set of templates into your app and edit them freely:

```bash
php artisan vendor:publish --tag=sunrice-templates
```

This copies them to `resources/views/sunrice/`, where the resolver below
picks them up, their stylesheet and script to `public/sunrice-theme/`, and
the error pages to `resources/views/errors/`:

| File | Used for | Shows how to |
| --- | --- | --- |
| `layouts/app.blade.php` | every page | `<x-sunrice::seo>`, shared layout, links the stylesheet |
| `public/sunrice-theme/app.css` | styles for all of the above | plain CSS; replace it with your own build (Vite, Tailwind…) and change the `<link>` in the layout |
| `public/sunrice-theme/app.js` | the mobile menu button | a few lines of plain JavaScript, no dependencies |
| `partials/header.blade.php` | header | globals (`sunrice_global('site')`), menus (`sunrice_menu('main')`), dropdown sub-menus, a "Menu" button on small screens |
| `partials/search-form.blade.php` | search box (in the header and on 404 pages) | `<x-sunrice::search>` |
| `partials/language-switcher.blade.php` | language links (in the header) | `sunrice_locale_urls()`, language names |
| `partials/footer.blade.php` | footer | template-part globals, rich text, repeaters |
| `partials/menu.blade.php` | menus | nested menu items |
| `partials/card.blade.php` | listings | entry teaser (image, date, excerpt) |
| `partials/pagination.blade.php` | page links | `$entries->links('sunrice.partials.pagination')` |
| `partials/entry-filter.blade.php` | filter forms | the form for `<x-sunrice::entry-filter>` (not used by default) |
| `search.blade.php` | the search page | `$query`, paginated `$results` |
| `errors/404.blade.php`, `500`, `503` | error pages (in `resources/views/errors/`) | 404 in the site layout; 500 and 503 standalone |
| `show.blade.php` | any entry | fields via `$entry->get()`, assets, flexible-content blocks |
| `index.blade.php` | collection archives | paginated `$entries`, archive fields |
| `articles/show.blade.php` | the `articles` collection only | dates, author, terms, relationship fields, `<x-sunrice::entries>` |
| `taxonomies/show.blade.php` | term archives | `$term`, child terms, term fields via `$term->get()` |
| `blocks/{hero,text,gallery,form}.blade.php` | flexible-content blocks | one file per fieldset handle |
| `blocks/default.blade.php` | unknown block types | debug hint when `APP_DEBUG` is on |

Every template works on a fresh install: missing globals, menus and
fields simply render nothing. Each file starts with a comment listing the
field handles it expects.

### Header and mobile menu

The header lists the `main` menu, the search box and the language links.
Sub-menu items open as dropdowns on wide screens. Below 760px they fold
into a **Menu** button: `app.js` adds a `js` class to `<html>` and toggles
`.site-menu.is-open` (Escape closes it). Without JavaScript the menu just
stays visible. Change the breakpoint in `app.css` (`@media (max-width: 760px)`).

### Search and error pages

- **Search:** `/search?q=…` (and `/{locale}/search`) renders
  `search.blade.php` with `$query` and `$results`. Without the starter
  templates a plain package view is used. Results pages are `noindex`.
  Turn the page off or narrow it with `sunrice.search` in
  [Configuration](configuration.md); build other searches with
  [`<x-sunrice::search>`](blade-components.md#x-sunricesearch).
- **Errors:** Laravel shows `resources/views/errors/{status}.blade.php`.
  The starter 404 uses the site layout (header, search box, a link home),
  and Sunrice marks it `noindex`. The 500 and 503 (maintenance,
  `php artisan down`) pages are standalone HTML with the stylesheet only,
  since whatever failed (often the database) would fail again in the
  layout. Add others the same way (`403.blade.php`, `419.blade.php`).

### Languages

- Interface text ("Latest articles", "Nothing here yet.", the form's
  Submit button…) comes from `__('sunrice::frontend.*')`, shipped in
  English and Indonesian. Add a language or change the wording with
  `php artisan vendor:publish --tag=sunrice-translations`, then edit
  `lang/vendor/sunrice/{locale}/frontend.php`.
- Layouts and partials read the page from `$sunricePage` (`->entry`,
  `->term`, `->collection`, `->taxonomy`), not `$entry`/`$term`: Blade
  hands a child template's variables to its layout, so after
  `@foreach ($entries as $entry)` a listing's `$entry` is its last card.
- The language switcher shows the names set under Settings → Languages
  and links each language's version of the entry, term page or listing.
  See [Language switcher](#language-switcher) to restyle or move it.
- Collection and taxonomy titles can be set per language in their forms;
  templates use `$collection->titleIn($locale)` / `$taxonomy->titleIn($locale)`.

### Language switcher

The starter templates keep the switcher in its own partial, included by
the header. After `php artisan vendor:publish --tag=sunrice-templates`, it
lives in your app:

| What | Where |
| --- | --- |
| Markup (links, order, what each one shows) | `resources/views/sunrice/partials/language-switcher.blade.php` |
| Where it appears | `@include('sunrice.partials.language-switcher')` in `partials/header.blade.php`; include it anywhere else too (footer, mobile menu) |
| Styles | `public/sunrice-theme/app.css`, the `.lang-switch` rules |
| Language names shown | Settings → Languages in the admin (`Locales::name($code)`) |

The partial is plain Blade, so you can turn it into a dropdown, show flags
or short codes, or move it to the footer. All it needs is
`sunrice_locale_urls()`, which returns this page's address in each
language:

```blade
@php
    $page = $sunricePage ?? null;
    // ['id' => '/tentang', 'en' => '/en/about']
    $languages = sunrice_locale_urls($page?->entry ?? $page?->term, $page?->term ? $page->collection : null);
@endphp

@if (count($languages) > 1)
    <select onchange="location = this.value" aria-label="{{ __('sunrice::frontend.languages') }}">
        @foreach ($languages as $code => $href)
            <option value="{{ $href }}" @selected($code === $locale)>{{ strtoupper($code) }} · {{ \Sunrice\Support\Locales::name($code) }}</option>
        @endforeach
    </select>
@endif
```

- `$locale` is the current page's language.
- Every language gets a link. A page that isn't translated yet still
  opens in that language's URL, showing the main language's content (see
  [whole-entity fallback](multilingual.md#whole-entity-fallback)).
- Keep `hreflang` and `lang` on the links when you rewrite them: they tell
  search engines and screen readers which language each one is.

If you didn't publish the starter templates, put the snippet above in a
partial of your own and include it wherever the switcher should go.

### Archive/listing pages

A collection's archive/listing page has its own content, edited from
the collection's entries list with the **Archive/listing page** button, one tab
per language:

- a heading and intro, read with `$collection->archiveText($locale)`
  (`['title' => …, 'intro' => …]`, falling back to the main language);
- any fields you like: create a blueprint (e.g. `description` rich text,
  `image` asset, a `hero` flexible field…) and pick it as **Listing
  blueprint** under Structure → Collections → Pages & URLs. Read them with
  `$collection->archive('handle')`, hydrated like entry fields. As with
  entries, translatable fields can differ per language and the others are
  shared with the main language.

Editing the main language needs the collection's entry **edit**
permission; other languages also accept **translate**.

## Reading data

| Field type | `$entry->get('handle')` returns |
| --- | --- |
| text, textarea, select | string (multi-select: array) |
| number / toggle | number / bool |
| rich text | sanitized HTML — print with `{!! !!}` |
| date | `Carbon` |
| asset | `Asset` (`->url()`, `->url('thumbnail'\|'medium'\|'large')`, `->alt`); multiple → collection |
| entries | collection of `Entry`, resolved for the active language |
| terms | collection of `Term` (`->name`, `->url`), in the page language |
| link | `['url' => ..., 'label' => ..., 'new_tab' => bool]` |
| group | array of child values |
| repeater | collection of row arrays (hidden rows removed; `->byKey('key')`) |
| flexible | collection of `Block` (`->type`, `->id`, `->key`, values as properties; hidden blocks removed; `->byKey('key')`) |

Entries also expose `$entry->title`, `->slug`, `->url`, `->published_at`,
`->author`, `->terms` and `->isFallback` (true when a language shows the
main-language content because its translation isn't Ready). Terms expose
`->name`, `->slug`, `->url`, `->urlIn($collection)` (the term's page for
one collection) and `->get('handle')` for taxonomy-blueprint fields, all
in the page language (the Ready translation, otherwise the main one),
including `$entry->terms`. Globals: `sunrice_global('handle')->field` or
`->get('field', 'default')`.

Render flexible content with one partial per block type:

```blade
@foreach ($entry->get('sections') ?? [] as $block)
    @includeFirst(['sunrice.blocks.'.$block->type, 'sunrice.blocks.default'], ['block' => $block])
@endforeach
```

Or, for a hand-built landing page, give blocks/rows a key in the admin and
fetch them directly:

```blade
@if ($hero = $entry->get('sections')->byKey('hero'))
    <h1>{{ $hero->heading }}</h1>
@endif
```

## Resolution order

Templates are plain Blade views. Resolution order for an entry page
(`pageType = 'entry'`):

1. The entry's own template (entry editor → Template card).
2. The collection's entry template (`collection.settings.template`).
3. `sunrice.{collection-handle}.show` in the app (`resources/views/`).
4. `sunrice.show` in the app.
5. `sunrice::defaults.show` bundled in the package.

Archives use `index` instead of `show` (the collection's listing
template → `sunrice.{collection}.index` → `sunrice.index` →
`sunrice::defaults.index`); term archives use the term's own template
(term editor) → the taxonomy's template → `sunrice.taxonomies.{taxonomy}.show`
→ `sunrice.taxonomies.show` → `sunrice::defaults.term`.

## SEO

`<x-sunrice::seo>` fills each tag from the first of:

1. the page's own SEO fields: an entry's, a term's (per language, in the
   term editor) or a listing page's (per language, in the listing page
   editor);
2. for entries and terms, a field of the page itself chosen under
   **Settings → SEO** for each collection and taxonomy: meta title,
   description (tags stripped, cut to 160 characters) and share image.
   Left on *Automatic*, Sunrice picks a fitting field: one named
   `excerpt`, `summary`, `description`… or the first long-text field for
   the description, one named `image`, `featured_image`, `cover`… or the
   first image field for the share image. Titles fall back to the entry's
   or term's own title;
3. the defaults of its collection (entries and listing page) or taxonomy
   (term pages): default description, share image and noindex, set in
   Structure;
4. the site settings. A `title` passed to the component wins over everything;
`defaultTitle` (the starter layout's `seoTitle`) is used only when the
page has no meta title of its own.

Every view receives `locale` and `pageType` (`entry`, `archive` or
`term`) plus: `entry` and `collection` on entry pages; `entries` (a
paginator) and `collection` on archives; `term`, `taxonomy`, `entries`
and `collection` (null when the page spans all collections) on term
archives. Entries are already resolved for the active language.

## Template hooks

Reorder or substitute resolution with a hook registered in a service
provider:

```php
use Sunrice\Facades\Sunrice;
use Sunrice\Frontend\TemplateContext;

Sunrice::resolveTemplateUsing(function (string $view, TemplateContext $context): ?string {
    return $context->entry?->collection->handle === 'products'
        ? 'shop.'.$view
        : null; // null keeps the current candidate
});
```

Hooks run after normal resolution, in registration order; the last
non-null return wins.

## Body classes

Like WordPress' `body_class()`, Sunrice gives the `<body>` classes that
say what the page is, so CSS and scripts can target one page, one
collection or one template without extra markup. The starter layout and
the package's fallback views already use it:

```blade
<body @bodyClass>
{{-- or with classes of your own --}}
<body @bodyClass('dark wide')>
```

`sunrice_body_class('dark')` returns the same classes as a string, for
when you build the attribute yourself.

| Page | Classes |
| --- | --- |
| Entry | `page-entry collection-{handle} entry-{id} entry-{slug}`, plus `home` on the homepage and `has-parent parent-{id}` on child pages |
| Listing page | `page-archive collection-{handle}` |
| Term page | `page-term taxonomy-{handle} term-{id} term-{slug}`, plus `collection-{handle}` on per-collection term pages |
| Every page | `template-{view} lang-{locale}` |
| When it applies | `paged paged-{n}` (page 2 and on of a listing or term page), `logged-in`, `is-draft` (unpublished entry seen by an editor), `is-preview` |

`template-{view}` is the view that rendered the page, without the
`sunrice.` prefix and with dots as dashes: `sunrice.articles.show` gives
`template-articles-show`, a per-entry template `landing` gives
`template-landing`. Slugs are in the page's language. All classes are
lowercase letters, digits, `-` and `_`.

```css
body.collection-articles h1 { font-size: 3rem; }
body.entry-42 .hero { display: none; }
body.template-landing main { max-width: none; }
```

Add, remove or rename classes in a service provider:

```php
use Sunrice\Facades\Sunrice;
use Sunrice\Frontend\TemplateContext;

Sunrice::bodyClassUsing(function (array $classes, ?TemplateContext $page): array {
    if ($page?->entry?->get('dark_mode')) {
        $classes[] = 'theme-dark';
    }

    return array_diff($classes, ['logged-in']);
});
```

`$page` is null outside Sunrice's own pages (your own routes using the
layout); those get `lang-{locale}` and `logged-in` only.

## Homepage

`Setting::set('homepage_entry_id', $entry->id)` (or the Settings admin
screen) points `/` at any published entry.

## Preview

Editors preview drafts via a signed URL (`sunrice.frontend.preview`)
rendered with the same template chain plus `preview: true` in the
hydration context; drafts are never cached and are marked `noindex`.
