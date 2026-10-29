<?php

declare(strict_types=1);

namespace Sunrice\Cms\Structure;

use Sunrice\Admin\Media\Media;
use Sunrice\Cms\Fields\Reference;
use Sunrice\Cms\Fields\Schema;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Models\Term;
use Sunrice\Cms\Models\TermTranslation;
use Sunrice\Cms\Support\Locales;
use Sunrice\Cms\Support\RichTextLinks;
use Sunrice\Cms\Support\Seo;

/**
 * What content values point at, written so another site can find it: a
 * linked entry as {"entry": "agents/ayu-pratiwi"} (its collection and its
 * slug in the main language), a term as {"term": "locations/canggu"}, a
 * media file as {"media": "<its path in the library>"}, at any depth
 * (groups, repeater rows, flexible blocks, links, the SEO card's image),
 * and rich text's links the same way inside the HTML
 * (data-link="entry:pages/about", "term:topics/coffee", "listing:news").
 * Reading a file turns them back into ids on this site; plain ids, as
 * older files have them, are kept as they are.
 *
 * @internal
 */
final class ContentReferences
{
    /** A rich text link's data-link with an id here ("entry:12"). */
    private const LINK_ID = '/data-link="(entry|term|listing):(\d{1,18})"/';

    /** A rich text link's data-link with a portable key ("entry:pages/about", "listing:news"). */
    private const LINK_KEY = '/(?<=\s)data-link="(entry|term|listing):([^"]*[^"\d][^"]*)"/';

    /** @var array<string, string|null> */
    private array $keys = [];

    /** @var array<string, int|null> */
    private array $ids = [];

    /**
     * The data with its references written portably (the export).
     *
     * @param  array<mixed>|null  $data
     * @return array<mixed>|null
     */
    public function portable(Schema $schema, ?array $data): ?array
    {
        if ($data === null) {
            return null;
        }
        $types = [];
        foreach ($schema->references($data) as $reference) {
            $types[$reference->path] = $reference->type;
        }
        foreach ($types as $path => $type) {
            data_set($data, $path, $this->portableValue(data_get($data, $path), $type));
        }
        if (! is_array($data)) {
            return null;
        }
        $seo = $data[Seo::KEY] ?? null;
        if (is_array($seo) && is_int($seo['image'] ?? null)) {
            $seo['image'] = $this->portableValue($seo['image'], Reference::MEDIA);
            $data[Seo::KEY] = $seo;
        }

        return $this->portableLinks($data);
    }

    /**
     * Rich text links' data-link ids written as keys, in every string of the data.
     *
     * @param  array<mixed>  $data
     * @return array<mixed>
     */
    private function portableLinks(array $data): array
    {
        foreach ($data as $key => $value) {
            if (is_array($value)) {
                $data[$key] = $this->portableLinks($value);
            } elseif (is_string($value) && str_contains($value, 'data-link="')) {
                $data[$key] = preg_replace_callback(self::LINK_ID, function (array $match): string {
                    $key = $match[1] === RichTextLinks::LISTING
                        ? Collection::withTrashed()->find((int) $match[2])?->handle
                        : $this->key($match[1], (int) $match[2]);

                    return $key === null ? $match[0] : 'data-link="'.$match[1].':'.$key.'"';
                }, $value) ?? $value;
            }
        }

        return $data;
    }

    /**
     * Rich text links' data-link keys turned into this site's ids; one not
     * found here loses its data-link (the link keeps its stored address),
     * one still to come is filled in later.
     *
     * @param  list<string>  $missing
     * @param  list<string>  $later
     * @param  (callable(string): bool)|null  $pending
     */
    private function resolveLinks(string $html, array &$missing, array &$later, ?callable $pending): string
    {
        return preg_replace_callback(self::LINK_KEY, function (array $match) use (&$missing, &$later, $pending): string {
            [, $kind, $key] = $match;
            $id = $kind === RichTextLinks::LISTING ? Collection::query()->where('handle', $key)->value('id') : $this->id($kind, $key);
            if (is_numeric($id)) {
                return 'data-link="'.$kind.':'.$id.'"';
            }
            if ($kind === Reference::ENTRY && $pending !== null && $pending($key)) {
                $later[] = $key;
            } else {
                $missing[] = $kind.' '.$key;
            }

            return '';
        }, $html) ?? $html;
    }

