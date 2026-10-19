<?php

declare(strict_types=1);

namespace Sunrice\Cms\Fields;

/**
 * A record a stored value points at: a media file, and later entries and
 * terms. Used to show where something is used before it is deleted.
 *
 * @api
 */
final readonly class Reference
{
    public const MEDIA = 'media';

    public const TERM = 'term';

    /** @param string $path where in the data, e.g. "gallery" or "sections.2.image" */
    public function __construct(
        public string $type,
        public int $id,
        public string $path = '',
    ) {}

    public function under(string $prefix): self
    {
        return new self($this->type, $this->id, $this->path === '' ? $prefix : $prefix.'.'.$this->path);
    }

    /**
     * @param  iterable<mixed>  $ids
     * @return list<self>
     */
    public static function many(string $type, iterable $ids): array
    {
        $references = [];
        foreach ($ids as $id) {
            if (is_int($id) && $id > 0) {
                $references[] = new self($type, $id);
            }
        }

        return $references;
    }
}
