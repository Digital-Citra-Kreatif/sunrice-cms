<?php

declare(strict_types=1);

namespace Sunrice\Cms\Ai;

use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Laravel\Mcp\Server\Tools\Annotations\IsReadOnly;
use Sunrice\Cms\Admin\BuilderData;

#[IsReadOnly]
#[Description('The field types for blueprint field definitions: each type, its label, whether it holds child fields ("fields"), and its settings (the keys of "config"), plus the fieldsets and the extra rules a field\'s "validation" list may use. Every field also takes handle, type, label, required, instructions, translatable and width (how much of the row it takes in the editor, in percent: one of "widths"; left out: 100).')]
final class FieldTypes extends CmsTool
{
    protected string $name = 'cms_field_types';

    public function handle(Request $request): Response
    {
        if (! $this->can('cms.blueprints.view')) {
            return $this->denied('manage blueprints');
        }

        return $this->json(app(BuilderData::class)->toArray());
    }
}
