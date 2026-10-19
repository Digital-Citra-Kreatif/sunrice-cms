<?php

declare(strict_types=1);

namespace Sunrice\Cms;

use Sunrice\Admin\BasePlugin;
use Sunrice\Admin\Panel;
use Sunrice\Cms\Fields\FieldType;
use Sunrice\Cms\Fields\FieldTypes;

/**
 * The CMS, added to the panel in the app's panel provider:
 *
 *     $panel->plugin(CmsPlugin::make()->fieldTypes(ColorField::class));
 *
 * @api
 */
final class CmsPlugin extends BasePlugin
{
    public const ID = 'cms';

    /** @var list<class-string<FieldType>> */
    private array $fieldTypes = [];

    public function id(): string
    {
        return self::ID;
    }

    /**
     * Field types of the app, besides the built-in ones. Plugins that
     * require the CMS register theirs on FieldTypes in their register().
     *
     * @param  class-string<FieldType>  ...$types
     */
    public function fieldTypes(string ...$types): self
    {
        array_push($this->fieldTypes, ...array_values($types));

        return $this;
    }

    public function register(Panel $panel): void
    {
        if ($this->fieldTypes !== []) {
            $types = $this->fieldTypes;
            // Only when something needs field types.
            app()->resolved(FieldTypes::class)
                ? app(FieldTypes::class)->register(...$types)
                : app()->afterResolving(FieldTypes::class, fn (FieldTypes $registry) => $registry->register(...$types));
        }
    }
}
