# Forms

Forms let visitors send you information: a contact message, a quote request, an event registration, a job application with a CV attached. You build the form in the admin, choose what happens after it is sent, and read every submission in one place.

## How forms work

- Each form has a **Title**, a **Handle** (the name the site uses to find it, such as `contact`) and a list of **fields**.
- When a visitor sends the form, Sunrice checks it (required fields, valid email, file types), stores it as a **submission**, and can email it to you.
- Where a form appears on the site, and how it looks, is decided by the site's design.

Forms live in the sidebar under **Structure → Forms**. The list shows each form's **Title**, **Handle** and number of **Submissions**, with **Submissions**, **Edit** and **Delete** buttons.

## Create a form

1. Go to **Structure → Forms** and click **New form**.
2. In the **Details** card, type a **Title** and a **Handle** (lowercase, for example `contact`).
3. Add fields in the **Fields** card (see below).
4. Fill in the **Settings** card (see below).
5. Click **Save form**.

> [!NOTE]
> The handle can't be changed after the form is created, because the site's design refers to it.

### Add and arrange fields

1. In the **Fields** card, open **Add field** and choose a type:
   - **text**: a single line, such as a name or email address.
   - **textarea**: several lines, such as a message.
   - **number**, **date**, **toggle** (a yes/no switch) and **select** (a list of choices).
   - **file**: an upload, such as a CV or a photo.
2. Click the new field to open it, then fill in:
   - **Handle**: the field's internal name, such as `email`.
   - **Label**: what visitors see, such as *Your email*.
   - **Required**: tick it if the form can't be sent without this field.
   - **Instructions**: an optional hint.
   - The **Settings** for the type. A **select** field has **Options**, one per line written as `value|Label`, and **Allow multiple**. A **file** field has **Accepted file types** (tick groups such as images or PDF, or type other extensions) and **Maximum file size** in MB.
3. Drag a field by its handle (the dotted grip) to change the order.
4. Click the bin icon to remove a field.

> [!TIP]
> Removing a field doesn't delete what visitors already sent in it: old submissions still show the value, marked "(removed field)".

### Form settings

- **Notify emails (comma separated)**: addresses that get an email for every submission, for example `office@example.com, sales@example.com`.
- **Success message**: the text visitors see after sending the form. Empty shows a standard "Thank you!" in the visitor's language.
- **Redirect URL (optional)**: send visitors to another page after sending, such as a thank-you page. When set, it is used instead of the success message.
- **Require captcha**: asks visitors to prove they are not a robot. The switch stays greyed out until the captcha is set up on the server.

## View submissions

1. Go to **Structure → Forms** and click the form's title (or its **Submissions** button).
2. The table shows each submission's number, when it was **Submitted**, and a column per field. Long values are shortened.
3. Click a submission to see everything that was sent, plus its language, IP address and browser.
4. For a file field, click **Download** to get the uploaded file. Uploaded files are private: they can only be downloaded from the admin.

### Search submissions

Type in the **Search…** box and press Enter or click **Filter**. It looks through the sent values, so you can find a submission by a name, email address or word in the message.

### Export to CSV

Click **Export CSV** to download all submissions of the form as a spreadsheet file that opens in Excel, Google Sheets or Numbers. The export contains every submission, not only the ones matching your search.

### Delete submissions

Click the bin icon on a row, or **Delete submission** in the submission's window, and confirm.

> [!WARNING]
> Deleting a submission also deletes its uploaded files, and you can't restore it from the admin. Export to CSV first if you need a record.

Deleting a form (**Delete** on the forms list) deletes all its submissions too.

## Spam protection

Every form is protected against automated spam without any setup:

- a hidden "honeypot" field that people can't see but spam robots fill in, so those submissions are refused;
- a limit on how often the same visitor can send the same form in a short time.

For forms that still attract spam, turn on **Require captcha** in the form's settings.

> [!TECHNICAL]
> **Showing a form:** the developer places it in a template with `<x-sunrice::form handle="contact">`, writing the inputs as `data[field_handle]`; the starter `blocks/form.blade.php` block shows a form chosen by handle. See [Blade components](docs:blade-components.md#x-sunriceform).
>
> **Captcha:** set `SUNRICE_CAPTCHA_PROVIDER` (`turnstile`, `recaptcha` or `hcaptcha`), `SUNRICE_CAPTCHA_SITE_KEY` and `SUNRICE_CAPTCHA_SECRET_KEY` in `.env`; see [Forms](docs:forms.md#captcha).
>
> **Emails** are queued, so a queue worker must run ([Mail](docs:mail.md#queue-worker)). The rate limit (`sunrice.forms.rate_limit`, 5 per minute), the upload size limit and automatic deletion of old submissions (`sunrice.forms.prune_after_days`) are set in `config/sunrice.php`. Large uploads may also need higher PHP limits; see [Forms](docs:forms.md#file-uploads).
