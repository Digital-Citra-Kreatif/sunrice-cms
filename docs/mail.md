# Mail (SMTP)

Sunrice sends these emails, all through Laravel's mailer:

- **Form notifications.** A form whose settings list notification
  addresses sends a `FormSubmittedNotification` for every submission.
  It is **queued**.
- **Comment notifications.** Moderators get a `NewCommentNotification`
  for each new comment, and commenters who asked for it a
  `CommentReplyNotification` when a reply to them goes live, in the
  language they commented in (see [Comments](comments.md#emails)). Both
  are **queued**.
- **Admin password resets.** The "Forgot password?" link on the admin
  login page sends a reset link right away (not queued).
- **Login codes.** With [two-factor login](#two-factor-login) on, a
  6-digit code is emailed at every admin login (not queued).

Nothing is Sunrice-specific: configure mail the Laravel way in `.env`.

## SMTP settings

```dotenv
MAIL_MAILER=smtp
MAIL_SCHEME=null          # "smtps" for implicit TLS on port 465
MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_USERNAME=postmaster@example.com
MAIL_PASSWORD=secret
MAIL_FROM_ADDRESS=hello@example.com
MAIL_FROM_NAME="${APP_NAME}"
```

Common providers:

| Provider | Host | Port |
| --- | --- | --- |
| Gmail / Google Workspace (app password) | `smtp.gmail.com` | 587 |
| Microsoft 365 | `smtp.office365.com` | 587 |
| Mailgun | `smtp.mailgun.org` | 587 |
| Amazon SES | `email-smtp.<region>.amazonaws.com` | 587 |
| Postmark | `smtp.postmarkapp.com` | 587 |

Use port 465 with `MAIL_SCHEME=smtps` when the provider only offers
implicit TLS. `MAIL_FROM_ADDRESS` must be an address the provider lets
you send from, or mail is rejected or lands in spam.

After changing `.env` on a server with a cached config, run
`php artisan config:clear` (or `config:cache` again).

## Queue worker

Form notifications are queued. With `QUEUE_CONNECTION=sync` they send
during the request; with `database`, `redis` or another queue, run a
worker or they are never sent:

```bash
php artisan queue:work
```

Keep the worker running with Supervisor, systemd or your host's process
manager, and restart it after each deploy (`php artisan queue:restart`).

## Two-factor login

**Settings → Security → Two-factor login with an emailed code** (off by
default, or `SUNRICE_TWO_FACTOR=true`). When on, a correct password no
longer logs anyone in: a 6-digit code is emailed to the user and must be
entered on the next screen.

- A code is valid for 10 minutes and allows 5 tries; a new one can be
  requested once a minute ("send a new code"). Only the newest code works.
- After 10 wrong codes in 15 minutes the account gets no new codes until
  the 15 minutes pass.
- Only a hash of the code is kept, in the session.

**Set up mail first** and send yourself a test email: if codes can't be
delivered, nobody can log in. If that happens, turn it off on the server:

```bash
php artisan sunrice:two-factor off   # or: on, or no argument for the current state
```

## Testing locally

Use `MAIL_MAILER=log` to write every email to `storage/logs/laravel.log`,
or point SMTP at a local catcher such as Mailpit
(`MAIL_HOST=127.0.0.1`, `MAIL_PORT=1025`).

## Sending a test email

**Settings → Email** shows the mailer, server and from address in use and
has a **Send a test email** box: enter a recipient and press *Send test*.
The message goes out right away; if the mail server refuses it, its error
is shown under the box.

From the server instead:

```bash
php artisan tinker --execute="Mail::raw('It works.', fn (\$m) => \$m->to('you@example.com')->subject('Test'))"
```

## Form notification addresses

Set them per form in the form builder: **Forms → (form) → Settings →
Notify emails**, as a comma-separated list. See [Forms](forms.md).
