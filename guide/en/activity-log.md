# Activity log

The activity log is a record of who created, changed or deleted what in the admin, and when. Use it to find out who edited a page, check what changed last week, or review what an AI agent did. Open it with **Manage → Activity log**.

You need the **View the activity log** permission to see it. Administrators and super admins have it.

## What's recorded

The log keeps a line for every change made to:

- **Content**: entries (created, updated, published, unpublished, trashed, restored, deleted), terms, menus and their items, globals, media files and folders, forms, and deleted form submissions.
- **Structure**: collections, taxonomies, blueprints and fieldsets.
- **People**: users and their roles, roles and their permissions, and AI access tokens.
- **Settings**: site settings and the homepage.
- **Reordering**: one line each time someone changes the order of entries, terms, menu items or collections.

Some things are not recorded:

- Visitors' actions, such as sending a form or posting a comment on the site.
- Each person's own table preferences, such as which columns they show.
- The old and new **values**. The log records *which* fields changed, not what was in them. To see or restore earlier content, use an entry's revisions (see [Entries](entries.md)).

## Reading an entry

The newest changes are at the top. Each line has these columns:

| Column | What it shows |
| --- | --- |
| **Date** | When it happened. |
| **User** | Who did it. Changes from the server itself show **System**. |
| **Source** | Where the change came from (see below). |
| **Action** | What was done, such as created, updated, published or deleted. |
| **Activity** | A sentence about the change, such as Updated entry “About us (Pages)”. |
| **Details** | Which fields changed. |

In **Details**, translated fields show their language, as in `title (en)`, and `draft` means the change was saved as a draft and isn't live yet. For example, `title (en, draft)` means the English title was changed in a draft.

> [!NOTE]
> Several changes saved together become one line. Saving an entry and its translation at once is one "updated" line.

The user's name is stored as it was at the time, so lines stay readable even after that user is deleted.

> [!TIP]
> Use **Columns** at the top right of the table to hide columns you don't need.

### Where a change came from

The **Source** column has three values:

- **Admin**: someone working in the admin.
- **AI agent**: an AI agent connected through [AI access](ai-access.md). The name of the access token follows, for example `AI agent · Claude Desktop`. The **User** is the person who owns that token.
- **System**: a task run on the server, such as an import or an automatic translation.

## Filtering

Above the table are a search box and filters. Combine them to narrow the list:

- **Period**: **Last 24 hours**, **Last 7 days**, **Last 30 days** or **Last 90 days**.
- **Source**: **Admin**, **AI agent** or **System**.
- **Action**: for example only "deleted".
- **Type**: what kind of thing changed, such as entry, term or setting.
- **User**: one person, or **System**.

The search box (**Search by name, user or token…**) finds lines by the name of what changed, the user's name or the AI access token's name. Choose **All** in a filter to clear it.

### Reviewing what AI agents did

1. Set **Source** to **AI agent**.
2. Optionally type the token's name in the search box to see one agent only.
3. Optionally set **Period**, for example **Last 7 days**.

> [!TIP]
> To answer "who deleted this page?", search for the page's title and set **Action** to deleted or trashed.

## Pruning old entries

The log grows with every save. You can delete old lines to keep it small. This needs the **Delete old activity log entries** permission.

1. Click **Prune** at the top of the page.
2. In **Older than (days)**, enter an age. The suggested value is usually 180.
3. Click **Delete old entries**.

A message tells you how many lines were deleted, and the prune itself is recorded as a new line, "Pruned activity log".

> [!WARNING]
> Pruned lines are gone for good. If your organisation must keep a history for a certain time, check before pruning.

> [!TECHNICAL]
> A developer can prune from the server with `php artisan sunrice:prune-activity` (`--days=30` for another age), or schedule it daily in `routes/console.php`. The default age is `sunrice.activity.prune_days` (180), and `SUNRICE_ACTIVITY_LOG=false` in `.env` stops recording altogether. See [Keeping it small](docs:activity-log.md#keeping-it-small) and [Turning it off, and imports](docs:activity-log.md#turning-it-off-and-imports).

## Who can see the log

| Permission | Allows |
| --- | --- |
| **View the activity log** | Opening the log. |
| **Delete old activity log entries** | Using **Prune**. |

Give them to other roles under **Manage → Roles**; see [Users and roles](users-roles.md). An AI agent whose user has **View the activity log** can also read the log, for example to answer "what changed this week?".
