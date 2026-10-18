// Screenshots for guide/en/translations.md (and guide/id/translations.md).
// Nothing here saves: tabs and menus are only opened.

const card = (title) => `main [data-slot="card"]:has([data-slot="card-title"]:text-is("${title}"))`;
const header = ['main a[aria-label^="Back to"]', 'main h1'];
const tab = (code) => `main [data-slot="tabs-trigger"][id$="-trigger-${code}"]`;
// "Recap: our first open studio evening": its Indonesian translation is still a draft.
const recap = '/cms/collections/articles/entries/18/edit';

const openIndonesian = async (page, h) => {
    await h.click(tab('id'));
    await page.locator('#entry-title').first().waitFor();
};

export default [
    {
        // "Translating an entry", steps 1-5.
        name: 'translations-translate',
        url: recap,
        before: async (page, h) => {
            await openIndonesian(page, h);
            // An unsaved edit, so the save button reads "Save draft".
            await h.fill('main textarea', 'Enam puluh tamu, tiga sesi singkat, dan banyak sekali kopi susu.');
        },
        mark: [
            { selector: tab('id'), label: '1' },
            { selector: 'main p:has-text("Translate the text here")', label: '2' },
            { selector: '#entry-title', label: '3' },
            { selector: `${card('Status')} [data-slot="button"]:has-text("Save")`, label: '4' },
            { selector: 'main button:text-is("Publish")', label: '5' },
        ],
        clip: [...header, card('Status')],
    },
    {
        // "Shared fields": a field that belongs to the main language.
        name: 'translations-shared-field',
        url: recap,
        before: openIndonesian,
        mark: ['main label:has-text("Featured image") :text("Shared with")'],
        clip: ['main label:has-text("Summary")', 'main label:has-text("Body")'],
    },
    {
        // "Draft and Ready": the More actions menu on a translation.
        name: 'translations-more-actions',
        url: recap,
        before: async (page, h) => {
            await openIndonesian(page, h);
            await h.click('main button[aria-label="More actions"]');
        },
        mark: ['[data-slot="dropdown-menu-content"] [role="menuitem"]:has-text("Mark ready")'],
        clip: [...header, '[data-slot="dropdown-menu-content"]', tab('id')],
    },
    {
        // "Who can translate": Maya (Translator) on the main-language tab.
        name: 'translations-translator',
        url: recap,
        as: 'translator',
        mark: ['main :text("You can translate this entry")'],
        clip: [...header, 'main [data-slot="tabs"]', 'main label:has-text("Summary")'],
    },
];
