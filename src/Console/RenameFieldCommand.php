<?php

declare(strict_types=1);

namespace Sunrice\Cms\Console;

use Illuminate\Console\Command;
use Illuminate\Validation\ValidationException;
use Sunrice\Cms\Actions\Blueprints\RenameFieldHandle;
use Sunrice\Cms\Models\Blueprint;
use Sunrice\Cms\Models\Fieldset;

/**
 * sunrice:rename-field page hero.title heading: renames a field of a
 * blueprint or a fieldset ("fieldset:links" when a blueprint has the same
 * handle) and moves the values content stores under it.
 *
 * @internal
 */
final class RenameFieldCommand extends Command
{
    protected $signature = 'sunrice:rename-field
        {definition : A blueprint\'s or a fieldset\'s handle (blueprint:<handle> or fieldset:<handle> when both exist)}
        {old : The field\'s handle, or its dot path into groups and repeaters (hero.title)}
        {new : The new handle}
        {--dry-run : Only count what would change}';

    protected $description = 'Rename a field of a blueprint or fieldset and move the values stored under it';

    public function handle(RenameFieldHandle $rename): int
    {
        $name = (string) $this->argument('definition');
        [$kind, $handle] = str_contains($name, ':') ? explode(':', $name, 2) : [null, $name];
        $blueprint = $kind === null || $kind === 'blueprint' ? Blueprint::query()->where('handle', $handle)->first() : null;
        $fieldset = $kind === null || $kind === 'fieldset' ? Fieldset::query()->where('handle', $handle)->first() : null;
        if ($blueprint !== null && $fieldset !== null) {
            $this->components->error("Both a blueprint and a fieldset are called \"{$handle}\": say blueprint:{$handle} or fieldset:{$handle}.");

            return self::FAILURE;
        }
        $definition = $blueprint ?? $fieldset;
        if ($definition === null) {
            $this->components->error("There is no blueprint or fieldset \"{$name}\".");

            return self::FAILURE;
        }

        $dryRun = (bool) $this->option('dry-run');
        try {
            $counts = $rename->handle($definition, (string) $this->argument('old'), (string) $this->argument('new'), $dryRun);
        } catch (ValidationException $e) {
            $this->components->error(implode(' ', $e->validator->errors()->all()));

            return self::FAILURE;
        }

        $this->table(['Stored in', $dryRun ? 'Would change' : 'Changed'], array_map(fn (string $what, int $count): array => [$what, (string) $count], array_keys($counts), $counts));
        $dryRun
            ? $this->components->info('Dry run: nothing was changed.')
            : $this->components->info("Renamed \"{$this->argument('old')}\" to \"{$this->argument('new')}\" in {$definition->handle}.");

        return self::SUCCESS;
    }
}
