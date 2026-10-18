// Screenshots for guide/en/entries.md (and guide/id/entries.md).
// Nothing here saves: menus and dialogs are only opened, fields only typed into.

const card = (title) => `main [data-slot="card"]:has([data-slot="card-title"]:text-is("${title}"))`;
// The Revisions title has an icon, so match it loosely.
const revisions = 'main [data-slot="card"]:has([data-slot="card-title"]:has-text("Revisions"))';
// The page title with its back arrow (the h1 alone cuts off the arrow).
const header = ['main a[aria-label^="Back to"]', 'main h1'];
const articles = '/cms/collections/articles/entries';
// "A practical guide to choosing brand colours": published, with unpublished changes.
const colours = `${articles}/12/edit`;

export default [
    {
        // "The entries list": what the screen looks like.
        name: 'entries-list',
        url: articles,
    },
    {
        // "Bulk actions": two entries ticked, the action bar showing.
        name: 'entries-bulk-actions',
        url: articles,
        before: async (page, h) => {
            await page.locator('main button[aria-label="Select row"]').nth(1).click();
            await page.locator('main button[aria-label="Select row"]').nth(2).click();
            await h.waitIdle();
        },
        clip: ['main input[aria-label="Search"]', 'main tbody tr:nth-child(4)'],
    },
    {
        // "Manual order": the team members list with its drag handles.
        name: 'entries-manual-order',
        url: '/cms/collections/team/entries',
        mark: ['main tbody tr:first-child td:first-child'],
        clip: ['main h1', 'main [data-slot="card"]'],
    },
    {
        // "Creating an entry", steps 2-5.
        name: 'entries-create',
        url: `${articles}/create`,
        before: async (page, h) => {
            await h.fill('#entry-title', 'Meet Kopi, our new studio dog');
            await h.fill('main textarea', 'Say hello to the newest member of the team.');
        },
        mark: [
            { selector: '#entry-title', label: '2' },
            { selector: `${card('Status')} [data-slot="select-trigger"]`, label: '3' },
            { selector: 'main textarea', label: '4' },
            { selector: 'main button:has-text("Create draft")', label: '5' },
        ],
        clip: [...header, card('Status'), 'main textarea'],
    },
    {
        // "Drafts and live content" / "Publishing and scheduling": the header and the Status card.
        name: 'entries-status',
        url: colours,
        mark: [
            'main [data-slot="badge"]:has-text("Unpublished changes")',
            'main button:text-is("Publish")',
            `${card('Status')} #publish-at`,
            `${card('Status')} button:has-text("Unpublish")`,
        ],
        clip: [...header, card('Status')],
    },
    {
        // "More actions": the ⋯ menu.
        name: 'entries-more-actions',
        url: colours,
        before: async (page, h) => {
            await h.click('main button[aria-label="More actions"]');
        },
        clip: [...header, '[data-slot="dropdown-menu-content"]'],
    },
    {
        // "Trash, restore and delete": the Trash filter.
        name: 'entries-trash-filter',
        url: articles,
        before: async (page, h) => {
            // The Export button peeks out under the menu.
            await h.hide('main a:has-text("Export")');
            await h.click('main [data-slot="select-trigger"]:has-text("Trash")');
        },
        mark: ['[data-slot="select-content"] [role="option"]:has-text("Trashed")'],
        clip: ['main [data-slot="select-trigger"]:has-text("Status")', '[data-slot="select-content"]'],
    },
    {
        // "Revisions": step 1.
        name: 'entries-revisions',
        url: colours,
        viewport: { width: 1280, height: 1400 },
        mark: [{ selector: `${revisions} button:has-text("Restore")`, label: '1' }],
        clip: revisions,
    },
    {
        // "When two people edit the same entry": Sari opens an article the
        // admin has open. The admin's tab is left again right away, which
        // releases its lock.
        name: 'entries-edit-lock',
        // Start on the list, so Sari doesn't hold the lock first.
        url: articles,
        as: 'editor',
        before: async (page, h) => {
            const context = await page.context().browser().newContext();
            const other = await context.newPage();
            const base = new URL(page.url()).origin;
            await other.goto(`${base}/cms/login`);
            await other.fill('input[type=email]', 'admin@example.com');
            await other.fill('input[type=password]', 'password');
            await Promise.all([other.waitForURL((url) => !url.pathname.endsWith('/login')), other.click('button[type=submit]')]);
            await other.goto(`${base}/cms/collections/articles/entries/17/edit`);
            await other.waitForLoadState('networkidle');
            await other.waitForTimeout(500);
            await page.goto(`${base}/cms/collections/articles/entries/17/edit`);
            await h.waitIdle();
            await page.locator('[role="alertdialog"]').waitFor();
            await other.goto('about:blank');
            await other.waitForTimeout(500);
            await context.close();
        },
        clip: '[role="alertdialog"]',
        padding: 6,
    },
];
