<?php

declare(strict_types=1);

namespace Sunrice\Cms\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Lang;
use Sunrice\Cms\Fields\Field;
use Sunrice\Cms\Fields\Schema;
use Sunrice\Cms\Fields\Types;
use Sunrice\Cms\Models\Concerns\TranslatesText;
use Sunrice\Cms\Support\Locales;

/**
 * A form visitors fill in on the site: its fields come from a blueprint,
 * and what's sent is kept as a Submission (and emailed to `notify` and
 * the members of `notify_roles`).
 * Only the simple field types are offered to visitors (PUBLIC_TYPES).
 *
 * @property int $id
 * @property string $handle
 * @property string $title
 * @property string|null $blueprint
 * @property list<string>|null $notify
 * @property list<string>|null $notify_roles role names whose members are emailed too
 * @property string|null $message the thank-you message, in the main language (successMessage() for the others)
 * @property array<string, array<string, string>>|null $translations the thank-you message in the other languages: {"id": {"message": "Terima kasih"}}
 * @property bool $captcha visitors pass the captcha to send it
 * @property string|null $redirect_url where visitors go once it's sent
 * @property int|null $per_minute sends one visitor may make per minute (null: sunrice-cms.forms.per_minute)
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @api
 */
class Form extends Model
{
    use TranslatesText;

    /** The field types a form shows visitors; fields of other types are left out. */
    public const PUBLIC_TYPES = ['text', 'textarea', 'number', 'toggle', 'select', 'date', 'file'];

    protected $table = 'sunrice_forms';

    protected $guarded = [];

    private ?Schema $schema = null;

    protected function casts(): array
    {
        return ['notify' => 'array', 'notify_roles' => 'array', 'captcha' => 'boolean', 'per_minute' => 'integer', 'translations' => 'array'];
    }

    /** @return HasMany<Submission, $this> */
    public function submissions(): HasMany
    {
        return $this->hasMany(Submission::class);
    }

    /** The fields visitors fill in: the blueprint's, of the public types. */
    public function schema(): Schema
    {
        if ($this->schema !== null) {
            return $this->schema;
        }
        $schema = ($this->blueprint === null ? null : Blueprint::query()->where('handle', $this->blueprint)->first()?->schema()) ?? Schema::make([]);
        $hidden = array_values(array_map(fn (Field $field): string => $field->handle,
            array_filter($schema->fields(), fn (Field $field): bool => ! in_array($field->type, self::PUBLIC_TYPES, true))));

        return $this->schema = $schema->except($hidden);
    }

    /** Sends one visitor may make per minute. */
    public function perMinute(): int
    {
        $default = config('sunrice-cms.forms.per_minute', 5);

        return max(1, $this->per_minute ?? (is_numeric($default) ? (int) $default : 5));
    }

    /** Whether it has a file field (the form then sends multipart). */
    public function takesFiles(): bool
    {
        foreach ($this->schema()->fields() as $field) {
            if ($field->type === Types\FileField::TYPE) {
                return true;
            }
        }

        return false;
    }

    /**
     * What visitors see once they've sent it, in their language (null: the
     * page's): the form's message in that language; else, in the main
     * language or one the site's words have no line in, its message; else
     * the site's words (`sunrice-cms::site.forms.thanks`).
     */
    public function successMessage(?string $locale = null): string
    {
        $locale ??= Locales::current();
        $own = ($this->translations ?? [])[$locale]['message'] ?? null;
        if (is_string($own) && trim($own) !== '') {
            return $own;
        }
        $main = $this->message !== null && trim($this->message) !== '' ? $this->message : null;
        $words = Lang::hasForLocale('sunrice-cms::site.forms.thanks', $locale);
        if ($main !== null && ($locale === Locales::default() || ! $words)) {
            return $main;
        }
        $thanks = Lang::get('sunrice-cms::site.forms.thanks', [], $locale);

        return is_string($thanks) ? $thanks : 'Thank you, we got your message.';
    }
}
