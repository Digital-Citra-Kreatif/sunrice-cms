# Menus

A **menu** (main, footer…) holds nested links: to an **entry**, which follows the entry's title and address in each language; to a **term's page**, a collection's **listing page** or a taxonomy's **index page**, likewise; or to an **address** (a web address, a path on the site, `mailto:` or `tel:`).

## Setting up and editing

Under **Content → Menus** (`/admin/cms/menus`, permissions `cms.menus.view`, `.create`, `.update`, `.delete`): the menus, each with a title and a handle that templates use (made from the title as you type it; it can be changed later on the menu's **Settings**, `/admin/cms/menus/{handle}/edit`, with a warning: templates that name it need the new one too).

A menu's **Settings** (its title and handle) take `cms.menus.configure` as well as `cms.menus.update`, as templates find a menu by its handle (`Cms::menu('main')`): `cms.menus.update` alone edits the links only. The default `editor` role has `cms.menus.view` and `.update`, not `.configure`, `.create` or `.delete`: editors change what the menus link to, not which menus there are or what they're called. Without `cms.menus.configure` the links page has no **Settings** link, the Settings page and its `PUT /admin/cms/menus/{handle}` answer 403, and AI agents' `save_record` on `menus` is refused (`MenuResource::configures($user)` says whether someone may).

Opening a menu shows its links (`/admin/cms/menus/{handle}/links`, `cms.menus.view` to see, `cms.menus.update` to save): add entries and links, give them labels in each language, open them in a new tab, nest them (three levels) with the indent and outdent buttons, drag them into order among the links of their level by their handle (or with the keyboard: focus the handle, space, arrows, space), and remove them; a link takes what's under it along. The menu is saved as a whole. If someone else saved its links (or an AI agent reordered them) after you opened it, saving says so instead of putting their changes back: **Load theirs**, or **Save mine anyway** over them.

An entry's label is optional: without one, the menu shows the entry's title. In another language, a label in that language wins; without one, an entry, term or listing link shows its target's title in that language when there is one (a live translation, a translated term or a collection's title in that language), else the main language's label, else the main title. A listing link with filters ("For sale") shows the main language's label before the listing's title, since its label says more than the title ("For sale" and "For rent" would both read "Properties"). An address needs a label in the main language; other languages fall back to it. Addresses that could run code (`javascript:`, `data:`…) are refused.

In code: `SaveMenu` replaces a menu's links with a tree:

```php
app(SaveMenu::class)->handle($menu, [
    ['entry_id' => 12, 'children' => [
        ['entry_id' => 15, 'labels' => ['en' => 'Our team', 'id' => 'Tim kami']],
    ]],
    ['url' => 'https://shop.example.com', 'labels' => ['en' => 'Shop'], 'new_tab' => true],
    ['term_id' => $news->id],                         // the term's page
    ['term_id' => $news->id, 'collection_id' => $books->id], // its page in a collection
    ['collection_id' => $blog->id, 'labels' => ['en' => 'Blog']],   // the listing page
    ['taxonomy_id' => $tags->id],                     // the taxonomy's shared index page
    ['taxonomy_id' => $tags->id, 'collection_id' => $books->id], // its index page in a collection
    ['collection_id' => $homes->id, 'query' => 'listing_type=for-sale', 'labels' => ['en' => 'For sale', 'id' => 'Dijual']],
]);
```

Pass the `version` the editor opened as the third argument (`Menu::$version`, counted up each time the links are saved or reordered, `ReorderMenuItems` included): if they changed since, the save is refused with an error on `version` and nothing is replaced. The check and the count up are one statement in the save's transaction, so of two saves from the same version only one gets through. Without a version (code, structure import, "Save mine anyway") the tree is saved over whatever is there.

A term link goes to the term's [usual page](taxonomies.md#term-pages-and-fields); with `collection_id`, to its page in that collection. The editor's *Page* offers **Shared page (all collections)** when its taxonomy has shared term pages and **{collection} only** for each collection whose term pages are on, and the list says which ("Tags · Shared page", "Tags · Books"); the link goes to its page in that collection, which must have term pages for its taxonomy. A listing page's link may carry **filters** (`query`, *Filters* in the editor): a query string added to the listing's address in every language (`/properties?listing_type=for-sale`, `/id/properties?listing_type=for-sale`). The names are those the listing template's [`<x-sunrice-cms::entry-filter>`](site.md#filtering-entries) declares (its `filters`, and `sort`, `page`); a terms filter takes a term's slug in any language, or its id, so one link works in every language. It's kept re-encoded (`city[]=a` as `city%5B0%5D=a`), and only listing links take it.

A taxonomy index link (**Taxonomy index** in the editor: a taxonomy, then its *Page*: **Shared index (all collections)** or **{collection} only**) goes to the taxonomy's [index page](taxonomies.md#index-pages): `taxonomy_id` alone the shared one, with `collection_id` that collection's (`collection_id` alone stays the listing page). The page must be on when the menu is saved; one switched off since is left out on the site, like an entry that's gone. Its label falls back to the taxonomy's title in each language, and the list says which page it is ("Tags · Index page", "Tags · Books index"). `MenuItem::$taxonomy_id` and `->taxonomy()` in code.

## In templates

```blade
<nav>
    @foreach (Cms::menu('main') as $item)
        <a href="{{ $item['url'] }}" @class(['current' => $item['active'], 'open' => $item['active_trail']]) @if ($item['active']) aria-current="page" @endif
            @if ($item['new_tab']) target="_blank" rel="noopener" @endif>{{ $item['label'] }}</a>
        @foreach ($item['children'] as $child) … @endforeach
    @endforeach
</nav>
```

Links come in the current language. `active` is true for the link to the page shown (its address; a link with a query string, like `/properties?type=sale`, only when the address has the same values (a listing link with filters likewise), and then it wins over the link without one, which is on the trail instead), and `active_trail` for it and the links above it, and on an entry's page for the links to its collection's listing page and to its parent entries. Entries, terms, listing pages and index pages that aren't on the site (drafts, scheduled, trashed, without a URL) are left out, with the links under them; so is a term or index link in a collection that's in the trash (never another collection's page or the shared one instead). Deleting a term, a taxonomy or a collection permanently clears every target of the links to it or to its pages (`term_id`, `taxonomy_id`, `collection_id`), so they're left out too, never turned into a link to what's left (a term link in a collection into its listing page). An unknown menu gives an empty list. Menus load once per request.
