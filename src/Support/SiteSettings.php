<?php

declare(strict_types=1);

namespace Sunrice\Support;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cache;
use Sunrice\Models\Setting;
use Throwable;

/**
 * Site settings edited in the admin (Settings page), stored as one
 * `site` row in sunrice_settings and applied over the config at boot,
 * so config/.env values are the defaults:
 *
 *   name                       → app.name
 *   description                → sunrice.seo.description
 *   timezone                   → app.timezone
 *   locales.main/available/names → sunrice.locales.*
 *   seo.noindex/twitter_site/image/title_suffix/title_separator → sunrice.seo.*
 *   code.head/body_start/body_end  → sunrice.code.*
 *   security.two_factor        → sunrice.auth.two_factor
 *   comments.*                 → sunrice.comments.*
 */
class SiteSettings
{
    public const CACHE_KEY = 'sunrice:site-settings';

    /** Stored path => config key. */
    public const CONFIG = [
        'name' => 'app.name',
        'description' => 'sunrice.seo.description',
        'timezone' => 'app.timezone',
        'locales.main' => 'sunrice.locales.main',
        'locales.available' => 'sunrice.locales.available',
        'locales.names' => 'sunrice.locales.names',
        'seo.noindex' => 'sunrice.seo.noindex',
        'seo.twitter_site' => 'sunrice.seo.twitter_site',
        'seo.image' => 'sunrice.seo.image',
        'seo.title_suffix' => 'sunrice.seo.title_suffix',
        'seo.title_separator' => 'sunrice.seo.title_separator',
        'code.head' => 'sunrice.code.head',
        'code.body_start' => 'sunrice.code.body_start',
        'code.body_end' => 'sunrice.code.body_end',
        'branding.name' => 'sunrice.branding.name',
        'branding.tagline' => 'sunrice.branding.tagline',
        'branding.logo' => 'sunrice.branding.logo',
        'branding.font' => 'sunrice.branding.font',
        'branding.color' => 'sunrice.branding.color',
        'security.two_factor' => 'sunrice.auth.two_factor',
        'comments.moderation' => 'sunrice.comments.moderation',
        'comments.require_login' => 'sunrice.comments.require_login',
        'comments.captcha' => 'sunrice.comments.captcha',
        'comments.rate_limit' => 'sunrice.comments.rate_limit',
        'comments.close_after_days' => 'sunrice.comments.close_after_days',
        'comments.max_depth' => 'sunrice.comments.max_depth',
        'comments.notify' => 'sunrice.comments.notify',
        'comments.notify_roles' => 'sunrice.comments.notify_roles',
        'comments.notify_emails' => 'sunrice.comments.notify_emails',
        'comments.reply_notifications' => 'sunrice.comments.reply_notifications',
    ];

    /**
     * The stored settings (empty before anything is saved or before the
     * tables exist, e.g. while installing).
     *
     * @return array<string, mixed>
     */
    public static function stored(): array
    {
        try {
            return (array) Cache::rememberForever(static::CACHE_KEY, fn () => (array) Setting::get('site', []));
        } catch (Throwable) {
            return [];
        }
    }

    /**
     * Every setting with its effective value (stored, else config).
     *
     * @return array<string, mixed>
     */
    public static function current(): array
    {
        $values = [];
        foreach (static::CONFIG as $path => $configKey) {
            Arr::set($values, $path, config($configKey));
        }

        return $values;
    }

    /**
     * Lay the stored settings over the config.
     */
    public static function apply(): void
    {
        $stored = static::stored();

        foreach (static::CONFIG as $path => $configKey) {
            if (Arr::has($stored, $path)) {
                config([$configKey => Arr::get($stored, $path)]);
            }
        }

        $timezone = config('app.timezone');
        if (is_string($timezone) && in_array($timezone, timezone_identifiers_list(), true)) {
            date_default_timezone_set($timezone);
        }
    }

    /**
     * @param  array<string, mixed>  $values
     */
    public static function save(array $values): void
    {
        Setting::set('site', $values);
        Cache::forget(static::CACHE_KEY);
        static::apply();
    }
}
