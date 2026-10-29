<?php

declare(strict_types=1);

namespace Sunrice\Cms\Fields\Types;

use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Exists;
use Sunrice\Admin\Resources\Forms\RichTextLinkAttributes;
use Sunrice\Cms\Fields\Field;
use Sunrice\Cms\Fields\FieldType;
use Sunrice\Cms\Fields\HydrationContext;
use Sunrice\Cms\Fields\Reference;
use Sunrice\Cms\Fields\Schema;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\Term;
use Sunrice\Cms\Site\Site;
use Sunrice\Cms\Support\SafeUrl;

/**
 * A link: to an address, or to an entry, a term or a collection's listing
 * page of the site (the menu builder's and rich text links' kinds), with
 * its text, whether it opens in a new tab and its rel choices. Stored
 * {type: url|entry|term|listing, url? | entry_id? | term_id? | collection_id?,
 * label, new_tab, rel?} (rel: some of nofollow, sponsored and ugc, left out
 * when none; older values without a type are addresses). Only web, mail
 * and phone links and paths on the site are accepted, so a link can never
 * run script.
 *
 * Templates get {type, url, label, title, new_tab, rel}: a link to an
 * entry, term or listing page gets its URL and title in the page's
 * language (an entry's main language's page when it isn't translated),
 * and its URL is null while there's no page (an entry not live, a term
 * or collection in the trash); rel is ready to print (the choices, then
 * noopener noreferrer on a new-tab link), or null.
 * Config: `collections` (handles entry links may point into; none: any),
 * `placeholder` (in the address input; none: "https://… or /about").
 */
final class Link extends FieldType
{
    public const URL = 'url';

    public const ENTRY = 'entry';

    public const TERM = 'term';

    public const LISTING = 'listing';

    public const TYPES = [self::URL, self::ENTRY, self::TERM, self::LISTING];

    /** Where each kind keeps what it points at. */
    private const TARGETS = [self::ENTRY => 'entry_id', self::TERM => 'term_id', self::LISTING => 'collection_id'];

    public function type(): string
    {
        return 'link';
    }

    public function rules(Field $field): array
    {
        return ['array:type,url,entry_id,term_id,collection_id,label,new_tab,rel'];
    }

    public function nestedRules(Field $field, string $key, mixed $value): array
    {
        $type = is_array($value) && in_array($value['type'] ?? null, self::TYPES, true) ? $value['type'] : self::URL;
        $required = $field->required ? 'required' : 'nullable';

        return [
            "{$key}.type" => ['nullable', 'string', Rule::in(self::TYPES)],
            "{$key}.url" => $type === self::URL ? [$required, 'string', 'max:2048', SafeUrl::rule()] : ['nullable'],
            "{$key}.entry_id" => $type === self::ENTRY ? [$required, 'integer', $this->exists($field)] : ['nullable'],
            "{$key}.term_id" => $type === self::TERM ? [$required, 'integer', Rule::exists((new Term)->getTable(), 'id')->whereNull('deleted_at')] : ['nullable'],
            "{$key}.collection_id" => $type === self::LISTING ? [$required, 'integer', Rule::exists((new Collection)->getTable(), 'id')->whereNull('deleted_at')->whereNotNull('listing_route')] : ['nullable'],
            "{$key}.label" => ['nullable', 'string', 'max:255'],
            "{$key}.new_tab" => ['nullable', 'boolean'],
            "{$key}.rel" => ['nullable', 'array', 'max:3'],
            "{$key}.rel.*" => ['string', Rule::in(RichTextLinkAttributes::REL_OPTIONS)],
        ];
    }

    public function normalize(mixed $value, Field $field): mixed
    {
        if (! is_array($value)) {
            return null;
        }
        $label = is_string($value['label'] ?? null) && trim($value['label']) !== '' ? $value['label'] : null;
        $newTab = filter_var($value['new_tab'] ?? false, FILTER_VALIDATE_BOOLEAN);
        $rel = self::relOf($value['rel'] ?? null);
        $type = $value['type'] ?? null;
        if (is_string($type) && isset(self::TARGETS[$type])) {
            $target = self::TARGETS[$type];
            $id = is_numeric($value[$target] ?? null) ? (int) $value[$target] : 0;

            return $id > 0 ? ['type' => $type, $target => $id, 'label' => $label, 'new_tab' => $newTab, ...($rel === [] ? [] : ['rel' => $rel])] : null;
        }
        $url = is_string($value['url'] ?? null) ? trim($value['url']) : '';

        return $url === '' ? null : ['type' => self::URL, 'url' => $url, 'label' => $label, 'new_tab' => $newTab, ...($rel === [] ? [] : ['rel' => $rel])];
    }

