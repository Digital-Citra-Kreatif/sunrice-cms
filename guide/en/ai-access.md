# AI access

You can connect an AI agent, such as Claude, ChatGPT, Cursor or VS Code, to your site so it can help with the work: write and translate entries, fix SEO, add alt text to images, update menus and more. The agent connects through MCP (Model Context Protocol), a standard way for AI tools to talk to other software, using an **access token** you create in the admin.

Open **Manage → AI access**. You need the **Connect AI agents (MCP) with an access token** permission. Administrators have it.

## How it works

An agent never gets more power than you. It acts **as you**: it can do exactly what your own account can do, nothing more. If you can't publish entries, neither can the agent you connect.

Everything the agent changes goes through the same checks as working in the admin: drafts, revisions, permissions and validation. Each change is also recorded in the [activity log](activity-log.md).

## Connecting an agent

### 1. Create a token

1. Go to **Manage → AI access**.
2. In the **Your tokens** card, type a **Name** for the token, such as "Claude on my laptop".
3. Click **Create token**.
4. A window, **Your new token**, shows the token. Click **Copy** and keep it somewhere safe for the next step.
5. Click **I've copied it**.

> [!WARNING]
> The token is shown only once. If you lose it, revoke it and create a new one. Treat it like a password: anyone who has it can work in your site as you.

### 2. Add the site to your agent

The **Connect an agent** card shows ready-made settings to copy:

- **Server URL**: the address the agent connects to.
- **Claude Code**: one command to paste in a terminal.
- **Claude Desktop, Cursor, VS Code… (JSON config)**: settings to paste into the agent's configuration.

Right after you create a token, these snippets already include it, until you leave the page. Otherwise, replace `YOUR_TOKEN` with your token.

Each agent has its own place for these settings. Look for "MCP servers" or "connectors" in its settings or documentation.

> [!TECHNICAL]
> An agent running on the server itself can connect without a token with `php artisan mcp:start sunrice`, with `SUNRICE_MCP_USER` set to the email of the user it acts as. Tokens can also be created with `php artisan sunrice:mcp-token {email} --name="Claude"`. If the page says the MCP server is turned off, it was disabled with `SUNRICE_MCP_ENABLED`. See [Connecting an agent](docs:ai-agents.md#connecting-an-agent).

### 3. Ask in plain words

Once connected, talk to the agent normally, for example:

- "List the published articles that have no meta description and suggest one for each."
- "Translate the main menu and the footer into English, as drafts."
- "Find images without alt text and fill it in."
- "What changed on the site this week?"

## What an agent can do

Within your permissions, an agent can work with:

- **Entries**: list, read, create and update them, as drafts or published; unpublish, trash, restore and duplicate them; look at and restore earlier versions.
- **Structure**: collections, blueprints, fieldsets and taxonomies.
- **Terms, menus and globals.**
- **Media**: upload images, edit titles, alt text and captions, organise folders.
- **Forms** and their submissions.
- **SEO**: run an audit of titles, descriptions, share images and missing translations.
- **Translations**: translate entries and other content.
- **Templates**: read and, for super admins only, change the site's templates.
- **Maintenance commands** and **the error log**, with extra permissions (below).

> [!NOTE]
> Agents are told to ask before deleting things or publishing large changes, but they can still make mistakes. Check their work, just as you would a new colleague's.

## Permissions involved

| Permission | What it allows |
| --- | --- |
| **Connect AI agents (MCP) with an access token** | Opening **AI access** and creating tokens. |
| **Let AI agents run maintenance commands** | The agent may run a short list of approved maintenance tasks, such as clearing the cache or publishing scheduled entries. |
| **Let AI agents read the error log** | The agent may read recent errors from the site's error log, to explain a problem and suggest a fix. |
| **View the activity log** | The agent may read the activity log, for example to tell you what it changed. |
| **Read the developer docs** | The agent may read the developer documentation. |

> [!WARNING]
> The error log can contain visitors' personal data, such as email addresses. Passwords and keys are hidden, but only give **Let AI agents read the error log** to people who may see that data. By default, only Administrators have it.

> [!TECHNICAL]
> The allowed commands are listed in `sunrice.mcp.commands` in `config/sunrice.php`. `SUNRICE_MCP_TEMPLATES=false` turns off template writing and `SUNRICE_MCP_ERROR_LOG=false` turns off reading the error log. Each token may make 300 requests a minute. See [Configuration](docs:ai-agents.md#configuration) and [Safety](docs:ai-agents.md#safety).

## Revoking a token

The **Your tokens** list shows each token's **Name**, when it was **Last used** and when it was **Created**. You only see your own tokens.

1. Click the bin icon on the token's row.
2. Confirm. Agents using that token can no longer connect.

## Safety tips

- **One token per agent or device.** Then you can revoke one without disconnecting the others.
- **Name tokens clearly**, so you recognise them in the list and in the activity log.
- **Revoke tokens you no longer use**, and any token that might have leaked. "Last used" helps you spot forgotten ones.
- **Use an account with only the access needed.** For content work, an agent connected by a user with the Editor role is often enough; see [Users and roles](users-roles.md).
- **Review the agent's work** in the [activity log](activity-log.md): set **Source** to **AI agent**.
- **Prefer drafts.** Ask the agent to save changes as drafts so you can review them before publishing. Entry revisions let you go back if needed.
