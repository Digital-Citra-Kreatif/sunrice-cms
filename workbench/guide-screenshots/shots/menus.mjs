// Screenshots for guide/en/menus.md (and guide/id/menus.md).

const sidebar = '[data-sidebar="sidebar"]';
const menu = '/cms/menus/1/edit'; // "Main menu" (handle main)
const item = (id) => `main li a[href$="/items/${id}/edit"]:not([aria-label])`;

export default [
    {
        // "Create a menu", step 1: Structure → Menus and New menu.
        name: 'menus-list',
        url: '/cms/menus',
        mark: [
            { selector: `${sidebar} a[href$="/cms/menus"]`, label: '1' },
            { selector: 'main a:has-text("New menu")', label: '1' },
        ],
    },
    {
        // "Create a menu", steps 2-3: the new menu form.
        name: 'menus-new-menu',
        url: '/cms/menus/create',
        before: async (page) => {
            await page.locator('main input').first().pressSequentially('Footer navigation');
            await page.locator('main h1').click();
        },
        mark: [
            { selector: 'main input >> nth=0', label: '2' },
            { selector: 'main button[type=submit]', label: '3' },
        ],
        clip: ['main h1', 'main [data-slot="card"]', 'main button[type=submit]'],
    },
    {
        // "Add an item", steps 2-5: the item form, with the Links to choices open.
        name: 'menus-add-item',
        url: '/cms/menus/1/items/create',
        before: async (page, h) => {
            await h.click('#item-type');
        },
        mark: [
            { selector: '[role=listbox]', label: '2' },
            { selector: 'main label:has([role=checkbox])', label: '3' },
            { selector: 'main [data-slot="card"]:has([data-slot="card-title"]:text-is("Label"))', label: '4' },
            { selector: 'main button[type=submit]', label: '5' },
        ],
        clip: ['main h1', 'main [data-slot="card"]:has([data-slot="card-title"]:text-is("Label"))', 'main button[type=submit]'],
    },
    {
        // "Add a sub-item", steps 1-2: the parent item and its + button.
        name: 'menus-add-sub-item',
        url: menu,
        mark: [
            { selector: item(2), label: '1' },
            { selector: 'main a[aria-label="Add sub-item"][href$="parent=2"]', label: '2' },
        ],
        clip: 'main ul',
    },
    {
        // "Edit, reorder and remove items": the buttons on a row.
        name: 'menus-edit-items',
        url: menu,
        mark: [
            'main a[aria-label="Edit"][href$="/items/4/edit"]',
            'main li:has(a[href$="/items/4/edit"]:not([aria-label])) [aria-label="Move up"]',
            'main li:has(a[href$="/items/4/edit"]:not([aria-label])) [aria-label="Move down"]',
            'main li:has(a[href$="/items/4/edit"]:not([aria-label])) [aria-label="Remove"]',
        ],
        clip: 'main ul',
    },
];
