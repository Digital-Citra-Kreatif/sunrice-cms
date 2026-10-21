<?php

declare(strict_types=1);

namespace Sunrice\Cms\Settings;

use Sunrice\Admin\Resources\Forms\CheckboxList;
use Sunrice\Admin\Resources\Forms\Form;
use Sunrice\Admin\Resources\Forms\ListInput;
use Sunrice\Admin\Resources\Forms\NumberInput;
use Sunrice\Admin\Resources\Forms\Select;
use Sunrice\Admin\Resources\Forms\Toggle;
use Sunrice\Admin\Settings\Settings;
use Sunrice\Cms\Support\CaptchaHelp;
use Sunrice\Cms\Support\RoleMembers;

/**
 * Settings → Comments, guarded by cms.settings.comments: how comments are
 * moderated and protected (see packages/cms/docs/comments.md).
 *
 * @api
 */
final class CommentSettings extends Settings
{
    /** Every comment waits for approval. */
    public const HOLD_ALL = 'all';

    /** A commenter's comments wait until one of theirs is approved. */
    public const HOLD_FIRST = 'first_time';

    /** Comments appear at once. */
    public const HOLD_NONE = 'none';

    public string $moderation = self::HOLD_FIRST;

    public bool $signedInOnly = false;

    public bool $captcha = false;

    public int $perMinute = 3;

    /** Days after an entry's publish date it takes comments; null: always. */
    public ?int $closeAfterDays = null;

    /** Reply levels shown; deeper replies line up at the last. */
    public int $depth = 3;

    public bool $notifyModerators = true;

    /** More addresses to tell about new comments, one per line. */
    public string $notifyEmails = '';

    /** @var list<string> roles whose members are told about new comments too */
    public array $notifyRoles = [];

    /** Commenters may ask for an email when someone replies. */
    public bool $replyNotifications = true;

    public static function key(): string
    {
        return 'comments';
    }

    public static function description(): string
    {
        return 'How visitors\' comments are moderated and protected.';
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            Select::make('moderation')->label('New comments')->required()->options([
                self::HOLD_FIRST => 'Hold a commenter\'s first comment for approval',
                self::HOLD_ALL => 'Hold every comment for approval',
                self::HOLD_NONE => 'Publish comments at once',
            ])->help('Comments by people who may moderate them are always published.'),
            Toggle::make('signedInOnly')->label('Only signed-in users can comment'),
            CaptchaHelp::toggle(Toggle::make('captcha')->label('Ask for a captcha'), 'Commenters prove they\'re not a robot, with :provider (as on forms).'),
            NumberInput::make('perMinute')->label('Comments per visitor a minute')->integer()->min(1)->max(100)->required(),
            NumberInput::make('closeAfterDays')->label('Close comments after (days)')->integer()->min(1)->max(36500)
                ->help('Counted from the publish date. Empty: never.'),
            NumberInput::make('depth')->label('Reply levels shown')->integer()->min(1)->max(10)->required()
                ->help('Deeper replies show at the last level.'),
            Toggle::make('notifyModerators')->label('Email moderators about new comments')
                ->help('Moderators, and the addresses below.'),
            ListInput::make('notifyEmails')->label('Also email')->emails()->addLabel('Add address')->max(50)->maxLength(1000)->placeholder('editor@example.com'),
            CheckboxList::make('notifyRoles')->label('Also email roles')->verbatim()->options(fn (): array => RoleMembers::options())
                ->help('Everyone with these roles, besides the moderators and addresses above.'),
            Toggle::make('replyNotifications')->label('Let commenters get an email when someone replies')
                ->help('If comments go live without review, only signed-in users get these.'),
        ]);
    }

    /** @return list<string> the extra addresses */
    public function extraEmails(): array
    {
        return array_values(array_filter(self::lines($this->notifyEmails), fn (string $a): bool => filter_var($a, FILTER_VALIDATE_EMAIL) !== false));
    }

    /** @return list<string> */
    private static function lines(mixed $value): array
    {
        return is_string($value) ? array_values(array_filter(array_map('trim', preg_split('/[\s,;]+/', $value) ?: []))) : [];
    }
}
