<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Spatie\ResponseCache\Replacers\Replacer;
use Symfony\Component\HttpFoundation\Response;

/**
 * Gives each visitor of a kept page the nonce of their own request, as
 * CsrfTokenReplacer does the CSRF token: the nonce the page was rendered
 * with is kept as a placeholder, in the page and in its
 * Content-Security-Policy header, and the request's (SiteSecurityHeaders
 * made it) put back when the page is served. So the site's policy keeps a
 * new nonce on every request with the page cache on. The CMS adds it to
 * `responsecache.replacers`.
 *
 * @api
 */
class CspNonceReplacer implements Replacer
{
    protected const PLACEHOLDER = '__sunrice_csp_nonce__';

    protected const HEADERS = ['Content-Security-Policy', 'Content-Security-Policy-Report-Only'];

    public function prepareResponseToCache(Response $response): void
    {
        $nonce = $this->nonce();
        if ($nonce !== '') {
            $this->swap($response, $nonce, self::PLACEHOLDER);
        }
    }

    public function replaceInCachedResponse(Response $response): void
    {
        $this->swap($response, self::PLACEHOLDER, $this->nonce());
    }

    private function swap(Response $response, string $from, string $to): void
    {
        $content = $response->getContent();
        if (is_string($content) && str_contains($content, $from)) {
            $response->setContent(str_replace($from, $to, $content));
        }
        foreach (self::HEADERS as $header) {
            $value = $response->headers->get($header);
            if (is_string($value) && str_contains($value, $from)) {
                $response->headers->set($header, str_replace($from, $to, $value));
            }
        }
    }

    private function nonce(): string
    {
        return SiteCsp::nonce();
    }
}
