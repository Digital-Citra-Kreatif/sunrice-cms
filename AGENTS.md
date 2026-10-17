# Working on Sunrice CMS

The guides in `docs/` and the existing tests describe how Sunrice behaves. Keep changes consistent with them, and update the docs in the same pull request when behaviour changes.

## Rules

- One change per branch and pull request, with a title that says what it does.
- Don't add Composer or npm packages beyond the approved list below. If one seems needed, explain why in the PR instead of adding it.
- Every change ships Pest tests (Orchestra Testbench). Before opening a PR run: `composer test`, `composer lint`, `composer analyse`, and for frontend changes `npm run typecheck && npm run test:frontend && npm run build`.
- Never modify a released migration — add a new migration.
- Keep backwards compatibility for developer-facing API (config keys, Blade components and helpers, service provider registration methods, permission and route names). Record breaking changes in `CHANGELOG.md` and `docs/upgrading.md`.
- Prefer the simplest implementation that is good enough. Don't implement anything listed under "Out of scope" below without agreement first.
- Update `docs/` when adding developer-facing API.
- Do not commit `node_modules/`, `vendor/`, or `.env`. Do commit compiled admin assets in `dist/`.

## Approved dependencies

- Composer: `spatie/laravel-package-tools`, `inertiajs/inertia-laravel`, `spatie/laravel-permission`, `intervention/image` (v3), `spatie/simple-excel`, `spatie/laravel-honeypot`, `spatie/laravel-responsecache`, `spatie/laravel-sitemap`, `symfony/html-sanitizer`. Dev: `orchestra/testbench`, `pestphp/pest`, `pestphp/pest-plugin-laravel`, `laravel/pint`, `larastan/larastan`.
- npm (admin only): React 19, Inertia, TypeScript, Vite, Tailwind v4, shadcn/ui components (with their Radix dependencies), `lucide-react`, `@tanstack/react-table`, `@dnd-kit/*`, TipTap, `sonner`, `date-fns`.
- Deliberately not used: translatable packages (translations are Sunrice's own records), nested-set/sortable packages (`parent_id` and `sort_order` are enough), `spatie/laravel-medialibrary` (Sunrice has a shared asset library).

## Out of scope

Admin JavaScript plugins (custom fields are PHP-only compositions of built-in types), a headless/REST API, frontend search, multisite, nested page URLs, expiry/unpublish dates and scheduled updates to live content, manual image cropping and focal points, automatically generated menus, and lifecycle/query extension hooks.

## Conventions

- PHP namespace `Sunrice\` → `src/`; tests `Sunrice\Tests\` → `tests/`. Every PHP file starts `declare(strict_types=1);`.
- Config `config/sunrice.php` (key `sunrice`); views `sunrice::`; tables prefixed `sunrice_`.
- Permission names `sunrice.<area>.<id>.<action>` or `sunrice.<action>`; admin route names `sunrice.admin.<area>.<action>`; frontend `sunrice.frontend.*`.
- Write operations live in single-purpose action classes `src/Actions/<Area>/` with a public `handle()`. Controllers stay thin.
- Admin JS/TS in `resources/js` (TypeScript, React 19, alias `@/`).

## Commands

```bash
composer test      # Pest
composer lint      # Pint (test mode)
composer format    # Pint (fix)
composer analyse   # Larastan
npm run test:frontend   # node tests for admin helpers
npm run build      # admin assets -> dist/
vendor/bin/testbench serve   # run the workbench CMS locally
```
