// Screenshots for guide/en/comments.md (and guide/id/comments.md).

const card = (title) => `main [data-slot="card"]:has([data-slot="card-title"]:text-is("${title}"))`;
const comment = (n) => `main ul > li >> nth=${n}`;

export default [
    {
        // "Turn comments on for a collection", steps 2-3: the Pages & URLs card of Articles.
        name: 'comments-allow',
        url: '/cms/structure/collections/2/edit',
        viewport: { width: 1280, height: 1800 },
        mark: [
            { selector: 'main label:has-text("Each entry has its own page")', label: '2' },
            { selector: 'main label:has-text("Allow comments")', label: '3' },
        ],
        clip: [`${card('Pages & URLs')} [data-slot="card-title"]`, 'main :text("Visitors can comment")'],
    },
    {
        // "Comment settings": the Comments card in Settings → General.
        name: 'comments-settings',
        url: '/cms/settings',
        viewport: { width: 1280, height: 3400 },
        mark: ['main button:text-is("Save settings") >> nth=-1'],
        clip: [card('Comments'), 'main button:text-is("Save settings") >> nth=-1'],
    },
    {
        // "Moderate comments": tabs, search and the first comments.
        name: 'comments-moderate',
        url: '/cms/comments',
        mark: [
            'main button:has-text("All") >> xpath=..',
            'main input[placeholder^="Search text"]',
            'main ul > li:first-child [aria-label="View on the site"]',
        ],
        clip: ['main h1', comment(1)],
    },
    {
        // "Actions on one comment": the buttons under a pending comment.
        name: 'comments-actions',
        url: '/cms/comments',
        mark: [
            `${comment(0)} >> button:text-is("Approve")`,
            `${comment(0)} >> button:text-is("Spam")`,
            `${comment(0)} >> button:text-is("Reply")`,
            `${comment(0)} >> button:text-is("Edit")`,
            `${comment(0)} >> button:text-is("Trash")`,
        ],
        clip: comment(0),
    },
    {
        // "Bulk actions": two comments ticked and the bulk buttons (nothing is applied).
        name: 'comments-bulk',
        url: '/cms/comments',
        before: async (page, h) => {
            await page.locator(`${comment(0)} >> [role=checkbox]`).click();
            await page.locator(`${comment(1)} >> [role=checkbox]`).click();
            await h.waitIdle();
        },
        mark: [
            { selector: [`${comment(0)} >> [role=checkbox]`, `${comment(1)} >> [role=checkbox]`], label: '1' },
            { selector: 'main div:has(> button:text-is("Approve")):has(> button:text-is("Trash")) >> nth=0', label: '2' },
        ],
        clip: ['main input[placeholder^="Search text"]', comment(1)],
    },
    {
        // "Comments on the entry editor": the Comments card of an article.
        name: 'comments-entry-card',
        url: '/cms/collections/articles/entries/12/edit',
        viewport: { width: 1280, height: 2600 },
        mark: ['main label:has-text("Accept new comments")'],
        clip: card('Comments'),
    },
];
