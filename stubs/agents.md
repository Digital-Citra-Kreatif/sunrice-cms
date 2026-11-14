## Sunrice CMS

This site is built with Sunrice: the `sunrice/admin` panel and the `sunrice/cms` CMS. Before building or changing pages, templates or the content structure, read the guide `vendor/sunrice/cms/docs/building-a-site.md` (the reference pages are beside it in `vendor/sunrice/cms/docs/` and `vendor/sunrice/admin/docs/`; over the panel's MCP server, `read_docs` with the page `cms/building-a-site`).

- Plan the content model before templates. Nothing a visitor reads is typed into a template: navigation is a menu (`Cms::menu('main')`), contact details and footer texts a global set (`Cms::global('site_info')`), page sections blueprint fields (`$values`), repeated items a collection (`Cms::entries('posts')`), buttons link fields (`<x-sunrice-cms::link :link="$values['cta']" />`), forms `<x-sunrice-cms::form handle="contact" />`.
- Templates are Blade views in `resources/views/cms/`: `collections/{collection}/show.blade.php` for a collection's entries, `index.blade.php` for its listing page, `{slug}.blade.php` for one entry; each `@extends('cms.layout')` and fills `@section('content')`.
- The layout has `<x-sunrice-cms::seo />` in `<head>` (never write the title, meta, canonical or Open Graph tags yourself), `<html lang="…" dir="{{ cms_dir() }}">`, `<body @bodyClass>` and `<x-sunrice-cms::code place="head" />` (and `body-start`, `body-end`); layouts and partials read the page from `cms_page()`.
- Escape with `{{ }}`. Only rich text fields are printed with `{!! !!}`. Every field may be empty: `$values['intro'] ?? null`, `@if (filled(…))`.
- Images are media fields: `$image->url('large')`, `srcset="{{ $image->srcset() }}"`, `alt="{{ $image->altIn() ?? '' }}"`. Links come from `->url()` and menus, never built from slugs.
- No models or database queries in templates, and no queries inside loops: data comes from `$values`, `Cms::…` and the `<x-sunrice-cms::…>` components.
- Inline `<script>` and `<style>` get `nonce="{{ cms_nonce() }}"`; no inline event handlers (`onclick`) or `javascript:` links. Interface words go through `__()` with the same keys in every language's file.
- Change the structure through the panel, its MCP tools or `php artisan sunrice:import-structure`, and content through the panel or the CMS's actions; never edit the CMS's tables or `vendor/`.
- Check every kind of page in every language before finishing (the MCP tool `cms_render_page`, or a browser), and clear the page cache after deploying templates (`php artisan cache:clear`).
