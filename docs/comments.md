# Comments

Visitors comment on entries and reply to each other; moderators approve, answer and remove comments in the admin.

## Turning comments on

1. **Structure → Collections**: tick **Allow comments** on a collection with a URL.
2. **Settings → Comments** (`cms.settings.comments`): how comments are moderated and protected (below).

An entry can close its own comments (**Accept new comments** in its Page settings); its approved comments stay. All languages of an entry share one thread, and each comment keeps the language it was written in. Entries take comments only while they're live.

## On the site

```blade
<x-sunrice-cms::comments :entry="$entry" />
```

The CMS's plain entry page has it. It lists the approved comments, oldest first, with their replies nested under them, and a form for a new one. Each comment's **Reply** link opens the form under it (`?reply_to=id`, no JavaScript). Guests give a name and an email (never shown); signed-in users comment as themselves. Comments are plain text: line breaks are kept, and web addresses become links with `rel="nofollow ugc"`.

After posting, the visitor comes back to the thread with "Your comment is posted" or "… will appear once it is approved" (`session('sunrice-cms.comment')`); errors are in the `comments` error bag. Posts go to `POST /comments/{entry id}` (`body`, `parent_id`, `author_name`, `author_email`, `notify_replies`, `locale`, the CSRF token and the honeypot); JSON requests get `201 {"message", "status", "id"}` or `422`.

The markup's classes: `sunrice-comments` (`#comments`), `sunrice-comments-list`, `sunrice-comment` (`#comment-{id}`), `sunrice-comment-meta`, `sunrice-comment-body`, `sunrice-comment-reply`, `sunrice-comment-replies`, `sunrice-comment-form` (`#comment-form`) and `sunrice-comments-status`. To change it, publish the CMS's views and edit `comments/thread`, `comments/item` and `comments/form`.

## Settings → Comments

| Setting | Default | |
| --- | --- | --- |
| New comments | Hold a commenter's first comment | Or hold every comment, or publish at once. "First" trusts a commenter once one of theirs is approved: signed-in users by their account; guests by the same name, email and address (its hash) as an approved guest comment, since an email alone proves nothing, so a different name or address is held again. Comments by people who may moderate are always published. |
| Only signed-in users can comment | off | Guests see the thread but not the form. |
| Ask for a captcha | off | The captcha set up for [forms](forms.md#captcha); offered once it's set up. |
| Comments per visitor a minute | 3 | Only comments kept count. More go back to the form with a message and what was typed (`_limit` in the `comments` bag), or `429` for JSON. |
| Close comments after | never | Days after the entry's publish date. |
| Reply levels shown | 3 | Deeper replies line up at the last level. |
| Email moderators about new comments | on | Users with `cms.comments.moderate`, and the extra addresses. |
| Also email roles | none | Everyone with these roles too (`notifyRoles`), one email each; a role deleted later is skipped. |
| Let commenters get an email when someone replies | on | A box on the form. A guest could type anyone's address, so a guest is signed up only when a moderator sees the comment (it's held), or when the comment that earned their trust asked too; with comments published at once, only signed-in users get it. |

Every comment also needs the honeypot. Spam is deleted after `sunrice-cms.comments.prune_spam_after_days` (30) by the daily `model:prune`.

Dates on comments are in the app's time zone (`APP_TIMEZONE`; see [configuration](configuration.md)).

## Emails

- **To moderators**, for a new comment by someone who can't moderate, with a link to the entry's comments in the admin; one email each, so addresses aren't shown to each other (form notifications go the same way). A burst of comments on one entry sends one email: after one, the next comes no sooner than ten minutes later (`PostComment::TELL_EVERY`), and the link shows them all.
- **To commenters** who asked, when a reply to their comment is published (once per reply; not for replying to yourself), in the language they commented in, with a link that stops these emails for that comment. The link (signed, `sunrice.cms.comments.unsubscribe`) opens a page that asks first, with a button that POSTs to the same link (`sunrice.cms.comments.unsubscribe.confirm`), so mail scanners that open links unsubscribe nobody. The page is the site's own `cms/comment-unsubscribe.blade.php` when there is one (the starter templates have one in the site's layout; it gets `$done`, `$action`, `$title`, `$url` and `$locale`), else the CMS's plain page.

Both are queued: run a queue worker.

## Moderating

**Content → Comments** (`cms.comments.view`) lists comments newest first, in tabs: All (pending and approved), Pending, Approved, Spam and Trash, with search over the text, name and email, a collection filter, and an entry filter (`?entry=`, which the entry editor's **Comments** card and Page settings link to; the card also shows the latest five with Approve, Spam and Reply). Each shows the entry, the comment it answers and its language.

- **Approve**, **Unapprove**, **Spam** (`cms.comments.moderate`), one by one or for the selected ones.
- **Reply**: published at once under your name, even when the entry is closed; replying to a held comment approves it.
- **Edit**: fix a typo or remove a link.
- **Move to trash**, **Restore**, **Permanently delete** (`cms.comments.delete`); replies to a deleted comment move up.

## In code

```php
use Sunrice\Cms\Actions\Comments\PostComment;

$comment = app(PostComment::class)->handle($entry, ['body' => 'Hi', 'author_name' => 'Ana', 'author_email' => 'ana@example.com'], $user = null, 'en', $request->ip());
$entry->comments()->approved()->count();
$entry->acceptsComments();
```

Also `SetCommentStatus`, `ReplyToComment`, `EditComment`, `TrashComment` (and `restore()`) and `DeleteComment`. Comments are `Sunrice\Cms\Models\Comment` (`sunrice_comments`): the entry, `parent_id`, `user_id` or the guest's `author_name` and `author_email`, `body`, `status` (`pending`, `approved`, `spam`), `locale` and `notify_replies`. Visitors' IP addresses are kept only as a keyed hash. Deleting an entry permanently deletes its comments.
