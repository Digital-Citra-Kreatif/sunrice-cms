<?php

declare(strict_types=1);

namespace Sunrice\Cms\Support;

use Illuminate\Database\Query\Builder;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Media\Media;
use Sunrice\Cms\Models\EntryTranslation;

/**
 * An entry translation's SEO: a title and description for search results,
 * a share image and noindex. Stored with its fields under the reserved
 * "seo" key, so it has drafts and revisions like the rest.
 *
 * @api
 */
final class Seo
{
    public const KEY = 'seo';

    /**
     * Checks SEO input and returns it as stored (null when empty).
     *
     * @return array{title: string|null, description: string|null, image: int|null, noindex: bool}|null
     *
     * @throws ValidationException
     */
    public static function validate(mixed $input): ?array
    {
        if ($input === null) {
            return null;
        }
        /** @var array{title?: string|null, description?: string|null, image?: int|null, noindex?: bool|null} $valid */
        $valid = Validator::make(['seo' => $input], [
            'seo' => ['array'],
            'seo.title' => ['nullable', 'string', 'max:255'],
            'seo.description' => ['nullable', 'string', 'max:500'],
            'seo.image' => ['nullable', 'integer', Rule::exists((new Media)->getTable(), 'id')->where(function (Builder $query): void {
                $query->whereNull('deleted_at');
                Media::whereTypes($query, ['image']);
            })],
            'seo.noindex' => ['nullable', 'boolean'],
        ], [], ['seo.title' => 'SEO title', 'seo.description' => 'description', 'seo.image' => 'share image'])->validate()['seo'] ?? [];
        $seo = [
            'title' => self::text($valid['title'] ?? null),
            'description' => self::text($valid['description'] ?? null),
            'image' => isset($valid['image']) ? (int) $valid['image'] : null,
            'noindex' => (bool) ($valid['noindex'] ?? false),
        ];

        return $seo['title'] === null && $seo['description'] === null && $seo['image'] === null && ! $seo['noindex'] ? null : $seo;
    }

    /**
     * What a page's head needs: title (the SEO title, else the entry's),
     * description, image URL, noindex, canonical URL and the URLs of its
     * other languages.
     *
     * @return array{title: string, description: string|null, image: string|null, noindex: bool, canonical: string|null, alternates: array<string, string>}
     */
    public static function for(EntryTranslation $translation, bool $preview = false): array
    {
        $data = ($preview ? $translation->draft_data : $translation->data) ?? [];
        $seo = is_array($data[self::KEY] ?? null) ? $data[self::KEY] : [];
        $image = is_int($seo['image'] ?? null) ? Media::query()->find($seo['image']) : null;
        $title = is_string($seo['title'] ?? null) ? $seo['title'] : (string) ($preview ? $translation->draft_title : $translation->title);

        return [
            'title' => $title,
            'description' => is_string($seo['description'] ?? null) ? $seo['description'] : null,
            'image' => $image?->url(),
            'noindex' => $preview || ($seo['noindex'] ?? false) === true,
            'canonical' => $preview ? null : $translation->url(),
            'alternates' => self::alternates($translation),
        ];
    }

    /**
     * The live URLs of an entry's languages by locale, for hreflang links;
     * none when it's live in only one.
     *
     * @return array<string, string>
     */
    public static function alternates(EntryTranslation $translation): array
    {
        $entry = $translation->entry;
        $alternates = [];
        foreach ($entry->translations as $other) {
            $other->setRelation('entry', $entry);
            if ($other->isLive() && ($url = $other->url()) !== null) {
                $alternates[$other->locale] = $url;
            }
        }

        return count($alternates) > 1 ? $alternates : [];
    }

    /** Whether a translation's live version asks not to be indexed. */
    public static function noindex(EntryTranslation $translation): bool
    {
        $seo = $translation->data[self::KEY] ?? null;

        return is_array($seo) && ($seo['noindex'] ?? false) === true;
    }

    private static function text(mixed $value): ?string
    {
        return is_string($value) && trim($value) !== '' ? Str::squish($value) : null;
    }
}
