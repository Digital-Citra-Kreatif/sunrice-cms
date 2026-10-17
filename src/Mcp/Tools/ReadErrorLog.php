<?php

declare(strict_types=1);

namespace Sunrice\Mcp\Tools;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Laravel\Mcp\Server\Tools\Annotations\IsReadOnly;

#[IsReadOnly]
#[Description('Read the site\'s recent errors from the Laravel log (storage/logs), newest first. Identical errors are grouped with a count and the first and last time they happened. Each has the level, message, exception class, the file and line it was thrown at, and the top of the stack trace (the site\'s own files first). Passwords, tokens and keys are masked. Filter with level (the lowest level to include, default error), since_hours and search. Use it when the user reports something broken, then explain the likely cause and the fix. Needs the "Let AI agents read the error log" permission.')]
class ReadErrorLog extends SunriceTool
{
    protected string $name = 'read_error_log';

    /** Monolog levels, most severe first. */
    protected const LEVELS = ['emergency', 'alert', 'critical', 'error', 'warning', 'notice', 'info', 'debug'];

    /** How much of the end of each log file is read. */
    protected const TAIL_BYTES = 2 * 1024 * 1024;

    protected const MAX_FILES = 3;

    protected const FRAMES = 8;

    public function handle(Request $request): Response
    {
        if (! config('sunrice.mcp.error_log', true)) {
            return Response::error('Reading the error log is turned off on this site (sunrice.mcp.error_log).');
        }
        $this->authorize('sunrice.error-log.view');
        $args = $request->validate([
            'level' => ['nullable', 'in:'.implode(',', self::LEVELS)],
            'since_hours' => ['nullable', 'integer', 'min:1', 'max:8760'],
            'search' => ['nullable', 'string', 'max:255'],
            'limit' => ['nullable', 'integer', 'min:1', 'max:50'],
        ]);

        $maxLevel = (int) array_search($args['level'] ?? 'error', self::LEVELS, true);
        $since = isset($args['since_hours']) ? now()->subHours((int) $args['since_hours']) : null;
        $search = isset($args['search']) ? mb_strtolower((string) $args['search']) : null;
        $limit = (int) ($args['limit'] ?? 10);

        $groups = [];
        $files = $this->files();
        foreach ($files as $file) {
            foreach ($this->entries($file) as $entry) {
                $rank = array_search($entry['level'], self::LEVELS, true);
                if ($rank === false || $rank > $maxLevel) {
                    continue;
                }
                if ($since !== null && $entry['at'] < $since->format('Y-m-d H:i:s')) {
                    continue;
                }
                if ($search !== null && ! str_contains(mb_strtolower($entry['message'].' '.($entry['exception'] ?? '')), $search)) {
                    continue;
                }

                $key = $entry['level'].'|'.($entry['exception'] ?? '').'|'.($entry['at_file'] ?? $entry['message']);
                if (! isset($groups[$key])) {
                    $groups[$key] = $entry + ['count' => 0, 'first_seen' => $entry['at'], 'last_seen' => $entry['at']];
                }
                $groups[$key]['count']++;
                $groups[$key]['first_seen'] = min($groups[$key]['first_seen'], $entry['at']);
                if ($entry['at'] >= $groups[$key]['last_seen']) {
                    // Keep the newest occurrence's details.
                    $groups[$key] = array_merge($groups[$key], $entry, ['last_seen' => $entry['at']]);
                }
            }
        }

        usort($groups, fn (array $a, array $b) => strcmp($b['last_seen'], $a['last_seen']));
        $groups = array_slice($groups, 0, $limit);

        return $this->json([
            'files' => array_map(fn (string $file) => $this->relative($file), $files),
            'count' => count($groups),
            'errors' => array_map(fn (array $group) => array_filter([
                'level' => $group['level'],
                'count' => $group['count'],
                'first_seen' => $group['first_seen'],
                'last_seen' => $group['last_seen'],
                'environment' => $group['environment'],
                'message' => $group['message'],
                'exception' => $group['exception'] ?? null,
                'at' => $group['at_file'] ?? null,
                'trace' => $group['trace'] ?? null,
            ], fn ($value) => $value !== null && $value !== []), $groups),
        ]);
    }

