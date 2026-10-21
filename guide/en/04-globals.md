# Globals

**Globals** hold what the whole website shares: contact details, social media links, an announcement bar, the footer text. They're grouped in **global sets** (such as *Contact* or *Footer*), each with its own fields. Open **Globals** under Content.

## Editing a set

1. Click a set in the list.
2. Choose the language at the top, if the site has several.
3. Change the fields and click **Save**.

Globals have no drafts: saved values are live on the website straight away, on every page that shows them.

Fields shared by all languages (a phone number, a logo) are edited in the main language and shown greyed out in the others, as in entries.

In another language, a set not saved there yet starts with the main language's values, which the website shows meanwhile: translate them, then save. A field you leave empty shows the main language's value on the website.

If the set says it has no fields, a site manager still has to choose its fields in the set's **Settings** (Content → Globals).

## When someone else is editing

One person edits a set in a language at a time; others can **View only** or **Take over**. If a colleague saved after you opened it, choose **Load theirs** or **Save mine anyway** (see [Working safely](guide:panel/welcome#working-safely)).

> [!TIP]
> Images in globals come from the [media library](guide:panel/media), which lists the set under the image's **Used by**.

> [!TECHNICAL]
> Templates read globals with `Cms::global('contact')`. See [Globals](docs:cms/globals).
