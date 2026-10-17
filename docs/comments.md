# Comments

Visitors can discuss entries: comment, and reply to each other's comments.
Moderators approve, answer and remove them in the admin.

## Turning comments on

1. Open **Structure → Collections**, pick the collection and, under
   **Each entry has its own page**, tick **Allow comments**. Comments need
   a page to show on, so collections without single pages can't have them.
2. Choose how comments are moderated and protected in
   **Settings → Comments** (below).

Each entry can also close its own comments; its approved comments stay
visible. Every language of an entry shares one thread, and each comment
records the language it was written in.

## Showing comments

Put the component in the entry template (the starter `show` templates
already have it):

```blade
<x-sunrice::comments :entry="$entry" />
```

It lists the approved comments, oldest first, with their replies nested
under them, and a form for a new comment. Each comment has a **Reply**
link that opens the form under it (`?reply_to=id`, no JavaScript needed).
Guests give a name and an email (never shown); signed-in users comment
as themselves. Comments are plain text: line breaks are kept and links
become clickable with `rel="nofollow ugc"`.

After posting, the visitor comes back to the thread with "Your comment is
posted" (or "will appear once it is approved"). The form has the same
honeypot as forms, the rate limit from Settings → Comments and, when it's
on, the captcha.

The markup uses these classes: `sunrice-comments` (the section, `#comments`),
`sunrice-comments-list`, `sunrice-comment` (`#comment-{id}`),
`sunrice-comment-meta`, `sunrice-comment-body`, `sunrice-comment-reply`,
`sunrice-comment-replies`, `sunrice-comment-form` (`#comment-form`) and
`sunrice-comments-status`. The starter theme styles them. To change the
markup, publish the views (`php artisan vendor:publish
--tag=sunrice-views`) and edit them in
`resources/views/vendor/sunrice/components/`: `comments.blade.php`,
`comments/item.blade.php` and `comments/form.blade.php`.

Posting from JavaScript: `POST /sunrice/comments/{entry id}` with `body`,
`parent_id`, `author_name`, `author_email`, `notify_replies`, `_locale`
and the CSRF token, `Accept: application/json`. It answers
`{success: true, status, message, id}` or `{errors}` with `422` (`429`
when the rate limit is hit).

## Emails

- **To moderators:** every new comment, with a link to moderate it, when
  **Email moderators about new comments** is on. It goes to the ticked
  roles' users (or, with none ticked, everyone who can moderate comments)
  and the extra addresses. Moderators' own comments don't send it.
- **To commenters:** when a reply to their comment goes live, if they
  ticked "Email me when someone replies". It's written in the language
  they commented in and ends with a link that stops these emails for that
  comment. Replying to yourself sends nothing.

Both are queued: run a [queue worker](mail.md#queue-worker).

## Settings → Comments

| Setting | Default | What it does |
| --- | --- | --- |
| New comments | Hold a commenter's first comment | `all`: every comment waits for approval. `first_time`: a commenter's comments wait until one of theirs (same email or user) is approved. `none`: comments appear at once. Comments by people who can moderate are always published. |
| Only signed-in users can comment | off | Guests see the thread but not the form. |
| Ask for a captcha | off | Uses the captcha keys set up for [forms](forms.md#captcha). |
| Rate limit | 3 comments a minute | Per visitor (IP). |
| Close comments after | never | Days after the entry's publish date. |
| Reply levels shown | 3 | Replies deeper than this line up at the last level, so threads stay readable on phones. |
| Email moderators about new comments | on | To the ticked roles (none ticked: everyone who can moderate comments) and any extra addresses. |
| Let commenters get an email when someone replies | on | Adds a "Notify me of replies" box to the form; each email has a link to stop them. |

The same keys live under `sunrice.comments` in `config/sunrice.php` as
defaults for new sites; the admin settings override them. Spam is deleted
after `sunrice.comments.prune_spam_after_days` (30) by the daily
`model:prune` schedule; `null` keeps it.

## Permissions

| Permission | Allows |
| --- | --- |
| `sunrice.comments.view` | Seeing comments in the admin. |
| `sunrice.comments.moderate` | Approving, replying to and editing comments, marking spam. |
| `sunrice.comments.delete` | Deleting comments. |

Administrator and Editor have all three.

## Data

Comments are `Sunrice\Models\Comment` rows in `sunrice_comments`: the
entry, `parent_id` (the comment it replies to), the user when signed in
or the guest's `author_name` and `author_email`, the plain-text `body`,
`status` (`pending`, `approved`, `spam`), `locale` and `notify_replies`.
Visitors' IP addresses are stored only as a keyed hash, enough to limit
and spot spam but not to read back. Deleted comments go to the trash
first (soft deletes).

```php
$entry->comments()->approved()->count();
$entry->acceptsComments();          // open for new comments right now
$collection->allowsComments();      // "Allow comments" is on
```
