{{--
    <x-sunrice-cms::entry-filter>: without a slot, this form, the applied filters, the entries and the
    page links; with one, only the slot (with $component). Publish the views to change this markup.
    Inside a class component's own view, its properties ($filters) and methods ($clearUrl()) are variables.
--}}
@if ($slot->isNotEmpty())
{{ $slot }}
@else
<div class="sunrice-entry-filter">
    <form method="GET" action="{{ $action }}" role="search" aria-label="{{ __('sunrice-cms::site.filter.label') }}" {{ $attributes }}>
        @foreach ($others as $param => $kept)
            @if (is_scalar($kept))
                <input type="hidden" name="{{ $param }}" value="{{ $kept }}">
            @endif
        @endforeach
        @foreach ($filters as $control)
            <div class="sunrice-entry-filter__control sunrice-entry-filter__control--{{ $control->type }}">
                @switch ($control->type)
                    @case ('search')
                        <label for="{{ $control->id() }}">{{ $control->label }}</label>
                        <input type="search" id="{{ $control->id() }}" name="{{ $control->inputs['value'] }}" value="{{ $control->value }}" maxlength="100">
                        @break
                    @case ('toggle')
                        <input type="checkbox" id="{{ $control->id() }}" name="{{ $control->inputs['value'] }}" value="1" @checked($control->value === true)>
                        <label for="{{ $control->id() }}">{{ $control->label }}</label>
                        @break
                    @case ('range')
                    @case ('date_range')
                        <fieldset>
                            <legend>{{ $control->label }}</legend>
                            @foreach ($control->inputs as $part => $input)
                                <label for="{{ $control->id($part) }}">{{ __('sunrice-cms::site.filter.'.$part) }}</label>
                                @if ($control->options !== [])
                                    <select id="{{ $control->id($part) }}" name="{{ $input }}">
                                        <option value="">{{ __('sunrice-cms::site.filter.all') }}</option>
                                        @foreach ($control->options as $option)
                                            <option value="{{ $option['value'] }}" @selected(is_array($control->value) && ($control->value[$part] ?? null) === $option['value'])>{{ $option['label'] }}</option>
                                        @endforeach
                                    </select>
                                @else
                                <input type="{{ $control->type === 'range' ? 'number' : 'date' }}" @if ($control->type === 'range') step="any" @endif
                                    id="{{ $control->id($part) }}" name="{{ $input }}" value="{{ is_array($control->value) ? ($control->value[$part] ?? '') : '' }}">
                                @endif
                            @endforeach
                        </fieldset>
                        @break
                    @default
                        @if ($control->multiple)
                            <fieldset>
                                <legend>{{ $control->label }}</legend>
                                @foreach ($control->options as $i => $option)
                                    <div @if (($option['depth'] ?? 0) > 0) style="margin-inline-start: {{ ($option['depth'] ?? 0) * 1.25 }}em" @endif>
                                        <input type="checkbox" id="{{ $control->id((string) $i) }}" name="{{ $control->inputs['value'] }}" value="{{ $option['value'] }}" @checked($option['selected'])>
                                        <label for="{{ $control->id((string) $i) }}">{{ $option['label'] }}@isset($option['count']) <span class="sunrice-entry-filter__count">({{ $option['count'] }})</span>@endisset</label>
                                    </div>
                                @endforeach
                            </fieldset>
                        @else
                            <label for="{{ $control->id() }}">{{ $control->label }}</label>
                            @if ($control->options === [])
                                <input type="text" id="{{ $control->id() }}" name="{{ $control->inputs['value'] }}" value="{{ is_string($control->value) ? $control->value : '' }}">
                            @else
                                <select id="{{ $control->id() }}" name="{{ $control->inputs['value'] }}">
                                    <option value="">{{ __('sunrice-cms::site.filter.all') }}</option>
                                    @foreach ($control->options as $option)
                                        <option value="{{ $option['value'] }}" @selected($option['selected'])>{{ str_repeat('— ', $option['depth'] ?? 0) }}{{ $option['label'] }}</option>
                                    @endforeach
                                </select>
                            @endif
                        @endif
                @endswitch
            </div>
        @endforeach
        @if (count($sorts) > 1)
            <div class="sunrice-entry-filter__control sunrice-entry-filter__control--sort">
                <label for="filter-{{ $sortName }}">{{ __('sunrice-cms::site.filter.sort_by') }}</label>
                <select id="filter-{{ $sortName }}" name="{{ $sortName }}">
                    @foreach ($sorts as $sort)
                        <option value="{{ $sort->value }}" @selected($sort->selected)>{{ $sort->label }}</option>
                    @endforeach
                </select>
            </div>
        @endif
        <button type="submit">{{ __('sunrice-cms::site.filter.show') }}</button>
    </form>

    @if ($filtered())
        <ul class="sunrice-entry-filter__active" aria-label="{{ __('sunrice-cms::site.filter.applied') }}">
            @foreach ($active as $chip)
                <li><a href="{{ $chip->removeUrl }}" aria-label="{{ __('sunrice-cms::site.filter.remove', ['filter' => $chip->label, 'value' => $chip->value]) }}">{{ $chip->label }}: {{ $chip->value }} <span aria-hidden="true">×</span></a></li>
            @endforeach
            <li><a href="{{ $clearUrl() }}">{{ __('sunrice-cms::site.filter.clear') }}</a></li>
        </ul>
    @endif

    <p class="sunrice-entry-filter__status" role="status" aria-live="polite">{{ trans_choice('sunrice-cms::site.filter.results', $entries->total(), ['count' => $entries->total()]) }}</p>

    @if ($entries->isNotEmpty())
        <ul class="sunrice-entry-filter__entries">
            @foreach ($entries as $entry)
                <li><a href="{{ $entry->url() }}">{{ $entry->title }}</a></li>
            @endforeach
        </ul>
        {{ $entries->links() }}
    @endif
</div>
@endif
