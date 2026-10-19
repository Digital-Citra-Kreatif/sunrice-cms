<?php

declare(strict_types=1);

namespace Sunrice\Cms\Fields;

use Sunrice\Cms\Models\Fieldset;

/**
 * The fieldsets' fields by handle, loaded once per request: blueprints
 * include them and flexible fields use them as block types.
 *
 * @internal
 */
final class Fieldsets
{
    /** @var array<string, Fieldset>|null */
    private ?array $fieldsets = null;

    /** @var array<string, list<Field>> */
    private array $fields = [];

    /** @return list<Field>|null */
    public function fields(string $handle): ?array
    {
        $fieldset = $this->all()[$handle] ?? null;

        return $fieldset === null ? null : $this->fields[$handle] ??= $fieldset->fields();
    }

    public function title(string $handle): string
    {
        return ($this->all()[$handle] ?? null)->title ?? $handle;
    }

    /** @return array<string, Fieldset> */
    public function all(): array
    {
        return $this->fieldsets ??= Fieldset::query()->orderBy('title')->get()
            ->mapWithKeys(fn (Fieldset $fieldset): array => [$fieldset->handle => $fieldset])->all();
    }

    /** Forgets what was loaded, after a fieldset changes. */
    public function flush(): void
    {
        $this->fieldsets = null;
        $this->fields = [];
    }
}
