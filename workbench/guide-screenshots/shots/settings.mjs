// Screenshots for guide/en/settings.md (and guide/id/settings.md).
// Nothing is saved: fields are only typed into, never submitted.

const card = (title) => `main [data-slot="card"]:has([data-slot="card-title"]:text-is("${title}"))`;
const tabs = 'nav[aria-label="Settings sections"]';

export default [
    {
        // "Finding your way around": the tabs, the cards and Save settings (step 2).
        name: 'settings-overview',
        url: '/cms/settings',
        mark: [
            tabs,
            { selector: 'main button:has-text("Save settings")', label: '2' },
        ],
    },
    {
        // "Languages": adding a language, steps 1 and 2.
        name: 'settings-languages',
        url: '/cms/settings',
        viewport: { width: 1280, height: 1100 },
        before: async (page, h) => {
            await h.fill(`${card('Languages')} input[placeholder="e.g. en"]`, 'pt-BR');
        },
        mark: [
            { selector: `${card('Languages')} input[placeholder="e.g. en"]`, label: '1' },
            { selector: `${card('Languages')} button:has-text("Add language")`, label: '2' },
        ],
        clip: card('Languages'),
    },
    {
        // "Branding": the default branding (unchanged).
        name: 'settings-branding',
        url: '/cms/settings',
        viewport: { width: 1280, height: 1500 },
        clip: card('Branding'),
    },
    {
        // "Email": sending a test email, steps 1 and 2 (not sent).
        name: 'settings-email',
        url: '/cms/settings',
        viewport: { width: 1280, height: 2500 },
        before: async (page, h) => {
            await h.fill('#test-email', 'you@kopikita.studio');
        },
        mark: [
            { selector: '#test-email', label: '1' },
            { selector: `${card('Email')} button:has-text("Send test")`, label: '2' },
        ],
        clip: card('Email'),
    },
    {
        // "SEO tab": the Search engines & sharing card and Save SEO settings.
        name: 'settings-seo',
        url: '/cms/settings/seo',
        mark: ['main button:has-text("Save SEO settings")'],
        clip: ['main h1', card('Search engines & sharing')],
    },
];
