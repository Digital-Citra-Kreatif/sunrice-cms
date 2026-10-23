# AI tools for content

With the CMS, AI agents connected to the panel ([AI access](../../admin/docs/ai.md)) can write and manage content as well, as the token's user and with that user's permissions. Every change goes through the same actions as the screens: the same validation, drafts and revisions, and the activity log, marked **AI agent**.

| Tool | Permission | |
| --- | --- | --- |
| `cms_list_entries` | `cms.entries.view` | The collections; or a collection's entries (search, trash, pages) with their status in each language and which translations are outdated (`outdated_languages`). |
| `cms_get_entry` | `cms.entries.view` | An entry in a language: status (and `outdated` when the main language changed since it was translated), fields, and the draft's title, slug, data and SEO; the taxonomies its collection has whose terms the person may see, as the editor's Taxonomies card (`taxonomies`: handle, title, `single`), and the entry's terms by taxonomy handle (`terms`, as the editor shows them, and `live_terms`; each term's id, slug and title). With a collection instead of an id: a new entry's fields and taxonomies. |
| `cms_save_entry` | `cms.entries.create` / `.update` | Create an entry, or change a draft in a language; only what's sent changes. `"terms"` sets the entry's terms by taxonomy handle (term ids or slugs, `[]` for none; `SaveEntryTerms`), not for translators. `"publish": true` publishes too (`cms.entries.publish`), terms included. |
| `cms_publish_entry` | `cms.entries.publish` | Publish a draft now, or schedule it. |
| `cms_unpublish_entry` | `cms.entries.publish` | Take a language off the site, keeping its draft. |
| `cms_translate_entry` | `cms.entries.create` / `.translate` | Add a language, copied from the main one. With `"machine": true` (when [machine translation](translation.md) is set up, for agents that may edit that translation), fill in what isn't translated yet into its draft, as the editor's **Translate from …** does; the answer's `machine_translated` counts the texts. |
| `cms_trash_entry` | `cms.entries.delete` | Move an entry to the trash, or restore it. |
| `cms_list_terms` | `cms.terms.view` or `cms.entries.view` | Taxonomies, with their pages as URL patterns (shared term pages and index page, and each collection's term pages and index page; null when off), and their terms with each one's URL and its page in each collection, per language, for entries' terms (`cms_save_entry`), terms fields and menus. |
| `cms_save_term` | `cms.terms.create` (new) or `cms.terms.update` | Add or rename a term, or give it another language. |
| `cms_get_globals`, `cms_save_globals` | `cms.globals.view`, `.update` | Global sets' fields and values, per language (the values only: a set's title, handle and blueprint are the `globals` resource's, through `save_record`, which takes `cms.globals.configure` too). |
| `cms_list_submissions` | `cms.submissions.view` | Forms and what visitors sent. |
| `cms_delete_submissions` | `cms.submissions.delete` | Delete submissions permanently, with their files. |
| `cms_manage_entry` | `cms.entries.delete`, `.create`, `cms.settings.site` | Delete an entry in the trash permanently (`ForceDeleteEntry`), duplicate it as a draft (`DuplicateEntry`), or make it the homepage (Settings → Site). |
| `cms_entry_revisions` | `cms.entries.view` / `.update` | An entry's published versions in a language: list, show, and restore one into the draft (`RestoreRevision`; the entry's terms it was published with too, only for those who may edit the whole entry, not translators). |
| `cms_reorder` | `cms.entries.update`, `cms.terms.update`, `cms.menus.update` | The manual order of one level of entries (collections with Manual order), terms or menu items (`ReorderEntries`, `ReorderTerms`, `ReorderMenuItems`). The ids given come first and the rest of the level follows as it was, so a short list moves just those to the front; `changed` says whether the order was different (nothing is logged when not). |
| `cms_get_listing`, `cms_save_listing` | `cms.entries.view`, `.update`; for an index page `cms.terms.view`, `.update` (or the taxonomy's own) | A listing page's fields and SEO card per language: a collection's (`collection`, saved with `SaveListing`), or a taxonomy's index page (`taxonomy`: the shared one; with `collection`, that collection's; saved with `SaveIndexPage`), with the version check. A page that's switched off is an error saying how to switch it on. |
| `cms_get_menu`, `cms_save_menu` | `cms.menus.view`, `.update` | A menu's items as a tree and as the site shows them; replace the tree (`SaveMenu`, validated like the menu editor). Items link to an entry, a term's page (`term_id`; with `collection_id`, its page in that collection), a taxonomy's index page (`taxonomy_id`; with `collection_id`, that collection's), a listing page (`collection_id` alone) or a URL. |
| `cms_field_types`, `cms_get_blueprint`, `cms_save_blueprint` | `cms.blueprints.view` (saving: `cms.blueprints.update`, or `cms.fieldsets.update` for a fieldset) | The field types and their settings (and the `widths` a field may have; text and number take `placeholder`, `prefix` and `suffix`); blueprints (listed with what uses them: collections, listing pages, taxonomies, index pages) and fieldsets, created or replaced whole (`SaveBlueprint`, `SaveFieldset`), with each field's `width`, `hint` and `hint_tooltip`. |
| `cms_seo_audit` | `cms.entries.view` | Live pages' SEO problems, 50 a page, judged on what their head shows (`Seo::for()`: the SEO card, the fields chosen in Settings → SEO, Settings → Site, the site name added to titles, the homepage's title; `meta_title` per page; a template's own `<x-sunrice-cms::seo title>` isn't seen): meta title and description lengths, share image, noindex, thin content, long slugs, languages missing; titles on several pages and images without alt text. |
| `cms_render_page` | `sunrice.access` | A public page as a signed-out visitor sees it, on `APP_URL` (so links and canonical URLs are the site's): status, redirect, the message a template threw (without the app's paths), HTML. The panel's and the MCP endpoint's paths are refused, and so are developer tools (paths starting `/_` such as `/_inertia/devtools`, `/telescope`, `/horizon`, `/pulse`), checked on the path as routing reads it (percent-encoding decoded, `.` and `..` resolved: `/%61dmin` is `/admin`). |
| `cms_get_template_guide`, `cms_read_template` | `cms.blueprints.view` | How templates work, which view each page uses now, the templates there are; a template's source (the site's, or the CMS's fallbacks). |
| `cms_write_template` | super admin, and `sunrice-cms.ai.templates` | Listed only to those (`cms_get_template_guide` says why not in `write_note`). Create, replace or delete a template in `resources/views/cms`: Blade compiled as a syntax check first, a backup of what it replaces kept in `storage/app/sunrice-cms/template-backups`, paths outside refused. A `template changed` security event. |

