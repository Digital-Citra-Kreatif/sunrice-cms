<?php

declare(strict_types=1);

namespace Sunrice\Cms\Console;

use Illuminate\Console\Command;
use RuntimeException;
use Sunrice\Cms\Actions\Install\WriteAgentsFile;

/**
 * sunrice:agents: writes (or brings up to date) the Sunrice section of
 * the app's AGENTS.md, for AI coding agents (WriteAgentsFile), leaving
 * the rest of the file as it is.
 *
 * @internal
 */
final class AgentsCommand extends Command
{
    protected $signature = 'sunrice:agents';

    protected $description = 'Add (or update) the notes on building the site with Sunrice in AGENTS.md, for AI coding agents';

    public function handle(WriteAgentsFile $file): int
    {
        try {
            $result = $file->handle();
        } catch (RuntimeException $e) {
            $this->components->error($e->getMessage());

            return self::FAILURE;
        }
        foreach (WriteAgentsFile::details($result) as [$what, $where]) {
            $this->components->twoColumnDetail($what, $where);
        }
        if (($note = WriteAgentsFile::claudeNote($result['claude'])) !== null) {
            $this->components->warn($note);
        }
        $this->components->info($result['agents'] === WriteAgentsFile::UNCHANGED
            ? 'AGENTS.md has the Sunrice section already.'
            : 'Done: agents now find the guide at vendor/sunrice/cms/docs/building-a-site.md.');

        return self::SUCCESS;
    }
}
