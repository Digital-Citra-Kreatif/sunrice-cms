<?php

declare(strict_types=1);

namespace Sunrice\Cms\Fields\Types;

use Closure;
use Illuminate\Http\UploadedFile;
use Sunrice\Cms\Fields\Field;
use Sunrice\Cms\Fields\FieldType;

/**
 * A file visitors send with a form (config: types, a list of extensions
 * like "pdf, jpg"; max_kb; multiple with max_files, for several). Kept on
 * the private disk `sunrice-cms.forms.upload_disk`, never public: people
 * with the submissions permission download it from the submission.
 * Stored as {path, name, size, mime}, or a list of them with `multiple`.
 * Entries don't use it (use a media field).
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

    /** Files at most with `multiple`, unless max_files says. */
    public const MAX_FILES = 10;

    public function rules(Field $field): array
    {
        return self::isMultiple($field) ? ['array', 'list', 'max:'.self::maxFiles($field)] : $this->fileRules($field);
    }

    public function nestedRules(Field $field, string $key, mixed $value): array
    {
        return self::isMultiple($field) ? ["{$key}.*" => $this->fileRules($field)] : [];
    }

    /** Whether visitors may send several files. */
    public static function isMultiple(Field $field): bool
    {
        return $field->configBool('multiple');
    }

    public static function maxFiles(Field $field): int
    {
        return max(1, min(20, $field->configInt('max_files') ?? self::MAX_FILES));
    }

    /** @return list<mixed> one file's rules */
    private function fileRules(Field $field): array
    {
        $default = config('sunrice-cms.forms.upload_max_kb', 10240);
        $maxKb = $field->configInt('max_kb') ?? (is_numeric($default) ? (int) $default : 10240);
        $types = self::types($field);
        $rules = ['file', 'max:'.max(1, $maxKb), function (string $attribute, mixed $value, Closure $fail): void {
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

    /** Kept as stored by SubmitForm: {path, name, size, mime}, or a list of them. */
    public function normalize(mixed $value, Field $field): mixed
    {
        if (self::isMultiple($field)) {
            return array_values(array_filter(array_map(fn (mixed $file): ?array => self::one($file), is_array($value) && array_is_list($value) ? $value : [$value])));
        }

        return self::one($value);
    }

    /** @return array{path: string, name: string, size: int, mime: string}|null */
    private static function one(mixed $value): ?array
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
            new Field('multiple', 'toggle', 'Several files'),
            new Field('max_files', 'number', 'At most (files)', instructions: 'With several files. Empty: '.self::MAX_FILES.'; at most 20.', config: ['min' => 1, 'max' => 20, 'step' => 1]),
            new Field('max_kb', 'number', 'Largest file (KB)', instructions: 'Each file. Empty: 10240 (10 MB). PHP\'s own upload_max_filesize and post_max_size apply too.', config: ['min' => 1, 'step' => 1]),
        ];
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
