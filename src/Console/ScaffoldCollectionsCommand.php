<?php

declare(strict_types=1);

namespace Sunrice\Cms\Console;

use Illuminate\Console\Command;
use Sunrice\Cms\Actions\Install\ScaffoldCollections;
use Sunrice\Cms\Structure\StructureImportFailed;

/**
 * sunrice:scaffold-collections: the Pages and Posts collections
 * (ScaffoldCollections), both or those --pages and --posts name. Those
 * the site has already are left alone.
 *
 * @internal
 */
final class ScaffoldCollectionsCommand extends Command
{
    protected $signature = 'sunrice:scaffold-collections
        {--pages : Only the Pages collection}
        {--posts : Only the Posts collection}';

    protected $description = 'Create the Pages and Posts collections, with their blueprints';

    public function handle(ScaffoldCollections $scaffold): int
    {
        $handles = array_keys(array_filter([ScaffoldCollections::PAGES => $this->option('pages') === true, ScaffoldCollections::POSTS => $this->option('posts') === true]));
        try {
            $made = $scaffold->handle($handles === [] ? [ScaffoldCollections::PAGES, ScaffoldCollections::POSTS] : $handles);
        } catch (StructureImportFailed $e) {
            $this->components->error($e->getMessage());

            return self::FAILURE;
        }
        foreach ($made as $handle) {
            $this->components->twoColumnDetail('Collection', ucfirst($handle));
        }
        $this->components->info($made === [] ? 'The site has these collections already.' : 'Done: add entries in the admin.');

        return self::SUCCESS;
    }
}
