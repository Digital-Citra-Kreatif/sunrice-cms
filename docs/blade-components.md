# Blade components

## `<x-sunrice::entries>`

Render published entries of a collection inside a slot — the slot
receives the component (`$component->entries`).

The component only fetches the entries; it prints no markup of its own
(its view is just `{{ $slot }}`). You write the HTML between the tags, so
every list can look different. To reuse one design, put the loop in a
partial, e.g. `@include('sunrice.partials.card', ['entry' => $entry])`.

```blade
<x-sunrice::entries collection="articles" :paginate="true" :per-page="10">
    @foreach ($component->entries as $entry)
        <article>
            <h2><a href="{{ $entry->url }}">{{ $entry->title }}</a></h2>
        </article>
    @endforeach
    {{ $component->entries->links() }}
</x-sunrice::entries>
```

Props: `collection` (required), `paginate`, `per-page`, `page-name`
(default `{collection}_page`, so two components on one page paginate
independently), `limit`, `where` (`['author' => 3]` or
`[['price', '>', 10]]`), `terms` (`'news'`/`['news','guides']` — includes
child terms), `order-by`, `with` (extra eager loads).

`order-by` takes `manual` (the drag-and-drop order from the admin),
`published_at`, `created_at`, `updated_at`, `title` or a field handle,
written `-created_at` or `created_at desc`; several are comma-separated.
Without it, entries follow the collection's **Order** setting (Structure →
Collections), which also orders the listing page and the admin list.

A collection with **Each entry has its own page** turned off is a list of
information (team members, FAQs…): its entries have no URL
(`$entry->url` is null), aren't routable, aren't offered in menus or
link fields, and are shown only through templates:

```blade
<x-sunrice::entries collection="team" order-by="manual">
    @foreach ($component->entries as $person)
        <h3>{{ $person->title }}</h3> {{ $person->get('role') }}
    @endforeach
</x-sunrice::entries>
```

## `<x-sunrice::terms>`

A taxonomy's terms, like `<x-sunrice::entries>` for entries. It prints
nothing itself: loop over `$component->terms` in the slot. Each term is in
the page's language (`name`, `slug`, `get('field')`) and carries
`entries_count`, its number of published entries.

```blade
{{-- A category sidebar for the blog, with counts --}}
<x-sunrice::terms taxonomy="categories" collection="articles" :hide-empty="true">
    <ul>
        @foreach ($component->terms as $term)
            <li @class(['is-active' => $component->isCurrent($term)])>
                <a href="{{ $component->url($term) }}">{{ $term->name }}</a> ({{ $term->entries_count }})
            </li>
        @endforeach
    </ul>
</x-sunrice::terms>

{{-- Nested, for hierarchical taxonomies --}}
<x-sunrice::terms taxonomy="categories" :tree="true">
    @foreach ($component->terms as $term)
        {{ $term->name }}
        @foreach ($term->children as $child) — {{ $child->name }} @endforeach
    @endforeach
</x-sunrice::terms>

{{-- The terms of one entry --}}
<x-sunrice::terms taxonomy="tags" :entry="$entry">…</x-sunrice::terms>
```

