<?php

declare(strict_types=1);

namespace Sunrice\Cms\Support;

use Sunrice\Admin\Resources\Forms\Toggle;
use Sunrice\Admin\Security\Captcha;

/**
 * The captcha switches of forms and comments: on when a captcha service
 * is set up, saying which; otherwise off and disabled, with a short reason
 * for editors, a link to the guide, and what to set in "For developers".
 *
 * @internal
 */
final class CaptchaHelp
{
    /** @param string $whenOn the help when it's set up; ":provider" is its name */
    public static function toggle(Toggle $toggle, string $whenOn): Toggle
    {
        $captcha = app(Captcha::class);
        if ($captcha->enabled()) {
            $help = __($whenOn, ['provider' => $captcha->name()]);

            return $toggle->help(is_string($help) ? $help : $whenOn);
        }

        return $toggle->disabled()
            ->help('Not set up yet: ask your developer to connect a captcha service.')
            ->helpLink('How', 'guide/website/settings#captcha')
            ->developerHelp('Set these in the app\'s .env with the keys from Cloudflare Turnstile (free), Google reCAPTCHA v2 or hCaptcha, then clear the config cache:', Captcha::ENV_EXAMPLE);
    }
}
