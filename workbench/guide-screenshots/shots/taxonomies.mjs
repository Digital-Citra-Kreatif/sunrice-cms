// Screenshots for guide/en/taxonomies.md (and guide/id/taxonomies.md).
// The demo's Categories and Tags are flat (not hierarchical), so there is
// no Parent card to show.

const sidebar = '[data-sidebar="sidebar"]';
const card = (title) => `main [data-slot="card"]:has([data-slot="card-title"]:text-is("${title}"))`;
const terms = '/cms/taxonomies/categories/terms';
const news = `${terms}/1/edit`;

export default [
    {
        // "Managing terms" and "Create a term", steps 1-2: the terms list.
        name: 'taxonomies-terms-list',
        url: terms,
        mark: [
            { selector: `${sidebar} a[href$="/taxonomies/categories/terms"]`, label: '1' },
            { selector: 'main a:has-text("New term")', label: '2' },
        ],
    },
    {
        // "Create a term", steps 3-6: the new term form.
        name: 'taxonomies-new-term',
        url: `${terms}/create`,
        before: async (page, h) => {
            await h.fill('#term-title', 'Workshops');
        },
        mark: [
            { selector: '#term-title', label: '3' },
            { selector: 'main textarea', label: '4' },
            { selector: 'main button:has-text("Create term")', label: '6' },
        ],
        clip: ['main h1', card('SEO'), 'main button:has-text("Create term")'],
    },
    {
        // "Edit a term": Save and the saved note.
        name: 'taxonomies-edit-term',
        url: news,
        mark: [
            { selector: card('Content'), label: '2' },
            { selector: 'main button[type=submit]:has-text("Save")', label: '3' },
            'main :text("All changes saved")',
        ],
        clip: ['main h1', card('SEO'), 'main button[type=submit]'],
    },
    {
        // "Translate a term": the ID tab with Title, Slug and Ready.
        name: 'taxonomies-translate',
        url: news,
        before: async (page, h) => {
            await h.click('main [role=tab][id$="trigger-id"]');
            await page.locator('main [role=tab][id$="trigger-id"]').blur();
        },
        mark: [
            { selector: 'main [role=tab][id$="trigger-id"]', label: '1' },
            { selector: '#term-title', label: '2' },
            { selector: 'main label:has([role=switch]), main div:has(> [role=switch]):has-text("Ready")', label: '3' },
            { selector: 'main button[type=submit]:has-text("Save")', label: '4' },
        ],
        clip: ['main h1', card('Content'), 'main button[type=submit]'],
    },
    {
        // "Delete terms": several terms ticked in the list (nothing is deleted).
        name: 'taxonomies-delete-terms',
        url: terms,
        before: async (page, h) => {
            const boxes = page.locator('main tbody [role=checkbox]');
            await boxes.nth(0).click();
            await boxes.nth(2).click();
            await h.waitIdle();
        },
        mark: [
            'main tbody tr:nth-child(1) [role=checkbox]',
            'main tbody tr:nth-child(3) [role=checkbox]',
            'main button:text-is("Delete")',
        ],
        clip: ['main p:has-text("Drag terms")', 'main table'],
    },
    {
        // "Attaching terms to entries": the Taxonomies card with the term picker open.
        name: 'taxonomies-entry-terms',
        url: '/cms/collections/articles/entries/14/edit',
        // Tall enough for the picker to open below the button.
        viewport: { width: 1280, height: 1400 },
        before: async (page, h) => {
            await h.click(`${card('Taxonomies')} button:has-text("Add term")`);
        },
        mark: [
            { selector: `${card('Taxonomies')} [data-slot="card-title"]`, label: '2' },
            { selector: `${card('Taxonomies')} button:has-text("Add term")`, label: '3' },
        ],
        clip: [card('Taxonomies'), '[data-slot="popover-content"]'],
    },
];
