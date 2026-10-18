# Menus

Menus are the navigation lists on your site, such as the main menu in the header or a list of links in the footer. You build them in the admin from links to entries, listing pages, term pages or any web address, and the site keeps them up to date when pages are renamed or moved.

## How menus work

- A site can have several menus. Each has a **Title** (for you) and a **Handle**, the name the site's design uses to find it (for example `main`).
- A menu holds **items**. Each item links to something and has a label.
- Items can have **sub-items**, one level deep, which usually show as a dropdown.
- Links to entries and terms follow them: if an entry's address changes, the menu link changes too. Items that point to something unpublished or missing are left out on the site.

Menus live in the sidebar under **Structure → Menus**.

## Create a menu

1. Go to **Structure → Menus** and click **New menu**.
2. Type a **Title**, for example *Main navigation*. The **Handle** fills in by itself; change it only if your developer asked for a specific name.
3. Click **Create menu**. The menu opens, empty, ready for items.

> [!TIP]
> The starter site design shows the menu with the handle `main` in the header. Create a menu with that handle and it appears straight away.

## Add an item

1. Open the menu and click **Add item**.
2. In the **Link** card, choose what the item **Links to**:
   - **Entry**: pick a page or article. Only entries that have their own page can be chosen.
   - **Collection archive/listing page**: pick a collection to link to its listing page (for example the blog overview). If the collection has no listing page, a warning says the item stays hidden until one is enabled.
   - **Term page**: pick the taxonomy, then the term.
   - **URL**: type any address, such as `/about` or `https://example.com`.
3. Tick **Open in a new tab** if the link should open in a new browser tab (handy for other websites).
4. In the **Label** card, type the text visitors see. Leave it empty to use the linked page's title.
5. Click **Add item**.

## Add a sub-item

1. In the menu, find the top-level item the sub-item belongs under.
2. Click its **+** button (**Add sub-item**).
3. Fill in the link and label as above, then click **Add item**. The page heading shows "under" the parent item's name.

Sub-items can't have sub-items of their own. To move an item under a different parent, remove it and add it again in the right place.

## Edit, reorder and remove items

- **Edit:** click the item's label or its pencil icon, change it, and click **Save**.
- **Reorder:** use the up and down arrows (**Move up**, **Move down**) to move an item among its neighbours. Sub-items move within their parent.
- **Remove:** click the bin icon on the item (or **Remove item** in the item editor) and confirm.

Each row in the menu shows the label, a badge with the item type, and what it points to. If an entry or term it linked to was deleted, the row reads **Missing target**: edit the item or remove it.

> [!WARNING]
> Removing a top-level item removes its sub-items too.

## Labels in each language

On a multilingual site, the **Label** card has one box per language.

- Type a label in each language you want to control.
- An empty box uses the main language's label, and if that is empty too, the title of the linked page in the visitor's language.

So for links to entries and terms, you can often leave every label empty and let the translated page titles do the work. For **URL** items there is no page title to fall back on, so give them a label.

## Delete a menu

On **Structure → Menus**, click **Delete** next to the menu and confirm. Its items are deleted with it, and the place on the site where the menu was shown becomes empty.

## Where menus appear on the site

Where each menu is shown, and how it looks, is decided by the site's design, not in the menu itself. With the starter design:

- the `main` menu appears in the header, with sub-items as dropdowns on wide screens;
- on small screens the menu folds into a **Menu** button.

Other menus (for example a footer menu) appear wherever your developer placed them. Ask them which handle to use.

> [!TECHNICAL]
> Templates load a menu by handle with `sunrice_menu('main')` (or `Sunrice::menu('main')`), which resolves item URLs for the current language and drops unpublished targets. The starter `partials/header.blade.php` and `partials/menu.blade.php` show nested items. See [Content modeling](docs:content-modeling.md#menus) and [Templates](docs:templates.md#header-and-mobile-menu).
