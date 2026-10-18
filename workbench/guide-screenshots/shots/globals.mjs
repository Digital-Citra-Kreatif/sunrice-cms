// Screenshots for guide/en/globals.md (and guide/id/globals.md).

const sidebar = '[data-sidebar="sidebar"]';
const card = (title) => `main [data-slot="card"]:has([data-slot="card-title"]:text-is("${title}"))`;
const company = '/cms/globals/1/edit';
const idTab = 'main [role=tab][id$="trigger-id"]';
const field = (label) => `main [data-slot="form-item"]:has(> label:has-text("${label}")), main div:has(> label[data-slot="label"]:has-text("${label}"))`;

export default [
    {
        // "Edit global values", step 1: Structure → Globals and the set's title.
        name: 'globals-list',
        url: '/cms/globals',
        mark: [
            { selector: `${sidebar} a[href$="/cms/globals"]`, label: '1' },
            { selector: 'main a:text-is("Company")', label: '1' },
        ],
    },
    {
        // "Edit global values", steps 2-3: a changed value and the Save button.
        name: 'globals-edit',
        url: company,
        before: async (page) => {
            await page.locator(`${field('Tagline')} input`).first().fill('Brands and websites with a warm heart, since 2015');
            await page.locator('main h1').click();
        },
        mark: [
            { selector: `${field('Tagline')} input`, label: '2' },
            { selector: 'main button:text-is("Save")', label: '3' },
            'main :text("Unsaved changes")',
        ],
        clip: ['main h1', `${field('Opening hours')}`, card('Settings'), 'main button:text-is("Save")'],
    },
    {
        // "Values in each language": the ID tab, a translatable and a shared field.
        name: 'globals-translate',
        url: company,
        before: async (page, h) => {
            await h.click(idTab);
            await page.locator(idTab).blur();
        },
        mark: [
            { selector: idTab, label: '1' },
            { selector: `${field('Tagline')} input`, label: '2' },
            { selector: 'main button:text-is("Saved")', label: '3' },
            'main label:has-text("Company name") :text("Shared with")',
        ],
        clip: ['main h1', `${field('Phone')}`, card('Settings'), 'main button:text-is("Saved")'],
    },
    {
        // "Create a global set", steps 2-5: the new global set form.
        name: 'globals-new',
        url: '/cms/globals/create',
        before: async (page) => {
            await page.locator(`${card('Details')} input`).first().pressSequentially('Opening hours');
            await page.locator('main h1').click();
        },
        mark: [
            { selector: `${card('Details')} input >> nth=0`, label: '2' },
            { selector: `${field('Group')} [role=combobox]`, label: '3' },
            { selector: `${field('Blueprint')} [role=combobox]`, label: '4' },
            { selector: 'main button[type=submit], main button:text-is("Create")', label: '5' },
        ],
        clip: ['main h1', card('Details'), 'main button:text-is("Create")'],
    },
    {
        // "Change a set's title or blueprint": the Settings card.
        name: 'globals-settings',
        url: company,
        mark: ['#global-title', '#global-blueprint'],
        clip: card('Settings'),
    },
];
