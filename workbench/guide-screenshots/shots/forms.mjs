// Screenshots for guide/en/forms.md (and guide/id/forms.md).

const sidebar = '[data-sidebar="sidebar"]';
const card = (title) => `main [data-slot="card"]:has(> * button:text-is("${title}")), main [data-slot="card"]:has([data-slot="card-title"]:text-is("${title}"))`;
const contact = '/cms/forms/1/edit';
const submissions = '/cms/forms/1/submissions';

export default [
    {
        // "Create a form", step 1 (and the forms list).
        name: 'forms-list',
        url: '/cms/forms',
        mark: [
            { selector: `${sidebar} a[href$="/cms/forms"]`, label: '1' },
            { selector: 'main a:has-text("New form")', label: '1' },
        ],
    },
    {
        // "Create a form", steps 2-5: the new form's cards, partly filled in.
        name: 'forms-new-form',
        url: '/cms/forms/create',
        viewport: { width: 1280, height: 1000 },
        before: async (page) => {
            const inputs = page.locator('main input');
            await inputs.nth(0).fill('Quote request');
            await inputs.nth(1).fill('quote');
            await inputs.nth(2).fill('office@example.com, sales@example.com');
            await page.locator('main h1').click();
        },
        mark: [
            { selector: card('Details'), label: '2' },
            { selector: card('Fields'), label: '3' },
            { selector: card('Settings'), label: '4' },
            { selector: 'main button:text-is("Save form")', label: '5' },
        ],
        clip: ['main h1', 'main button:text-is("Save form")', card('Details')],
    },
    {
        // "Add and arrange fields": the Add field choices, an opened field, the grip and the bin.
        name: 'forms-fields',
        url: contact,
        viewport: { width: 1280, height: 1100 },
        before: async (page, h) => {
            await h.click('main button:has-text("Email")');
            await h.click('main [role=combobox]:has-text("Add field")');
        },
        mark: [
            { selector: '[role=listbox]', label: '1' },
            // The opened field: from its title row to its last setting.
            { selector: ['main button:has-text("Email")', 'main [aria-label="Remove Email"]', 'main label:text-is("Instructions") >> xpath=..'], label: '2' },
            { selector: 'main [aria-label="Drag to reorder"] >> nth=2', label: '3' },
            { selector: 'main [aria-label="Remove Subject"]', label: '4' },
        ],
        clip: [card('Fields'), '[role=listbox]'],
    },
    {
        // "View submissions" (and search, export): the submissions table.
        name: 'forms-submissions',
        url: submissions,
        viewport: { width: 1600, height: 800 },
        mark: [
            { selector: 'main thead', label: '2' },
            { selector: 'main tbody tr >> nth=0', label: '3' },
            'main input[placeholder^="Search"]',
            'main button:text-is("Filter")',
            'main a:text-is("Export CSV")',
            'main [aria-label="Delete submission #6"]',
        ],
        clip: 'main',
    },
    {
        // "View submissions", step 3: one submission's window.
        name: 'forms-submission',
        url: submissions,
        before: async (page, h) => {
            await h.click('main tbody tr >> nth=0');
        },
        mark: ['[role=dialog] button:has-text("Delete submission")'],
        clip: '[role=dialog]',
    },
];
