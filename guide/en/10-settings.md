# The website's settings

The website adds four sections to **Settings** under Administration: **Site**, **Languages**, **Site code** and **Comments**. Each is a separate permission, so you may see only some of them. The panel's own sections (**Branding**, **Security** and **Mail**) are explained in [Settings](guide:panel/settings).

Settings are live as soon as you click **Save**.

## Site

- **Homepage**: the page shown at the website's address (`/`), in each language it's published in; type to search the live pages. Its own address redirects there. Editors can also press **Make this the homepage** in a live page's Status card.

**The site**, for pages that don't say their own:

- **Site name**: added to page titles and shown when pages are shared. Empty: the name your developer set.
- **Description**: used when a page has none of its own.
- **Description in other languages** (with more than one language): a box per language, for pages in that language. Empty: the description above.

The share image, the site name in titles and its separator, the X (Twitter) account and hiding the whole site from search engines are on the **SEO** page (under Structure in the sidebar; see [SEO](guide:website/seo)).

**Structured data**: **Add structured data to pages** (on unless you have a reason), whether the site is **Published by** an organisation or a person, and the organisation's **Logo** (square or wide, at least 112 pixels). Search engines also like the publisher's details: its **Name** (empty: the site name), the **Kind of organization** as a schema.org type written as one word (*LocalBusiness*, *RealEstateAgent*, *Restaurant*…), **Phone**, **Address** and **Profiles elsewhere** (its Instagram, LinkedIn… pages, one address per line).

## Languages

**Content languages** lists the languages content is written in, a row each: the **code** used in addresses (`id`) and the **name** editors see (`Bahasa Indonesia`). **Add a language** adds a row; typing a code suggests common languages and fills in the name. **Address** is what the language's pages' addresses start with: leave it empty for the usual (the main language at `/about`, the others at `/id/about`), or type your own, such as `en` to put the main language at `/en/about` too. The arrows change the order, and × removes a row.

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
