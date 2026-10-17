# Settings

The Settings page holds choices that apply to the whole site. Open it with **Manage → Settings**; you need the **Edit settings** permission.

## Finding your way around

At the top are two tabs, **General** and **SEO**. Some sites show extra tabs added by an installed package, such as a shop's settings.

The **General** tab is divided into cards: **General**, **Languages**, **Branding**, **Code snippets**, **Email**, **Security** and **Comments**. Click a card's title to fold it or open it again.

To save your changes:

1. Change what you need in any of the cards.
2. Click **Save settings** (at the top or bottom of the page), or press Ctrl S (⌘ S on a Mac).
3. A "Settings saved." message confirms it.

> [!TIP]
> If you try to leave with unsaved changes, the admin warns you first.

## General

- **Site name**: the name of your website. It is used in page titles and wherever your templates show it.
- **Description**: a short summary of the site. It is used as the meta description for pages that don't have their own.
- **Timezone**: the timezone used for dates and times. Pick your city or region from the list, for example `Asia/Jakarta`.
- **Homepage**: the entry shown at the site's main address. Click the field, choose an entry, and save. The **×** button next to it clears the choice.

> [!NOTE]
> Choose a published entry: visitors can't see a draft, so an unpublished homepage would leave the main address empty.

## Languages

This card lists every language of the site. The main language has short addresses (for example `/about`); the others get their code in front (`/en/about`).

To add a language:

1. Type its code in the small box at the bottom, for example `en`, `id` or `pt-BR`.
2. Click **Add language**.
3. Type the language's display name next to its code, for example "English". Visitors see this name in the language switcher.
4. Click **Save settings**.

To remove a language, click the **×** next to it. The main language is marked **Main language** and can't be removed. While the site has no content yet, **Make main** turns another language into the main one.

> [!WARNING]
> Once content exists, the main language is locked. Changing it converts all content, so it is done by a developer on the server. The card shows a "How do I change it?" link with the steps.

> [!TECHNICAL]
> The main language is switched with `php artisan sunrice:switch-main-language {code}` (first with `--dry-run`, and `--copy-missing` to fill untranslated items). Back up the database first and run `php artisan optimize` afterwards if routes or config are cached. See [Changing the main language](docs:multilingual.md#changing-the-main-language).

For translating content itself, see [Translations](translations.md).

## Branding

Branding changes how the **admin** looks, not your public website.

- **Panel name** and **Tagline**: shown in the sidebar, on the login page and in browser tabs. Changing the name also hides the "Powered by Sunrice CMS" note.
- **Logo**: click **Choose logo** to pick an image from your media library. A square SVG or PNG works best; it is also used as the browser tab icon.
- **Font**: the typeface used in the admin.
- **Accent color**: the colour of primary buttons, the active menu item and focus outlines. Use the colour picker or type a code such as `#1e66f5`; **Reset** returns to the neutral default.

After saving, the page reloads so the new look takes effect.

> [!TIP]
> Each person can switch the admin between **Light**, **Dark** and **System** in their user menu at the bottom of the sidebar.

## Code snippets

Paste small pieces of code that must appear on every page, such as analytics, a tag manager or a search engine's verification tag, into **In <head>**, **Start of <body>** or **End of <body>**, as your provider tells you, and save.

> [!WARNING]
> Snippets are printed exactly as you paste them, on every page. A broken snippet can break the look of the whole site. Only paste code from sources you trust.

> [!TECHNICAL]
> The snippets appear only where the layout contains `<x-sunrice::code position="head" />` (and `body_start`, `body_end`). The starter templates include them. See [`<x-sunrice::code>`](docs:blade-components.md#x-sunricecode).

## Email

The site sends login codes, password resets, form and comment notifications by email. This card shows the current setup (**Mailer**, **Server**, **From**); it can't be changed here. If a yellow warning says the mailer "doesn't deliver email", messages only go to a log file: ask your developer to set up email.

To check that email works:

1. Under **Send a test email**, type your own email address.
2. Click **Send test**.
3. Check your inbox (and the spam folder). If sending failed, the error from the mail server appears under the box.

> [!TECHNICAL]
> Email is configured in `.env` with the `MAIL_*` keys (for example `MAIL_MAILER=smtp`, `MAIL_HOST`, `MAIL_FROM_ADDRESS`). Form and comment notifications are queued, so a queue worker must run unless `QUEUE_CONNECTION=sync`. See [SMTP settings](docs:mail.md#smtp-settings) and [Queue worker](docs:mail.md#queue-worker).

## Security

Switch on **Two-factor login with an emailed code** to make logins safer: after their password, everyone must also enter a 6-digit code sent to their email address.

> [!WARNING]
> Turn this on only after a test email has reached you. If login codes can't be delivered, nobody can log in, including you.

> [!TECHNICAL]
> If everyone is locked out, a developer can turn it off on the server with `php artisan sunrice:two-factor off`. It can also be set with `SUNRICE_TWO_FACTOR=true`. See [Two-factor login](docs:mail.md#two-factor-login).

## Comments

The **Comments** card controls comments on collections that allow them: whether new comments wait for approval, who may comment, a captcha, a rate limit, when comments close, how many reply levels are shown, and who gets an email about new comments. Each option is explained in [Comments](comments.md).

## SEO tab

The **SEO** tab holds the site-wide search-engine and sharing options. Save it with **Save SEO settings**.

In the **Search engines & sharing** card:

- **Hide the whole site from search engines**: asks search engines not to list any page and empties the sitemap. Meant for test copies; keep it off on your live site.
- **Add the site name to page titles**: shows titles like "About us | My Site" in browser tabs and search results. The **Separator** box sets the character between them.
- **X/Twitter handle**: your account, such as `@acme`, added to share previews.
- **Default share image**: click **Choose image** to pick the picture shown when a page without its own image is shared on social media.

Below, **Fields used for SEO** lets you choose, per collection and taxonomy, which field fills the **Meta title**, **Meta description** and **Share image** when an entry leaves its own SEO fields empty. **Automatic** picks a fitting field; **None** uses nothing. See [SEO](seo.md).
