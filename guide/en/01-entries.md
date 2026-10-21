# Entries

Entries are the website's content: pages, articles, products, events. Each entry belongs to a **collection**, and the collection's fields decide what you fill in. Each collection has its own item under **Content** in the sidebar (**Blog**, **Pages** …): open it to work with its entries.

## The list

The list shows one collection at a time; pick another one with the collection menu next to the title. You see only the collections your role allows.

- **Search** finds entries by title or slug; type `#12` to find the entry with number 12.
- **Status** shows only **Drafts**, **Published**, **Scheduled** (published, going live later) or the **Trash**.
- Filter by author, by a term (such as a category) and by **Language**: the list shows the titles and statuses in that language.
- Click a column's title to sort by it. **Columns** chooses which columns you see, including some of the entry's own fields (a price, a date…). The panel remembers your columns and page size.
- **Go to** leads to what you might need next: the collection's listing page, its terms, its settings and its blueprint, as your role allows.
- **Export CSV** downloads the list as filtered, sorted and in its language, every page of it, for a spreadsheet. It needs its own permission: being able to see a list isn't enough to download it.

The filters stay in the page's address, so you can bookmark a view or send it to a colleague.

### Several at once

Tick entries (or the box at the top for the whole page) to **Publish**, **Unpublish** or **Move to the trash** them together. Right after trashing, the message has an **Undo** button. In the trash, rows say **Trashed** and each has a **Restore** button; ticked ones can be restored or **permanently deleted** together. Entries you may not change, or that can't be published as they are (a required field is empty, for example), are skipped, and the panel says how many.

### Putting entries in order

In a collection with *manual order*, click **Reorder** above the list, drag each entry into its place by its handle (or use the keyboard: focus the handle, press Space, move with the arrow keys, press Space again), and click **Done**. In a collection where entries nest, the list shows the tree (entries indented under their parent) and an entry moves among the entries beside it, with what's under it; to put an entry under another, choose its **Parent** in its Page settings. The **Order** arrows (**Move up** and **Move down**) also move one entry a place, while the list is in its own order, without filters or search. Other collections list their entries newest first (when they have dates) or by title.

## Writing an entry

1. Click **New entry**.
2. Type the **Title**. The **Slug**, the entry's part of the web address (`/blog/my-first-post`), is made from the title when you leave it empty; only lowercase letters, numbers and dashes. Changing the slug of an entry that has been published moves its address: a note under the field says the old address will redirect to the new one once you publish (or, for an entry taken off the site, that the old address will stop working unless a redirect is added).
3. Fill in the fields. Required ones say so; a field you leave in error is named when you save.
4. Click **Create draft**.

From then on, **Save draft** keeps your work (or press **Ctrl S** / **⌘ S**). Saving a draft never changes the website.

### Fields you'll meet

- **Rich text** has a toolbar for headings, bold, italic, lists, quotes, links and images from the media library.
- **Media** fields pick images or files from the [media library](guide:panel/media), or upload new ones.
- **Entries** and **Terms** fields link to other entries or to categories and tags; search by title.
- **Link** fields take a web address, or another entry (choose **Entry** to follow its address even if it changes).
- **Groups**, **repeaters** and **flexible** fields hold several fields together; repeaters and flexible fields add rows or blocks, which you drag into order by their handle. Each row or block is named by its first text; click its name to fold it away (**Collapse all** folds the whole list), and switch off **Visible on site** to keep it here but leave it out of the page.

The editor's cards (groups, **SEO**, and the cards on the right) fold away when you click their title. The panel remembers which ones you folded, and opens a card by itself when a field inside it has an error.

## Drafts and publishing

Every entry has a **draft**, which you edit, and a **live** version, which visitors see. The live version changes only when you publish.

- **Publish** puts the draft on the website. For an entry already live, the button says **Publish changes**; it says **Published** when there's nothing new.
- The **Status** card beside the fields has the **Publish date**: choose a date and time (in your time zone, on the 24-hour clock: type `14:30`) and press **Schedule**; the entry goes live then, and until then its status is **Scheduled**. A date in the past publishes now, with that date (to back-date a post). On a live or scheduled entry, change the date and press **Change date** (or **Reschedule**): the entry is published again with that date, with what's in the editor; a date to come takes it off the site until then. **Unpublish** is there too.
- The arrow next to **Publish** has **Publish on a date…** too (the picker starts on tomorrow; a date in the past asks first). While an entry is scheduled, the button says **Scheduled for …**: press it to change the date; the arrow also has **Publish now** and **Unschedule (back to draft)**.
- **Unpublish** (same menu) takes the entry off the website; it becomes a draft again. Publishing it again keeps its original date.

