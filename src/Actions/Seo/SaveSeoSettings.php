<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Seo;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Actions\Settings\SaveSettings;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Admin\SeoMapping;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Settings\SiteSettings;

/**
 * Settings → SEO in one save: the site's search and sharing settings
 * (SiteSettings), and which fields fill in what each collection's and
 * taxonomy's SEO cards leave empty. Collections and taxonomies the user
 * may not edit are left as they are.
 *
 * Input: `site` (noindex, appendName, separator, twitter, image) and
 * `mappings`, a list of {kind: collection|taxonomy, id, title, description, image}.
 *
 * @api
 */
final class SaveSeoSettings
{
    public function __construct(private readonly SaveSettings $settings, private readonly ActivityLog $activity) {}

    /**
     * @param  array<mixed>  $input
     * @param  array{collection: bool, taxonomy: bool}  $may  which kinds the user may edit
     *
     * @throws ValidationException
     */
    public function handle(array $input, array $may = ['collection' => true, 'taxonomy' => true]): void
    {
        /** @var array{site: array{noindex: bool, appendName: bool, separator?: string|null, twitter?: string|null, image?: int|null}, mappings?: list<array{kind: string, id: int, title?: string|null, description?: string|null, image?: string|null}>} $valid */
        $valid = Validator::make($input, [
            'site' => ['required', 'array'],
            'site.noindex' => ['required', 'boolean'],
            'site.appendName' => ['required', 'boolean'],
            'site.separator' => ['nullable', 'string', 'max:5'],
            'site.twitter' => ['nullable', 'string', 'max:16', 'regex:/^@?[A-Za-z0-9_]{1,15}$/'],
            'site.image' => ['nullable', 'integer', Rule::exists('sunrice_media', 'id')],
            'mappings' => ['nullable', 'array', 'max:500'],
            'mappings.*.kind' => ['required', 'in:collection,taxonomy'],
            'mappings.*.id' => ['required', 'integer'],
            'mappings.*.title' => ['nullable', 'string', 'max:64'],
            'mappings.*.description' => ['nullable', 'string', 'max:64'],
            'mappings.*.image' => ['nullable', 'string', 'max:64'],
        ], [], ['site.twitter' => __('X (Twitter) account')])->validate();

        // Each field named must be one of the blueprint's of the right type.
        $owners = [];
        $errors = [];
        foreach ($valid['mappings'] ?? [] as $index => $mapping) {
            if (! ($may[$mapping['kind']] ?? false)) {
                continue;
            }
            $owner = $mapping['kind'] === 'collection' ? Collection::query()->find($mapping['id']) : Taxonomy::query()->find($mapping['id']);
            if ($owner === null) {
                continue;
            }
            $options = SeoMapping::options($owner);
            foreach (['title' => 'seo_title_field', 'description' => 'seo_description_field', 'image' => 'seo_image_field'] as $role => $column) {
                $field = $mapping[$role] ?? null;
                if ($field !== null && $field !== '' && ! array_key_exists($field, $options[$column])) {
                    $errors["mappings.{$index}.{$role}"] = __('":field" isn\'t a field :owner can use for that.', ['field' => $field, 'owner' => $owner->title]);
                }
            }
            $owners[] = [$owner, $mapping];
        }
        if ($errors !== []) {
            throw ValidationException::withMessages($errors);
        }

        DB::transaction(function () use ($valid, $owners): void {
            $site = $valid['site'];
            $separator = trim((string) ($site['separator'] ?? ''));
            $this->settings->handle(app(SiteSettings::class), [
                'noindex' => $site['noindex'],
                'appendName' => $site['appendName'],
                'separator' => $separator !== '' ? $separator : '|',
                'twitter' => (string) ($site['twitter'] ?? ''),
                'image' => $site['image'] ?? null,
            ]);
            foreach ($owners as [$owner, $mapping]) {
                $owner->fill([
                    'seo_title_field' => ($mapping['title'] ?? '') !== '' ? $mapping['title'] : null,
                    'seo_description_field' => ($mapping['description'] ?? '') !== '' ? $mapping['description'] : null,
                    'seo_image_field' => ($mapping['image'] ?? '') !== '' ? $mapping['image'] : null,
                ]);
                if ($owner->isDirty()) {
                    $owner->save();
                    $this->activity->record('updated', $owner instanceof Collection ? 'collection' : 'taxonomy', $owner, $owner->title, ['changed' => ['seo fields']]);
                }
            }
        });
    }
}
