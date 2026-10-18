# Guide screenshots

Screenshots of the admin for the user guide (`guide/images/*.webp`). They
are taken from the workbench filled with demo content: *Kopi Kita Studio*,
a small design studio in Jakarta, in English with Indonesian translations
(`workbench/database/seeders/GuideDemoSeeder.php`).

## 1. Build the demo site

```bash
php vendor/bin/testbench workbench:build
php vendor/bin/testbench db:seed --class='Workbench\Database\Seeders\GuideDemoSeeder'
php vendor/bin/testbench serve --port=8124
```

The seeder runs once on a fresh build (rebuild to start over). Log in at
`/cms` as `admin@example.com` / `password`. The other people
(`sari@`, `budi@`, `maya@kopikita.studio`, same password) are an Editor,
an Author and a Translator.

## 2. Take the shots

Needs Node 18+ and `playwright-core` (or `playwright`) installed anywhere;
point `NODE_PATH` at that `node_modules`. No browser download is needed
when Chromium is already installed.

```bash
NODE_PATH=/path/to/node_modules node workbench/guide-screenshots/shoot.mjs           # every shot file
NODE_PATH=/path/to/node_modules node workbench/guide-screenshots/shoot.mjs welcome   # shots/welcome.mjs
```

| Variable | Default |
| --- | --- |
| `BASE_URL` | `http://127.0.0.1:8124` |
| `OUT_DIR` | `guide/images` in this repository |
| `CHROMIUM_PATH` | `/opt/pw-browsers/chromium-1194/chrome-linux/chrome` |
| `APP_URL` | `http://localhost:8000` (the server's; requests to it go to `BASE_URL`) |
| `TIMEZONE` | `Asia/Jakarta` (the demo site's) |

Each image's size is printed; `!` marks one over 120 KB. Shots are
1280×800 at 2× and saved as WebP (quality 0.82, at most 1600 px wide),
cropped to the shot's clip plus 16 px.

## Shot files

`shots/<guide-page>.mjs` default-exports a list of shots:

```js
export default [{
    name: 'entries-create',                 // file name, without .webp
    url: '/cms/collections/articles/entries/create',
    as: 'editor',                           // admin (default), editor, author, translator, or null (logged out)
    viewport: { width: 1280, height: 800 },
    before: async (page, h) => { await h.click('text=New entry'); },
    mark: ['#title', { selector: 'text=Publish', label: '1' }],
    clip: 'main',                           // selector, [selectors] (their union), {x, y, width, height} or 'viewport'
    padding: 16,
}];
```

Helpers `h`: `click`, `fill`, `hover`, `hide` (e.g. something
time-sensitive), `waitIdle`, `mark(selector, label?)` (a rose outline,
with an optional numbered badge) and `clearMarks()`. Clips stay inside
the viewport when they fit; give a shot a taller `viewport` rather than
shooting the full page (which resizes it and closes open menus).

## Naming

`<guide-page>-<what>.webp`, e.g. `welcome-sidebar.webp`,
`entries-publish-menu.webp`. The English and Indonesian guide share the
same images: the admin itself is in English.