The **Status** card on the right says whether the entry is a draft, scheduled or published (and since when), and warns when *The draft has changes the site doesn't show yet*.

> [!NOTE]
> If your role can write but not publish (the *author* role, for example), you save drafts and someone else publishes them. When a draft is ready, click **Submit for review**: it's saved, everyone who can publish it gets an email, and it appears under **Waiting for review** on their dashboard. The entry shows a **Waiting for review** badge until someone publishes it. Changed your mind? **Withdraw the request** in the Status card takes it back.
>
> If you can publish, a draft waiting for your review has **Send back…** in its Status card: write what should change (optional) and the author gets it by email. The request is cleared and the draft stays as it is, for them to fix and submit again.

## Seeing your work on the website

- **Preview** opens the saved draft as it will look on the website, in a new tab. Save first: the preview shows what's saved, not what's on your screen. The preview link works for 30 minutes, and anyone you send it to can open it in that time; a dark ribbon at the top says it's a preview. Collections whose entries have no page of their own (testimonials, say) have no Preview.
- **View page** opens the live page.
- If your role may see drafts on the site, live pages with unpublished changes show you a small banner while you're signed in, with **View draft**. Visitors never see it.

## Page settings

The **Page settings** card on the right applies to every language. It's saved with the draft (**Save draft**, **Publish**, Ctrl+S), except the blueprint, which has its own button:

- **Parent**: in collections where entries nest (like pages under pages), the entry this one sits under; you can also choose it while creating the entry. It's used for breadcrumbs and sub-menus; the web address doesn't change.
- **Blueprint**: when the collection offers more than one set of fields (a normal page or a landing page, say), the one this entry uses. Switching keeps every value: fields both have keep theirs, and the others are kept out of sight and come back if you switch back. Save your draft first, then press **Change blueprint**: the editor reloads with the new fields.
- **Template**: a different design for this entry alone, if your developer made one. Leave it empty for the collection's own. **Which file?** under it lists, for your developer, the files tried in order and marks the one in use.
- **Accept new comments**: in collections with comments, switch it off to close this entry's comments (approved ones stay). **Comments** opens this entry's comments.

## Comments

In collections with comments, the **Comments** card shows how many of this entry's comments are waiting, approved or spam, and the latest five, with **Approve**, **Spam** and **Reply** if your role moderates comments. Its link opens the [comments page](guide:website/comments) with only this entry's comments.

## Used by

The **Used by** card lists the other content that links to this entry (other entries, terms, globals), with the field that links. Before trashing an entry, check it: links to it would lead nowhere.

## Revisions

Every publish keeps a **revision**: a copy of what was published, with the date and who published it. The **Revisions** card lists them with the fields each one changed; **Compare** shows a revision beside your saved draft, field by field; **Restore** loads one into the draft, so you can check it and publish when ready. Changed your mind? **Undo the restore** puts your previous draft back (until you sign out). The latest 50 revisions of each language are kept.

## More actions

The **⋯** button next to **Save draft** holds the rest:

- **Duplicate** copies the entry, in every language, as a new draft titled "… (copy)". Until it's first published, renaming it renames its slug too (unless you typed a slug of your own).
- **Move to trash** takes it off the website and out of the list, in every language, and can be restored. If other content uses it, the panel names where first.
- In the trash, an entry has **Restore** and **Permanently delete** (everything, in every language, with its revisions; this can't be undone).

## When someone else is editing

Only one person edits an entry in a language at a time. If a colleague has it open, you can **View only** or **Take over** (see [Working safely](guide:panel/welcome#working-safely)). If they saved after you opened it, choose **Load theirs** or **Save mine anyway**.

## Listing pages

A collection may have a **listing page** that lists its entries on the website (like `/blog`). Its own words (an introduction, a heading) and its search and sharing details are edited with **Listing page** above the entries list, and saved straight away (there's no draft).

> [!TECHNICAL]
> Collections, their URLs and templates are set up under Structure. See [Collections and entries](docs:cms/collections) and [The site](docs:cms/site).
