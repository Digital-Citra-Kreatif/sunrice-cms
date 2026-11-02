<?php

declare(strict_types=1);

namespace Sunrice\Cms\Settings;

use Sunrice\Admin\Resources\Forms\Form;
use Sunrice\Admin\Settings\Settings;

/**
 * The files made from Settings → Site's icon and logo (MakeSiteImages):
 * where they are, so pages print the icon's links without looking at the
 * disk. Kept as a settings section of its own (stored like the others,
 * read with them in one cached query), which no menu shows and no
 * structure file carries: an import makes the files again.
 *
 * @internal
 */
final class SiteImages extends Settings
{
    /**
     * The icon's files: `media` and `version` they were made from, the
     * `disk`, and `files`, size ("16", "32", "180", "192", "512") => path;
     * for an SVG or ICO, which isn't resized, "any" => the file's own path
     * with its `type`. Empty: no icon.
     *
     * @var array<string, mixed>
     */
    public array $icon = [];

    /**
     * The logo's PNG for emails: `media`, `version`, `disk`, `path` (null
     * when it couldn't be made: an SVG without Imagick) and its pixel
     * `width` and `height`. Empty: no logo.
     *
     * @var array<string, mixed>
     */
    public array $logo = [];

    public static function key(): string
    {
        return 'site-images';
    }

    public static function form(Form $form): Form
    {
        return $form->schema([]);
    }
}
