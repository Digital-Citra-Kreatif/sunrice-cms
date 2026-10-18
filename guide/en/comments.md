# Comments

Comments let visitors discuss your entries: they can comment on an article and reply to each other. You decide whether comments appear at once or wait for approval, and you moderate them in the admin: approve, reply, edit, mark as spam or remove.

## Turn comments on for a collection

Comments are switched on per collection, for example for *Articles* but not for *Pages*. This is usually done by a site manager.

1. Go to **Manage → Collections** and click the collection.
2. In the **Pages & URLs** card, make sure **Each entry has its own page** is ticked. Comments need a page to appear on.
3. Tick **Allow comments**.
4. Click **Save**.

Once at least one collection allows comments, **Comments** appears in the sidebar under **Content**.

> [!TECHNICAL]
> The comment thread only shows where the entry template contains `<x-sunrice::comments :entry="$entry" />`. The starter `show` templates already include it. See [Comments](docs:comments.md#showing-comments) and [Blade components](docs:blade-components.md#x-sunricecomments).

## Comment settings

Site-wide comment rules are in **Manage → Settings**, on the **General** tab, in the **Comments** card. Change them and click **Save settings**.

- **New comments**: how new comments are moderated.
  - **Hold a commenter's first comment for approval** (the default): once one of a person's comments is approved, their next ones appear at once.
  - **Hold every comment for approval**.
  - **Publish comments right away**.

  Comments by people who can moderate are always published.
- **Only signed-in users can comment**: guests can read the comments but don't see the form.
- **Ask for a captcha**: visitors prove they are not a robot. It uses the same captcha as forms, and is greyed out until that is set up.
- **Rate limit**: how many comments one visitor can post in a number of minutes (default 3 every 1 minute).
- **Close comments after (days)**: stop new comments on entries published longer ago than this. Empty means never. Existing comments stay visible.
- **Reply levels shown**: how deeply replies are indented on the site (default 3). Deeper replies line up at the last level, so threads stay readable on phones.
- **Email moderators about new comments**: sends an email for every new comment, with a link to approve it. Choose the **Roles** that get it (none ticked means everyone who can moderate comments) and add extra addresses under **Also send to**. Moderators' own comments don't send it.
- **Let commenters get an email when someone replies**: adds an "Email me when someone replies" box to the comment form. Each email has a link to stop them.

> [!TECHNICAL]
> Emails are queued, so a queue worker must run ([Mail](docs:mail.md#queue-worker)). The captcha keys go in `.env` ([Forms](docs:forms.md#captcha)). Spam is deleted automatically after 30 days by the scheduler (`sunrice.comments.prune_spam_after_days` in `config/sunrice.php`).

## Moderate comments

Go to **Content → Comments**. All comments are listed, newest first, with tabs:

- **All**: pending and approved comments.
- **Pending**: waiting for approval.
- **Approved**: visible on the site.
- **Spam**: marked as spam.
- **Trash**: removed, but not yet deleted for good.

Each tab shows how many comments it holds. Use **Search text, name or email…** to find a comment. When several collections have comments, the collection list (**All collections**) shows one collection's comments. When you arrive from an entry or a moderator email, only that entry's comments are listed ("On" and the entry's title); click the small cross to see every entry's comments again.

Each comment shows the author (with a **User** badge if they were signed in), the date, a status badge, the entry it's on, the comment it answers and its language. A link icon (**View on the site**) opens it on the page.

### Actions on one comment

- **Approve**: publish a pending or spam comment.
- **Unapprove**: take an approved comment back to pending.
- **Spam**: mark it as spam. It disappears from the site.
- **Reply**: type your answer and click **Post reply**. Your reply is published at once under your name, even when the entry is closed. Replying to a pending comment approves it.
- **Edit**: fix a typo or remove a link, then click **Save**.
- **Trash**: remove it from the site and move it to the **Trash** tab.
- **Restore** (in **Trash**): bring it back.
- **Delete forever** (in **Trash**): delete it permanently. Its replies stay, without it.

### Bulk actions

1. Tick the comments you want, or tick **Select all**.
2. Click **Approve**, **Unapprove**, **Spam** or **Trash** (in the **Trash** tab: **Restore** or **Delete forever**).

> [!WARNING]
> **Delete forever** can't be undone. Trashing and deleting need the permission to delete comments; see [Users and roles](users-roles.md).

## Comments on the entry editor

When you edit an entry in a collection with comments, the editor has a **Comments** card. Its heading shows how many comments are approved, waiting and spam, and it lists the entry's latest comments with the same actions as above. These actions don't reload the editor, so your unsaved changes are safe. If there are more, click **See all … comments** to open them in **Content → Comments**.

### Close comments on one entry

Turn off **Accept new comments on this entry** in the **Comments** card. It takes effect at once, without saving the entry. Visitors still see the approved comments, but the form is replaced by "Comments are closed." Turn it back on to reopen.

## What visitors see

Below the entry, visitors see the approved comments, oldest first, with replies nested under them, and a form to write a new one.

- Guests give a **Name** and an **Email** (never shown publicly). Signed-in users comment under their own name.
- Each comment has a **Reply** link that opens the form under it.
- After posting, the visitor sees "Thanks, your comment is posted." or, if it waits for approval, "Thanks! Your comment will appear once it is approved."
- Comments are plain text; links become clickable.
- If only signed-in users can comment, guests see "Sign in to comment." instead of the form.

Every language of an entry shares one comment thread, and each comment records the language it was written in.
