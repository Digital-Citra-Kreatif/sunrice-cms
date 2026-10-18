// Screenshots for guide/en/users-roles.md (and guide/id/users-roles.md).
// Nothing is saved or deleted: forms are only typed into, dialogs are left open.

const card = (title) => `main [data-slot="card"]:has([data-slot="card-title"]:text-is("${title}"))`;

export default [
    {
        // "Users": the list, its search box and Role filter; New user (step 1 of "Adding a user").
        name: 'users-roles-users-list',
        url: '/cms/users',
        mark: [
            'main input[placeholder^="Search"]',
            'main button:has-text("Role")',
            { selector: 'main a:has-text("New user")', label: '1' },
        ],
        clip: 'main',
    },
    {
        // "Adding a user": steps 2 to 5 (not created).
        name: 'users-roles-new-user',
        url: '/cms/users/create',
        viewport: { width: 1280, height: 900 },
        before: async (page, h) => {
            await h.fill('#user-name', 'Rina Hartono');
            await h.fill('#user-email', 'rina@kopikita.studio');
            await h.fill('#user-password', 'a-long-secret-1');
            await h.fill('#user-password-confirmation', 'a-long-secret-1');
            await page.locator(`${card('Roles')} label:has-text("Author")`).first().click();
        },
        mark: [
            { selector: card('Account'), label: '2' },
            { selector: card('Password'), label: '3' },
            { selector: card('Roles'), label: '4' },
            { selector: 'main button:has-text("Create user")', label: '5' },
        ],
        clip: ['main h1', card('Roles')],
    },
    {
        // "Editing a user": Budi's account (steps 2 to 4, nothing changed).
        name: 'users-roles-edit-user',
        url: '/cms/users/3/edit',
        viewport: { width: 1280, height: 900 },
        mark: [
            { selector: card('Account'), label: '2' },
            { selector: card('Password'), label: '3' },
            { selector: card('Roles'), label: '2' },
            { selector: 'main button[type="submit"]:has-text("Save")', label: '4' },
        ],
        clip: ['main h1', card('Roles')],
    },
    {
        // "Deleting a user": the dialog for Budi, who wrote entries (not deleted).
        // Opened from his edit page: the bin in the list row currently opens the
        // edit page instead (it sits inside the row's link).
        name: 'users-roles-delete-user',
        url: '/cms/users/3/edit',
        before: async (page, h) => {
            await h.click('main button[aria-label="Delete budi@kopikita.studio"]');
        },
        mark: [
            { selector: '[data-slot="dialog-content"] label:has-text("Move it to another user")', label: '2' },
            { selector: '[data-slot="dialog-content"] button:has-text("Delete user")', label: '3' },
        ],
        clip: '[data-slot="dialog-content"]',
    },
    {
        // "Roles": the list, New role (step 1) and Delete.
        name: 'users-roles-roles-list',
        url: '/cms/roles',
        mark: [
            { selector: 'main a:has-text("New role")', label: '1' },
            'main tr:has-text("Translator") button:has-text("Delete")',
        ],
        clip: 'main',
    },
    {
        // "Creating or changing a role": the Editor role (steps 2 to 4, nothing changed).
        name: 'users-roles-edit-role',
        url: '/cms/roles/3/edit',
        mark: [
            { selector: '#role-name', label: '2' },
            { selector: `${card('Admin')}`, label: '3' },
            { selector: 'main button:has-text("Save role")', label: '4' },
        ],
        clip: ['main h1', card('Structure')],
    },
    {
        // "Permissions per collection": one collection's card in the Editor role.
        name: 'users-roles-collection-permissions',
        url: '/cms/roles/3/edit',
        viewport: { width: 1280, height: 2200 },
        clip: card('Entries — Articles'),
    },
];
