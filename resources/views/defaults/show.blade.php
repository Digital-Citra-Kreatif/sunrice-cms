{{--
    Fallback used only when the app has no sunrice templates.
    Publish starter templates with: php artisan vendor:publish --tag=sunrice-templates
--}}
<!DOCTYPE html>
<html lang="{{ $locale ?? 'en' }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <x-sunrice::seo />
    <x-sunrice::code position="head" />
</head>
<body @bodyClass>
    <x-sunrice::code position="body_start" />
    <article>
        <h1>{{ $entry->title ?? '' }}</h1>
        @foreach ($entry?->activeBlueprint()?->schema()->fields() ?? [] as $field)
            @if (($field['type'] ?? null) === 'rich_text')
                {{-- Rich text is sanitized on save. --}}
                <div class="field field-{{ $field['handle'] }}">{!! $entry->get($field['handle']) !!}</div>
            @elseif (in_array($field['type'] ?? null, ['text', 'textarea'], true) && filled($entry->get($field['handle'])))
                <p class="field field-{{ $field['handle'] }}">{!! nl2br(e($entry->get($field['handle']))) !!}</p>
            @endif
        @endforeach
    </article>
    @if ($entry)
        <x-sunrice::comments :entry="$entry" />
    @endif
    <x-sunrice::code position="body_end" />
</body>
</html>
