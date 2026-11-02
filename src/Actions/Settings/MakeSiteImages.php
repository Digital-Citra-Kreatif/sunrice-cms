<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Settings;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Drivers\Gd\Driver as GdDriver;
use Intervention\Image\Drivers\Imagick\Driver as ImagickDriver;
use Intervention\Image\ImageManager;
use Intervention\Image\Interfaces\ImageInterface;
use Sunrice\Admin\Media\Media;
use Sunrice\Cms\Settings\SiteImages;
use Sunrice\Cms\Settings\SiteSettings;
use Throwable;

/**
 * Makes the files of Settings → Site's icon and logo once, when they're
 * saved (and when a structure import sets them), on the chosen image's
 * disk under a folder of their own whose name changes with the image, so
 * a new icon gets new URLs; the files made before are deleted.
 *
 * - The icon: 16, 32, 192 and 512 pixel square PNGs (padded, transparent,
 *   when the image isn't square) and a 180 pixel apple-touch-icon on an
 *   opaque background (white where the image is transparent). An SVG or
 *   ICO is used as it is.
 * - The logo: a PNG for emails, which don't show SVGs: EMAIL_HEIGHT
 *   pixels tall (twice the 48 it's shown at), its proportions kept, at
 *   most EMAIL_WIDTH wide. An SVG gets one only where the server's image
 *   library reads SVGs (Imagick); else emails show the site's name.
 *
 * Where they are is kept in SiteImages; SiteSettings::iconLinks(),
 * iconUrl() and emailLogo() read it.
 *
 * @internal
 */
final class MakeSiteImages
{
    /** The icon's PNG sizes, in pixels; 180 is the apple-touch-icon. */
    public const ICON_SIZES = [16, 32, 180, 192, 512];

    public const APPLE_TOUCH = 180;

    public const EMAIL_HEIGHT = 96;

    public const EMAIL_WIDTH = 480;

    /** The folder, on the image's disk, the files go in (one folder per image and version). */
    public const DIRECTORY = 'sunrice-site';

    /** Larger images are left alone (as the media library does): decoding them could run out of memory. */
    private const MAX_PIXELS = 40_000_000;

    /**
     * Makes what's missing or out of date (or everything, with `$force`),
     * and deletes the files no longer used.
     */
    public function handle(bool $force = false): void
    {
        $site = new SiteSettings;
        $images = new SiteImages;
        $ids = array_values(array_filter([$site->icon, $site->logo], is_int(...)));
        $media = $ids === [] ? collect() : Media::query()->whereIn('id', $ids)->get()->keyBy('id');
        $icon = $media->get($site->icon ?? 0);
        $logo = $media->get($site->logo ?? 0);

        $newIcon = $icon instanceof Media && $icon->isImage() ? ($force || ! self::current($images->icon, $icon) ? $this->icon($icon) : $images->icon) : [];
        $newLogo = $logo instanceof Media && $logo->isImage() ? ($force || ! self::current($images->logo, $logo) ? $this->logo($logo) : $images->logo) : [];
        if ($newIcon === $images->icon && $newLogo === $images->logo) {
            return;
        }

        $before = [...self::made($images->icon), ...self::made($images->logo)];
        $images->fill(['icon' => $newIcon, 'logo' => $newLogo])->save();
        $after = [...self::made($newIcon), ...self::made($newLogo)];
        foreach (array_diff($before, $after) as $old) {
            [$disk, $path] = explode("\0", $old, 2);
            try {
                Storage::disk($disk)->delete($path);
            } catch (Throwable $e) {
                Log::warning('Sunrice: can\'t delete an old site icon or logo file', ['path' => $path, 'error' => $e->getMessage()]);
            }
        }
    }

    /**
     * @param  array<string, mixed>  $made
     */
    private static function current(array $made, Media $media): bool
    {
        return ($made['media'] ?? null) === $media->id && ($made['version'] ?? null) === $media->version && ($made['disk'] ?? null) === $media->disk;
    }

