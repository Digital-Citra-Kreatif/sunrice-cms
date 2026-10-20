{{--
    Flexible blocks: each renders with cms/blocks/{type}.blade.php (the fieldset's handle) when you make one,
    else with cms.partials.block. A block view gets $block: $block->type, $block->key, $block['handle'].
    @include('cms.partials.blocks', ['blocks' => $values['sections']])
--}}
@foreach ($blocks as $block)
    <section class="block block-{{ $block->type }}"@if ($block->key) id="{{ $block->key }}"@endif>
        @includeFirst(['cms.blocks.'.$block->type, 'cms.partials.block'], ['block' => $block])
    </section>
@endforeach
