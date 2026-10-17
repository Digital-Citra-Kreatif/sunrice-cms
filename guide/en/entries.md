# Entries

Entries are the pages, articles, products and other items of your site. This page covers the entries list and the whole life of an entry: drafts, publishing, scheduling, revisions and the trash.

## The entries list

In the sidebar, under **Content**, click a collection (for example *Articles*). The list shows each entry's **Title**, **Status** (*published*, *draft* or *scheduled*), **Created by**, **Created** and **Updated** dates. Hierarchical collections also show a **Parent** column.

- **Search…**: type to find entries by title.
- **Filters**: **Status** (**Published**, **Draft**, **Scheduled**), **Created by** (a person, or **No author**) and **Trash** (**Trashed**, to see entries in the trash). Choose **All** to clear a filter.
- **Sorting**: click a column heading such as **Title**, **Created** or **Updated** to sort by it; click again to reverse.
- **Columns**: choose which columns to show, including the collection's own fields. Your choice is remembered.
- **Export**: download the entries you are looking at as a spreadsheet (CSV) file.

Click an entry to open it. The **Go to…** button next to **New entry** jumps to related screens, such as the collection's taxonomies. Collections with a listing page (such as a blog overview) also have an **Archive/listing page** button to edit that page's text.

### Bulk actions

Tick the boxes in front of entries (or the box in the header for all of them) and choose an action: **Trash**, **Restore**, **Publish** or **Delete forever**. **Restore** and **Delete forever** only work on entries in the trash.

### Manual order

Some collections are ordered by hand. Their list says *Drag entries to set the order they appear in on the site*: drag an entry by its handle to move it. While a search, filter or column sort is active, dragging is paused; clear them to drag again.

## Creating an entry

1. Open the collection and click **New entry**.
2. Type a **Title**. Leave **Slug** empty to have it made from the title. The slug is the last part of the page's web address, such as `/blog/my-first-post`.
3. If the collection offers several **Blueprint** options in the **Status** card, choose the one you want (otherwise the collection's default is used).
4. Fill in the fields. Repeating content has **Add row** or **Add block** buttons; each row or block has a **Show** switch to hide it on the site without deleting it.
5. Click **Create draft**. The entry is saved, but not yet visible on the site.

## Drafts and live content

Every save goes into a **draft**; visitors only see what you **publish**. On a published entry you can keep saving drafts with **Save draft** while the live page stays as it was; the header then shows an **Unpublished changes** badge. Clicking **Publish** makes the draft live.

The **Status** card on the right shows the entry's state (**Draft**, **Scheduled** or **Published**) and the save button: **Save draft** when you have unsaved changes, **Saved** when everything is saved.

> [!WARNING]
> Leaving the page before saving loses your changes. The admin warns you, but get into the habit of pressing **Ctrl S** / **⌘ S**.

## Publishing and scheduling

- **Publish now**: click **Publish** at the top of the page. Unsaved changes are saved first.
- **Schedule**: in the **Status** card, set **Publish date** to a moment in the future and click **Schedule**. The status becomes **Scheduled** and the card shows when it **Goes live**.
- **Change the date** of a published entry: pick a new **Publish date** and click **Update date** (or **Reschedule** for a future date). A past date is simply shown as the publication date.
- **Unpublish**: click **Unpublish** in the **Status** card (or **Cancel schedule** for a scheduled entry). The entry goes back to **Draft** and leaves the site.

> [!TECHNICAL]
> Scheduled entries are published by `sunrice:publish-scheduled`, which runs every minute through the Laravel scheduler. The server's cron must run `php artisan schedule:run`. See [Scheduler](docs:commands.md#scheduler).

## Viewing the page

When the entry has its own page on the site, the header shows **View page** (the public page) or, before it is live, **View draft**. A draft can only be seen by you and other editors while signed in.

## More actions

The **⋯** (**More actions**) button at the top holds:

- **Duplicate**: makes a copy as a new draft, with `-copy` added to its slug.
- **Unpublish**: takes a published entry off the site.
- **Mark ready** / **Unmark ready** and **Return to draft**: for translations, see [Translations](translations.md).
- **Move to trash**: removes the entry from the site and the list.

## Trash, restore and delete

Trashed entries can't be opened. To get one back, open the list, set the **Trash** filter to **Trashed**, tick the entry and choose **Restore**. To remove it for good, choose **Delete forever** instead.

> [!WARNING]
> **Delete forever** cannot be undone. Children of a deleted page move to the top level.

## Revisions

Every publish stores a revision. The **Revisions** card lists the latest ones by date.

1. Click **Restore** next to a revision.
2. Confirm. The old content is copied into the draft; the live page doesn't change yet.
3. Check it, then click **Publish**. Changed your mind? Click **Undo** in the card.

> [!TECHNICAL]
> The number of revisions kept per language is set with `sunrice.revisions.keep` (default 50).

## When two people edit the same entry

Only one person can edit an entry (in a given language) at a time. If a colleague already has it open, you see who and since when, and can choose **Go back**, **View only** (read-only), or **Take over**. If you take over, their unsaved changes are kept, and they appear on the page with **Load into the form** and **Discard**.

If someone saved the entry after you opened it, your save is refused: choose **Reload** to see their version, or **Overwrite with mine**.

> [!TECHNICAL]
> Edit locks live in the cache store, which every server must share. See [Two people editing](docs:content-modeling.md#two-people-editing-the-same-thing).

## Parent pages

In hierarchical collections (usually *Pages*), the **Parent** card places an entry under another one; choose **None (top level)** to keep it at the top. The web address starts with the parent's, for example `/about/team`. A new parent applies as soon as you save, and the old address redirects to the new one.

## Terms

If the collection uses taxonomies, the **Taxonomies** card lets you tag the entry: click **Add term…**, search, and pick terms. A taxonomy marked **(one)** allows a single term. See [Taxonomies](taxonomies.md).

## Template

The **Template** card (folded by default) lets you give one entry a different page design than the rest of its collection. Leave it empty unless your developer gave you a template name.

> [!TECHNICAL]
> The value is a Blade view name, such as `pages.landing`; it wins over the collection's template. See [Resolution order](docs:templates.md#resolution-order).
