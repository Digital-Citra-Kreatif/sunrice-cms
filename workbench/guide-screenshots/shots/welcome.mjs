// Screenshots for guide/en/welcome.md (and guide/id/welcome.md).

const sidebar = '[data-sidebar="sidebar"]';
const group = (label) => `${sidebar} [data-sidebar="group"]:has([data-sidebar="group-label"]:text-is("${label}"))`;

export default [
    {
        // "Signing in": the login screen.
        name: 'welcome-login',
        url: '/cms/login',
        as: null,
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
        // "The user menu", opened from the bottom of the sidebar.
        name: 'welcome-user-menu',
        url: '/cms',
        before: async (page, h) => {
            await h.click('[data-sidebar="footer"] button');
        },
        clip: ['[data-sidebar="footer"]', '[data-slot="dropdown-menu-content"]'],
    },
];
