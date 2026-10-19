<?php

declare(strict_types=1);

namespace Sunrice\Cms\Settings;

use Sunrice\Admin\Resources\Forms\Form;
use Sunrice\Admin\Resources\Forms\Textarea;
use Sunrice\Admin\Settings\Settings;

/**
 * Settings → Code, guarded by cms.settings.code: HTML added to every site
 * page as is (analytics, chat widgets, site verification), printed with
 * <x-sunrice-cms::code place="head" /> (and body-start, body-end).
 *
 * Scripts run on every visitor's browser, so give the permission only to
 * people you trust with the site. Each change is a security event and
 * emails the security alerts.
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

    public static function form(Form $form): Form
    {
        $help = 'Added to every page as is. Only paste code from services you trust: it runs in every visitor\'s browser.';

        return $form->schema([
            Textarea::make('head')->label('In the <head>')->rows(6)->maxLength(20000)->help($help),
            Textarea::make('bodyStart')->label('At the start of the <body>')->rows(4)->maxLength(20000),
            Textarea::make('bodyEnd')->label('At the end of the <body>')->rows(4)->maxLength(20000),
        ]);
    }

    /** What to print in a place (head, body-start, body-end). */
    public function at(string $place): string
    {
        $property = self::PLACES[$place] ?? null;

        return $property !== null ? trim($this->{$property}) : '';
    }
}
