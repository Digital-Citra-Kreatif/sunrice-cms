# SEO: search engines and sharing

{panel} takes care of most of what search engines need: page titles, descriptions, links between languages, a sitemap and redirects. This page explains what you can set yourself.

## An entry's search and sharing details

Every entry has an **SEO** card below its fields, per language. It's saved with the draft and goes live when you publish.

| Field | What it does |
| --- | --- |
| **Meta title** | The title in search results and the browser tab. Empty: the entry's title. The site name is added after it ("About | Acme") unless that's turned off. |
| **Meta description** | A sentence or two shown under the title in search results and in shared links. Write it for people: what will they find on the page? |
| **Open Graph image** | The picture shown when the page is shared on social media or in chat apps. |
| **Hide from search engines (noindex)** | Asks search engines not to list this page, and leaves it out of the sitemap. Visitors can still open it. |
| **Canonical URL** | Only for a page that copies one elsewhere: that page's full address. Leave it empty almost always. |

Fields left empty may be filled from the entry's own fields, if a site manager set that up on the **SEO** page (**Fields used for SEO**: a summary as the description, the main image as the share image). Otherwise the site's defaults apply.

> [!TIP]
> Keep SEO titles under about 60 characters and descriptions under about 155, so search engines don't cut them off.

## Term pages and listing pages

A term's own page and a collection's listing page have the same **SEO** card: in the term editor (from the terms list) and on the listing page (from **Edit the listing page** in the **⋮** menu above the entries list). Both are live as soon as you save.

## The site's defaults

**Settings → Site** holds the **Site name** and a **Description**, used by pages that don't have their own. The homepage's title is the site name. See [The website's settings](guide:website/settings#site).

**Settings → SEO** (next to Site in the Settings menu) holds the rest, in **Search engines and sharing**: the **Default share image**, whether to **Add the site name to page titles** and the **Separator** between them (the `|` in "About | Acme"), and the site's **X (Twitter) account**. Below it, **Fields used for SEO** says, for each collection and taxonomy, which of their fields fill in an empty meta title, description or share image.

**Hide the whole site from search engines** (on the same page) is for a copy of the site that isn't public yet (a staging site). It hides every page and empties the sitemap. Make sure it's off on the real website.

**Structured data** (in Settings → Site) describes your pages to search engines in a form they read directly: your organisation or your name, your logo, articles and breadcrumbs. Leave it on unless your developer says otherwise.

## Images

Give every meaningful image **Alternative text** in the [media library](guide:panel/media): search engines read it, and so do people who can't see the image.

## Addresses and redirects

When you publish an entry with a new slug, the old address keeps working: {panel} adds a redirect from it to the new one automatically, so links and search results don't break. **Structure → Redirects** lists them, and site managers can add their own: **From** a path on the site, **To** a path or a web address, permanent (301) or temporary (302).

## The sitemap

The website has a sitemap at `/sitemap.xml`, which search engines read to find every page. It's kept up to date automatically with every live entry, term page and listing page, except those hidden from search engines. There's nothing to do, though your developer may tell search engines where it is.

> [!TECHNICAL]
> Layouts print the tags with `<x-sunrice-cms::seo />`. See [The site: SEO](docs:cms/site#seo).
