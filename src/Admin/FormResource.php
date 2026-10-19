<?php

declare(strict_types=1);

namespace Sunrice\Cms\Admin;

use Closure;
use Illuminate\Database\Eloquent\Model;
use Sunrice\Admin\Resources\Forms\Form;
use Sunrice\Admin\Resources\Forms\Select;
use Sunrice\Admin\Resources\Forms\Textarea;
use Sunrice\Admin\Resources\Forms\TextInput;
use Sunrice\Admin\Resources\Resource;
use Sunrice\Admin\Resources\Tables\Column;
use Sunrice\Admin\Resources\Tables\Table;
use Sunrice\Cms\Models\Blueprint;
use Sunrice\Cms\Models\Form as FormModel;

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
            TextInput::make('title')->required(),
            TextInput::make('handle')->required()->maxLength(64)->unique()->onlyOnCreate()
                ->rules(['regex:/^[a-z][a-z0-9_]*$/'])
                ->help('How templates show it: <x-sunrice-cms::form handle="contact" />. It can\'t change later.'),
            Select::make('blueprint')->required()
                ->options(Blueprint::query()->orderBy('title')->get()->mapWithKeys(fn (Blueprint $blueprint): array => [$blueprint->handle => $blueprint->title])->all())
                ->help('Its fields. Visitors get the text, textarea, number, toggle, select and date ones.'),
            Textarea::make('notify')->label('Email to')->rows(3)->maxLength(2000)->placeholder('team@example.com')
                ->help('One address per line, at most '.self::MAX_NOTIFY.'. Empty: submissions are only kept here.')
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
            Textarea::make('message')->label('Thank-you message')->rows(2)->maxLength(1000)
                ->placeholder('Thank you, we got your message.'),
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
