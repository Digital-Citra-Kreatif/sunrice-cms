<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;

/**
 * How often one visitor (IP address) may send a form or a comment: only
 * what's kept counts against the limit, so a visitor fixing a typo isn't
 * locked out, with a ceiling of ten times as many tries of any kind.
 * Over it, the visitor is sent back to the form with a message and what
 * they typed (JSON requests get a 429 with the message).
 *
 * @internal
 */
final class SendLimit
{
    /** The error key of the "sent too often" message. */
    public const ERROR = '_limit';

    /** Tries of any kind allowed per kept send. */
    private const TRIES = 10;

    public function __construct(private readonly string $key, private readonly int $perMinute) {}

    /**
     * Counts a try, and refuses it when the visitor sent too often.
     *
     * @throws ValidationException
     */
    public function check(string $locale, string $errorBag): void
    {
        $tries = $this->key.'|tries';
        $seconds = match (true) {
            RateLimiter::tooManyAttempts($this->key, $this->perMinute) => RateLimiter::availableIn($this->key),
            RateLimiter::tooManyAttempts($tries, $this->perMinute * self::TRIES) => RateLimiter::availableIn($tries),
            default => null,
        };
        RateLimiter::hit($tries, 60);
        if ($seconds !== null) {
            $e = ValidationException::withMessages([self::ERROR => Lang::get('sunrice-cms::site.forms.too_many', ['seconds' => max(1, $seconds)], $locale)])->errorBag($errorBag);
            $e->status = 429;

            throw $e;
        }
    }

    /** A send was kept: it counts against the limit. */
    public function sent(): void
    {
        RateLimiter::hit($this->key, 60);
    }
}
