# Forms

**Forms** take messages from visitors: a contact form, a quote request, a sign-up. A form's fields come from a blueprint; what visitors send is kept as **submissions**, emailed to the addresses you choose and exported as CSV.

## Setting up

1. Make a blueprint with the form's fields (Structure → Blueprints). Visitors get the `text`, `textarea`, `number`, `toggle`, `select`, `date` and `file` fields; fields of other types are left out of the form. Required fields and extra validation rules (like `email`) apply as for entries. A text field with the `email` rule, or with the handle `email`, is an email input, and the notification's replies go to it.
2. Under **Structure → Forms** (permissions `cms.forms.view`, `.create`, `.update`, `.delete`), add a form: a title, a handle that templates use (it can be changed later, with a warning: templates need the new one, roles keep their permissions), the blueprint, the addresses to email (one per line, at most 10) and roles whose members are emailed too (**Also email roles**), a thank-you message (and **Thank-you message in …** for each other language; empty there: the site's own words in that language, `sunrice-cms::site.forms.thanks`, or the message when the CMS has none in it), and optionally a page to go to once it's sent (**After sending, go to**), how often one visitor may send it (**Sends per visitor a minute**), and whether it needs a [captcha](#captcha).

## On the site

```blade
<x-sunrice-cms::form handle="contact" />
<x-sunrice-cms::form handle="contact" submit="Send message" class="contact-form" />
```

Empty, the component prints the form with its labels, help texts and select options in the page's language (the fields' `translations`, **In other languages** in the blueprint builder: see [field definitions](fields.md#field-definitions); else as written), and errors (each tied to its input with `aria-describedby` and `aria-invalid`), the CSRF token and the honeypot, the [captcha](#captcha) when the form asks for one, and the thank-you message once it's sent. Other attributes go on the `<form>`. It has no styles of its own: style it from your stylesheet, or publish the CMS's views to change its markup. Nothing is printed for an unknown handle.

| Attribute | |
| --- | --- |
| `handle` | The form's handle (required). |
| `submit` | The button's text when it prints the fields (`Send`). |
| `replace` | Once it's sent, the thank-you message (`<p role="status" id="form-{handle}">`) takes the form's place; without it, the message shows above the form. |

### Your own markup

With a slot, the markup inside the `<form>` is yours; the component still adds the `<form>` itself, the CSRF token, the honeypot and two hidden inputs (`locale`, and `_form`, which tells this form's old input from another's). Name the inputs `data[handle]` and use the component's methods:

```blade
<x-sunrice-cms::form handle="contact" class="stack" replace>
    <label for="contact-email">Email</label>
    <input id="contact-email" type="email" name="data[email]" value="{{ $component->old('email') }}"
        @if ($component->error('email')) aria-invalid="true" aria-describedby="contact-email-error" @endif>
    @if ($message = $component->error('email'))
        <p id="contact-email-error" role="alert">{{ $message }}</p>
    @endif

    <label for="contact-message">Message</label>
    <textarea id="contact-message" name="data[message]">{{ $component->old('message') }}</textarea>

    {{ $component->captcha() }}
    @if ($message = $component->captchaError()) <p role="alert">{{ $message }}</p> @endif

    <button>Send</button>
</x-sunrice-cms::form>
```

- `$component->old('email', $default)`: what the field was sent with when the form came back with errors, for this form only (two forms with an `email` field don't refill each other).
- `$component->error('email')`: this form's first error for the field, or null; `failed()` whether it has any (for a summary); `captchaError()` the captcha's.
- `$component->success()`: the thank-you message right after it was sent, or null (the component prints it already; use it to show something else).
- `$component->captcha()`: the captcha widget and its script when the form asks for one, else null. With your own markup, print it yourself.
- `$component->submitted()`: whether the page comes right after this form was sent back with errors. `$component->form` is the `Form` model (`->schema()->fields()` lists its fields).

Fields the form's blueprint doesn't have are ignored; a toggle needs a hidden `0` before its checkbox to send "off"; a select with several choices is `data[topics][]`; a file field needs the form to send `multipart/form-data` (the component adds it when the form has one).

Forms post to `POST /forms/{handle}` (route `sunrice.cms.forms.submit`), the fields as `data[handle]` (or by handle, as in older templates). After sending, visitors go back to the page they were on, with the thank-you message in the session (`session('sunrice-cms.form.contact')`); errors are in the form's own error bag (`$errors->contact`), so two forms on a page don't mix them up.

### Submitting without a page reload

Requests that ask for JSON (`Accept: application/json`) get JSON instead of a redirect. Send what the form holds, the CSRF token included (the `_token` input, or an `X-CSRF-TOKEN` header) along with the honeypot fields:

```js
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const response = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
    const body = await response.json().catch(() => ({}));
    if (response.status === 201) {
        body.redirect_url ? (location.href = body.redirect_url) : form.replaceWith(Object.assign(document.createElement('p'), { role: 'status', textContent: body.message }));
    } else if (response.status === 422) {
        // body.errors: { email: ['The Email field must be a valid email address.'], _captcha: [...] }
    }
});
```

| Status | Body | |
| --- | --- | --- |
| `201` | `{"message": "Thanks!", "redirect_url": "/thanks" \| null}` | Kept (and emailed). `redirect_url` is the form's **After sending, go to**. |
| `422` | `{"message": "…", "errors": {"email": ["…"], "_captcha": ["…"]}}` | Not kept. Errors are keyed by field handle (no `data.`); `_captcha` for the captcha. |
| `429` | | Too many sends from this address this minute. |
| `419` | | The CSRF token is missing or stale (the page was open too long): reload it. |
| `200`, empty | | The honeypot caught it (fields missing, the trap filled in, or sent too fast); nothing is kept. |

### Files

A **File (forms)** field takes one file per field. Its settings: **Accepted file types** (extensions, like `pdf, jpg, docx`; checked against the name and the content) and **Largest file** (KB; empty: `sunrice-cms.forms.upload_max_kb`, 10 MB). Files that could run as code (`.php`, `.html`, `.svg`, `.js`, `.exe` …) are always refused. PHP's own `upload_max_filesize` and `post_max_size` (and your web server's body limit) apply too.

Files are kept on the private disk `sunrice-cms.forms.upload_disk` (`local`, `SUNRICE_FORMS_DISK`) under `form-uploads/{handle}` with names of their own, never served to the public: people with `cms.submissions.view` download them from the submission. The submission keeps `{path, name, size, mime}`; the email and CSV show the name. Deleting a submission deletes its files. Entries don't use this field: use a media field.

### Captcha

A form can ask visitors to pass Cloudflare Turnstile (the default), Google reCAPTCHA (v2) or hCaptcha. Add the provider's keys to `.env` (the panel's `sunrice-admin.captcha` config):

```dotenv
SUNRICE_CAPTCHA_PROVIDER=turnstile   # or recaptcha, hcaptcha
SUNRICE_CAPTCHA_SITE_KEY=…
SUNRICE_CAPTCHA_SECRET_KEY=…
```

then turn on **Require a captcha** on the form (it stays off until both keys are set). The component prints the widget and the provider's script (with your own markup, `{{ $component->captcha() }}`); the answer is checked before anything else, and a missing or wrong one comes back as the `_captcha` error ("Please confirm you're not a robot …"; `422` with JSON). When the provider can't be reached, the form is refused, not let through. Without the keys, no form asks for it.

Plugins use the same captcha: `app(\Sunrice\Admin\Security\Captcha::class)->widget()` and `->passes($request)`. Turnstile's test keys (site `1x00000000000000000000AA`, secret `1x0000000000000000000000000000000AA`) always pass.

### Spam

- Every form post must carry the honeypot fields ([spatie/laravel-honeypot](https://github.com/spatie/laravel-honeypot), which the component prints). Bots that fill in the hidden field, send too fast or leave the fields out get an empty page and nothing is kept. Configure it with the package's `honeypot` config.
- One visitor (IP address) may send a form 5 times a minute (`sunrice-cms.forms.per_minute`, or the form's own setting); more get `429`.
- A [captcha](#captcha), for forms that ask for it.
- Errors come in the language of the page the form was sent from (its `locale` input), naming each field by its label in that language: "Nama Anda wajib diisi." The CMS brings Indonesian for Laravel's validation lines (see [the site's words](site.md#the-sites-words)); add `lang/{locale}/validation.php` for other languages.

### After sending

Visitors go back to the page they were on, or to the form's **After sending, go to** page, with the thank-you message in the session, in the language the form was sent from (`$form->successMessage($locale)`). JSON requests get `201 {"message": "…", "redirect_url": "/thanks" | null}` ([more](#submitting-without-a-page-reload)).

## Submissions

Under **Content → Submissions** (`cms.submissions.view`): each form's submissions, newest first (the CSV's and the emails' dates in the app's time zone, `APP_TIMEZONE`); open one to read all of it, with who sent it (IP address, browser and the page it was sent from). **Export CSV** (`cms.submissions.export`, or `cms.submissions.{form}.export`) downloads them all, a column per field, then `IP address`, `User agent` and `Referrer`, with values spreadsheets would run as formulas escaped. Exports are recorded in the security log. `cms.submissions.delete` deletes them for good.

The notification email lists the fields with their labels. It goes to the form's addresses and to everyone with one of its roles, one email each (an address that's both gets one). It's queued, so it's sent by your queue worker when the app has a queue, and right away when it doesn't.

In code:

```php
use Sunrice\Cms\Actions\Forms\SubmitForm;
use Sunrice\Cms\Models\Form;

$submission = app(SubmitForm::class)->handle(Form::query()->where('handle', 'contact')->sole(), $request->all(), 'en', $request->ip(), $request->userAgent(), $request->headers->get('referer'));
$submission->data;   // the values by field handle
```

`SubmitForm` validates against the form's fields (throwing a `ValidationException` keyed by field handle), ignores anything else that was sent, keeps the submission and emails it. `DeleteSubmission` deletes one.

### Who sent it, and personal data

Each submission keeps the sender's IP address, user agent (their browser) and referrer (the page they sent it from, when the browser says), to tell spam and abuse apart (`Submission::$ip_address`, `$user_agent`, `$referrer`). These, like what visitors type, are personal data under the GDPR and similar laws: say so in your privacy notice, give a reason for keeping them (a legitimate interest in preventing abuse, usually), and keep them no longer than needed (see below). `SUNRICE_FORMS_VISITOR_DETAILS=false` (`sunrice-cms.forms.visitor_details`) keeps none of them; submissions already kept keep theirs until deleted or pruned.

### Keeping submissions

`SUNRICE_FORMS_PRUNE_DAYS=90` (`sunrice-cms.forms.prune_after_days`) deletes submissions older than that, with their files, every day (Laravel's scheduler runs `model:prune` for them; add `* * * * * php artisan schedule:run` to cron). Empty keeps them forever.
