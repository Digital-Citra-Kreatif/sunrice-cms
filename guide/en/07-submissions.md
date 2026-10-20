# Form submissions

The website's forms (a contact form, a quote request, a sign-up) send what visitors type to {panel}. Each message is a **submission**, kept under **Submissions** in Content and emailed to the people chosen for the form.

## Reading submissions

Pick the form with the menu next to the title (it shows how many each has). The list shows when each submission was **Sent**, the newest first, and the form's first fields.

Click the date to open a submission:

- every field the visitor filled in;
- files they sent, as download links;
- the language of the page they used;
- if your site keeps them: the visitor's **IP address**, **Browser** and the page they **Sent from**.

**Delete** removes a submission (and its files) for good. **Export CSV** downloads every submission of the form for a spreadsheet; it needs its own permission, besides reading them.

You see only the forms your role allows.

## Email notifications

Each new submission is emailed to the addresses and roles set for the form. Reply to the email to answer the visitor: replies go to the email address they typed, when the form asks for one.

## Personal data

Submissions hold personal details. Read them only as your work requires, don't forward them more widely than needed, and delete what you no longer need. Your site may delete old submissions automatically after a set number of days.

> [!TECHNICAL]
> Forms are created under Structure → Forms with a blueprint for their fields, and put on a page with `<x-sunrice-cms::form handle="contact" />`. Keeping visitor details is `sunrice-cms.forms.visitor_details`, and pruning `sunrice-cms.forms.prune_after_days`. See [Forms](docs:cms/forms).
