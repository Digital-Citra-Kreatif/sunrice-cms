<?php

declare(strict_types=1);

namespace Sunrice\Cms\Ai;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Sunrice\Admin\Actions\Settings\SaveSettings;
use Sunrice\Cms\Actions\Entries\DuplicateEntry;
use Sunrice\Cms\Actions\Entries\ForceDeleteEntry;
use Sunrice\Cms\Actions\Entries\TrashEntry;
use Sunrice\Cms\Settings\SiteSettings;

#[Description('"delete": delete an entry in the trash for good, with its languages and revisions (cms_trash_entry moves it there). "duplicate": copy an entry, in every language, as a new draft. "set_homepage": show an entry with a page at the site\'s address (/), in Settings → Site. Ask the user first.')]
final class ManageEntry extends CmsTool
{
    protected string $name = 'cms_manage_entry';

    public function handle(Request $request): Response
    {
        /** @var array{id: int, action: string} $args */
        $args = $request->validate([
            'id' => ['required', 'integer'],
            'action' => ['required', 'string', 'in:delete,duplicate,set_homepage'],
        ]);
        $entry = $this->findEntry($request, withTrashed: true);
        if ($entry instanceof Response) {
            return $entry;
        }
        if (! $this->may('view', $entry->collection)) {
            return Response::error('No such entry. cms_list_entries lists them.');
        }

        switch ($args['action']) {
            case 'delete':
                if (! $this->may('delete', $entry->collection, $entry)) {
                    return $this->denied('delete this entry');
                }
                if (! $entry->trashed()) {
                    return Response::error('Move the entry to the trash first (cms_trash_entry); only entries in the trash can be deleted for good.');
                }
                $title = TrashEntry::label($entry);
                app(ForceDeleteEntry::class)->handle($entry);

                return $this->json(['deleted' => true, 'id' => $args['id'], 'title' => $title]);
            case 'duplicate':
                if (! $this->may('create', $entry->collection)) {
                    return $this->denied('create entries in '.$entry->collection->title);
                }
                $copy = app(DuplicateEntry::class)->handle($entry);
                $main = $copy->mainTranslation();

                return $main === null ? Response::error('The copy has no translations.') : $this->json(['duplicated' => true, 'from' => $entry->id, ...self::describe($main)]);
            default:
                if (! $this->can('cms.settings.site')) {
                    return $this->denied('change the site settings');
                }
                if ($entry->trashed() || $entry->collection->route === null) {
                    return Response::error('Only an entry with a page (of a collection with a URL, not in the trash) can be the homepage.');
                }
                app(SaveSettings::class)->handle(app(SiteSettings::class), ['homepage' => $entry->id]);
                $main = $entry->mainTranslation();

                return $this->json(['homepage' => true, 'id' => $entry->id, 'title' => $main?->draft_title, 'live' => $main !== null && $main->isLive()]);
        }
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'id' => $schema->integer()->required(),
            'action' => $schema->string()->enum(['delete', 'duplicate', 'set_homepage'])->required(),
        ];
    }
}
