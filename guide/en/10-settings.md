# The website's settings

The website adds four sections to **Settings** under Administration: **Site**, **Languages**, **Site code** and **Comments**. Each is a separate permission, so you may see only some of them. The panel's own sections (**Branding**, **Security** and **Mail**) are explained in [Settings](guide:panel/settings).

Settings are live as soon as you click **Save**.

## Site

- **Homepage**: the entry shown at the website's address (`/`), in each language it's published in. Its own address redirects there.

**Search and sharing**, for pages that don't set their own (see [SEO](guide:website/seo)):

- **Site name**: added to page titles and shown when pages are shared. Empty: the name your developer set.
- **Description** and **Share image**: used when a page has none of its own.
- **Title separator**: what goes between a page's title and the site name (`|` in "About | Acme").
- **Add the site name to titles**: "About | Acme" in search results and browser tabs.
- **X (Twitter) account**: the site's account, such as `@acme`, for shared links.
- **Hide the whole site from search engines**: for a site still being built. Every page asks not to be indexed and the sitemap is empty. Turn it off when the site goes live.

**Structured data**: **Add structured data to pages** (on unless you have a reason), whether the site is **Published by** an organisation or a person, and the organisation's **Logo** (square or wide, at least 112 pixels).

## Languages

**Content languages** lists the languages content is written in, a row each: the **code** used in addresses (`id`) and the **name** editors see (`Bahasa Indonesia`). **Add a language** adds a row; typing a code suggests common languages and fills in the name. The arrows change the order, and × removes a row.

The first row is the **main language** (marked *Main*), at the plain addresses (`/about`); the others get their code in front (`/id/about`). The panel refuses an empty list and a language listed twice.

- **Adding a language** makes it available in the editor's language bar. Nothing is translated automatically.
- **Removing a language** hides its content (nothing is deleted); add it back to bring the content back.
- **Changing the main language** isn't possible here once content exists: your developer does it with a command that moves everything safely.

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
