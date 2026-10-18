// Screenshots for guide/en/media.md (and guide/id/media.md).
// Nothing here saves or uploads: folders and files are only opened, ticked or hovered.

const card = (title) => `main [data-slot="card"]:has([data-slot="card-title"]:text-is("${title}"))`;
const folder = (name) => `main button:text-is("${name}")`;
const dialog = '[role="dialog"]';
// "Brand colours" (colours.jpg), used by an article in both languages.
const colours = '/cms/assets/9/edit';

export default [
    {
        // "The asset library": what the screen looks like.
        name: 'media-library',
        url: '/cms/assets',
    },
    {
        // "Uploading files", steps 1-2.
        name: 'media-upload',
        url: '/cms/assets',
        before: async (page, h) => {
            await h.click(folder('Blog'));
        },
        mark: [
            { selector: folder('Blog'), label: '1' },
            { selector: 'main button:text-is("Upload")', label: '2' },
        ],
        clip: ['main a[aria-label="New folder"]', 'main button:text-is("Upload")', 'main input[aria-label^="Select"] >> nth=5'],
    },
    {
        // "Folders": New folder, and Rename / Delete on a hovered folder.
        name: 'media-folders',
        url: '/cms/assets',
        before: async (page, h) => {
            await h.hover(folder('Blog'));
        },
        mark: [
            'main a[aria-label="New folder"]',
            'main a[aria-label="Rename folder"]:visible',
            'main button[aria-label="Delete folder"]:visible',
        ],
        clip: { x: 281, y: 97, width: 230, height: 170 },
        padding: 0,
    },
    {
        // "Folders": the New folder form.
        name: 'media-new-folder',
        url: '/cms/asset-folders/create',
        before: async (page, h) => {
            await h.fill('#folder-name', 'Events');
        },
        mark: ['#folder-name', '#folder-parent', 'main button:text-is("Create folder")'],
        clip: ['main a[aria-label="Back to assets"]', 'main [data-slot="card"]'],
    },
    {
        // "Editing an asset", steps 1-2.
        name: 'media-edit',
        url: colours,
        mark: [
            { selector: card('Details'), label: '1' },
            { selector: 'main button:text-is("Save")', label: '2' },
        ],
        clip: ['main a[aria-label="Back to assets"]', card('Details'), card('Used by')],
    },
    {
        // "Replacing a file", step 1.
        name: 'media-replace',
        url: colours,
        mark: [{ selector: 'main button:text-is("Replace file")', label: '1' }],
        clip: card('Preview'),
    },
    {
        // "Trash and restore": two files ticked.
        name: 'media-trash',
        url: '/cms/assets',
        before: async (page, h) => {
            await page.locator('main input[aria-label="Select microcopy.jpg"]').check();
            await page.locator('main input[aria-label="Select award.jpg"]').check();
            await h.waitIdle();
        },
        mark: ['main button:has-text("Trash")'],
        clip: ['main input[aria-label="Search assets…"]', 'main button:text-is("Upload")', 'main input[aria-label="Select sprint.jpg"]'],
    },
    {
        // "Picking assets in fields", steps 2-4, in a new article's Featured image field.
        name: 'media-picker',
        url: '/cms/collections/articles/entries/create',
        before: async (page, h) => {
            await h.click('main button:has-text("Choose asset")');
            await page.locator(`${dialog} button:has-text("colours.jpg")`).waitFor();
            await h.click(`${dialog} button:has-text("colours.jpg")`);
        },
        mark: [
            { selector: `${dialog} input[placeholder^="Search"]`, label: '2' },
            { selector: `${dialog} button:has-text("colours.jpg")`, label: '3' },
            { selector: `${dialog} button:text-is("Select")`, label: '4' },
        ],
        clip: dialog,
    },
];
