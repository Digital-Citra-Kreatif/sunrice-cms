// Screenshots for guide/en/appearance.md (and guide/id/appearance.md).

// A draft article (seeded as a draft), so the editor shows "View draft".
const draftArticle = '/cms/collections/articles/entries/19/edit';
const card = (title) => `main [data-slot="card"]:has([data-slot="card-title"]:text-is("${title}"))`;

export default [
    {
        // "Choosing a template for one page": the Template card, opened.
        name: 'appearance-template-card',
        url: '/cms/collections/pages/entries/2/edit',
        before: async (page, h) => {
            await h.click(`${card('Template')} button[aria-expanded]`);
        },
        mark: [card('Template')],
        clip: card('Template'),
        padding: 24,
    },
    {
        // "Previewing your changes": View draft (step 2) and Publish (step 3).
        name: 'appearance-view-draft',
        url: draftArticle,
        mark: [
            { selector: 'main :is(a,button):has-text("View draft")', label: '2' },
            { selector: 'main button:has-text("Publish")', label: '3' },
        ],
        clip: { x: 280, y: 96, width: 980, height: 136 },
    },
];