    /**
     * The rel choices of a value: of nofollow, sponsored and ugc, each once, in that order.
     *
     * @return list<string>
     */
    public static function relOf(mixed $rel): array
    {
        $tokens = is_string($rel) ? (preg_split('/\s+/', strtolower($rel)) ?: []) : (is_array($rel) ? array_filter($rel, is_string(...)) : []);

        return array_values(array_filter(RichTextLinkAttributes::REL_OPTIONS, fn (string $option): bool => in_array($option, $tokens, true)));
    }

    /** The rel to print: the choices, then noopener noreferrer when it opens in a new tab; null for none. */
    public static function relAttribute(mixed $rel, bool $newTab): ?string
    {
        $tokens = [...self::relOf($rel), ...($newTab ? [RichTextLinkAttributes::SAFE_REL] : [])];

        return $tokens === [] ? null : implode(' ', $tokens);
    }

    /** @return array{type: string, url: string|null, label: string|null, title: string|null, new_tab: bool, rel: string|null}|null */
    public function hydrate(mixed $value, Field $field, HydrationContext $context): ?array
    {
        if (! is_array($value)) {
            return null;
        }
        $label = is_string($value['label'] ?? null) ? $value['label'] : null;
        $newTab = ($value['new_tab'] ?? false) === true;
        $rel = self::relAttribute($value['rel'] ?? null, $newTab);
        $type = $value['type'] ?? null;
        $id = is_string($type) && isset(self::TARGETS[$type]) && is_int($value[self::TARGETS[$type]] ?? null) ? $value[self::TARGETS[$type]] : 0;
        if ($type === self::ENTRY) {
            $translation = $id > 0 ? $context->entries([$id])->first() : null;
            $live = $translation !== null && $translation->isLive();

            return [
                'type' => self::ENTRY,
                // Not live (a preview shows drafts): no address to go to yet.
                'url' => $live ? app(Site::class)->urlIn($translation, $context->locale) : null,
                'label' => $label,
                'title' => $translation === null ? null : ($context->preview ? $translation->draft_title : $translation->title),
                'new_tab' => $newTab,
                'rel' => $rel,
            ];
        }
        if ($type === self::TERM) {
            $term = $id > 0 ? $context->terms([$id])->first() : null;
            $shown = $term !== null && ! $term->taxonomy->trashed();

            return ['type' => self::TERM, 'url' => $shown ? $term->url($context->locale) : null, 'label' => $label, 'title' => $shown ? $term->title($context->locale) : null, 'new_tab' => $newTab, 'rel' => $rel];
        }
        if ($type === self::LISTING) {
            $collection = $id > 0 ? $context->collection($id) : null;
            $shown = $collection !== null && ! $collection->trashed();

            return ['type' => self::LISTING, 'url' => $shown ? $collection->listingUrl($context->locale) : null, 'label' => $label, 'title' => $shown ? $collection->titleIn($context->locale) : null, 'new_tab' => $newTab, 'rel' => $rel];
        }
        $url = is_string($value['url'] ?? null) ? $value['url'] : null;
        // Checked again: a link must never print an unsafe address.
        if ($url === null || $url === '' || ! SafeUrl::isSafe($url)) {
            return null;
        }

        return ['type' => self::URL, 'url' => $url, 'label' => $label, 'title' => null, 'new_tab' => $newTab, 'rel' => $rel];
    }

    public function references(mixed $value, Field $field): array
    {
        return match (is_array($value) ? $value['type'] ?? null : null) {
            self::ENTRY => Reference::many(Reference::ENTRY, [is_array($value) ? $value['entry_id'] ?? null : null]),
            self::TERM => Reference::many(Reference::TERM, [is_array($value) ? $value['term_id'] ?? null : null]),
            default => [],
        };
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
                'empty' => 'There are no collections yet: links can go to entries once there are (Structure → Collections).',
            ]),
            new Field('placeholder', 'text', 'Placeholder', instructions: 'Shown in the empty address input.', validation: ['max:255']),
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
