{{--
    A menu, with its sub-menus (up to three levels): @include('cms.partials.menu', ['items' => cms_menu('main')]).
    Each item: label, url, new_tab, active (the page shown), active_trail (the page shown is below it), children.
--}}
<ul>
    @foreach ($items as $item)
        <li @class(['is-active' => $item['active_trail']])>
            <a href="{{ $item['url'] }}"@if ($item['active']) aria-current="page"@endif @if ($item['new_tab']) target="_blank" rel="noopener"@endif>{{ $item['label'] }}</a>
            @if ($item['children'] !== [])
                @include('cms.partials.menu', ['items' => $item['children']])
            @endif
        </li>
    @endforeach
</ul>
