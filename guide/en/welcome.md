# Welcome to Sunrice CMS

This guide is for the people who run the website day to day: editors who write and publish content, and site managers who look after its structure, users and settings. It explains how the admin is organised and walks you through each task step by step. Everything happens in the admin, which you open in your browser at your site's address followed by **/cms** (for example `https://example.com/cms`).

> [!TECHNICAL]
> The admin address can be changed with `SUNRICE_ADMIN_PATH` in `.env` (key `sunrice.admin.path`, default `cms`). See [Configuration](docs:configuration.md).

## Signing in

1. Open the admin address. You see the **Log in to …** screen.
2. Enter your **Email address** and **Password**.
3. Tick **Remember me** if you are on your own computer and want to stay signed in.
4. Click **Log in**.

To sign out, open the user menu at the bottom of the sidebar and choose **Log out**.

### Two-factor login code

Your site may ask for a second step after your password. If so, a **Check your email** screen appears and a 6-digit code is sent to your email address.

1. Open the email and copy the code. It expires after a few minutes (the screen tells you how long).
2. Type it into **Login code**.
3. Click **Verify and log in**.

If the email doesn't arrive, check your spam folder, then click **send a new code** (it becomes available after a short wait). Only the newest code works. **Back to log in** returns to the first screen.

> [!TECHNICAL]
> Two-factor login is switched on under **Settings → Security** or with `SUNRICE_TWO_FACTOR=true`. It needs working mail; if codes can't be delivered, turn it off on the server with `php artisan sunrice:two-factor off`. See [Two-factor login](docs:mail.md#two-factor-login).

### Forgot your password

1. On the login screen, click **Forgot password?**.
2. Enter your **Email address** and click **Email password reset link**.
3. Open the email and follow the link.
4. Type a **New password**, repeat it in **Confirm password**, and click **Reset password**.
5. Log in with the new password.

## The dashboard

After signing in you land on the **Dashboard**. It shows:

- **Your workspace, at a glance**: a greeting and the total number of entries and collections.
- **Your collections**: one card per collection with its number of entries. Click the arrow on a card to open that collection.
- **Recent edits**: the latest entries changed across the site, with their status. Click one to open it.
- **Recent form submissions**: the newest messages sent through the site's forms.

Every card can be folded away by clicking its title; the admin remembers this in your browser.

## Finding your way around

### The sidebar

The sidebar on the left lists everything you are allowed to use. What you see depends on your role, so a colleague may have more or fewer items. At the top, **Dashboard** (or the logo) takes you back to the start page. The other items are grouped:

- **Content**: one item per collection (for example *Pages* or *Articles*), plus **Comments** if the site has them.
- **Taxonomies**: one item per taxonomy, such as *Categories* or *Tags*.
- **Structure**: **Menus**, **Globals** and **Forms**.
- **Manage**: **Assets** (the media library), plus administration screens such as **Collections**, **Blueprints**, **Fieldsets**, **Taxonomies**, **Users**, **Roles**, **Activity log**, **Settings**, **AI access** and **Docs**.

Some sites also show extra groups, such as **Resources**, added by their developers.

Click a group's name to fold or unfold it. The admin remembers folded groups, and opens a group again when you visit one of its pages. The button at the top left of the page header shrinks the sidebar to icons only (hover an icon to see its name). On a phone, the same button opens the sidebar as a panel.

### Breadcrumbs

The header at the top of each page shows a breadcrumb trail, such as **Content › Articles › My first post**. Click an earlier part of the trail to go back up. Most editing screens also have a back arrow next to the page title.

### The user menu

The bottom of the sidebar shows your name and email address. Click it to open the user menu:

- **Appearance**: choose **Light**, **Dark** or **System** (follows your computer's setting).
- **Log out**.

There is no separate profile page. To change your name, email or password, ask a site manager, or use **Manage → Users** if your role allows it (see [Users and roles](users-roles.md)).

### Saving

Editing screens tell you when you have **Unsaved changes**, and warn you before you leave a page with unsaved work. You can save with **Ctrl S** (Windows) or **⌘ S** (Mac).

## How the CMS is organised

A few words come up throughout this guide:

- **Collections** are kinds of content, such as *Pages*, *Articles* or *Products*. Each collection has its own list in the sidebar.
- **Entries** are the individual items inside a collection: one page, one article, one product.
- **Blueprints** decide which **fields** an entry has: a title and slug always, plus things like a summary, an image or rich text. **Fieldsets** are reusable groups of fields.
- **Taxonomies** group entries by topic. A taxonomy such as *Categories* holds **terms** such as *News* or *Events*.
- **Menus** are the navigation lists on the site, such as the main menu or the footer links.
- **Globals** hold content shared across the whole site, such as contact details or a footer text.
- **Assets** are your uploaded files: images, documents and videos.

Editors mostly work with entries, terms, menus, globals and assets. Site managers set up collections, blueprints and taxonomies.

## What this guide covers

- [Entries](entries.md): writing, publishing, scheduling and organising content.
- [Translations](translations.md): content in more than one language.
- [Media](media.md): uploading and managing images and files.
- [SEO](seo.md): search engines and social sharing.
- [Taxonomies](taxonomies.md): categories, tags and other terms.
- [Menus](menus.md): the site's navigation.
- [Globals](globals.md): site-wide content.
- [Forms](forms.md) and [Comments](comments.md): what visitors send you.
- [Structure](structure.md): collections, blueprints, fieldsets and taxonomies.
- [Settings](settings.md) and [Appearance](appearance.md): site-wide options and branding.
- [Users and roles](users-roles.md), [Activity log](activity-log.md) and [AI access](ai-access.md): who can do what, and what happened.
