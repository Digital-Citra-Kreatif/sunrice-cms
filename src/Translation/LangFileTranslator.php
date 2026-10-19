<?php

declare(strict_types=1);

namespace Sunrice\Cms\Translation;

use Closure;
use Illuminate\Support\Facades\File;
use Throwable;

/**
 * Translates the app's Laravel language files: the PHP files under
 * lang/<from>/ (subfolders too) and lang/<from>.json, written to the same
 * place for the target language. Keys already translated are kept unless
 * $force; keys only the target has are kept.
 *
 * @internal
 */
final class LangFileTranslator
{
    /** Joins nested keys; it can't appear in a real key. */
    private const SEPARATOR = "\x1F";

    /** @var Closure(string): void|null */
    private ?Closure $report = null;

    private readonly string $path;

    public function __construct(
        private readonly Translator $translator,
        private readonly string $from,
        private readonly string $to,
        private readonly bool $force = false,
        private readonly bool $dryRun = false,
        public readonly TranslationStats $stats = new TranslationStats,
        ?string $path = null,
    ) {
        $this->path = $path ?? lang_path();
    }

    /** @param Closure(string): void $report */
    public function onProgress(Closure $report): self
    {
        $this->report = $report;

        return $this;
    }

    public function translate(): void
    {
        // Language codes only: never a path out of the lang folder.
        if (! self::code($this->from) || ! self::code($this->to)) {
            return;
        }
        $source = $this->path.'/'.$this->from;
        if (is_dir($source)) {
            foreach (File::allFiles($source) as $file) {
                if ($file->getExtension() === 'php') {
                    $this->phpFile($file->getRelativePathname());
                }
            }
        }
        if (is_file($this->path.'/'.$this->from.'.json')) {
            $this->jsonFile();
        }
    }

    private static function code(string $locale): bool
    {
        return preg_match('/^[A-Za-z]{2,3}([_-][A-Za-z0-9]{2,8})*$/', $locale) === 1;
    }

    private function phpFile(string $relative): void
    {
        $target = "{$this->path}/{$this->to}/{$relative}";
        $merged = $this->translateMap(
            $this->flatten($this->load("{$this->path}/{$this->from}/{$relative}")),
            is_file($target) ? $this->flatten($this->load($target)) : [],
            "lang/{$this->from}/{$relative}",
        );
        if ($merged !== null) {
            File::ensureDirectoryExists(dirname($target));
            File::put($target, "<?php\n\nreturn ".$this->export($this->unflatten($merged)).";\n");
        }
    }

    private function jsonFile(): void
    {
        $target = "{$this->path}/{$this->to}.json";
        $merged = $this->translateMap(
            $this->strings(json_decode(File::get("{$this->path}/{$this->from}.json"), true)),
            is_file($target) ? $this->strings(json_decode(File::get($target), true)) : [],
            "lang/{$this->from}.json",
        );
        if ($merged !== null) {
            File::put($target, json_encode($merged, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)."\n");
        }
    }

    /**
     * The target's strings with the missing ones translated, in the
     * source's order then the target's own; null when nothing changed.
     *
     * @param  array<string, string>  $source
     * @param  array<string, string>  $target
     * @return array<string, string>|null
     */
    private function translateMap(array $source, array $target, string $label): ?array
    {
        $pending = [];
        foreach ($source as $key => $text) {
            $theirs = $target[$key] ?? '';
            if (! $this->force && $theirs !== '' && $theirs !== $text) {
                $this->stats->skipped++;
            } elseif (trim($text) !== '') {
                $pending[$key] = $text;
            }
        }
        if ($pending === []) {
            return null;
        }
        if ($this->dryRun) {
            $this->stats->pending += count($pending);
            $this->say("{$label}: ".count($pending).' to translate');

            return null;
        }

        try {
            $answer = $this->translator->translate($pending, $this->from, $this->to, 'Interface text of a web application');
        } catch (Throwable $e) {
            $this->stats->failed += count($pending);
            $this->say("{$label}: failed ({$e->getMessage()})");

            return null;
        }
        $merged = [];
        $written = 0;
        foreach ($source as $key => $text) {
            if (isset($pending[$key], $answer[$key])) {
                $merged[$key] = $answer[$key];
                $written++;
            } else {
                if (isset($pending[$key])) {
                    $this->stats->failed++;
                }
                if (isset($target[$key])) {
                    $merged[$key] = $target[$key];
                }
            }
        }
        $this->stats->translated += $written;
        $this->say("{$label}: {$written} translated");

        return $written > 0 ? $merged + $target : null;
    }

    /** @return array<mixed> */
    private function load(string $file): array
    {
        $data = require $file;

        return is_array($data) ? $data : [];
    }

    /** @return array<string, string> */
    private function strings(mixed $json): array
    {
        $strings = [];
        foreach (is_array($json) ? $json : [] as $key => $value) {
            if (is_string($value)) {
                $strings[(string) $key] = $value;
            }
        }

        return $strings;
    }

    /**
     * @param  array<mixed>  $array
     * @return array<string, string>
     */
    private function flatten(array $array, string $prefix = ''): array
    {
        $flat = [];
        foreach ($array as $key => $value) {
            if (is_array($value)) {
                $flat += $this->flatten($value, $prefix.$key.self::SEPARATOR);
            } elseif (is_string($value)) {
                $flat[$prefix.$key] = $value;
            }
        }

        return $flat;
    }

    /**
     * @param  array<string, string>  $flat
     * @return array<mixed>
     */
    private function unflatten(array $flat): array
    {
        $nested = [];
        foreach ($flat as $path => $value) {
            $nested = self::put($nested, explode(self::SEPARATOR, $path), $value);
        }

        return $nested;
    }

    /**
     * @param  array<mixed>  $array
     * @param  list<string>  $segments
     * @return array<mixed>
     */
    private static function put(array $array, array $segments, string $value): array
    {
        $key = array_shift($segments) ?? '';
        $array[$key] = $segments === [] ? $value : self::put(is_array($array[$key] ?? null) ? $array[$key] : [], $segments, $value);

        return $array;
    }

    /** @param array<mixed> $array */
    private function export(array $array, int $depth = 1): string
    {
        $lines = [];
        foreach ($array as $key => $value) {
            $lines[] = str_repeat('    ', $depth).var_export($key, true).' => '.(is_array($value) ? $this->export($value, $depth + 1) : var_export($value, true)).',';
        }

        return $lines === [] ? '[]' : "[\n".implode("\n", $lines)."\n".str_repeat('    ', $depth - 1).']';
    }

    private function say(string $line): void
    {
        if ($this->report !== null) {
            ($this->report)($line);
        }
    }
}
