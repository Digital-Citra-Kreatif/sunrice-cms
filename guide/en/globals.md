# Globals

Globals hold the things that are the same on every page of your site: the site name and tagline, contact details, opening hours, social media links, footer text and so on. You edit them once, in one place, and every page that shows them updates.

## How globals work

- Values are grouped into **global sets**. A set might be *Site* (name, logo, tagline), *Contact* (phone, email, address) or *Footer* (copyright line, footer links).
- Each set uses a **blueprint**, which decides which fields it has. The site manager sets up the blueprint; you fill in the values.
- Each set belongs to a **Group**: **Global** for site-wide values, or **Template part** for header- and footer-style blocks of content. The group only helps keep the list tidy; both are edited the same way.
- Where each value appears on the site is decided by the site's design.

Global sets live in the sidebar under **Structure → Globals**. The page is titled **Globals & template parts** and lists each set's **Title**, **Handle**, **Group** and **Blueprint**.

## Edit global values

1. Go to **Structure → Globals** and click the set's title.
2. Fill in or change the fields in the **Content** card.
3. Click **Save** (or press Ctrl/Cmd + S). When there is nothing left to save, the button reads **Saved**, and the note under the side panel says **All changes saved**.

The change shows on the site straight away, on every page that uses it.

> [!NOTE]
> Only one person can edit a global set's language at a time. If someone else has it open, you are told who, and can view it read-only or take over, as with entries. See [Entries](entries.md).

## Values in each language

On a multilingual site the editor has a tab for each language, with the main language first. A green dot on a tab means that language has its own values.

1. Open the global set and click a language tab.
2. Change the text fields that should differ in this language.
3. Click **Save**. Each language is saved separately.

Some things to know:

- Only **translatable** fields (usually text) can differ per language. Fields shared by all languages, such as images, numbers or a phone number, show **Shared with** and the main language's code, and can only be changed in the main language.
- Text you don't translate keeps following the main language, so the site never shows an empty space.
- Globals have no **Ready** switch: translated text shows on the site as soon as you save it.

> [!WARNING]
> If you switch to another language tab with unsaved changes, you are asked whether to discard them. Save first if you want to keep them.

## Create a global set

Usually the site manager or developer creates global sets, because the site's design has to know about them.

1. Go to **Structure → Globals** and click **New global**.
2. In the **Details** card, type a **Title** (the **Handle** fills in by itself).
3. Choose the **Group**: **Global** or **Template part**.
4. Choose a **Blueprint**. If you need new fields, create a blueprint first (see [Structure](structure.md#blueprints)).
5. Click **Create**. The set opens so you can fill in its values.

If the set's **Content** card says "This blueprint has no fields yet", add fields to its blueprint and come back.

## Change a set's title or blueprint

Open the set and use the **Settings** card on the right: change the **Title** or choose another **Blueprint**, then click **Save**. The card also shows the set's handle.

> [!WARNING]
> Switching to another blueprint changes which fields the set has. Values of fields the new blueprint doesn't have are no longer shown in the editor or on the site, so check with your site manager before you switch.

## Delete a global set

On **Structure → Globals**, click **Delete** next to the set and confirm.

> [!WARNING]
> Deleting a set removes its values, and anything on the site that showed them goes blank. Check with your developer before deleting a set the design uses.

> [!TECHNICAL]
> Templates read a set by handle with `sunrice_global('handle')->field` or `->get('field', 'default')` (also `Sunrice::global('handle')`), in the current language with the main-language fallback. The starter header reads `sunrice_global('site')`; the footer reads template-part globals. Renaming a handle breaks those references. See [Content modeling](docs:content-modeling.md#globals-and-template-parts), [Templates](docs:templates.md#reading-data) and [Multilingual content](docs:multilingual.md#which-fields-are-translatable).
