<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Closure;
use Illuminate\Contracts\Validation\DataAwareRule;
use Illuminate\Contracts\Validation\ValidationRule;
use Sunrice\Cms\Fields\Field;
use Sunrice\Cms\Fields\Types\EntriesField;
use Sunrice\Cms\Models\Blueprint;

/**
 * Checks a URL pattern when it's saved, saying what's wrong with it. A
 * collection's entry URL: {slug} once, and each other {field} a
 * single-value `entries` field of the blueprint chosen in the same form.
 * Without parameters (a taxonomy's term pages), {slug} only. Fixed
 * (listing and index pages): no braces. Everywhere {handle} counts as
 * the handle it's replaced with on saving (RoutePattern::withHandle()),
 * and in a taxonomy's URLs in a collection (`attachment`) {listing} as
 * the collection's listing page URL.
 *
 * @internal
 */
final class RoutePatternRule implements DataAwareRule, ValidationRule
{
    /** @var array<mixed> */
    private array $data = [];

    /** @param  'collection'|'taxonomy'|'attachment'  $of  whose URL it is */
    public function __construct(private readonly bool $parameters = true, private readonly string $of = 'collection', private readonly bool $fixed = false) {}

    /**
     * A listing or index page's URL: fixed, {handle} aside.
     *
     * @param  'collection'|'taxonomy'|'attachment'  $of
     */
    public static function fixed(string $of = 'collection'): self
    {
        return new self(false, $of, true);
    }

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
        $schema = null;
        if ($this->parameters) {
            $handle = $this->data['blueprint'] ?? null;
            $schema = is_string($handle) ? Blueprint::query()->where('handle', $handle)->first()?->schema() : null;
        }
        // The handle written in is lowercase letters, digits and underscores: any such word checks the same.
        $pattern = RoutePattern::withHandle($value, 'handle', $this->of === 'attachment' ? '/listing' : null, handleIsField: self::isField($schema?->field('handle')));
        $problem = RoutePattern::problem($pattern, $this->parameters, $this->fixed);
        if ($problem !== null) {
            $fail($this->message($problem[0], $problem[1]));

            return;
        }
        foreach ((new RoutePattern($pattern))->parameters() as $name) {
            $field = $schema?->field($name);
            if ($field === null || $field->type !== EntriesField::TYPE || $field->configBool('multiple')) {
                $fail($this->fieldMessage($name, $field));

                return;
            }
        }
    }

    /** Whether a blueprint's field can fill a {field}: a single-value Entries field. */
    public static function isField(?Field $field): bool
    {
        return $field !== null && $field->type === EntriesField::TYPE && ! $field->configBool('multiple');
    }

    /** @param  'slash'|'empty'|'segment'|'no-slug'|'slugs'|'twice'|'braces'  $problem */
    private function message(string $problem, string $name): string
    {
        $example = $this->fixed ? ($this->of === 'collection' ? '/blog' : '/tags') : ($this->of === 'collection' ? '/blog/{slug}' : '/topics/{slug}');
        $message = match ($problem) {
            'slash' => __('Start the URL with a slash, like :example.', ['example' => $example]),
            'empty' => __('Leave out the empty part between two slashes, or the slash at the end.'),
            'segment' => __('":segment" can\'t be in the URL: use lowercase letters, digits, dashes and underscores between the slashes.', ['segment' => $name]),
            'no-slug' => $this->of === 'collection'
                ? __('Put {slug} in the URL, where each entry\'s slug goes, like /blog/{slug}.')
                : __('Put {slug} in the URL, where each term\'s slug goes, like /topics/{slug}.'),
            'slugs' => __('{slug} can be in the URL only once.'),
            'twice' => __('{:name} can be in the URL only once.', ['name' => $name]),
            'braces' => match (true) {
                $this->fixed && $this->of === 'collection' => __('Only {handle} (the collection\'s handle) can be in braces here: it\'s the address of one page.'),
                $this->fixed && $this->of === 'taxonomy' => __('Only {handle} (the taxonomy\'s handle) can be in braces here: it\'s the address of one page.'),
                $this->fixed => __('Only {listing} (the collection\'s listing page URL) and {handle} (the taxonomy\'s handle) can be in braces here: it\'s the address of one page.'),
                $this->of === 'attachment' => __('Only {slug}, {listing} (the collection\'s listing page URL) and {handle} (the taxonomy\'s handle) can be in braces here.'),
                default => __('Only {slug} and {handle} (the taxonomy\'s handle) can be in braces here.'),
            },
        };

        return is_string($message) ? $message : $problem;
    }

    /** A {name} that isn't a field linking to one entry: none of the blueprint, another type, or several entries. */
    private function fieldMessage(string $name, ?Field $field): string
    {
        $message = match (true) {
            $field === null => __('{:name} isn\'t a field of the blueprint. In braces go {slug}, {handle} (the collection\'s handle) and Entries fields linking to one entry, like /projects/{project}/{slug}.', ['name' => $name]),
            $field->type !== EntriesField::TYPE => __('{:name} isn\'t an Entries field. In braces go {slug}, {handle} (the collection\'s handle) and Entries fields linking to one entry, like /projects/{project}/{slug}.', ['name' => $name]),
            default => __('{:name} links to several entries, so it can\'t be in the URL: switch its Several entries off, or use an Entries field linking to one entry.', ['name' => $name]),
        };

        return is_string($message) ? $message : $name;
    }
}
