# The website's settings

The website adds five sections to **Settings** under Administration: **Site**, **Languages**, **Site code**, **Comments** and **Cache**. Each is a separate permission, so you may see only some of them. The panel's own sections (**Branding**, **Security** and **Mail**) are explained in [Settings](guide:panel/settings).

Settings are live as soon as you click **Save**.

## Site

- **Homepage**: the page shown at the website's address (`/`), in each language it's published in; type to search the live pages. Its own address redirects there. Editors can also press **Make this the homepage** in the Status card of a live page at the root of the website (like `/about`), and confirm.

**The site**, for pages that don't say their own:

- **Site name**: added to page titles and shown when pages are shared. Empty: the name your developer set.
- **Description**: used when a page has none of its own.
- **Description in other languages** (with more than one language): a box per language, for pages in that language. Empty: the description above.

The share image, the site name in titles and its separator, the X (Twitter) account and hiding the whole site from search engines are in **Settings → SEO** (right after Site in the Settings menu; see [SEO](guide:website/seo)).

**Structured data**: **Add structured data to pages** (on unless you have a reason), whether the site is **Published by** an organisation or a person, and the organisation's **Logo** (square or wide, at least 112 pixels). Search engines also like the publisher's details: its **Name** (empty: the site name), the **Organization type** (search the list: *Local business*, *Real estate agent*, *Restaurant*…; or choose **Other…** and type any schema.org type as one word, like *Brewery*), **Phone**, **Address** and **Profiles elsewhere** (its Instagram, LinkedIn… pages: **Add profile** for each, an address starting with https://; the site it's on shows beside it).

## Languages

**Content languages** lists the languages content is written in, a row each: the **code** used in addresses (`id`) and the **name** editors see (`Bahasa Indonesia`). **Add a language** adds a row; its code opens a list of common languages to search by code or name ("Bahasa Melayu · ms"), and choosing one fills in the name. For a language that isn't listed, type its code and choose **Use “…”**. **Address** is what the language's pages' addresses start with: leave it empty for the usual (the main language at `/about`, the others at `/id/about`), or type your own, such as `en` to put the main language at `/en/about` too. The arrows change the order, and × removes a row.

Until you save it, the list shows the languages your site was set up with. The first row is the **main language** (marked *Main*), at the plain addresses (`/about`); the others get their code in front (`/id/about`). The panel refuses an empty list, a row that isn't a language code and a language listed twice.

- **Adding a language** makes it available in the editor's language bar. Nothing is translated automatically.
- **Removing a language** hides its content (nothing is deleted); add it back to bring the content back.
- **Changing the main language** once content exists: use **Make … the main language** on the **Main language** card under the form. It moves everything safely, and changes addresses (the new main language loses its code, the old one gets it; old addresses redirect). Every entry and term needs a translation in the new main language first; the panel says how many don't.

See [Languages](guide:website/languages) for working with translations.

## Site code

Code from other services added to every page of the website, as is: analytics, a chat widget, a verification tag from a search engine. Paste it where the service says: **In the `<head>`**, **At the start of the `<body>`** or **At the end of the `<body>`**.

> [!WARNING]
> Code here runs in every visitor's browser. Only paste code from services you trust, and only give this permission to people you trust with the whole website. Every change is recorded and emailed to the people who receive security alerts.

## Comments

How visitors' comments work on collections that allow them (see [Comments](guide:website/comments)):

| Setting | |
| --- | --- |
| **New comments** | **Hold a commenter's first comment for approval** (the usual choice: once you approve one of theirs, their next comments appear at once), **Hold every comment for approval**, or **Publish comments at once**. Comments by moderators are always published. |
| **Only signed-in users can comment** | Visitors without an account see the comments but not the form. |
| **Ask for a captcha** | A "prove you're human" check, if your developer has set one up. |
| **Comments per visitor a minute** | Against floods. |
| **Close comments after (days)** | Days after an entry's publish date; empty: never. |
| **Reply levels shown** | Deeper replies line up at the last level, so threads stay readable on phones. |
| **Email moderators about new comments** | People who may moderate comments, and the addresses in **Also email**. |
| **Also email roles** | Everyone with these roles too. |
| **Let commenters get an email when someone replies** | Adds a box to the comment form. |

Spam is deleted automatically after a while.

## Cache

The website keeps what it shows often so pages load fast. A change to the content shows at once anyway: you rarely need this section. With **Whole-page cache** on, pages are rendered once and kept for visitors who aren't signed in (you always see pages fresh while signed in).

**Whole pages**:

- **Whole-page cache**: **As set up by the developer** (it says whether that's on or off), **Keep whole pages** or **Don't keep whole pages**. Turn it off if pages show something different to each visitor, like a cart or "Hi, Ana".
- **Keep pages for (minutes)**: the longest a page is kept. Empty: as long as the site's data.

**Pages never kept**, always rendered afresh:

- **Addresses**: **Add address** for each, starting with `/`. A `*` stands for anything: `/contact` is that page, `/account/*` every page under `/account`, `/search*` every address starting with `/search`. An address counts in every language (`/contact` is `/id/contact` too).
- **Collections**: tick a collection to never keep its pages and its listing page.

**Query strings** are what comes after `?` in an address, like `?sort=price` from a filter or `?utm_source=newsletter` from a newsletter link:

- **Parameters that make a page of their own**: parameters that change what a page shows (a filter, a sort, a tab), so each value is kept apart. Your developer may have set some already; the help names them.
- **Any other parameter**: **Ignore it** (the usual choice: visitors get the kept page) or **Skip the cache** (the page is rendered afresh and not kept), for pages that read parameters you can't list.
- **Parameters always ignored** (with **Skip the cache**): tracking parameters from newsletters and ads, which never skip the cache. `utm_*` stands for `utm_source`, `utm_medium`…

**Site data**: **Keep the site's data for (minutes)**: which page is at an address, menus and the sitemap. Empty: as your developer set it.

Saving applies at once: everything kept before is read afresh.

The **Cache** card under the form shows whether whole pages are kept, where things are kept, and when the caches were last cleared and by whom. Its buttons ask first:

- **Clear page cache**: visitors get freshly rendered pages. Use it after a developer changed templates, if pages look old.
- **Clear all site caches**: pages, addresses, menus and the sitemap are read afresh.

The site is a little slower for a moment after clearing. Both are recorded in the activity log.

If the whole-page cache isn't available on your server, its settings are greyed out and the card says so: ask your developer.

> [!TECHNICAL]
> Settings here win over `config/sunrice-cms.php` (`cache.pages`, `cache.ttl`, `cache.query`); the store stays in the config. Whole pages need `spatie/laravel-responsecache` (`composer require spatie/laravel-responsecache`). From the command line: `php artisan responsecache:clear`. See [Caching](docs:cms/caching#cache-settings).

## Captcha

A captcha is the "prove you're human" check on forms (**Require a captcha**, in each form's **Spam protection**) and comments (**Ask for a captcha**, above). Both switches stay off and greyed out until a developer connects a captcha service to the site: an account with Cloudflare Turnstile (free), Google reCAPTCHA or hCaptcha, whose keys go in the server's settings. Once it's set up, the help under each switch names the service in use.

> [!TECHNICAL]
> In the app's `.env`: `SUNRICE_CAPTCHA_PROVIDER` (`turnstile`, `recaptcha` or `hcaptcha`), `SUNRICE_CAPTCHA_SITE_KEY` and `SUNRICE_CAPTCHA_SECRET_KEY`; then `php artisan config:clear` (or `config:cache`). See [Security](docs:panel/security#captcha).
