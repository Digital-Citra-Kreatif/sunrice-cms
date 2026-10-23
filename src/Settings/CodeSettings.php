<?php

declare(strict_types=1);

namespace Sunrice\Cms\Settings;

use Sunrice\Admin\Resources\Forms\Code;
use Sunrice\Admin\Resources\Forms\Form;
use Sunrice\Admin\Settings\Settings;

/**
 * Settings → Code, guarded by cms.settings.code: HTML added to every site
 * page as is (analytics, chat widgets, site verification), printed with
 * <x-sunrice-cms::code place="head" /> (and body-start, body-end).
 *
 * Scripts run on every visitor's browser, so give the permission only to
 * people you trust with the site. Each change is a security event and
 * emails the security alerts. `sunrice-cms.site.custom_code` false
 * (SUNRICE_SITE_CODE=false) turns it all off: no page, nothing printed,
 * the stored code kept for when it's back on.
 *
 * @api
 */
final class CodeSettings extends Settings
{
    /** Places a template prints, as `place=""` names them. */
    public const PLACES = ['head' => 'head', 'body-start' => 'bodyStart', 'body-end' => 'bodyEnd'];

    public string $head = '';

    public string $bodyStart = '';

    public string $bodyEnd = '';

    public static function key(): string
    {
        return 'code';
    }

    public static function label(): string
    {
        return 'Site code';
    }

    public static function description(): string
    {
        return 'Code added to every page of the site: analytics, chat widgets, verification tags.';
    }

    /** Off with `sunrice-cms.site.custom_code` false (SUNRICE_SITE_CODE=false): the page is gone and nothing is printed. */
    public static function available(): bool
    {
        $on = config('sunrice-cms.site.custom_code', true);

        return match (true) {
            is_bool($on) => $on,
            $on === null, $on === '' => true,
            default => filter_var($on, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE) ?? true,
        };
    }

    public static function warning(): string
    {
        return 'Code here runs on every page, in every visitor\'s browser. Only paste code from services you trust, and check it with your developer: a wrong or malicious script can break the site, steal visitors\' data or take over admin sessions. Developers can switch this page off with SUNRICE_SITE_CODE=false.';
    }

    public static function form(Form $form): Form
    {
        $help = 'Added to every page as is. Only paste code from services you trust: it runs in every visitor\'s browser.';

        return $form->schema([
            Code::make('head')->label('In the <head>')->language('html')->lines(6, 24)->maxLength(20000)->help($help),
            Code::make('bodyStart')->label('At the start of the <body>')->language('html')->lines(4, 24)->maxLength(20000)
                ->help('Added right after <body> on every page, for code a service asks to put first (a tag manager\'s <noscript>).'),
            Code::make('bodyEnd')->label('At the end of the <body>')->language('html')->lines(4, 24)->maxLength(20000)
                ->help('Added just before </body> on every page: chat widgets and scripts that can load last.'),
        ]);
    }

    /** What to print in a place (head, body-start, body-end); nothing while the feature is off. */
    public function at(string $place): string
    {
        $property = self::available() ? (self::PLACES[$place] ?? null) : null;

        return $property !== null ? trim($this->{$property}) : '';
    }
}
