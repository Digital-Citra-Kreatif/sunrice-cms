<?php

declare(strict_types=1);

namespace Sunrice\Cms\Fields\Types;

use Sunrice\Cms\Fields\Field;
use Sunrice\Cms\Fields\FieldType;
use Sunrice\Cms\Fields\HydrationContext;
use Sunrice\Cms\Support\SafeUrl;

/**
 * A link: an address, its text and whether it opens in a new tab.
 * Stored {url, label, new_tab}; only web, mail and phone links and paths
 * on the site are accepted, so a link can never run script.
 */
final class Link extends FieldType
{
    public function type(): string
    {
        return 'link';
    }

    public function rules(Field $field): array
    {
        return ['array:url,label,new_tab'];
    }

    public function nestedRules(Field $field, string $key, mixed $value): array
    {
        return [
            "{$key}.url" => [$field->required ? 'required' : 'nullable', 'string', 'max:2048', SafeUrl::rule()],
            "{$key}.label" => ['nullable', 'string', 'max:255'],
            "{$key}.new_tab" => ['nullable', 'boolean'],
        ];
    }

    public function normalize(mixed $value, Field $field): mixed
    {
        $url = is_array($value) && is_string($value['url'] ?? null) ? trim($value['url']) : '';
        if ($url === '') {
            return null;
        }

        return [
            'url' => $url,
            'label' => is_string($value['label'] ?? null) && $value['label'] !== '' ? $value['label'] : null,
            'new_tab' => filter_var($value['new_tab'] ?? false, FILTER_VALIDATE_BOOLEAN),
        ];
    }

    /** @return array{url: string, label: string|null, new_tab: bool}|null */
    public function hydrate(mixed $value, Field $field, HydrationContext $context): ?array
    {
        $url = is_array($value) && is_string($value['url'] ?? null) ? $value['url'] : null;
        // Checked again: a link must never print an unsafe address.
        if ($url === null || $url === '' || ! SafeUrl::isSafe($url)) {
            return null;
        }

        return [
            'url' => $url,
            'label' => is_string($value['label'] ?? null) ? $value['label'] : null,
            'new_tab' => ($value['new_tab'] ?? false) === true,
        ];
    }

    public function translatableByDefault(): bool
    {
        return true;
    }
}
