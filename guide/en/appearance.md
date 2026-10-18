# Appearance

This page explains how the look of your public website is put together, what you can change yourself in the admin, and what needs a developer. In short: **you control the content, a developer controls the design.**

## How the site's look works

Every page of the site is built from two things:

- **Content**, which you manage in the admin: entries, their fields, images, menus and globals.
- **Templates**, which decide how that content is shown: the layout, colours, fonts, where the menu goes and how a list of articles looks.

When a visitor opens a page, the site takes the entry's content and pours it into the matching template. The same "Article" template, for example, shows every article, each with its own title, text and image. Change the text of an article and only that article changes; change the template and every article looks different.

> [!TECHNICAL]
> Templates are Blade views in `resources/views/sunrice/`, and the theme's CSS and JavaScript live in `public/sunrice-theme/`. A page's template is found in a fixed order: the entry's own template, then the collection's, then `sunrice.{collection}.show`, `sunrice.show`, and finally the built-in default. See [Resolution order](docs:templates.md#resolution-order).

## What you can change in the admin

| You want to… | Where |
| --- | --- |
| Change text, images and other content on a page | The entry, under **Content**. See [Entries](entries.md). |
| Change the links in the header or footer menu | **Structure → Menus**. See [Menus](menus.md). |
| Change site-wide content, such as contact details, a footer text or social links | **Structure → Globals**. See [Globals](globals.md). |
| Upload or replace images | **Manage → Assets**. See [Media](media.md). |
| Choose which page is the homepage | **Manage → Settings**, **Homepage**. See [Settings](settings.md#general). |
| Change the site name, languages and language names | **Manage → Settings**. See [Settings](settings.md). |
| Add analytics or tracking code | **Manage → Settings**, **Code snippets**. |

The fields you see when editing an entry, such as "Hero image" or "Summary", are set up for your site. Templates read these fields, so filling them in is how you shape each page. Fields made of **blocks** (for example a hero, text, gallery or form block) let you build a page from pieces in the order you choose, while each block's look stays consistent.

> [!NOTE]
> Leaving an optional field empty usually means that part simply doesn't appear on the page. That's normal and not an error.

> [!NOTE]
> **Branding** in Settings changes the look of the **admin** only, not your public website.

## What needs a developer

Ask a developer, or someone comfortable editing code, to:

- Change the layout, colours, fonts or spacing of the public site.
- Change where the menu, search box or language switcher appears.
- Add a new kind of page or a new block type.
- Add new fields to a collection's blueprint, so editors get new things to fill in. Someone with access to **Manage → Blueprints** can also do this (see [Structure](structure.md)), but the templates then need updating to show the new field.

> [!TECHNICAL]
> Styles are in `public/sunrice-theme/app.css` (plain CSS; it can be replaced with a Vite or Tailwind build). Blocks are rendered by `resources/views/sunrice/blocks/{handle}.blade.php`, one file per fieldset handle. See [Templates](docs:templates.md) and [Blade components](docs:blade-components.md).

### Choosing a template for one page

Some entries need a special design, such as a landing page. If the developer has made an extra template for it, open the entry and type its name in the **Template** card in the side panel. Leave it empty to use the collection's normal template. The card shows which files are used when it's empty.

Collections and taxonomies have the same option for all their pages (**Entry template**, **Archive/listing template** and **Term page template** under **Manage → Collections** and **Manage → Taxonomies**), usually set up by a developer.

> [!WARNING]
> Only type a template name your developer gave you, and check the page with **View draft** afterwards. A misspelled name can stop the page from showing correctly.

## Previewing your changes

Before you publish, check how a page will look:

1. Open the entry and save your changes.
2. Click **View draft** at the top of the editor. The page opens in a new tab with a "Draft" banner. Only signed-in people with permission to see unpublished entries can open it.
3. When you're happy, click **Publish**.

Once an entry is published, the button says **View page** and opens the public page.

> [!TIP]
> Check the preview on your phone too. Most templates rearrange the page on small screens, for example by folding the menu into a **Menu** button.

## The starter templates

New sites usually begin with Sunrice's **starter templates**: a simple, ready-made design that works out of the box. They include a header with the main menu, a search box and a language switcher; a footer; pages for single entries, lists of entries and categories; a search page; and "page not found" and error pages.

They are meant as a starting point. A developer typically adjusts them, or replaces them with your own design. As long as an expected menu, global or field is missing, that part simply shows nothing, so a fresh site never breaks.

> [!TECHNICAL]
> Publish the starter templates with `php artisan vendor:publish --tag=sunrice-templates`. The header reads the menu with handle `main` and the `site` global. Each file starts with a comment listing the field handles it expects. AI agents with template access can also read and edit them; see [AI access](ai-access.md) and [Starter templates](docs:templates.md#starter-templates).
