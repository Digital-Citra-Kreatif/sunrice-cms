<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Spatie\Honeypot\Events\SpamDetectedEvent;
use Spatie\Honeypot\SpamResponder\SpamResponder;
use Symfony\Component\HttpFoundation\Response;

/**
 * The honeypot only checks requests that carry its fields; a bot posting
 * straight to a form wouldn't. Form posts must carry them.
 *
 * @internal
 */
final class RequireHoneypot
{
    public function __construct(private readonly SpamResponder $responder) {}

    public function handle(Request $request, Closure $next): Response
    {
        $name = config('honeypot.name_field_name');
        $validFrom = config('honeypot.valid_from_field_name');
        $fields = array_keys($request->all());
        $carries = (is_string($name) && $name !== '' && array_filter($fields, fn (int|string $key): bool => Str::startsWith((string) $key, $name)) !== [])
            || (is_string($validFrom) && $request->has($validFrom));
        if (config('honeypot.enabled') !== true || $carries) {
            /** @var Response */
            return $next($request);
        }
        event(new SpamDetectedEvent($request));

        /** @var Response */
        return $this->responder->respond($request, $next);
    }
}
