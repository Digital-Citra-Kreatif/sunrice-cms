# Menus

A **menu** (main, footer…) holds nested links: to an **entry**, which follows the entry's title and address in each language; to a **term's page** or a collection's **listing page**, likewise; or to an **address** (a web address, a path on the site, `mailto:` or `tel:`).

## Setting up and editing

Under **Structure → Menu settings** (permissions `cms.menus.view`, `.create`, `.update`, `.delete`): a title and a handle that templates use (made from the title as you type it; it can be changed later, with a warning: templates that name it need the new one too).

Under **Content → Menus** (`cms.menus.view` to see, `cms.menus.update` to save): add entries and links, give them labels in each language, open them in a new tab, nest them (three levels) with the indent and outdent buttons, drag them into order among the links of their level by their handle (or with the keyboard: focus the handle, space, arrows, space), and remove them; a link takes what's under it along. The menu is saved as a whole.

An entry's label is optional: without one, the menu shows the entry's title. An address needs a label in the main language; other languages fall back to it. Addresses that could run code (`javascript:`, `data:`…) are refused.

In code: `SaveMenu` replaces a menu's links with a tree:

```php
app(SaveMenu::class)->handle($menu, [
    ['entry_id' => 12, 'children' => [
        ['entry_id' => 15, 'labels' => ['en' => 'Our team', 'id' => 'Tim kami']],
    ]],
    ['url' => 'https://shop.example.com', 'labels' => ['en' => 'Shop'], 'new_tab' => true],
    ['term_id' => $news->id],                         // the term's page
    ['collection_id' => $blog->id, 'labels' => ['en' => 'Blog']],   // the listing page
    ['collection_id' => $homes->id, 'query' => 'listing_type=for-sale', 'labels' => ['en' => 'For sale', 'id' => 'Dijual']],
]);
```

A listing page's link may carry **filters** (`query`, *Filters* in the editor): a query string added to the listing's address in every language (`/properties?listing_type=for-sale`, `/id/properties?listing_type=for-sale`). The names are those the listing template's [`<x-sunrice-cms::entry-filter>`](site.md#filtering-entries) declares (its `filters`, and `sort`, `page`); a terms filter takes a term's slug in any language, or its id, so one link works in every language. It's kept re-encoded (`city[]=a` as `city%5B0%5D=a`), and only listing links take it.

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

Links come in the current language. `active` is true for the link to the page shown (its address; a link with a query string, like `/properties?type=sale`, only when the address has the same values (a listing link with filters likewise), and then it wins over the link without one, which is on the trail instead), and `active_trail` for it and the links above it, and on an entry's page for the links to its collection's listing page and to its parent entries. Entries, terms and listing pages that aren't on the site (drafts, scheduled, trashed, without a URL) are left out, with the links under them. An unknown menu gives an empty list. Menus load once per request.
