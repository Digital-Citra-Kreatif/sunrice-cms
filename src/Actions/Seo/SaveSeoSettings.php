<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Seo;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Actions\Settings\SaveSettings;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Admin\Resources\Forms\Form;
use Sunrice\Admin\Settings\SettingsFields;
use Sunrice\Cms\Admin\SeoMapping;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Settings\SiteSettings;

/**
 * Settings → SEO in one save: the site's search and sharing settings and
 * its structured data (SiteSettings), and which fields fill in what each
 * collection's and taxonomy's SEO cards leave empty. Collections and
 * taxonomies the user may not edit are left as they are.
 *
 * Input: `site` (noindex, appendName, separator, twitter, image),
 * `structured` (optional: SiteSettings::structuredDataForm()'s fields,
 * structuredData, publisher, logo, publisherName, publisherType,
 * telephone, address, sameAs; checked as Settings pages check theirs)
 * and `mappings`, a list of {kind: collection|taxonomy, id, title,
 * description, image}. Every error is reported at once; nothing is saved
 * then.
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
        $validator = Validator::make($input, [
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
        ], [], ['site.twitter' => __('X (Twitter) account')]);

        $errors = $validator->fails() ? $validator->errors()->toArray() : [];
        // Structured data: errors by the field's name under "structured." (structured.sameAs.0).
        $structured = [];
        if (is_array($input['structured'] ?? null)) {
            try {
                $structured = self::structuredData()->validate($input['structured']);
            } catch (ValidationException $e) {
                foreach ($e->errors() as $key => $messages) {
                    $errors["structured.{$key}"] = $messages;
                }
            }
        }
        if ($errors !== []) {
            throw ValidationException::withMessages($errors);
        }
        /** @var array{site: array{noindex: bool, appendName: bool, separator?: string|null, twitter?: string|null, image?: int|null}, mappings?: list<array{kind: string, id: int, title?: string|null, description?: string|null, image?: string|null}>} $valid */
        $valid = $validator->validated();

        // Each field named must be one of the blueprint's of the right type.
        $owners = [];
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

        DB::transaction(function () use ($valid, $structured, $owners): void {
            $site = $valid['site'];
            $separator = trim((string) ($site['separator'] ?? ''));
            $this->settings->handle(app(SiteSettings::class), [
                'noindex' => $site['noindex'],
                'appendName' => $site['appendName'],
                'separator' => $separator !== '' ? $separator : '|',
                'twitter' => (string) ($site['twitter'] ?? ''),
                'image' => $site['image'] ?? null,
                ...$structured,
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

    /** SiteSettings' structured data fields (SiteSettings::structuredDataForm()), as Settings → SEO shows and checks them. */
    public static function structuredData(): SettingsFields
    {
        return SettingsFields::make(SiteSettings::class, SiteSettings::structuredDataForm(new Form));
    }
}
