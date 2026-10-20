# Terms

**Terms** group entries by topic: *News* and *Events* in a taxonomy called *Categories*, or *Jakarta* and *Bali* in *Places*. Visitors use them to find related content, and entries get them through a **Terms** field. Open **Terms** under Content.

## The terms list

Pick the taxonomy with the menu next to the title, and the language with **Language**. The table shows each term's **Slug**, how many **Entries** have it and when it was **Created**, nested as the terms are: in a taxonomy with nested terms, *Local* can sit under *News*. **Search terms…** finds terms by title or slug.

- **New term**: type the **Title** (the **Slug** is made from it when left empty), choose where it goes under **Under** (or **Top level**), and click **Add term**.
- Click a term's title to open the **term's own page** (below), or to rename it when terms have no pages. The arrow next to it opens the page on the website.
- The **⋯** menu on a row: **Rename** (its title and slug in the language shown, and where it sits), **Edit page** and **Move to trash** (with the terms under it).
- Drag a term by its handle to change its place among its neighbours; the terms under it come along. To put a term under another one, **rename** it and choose **Under**.
- The **⋮** menu next to **New term** lists the collections that use the taxonomy, opens the **Taxonomy settings** and the **Trash**.

Terms that have no title in the language shown appear in grey as *… · not translated*. Rename them in that language to translate them.

## A term's own page

When the taxonomy has term pages on the website (like `/topics/news`), each term's page lists its entries, and you can give it more:

- its own fields, if the taxonomy has any (a description, an image…);
- **Search and sharing**: an SEO title, a description, a share image and *Hide from search engines* (see [SEO](guide:website/seo));
- a **Template**, if your developer made a special design (leave it empty for the taxonomy's own).

Choose the language at the top, edit, and click **Save**. Changes are live straight away: terms have no drafts. **View page** opens the page on the website. **Used by** lists the content that links to this term through its fields.

One person edits a term's page in a language at a time: if a colleague has it open, you can **View only** or **Take over**. If a colleague saved the same term after you opened it, choose **Load theirs** or **Save mine anyway**.

## The trash

**Trash** at the top lists trashed terms. Restore one to bring it back (a term whose parent is still in the trash goes to the top level), or delete it for good: the terms under it move up, and entries lose it. If other content links to the term, the panel names where before you delete it.

## Giving entries their terms

In the entry editor, a **Terms** field lets you pick from its taxonomy: the terms load when the field shows (a long list is searched instead), and you choose one or several, as the field allows. Terms are the same for every language of an entry.

> [!TECHNICAL]
> Taxonomies, their collections, term pages and fields are set up under Structure → Taxonomies. See [Taxonomies and terms](docs:cms/taxonomies).
