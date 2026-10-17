<?php

declare(strict_types=1);

namespace Sunrice\Http\Controllers\Admin;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Notification;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;
use Sunrice\Actions\Settings\SaveSiteSettings;
use Sunrice\Events\ContentChanged;
use Sunrice\Models\Asset;
use Sunrice\Models\Collection;
use Sunrice\Models\Entry;
use Sunrice\Models\EntryTranslation;
use Sunrice\Models\Setting;
use Sunrice\Models\Taxonomy;
use Sunrice\Notifications\TestMail;
use Sunrice\Support\Branding;
use Sunrice\Support\Captcha;
use Sunrice\Support\SeoFields;
use Sunrice\Support\SiteSettings;
use Throwable;

class SettingsController extends Controller
{
    public function edit(): Response
    {
        Gate::authorize('sunrice.settings.edit');

        $homepage = Entry::query()->with('translations')->find((int) Setting::get('homepage_entry_id', 0));

        return Inertia::render('Settings/Edit', [
            'settings' => SiteSettings::current(),
            'homepage' => $homepage === null ? null : [
                'id' => $homepage->id,
                'title' => $homepage->mainTranslation()->title ?? "Entry #{$homepage->id}",
                'collection' => '',
            ],
            'timezones' => timezone_identifiers_list(),
            'mainLocked' => EntryTranslation::query()->exists(),
            'brandLogo' => ($logo = is_numeric(config('sunrice.branding.logo')) ? Asset::query()->find((int) config('sunrice.branding.logo')) : null) === null
                ? null
                : ['id' => $logo->id, 'url' => $logo->url(), 'filename' => $logo->filename],
            'mail' => static::mailInfo(),
            // Settings → Comments: who gets the new-comment emails.
            'roles' => Role::query()->orderBy('name')->pluck('name'),
            'captchaConfigured' => Captcha::configured(),
            'fonts' => collect(Branding::FONTS)->map(fn (array $font, string $key) => ['value' => $key, 'label' => $font[0]])->values(),
        ]);
    }

    public function update(Request $request, SaveSiteSettings $save): RedirectResponse
    {
        Gate::authorize('sunrice.settings.edit');

        $save->handle($request->all());

        return back()->with('success', 'Settings saved.');
    }

    /**
     * Settings → SEO: which fields fill each collection's and taxonomy's
     * meta title, description and share image when a page leaves them empty.
     */
    public function seo(): Response
    {
        Gate::authorize('sunrice.settings.edit');

        $row = function (Collection|Taxonomy $model, string $kind): array {
            $settings = (array) $model->setting('seo', []);
            $blueprint = $model->blueprint;

            return [
                'kind' => $kind,
                'id' => $model->id,
                'title' => $model->title,
                'blueprint' => $blueprint?->title,
                'fields' => SeoFields::candidates($blueprint),
                'chosen' => array_map(fn (string $role) => $settings[$role.'_field'] ?? '', array_combine(SeoFields::ROLES, SeoFields::ROLES)),
                // What applies now (the choice, or the automatic pick).
                'resolved' => SeoFields::resolve($blueprint, $settings),
                'defaults' => ['description' => $settings['description'] ?? null],
            ];
        };

        $site = SiteSettings::current();
        $image = $site['seo']['image'] ?? null;
        $asset = is_numeric($image) ? Asset::query()->find((int) $image) : null;

        return Inertia::render('Settings/Seo', [
            'site' => $site['seo'] ?? [],
            'siteName' => (string) config('app.name'),
            'shareImage' => $asset === null ? null : ['id' => $asset->id, 'url' => $asset->url('thumbnail'), 'filename' => $asset->filename],
            'collections' => Collection::query()->with('blueprint')->orderBy('title')->get()
                ->filter(fn (Collection $c) => $c->hasSinglePages())
                ->map(fn (Collection $c) => $row($c, 'collection'))->values(),
            'taxonomies' => Taxonomy::query()->with('blueprint')->orderBy('title')->get()
                ->filter(fn (Taxonomy $t) => (bool) $t->setting('has_archive'))
                ->map(fn (Taxonomy $t) => $row($t, 'taxonomy'))->values(),
        ]);
    }

    public function updateSeo(Request $request): RedirectResponse
    {
        Gate::authorize('sunrice.settings.edit');

        $validated = $request->validate([
            ...SaveSiteSettings::seoRules(),
            'items' => ['present', 'array'],
            'items.*.kind' => ['required', 'in:collection,taxonomy'],
            'items.*.id' => ['required', 'integer'],
            'items.*.chosen' => ['array'],
            'items.*.chosen.*' => ['nullable', 'string', 'max:100', 'regex:/^[A-Za-z0-9_-]*$/'],
        ]);

        // Search engines & sharing (site-wide).
        if (array_key_exists('seo', $validated)) {
            $stored = SiteSettings::stored();
            $stored['seo'] = SaveSiteSettings::seo((array) $validated['seo']);
            SiteSettings::save($stored);
        }

        foreach ($validated['items'] as $item) {
            $model = $item['kind'] === 'collection' ? Collection::query()->find($item['id']) : Taxonomy::query()->find($item['id']);
            if ($model === null) {
                continue;
            }
            $seo = (array) $model->setting('seo', []);
            foreach (SeoFields::ROLES as $role) {
                $value = $item['chosen'][$role] ?? '';
                if ($value === '') {
                    unset($seo[$role.'_field']);
                } else {
                    $seo[$role.'_field'] = $value;
                }
            }
            $settings = (array) $model->settings;
            $settings['seo'] = $seo;
            $model->settings = $settings;
            $model->save();
        }
        ContentChanged::dispatch('seo_fields_saved');

        return back()->with('success', 'SEO settings saved.');
    }

    /** Send a test email right away, so SMTP problems show up here. */
    public function testMail(Request $request): RedirectResponse
    {
        Gate::authorize('sunrice.settings.edit');

        $email = (string) $request->validate(['test_email' => ['required', 'email', 'max:255']])['test_email'];

        try {
            Notification::route('mail', $email)->notifyNow(new TestMail);
        } catch (Throwable $e) {
            report($e);

            return back()->withErrors(['test_email' => 'Sending failed: '.$e->getMessage()]);
        }

        return back()->with('success', static::mailInfo()['delivers']
            ? "Test email sent to {$email}. Check the inbox (and the spam folder)."
            : "Test email for {$email} written to the log: the current mailer doesn't deliver email.");
    }

    /**
     * How mail is configured (from .env / config/mail.php), shown next to
     * the test form. No passwords.
     *
     * @return array<string, mixed>
     */
    public static function mailInfo(): array
    {
        $mailer = (string) config('mail.default');
        $transport = (string) config("mail.mailers.{$mailer}.transport", $mailer);

        return [
            'mailer' => $mailer,
            'transport' => $transport,
            'host' => $transport === 'smtp' ? config("mail.mailers.{$mailer}.host") : null,
            'port' => $transport === 'smtp' ? config("mail.mailers.{$mailer}.port") : null,
            'from' => config('mail.from.address'),
            'from_name' => config('mail.from.name'),
            // These don't deliver anything.
            'delivers' => ! in_array($transport, ['log', 'array'], true),
        ];
    }
}