    /**
     * The files made (not the image's own), as "disk\0path".
     *
     * @param  array<string, mixed>  $made
     * @return list<string>
     */
    private static function made(array $made): array
    {
        $disk = $made['disk'] ?? null;
        if (! is_string($disk)) {
            return [];
        }
        $paths = is_array($made['files'] ?? null) ? $made['files'] : [];
        unset($paths['any']); // the image itself
        if (is_string($made['path'] ?? null)) {
            $paths[] = $made['path'];
        }

        return array_values(array_map(fn (string $path): string => $disk."\0".$path, array_filter($paths, is_string(...))));
    }

    /** @return array<string, mixed> */
    private function icon(Media $media): array
    {
        $made = ['media' => $media->id, 'version' => $media->version, 'disk' => $media->disk];
        if (! $media->isResizable()) {
            // SVG or ICO: browsers take it as it is.
            return $made + ['files' => ['any' => $media->path], 'type' => $media->mime_type];
        }
        $source = $this->read($media);
        if ($source === null) {
            return $made + ['files' => []];
        }
        $disk = Storage::disk($media->disk);
        $folder = self::folder('icon', $media);
        $files = [];
        foreach (self::ICON_SIZES as $size) {
            try {
                $image = (clone $source)->contain($size, $size, $size === self::APPLE_TOUCH ? 'ffffff' : 'ffffff00');
                if ($size === self::APPLE_TOUCH) {
                    // Home screens fill transparency with black: white instead.
                    $image->blendTransparency('ffffff');
                }
                $path = $size === self::APPLE_TOUCH ? "{$folder}/apple-touch-icon.png" : "{$folder}/icon-{$size}.png";
                $disk->put($path, (string) $image->toPng(), 'public');
                $files[(string) $size] = $path;
            } catch (Throwable $e) {
                Log::warning('Sunrice: can\'t make a site icon size', ['media' => $media->id, 'size' => $size, 'error' => $e->getMessage()]);
            }
        }

        return $made + ['files' => $files];
    }

    /** @return array<string, mixed> */
    private function logo(Media $media): array
    {
        $made = ['media' => $media->id, 'version' => $media->version, 'disk' => $media->disk, 'path' => null];
        $source = $this->read($media);
        if ($source === null) {
            return $made;
        }
        try {
            $image = $source->scaleDown(self::EMAIL_WIDTH, self::EMAIL_HEIGHT);
            $path = self::folder('logo', $media).'/logo-email.png';
            Storage::disk($media->disk)->put($path, (string) $image->toPng(), 'public');

            return ['path' => $path, 'width' => $image->width(), 'height' => $image->height()] + $made;
        } catch (Throwable $e) {
            Log::warning('Sunrice: can\'t make the logo for emails', ['media' => $media->id, 'error' => $e->getMessage()]);

            return $made;
        }
    }

    /** The image decoded (its first frame), or null when it can't be. */
    private function read(Media $media): ?ImageInterface
    {
        if ($media->width !== null && $media->height !== null && $media->width * $media->height > self::MAX_PIXELS) {
            Log::info('Sunrice: no site icon or email logo from a very large image', ['media' => $media->id]);

            return null;
        }
        try {
            $contents = Storage::disk($media->disk)->get($media->path);
            if ($contents === null) {
                return null;
            }
            $image = (new ImageManager(extension_loaded('imagick') ? new ImagickDriver : new GdDriver))->read($contents);

            return $image->isAnimated() ? $image->removeAnimation() : $image;
        } catch (Throwable $e) {
            Log::warning('Sunrice: can\'t read the image for the site icon or email logo', ['media' => $media->id, 'error' => $e->getMessage()]);

            return null;
        }
    }

    /** "sunrice-site/icon-12-3-k2j4h5g6": new for each image and version, so browsers and mail clients fetch the new files. */
    private static function folder(string $kind, Media $media): string
    {
        return self::DIRECTORY."/{$kind}-{$media->id}-{$media->version}-".Str::lower(Str::random(8));
    }
}
