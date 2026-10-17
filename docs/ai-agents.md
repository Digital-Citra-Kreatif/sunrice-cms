# AI agents (MCP)

Sunrice includes an [MCP](https://modelcontextprotocol.io) server, so AI
agents such as Claude, ChatGPT, Cursor or VS Code can manage the site:
content, structure, menus, globals, media, forms, SEO, translations,
templates and maintenance commands.

## How it works

The server is part of the site. An agent connects to it, receives
instructions about how Sunrice is organised and a list of **tools**. Each
tool has a description and an input schema. The agent decides which tools
to call, for example `get_site_info`, then `get_entry`, then `update_entry`.

Every tool runs Sunrice's own actions, so the agent gets the same
validation, drafts, revisions, redirects, cache clearing and permission
checks as a person using the admin. The agent acts as the user who owns
the access token and can do exactly what that user can.

## Connecting an agent

1. Give the user's role the **Connect AI agents** permission
   (`sunrice.ai-access`). Administrators have it.
2. In the admin, open **AI access**, create a token and copy it. It is
   shown once. Or run
   `php artisan sunrice:mcp-token admin@example.com --name="Claude"`.
3. Add the server to the agent. The AI access page shows ready-made
   settings:

   ```bash
   # Claude Code
   claude mcp add --transport http sunrice https://example.com/mcp \
     --header "Authorization: Bearer sr_…"
   ```

   ```json
   {
     "mcpServers": {
       "sunrice": {
         "type": "http",
         "url": "https://example.com/mcp",
         "headers": { "Authorization": "Bearer sr_…" }
       }
     }
   }
   ```

Revoke a token on the same page (or with `--revoke=ID`) and the agent
can no longer connect.

An agent running on the server itself can use stdio instead of HTTP:
`php artisan mcp:start sunrice`, with `SUNRICE_MCP_USER` set to the
email of the user it acts as.

## Tools

| Area | Tools |
| --- | --- |
| Site | `get_site_info` (start here), `update_site_settings`, `read_docs` (needs **Read the developer docs**) |
| Entries | `list_entries`, `get_entry`, `create_entry`, `update_entry` (drafts; `publish: true` puts changes live; `locale` writes a translation), `manage_entry` (unpublish, trash, restore, delete, duplicate, set_homepage), `entry_revisions` (list, show and restore published versions) |
| Structure | `save_collection` (also turns on a listing page and picks its blueprint), `get_listing` / `save_listing` (a listing page's heading, intro, fields and SEO per language), `get_blueprint` (also lists field types and their options), `save_blueprint` (blueprints and fieldsets), `save_taxonomy`, `delete_structure` |
| Terms | `list_terms`, `save_term` (create, update, trash, restore) |
| Order | `reorder`: the manual order of entries, terms or menu items |
| Globals and menus | `get_global`, `save_global` (values, and the set's title, blueprint and languages), `get_menu`, `save_menu` |
| Media | `list_assets` (e.g. images missing alt text), `save_asset` (upload from a URL or base64, edit title/alt/caption), `manage_asset` (folders, move, trash, restore, delete) |
| Forms | `get_form` (with submissions), `save_form`, `delete_submissions` |
| SEO | `seo_audit`: meta titles and descriptions (length, duplicates, missing), share images, noindex, thin content, missing translations, images without alt |
| Languages | `translate_entry` (machine translation with the configured service; the agent can also translate and save with `update_entry`) |
| Templates | `get_template_guide`, `read_template`, `write_template`, `render_page` |
| Commands | `run_command` (only the commands in `sunrice.mcp.commands`) |
| Errors | `read_error_log`: recent errors from the Laravel log, grouped, with the file, line and stack trace, so the agent can explain the cause and suggest a fix (needs **Let AI agents read the error log**) |
| Activity | `get_activity`: the [activity log](activity-log.md), filtered by days, source, action, type, user or text; `mine: true` for what this token changed (needs **View the activity log**) |

Packages add tools of their own with `Sunrice::registerMcpTool()` (see [Packages](packages.md#tools-for-ai-agents)); they are listed after these.

## Translating content

The agent can translate everything stored per language in the database.
It is told which tool does what:

| Content | How the agent translates it |
| --- | --- |
| Entries | `translate_entry` (machine translation, when an API key is set; saved as drafts), or it writes the translation itself with `update_entry` and `locale` |
| Listing pages | `save_listing` with `locale` (heading, intro, fields, SEO) |
| Terms | `save_term` with `translations: {locale: {name, slug, data, seo, is_ready}}` |
| Globals | `save_global` with `locale` |
| Menu labels | `save_menu` item `labels: {locale: text}` |
| Collection and taxonomy names | `save_collection` / `save_taxonomy` `settings.titles: {locale: name}` |
| Everything at once | `run_command sunrice:translate` (needs the command permission; see [Machine translation](translation.md)) |

`get_entry` shows each language and which are missing, and `seo_audit`
lists entries without a translation. Form labels and asset alt text are
stored in one language only, so there is nothing per language to
translate there.

Ask the agent in plain words, for example *"Translate all published
articles into English, keep them as drafts and list what you did"*, or
*"Translate the main menu, the footer global and the Categories terms into
English."*

## Templates

`get_template_guide` gives the agent everything it needs to design pages:

- how a template is chosen (priority and fallbacks)
- layouts and partials
- the variables of each page type
- reading fields and querying entries
- menus, globals, forms, SEO and languages
- which template every collection and taxonomy uses right now

The agent can read the starter templates as examples, then write templates
to `resources/views/sunrice/` and CSS/JS to `public/sunrice-theme/`, and
check the result with `render_page`.

Blade templates run PHP on the server. So writing them is limited to
**super admins**, and you can turn it off with `SUNRICE_MCP_TEMPLATES=false`.
Each change is checked for syntax errors first, and the previous version
is kept in `storage/app/sunrice/template-backups/`.

## Configuration

```php
// config/sunrice.php
'mcp' => [
    'enabled' => env('SUNRICE_MCP_ENABLED', true),
    'path' => 'mcp',                              // the endpoint: POST /mcp
    'local_user' => env('SUNRICE_MCP_USER'),      // for `mcp:start sunrice`
    'templates' => env('SUNRICE_MCP_TEMPLATES', true),
    'error_log' => env('SUNRICE_MCP_ERROR_LOG', true), // read_error_log
    'log_path' => env('SUNRICE_MCP_LOG_PATH'),         // default storage/logs
    'commands' => ['sunrice:publish-scheduled', 'sunrice:translate', 'cache:clear', /* … */],
],
```

`run_command` also needs the **Let AI agents run maintenance commands**
permission (`sunrice.run-commands`). Requests are limited to 300 a
minute per token.

## Safety

- Tokens are stored hashed and can be revoked at any time.
- Everything an agent changes is in the [activity log](activity-log.md)
  with the source **AI agent** and the token's name, so you can filter for
  what agents did (and under which token). With **View the activity log**,
  the agent can read the log itself (`get_activity`) to answer "what changed
  this week?" or "what did you do?".
- Tools follow the token user's permissions: `read_docs` needs **Read the
  developer docs**, like the admin's Docs page. Without it the agent still
  has its built-in instructions, `get_site_info` and `get_template_guide`.
- `read_error_log` only reads: the last 2 MB of the three newest files in
  `storage/logs`. Passwords, tokens, keys and database credentials in
  messages are masked, but logs can still hold visitors' data (emails,
  URLs), so the permission is for administrators. Turn the tool off with
  `SUNRICE_MCP_ERROR_LOG=false`.
- Give agents a user with only the permissions they need, e.g. an Editor
  for content work.
- Agents are told to ask before deleting or publishing large changes,
  but they can still make mistakes. Entry changes keep revisions, and
  deleted collections and taxonomies keep their content until purged.
