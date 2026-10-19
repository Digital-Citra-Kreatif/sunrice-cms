<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Spatie\ResponseCache\Serializers\JsonSerializer;
use Symfony\Component\HttpFoundation\Response;

/**
 * Keeps pages without their cookies: the session cookie of the visitor
 * who happened to be first must never reach anyone else. Each visitor
 * gets their own when a kept page is served.
 *
 * @internal
 */
final class PageCacheSerializer extends JsonSerializer
{
    public function serialize(Response $response): string
    {
        $kept = clone $response;
        $kept->headers->remove('Set-Cookie');

        return parent::serialize($kept);
    }
}
