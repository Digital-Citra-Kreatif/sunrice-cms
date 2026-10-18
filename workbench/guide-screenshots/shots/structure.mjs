// Screenshots for guide/en/structure.md (and guide/id/structure.md).

const sidebar = '[data-sidebar="sidebar"]';
const group = (label) => `${sidebar} [data-sidebar="group"]:has([data-sidebar="group-label"]:text-is("${label}"))`;
const card = (title) => `main [data-slot="card"]:has([data-slot="card-title"]:text-is("${title}"))`;

export default [
    {
        // "Collections": the list, and the Manage group in the sidebar.
        name: 'structure-collections',
        url: '/cms/structure/collections',
        // Tall enough for the whole Manage group.
        viewport: { width: 1280, height: 1000 },
        mark: [
            { selector: `${group('Manage')} a[href$="/structure/collections"]` },
            { selector: 'main a:has-text("New collection")' },
        ],
        clip: [`${sidebar} [data-sidebar="header"]`, `${group('Manage')} a[href$="/structure/taxonomies"]`, 'main table', 'main a:has-text("New collection")'],
    },
    {
        // "Basics": the Basics card of Articles, with its taxonomies.
        name: 'structure-collection-basics',
        url: '/cms/structure/collections/2/edit',
        mark: [{ selector: ['main :text("Entries pick terms")', 'main [role=combobox]:has-text("Many terms")'] }],
        clip: card('Basics'),
    },
    {
        // "Listing pages": the Archive/listing page button on the entries list.
        name: 'structure-listing-button',
        url: '/cms/collections/articles/entries',
        mark: ['main a:has-text("Archive/listing page")'],
        clip: ['main h1', 'main a:has-text("New entry")'],
    },
    {
        // "Add and set up fields": an opened field in the Article blueprint, numbered as in the steps.
        name: 'structure-blueprint-fields',
        url: '/cms/structure/blueprints/2/edit',
        before: async (page, h) => {
            await h.click('main button:has-text("Summary")');
        },
        mark: [
            { selector: 'main [role=combobox]:has-text("Add field")', label: '1' },
            { selector: ['main label:text-is("Handle") >> nth=1', 'main input[value="Summary"]'], label: '2' },
            { selector: 'main label:has-text("Required")', label: '3' },
            { selector: ['main [role=switch][id^="translatable"]', 'main label[for^="translatable"]'], label: '4' },
            { selector: 'main [aria-label="Drag to reorder"] >> nth=1', label: '6' },
            { selector: 'main [aria-label="Remove Featured image"]', label: '6' },
        ],
        clip: ['main h1', 'main button:text-is("Save blueprint")', 'main [aria-label="Remove Summary"]'],
    },
    {
        // "Taxonomies": the Categories taxonomy settings.
        name: 'structure-taxonomy',
        url: '/cms/structure/taxonomies/1/edit',
        viewport: { width: 1280, height: 1000 },
        mark: [
            'main label:has-text("Hierarchical")',
            'main :text-is("Collections") >> xpath=..',
            'main label:has-text("Term archive/listing pages")',
        ],
        clip: [card('Basics'), 'main label:has-text("Term archive/listing pages")'],
    },
];
