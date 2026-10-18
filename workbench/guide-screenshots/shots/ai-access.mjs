// Screenshots for guide/en/ai-access.md (and guide/id/ai-access.md).
// No token is created: the name is only typed in.

const card = (title) => `main [data-slot="card"]:has([data-slot="card-title"]:text-is("${title}"))`;

export default [
    {
        // "Create a token": steps 2 and 3.
        name: 'ai-access-create-token',
        url: '/cms/ai-access',
        viewport: { width: 1280, height: 1100 },
        before: async (page, h) => {
            await h.fill('#token-name', 'Claude on my laptop');
        },
        mark: [
            { selector: '#token-name', label: '2' },
            { selector: 'main button:has-text("Create token")', label: '3' },
        ],
        clip: card('Your tokens'),
    },
    {
        // "Add the site to your agent": the Connect an agent card.
        name: 'ai-access-connect',
        url: '/cms/ai-access',
        viewport: { width: 1280, height: 1100 },
        clip: card('Connect an agent'),
    },
];
