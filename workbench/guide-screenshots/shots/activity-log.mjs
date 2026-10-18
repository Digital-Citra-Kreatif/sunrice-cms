// Screenshots for guide/en/activity-log.md (and guide/id/activity-log.md).
// Nothing is pruned: the Prune dialog is only opened.

const filter = (label) => `main [data-slot="select-trigger"]:has-text("${label}")`;
const search = 'main input[placeholder^="Search by name, user or token"]';

export default [
    {
        // "Reading an entry": the log with its columns.
        name: 'activity-log-overview',
        url: '/cms/activity',
    },
    {
        // "Reviewing what AI agents did": Source set to AI agent (step 1), search (step 2), Period (step 3).
        name: 'activity-log-filters',
        url: '/cms/activity',
        before: async (page, h) => {
            await h.click(filter('Source'));
        },
        mark: [
            // The open list covers the Source button: mark the choice instead.
            { selector: '[data-slot="select-content"] [data-slot="select-item"]:has-text("AI agent")', label: '1' },
            { selector: search, label: '2' },
            { selector: filter('Period'), label: '3' },
        ],
        clip: ['main h1', search, filter('Type'), filter('User'), '[data-slot="select-content"]'],
    },
    {
        // "Pruning old entries": Prune (step 1), the age (step 2) and Delete old entries (step 3).
        name: 'activity-log-prune',
        url: '/cms/activity',
        before: async (page, h) => {
            await h.click('main button:has-text("Prune")');
            await page.keyboard.press('End'); // unselect the suggested value
        },
        mark: [
            { selector: 'main button:has-text("Prune")', label: '1' },
            { selector: '#prune-days', label: '2' },
            { selector: '[data-slot="dialog-content"] button:has-text("Delete old entries")', label: '3' },
        ],
        clip: ['main h1', 'main button:has-text("Prune")', '[data-slot="dialog-content"]'],
    },
];
