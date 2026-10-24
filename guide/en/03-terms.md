# Terms

**Terms** group entries by topic: *News* and *Events* in a taxonomy called *Categories*, or *Jakarta* and *Bali* in *Places*. Visitors use them to find related content, and entries get them in the entry editor's **Taxonomies** card. Each taxonomy has its own item under **Taxonomies** in the sidebar.

## The terms list

Pick the taxonomy with the menu next to the title, and the language with **Language**. The table shows each term's **Slug**, how many **Entries** have it and when it was **Created**, nested as the terms are: in a taxonomy with nested terms, *Local* can sit under *News*. **Search terms…** finds terms by title or slug.

- **New term** opens the term editor (below), empty: type the **Title** (the **Slug** is made from it when left empty), choose where it goes under **Under** (or **Top level**), fill in its fields, and click **Create term**: you stay in the editor of the new term. **Add a term under it** in a row's **⋯** menu starts one there.
- Click a term's title to open it in the same editor, in the language shown. The arrow next to it opens its page on the website, when terms have pages.
- The **⋯** menu on a row: **Edit**, **Add a term under it** and **Move to trash** (with the terms under it).
- Drag a term by its handle to change its place among its neighbours; the terms under it come along. To put a term under another one, open it and choose **Under**.
- The **⋮** menu next to **New term** lists the collections that use the taxonomy and opens the **Taxonomy settings** and, if your role may change blueprints, **Edit blueprint** (the terms' fields). **Trash**, beside the search, shows the trashed terms.

Terms that have no title in the language shown appear in grey as *… · not translated*. Open one and give it a title in that language to translate it.

## The term editor

Everything about a term is edited in one place, new or not:

- **Languages** at the top: each language by its code, a check on those the term has a title in, and a line saying which one you're editing ("Editing: English (main) — switch to edit Bahasa Indonesia"). In a language the term isn't translated into yet, giving it a title there adds it;
- its **Title** and **Slug** in that language. A new slug moves the term's page as soon as you save: a note says the old address will stop working unless a redirect is added (**Add a redirect**, if you may manage redirects);
- **Under**, in a taxonomy with nested terms: where it sits (never under itself or a term under it);
- its own fields: a **Description** to introduce its page, or the fields your developer gave the taxonomy (an image…);
- **SEO**: a meta title, a meta description, an Open Graph image and *Hide from search engines (noindex)* (see [SEO](guide:website/seo));
- **Page settings**: a **Template**, if your developer made a special design (leave it empty for the taxonomy's own).

Click **Save**. Changes are live straight away: terms have no drafts. **View page** opens the page on the website when terms have pages. **Used by** lists the content that links to this term through its fields.

One person edits a term in a language at a time: if a colleague has it open, you can **View only** or **Take over**. If a colleague saved the same term after you opened it, choose **Load theirs** or **Save mine anyway**.

## The trash

**Trash** at the top lists trashed terms. Restore one to bring it back (a term whose parent is still in the trash goes to the top level), or delete it permanently: the terms under it move up, and entries lose it. If other content links to the term, the panel names where before you delete it.

## Giving entries their terms

In the entry editor, the **Taxonomies** card has one picker for each taxonomy of the entry's collection: the chosen terms show as chips you can remove (**×**), and **Choose terms…** (**Choose a term…** where the collection allows only one term) opens a list you can search, with terms under other terms indented. Terms are the same for every language of an entry, and go on the website when the entry is published (see [Entries](guide:website/entries)). A **Terms** field, if your developer added one, is something else: a link to a term (a "featured topic"), filled in like other fields.

> [!TECHNICAL]
> Taxonomies, their collections, term pages and fields are set up under Structure → Taxonomies. See [Taxonomies and terms](docs:cms/taxonomies).
