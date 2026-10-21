<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Closure;
use Illuminate\Contracts\Validation\DataAwareRule;
use Illuminate\Contracts\Validation\ValidationRule;
use Sunrice\Cms\Models\Redirect;
use Sunrice\Cms\Support\Locales;

/**
 * Checks a redirect's from path, or with $from (the name of the input
 * holding the from path) its target: `*` at most once there, only with a
 * wildcard from (`/blog/*`), and never a target its own from takes (a
 * loop: /blog/* → /blog/archive/*).
 *
 * @internal
 */
final class RedirectRule implements DataAwareRule, ValidationRule
{
    /** @var array<mixed> */
    private array $data = [];

    public function __construct(private readonly ?string $from = null) {}

    /** @param array<mixed> $data */
    public function setData(array $data): static
    {
        $this->data = $data;

        return $this;
    }

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (! is_string($value) || $value === '') {
            return;
        }
        if ($this->from === null) {
            if (! Redirect::validFrom($value)) {
                $fail(__('Use a path on this site starting with /, with * only at its end after a / (like /blog/*).'));
            }

            return;
        }
        $from = $this->data[$this->from] ?? null;
        $from = is_string($from) ? Redirect::normalizePath($from) : '';
        $wildcard = Redirect::wildcard($from);
        if (substr_count($value, Redirect::WILDCARD) > 1) {
            $fail(__('Use * at most once.'));
        } elseif (str_contains($value, Redirect::WILDCARD) && ! $wildcard) {
            $fail(__('A * here needs a From ending in /*, whose rest it stands for.'));
        } elseif (str_contains($value, Redirect::WILDCARD) && ! str_contains($value, '/'.Redirect::WILDCARD)) {
            $fail(__('Put the * after a / (like /journal/*).'));
        } elseif ($from !== '' && self::loops($from, $value, (bool) ($this->data['every_language'] ?? false))) {
            $fail(__('This would send visitors round in a loop: From takes this address too.'));
        }
    }

    /** Whether the target is an address the from path takes itself. */
    private static function loops(string $from, string $to, bool $everyLanguage): bool
    {
        if (! str_starts_with($to, '/') || str_starts_with($to, '//')) {
            return false;
        }
        $path = Redirect::normalizePath((string) strtok(str_replace(Redirect::WILDCARD, 'x', $to), '?#'));
        if (! Redirect::wildcard($from)) {
            return $path === $from;
        }
        $prefix = Redirect::prefixOf($from);
        if (str_starts_with($path, $prefix) && strlen($path) > strlen($prefix)) {
            return true;
        }
        if (! $everyLanguage) {
            return false;
        }
        $rest = Locales::split($path)[1];
        $restPrefix = Redirect::prefixOf(Locales::split($from)[1]);

        return str_starts_with($rest, $restPrefix) && strlen($rest) > strlen($restPrefix);
    }
}
