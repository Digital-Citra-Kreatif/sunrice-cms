<?php

declare(strict_types=1);

namespace Sunrice\Cms\Support;

use Sunrice\Admin\Mail\MailBrand;
use Sunrice\Cms\Actions\Settings\MakeSiteImages;
use Sunrice\Cms\Settings\SiteImages;
use Sunrice\Cms\Settings\SiteSettings;

/**
 * The top of every email the panel and the CMS send, with the CMS
 * (Panel::mailBrandUsing()): the site's name, and its logo's PNG for
 * emails when there is one (SiteSettings::emailLogo()).
 *
 * @internal
 */
final class SiteMailBrand
{
    public static function make(): MailBrand
    {
        $site = new SiteSettings;
        // A logo chosen before emails showed it (or changed underneath): its PNG is made once, now.
        if ($site->logo !== null && ((new SiteImages)->logo['media'] ?? null) !== $site->logo) {
            app(MakeSiteImages::class)->handle();
            $site = new SiteSettings;
        }
        $logo = $site->emailLogo();

        return $logo === null ? MailBrand::name($site->name()) : MailBrand::image($site->name(), $logo['url'], $logo['width'], $logo['height']);
    }
}
