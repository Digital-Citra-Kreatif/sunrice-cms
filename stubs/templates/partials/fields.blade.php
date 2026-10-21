{{--
    Prints fields as they come: text, rich text, images, links and flexible blocks; skips what it doesn't know
    (repeaters, groups, numbers…: print those in your own templates, by handle: $values['price']).
    @include('cms.partials.fields', ['values' => $values, 'richText' => $richText])
--}}
@foreach ($values as $handle => $value)
    @continue($handle === 'seo' || $value === null || $value === '')
    @if (is_string($value))
        {{-- Only rich text is HTML (cleaned when saved); everything else is escaped. --}}
        @if (in_array($handle, $richText, true))
            <div class="prose">{!! $value !!}</div>
        @else
            <p>{{ $value }}</p>
        @endif
    @elseif ($value instanceof \Sunrice\Admin\Media\Media && $value->isImage())
        <figure>
            <img src="{{ $value->url() }}" alt="{{ $value->altIn() ?? '' }}" loading="lazy">
        </figure>
    @elseif ($value instanceof \Illuminate\Support\Collection && $value->first() instanceof \Sunrice\Cms\Fields\Block)
        @include('cms.partials.blocks', ['blocks' => $value])
    @elseif ($value instanceof \Illuminate\Support\Collection && $value->first() instanceof \Sunrice\Admin\Media\Media)
        <ul class="gallery">
            @foreach ($value as $media)
                @if ($media->isImage())
                    <li><img src="{{ $media->url() }}" alt="{{ $media->altIn() ?? '' }}" loading="lazy"></li>
                @endif
            @endforeach
        </ul>
    @elseif (is_array($value) && isset($value['type'], $value['new_tab']) && is_string($value['url'] ?? null))
        <p><a class="button" href="{{ $value['url'] }}"@if ($value['new_tab']) target="_blank" rel="noopener"@endif>{{ $value['label'] ?? $value['title'] ?? $value['url'] }}</a></p>
    @endif
@endforeach
