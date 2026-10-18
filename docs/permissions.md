# Permissions

Sunrice uses `spatie/laravel-permission`. Guard: `sunrice.auth.guard`.
The role named by `sunrice.super_admin_role` bypasses every check
(`Gate::before`).

Run `php artisan sunrice:sync-permissions` after adding collections,
taxonomies, forms or resources — it creates missing permissions and
deletes stale ones. When upgrading from the old `sunrice.manage-*`
permissions it also gives their replacements to every role and user that
held them (e.g. `manage-structure` → the collections, blueprints,
fieldsets and taxonomies permissions plus `forms.create`/`forms.delete`),
so nobody loses access.

## Global permissions

| Permission | Grants |
| --- | --- |
| `sunrice.access-admin` | Access to the admin panel. |
| `sunrice.collections.{view,create,edit,delete}` | Collections (structure screens). |
| `sunrice.blueprints.{view,create,edit,delete}` | Blueprints. |
| `sunrice.fieldsets.{view,create,edit,delete}` | Fieldsets. |
| `sunrice.taxonomies.{view,create,edit,delete}` | Taxonomy definitions (terms are per taxonomy, below). |
| `sunrice.forms.{create,delete}` | Creating and deleting forms (editing is per form, below). |
| `sunrice.menus.{view,create,edit,delete}` | Menus and their items (`edit`). |
| `sunrice.globals.{view,create,edit,delete}` | Global sets; `edit` changes their values. |
| `sunrice.assets.{view,upload,edit,delete}` | Asset library; `edit` changes details and replaces files. |
| `sunrice.users.{view,create,edit,delete}` | Users. |
| `sunrice.roles.{view,create,edit,delete}` | Roles. |
| `sunrice.settings.edit` | Settings. |
| `sunrice.view-drafts` | While signed in, open unpublished and scheduled entries (and translations not yet Ready) on the site, under a "Draft" banner. Given to Editor, Author and Translator. |
| `sunrice.guide.view` | Read the user guide in the admin (Manage → Guide): how to work with the CMS, in English and Indonesian. Every default role has it; sites upgrading get it on their default roles with `sunrice:sync-permissions`. |
| `sunrice.docs.view` | Read these developer docs in the admin (Manage → Docs). Only Administrator has it by default. |
| `sunrice.ai-access` | Connect AI agents through MCP with an access token (Manage → AI access). The agent can do what the user can. See [AI agents](ai-agents.md). |
| `sunrice.run-commands` | Let AI agents run the maintenance commands listed in `sunrice.mcp.commands`. |
| `sunrice.activity.view` | See the [activity log](activity-log.md) (Manage → Activity log). |
| `sunrice.activity.prune` | Delete old activity log entries from the admin. |
| `sunrice.comments.{view,moderate,delete}` | [Comments](comments.md) in the admin: see them; approve, reply, edit and mark spam; delete. Administrator and Editor have them. |
| `sunrice.error-log.view` | Let AI agents read recent errors from the Laravel log (`read_error_log`). Logs can hold visitors' data, so only Administrator has it by default. |

Super admins are protected: only another super admin can edit or delete a
super-admin user, give or remove the super-admin role, or change that role.

## Entity-scoped permissions

| Pattern | Actions |
| --- | --- |
| `sunrice.entries.{collectionId}.{action}` | `view`, `create`, `edit`, `edit-own`, `translate`, `delete`, `delete-own`, `publish` |
| `sunrice.terms.{taxonomyId}.{action}` | `view`, `create`, `edit`, `delete` |
| `sunrice.forms.{formId}.{action}` | `edit`, `view-submissions`, `export-submissions`, `delete-submissions` |
| `sunrice.resources.{key}.{action}` | `view`, `create`, `edit`, `delete`, `export` |

`translate` lets a user edit an entry's other-language versions only: the
main language is read-only for them, and they can't mark a translation
Ready, publish or delete. Anyone with `edit` (or `edit-own` on their own
entries) can translate too. Reordering a collection's entries or a
taxonomy's terms needs `edit`.

Model resources additionally honor the model's own policy when one is
registered.

## Default roles

```bash
php artisan sunrice:seed-roles      # or: sunrice:install --roles
```

| Role | Can |
| --- | --- |
| Administrator | Every Sunrice permission (without the super-admin bypass). |
| Editor | All entries and terms (incl. publishing and translating), menus, editing globals, assets, viewing/exporting form submissions. |
| Author | Create entries and edit/delete their own; view terms; view and upload assets. Can't publish. |
| Translator | View entries and edit their other-language versions only; view assets. |

Run it again after adding collections, taxonomies or forms: it gives these
roles the new permissions. It only adds permissions, so changes you make to
the roles in the admin are kept. To seed your own set, extend
`Sunrice\Database\Seeders\RolesSeeder` and override `roles()` (role name →
permission patterns, `*` matches anything).
