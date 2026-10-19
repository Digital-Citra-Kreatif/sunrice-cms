<?php

declare(strict_types=1);

namespace Sunrice\Cms\Console;

use Illuminate\Console\Command;
use InvalidArgumentException;
use Sunrice\Cms\Actions\Blueprints\RenameField;
use Sunrice\Cms\Models\Blueprint;

/**
 * sunrice:rename-field — renames a blueprint's field and the data stored
 * under it (RenameField).
 *
 * @internal
 */
final class RenameFieldCommand extends Command
{
    protected $signature = 'sunrice:rename-field
        {blueprint : The blueprint\'s handle}
        {from : The field\'s handle now}
        {to : Its new handle}';

    protected $description = 'Rename a blueprint\'s field, and the content stored under it';

    public function handle(RenameField $rename): int
    {
        $handle = (string) $this->argument('blueprint');
        $blueprint = Blueprint::query()->where('handle', $handle)->first();
        if ($blueprint === null) {
            $this->components->error("There's no blueprint \"{$handle}\".");

            return self::FAILURE;
        }
        try {
            $count = $rename->handle($blueprint, (string) $this->argument('from'), (string) $this->argument('to'));
        } catch (InvalidArgumentException $e) {
            $this->components->error($e->getMessage());

            return self::FAILURE;
        }
        $this->components->info("Renamed \"{$this->argument('from')}\" to \"{$this->argument('to')}\" in {$count} records. Change templates that use the old handle.");

        return self::SUCCESS;
    }
}
