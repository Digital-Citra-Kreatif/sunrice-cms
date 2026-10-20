# SEO: search engines and sharing

{panel} takes care of most of what search engines need: page titles, descriptions, links between languages, a sitemap and redirects. This page explains what you can set yourself.

## An entry's search and sharing details

Every entry has a **Search and sharing** card below its fields, per language. It's saved with the draft and goes live when you publish.

| Field | What it does |
| --- | --- |
| **SEO title** | The title in search results and the browser tab. Empty: the entry's title. The site name is added after it ("About | Acme") unless that's turned off. |
| **Description** | A sentence or two shown under the title in search results and in shared links. Write it for people: what will they find on the page? |
| **Share image** | The picture shown when the page is shared on social media or in chat apps. |
| **Hide from search engines** | Asks search engines not to list this page, and leaves it out of the sitemap. Visitors can still open it. |
| **Canonical address** | Only for a page that copies one elsewhere: that page's full address. Leave it empty almost always. |

Fields left empty may be filled from the entry's own fields, if a site manager set that up for the collection (*SEO from fields*: a summary as the description, the main image as the share image). Otherwise the site's defaults apply.

> [!TIP]
> Keep SEO titles under about 60 characters and descriptions under about 155, so search engines don't cut them off.

## Term pages and listing pages

A term's own page and a collection's listing page have the same **Search and sharing** card: on the term's page (from the terms list) and on the listing page (from **Listing page** above the entries list). Both are live as soon as you save.

## The site's defaults

**Settings → Site** holds what pages don't set themselves: the **Site name**, a **Description**, a **Share image**, the **Title separator** (the `|` in "About | Acme"), whether to **Add the site name to titles**, and the site's **X (Twitter) account**. The homepage's title is the site name. See [The website's settings](guide:website/settings#site).

**Hide the whole site from search engines** is for a copy of the site that isn't public yet (a staging site). It hides every page and empties the sitemap. Make sure it's off on the real website.

**Structured data** (in the same section) describes your pages to search engines in a form they read directly: your organisation or your name, your logo, articles and breadcrumbs. Leave it on unless your developer says otherwise.

## Images

Give every meaningful image **Alternative text** in the [media library](guide:panel/media): search engines read it, and so do people who can't see the image.

## Addresses and redirects

When you publish an entry with a new slug, the old address keeps working: {panel} adds a redirect from it to the new one automatically, so links and search results don't break. **Structure → Redirects** lists them, and site managers can add their own: **From** a path on the site, **To** a path or a web address, permanent (301) or temporary (302).

## The sitemap

The website has a sitemap at `/sitemap.xml`, which search engines read to find every page. It's kept up to date automatically with every live entry, term page and listing page, except those hidden from search engines. There's nothing to do, though your developer may tell search engines where it is.

> [!TECHNICAL]
> Layouts print the tags with `<x-sunrice-cms::seo />`. See [The site: SEO](docs:cms/site#seo).
