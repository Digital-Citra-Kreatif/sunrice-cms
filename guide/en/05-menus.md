# Menus

**Menus** are the website's navigation: the main menu at the top, the links in the footer, a menu for the side. A site manager creates the menus; editors fill them in under **Menus** in Content.

## Editing a menu

Click a menu to open it. Its links are listed in order, indented to show what's under what.

### Adding links

The buttons above the list add a link to:

- **Entry**: a page, article or other entry. Its label and address follow the entry in each language: rename or move the entry, and the menu follows.
- **Term**: a term's page, such as a category (when the taxonomy has term pages).
- **Listing**: a collection's listing page, such as the blog's.
- **Link**: any web address (`https://…`), a path on the site (`/contact`), an email (`mailto:`) or a phone number (`tel:`).

### Each link

- **Label**: the text shown, per language. For entries, terms and listing pages it's optional (the title is used); a **Link** needs a label in the main language, and other languages use it when they have none.
- **New tab**: opens the link in a new browser tab. Keep it for links to other websites.
- **Move up** and **Move down** change the order.
- **In a level** puts a link under the one above it (a sub-menu); **Out a level** brings it back. Menus go three levels deep.
- **Remove, with what's under it** deletes the link and its sub-links.

Links to entries that aren't on the website (drafts, scheduled, in the trash) are marked **Not on the site**: they stay in the menu, but visitors don't see them until the entry is live.

### Saving

Click **Save**. The whole menu is saved at once, and changes are live straight away.

> [!NOTE]
> Addresses that could run code (such as `javascript:`) are refused. Use `https://`, a path, `mailto:` or `tel:`.

> [!TECHNICAL]
> Menus are created under Structure → Menus, with a handle templates use: `Cms::menu('main')`. See [Menus](docs:cms/menus).
