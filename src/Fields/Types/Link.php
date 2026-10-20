<?php

declare(strict_types=1);

namespace Sunrice\Cms\Fields\Types;

use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Exists;
use Sunrice\Cms\Fields\Field;
use Sunrice\Cms\Fields\FieldType;
use Sunrice\Cms\Fields\HydrationContext;
use Sunrice\Cms\Fields\Reference;
use Sunrice\Cms\Fields\Schema;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Site\Site;
use Sunrice\Cms\Support\SafeUrl;

/**
 * A link: to an address, or to an entry of the site, with its text and
 * whether it opens in a new tab. Stored
 * {type: url|entry, url?, entry_id?, label, new_tab} (older values
 * without a type are addresses). Only web, mail and phone links and paths
 * on the site are accepted, so a link can never run script.
 *
 * Templates get {type, url, label, title, new_tab}: an entry link's URL
 * and title are the entry's in the page's language (its main one's page
 * when it isn't translated), and its URL is null while it isn't live.
 * Config: `collections` (handles entry links may point into; none: any).
 */
final class Link extends FieldType
{
    public const URL = 'url';

    public const ENTRY = 'entry';

    public function type(): string
    {
        return 'link';
    }

    public function rules(Field $field): array
    {
        return ['array:type,url,entry_id,label,new_tab'];
    }

    public function nestedRules(Field $field, string $key, mixed $value): array
    {
        $entry = is_array($value) && ($value['type'] ?? null) === self::ENTRY;

        return [
            "{$key}.type" => ['nullable', 'string', Rule::in([self::URL, self::ENTRY])],
            "{$key}.url" => $entry ? ['nullable'] : [$field->required ? 'required' : 'nullable', 'string', 'max:2048', SafeUrl::rule()],
            "{$key}.entry_id" => $entry ? [$field->required ? 'required' : 'nullable', 'integer', $this->exists($field)] : ['nullable'],
            "{$key}.label" => ['nullable', 'string', 'max:255'],
            "{$key}.new_tab" => ['nullable', 'boolean'],
        ];
    }

    public function normalize(mixed $value, Field $field): mixed
    {
        if (! is_array($value)) {
            return null;
        }
        $label = is_string($value['label'] ?? null) && trim($value['label']) !== '' ? $value['label'] : null;
        $newTab = filter_var($value['new_tab'] ?? false, FILTER_VALIDATE_BOOLEAN);
        if (($value['type'] ?? null) === self::ENTRY) {
            $id = is_numeric($value['entry_id'] ?? null) ? (int) $value['entry_id'] : 0;

            return $id > 0 ? ['type' => self::ENTRY, 'entry_id' => $id, 'label' => $label, 'new_tab' => $newTab] : null;
        }
        $url = is_string($value['url'] ?? null) ? trim($value['url']) : '';

        return $url === '' ? null : ['type' => self::URL, 'url' => $url, 'label' => $label, 'new_tab' => $newTab];
    }

    /** @return array{type: string, url: string|null, label: string|null, title: string|null, new_tab: bool}|null */
    public function hydrate(mixed $value, Field $field, HydrationContext $context): ?array
    {
        if (! is_array($value)) {
            return null;
        }
        $label = is_string($value['label'] ?? null) ? $value['label'] : null;
        $newTab = ($value['new_tab'] ?? false) === true;
        if (($value['type'] ?? null) === self::ENTRY) {
            $id = is_int($value['entry_id'] ?? null) ? $value['entry_id'] : 0;
            $translation = $id > 0 ? $context->entries([$id])->first() : null;
            $live = $translation !== null && $translation->isLive();

            return [
                'type' => self::ENTRY,
                // Not live (a preview shows drafts): no address to go to yet.
                'url' => $live ? app(Site::class)->urlIn($translation, $context->locale) : null,
                'label' => $label,
                'title' => $translation === null ? null : ($context->preview ? $translation->draft_title : $translation->title),
                'new_tab' => $newTab,
            ];
        }
        $url = is_string($value['url'] ?? null) ? $value['url'] : null;
        // Checked again: a link must never print an unsafe address.
        if ($url === null || $url === '' || ! SafeUrl::isSafe($url)) {
            return null;
        }

        return ['type' => self::URL, 'url' => $url, 'label' => $label, 'title' => null, 'new_tab' => $newTab];
    }

    public function references(mixed $value, Field $field): array
    {
        return is_array($value) && ($value['type'] ?? null) === self::ENTRY ? Reference::many(Reference::ENTRY, [$value['entry_id'] ?? null]) : [];
    }

    public function translatableByDefault(): bool
    {
        return true;
    }

    public function settings(): array
    {
        return [
            new Field('collections', 'select', 'Entry links from collections', instructions: 'None: any collection.', config: [
                'multiple' => true,
                'options' => Collection::query()->orderBy('title')->get()->map(fn (Collection $c): array => ['value' => $c->handle, 'label' => $c->title])->all(),
            ]),
        ];
    }

    public function toAdmin(Field $field, Schema $schema): array
    {
        return ['collections' => $field->configStrings('collections')] + parent::toAdmin($field, $schema);
    }

    private function exists(Field $field): Exists
    {
        $rule = Rule::exists((new Entry)->getTable(), 'id')->whereNull('deleted_at');
        $handles = $field->configStrings('collections');
        if ($handles !== []) {
            $ids = Collection::query()->whereIn('handle', $handles)->pluck('id')->all();
            $rule->whereIn('collection_id', $ids === [] ? [0] : $ids);
        }

        return $rule;
    }
}
