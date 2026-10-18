# Users and roles

Everyone who works in the admin has their own user account. What each person can see and do is decided by their **roles**: a role is a named set of permissions, such as "Editor". This page explains how to add people, change their accounts and give them exactly the access they need.

You find both screens under **Manage**: **Users** and **Roles**. Each needs its own permissions (for example **View users** or **Edit roles**), so not everyone sees them.

## Users

The **Users** list shows each person's name, email and roles. Use the search box to find someone by name or email, and the **Role** filter to show only people with a certain role (or **No role**).

### Adding a user

Sunrice doesn't send invitations: you create the account and pass on the login details yourself.

1. Go to **Manage → Users** and click **New user**.
2. In the **Account** card, enter the person's **Name** and **Email**.
3. In the **Password** card, enter a **Password** and repeat it in **Confirm password**.
4. In the **Roles** card, tick one or more roles.
5. Click **Create user**.

Tell the person the admin address (usually your site address followed by `/cms`), their email and their password, preferably through a different channel than email. Ask them to choose a new password with **Forgot password?** on the login page.

> [!TIP]
> A user without any role can't use the admin. Always tick at least one role.

### Editing a user

1. In the **Users** list, click the person's row.
2. Change their **Name**, **Email** or roles.
3. To set a new password, fill in **New password** and **Confirm password**. Leave both empty to keep the current password.
4. Click **Save**.

There is no separate profile page. If you forget your own password, use **Forgot password?** on the login page; a reset link is emailed to you.

### Deleting a user

1. Click the bin icon on the person's row, or the bin button on their edit page.
2. If they created entries or uploaded files, choose what happens to them:
   - **Move it to another user**: pick who takes over their content.
   - **Keep it without an author**: everything stays; "Created by" shows no one.
   - **Delete their entries**: their entries go to the trash and off the site. Uploaded files are kept.
3. Click **Delete user** (or **Delete user and entries**).

> [!WARNING]
> Deleting a user can't be undone. If someone only needs a break, remove their roles instead: they can no longer use the admin, and you can give the roles back later.

You can't delete your own account.

## Roles

The **Roles** list shows each role with its number of permissions. Click a role's name to see or change it.

### The default roles

Many sites start with four ready-made roles:

| Role | What it can do |
| --- | --- |
| **Administrator** | Everything in the admin, including structure, users, roles, settings, the activity log and AI access. |
| **Editor** | All entries and terms, including publishing and translating; menus; editing globals; media; viewing and exporting form submissions; comments. No structure, users, roles or settings. |
| **Author** | Create entries, and edit or delete their own; view terms; view and upload media. Can't publish: an editor does that. |
| **Translator** | View entries and edit their other-language versions only; view media. Can't publish or mark a translation ready. |

Editor, Author and Translator can also see unpublished entries on the site while signed in. All four have **Read the user guide**, which shows this guide under **Manage → Guide**.

> [!TECHNICAL]
> The default roles are created with `php artisan sunrice:seed-roles` (or `sunrice:install --roles`). Running it again adds new permissions to them without removing your changes. See [Default roles](docs:permissions.md#default-roles).

### Creating or changing a role

1. Go to **Manage → Roles** and click **New role** (or click an existing role).
2. Enter a **Name**.
3. Tick the permissions the role should have. They are grouped in cards such as **Admin**, **Structure**, **Navigation**, **Globals**, **Users & roles**, **Forms**, **Assets** and **Comments**. Each card's **toggle all** ticks or clears the whole group.
4. Click **Create role** (or **Save role**).

To delete a role, click **Delete** next to it in the list. A role that is still given to users can't be deleted: remove it from those users first.

### Permissions per collection

Content permissions are set separately for each collection, in cards named **Entries — (collection)**. This lets you, for example, allow someone to write news but not touch the main pages. The actions are:

- **view**, **create**, **edit**, **delete**, **publish**
- **edit-own** and **delete-own**: only entries the person created
- **translate**: edit other-language versions only; the main language stays read-only

Taxonomies (**Terms — …**), forms (**Forms — …**) and some extra sections work the same way.

> [!NOTE]
> When a developer adds a new collection, taxonomy or form, its permissions appear in the role editor. Remember to tick them for the roles that should use it.

> [!TECHNICAL]
> Permissions for new collections, taxonomies, forms and resources are created with `php artisan sunrice:sync-permissions`. See [Entity-scoped permissions](docs:permissions.md#entity-scoped-permissions).

### Super admins

A **super admin** always has every permission, whatever is ticked, and their role can't be edited. Super admins are protected: only another super admin can edit or delete a super-admin user or give someone the super-admin role. The first account created during installation is usually a super admin.

> [!TECHNICAL]
> The super-admin role's name is `sunrice.super_admin_role` in `config/sunrice.php` (default `Super Admin`). See [Permissions](docs:permissions.md).

## Giving someone access safely

- **Give the least access that works.** Start from Author or Editor and only add what's missing.
- **Keep super admins and administrators few.** They can change users, roles and settings.
- **Be careful with sensitive permissions** such as **Edit settings**, **Edit roles**, **Connect AI agents (MCP) with an access token** and **Let AI agents read the error log**.
- **One account per person.** Never share logins, so the [activity log](activity-log.md) shows who did what.
- **Remove access promptly** when someone leaves: delete the account or remove its roles.
- **Turn on two-factor login** under [Settings](settings.md#security) for extra protection.