    /**
     * The data with portable references turned into this site's ids. Those
     * that can't be found are left out and named in $missing; those
     * $pending says are still to come (an entry later in the same file)
     * are left out and named in $later.
     *
     * @param  array<mixed>  $data
     * @param  list<string>  $missing  "entry agents/ayu-pratiwi", "media photos/pool.jpg"
     * @param  list<string>  $later  "agents/ayu-pratiwi"
     * @param  (callable(string): bool)|null  $pending  whether an entry ("collection/slug") is still to be imported
     * @return array<mixed>
     */
    public function resolve(array $data, array &$missing, array &$later, ?callable $pending = null): array
    {
        $out = [];
        foreach ($data as $key => $value) {
            if (! is_array($value)) {
                $out[$key] = is_string($value) && str_contains($value, 'data-link="') ? $this->resolveLinks($value, $missing, $later, $pending) : $value;

                continue;
            }
            $marker = self::marker($value);
            if ($marker !== null) {
                $id = $this->id($marker[0], $marker[1]);
                if ($id === null) {
                    if ($marker[0] === Reference::ENTRY && $pending !== null && $pending($marker[1])) {
                        $later[] = $marker[1];
                    } else {
                        $missing[] = $marker[0].' '.$marker[1];
                    }
                }
                // In a list (several entries, terms or files) one not found is left out; alone, it's empty.
                if ($id !== null || ! array_is_list($data)) {
                    $out[$key] = $id;
                }

                continue;
            }
            $out[$key] = $this->resolve($value, $missing, $later, $pending);
        }

        return array_is_list($data) ? array_values($out) : $out;
    }

    /** Whether the data holds a portable reference anywhere. */
    public static function hasMarkers(mixed $data): bool
    {
        if (! is_array($data)) {
            return false;
        }
        if (self::marker($data) !== null) {
            return true;
        }
        foreach ($data as $value) {
            if (self::hasMarkers($value)) {
                return true;
            }
        }

        return false;
    }

    /**
     * The entries ("collection/slug") the data points at.
     *
     * @param  array<mixed>  $data
     * @return list<string>
     */
    public static function entryKeys(array $data): array
    {
        $keys = [];
        $walk = function (mixed $value) use (&$walk, &$keys): void {
            if (is_string($value) && str_contains($value, 'data-link="entry:')) {
                preg_match_all(self::LINK_KEY, $value, $matches, PREG_SET_ORDER);
                foreach ($matches as $match) {
                    if ($match[1] === Reference::ENTRY) {
                        $keys[] = $match[2];
                    }
                }
            }
            if (! is_array($value)) {
                return;
            }
            $marker = self::marker($value);
            if ($marker !== null) {
                if ($marker[0] === Reference::ENTRY) {
                    $keys[] = $marker[1];
                }

                return;
            }
            foreach ($value as $child) {
                $walk($child);
            }
        };
        $walk($data);

        return array_values(array_unique($keys));
    }

    /**
     * @param  array<mixed>  $value
     * @return array{0: string, 1: string}|null [type, key] for {"entry": "pages/about"}, {"term": "…"}, {"media": "…"}
     */
    private static function marker(array $value): ?array
    {
        if (count($value) !== 1) {
            return null;
        }
        $type = array_key_first($value);
        $key = $value[$type];
        if (! is_string($key) || $key === '') {
            return null;
        }

        return match (true) {
            ($type === Reference::ENTRY || $type === Reference::TERM) && preg_match('#^[a-z][a-z0-9_]*/.+$#', $key) === 1 => [$type, $key],
            $type === Reference::MEDIA => [$type, $key],
            default => null,
        };
    }

