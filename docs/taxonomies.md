# Taxonomies and terms

A **taxonomy** groups entries: categories, tags, topics. Its **terms** ("News", "Sports") have a title and slug in each language, and in a hierarchical taxonomy a parent ("Local" under "News").

## Setting up

Under **Structure → Taxonomies** (permissions `cms.taxonomies.view`, `.create`, `.update`, `.delete`): a title (and **Title in …** each other language, what visitors read on its term pages: `$taxonomy->titleIn($locale)`, `translations` in code), a handle (it can be changed later, with a warning: terms fields and templates that name it need the new one, roles keep their permissions), whether terms nest, and the collections whose entries it groups (the entries list filters by it; a collection whose blueprints have a terms field for the taxonomy gets the filter anyway, so a terms field is enough). Ticking a collection gives each blueprint its entries may use a terms field for the taxonomy when it has none (at any depth, fieldsets included): labelled with the taxonomy's title, under its handle or a free variant (`topics_terms`), several terms allowed, saved like any blueprint change, so editors choose terms on its entries straight away. Unticking one keeps that field and what entries chose, unless **Also remove the terms field from collections you untick** (asked once the list changes) is on: then it goes from blueprints no ticked collection uses (values stay stored, out of sight). The form's side card lists the blueprints with a terms field for the taxonomy. In code: `Sunrice\Cms\Actions\Taxonomies\AttachCollections::handle($taxonomy, $collectionIds, removeFields: false)` (`@api`), and `AttachCollections::blueprintsWithField($taxonomy)`. Deleting a taxonomy keeps its terms, out of sight: the list's **Trash** and **Restore** bring it back, and `sunrice:orphans --purge` deletes it for good ([leftovers](structure.md#leftovers)).

Under **Taxonomies** in the sidebar, one item per taxonomy (`/admin/cms/taxonomies/{handle}/terms`; permissions `cms.terms.view`, `.create`, `.update`, `.delete`, or `cms.terms.{taxonomy}.{action}` for one taxonomy): add (on its own page, `…/terms/create`), rename, nest, reorder and trash a taxonomy's terms, in each language (see [Trash](#trash)). A term not yet translated shows the main language's title. Terms are dragged into order by their handle among the terms of their level, each taking the terms under it along (moving a term to another parent is **Rename** → *Under*).

In code: `SaveTerm` (title, slug, locale, parent_id, version), `TrashTerm`, `RestoreTerm`, `DeleteTerm`, `MoveTerm` (one place up or down) and `ReorderTerms::handle($taxonomy, $ids, $parentId)` (the terms under `$parentId`, null for the top level: those given first in that order, the rest of the level after them as they were, numbered again in one transaction, logged as `reordered` and the site's cache cleared, unless the order was already so: it returns whether it changed; route `POST cms/terms/reorder` with `taxonomy`, `ids` and `parent_id`). Slugs are unique per taxonomy and language; left empty, they're made from the title. Each term translation has a `version`, counted up on each save of its title, slug or page content: `SaveTerm` and `SaveTermContent` given the `version` the editor opened refuse a save over someone else's newer one with an error on `version` (the term's page offers **Load theirs** or **Save mine anyway**, as for entries).

## Giving entries terms

Add a **Terms** field to the blueprint, with its taxonomy, and whether it takes several terms (and at most how many). Editors pick from the taxonomy's terms; only that taxonomy's terms are accepted. Terms fields are shared by all languages.

The editor doesn't carry the terms in the page: a terms field loads them when it shows, from `GET cms/terms/picker?taxonomy=…` (behind `cms.entries.view`, like the entries picker), in tree order with their depth, or those whose title matches `q`, or some by `ids[]`. A taxonomy of more than 100 terms is searched instead of listed whole. `TermsField::toAdmin()` sends the taxonomy's handle; the entry editor also sends the chosen terms' titles (`termLabels`; `TermsField::labels($ids)`).

Templates get `Term` models (`$term->title()`, `$term->title('id')`, `$term->translation()->slug`), or a collection of them with several, in the order chosen; deleted terms are left out.

When an entry is published, the terms of its top-level terms fields are kept in `sunrice_entry_term`, so queries can find "entries with this term" without reading JSON:

```php
$term->entries;                 // entries that have it
$entry->terms;                  // the terms of an entry
```

## Term pages and fields

Switch on a taxonomy's **Terms have pages** and set its **Term page URL** (`route`, like `/topics/{slug}`; left empty, `/{handle}/{slug}`; switched off, `null`) and each term gets a page listing its live entries, newest first, 10 a page; other languages under their prefix (`/id/topics/berita`), with each language's slug. A **Term fields** blueprint gives terms fields of their own (a description, an image); without one, terms have a `description` (a textarea, `Taxonomy::DESCRIPTION`) to introduce their page, which the CMS's plain term page prints. Both, and SEO (title, description, share image, hide from search engines), are edited on each term's page in the admin (the page icon in the terms list; `SaveTermContent` in code), per language, with the term's title and slug in that language (in a language it isn't translated into, giving it a title there adds it: `SaveTermContent` with `title`, and `slug`, renames or translates it through `SaveTerm` first, in the same transaction, checking `version` once); fields not translated come from the main language. **SEO from fields** names the term fields that fill in what the SEO card leaves empty (see [SEO](site.md#seo)). A new slug on a term's page (when terms have pages) notes that the old address will stop working (404) unless a redirect is added: terms don't redirect by themselves (**Add a redirect** links to Structure → Redirects for those with `cms.redirects.create`; props `term.hasPage` and `redirectsUrl`). A term may name its own template. Group fields, **Search and sharing** and **Page settings** fold away (remembered, opened on an error), and one person edits a term's page in a language at a time ([edit locks](../../admin/docs/locks.md), type `cms.term`).

Term pages render with the first view that exists: the term's template, the taxonomy's `template`, `cms.taxonomy-{handle}`, `cms.term`, or the CMS's plain one, with `$term` (the `TermTranslation`: `->title`, `->slug`, `->url()`, `->term`), `$taxonomy`, `$entries` (a paginator of the live entries with the term and, in a hierarchical taxonomy, with the terms under it, newest first; queried only when the template uses it), `$values` and `$richText` (its fields), `$title` and `$locale`. In the head: `<x-sunrice-cms::seo :term="$term" />`. `$term->url($locale)` on a `Term` links to its page. Term pages are in the sitemap, but those hidden from search engines.

Term pages and entries share URL patterns: the most specific matching pattern decides, and collections come before taxonomies when two are as specific.

## Trash

Deleting a term moves it, and the terms under it, to the trash (`TrashTerm`): off the site, out of pickers and entries. In the terms list's **Trash**, restore it (`RestoreTerm`; under a parent still in the trash it goes to the top level) or delete it for good (`DeleteTerm`; terms under it move up, entries lose it). A term other content points at (`Term::referencedBy()`, see [references](structure.md#references)) is named in the confirmation, and `DeleteTerm` refuses it unless `force` is passed.