Read-only tokens get only the reading tools (`cms_list_*`, `cms_get_*`, `cms_field_types`, `cms_seo_audit`, `cms_render_page`, `cms_read_template`), and of those only what viewing permissions allow (`cms.blueprints.manage` isn't one). Agents are told to ask before publishing, unpublishing, trashing, deleting or changing what's live as soon as it's saved: globals, listing and index pages, and menus.

Writing templates is off unless the site turns it on, and then only for super admins' agents: Blade runs PHP, so a leaked token could run code on the server.

```php
// config/sunrice-cms.php
'ai' => [
    'templates' => env('SUNRICE_AI_TEMPLATES', false),
],
```

The CMS registers its docs (the `docs` folder it ships) for `read_docs` ("cms/site", "cms/fields" …). Its command `sunrice:publish-scheduled` can be added to the panel's `sunrice-admin.ai.commands` for `run_command`.

Collections, taxonomies, global sets, menus, redirects and forms themselves are resources, reached with the panel's `list_records`, `get_record` and `save_record`. Media for media fields comes from `list_media`.

The panel's `get_settings` and `update_settings` reach the CMS's settings sections (`site`, `locales`, `code`, `comments`, `cache`) and Settings → SEO's structured data as the section `seo` (`SiteSettings::structuredDataForm()`'s fields: `structuredData`, `publisher`, `logo`, `publisherName`, `publisherType`, `telephone`, `address`, `sameAs`), behind `cms.settings.site`, checked as the page checks them.