    private function portableValue(mixed $value, string $type): mixed
    {
        return match (true) {
            is_int($value) => ($key = $this->key($type, $value)) === null ? $value : [$type => $key],
            is_array($value) && array_is_list($value) => array_map(fn (mixed $one): mixed => $this->portableValue($one, $type), $value),
            // A link to an entry: {"type": "entry", "entry_id": 3}.
            is_array($value) && is_int($value['entry_id'] ?? null) => ['entry_id' => $this->portableValue($value['entry_id'], Reference::ENTRY)] + $value,
            default => $value,
        };
    }

    /**
     * A record here written portably ({"entry": "pages/home"}, {"media": "<path>"}), or null when it's gone.
     *
     * @return array<string, string>|null
     */
    public function reference(string $type, int $id): ?array
    {
        $key = $this->key($type, $id);

        return $key === null ? null : [$type => $key];
    }

    /** "agents/ayu-pratiwi", "locations/canggu" or a file's path, for an id here. */
    private function key(string $type, int $id): ?string
    {
        $cache = "{$type}:{$id}";
        if (! array_key_exists($cache, $this->keys)) {
            $this->keys[$cache] = match ($type) {
                Reference::ENTRY => ($entry = Entry::withTrashed()->with(['translations'])->find($id)) === null
                    || ($collection = Collection::withTrashed()->find($entry->collection_id)) === null
                    ? null : $collection->handle.'/'.self::entrySlug($entry),
                Reference::TERM => ($term = Term::withTrashed()->with(['translations'])->find($id)) === null
                    || ($taxonomy = Taxonomy::withTrashed()->find($term->taxonomy_id)) === null
                    ? null : $taxonomy->handle.'/'.self::termSlug($term),
                Reference::MEDIA => Media::withTrashed()->find($id)?->path,
                default => null,
            };
        }

        return $this->keys[$cache];
    }

    /** The id here of an entry ("collection/slug"), a term ("taxonomy/slug") or a file (its path, else a file of the same name). */
    public function id(string $type, string $key): ?int
    {
        $cache = "{$type}:{$key}";
        if (array_key_exists($cache, $this->ids) && $this->ids[$cache] !== null) {
            return $this->ids[$cache];
        }
        $id = null;
        if ($type === Reference::MEDIA) {
            // Its path here, else the same file uploaded here too: library paths end in "{random}-{name}.{ext}".
            $name = (string) preg_replace('/^[a-z0-9]{10}-/', '', basename($key));
            $id = Media::query()->where('path', $key)->value('id')
                ?? Media::query()->where('path', 'like', '%/__________-'.addcslashes($name, '%_\\'))->orderBy('id')->value('id')
                ?? Media::query()->where('filename', $name)->orderBy('id')->value('id');
        } else {
            [$handle, $slug] = explode('/', $key, 2);
            if ($type === Reference::ENTRY && ($collection = Collection::withTrashed()->where('handle', $handle)->first()) !== null) {
                $id = EntryTranslation::query()->where('collection_id', $collection->id)->where('locale', Locales::default())->where('draft_slug', $slug)
                    ->whereHas('entry', fn ($query) => $query->withTrashed())->value('entry_id');
            } elseif ($type === Reference::TERM && ($taxonomy = Taxonomy::query()->where('handle', $handle)->first()) !== null) {
                $id = TermTranslation::query()->where('taxonomy_id', $taxonomy->id)->where('locale', Locales::default())->where('slug', $slug)->value('term_id');
            }
        }

        return $this->ids[$cache] = is_numeric($id) ? (int) $id : null;
    }

    public static function entrySlug(Entry $entry): string
    {
        return $entry->translation(Locales::default())->draft_slug ?? $entry->mainTranslation()->draft_slug ?? (string) $entry->id;
    }

    public static function termSlug(Term $term): string
    {
        return $term->translations->firstWhere('locale', Locales::default())->slug ?? $term->translations->sortBy('id')->first()->slug ?? (string) $term->id;
    }
}
