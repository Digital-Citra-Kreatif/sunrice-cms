# Taxonomies and terms

Taxonomies let you group entries by topic. A **taxonomy** is a kind of grouping, such as *Categories* or *Tags*, and its **terms** are the individual values, such as *News*, *Events* or *Recipes*. You tag an entry with terms, and visitors can browse every entry that shares a term.

## How taxonomies work

- Each taxonomy appears in the sidebar under **Taxonomies**, with its own list of terms.
- A taxonomy is attached to one or more collections. Entries in those collections get a **Taxonomies** card in the editor where you pick terms.
- A taxonomy can be **hierarchical**: terms can sit under a parent term (for example *Asia* under *Travel*). Tags are usually flat; categories are often hierarchical.
- Each term has a title and a slug (the part of the web address) in every language of the site.

Creating a taxonomy and choosing which collections use it is a site manager's job; see [Structure](structure.md#taxonomies).

## Managing terms

Open a taxonomy from the sidebar under **Taxonomies**. The list shows each term's **Title**, **Slug**, **Entries** (how many entries use it), **Created** date and, on multilingual sites, **Languages**. Hierarchical taxonomies also show a **Parent** column, and child terms are indented under their parent.

Use **Search terms…** to find a term by title or slug. On hierarchical taxonomies the **Parent** filter shows only the children of one term, or **Top level only**. On multilingual sites the **Missing language** filter lists terms without a version in a given language.

### Create a term

1. In the sidebar, under **Taxonomies**, click the taxonomy.
2. Click **New term**.
3. Type a **Title**. Leave **Slug** empty to have it generated from the title.
4. Fill in any extra fields the taxonomy has (such as a description or image).
5. On a hierarchical taxonomy, choose a parent in the **Parent** card, or keep **None (top level)**.
6. Click **Create term**.

### Edit a term

1. Click the term in the list.
2. Change what you need.
3. Click **Save** (or press Ctrl/Cmd + S). The note at the bottom right says **Unsaved changes** or **All changes saved**.

If the taxonomy has term pages, the editor also shows an **SEO** card (how the term's page looks in search results and social shares) and a **View page** button that opens the page on the site.

> [!NOTE]
> Only one person can edit a term at a time. If someone else already has it open, you are told who, and can view it read-only or take over. This works the same way as for entries; see [Entries](entries.md).

### Nest terms (parent and child)

On a hierarchical taxonomy, open the child term, pick its parent in the **Parent** card, and click **Save**. A term can't be placed under itself or under one of its own children.

### Reorder terms

When the list is not searched, filtered or sorted, a note reads "Drag terms to set their order." Drag a term up or down to move it among its siblings. To move a term to another parent, change its **Parent** in the editor instead.

### Translate a term

On a multilingual site, the term editor has a tab for each language (the main language first).

1. Open the term and click a language tab.
2. Type the **Title** and, if you like, the **Slug** in that language. Leave the title empty to show the main language's version.
3. Turn **Ready** on when the translation should appear on the site. While it is off, visitors see the main-language version.
4. Click **Save**.

A green dot on a tab means that language is translated and ready; an amber dot means it exists but isn't ready yet. See [Translations](translations.md) for more about languages.

### Delete terms

- One term: open it and click the bin icon (**Delete term**), then confirm.
- Several terms: tick their checkboxes in the list, then click **Delete** next to "*n* selected" and confirm.

> [!WARNING]
> Deleting a term removes it from every entry that used it, and on hierarchical taxonomies its child terms are deleted too. There is no Trash for terms in the admin, so you can't restore them yourself. Check the **Entries** count before you delete.

## Attaching terms to entries

1. Open the entry.
2. In the **Taxonomies** card on the right, find the taxonomy (for example **Categories**).
3. Click **Add term…**, search, and pick a term. Repeat for more terms.
4. Save or publish the entry as usual.

If a taxonomy is marked **(one)**, an entry can have only one of its terms; the button then reads **Change term…**. Terms can't be created from the entry editor: create them in the taxonomy first. The terms an entry has are the same in every language.

## Term pages on the site

If the site manager turned on term pages for a taxonomy, each term gets its own page listing the entries tagged with it, for example `/blog/category/news`. The terms list shows a small link icon next to each term (**Visit term page**) to open it.

A term's page shows its title in the visitor's language once that translation is **Ready**, and the main language otherwise.

> [!TECHNICAL]
> Term pages are switched on per taxonomy under **Term pages** (**Term archive/listing pages**) with a URL pattern such as `{collection}/{taxonomy}/{slug}`. The page is rendered by a Blade template (default `sunrice.taxonomies.{handle}.show`, then `sunrice.taxonomies.show`); a term's **Template** card can override it. Templates read terms with `$entry->terms` or list them with `<x-sunrice::terms>`. See [Content modeling](docs:content-modeling.md#taxonomies) and [Blade components](docs:blade-components.md#x-sunriceterms).
