<?php

declare(strict_types=1);

namespace Sunrice\Cms\Editor;

use Closure;
use Illuminate\Contracts\Auth\Access\Authorizable;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use InvalidArgumentException;
use Sunrice\Admin\Resources\Forms\CheckboxList;
use Sunrice\Admin\Resources\Forms\Form;
use Sunrice\Admin\Resources\Forms\Toggle;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Models\Term;

/**
 * A plugin's card in the sidebar of the entry and term editors: a form of
 * the panel's fields, with values the plugin keeps where it likes (a
 * table of its own) and its own Save button. It saves at once, apart
 * from the draft: settings about the entry or term (who may see it, what
 * a shop sells it for), not its content. Register it with
 * `Cms::editorCard()` in a plugin's register() or boot():
 *
 *     Cms::editorCard(EditorCard::make($key, $title)
 *         ->entries(fn (Collection $collection): bool => $collection->handle !== $legal)
 *         ->terms()
 *         ->form(fn (Entry|Term $record, Form $form): Form => $form->schema($fields))
 *         ->load(fn (Entry|Term $record): array => $store->valuesOf($record))
 *         ->save(fn (Entry|Term $record, array $values, Authorizable $user) => $store->save($record, $values)));
 *
 * (A full example is in the CMS docs, Collections → Editor cards.)
 *
 * It shows on an entry's or a term's editor (not while creating one) to
 * those who may update it there, and who `can()` allows; the same check
 * guards its save. Values are checked with the fields' rules, as the
 * panel's forms check them, before `save()` gets them.
 *
 * @api
 */
final class EditorCard
{
    private ?string $description = null;

    /** @var (Closure(Collection): bool)|false */
    private Closure|false $entries = false;

    /** @var (Closure(Taxonomy): bool)|false */
    private Closure|false $terms = false;

    /** @var (Closure(Entry|Term, Form): Form)|null */
    private ?Closure $form = null;

    /** @var (Closure(Entry|Term): array<string, mixed>)|null */
    private ?Closure $load = null;

    /** @var (Closure(Entry|Term, array<string, mixed>, Authorizable): void)|null */
    private ?Closure $save = null;

    /** @var (Closure(Authorizable, Entry|Term): bool)|null */
    private ?Closure $can = null;

    private function __construct(public readonly string $key, private string $title) {}

    /** `$key`: lowercase letters, numbers and dashes, unique among the cards. `$title` is translated. */
    public static function make(string $key, string $title): self
    {
        if (preg_match('/^[a-z0-9]+(?:-[a-z0-9]+)*$/', $key) !== 1) {
            throw new InvalidArgumentException("Editor card \"{$key}\": use lowercase letters, numbers and dashes.");
        }

        return new self($key, $title);
    }

    /** A line under the title (translated). */
    public function description(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Show it on entries: of every collection, or those `$when` says yes to.
     *
     * @param  (Closure(Collection): bool)|null  $when
     */
    public function entries(?Closure $when = null): self
    {
        $this->entries = $when ?? fn (Collection $collection): bool => true;

        return $this;
    }

    /**
     * Show it on terms: of every taxonomy, or those `$when` says yes to.
     *
     * @param  (Closure(Taxonomy): bool)|null  $when
     */
    public function terms(?Closure $when = null): self
    {
        $this->terms = $when ?? fn (Taxonomy $taxonomy): bool => true;

        return $this;
    }

    /**
     * Its fields (the panel's form fields: Toggle, Select, CheckboxList…),
     * for the entry or term being edited; their names are the values' keys.
     *
     * @param  Closure(Entry|Term, Form): Form  $form
     */
    public function form(Closure $form): self
    {
        $this->form = $form;

        return $this;
    }

    /**
     * The values the form starts from (field name => value); a field
     * without one shows its default.
     *
     * @param  Closure(Entry|Term): array<string, mixed>  $load
     */
    public function load(Closure $load): self
    {
        $this->load = $load;

        return $this;
    }

    /**
     * Keeps the checked values (every field's, a switch off as false).
     *
     * @param  Closure(Entry|Term, array<string, mixed>, Authorizable): void  $save
     */
    public function save(Closure $save): self
    {
        $this->save = $save;

        return $this;
    }

    /**
     * Who may see and save it, beyond updating the entry or term (a
     * plugin's own permission): `fn (Authorizable $user, Entry|Term $record) => $user->can('shop.prices.update')`.
     *
     * @param  Closure(Authorizable, Entry|Term): bool  $can
     */
    public function can(Closure $can): self
    {
        $this->can = $can;

        return $this;
    }

    /** Its title, translated. */
    public function title(): string
    {
        return self::say($this->title);
    }

    /** Whether it's on this entry's or term's editor. */
    public function shownOn(Entry|Term $record): bool
    {
        if ($record instanceof Entry) {
            return $this->entries !== false && ($this->entries)($record->collection);
        }

        return $this->terms !== false && ($this->terms)($record->taxonomy);
    }

    /** Whether `$user` may see and save it on this record (updating the record is checked by the route). */
    public function allows(Authorizable $user, Entry|Term $record): bool
    {
        return $this->can === null || ($this->can)($user, $record);
    }

    /**
     * What the editor draws: its title, description, the form's sections
     * and values (for FormSections), and where it saves.
     *
     * @return array{key: string, title: string, description: string|null, sections: list<array<string, mixed>>, values: array<string, mixed>, url: string}
     */
    public function props(Entry|Term $record, string $url): array
    {
        $form = $this->formFor($record);
        $loaded = $this->load === null ? [] : ($this->load)($record);
        $values = [];
        foreach ($form->fields('edit') as $field) {
            $value = $loaded[$field->name] ?? null;
            $values[$field->name] = $value ?? $field->formValue(null);
        }

        return [
            'key' => $this->key,
            'title' => $this->title(),
            'description' => $this->description === null ? null : self::say($this->description),
            'sections' => $form->toSections('edit'),
            'values' => $values,
            'url' => $url,
        ];
    }

    /**
     * Checks the input with the fields' rules and gives `save()` the
     * values: every field's (a switch off is false, nothing ticked an
     * empty list), dehydrated as the panel's forms keep them.
     *
     * @param  array<mixed>  $input
     *
     * @throws ValidationException
     */
    public function store(Entry|Term $record, array $input, Authorizable $user): void
    {
        $fields = array_values(array_filter($this->formFor($record)->fields('edit'), fn ($field): bool => ! $field->isDisabled(null)));
        $rules = [];
        $attributes = [];
        foreach ($fields as $field) {
            $rules[$field->name] = $field->validationRules(null);
            $attributes[$field->name] = self::say($field->getLabel());
            foreach ($field->nestedRules() as $path => $nested) {
                $rules[$path] = $nested;
                $attributes[$path] = $attributes[$field->name];
            }
        }
        /** @var array<string, mixed> $validated */
        $validated = Validator::make($input, $rules, [], $attributes)->validate();
        $values = [];
        foreach ($fields as $field) {
            $value = $validated[$field->name] ?? null;
            $values[$field->name] = match (true) {
                $field instanceof Toggle => (bool) $value,
                // Nothing ticked is sent as nothing at all.
                $field instanceof CheckboxList && $value === null => [],
                default => $field->dehydrate($value),
            };
        }
        if ($this->save !== null) {
            ($this->save)($record, $values, $user);
        }
    }

    private static function say(string $text): string
    {
        $said = __($text);

        return is_string($said) ? $said : $text;
    }

    private function formFor(Entry|Term $record): Form
    {
        return $this->form === null ? new Form : ($this->form)($record, new Form);
    }
}
