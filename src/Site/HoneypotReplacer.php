<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Spatie\Honeypot\Honeypot;
use Spatie\ResponseCache\Replacers\Replacer;
use Symfony\Component\HttpFoundation\Response;

/**
 * Gives each visitor of a kept page their own honeypot fields, as
 * CsrfTokenReplacer does the CSRF token: the time the form was shown
 * (`valid_from`) is the moment the kept page is served, not when it was
 * rendered, so the honeypot's "too fast" check still turns away bots,
 * and the trap field's random name differs per visitor. The CMS adds it
 * to `responsecache.replacers` with `sunrice-cms.cache.pages` on.
 *
 * @api
 */
class HoneypotReplacer implements Replacer
{
    protected const NAME = '__sunrice_honeypot_name__';

    protected const VALID_FROM = '__sunrice_honeypot_valid_from__';

    public function prepareResponseToCache(Response $response): void
    {
        $content = $response->getContent();
        $honeypot = $this->honeypot();
        if (! is_string($content) || $content === '' || $honeypot === null) {
            return;
        }
        // The time shown: <input name="valid_from" ... value="…">.
        $content = (string) preg_replace('/(name="'.preg_quote($honeypot->validFromFieldName(), '/').'"[^>]*?\svalue=")[^"]*(")/s', '${1}'.self::VALID_FROM.'${2}', $content);
        // The trap's random name (its id, name and wrapper's id).
        if ($honeypot->randomizeNameFieldName()) {
            $content = (string) preg_replace('/\b'.preg_quote($honeypot->unrandomizedNameFieldName(), '/').'_[A-Za-z0-9]{16}\b/', self::NAME, $content);
        }
        $response->setContent($content);
    }

    public function replaceInCachedResponse(Response $response): void
    {
        $content = $response->getContent();
        $honeypot = $this->honeypot();
        if (! is_string($content) || $honeypot === null || (! str_contains($content, self::VALID_FROM) && ! str_contains($content, self::NAME))) {
            return;
        }
        $response->setContent(str_replace([self::VALID_FROM, self::NAME], [$honeypot->encryptedValidFrom(), $honeypot->nameFieldName()], $content));
    }

    private function honeypot(): ?Honeypot
    {
        return config('honeypot.enabled') === true ? app(Honeypot::class) : null;
    }
}
