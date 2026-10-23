<?php

declare(strict_types=1);

namespace Sunrice\Cms\Fields\Types;

use Sunrice\Cms\Fields\Field;

/**
 * Settings that change how an input looks in the editor, never what it
 * stores: the placeholder inside it, and the prefix and suffix attached
 * to it ("Rp" 150000, 120 "m²"). The builder shows them under Appearance.
 *
 * @internal
 */
final class InputSettings
{
    /** The settings' handles, in the order the builder shows them. */
    public const HANDLES = ['placeholder', 'prefix', 'suffix'];

    /** How long a prefix or suffix may be, in characters. */
    public const AFFIX_MAX = 20;

    public static function placeholder(): Field
    {
        return new Field('placeholder', 'text', 'Placeholder', instructions: 'Shown in the empty input.', validation: ['max:255']);
    }

    /** @return list<Field> */
    public static function affixes(): array
    {
        return [
            new Field('prefix', 'text', 'Prefix', instructions: 'Before the input, not saved: https://, Rp.', validation: ['max:'.self::AFFIX_MAX]),
            new Field('suffix', 'text', 'Suffix', instructions: 'After the input, not saved: m², kg.', validation: ['max:'.self::AFFIX_MAX]),
        ];
    }
}
