<?php

declare(strict_types=1);

namespace Sunrice\Cms\Fields\Types;

use Closure;
use Illuminate\Http\UploadedFile;
use Sunrice\Cms\Fields\Field;
use Sunrice\Cms\Fields\FieldType;

/**
 * A file visitors send with a form (config: types, a list of extensions
 * like "pdf, jpg"; max_kb). Kept on the private disk
 * `sunrice-cms.forms.upload_disk`, never public: people with the
 * submissions permission download it from the submission. Stored as
 * {path, name, size, mime}. Entries don't use it (use a media field).
 */
final class FileField extends FieldType
{
    public const TYPE = 'file';

    /** Never accepted, whatever the field allows: files a server or browser could run. */
    public const BLOCKED = ['php', 'php3', 'php4', 'php5', 'php7', 'php8', 'phtml', 'phar', 'pht', 'phps', 'html', 'htm', 'xhtml', 'shtml', 'svg', 'svgz',
        'js', 'mjs', 'jsp', 'asp', 'aspx', 'cgi', 'pl', 'py', 'rb', 'sh', 'bash', 'exe', 'dll', 'bat', 'cmd', 'com', 'msi', 'vbs', 'jar', 'htaccess', 'xml', 'xsl'];

    public function type(): string
    {
        return self::TYPE;
    }

    public function label(): string
    {
        return 'File (forms)';
    }

    public function rules(Field $field): array
    {
        $types = self::types($field);
        $rules = ['file', 'max:'.self::ownMaxKb($field), function (string $attribute, mixed $value, Closure $fail): void {
            if ($value instanceof UploadedFile && array_intersect(self::extensions($value), self::BLOCKED) !== []) {
                $fail('Files of this type can\'t be sent.');
            }
        }];
        if ($types !== []) {
            $rules[] = 'extensions:'.implode(',', $types);
            $rules[] = 'mimes:'.implode(',', $types);
        }

        return $rules;
    }

    /** Kept as stored by SubmitForm: {path, name, size, mime}. */
    public function normalize(mixed $value, Field $field): mixed
    {
        if (! is_array($value) || ! is_string($value['path'] ?? null) || ! is_string($value['name'] ?? null)) {
            return null;
        }

        return [
            'path' => $value['path'],
            'name' => $value['name'],
            'size' => is_int($value['size'] ?? null) ? $value['size'] : 0,
            'mime' => is_string($value['mime'] ?? null) ? $value['mime'] : 'application/octet-stream',
        ];
    }

    public function settings(): array
    {
        return [
            new Field('types', 'text', 'Accepted file types', instructions: 'Extensions, like "pdf, jpg, png, docx". Empty: any file, but those that could run as code.'),
            new Field('max_kb', 'number', 'Largest file (KB)', instructions: 'Empty: 10240 (10 MB). PHP\'s own upload_max_filesize and post_max_size apply too.', config: ['min' => 1, 'step' => 1]),
        ];
    }

    /** The largest file the field takes, in KB, as set (`max_kb`, else `sunrice-cms.forms.upload_max_kb`). */
    private static function ownMaxKb(Field $field): int
    {
        $default = config('sunrice-cms.forms.upload_max_kb', 10240);

        return max(1, $field->configInt('max_kb') ?? (is_numeric($default) ? (int) $default : 10240));
    }

    /** The largest file the field can take, in KB: its own limit, or PHP's upload_max_filesize when that's lower. */
    public static function maxKb(Field $field): int
    {
        $php = self::iniKb((string) ini_get('upload_max_filesize'));

        return $php !== null ? min(self::ownMaxKb($field), $php) : self::ownMaxKb($field);
    }

    /** What the form says under the field: the types it accepts and how large a file may be. */
    public static function hint(Field $field, ?string $locale = null): string
    {
        $size = self::size(self::maxKb($field));
        $types = self::types($field);

        return $types === []
            ? __('sunrice-cms::site.forms.file_size', ['size' => $size], $locale)
            : __('sunrice-cms::site.forms.file_hint', ['types' => strtoupper(implode(', ', $types)), 'size' => $size], $locale);
    }

    /** A size in KB as people read it: "500 KB", "2 MB". */
    public static function size(int $kb): string
    {
        return $kb >= 1024 ? rtrim(rtrim(number_format($kb / 1024, 1, '.', ''), '0'), '.').' MB' : $kb.' KB';
    }

    /** "2M", "512K", "1G" or bytes, in KB (null: no limit or unreadable). */
    private static function iniKb(string $value): ?int
    {
        if (preg_match('/^\s*(\d+)\s*([kmg]?)\s*$/i', $value, $m) !== 1 || (int) $m[1] <= 0) {
            return null;
        }

        return match (strtolower($m[2])) {
            'g' => (int) $m[1] * 1024 * 1024,
            'm' => (int) $m[1] * 1024,
            'k' => (int) $m[1],
            default => max(1, intdiv((int) $m[1], 1024)),
        };
    }

    /**
     * The field's accepted extensions, lowercase, without blocked ones.
     *
     * @return list<string>
     */
    public static function types(Field $field): array
    {
        $types = $field->config('types');
        $list = is_string($types) ? preg_split('/[\s,;]+/', strtolower($types)) : (is_array($types) ? $types : []);
        $clean = [];
        foreach ($list ?: [] as $type) {
            $type = is_string($type) ? ltrim(trim($type), '.') : '';
            if (preg_match('/^[a-z0-9]{1,10}$/', $type) === 1 && ! in_array($type, self::BLOCKED, true)) {
                $clean[] = $type;
            }
        }

        return array_values(array_unique($clean));
    }

    /**
     * What an upload says it is: the name's extension and the content's.
     *
     * @return list<string>
     */
    private static function extensions(UploadedFile $file): array
    {
        return array_values(array_filter(array_map(fn (?string $ext): string => strtolower((string) $ext),
            [$file->getClientOriginalExtension(), $file->guessExtension()])));
    }
}
