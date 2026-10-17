<?php

declare(strict_types=1);

namespace Sunrice\Mcp;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Laravel\Mcp\Server;
use Laravel\Mcp\Server\Attributes\Instructions;
use Laravel\Mcp\Server\Attributes\Name;
use Laravel\Mcp\Server\Attributes\Version;
use Sunrice\Activity\ActivityLogger;
use Sunrice\Sunrice;

#[Name('Sunrice CMS')]
#[Version('1.0.0')]
#[Instructions(<<<'MD'
Manage a website built with Sunrice CMS (Laravel). You act as the user who owns the access token, with their permissions.

How the site is organised:
- Collections are content types (pages, articles…); each has a blueprint (its fields) and entries.
- Entries have one translation per language (title, slug, field data, SEO). Edits are drafts until published.
- Taxonomies hold terms (categories, tags) attached to collections. Globals are site-wide values; menus are navigation.
- Templates are Blade views that render pages.

Start with get_site_info: handles, languages, field types and your permissions.
- To change content: get_entry, then update_entry (only the keys you send change) with publish: true to put it live.
- To change structure: get_blueprint, then save_blueprint, then save_collection.
- Before touching templates, call get_template_guide, then read_template / write_template / render_page.
- For SEO: seo_audit, then fix the issues with update_entry (seo) and save_asset (alt text).

Translating (get_site_info → languages: main is the source, the other available languages are translations):
- Entries: translate_entry (machine translation, when the site has an API key), or translate yourself and save with update_entry locale (title, slug, data, seo). get_entry shows each language and missing_languages; seo_audit lists entries missing a translation. Only translatable fields need a value; the rest are shared with the main language.
- Listing pages: get_listing, then save_listing with locale (title, intro, data, seo).
- Terms: save_term with translations {locale: {name, slug, data, seo, is_ready}}. Another language is shown on the site once it is Ready (new ones are, unless is_ready: false).
- Globals: save_global with locale and values.
- Terms and globals work like entries: only translatable fields have a value per language; the rest are shared with the main language.
- Menus: save_menu item labels {locale: text} (empty = the target's title in that language).
- Collection and taxonomy names: save_collection / save_taxonomy settings.titles {locale: name}.
- Whole site at once: run_command sunrice:translate (entries, terms, globals, menus and language files; entries become drafts to review).
- Not translatable per language: form labels and messages, asset alt text and captions.

Everything you change is recorded in the activity log under your user, with source "ai" and your access token's name. get_activity reads the log (if you have the "View the activity log" permission): use it to answer "what changed recently?" or "what did you do?" (mine: true).

When the user reports an error or a broken page, read_error_log shows the recent errors from the Laravel log (if you have the "Let AI agents read the error log" permission): explain the likely cause and recommend a fix. Don't change code or settings to fix it without asking.

Ask the user before deleting anything or publishing large changes. Use read_docs for details (it needs the "Read the developer docs" permission).
MD)]
class SunriceServer extends Server
{
    /** All tools in one list: clients see everything on the first page. */
    public int $defaultPaginationLength = 50;

    protected array $tools = [
        Tools\GetSiteInfo::class,
        Tools\ReadDocs::class,
        Tools\ListEntries::class,
        Tools\GetEntry::class,
        Tools\CreateEntry::class,
        Tools\UpdateEntry::class,
        Tools\ManageEntry::class,
        Tools\EntryRevisions::class,
        Tools\TranslateEntry::class,
        Tools\SaveCollection::class,
        Tools\GetListing::class,
        Tools\SaveListing::class,
        Tools\GetBlueprint::class,
        Tools\SaveBlueprint::class,
        Tools\SaveTaxonomy::class,
        Tools\ListTerms::class,
        Tools\SaveTerm::class,
        Tools\Reorder::class,
        Tools\GetGlobal::class,
        Tools\SaveGlobal::class,
        Tools\GetMenu::class,
        Tools\SaveMenu::class,
        Tools\ListAssets::class,
        Tools\SaveAsset::class,
        Tools\ManageAsset::class,
        Tools\GetForm::class,
        Tools\SaveForm::class,
        Tools\DeleteSubmissions::class,
        Tools\DeleteStructure::class,
        Tools\UpdateSiteSettings::class,
        Tools\SeoAudit::class,
        Tools\GetActivity::class,
        Tools\ReadErrorLog::class,
        Tools\GetTemplateGuide::class,
        Tools\ReadTemplate::class,
        Tools\WriteTemplate::class,
        Tools\RenderPage::class,
        Tools\RunCommand::class,
    ];

    /**
     * Adds the tools packages registered. Over stdio (`php artisan
     * mcp:start sunrice`, an agent on the server itself) there is no
     * token: act as sunrice.mcp.local_user.
     */
    protected function boot(): void
    {
        // Tools of packages (Sunrice::registerMcpTool()), after Sunrice's own.
        $this->tools = array_values(array_unique([...$this->tools, ...app(Sunrice::class)->mcpTools()]));

        $guard = Auth::guard(config('sunrice.auth.guard', 'web'));
        $email = config('sunrice.mcp.local_user');
        if ($guard->user() !== null || ! app()->runningInConsole() || ! is_string($email) || $email === '') {
            return;
        }

        /** @var class-string<Model> $model */
        $model = config('sunrice.auth.user_model');
        $user = $model::query()->where('email', $email)->first();
        if ($user instanceof Authenticatable) {
            $guard->setUser($user);
            Auth::shouldUse(config('sunrice.auth.guard', 'web'));
            app(ActivityLogger::class)->actingVia('ai', 'local (mcp:start)');
        }
    }
}
