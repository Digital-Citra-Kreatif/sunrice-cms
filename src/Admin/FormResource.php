<?php

declare(strict_types=1);

namespace Sunrice\Cms\Admin;

use Closure;
use Illuminate\Database\Eloquent\Model;
use Sunrice\Admin\Resources\Forms\CheckboxList;
use Sunrice\Admin\Resources\Forms\Form;
use Sunrice\Admin\Resources\Forms\NumberInput;
use Sunrice\Admin\Resources\Forms\Section;
use Sunrice\Admin\Resources\Forms\Select;
use Sunrice\Admin\Resources\Forms\Textarea;
use Sunrice\Admin\Resources\Forms\TextInput;
use Sunrice\Admin\Resources\Forms\Toggle;
use Sunrice\Admin\Resources\Resource;
use Sunrice\Admin\Resources\Tables\Column;
use Sunrice\Admin\Resources\Tables\Table;
use Sunrice\Admin\Security\Captcha;
use Sunrice\Cms\Models\Blueprint;
use Sunrice\Cms\Models\Form as FormModel;
use Sunrice\Cms\Support\RoleMembers;
use Sunrice\Cms\Support\SafeUrl;

/**
 * Structure → Forms, guarded by the cms.forms.* permissions. What visitors
 * send is under Content → Submissions.
 *
 * @internal
 */
final class FormResource extends Resource
{
    /** Addresses a form may notify. */
    public const MAX_NOTIFY = 10;

    protected static string $model = FormModel::class;

    public static function navigationGroup(): string
    {
        return 'Structure';
    }

    public static function navigationIcon(): string
    {
        return 'clipboard-list';
    }

    public static function navigationSort(): int
    {
        return 97;
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            Section::make('General')->columns(2)->schema([
                TextInput::make('title')->required(),
                ...HandleField::make('form', 'Used in templates: <x-sunrice-cms::form handle="contact" />.', HandleField::WARNING),
                Select::make('blueprint')->required()
                    ->options(Blueprint::query()->orderBy('title')->get()->mapWithKeys(fn (Blueprint $blueprint): array => [$blueprint->handle => $blueprint->title])->all())
                    ->help('Its fields. Visitors see the text, textarea, number, toggle, select, date and file ones.'),
            ]),
            Section::make('Notifications')->description('Who hears about each submission. Every one is kept under Content → Submissions too.')->schema([
                Textarea::make('notify')->label('Email to')->rows(3)->maxLength(2000)->placeholder('team@example.com')
                    ->help('One address per line, up to '.self::MAX_NOTIFY.'.')
                    ->rules([function (string $attribute, mixed $value, Closure $fail): void {
                        $addresses = self::addresses($value);
                        if (count($addresses) > self::MAX_NOTIFY) {
                            $fail('Use at most '.self::MAX_NOTIFY.' addresses.');
                        }
                        foreach ($addresses as $address) {
                            if (filter_var($address, FILTER_VALIDATE_EMAIL) === false) {
                                $fail('"'.$address.'" isn\'t an email address.');

                                return;
                            }
                        }
                    }])
                    ->loadUsing(fn (Model $form): string => $form instanceof FormModel ? implode("\n", $form->notify ?? []) : '')
                    ->saveUsing(function (Model $form, mixed $value): void {
                        $form->forceFill(['notify' => self::addresses($value) ?: null])->save();
                    }),
                CheckboxList::make('notify_roles')->label('Also email roles')
                    ->options(fn (): array => RoleMembers::options())
                    ->help('Everyone with these roles also gets each submission.'),
            ]),
            Section::make('After sending')->columns(2)->schema([
                Textarea::make('message')->span(2)->label('Thank-you message')->rows(2)->maxLength(1000)
                    ->placeholder('Thank you, we got your message.'),
                TextInput::make('redirect_url')->label('Then go to')->span(2)->maxLength(2000)->placeholder('/thank-you')
                    ->rules([SafeUrl::rule()])
                    ->help('Where visitors go after sending. Empty: back to the same page.'),
            ]),
            Section::make('Spam protection')->columns(2)->schema([
                NumberInput::make('per_minute')->label('Sends per visitor a minute')->integer()->min(1)->max(1000)
                    ->placeholder((string) (new FormModel)->perMinute())
                    ->help('Per visitor (IP address). Empty: the site\'s default.'),
                Toggle::make('captcha')->label('Require a captcha')
                    ->disabled(! app(Captcha::class)->enabled())
                    ->help(app(Captcha::class)->enabled()
                        ? 'Visitors prove they\'re not a robot.'
                        : 'Needs captcha keys: set SUNRICE_CAPTCHA_SITE_KEY and SUNRICE_CAPTCHA_SECRET_KEY in .env.'),
            ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Column::make('title')->searchable()->sortable(),
                Column::make('handle')->searchable(),
                Column::make('blueprint'),
            ])
            ->defaultSort('title');
    }

    /** @return list<string> */
    private static function addresses(mixed $value): array
    {
        return is_string($value) ? array_values(array_unique(array_filter(array_map(trim(...), preg_split('/[\s,;]+/', $value) ?: [])))) : [];
    }
}