    /**
     * The newest log files: laravel.log and daily laravel-YYYY-MM-DD.log.
     *
     * @return array<int, string>
     */
    protected function files(): array
    {
        $dir = (string) (config('sunrice.mcp.log_path') ?: storage_path('logs'));
        $files = glob(rtrim($dir, '/').'/*.log') ?: [];
        usort($files, fn (string $a, string $b) => (filemtime($b) ?: 0) <=> (filemtime($a) ?: 0));

        return array_slice($files, 0, self::MAX_FILES);
    }

    /**
     * Parsed entries of one file, from the last TAIL_BYTES of it.
     *
     * @return array<int, array<string, mixed>>
     */
    protected function entries(string $file): array
    {
        $size = filesize($file) ?: 0;
        $handle = fopen($file, 'rb');
        if ($handle === false) {
            return [];
        }
        fseek($handle, max(0, $size - self::TAIL_BYTES));
        $content = (string) stream_get_contents($handle);
        fclose($handle);

        $parts = preg_split('/^\[(\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}:\d{2})[^\]]*\] (\w+)\.(\w+): /m', $content, -1, PREG_SPLIT_DELIM_CAPTURE) ?: [];
        $entries = [];
        // [0] is text before the first entry (cut by the tail), then 4 per entry.
        for ($i = 1; $i + 3 < count($parts); $i += 4) {
            $entries[] = $this->entry(str_replace('T', ' ', $parts[$i]), $parts[$i + 1], strtolower($parts[$i + 2]), $parts[$i + 3]);
        }

        return $entries;
    }

    /** @return array<string, mixed> */
    protected function entry(string $at, string $environment, string $level, string $body): array
    {
        // The context is JSON-encoded: class names come as 'App\\Models\\Entry'.
        $body = str_replace('\\\\', '\\', $body);
        $message = trim((string) strtok($body, "\n"));
        // Monolog appends the context and extra: '… {"exception":"[object] …' or '… [] []'.
        $message = trim((string) preg_replace('/\s+(\{"|\[\]).*$/s', '', $message)) ?: $message;

        $entry = ['at' => $at, 'environment' => $environment, 'level' => $level, 'message' => $this->clean($message, 1000)];

        if (preg_match('/\[object\] \(([\w\\\\]+)\(code: [^)]*\): (.*?) at (\S+?):(\d+)\)/s', $body, $m) === 1) {
            $entry['exception'] = $m[1];
            $entry['at_file'] = $this->relative($m[3]).':'.$m[4];
        }

        if (preg_match_all('/^#\d+ (.+)$/m', $body, $frames) > 0) {
            $all = array_map(fn (string $frame) => $this->clean($this->relative(trim($frame, '" ')), 300), $frames[1]);
            // The site's own files say most about a fix; vendor frames follow.
            $own = array_values(array_filter($all, fn (string $frame) => ! str_starts_with($frame, 'vendor/') && ! str_starts_with($frame, '[internal') && $frame !== '{main}'));
            $entry['trace'] = array_slice(array_values(array_unique([...$own, ...$all])), 0, self::FRAMES);
        }

        return $entry;
    }

    /** Paths relative to the project, so traces are short and point at files. */
    protected function relative(string $path): string
    {
        return str_replace(rtrim(base_path(), '/').'/', '', $path);
    }

    /** Masks secrets that end up in log messages, and caps the length. */
    protected function clean(string $text, int $max): string
    {
        $text = (string) preg_replace([
            '/\b(Bearer|Basic)\s+[A-Za-z0-9._~+\/=-]+/i',
            '/\bsr_[A-Za-z0-9]{8,}/',
            '/\bbase64:[A-Za-z0-9+\/=]{20,}/',
            '#(://[^:/\s@]+):[^@\s]+@#',
            '/(["\']?(?:password|passwd|pwd|secret|token|api[_-]?key|authorization)["\']?\s*[:=]\s*)(["\']?)[^"\'\s,}&]+/i',
        ], [
            '$1 [masked]',
            'sr_[masked]',
            'base64:[masked]',
            '$1:[masked]@',
            '$1$2[masked]',
        ], $text);

        return mb_strlen($text) > $max ? mb_substr($text, 0, $max).'…' : $text;
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'level' => $schema->string()->enum(self::LEVELS)->description('The lowest level to include (default error: error, critical, alert and emergency).'),
            'since_hours' => $schema->integer()->description('Only the last N hours.'),
            'search' => $schema->string()->description('Text in the message or exception class.'),
            'limit' => $schema->integer()->description('How many distinct errors (default 10, at most 50).'),
        ];
    }
}
