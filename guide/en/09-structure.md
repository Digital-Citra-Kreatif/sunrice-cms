# Structure

**Structure** is where site managers decide what content the website has and how it's organised. Editors rarely need it. Changes here affect everyone's work, so plan them with your team, and with your developer when a change needs a new design (a template).

## Collections

A **collection** is a kind of content: *Pages*, *Blog*, *Products*, *Events*. **Structure → Collections** lists them; **New collection** adds one.

| Setting | |
| --- | --- |
| **Title** | The name editors see. |
| **Handle** | A short code used by templates, like `articles`: lowercase letters, digits and underscores. It can be changed later: roles keep their permissions, but the form warns you about templates and code that name it, which your developer must update. |
| **Blueprint** | The fields its entries have (see below). Changing it keeps what entries already hold. |
| **Other blueprints** | More blueprints an entry may switch to, in its Page settings (a landing page among pages, for example). |
| **Dated entries** | Entries show a date and list newest first, like articles. |
| **Manual order** | Editors put entries in order (**Reorder** in the list) instead of by date or title. |
| **Hierarchical** | Entries may sit under a parent entry, like pages under pages (for breadcrumbs and sub-menus; addresses stay the same). |
| **URL** | Where entries are on the website, with `{slug}` for each entry's slug: `/blog/{slug}`, or `/{slug}` for pages at the top. Empty: entries have no page of their own. |
| **Template** | The design entries use, if your developer made one for it. |
| **Listing page URL**, **Listing page fields**, **Entries per listing page** | A page listing the entries (like `/blog`), its own fields (an introduction), and how many entries it shows per page. |
| **Allow comments** | Visitors may comment on its entries (it needs a URL). |
| **Structured data type** | What search engines are told its entries are (an article, a web page…). |
| **SEO from fields** | Which of the entries' fields fill in an empty SEO title, description and share image. |

Deleting a collection doesn't delete its entries: they leave the panel and the website. The list's **Deleted** filter shows deleted collections, with **Restore** to bring one back.

Each collection gets its own permissions (view, create, edit, publish, delete and export its entries), so a role can be limited to the *Blog*, for example. See [Users and roles](guide:panel/users-roles).

## Blueprints and fieldsets

A **blueprint** is a list of fields: what editors fill in for a collection's entries, a taxonomy's terms, a global set or a form. A **fieldset** is a group of fields used in several blueprints (an address, a call to action). Edit them under **Structure → Blueprints** and **Fieldsets**.

To add a field, choose its type, then set:

- **Label**: what editors see. The **Handle** (how templates read the field) is made from it; renaming a handle later hides values saved under the old one, so ask your developer to rename fields safely. A blueprint's top-level fields can't use the handles the content keeps for itself, and the builder says so as you type: `id`, `title`, `slug`, `url`, `status`, `locale`, `published_at`, `created_at`, `updated_at`, `parent`, `children`, `collection`, `blueprint`, `data`, `seo`, `author`.
- **Instructions**: a hint shown under the field.
- **Required**: the entry can't be saved or published without it.
- **Per language**: **Yes, translated** (each language has its own), **No, shared** (one value for every language), or **As the type decides** (text is translated; numbers, dates, switches and media are shared).
- **Extra rules**: checks for developers, one per line (such as `email`).
- Each type's own settings: the choices of a select, the collections an entries field links to, the types a media field accepts, how many items at most…

The types: **Text**, **Textarea**, **Rich text**, **Number**, **Toggle**, **Select**, **Date**, **Link**, **Media**, **Entries**, **Terms**, **Group** (fields together), **Repeater** (rows of fields), **Flexible content** (blocks of different kinds), **Fieldset** (include a fieldset: its fields are added where it is, with their own handles; to keep them under one name, put it in a **Group**) and **File (forms)** (files visitors send with a form).

Drag the fields into order by their handle (the fields inside a group or repeater among themselves), then click **Save** (or **Create blueprint** for a new one). A blueprint still in use can't be deleted.

## Taxonomies

**Structure → Taxonomies**: a **Title**, a **Handle** (changeable later, as for collections), **Nested terms** (terms under other terms, like subcategories), the **Collections** whose entries it groups, a **Term pages URL** (like `/topics/{slug}`; empty: terms have no pages), **Term fields** (a blueprint for the terms' own fields), a **Template**, and **SEO from fields**. Editors then add the terms under Content → Terms (see [Terms](guide:website/terms)). To let editors give entries terms, add a **Terms** field to the collection's blueprint.

## Global sets

**Structure → Global sets**: a **Title**, a **Handle** and a **Blueprint** for the set's fields. Editors fill them in under Content → Globals (see [Globals](guide:website/globals)).

## Menus

**Structure → Menu settings**: a **Title** and a **Handle** (like `main` or `footer`) that templates use. Editors fill them in under Content → Menus (see [Menus](guide:website/menus)).

## Forms

**Structure → Forms**: a **Title**, a **Handle** (changeable later, as for collections), a **Blueprint** with the form's fields (visitors get the text, textarea, number, toggle, select, date and file ones), and:

- **Email to**: addresses that receive each submission, one per line; **Also email roles**: everyone with these roles too.
- **Thank-you message**: shown after sending; or **After sending, go to** a page of your choice.
- **Sends per visitor a minute** and **Require a captcha**, against spam.

Your developer then puts the form on a page. What visitors send arrives under Content → Submissions (see [Form submissions](guide:website/submissions)).

## Redirects

**Structure → Redirects** lists the redirects made when entries changed address, and takes your own: **From** a path on the site (starting with `/`), **To** a path or a web address, **Moved for good (301)** or **For now (302)**. A live page always wins over a redirect from its address.

> [!TECHNICAL]
> Structure can be exported and imported between sites (`sunrice:export-structure`, `sunrice:import-structure`), and fields renamed safely (`sunrice:rename-field`). See [Structure tools](docs:cms/structure) and [Fields](docs:cms/fields).
