# Comments

Visitors can comment on entries and reply to each other. Moderators approve, answer and remove comments under **Comments** in Content.

Comments are switched on per collection by a site manager (Structure → Collections, *Allow comments*), and the rules (who may comment, whether comments wait for approval) are in **Settings → Comments** (see [The website's settings](guide:website/settings#comments)).

## Moderating

The tabs sort comments by state: **All** (waiting and approved), **Pending** (waiting for approval), **Approved**, **Spam** and **Trash**. Search the text, the name or the email, or filter by collection or by entry. Each comment shows its entry, the comment it answers (if it's a reply) and its language.

For each comment:

- **Approve** shows it on the website; **Unapprove** hides it again.
- **Spam** moves it to the Spam tab. Spam is deleted automatically after a while.
- **Reply** answers it, published at once under your name. Replying to a waiting comment approves it.
- **Edit** fixes a typo or removes a link.
- **Move to trash** moves it to the Trash tab, where **Restore** brings it back and **Permanently delete** removes it; this can't be undone. Replies to a deleted comment stay, moved up a level.

Tick several comments to approve, mark as spam or trash them together.

## Closing comments on one entry

In the entry editor, **Page settings → Accept new comments** closes or opens that entry's comments. Approved comments stay visible; visitors just can't add new ones. Its **Comments** link opens the moderation list for that entry. The editor's **Comments** card also shows the entry's latest comments, with **Approve**, **Spam** and **Reply**. Comments can also close by themselves some days after publishing, if Settings → Comments says so.

## Emails

Moderators get an email about each new comment, with a link to it. Commenters who asked get an email when someone replies to them, with a link to stop these emails.

> [!TIP]
> A commenter's first comment usually waits for approval; once you approve one, their next comments appear straight away. Comments by moderators always appear at once.

> [!TECHNICAL]
> Templates show comments with `<x-sunrice-cms::comments :entry="$entry" />`. See [Comments](docs:cms/comments).
