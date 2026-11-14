@verbatim
## Sunrice CMS

This app's website is built with Sunrice: the `sunrice/admin` panel (at `/admin`) and the `sunrice/cms` CMS. Editors manage all content in the panel; the site is Blade templates that print it.

- **Before building or changing pages, templates or the content structure, read `vendor/sunrice/cms/docs/building-a-site.md`**: the task-ordered guide (content model, settings, templates, converting a static site, the final checklist). The reference pages are beside it in `vendor/sunrice/cms/docs/` (`site.md`, `fields.md`, `helpers.md` …) and `vendor/sunrice/admin/docs/`.
- Over the panel's MCP server (`php artisan mcp:start sunrice`, or the `/mcp` endpoint with a token), `read_docs` serves the same pages (`cms/building-a-site`), and the `cms_*` tools manage blueprints, entries, globals, menus and templates.

### Where things live

Nothing a visitor reads is typed into a template.

| On the page | In Sunrice | In the template |
| --- | --- | --- |
| Navigation | a menu | `@foreach (Cms::menu('main') as $item)`: `label`, `url`, `active`, `children` |
| Footer text, contact details, social links | a global set | `Cms::global('site_info')['phone'] ?? ''` |
| A page's sections | the blueprint's fields | `$values['hero']['heading'] ?? null` |
| Varied sections | a flexible field; a view per block in `cms/blocks/{fieldset}.blade.php` | `@foreach ($values['sections'] as $block)` |
| Repeated items with pages (posts, team, services) | a collection | `$entries` on its listing page, `<x-sunrice-cms::entries collection="posts" :limit="3">` |
| Categories and tags | a taxonomy attached to the collection | `$entry->termsOf('topics')` |
| Images | media fields | `$image->url('large')`, `$image->srcset()`, `$image->altIn()` |
| Buttons | link fields | `<x-sunrice-cms::link :link="$values['cta']" class="button" />` |
| Forms | Structure → Forms | `<x-sunrice-cms::form handle="contact" />` |
| Title, meta, Open Graph, structured data | each page's SEO card, Settings → SEO | `<x-sunrice-cms::seo />` in `<head>` |
| Language switch | Settings → Languages | `<x-sunrice-cms::language-switcher />` |
| Interface words | `lang/{locale}/site.php`, same keys in every language | `__('site.read_more')` |
| Analytics snippets | Settings → Site code | `<x-sunrice-cms::code place="head" />` |
| The homepage | an entry chosen in Settings → Site | its template |

### Templates

Blade views in `resources/views/cms/`, the first that exists:

- `collections/{collection}/{slug}.blade.php` (one entry, by its main-language slug), `collections/{collection}/show.blade.php` (the collection's entries), `collections/show.blade.php` (any entry);
- `collections/{collection}/index.blade.php` (its listing page), `collections/index.blade.php`;
- `taxonomies/{taxonomy}/show.blade.php` and `index.blade.php` (term and index pages), `collections/{collection}/{taxonomy}/show.blade.php` (a collection's term pages);
- `search.blade.php`. Without any file, the CMS's plain built-in view renders the page.

Each page `@extends('cms.layout')` and fills `@section('content')`. The layout, `resources/views/cms/layout.blade.php`:

```blade
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" dir="{{ cms_dir() }}">
<head>
    <x-sunrice-cms::seo :title="$seoTitle ?? null" />
    <x-sunrice-cms::code place="head" />
</head>
<body @bodyClass>
    <x-sunrice-cms::code place="body-start" />
    @yield('content')
    <x-sunrice-cms::code place="body-end" />
</body>
</html>
```

Entry pages get `$entry` (`->title`, `->url()`, `->published_at`, `->terms`), `$collection`, `$values` (the fields by handle), `$richText`, `$fallback`; listing pages `$entries` (a paginator) and the listing page's `$values`; every page `$page`, `$title`, `$locale`. `php artisan vendor:publish --tag=sunrice-cms-templates` writes a working layout and templates; `php artisan sunrice:make-templates --all` writes templates from the blueprints.

### Rules

- Escape with `{{ }}`. Only rich text fields are printed with `{!! !!}`; code fields with `<x-sunrice-cms::code-block :value="$values['snippet']" language="html" />`.
- Every field may be empty, every menu or global set missing: `?? null`, `filled()`, `?->`, `@if`.
- Images: `alt="{{ $image->altIn() ?? '' }}"`. Links: `->url()` of entries and terms, menus' `url`, `<x-sunrice-cms::link>`; never build an address from a slug.
- No models, `DB::` or queries in templates, and no queries inside loops: `Cms::entries()`, `$entries` and the components load a list's fields at once.
- Layouts and partials read the page from `cms_page()`, never from `$entry` (a loop may have replaced it).
- Inline `<script>` and `<style>` get `nonce="{{ cms_nonce() }}"`; no inline event handlers (`onclick`) or `javascript:` links.
- Structure changes go through the panel, the MCP tools, the CMS's actions (`SaveBlueprint`, `SaveCollection`, `CreateEntry` …) or `php artisan sunrice:import-structure`; never edit the CMS's tables or `vendor/`.
- With the page cache on, clear it after deploying templates: `php artisan cache:clear`.
- Before finishing, open every kind of page in every language (the MCP tool `cms_render_page`, or a browser) and run `cms_seo_audit`.
@endverbatim
