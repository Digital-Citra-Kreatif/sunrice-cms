<?php

declare(strict_types=1);

namespace Sunrice\Cms\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;
use Sunrice\Cms\Fields\HydrationContext;
use Sunrice\Cms\Site\Site;
use Sunrice\Cms\Support\ContentData;
use Sunrice\Cms\Support\Locales;

/**
 * A term in one language: its title and slug.
 *
 * @property int $id
 * @property int $term_id
 * @property int $taxonomy_id
 * @property string $locale
 * @property string $title
 * @property string $slug
 * @property int $version counted up on each save; a save with an older one is refused
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property array<string, mixed>|null $data its fields and SEO
 * @property-read Term $term
 *
 * @phpstan-import-type TermData from Term
 *
 * @api
 */
class TermTranslation extends Model
{
    protected $table = 'sunrice_term_translations';

    protected $guarded = [];

    /**
     * The collection whose term page this is (/books/tags/featured: only
     * its entries), or null for the shared one. Set by the site for the
     * page shown; url() follows it. Never stored.
     */
    public ?Collection $scope = null;

    /** @return array<string, string> */
    protected function casts(): array
    {
        return ['data' => 'array', 'version' => 'integer'];
    }

    /** @return BelongsTo<Term, $this> */
    public function term(): BelongsTo
    {
        return $this->belongsTo(Term::class)->withTrashed();
    }

    /**
     * Its page, or null when it has none: in its scope's collection when
     * set, else as Site::termUrl() chooses (the shared page, else the
     * page's collection's or the first collection's).
     */
    public function url(): ?string
    {
        return app(Site::class)->termUrl($this);
    }

    /**
     * Its term as data (Term::toData()), with this translation's title,
     * slug and page (`$term` on a term page).
     *
     * @return TermData
     */
    public function toData(): array
    {
        return ContentData::termTranslation($this);
    }

    /** The same translation, for the term page in a collection (null: the shared one). */
    public function in(?Collection $collection): static
    {
        $this->scope = $collection;

        return $this;
    }

    /**
     * The fields as templates get them, with the main language's for fields not translated.
     *
     * @return array<mixed>
     */
    public function values(?HydrationContext $context = null): array
    {
        $schema = $this->term->taxonomy->schema();
        $data = array_replace($schema->defaults(), $this->data ?? []);
        if ($this->locale !== Locales::default()) {
            $main = $this->term->translations->firstWhere('locale', Locales::default());
            $data = array_replace($data, array_intersect_key(array_replace($schema->defaults(), $main->data ?? []), array_flip($schema->shared())));
        }

        return $schema->hydrate($data, $context ?? new HydrationContext($this->locale));
    }
}
