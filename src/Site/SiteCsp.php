<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Illuminate\Foundation\Vite;
use Illuminate\Http\Request;
use Sunrice\Admin\Security\Captcha;
use Sunrice\Admin\Security\ContentSecurityPolicy;

/**
 * The site's optional Content-Security-Policy (`sunrice-cms.site.csp`, off
 * by default), sent by SiteSecurityHeaders: scripts and styles from the
 * site's origin or with the request's nonce, images and media from the
 * site and the media disk, the captcha's sources when it's set up, no
 * plugins, framing by the site itself only, plus the sources the config
 * adds.
 *
 * The nonce is Laravel's Vite nonce (Vite::useCspNonce()), new on every
 * request: `@vite` tags carry it, templates print it with `cms_nonce()`,
 * the CMS's own inline styles and the captcha's script have it, and Site
 * code's `<script>` and `<style>` tags get it (withNonce()). Kept pages
 * (the page cache) get the nonce of the request that serves them
 * (CspNonceReplacer), so caching doesn't freeze one.
 *
 * @api
 */
final class SiteCsp
{
    /** Whether the site sends its policy: `site.csp.enabled` (and no policy string of the app's own in `site.headers`). */
    public static function enabled(): bool
    {
        $headers = config('sunrice-cms.site.headers', SiteSecurityHeaders::DEFAULTS);
        $custom = is_array($headers) ? ($headers[ContentSecurityPolicy::HEADER] ?? null) : null;

        return ! (is_string($custom) && trim($custom) !== '')
            && filter_var(config('sunrice-cms.site.csp.enabled', false), FILTER_VALIDATE_BOOL);
    }

    /** Whether the policy allows inline code by nonce (`site.csp.nonce`, true by default). */
    public static function usesNonce(): bool
    {
        return self::enabled() && filter_var(config('sunrice-cms.site.csp.nonce', true), FILTER_VALIDATE_BOOL);
    }

    /** Report violations without blocking anything (`site.csp.report_only`). */
    public static function reportOnly(): bool
    {
        return filter_var(config('sunrice-cms.site.csp.report_only', false), FILTER_VALIDATE_BOOL);
    }

    /**
     * The request's nonce while the site's policy uses one, else '':
     * `<script nonce="{{ cms_nonce() }}">` (cms_nonce()). With a policy of
     * your own, read yours (Vite::cspNonce()).
     */
    public static function nonce(): string
    {
        $nonce = self::usesNonce() ? app(Vite::class)->cspNonce() : null;

        return is_string($nonce) ? $nonce : '';
    }

    /**
     * Trusted HTML (Site code) with the request's nonce on each `<script>`
     * and `<style>` tag that has none, so its inline scripts run under the
     * policy. Unchanged when there's no nonce. Inline event handlers
     * (`onclick=""`) and `javascript:` links still don't run.
     */
    public static function withNonce(string $html): string
    {
        $nonce = self::nonce();
        if ($nonce === '' || $html === '') {
            return $html;
        }

        return (string) preg_replace('/<(script|style)\b(?![^>]*\snonce\s*=)/i', '<$1 nonce="'.e($nonce).'"', $html);
    }

    /** The site's policy for a request, with its nonce (null: none). */
    public static function policy(Request $request, ?string $nonce): ContentSecurityPolicy
    {
        $policy = ContentSecurityPolicy::make()
            ->add('default-src', "'self'")
            ->add('script-src', "'self'")
            ->add('style-src', "'self'")
            // style="" attributes (the draft banner, rich text, Site code snippets): allowed, <style> elements need the nonce.
            ->add('style-src-attr', "'unsafe-inline'")
            ->add('img-src', ["'self'", 'data:'])
            ->add('font-src', ["'self'", 'data:'])
            ->add('media-src', "'self'")
            ->add('connect-src', "'self'")
            ->add('frame-src', "'self'")
            ->add('object-src', "'none'")
            ->add('base-uri', "'self'")
            ->add('form-action', "'self'")
            ->add('frame-ancestors', "'self'");
        if ($nonce !== null && $nonce !== '') {
            $policy->nonce($nonce);
        }

        $self = ContentSecurityPolicy::origin($request->getSchemeAndHttpHost());
        // The assets' origin (ASSET_URL, a CDN).
        $assets = config('app.asset_url');
        if (($origin = ContentSecurityPolicy::origin(is_string($assets) ? $assets : null)) !== null && $origin !== $self) {
            $policy->add('script-src', $origin)->add('style-src', $origin)->add('img-src', $origin)->add('font-src', $origin)->add('media-src', $origin);
        }
        // The media disk (S3, a CDN): its images, videos and audio.
        if (($media = ContentSecurityPolicy::mediaOrigin()) !== null && $media !== $self) {
            $policy->add('img-src', $media)->add('media-src', $media);
        }
        // The captcha's widget, when it's set up.
        $policy->addMany(app(Captcha::class)->cspSources());
        // The app's Vite dev server (public/hot) while developing templates.
        $vite = app(Vite::class);
        if ($vite->isRunningHot()) {
            $hot = ContentSecurityPolicy::origin(trim((string) @file_get_contents($vite->hotFile())));
            if ($hot !== null) {
                $policy->add('script-src', $hot)->add('style-src', $hot)->add('img-src', $hot)->add('font-src', $hot)
                    ->add('connect-src', [$hot, (string) preg_replace('/^http/', 'ws', $hot)]);
            }
        }

        $policy->addMany(config('sunrice-cms.site.csp.sources', []));
        $report = config('sunrice-cms.site.csp.report_uri');
        if (is_string($report) && trim($report) !== '') {
            $policy->add('report-uri', $report);
        }

        return $policy;
    }
}
