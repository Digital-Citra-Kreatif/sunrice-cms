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
