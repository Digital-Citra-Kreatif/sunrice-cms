// Screenshots for guide/en/seo.md (and guide/id/seo.md).
// Nothing here saves: fields are only typed into.

const card = (title) => `main [data-slot="card"]:has([data-slot="card-title"]:text-is("${title}"))`;

export default [
    {
        // "SEO fields on an entry": the SEO card of an article, with an example description.
        name: 'seo-entry-fields',
        url: '/cms/collections/articles/entries/12/edit',
        viewport: { width: 1280, height: 1900 },
        before: async (page, h) => {
            await h.fill(`${card('SEO')} textarea`, 'How to pick a brand palette that works on screens, signs and packaging alike.');
        },
        clip: card('SEO'),
    },
    {
        // "Settings → SEO": the SEO tab and its first card.
        name: 'seo-settings',
        url: '/cms/settings/seo',
        mark: ['main a:text-is("SEO")'],
        clip: ['main h1', 'main button:has-text("Save SEO settings")', card('Search engines & sharing')],
    },
    {
        // "Fields used for SEO".
        name: 'seo-fields-used',
        url: '/cms/settings/seo',
        viewport: { width: 1280, height: 1200 },
        clip: ['main h2:has-text("Fields used for SEO")', card('Collections')],
    },
    {
        // "SEO defaults per collection and taxonomy": in the Articles collection's settings.
        name: 'seo-collection-defaults',
        url: '/cms/structure/collections/2/edit',
        viewport: { width: 1280, height: 2800 },
        clip: card('SEO defaults'),
    },
];
