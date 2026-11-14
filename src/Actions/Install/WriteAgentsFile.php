<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Install;

use RuntimeException;
use Sunrice\Admin\Console\InstallOutput;

/**
 * A section of the app's `AGENTS.md` for AI coding agents (Claude Code,
 * Codex, Cursor …): where the guide to building the site is
 * (`vendor/sunrice/cms/docs/building-a-site.md`) and the rules that
 * matter most (stubs/agents.md). It sits between START and END, so
 * writing it again replaces only that section and leaves the rest of the
 * file as it is; a file without one gets it at the end. Claude Code reads
 * `CLAUDE.md`, not `AGENTS.md`: an app without a `CLAUDE.md` gets one
 * that imports it (`@AGENTS.md`); one that has its own is never changed,
 * only named when it doesn't mention `AGENTS.md`.
 *
 * sunrice:install offers it (the "cms.agents" step); sunrice:agents
 * writes it at any time.
 *
 * @internal
 */
final class WriteAgentsFile
{
    public const START = '<!-- sunrice:start -->';

    public const END = '<!-- sunrice:end -->';

    /** What handle() did to AGENTS.md. */
    public const CREATED = 'created';

    public const ADDED = 'added';

    public const UPDATED = 'updated';

    public const UNCHANGED = 'unchanged';

    /** What it found or did about CLAUDE.md. */
    public const CLAUDE_CREATED = 'created';

    public const CLAUDE_IMPORTS = 'imports';

    public const CLAUDE_OWN = 'own';

    public const QUESTION_ADD = 'Add notes on building this site with Sunrice for AI coding agents (Claude Code, Codex, Cursor) to AGENTS.md?';

    public const QUESTION_UPDATE = 'Update the Sunrice section of AGENTS.md (notes for AI coding agents)?';

    private string $directory;

    public function __construct(?string $directory = null)
    {
        $this->directory = rtrim($directory ?? base_path(), '/\\');
    }

    /** The section, markers included. */
    public static function section(): string
    {
        $notes = file_get_contents(dirname(__DIR__, 3).'/stubs/agents.md');

        return self::START."\n".trim((string) $notes)."\n".self::END;
    }

    /**
     * The file's content with the section in it: replaced where the
     * markers are, else added at the end.
     *
     * @throws RuntimeException when a start marker has no end after it
     */
    public static function merge(string $content): string
    {
        $section = self::section();
        $start = strpos($content, self::START);
        if ($start === false) {
            return trim($content) === '' ? $section."\n" : rtrim($content)."\n\n".$section."\n";
        }
        $end = strpos($content, self::END, $start);
        if ($end === false) {
            throw new RuntimeException('AGENTS.md has '.self::START.' without '.self::END.' after it: put the end marker back, or remove the section, and run php artisan sunrice:agents again.');
        }

        return substr($content, 0, $start).$section.substr($content, $end + strlen(self::END));
    }

    public function agentsPath(): string
    {
        return $this->directory.DIRECTORY_SEPARATOR.'AGENTS.md';
    }

    public function claudePath(): string
    {
        return $this->directory.DIRECTORY_SEPARATOR.'CLAUDE.md';
    }

    /**
     * What writing would do to AGENTS.md: CREATED (no file), ADDED (no
     * section), UPDATED (a different one) or UNCHANGED.
     *
     * @throws RuntimeException when its markers are broken
     */
    public function pending(): string
    {
        $content = $this->read($this->agentsPath());
        if ($content === null) {
            return self::CREATED;
        }
        if (self::merge($content) === $content) {
            return self::UNCHANGED;
        }

        return str_contains($content, self::START) ? self::UPDATED : self::ADDED;
    }

    /**
     * Writes the section, and a CLAUDE.md importing AGENTS.md when the app
     * has none.
     *
     * @return array{agents: string, claude: string}
     *
     * @throws RuntimeException when AGENTS.md's markers are broken or a file can't be written
     */
    public function handle(): array
    {
        $agents = $this->pending();
        if ($agents !== self::UNCHANGED) {
            $this->write($this->agentsPath(), self::merge($this->read($this->agentsPath()) ?? ''));
        }
        $claude = $this->read($this->claudePath());
        if ($claude === null) {
            $this->write($this->claudePath(), "@AGENTS.md\n");
        }

        return ['agents' => $agents, 'claude' => match (true) {
            $claude === null => self::CLAUDE_CREATED,
            str_contains($claude, 'AGENTS.md') => self::CLAUDE_IMPORTS,
            default => self::CLAUDE_OWN,
        }];
    }

    /**
     * What to tell people about the result, as lines.
     *
     * @param  array{agents: string, claude: string}  $result
     * @return list<array{0: string, 1: string}> detail lines: what, where
     */
    public static function details(array $result): array
    {
        $details = [];
        if ($result['agents'] !== self::UNCHANGED) {
            $details[] = ['AGENTS.md', match ($result['agents']) {
                self::CREATED => 'created, with the Sunrice section',
                self::ADDED => 'Sunrice section added',
                default => 'Sunrice section updated',
            }];
        }
        if ($result['claude'] === self::CLAUDE_CREATED) {
            $details[] = ['CLAUDE.md', 'created: @AGENTS.md, so Claude Code reads it'];
        }

        return $details;
    }

    /** The note for an app whose own CLAUDE.md doesn't import AGENTS.md, or null. */
    public static function claudeNote(string $claude): ?string
    {
        return $claude === self::CLAUDE_OWN
            ? 'Claude Code reads CLAUDE.md, not AGENTS.md: add the line @AGENTS.md to your CLAUDE.md so it reads these notes too.'
            : null;
    }

    /** The install step: offers to write the section when it's missing or out of date. */
    public function install(InstallOutput $output): void
    {
        try {
            $pending = $this->pending();
        } catch (RuntimeException $e) {
            $output->warn($e->getMessage());

            return;
        }
        if ($pending === self::UNCHANGED) {
            return;
        }
        if (! $output->confirm($pending === self::UPDATED ? self::QUESTION_UPDATE : self::QUESTION_ADD, true)) {
            $output->line('  To give AI coding agents the guide to building this site with Sunrice later: php artisan sunrice:agents');

            return;
        }
        try {
            $result = $this->handle();
        } catch (RuntimeException $e) {
            $output->warn($e->getMessage());

            return;
        }
        foreach (self::details($result) as [$what, $where]) {
            $output->detail($what, $where);
        }
        if (($note = self::claudeNote($result['claude'])) !== null) {
            $output->warn($note);
        }
    }

    private function read(string $file): ?string
    {
        if (! is_file($file)) {
            return null;
        }
        $content = file_get_contents($file);
        if ($content === false) {
            throw new RuntimeException("Couldn't read {$file}.");
        }

        return $content;
    }

    private function write(string $file, string $content): void
    {
        if (file_put_contents($file, $content, LOCK_EX) === false) {
            throw new RuntimeException("Couldn't write {$file}.");
        }
    }
}
