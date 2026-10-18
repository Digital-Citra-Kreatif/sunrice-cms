// Screenshots for guide/en/welcome.md (and guide/id/welcome.md).

const sidebar = '[data-sidebar="sidebar"]';
const group = (label) => `${sidebar} [data-sidebar="group"]:has([data-sidebar="group-label"]:text-is("${label}"))`;

export default [
    {
        // "Signing in", steps 1-4 (nothing is submitted).
        name: 'welcome-login',
        url: '/cms/login',
        as: null,
        before: async (page, h) => {
            await h.fill('input[type=email]', 'sari@kopikita.studio');
            await h.fill('input[type=password]', 'password');
        },
        mark: [
            { selector: 'h1', label: '1' },
            { selector: 'input[type=email]', label: '2' },
            { selector: 'input[type=password]', label: '2' },
            { selector: 'div:has(> #remember)', label: '3' },
            { selector: 'button[type=submit]', label: '4' },
        ],
        clip: ['h1', 'button[type=submit]'],
        padding: 32,
    },
    {
        // "Forgot your password", step 2 (nothing is sent).
        name: 'welcome-forgot-password',
        url: '/cms/forgot-password',
        as: null,
        before: async (page, h) => {
            await h.fill('input[type=email]', 'sari@kopikita.studio');
        },
        mark: [
            { selector: 'input[type=email]', label: '2' },
            { selector: 'button[type=submit]', label: '2' },
        ],
        clip: ['h1', 'button[type=submit]'],
        padding: 32,
    },
    {
        // "The dashboard".
        name: 'welcome-dashboard',
        url: '/cms',
    },
    {
        // "The sidebar": the four groups, numbered as in the guide.
        name: 'welcome-sidebar',
        url: '/cms',
        // Tall enough for the whole sidebar.
        viewport: { width: 1280, height: 1400 },
        mark: [
            { selector: group('Content'), label: '1' },
            { selector: group('Taxonomies'), label: '2' },
            { selector: group('Structure'), label: '3' },
            { selector: group('Manage'), label: '4' },
        ],
        // The logo and the groups (not the empty space above the user menu).
        clip: [`${sidebar} [data-sidebar="header"]`, group('Manage')],
    },
    {
        // "Breadcrumbs": the trail in the header, and the back arrow.
        name: 'welcome-breadcrumbs',
        url: '/cms/collections/articles/entries/12/edit',
        mark: ['[data-slot="breadcrumb"]', 'main a[aria-label^="Back to"]'],
        clip: ['[data-slot="sidebar-trigger"]', 'main h1'],
    },
    {
        // "The user menu", opened from the bottom of the sidebar.
        name: 'welcome-user-menu',
        url: '/cms',
        before: async (page, h) => {
            await h.click('[data-sidebar="footer"] button');
        },
        clip: ['[data-sidebar="footer"]', '[data-slot="dropdown-menu-content"]'],
    },
];
