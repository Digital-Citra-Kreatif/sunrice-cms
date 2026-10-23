{{-- A block without a view of its own (cms/blocks/{type}.blade.php): its fields, as cms.partials.fields prints them. --}}
@php($blockFields = collect(app(\Sunrice\Cms\Fields\Fieldsets::class)->fields($block->type) ?? []))
@include('cms.partials.fields', [
    'values' => $block->values,
    'richText' => $blockFields->where('type', 'rich_text')->pluck('handle')->all(),
    'code' => $blockFields->where('type', 'code')->mapWithKeys(fn ($field) => [$field->handle => \Sunrice\Cms\Fields\Types\Code::language($field)])->all(),
])