| Prop | Meaning |
| --- | --- |
| `taxonomy` | Taxonomy handle (required). |
| `collection` | Count only this collection's entries; `$component->url($term)` then links the term's page for that collection. |
| `parent` | `root` for top-level terms, or a term's slug or id for its children. |
| `tree` | Nest children under their parents (`$term->children`); the list holds the top level. |
| `hide-empty` | Leave out terms without published entries (in a tree, a parent stays when a child has entries). |
| `order-by` | `manual` (the admin's drag-and-drop order, default), `name`, `entries`, `created_at`; `-` in front for descending. |
| `limit` | At most this many terms. |
| `entry` | Only this entry's terms. |

`$component->isCurrent($term)` is true on that term's own page.

## `<x-sunrice::entry-filter>`

A list of entries that visitors filter, sort and page through, driven by
the URL (`/shop?category[]=shoes&price_max=100&sort=cheap`), so results
can be shared and the form works without JavaScript. Like the other
components it has no markup of its own: the starter templates include an
unstyled form, `partials/entry-filter.blade.php`, to copy and restyle.

```blade
<x-sunrice::entry-filter collection="products"
    :filters="[
        'q' => ['type' => 'search', 'fields' => ['title', 'summary']],
        'category' => ['type' => 'terms', 'taxonomy' => 'categories'],
        'brand' => 'select',
        'colors' => ['type' => 'select', 'multiple' => true],
        'price' => 'range',
        'published' => ['type' => 'date_range', 'field' => 'published_at'],
        'in_stock' => ['type' => 'toggle', 'label' => 'In stock only'],
    ]"
    :sorts="[
        'newest' => '-published_at',
        'cheap' => ['label' => 'Lowest price', 'order' => 'price'],
        'pricey' => ['label' => 'Highest price', 'order' => '-price'],
    ]"
    :per-page="24">
    @include('sunrice.partials.entry-filter', ['filter' => $component])

    <ul class="cards">
        @foreach ($component->entries as $entry)
            @include('sunrice.partials.card', ['entry' => $entry])
        @endforeach
    </ul>
    {{ $component->entries->links('sunrice.partials.pagination') }}
</x-sunrice::entry-filter>
```

Each key of `filters` is the name in the URL; the value is a type, or an
array with `type` and options:

| Type | URL | Matches | Options |
| --- | --- | --- | --- |
| `search` | `?q=linen` | title or `fields` contain the text | `fields` (default `['title']`) |
| `terms` | `?category[]=shoes` | entries with any chosen term, or its child terms | `taxonomy` (default: the key), `multiple` (default true), `hide_empty` |
| `select` | `?brand=acme`, or `?colors[]=red` with `multiple` | the field equals a chosen value (list fields: holds any of them) | `field`, `options` (default: the select field's own options), `multiple` |
| `range` | `?price_min=10&price_max=50` | number field within the range | `field` |
| `date_range` | `?published_from=2025-01-01&published_to=…` | date field (or `published_at`) within the dates | `field` |
| `toggle` | `?in_stock=1` | the field is on | `field` |

Every type also takes `label` (default: the key, title-cased) and `field`
(default: the key). Only declared filters are read, and `terms` / `select`
values must be one of their options, so the URL can't query anything else.
`where` and `terms` props work as on `<x-sunrice::entries>`, for a fixed
scope (e.g. only one brand's products).

The slot gets:

- `$component->entries`: the current page (paginator; keeps the filters in
  its links).
- `$component->filters`: for building the form. Each has `name`, `type`,
  `label`, `value` (current), `inputs` (form field names, e.g. `category[]`,
  or `price_min` / `price_max`) and `options` (`value`, `label`,
  `selected`, plus `count` and `depth` for terms).
- `$component->filter('brand')`: one of them by name.
- `$component->sorts`: `value`, `label`, `selected`; the URL name is
  `$component->sortParam` (`sort`).
- `$component->active`: the applied filters (`label`, `value`,
  `remove_url`) for "Brand: Acme ×" chips; `$component->clearUrl` removes
  them all, `$component->filtered()` tells whether any is applied.

## `<x-sunrice::search>`

Site search. GET `/search?q=…` (and `/{locale}/search`) shows results with
the `sunrice.search` template (see [Templates](templates.md#search-and-error-pages));
the component helps build search boxes and custom result lists:

```blade
{{-- A search box anywhere: the starter header's partials/search-form --}}
<x-sunrice::search>
    <form method="get" action="{{ $component->action }}" role="search">
        <input type="search" name="{{ $component->name }}" value="{{ $component->query }}">
        <button>Search</button>
    </form>
</x-sunrice::search>

{{-- Results inside a template, e.g. searching the help articles only --}}
<x-sunrice::search :results="true" collections="help" :per-page="20">
    @foreach ($component->results as $entry)
        <a href="{{ $entry->url }}">{{ $entry->title }}</a>
    @endforeach
    {{ $component->results->links('sunrice.partials.pagination') }}
</x-sunrice::search>
```

The search covers published entries that have pages of their own: their
title and field text, in the visitor's language (Ready translations) or
the main one. `action` is the search page in the page's language, `query`
what was searched, `name` the URL name (`q`). Settings:
`sunrice.search` in [Configuration](configuration.md).

## Pagination

Lists are Laravel paginators, so `{{ $entries->links() }}` works and uses
Laravel's own (Tailwind) view. The starter templates ship a plain one to
restyle: `{{ $entries->links('sunrice.partials.pagination') }}`. To change
every list at once, publish Laravel's views
(`php artisan vendor:publish --tag=laravel-pagination`) or set
`Paginator::defaultView('sunrice.partials.pagination')` in a service
provider. The words come from `lang/{locale}/pagination.php` (Sunrice adds
Indonesian).

## `<x-sunrice::seo>`

Put it once in the `<head>` of your site layout:

```blade
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <x-sunrice::seo />
    <x-sunrice::code position="head" />
</head>
```

Without attributes it describes the page being rendered — an entry, a
term page or a listing page — and emits `<title>`, meta description,
`<meta name="robots">` (only when the page is hidden), canonical link,
Open Graph tags, Twitter card tags, `hreflang` alternates and
`x-default`. All URLs are absolute. Fallback pages canonicalize to the
main-locale URL and emit no hreflang. On other pages (your own routes)
it uses `app.name` and the current URL.

Values come from the page's own SEO fields (entry editor, term editor,
listing page editor: meta title, description, canonical URL, share image,
"Hide from search engines"), then the collection's or taxonomy's SEO
defaults, then **Settings**. Attributes override them:

```blade
{{-- Force values (e.g. a search page) --}}
<x-sunrice::seo title="Search results" :noindex="true" />

{{-- Title only when the page has no meta title of its own --}}
<x-sunrice::seo :default-title="$heading" />

{{-- Describe a specific page instead of the current one --}}
<x-sunrice::seo :entry="$otherEntry" />
```

Hidden entries are also left out of `/sitemap.xml`. Hide a whole site
(e.g. staging) and set the `twitter:site` handle, default description and
default share image under **Settings** in the admin (or with
`SUNRICE_NOINDEX=true` / `SUNRICE_TWITTER_SITE=@handle`).

## `<x-sunrice::code>`

Prints the code snippets from **Settings → Code snippets** (analytics, tag
managers, chat widgets…). Put one of each in your layout:

```blade
<head>
    …
    <x-sunrice::code position="head" />
</head>
<body>
    <x-sunrice::code position="body_start" />
    …
    <x-sunrice::code position="body_end" />
</body>
```

Snippets are printed as-is, so only give `sunrice.settings.edit` to people
you trust with the site's scripts. The starter layout and the package's
fallback views already include all three.

## `<x-sunrice::form>`

Public form renderer:

```blade
<x-sunrice::form handle="contact">
    <input name="data[name]" required>
    <input name="data[email]" type="email" required>
    <textarea name="data[message]"></textarea>
</x-sunrice::form>
```

The component outputs `<form>` + `@csrf` + honeypot fields; submissions
post to `route('sunrice.frontend.forms.submit', $handle)` with the
page's language, so messages come back in it. The slot sees
`$component->form` (fields/schema), `$component->error('email')` and
`$component->old('email')` (this form's message and previous input; other
forms on the same page keep theirs), and `$component->success()`. After a
submission the visitor lands back on the form (`#sunrice-form-{handle}`),
and messages name fields by their label. When the form requires a captcha
([Forms → Captcha](forms.md#captcha)), the component adds the widget above
the submit button and its message (`$component->captchaError()`).

## `<x-sunrice::comments>`

An entry's discussion: its approved comments as a thread, and a form for
comments and replies.

```blade
<x-sunrice::comments :entry="$entry" />
<x-sunrice::comments :entry="$entry" :depth="2" class="my-comments" />
```

It renders nothing unless the entry's collection has **Allow comments**
on, and shows "Comments are closed" instead of the form when the entry no
longer takes new ones. `depth` overrides the reply levels from Settings →
Comments. See [Comments](comments.md#showing-comments) for the markup,
its CSS classes and how to override it.
