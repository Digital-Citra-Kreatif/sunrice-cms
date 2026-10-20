{{--
    A form for visitors: <x-sunrice-cms::form handle="contact" />, with
    the form's fields, the honeypot, its errors and the thank-you message.
    Publish the views to change the markup; extra attributes go on <form>.
--}}
@props(['handle', 'submit' => null])
@php
    $form = \Sunrice\Cms\Models\Form::query()->where('handle', $handle)->first();
    $bag = $form ? ($errors ?? new \Illuminate\Support\ViewErrorBag)->getBag($form->handle) : null;
    $sent = $form ? session(\Sunrice\Cms\Site\FormController::flashKey($form)) : null;
@endphp
@if ($form)
<form method="POST" action="{{ route('sunrice.cms.forms.submit', $form->handle) }}" id="form-{{ $form->handle }}" @if ($form->takesFiles()) enctype="multipart/form-data" @endif {{ $attributes }}>
    @csrf
    <x-honeypot />
    <input type="hidden" name="locale" value="{{ app()->getLocale() }}">
    @if ($sent)
        <p role="status">{{ $sent }}</p>
    @endif
    @foreach ($form->schema()->fields() as $field)
        @php
            $id = 'form-'.$form->handle.'-'.$field->handle;
            $label = $field->label ?: \Illuminate\Support\Str::headline($field->handle);
            $value = old($field->handle, $form->schema()->type($field)->defaultValue($field));
            $error = $bag?->first($field->handle);
            $describedBy = trim(($field->instructions !== '' ? $id.'-help ' : '').($error ? $id.'-error' : ''));
            $options = is_array($field->config['options'] ?? null) ? $field->config['options'] : [];
            $multiple = ($field->config['multiple'] ?? false) === true;
        @endphp
        <div>
            @if ($field->type === 'toggle')
                <input type="hidden" name="{{ $field->handle }}" value="0">
                <input type="checkbox" id="{{ $id }}" name="{{ $field->handle }}" value="1" @checked((bool) $value) @if ($describedBy) aria-describedby="{{ $describedBy }}" @endif @if ($error) aria-invalid="true" @endif>
                <label for="{{ $id }}">{{ $label }}</label>
            @else
                <label for="{{ $id }}">{{ $label }}@if ($field->required) <span aria-hidden="true">*</span>@endif</label>
                @if ($field->type === 'textarea')
                    <textarea id="{{ $id }}" name="{{ $field->handle }}" rows="5" @required($field->required) @if ($describedBy) aria-describedby="{{ $describedBy }}" @endif @if ($error) aria-invalid="true" @endif>{{ is_scalar($value) ? $value : '' }}</textarea>
                @elseif ($field->type === 'file')
                    <input type="file" id="{{ $id }}" name="{{ $field->handle }}" @if (\Sunrice\Cms\Fields\Types\FileField::types($field) !== []) accept=".{{ implode(',.', \Sunrice\Cms\Fields\Types\FileField::types($field)) }}" @endif @required($field->required) @if ($describedBy) aria-describedby="{{ $describedBy }}" @endif @if ($error) aria-invalid="true" @endif>
                @elseif ($field->type === 'select')
                    <select id="{{ $id }}" name="{{ $field->handle }}{{ $multiple ? '[]' : '' }}" @if ($multiple) multiple @endif @required($field->required) @if ($describedBy) aria-describedby="{{ $describedBy }}" @endif @if ($error) aria-invalid="true" @endif>
                        @unless ($multiple)<option value=""></option>@endunless
                        @foreach ($options as $option)
                            @if (is_array($option) && is_scalar($option['value'] ?? null))
                                <option value="{{ $option['value'] }}" @selected(in_array((string) $option['value'], array_map('strval', array_filter((array) $value, 'is_scalar')), true))>{{ is_scalar($option['label'] ?? null) && $option['label'] !== '' ? $option['label'] : $option['value'] }}</option>
                            @endif
                        @endforeach
                    </select>
                @else
                    @php
                        $type = match ($field->type) {
                            'number' => 'number',
                            'date' => ($field->config['time'] ?? false) === true ? 'datetime-local' : 'date',
                            default => in_array('email', $field->validation, true) || $field->handle === 'email' ? 'email' : 'text',
                        };
                    @endphp
                    <input type="{{ $type }}" id="{{ $id }}" name="{{ $field->handle }}" value="{{ is_scalar($value) ? $value : '' }}" @required($field->required)
                        @if ($type === 'number' && is_numeric($field->config['step'] ?? null)) step="{{ $field->config['step'] }}" @elseif ($type === 'number') step="any" @endif
                        @if ($type === 'text' && is_int($field->config['max'] ?? null)) maxlength="{{ $field->config['max'] }}" @endif
                        @if ($describedBy) aria-describedby="{{ $describedBy }}" @endif @if ($error) aria-invalid="true" @endif>
                @endif
            @endif
            @if ($field->instructions !== '')
                <p id="{{ $id }}-help">{{ $field->instructions }}</p>
            @endif
            @if ($error)
                <p id="{{ $id }}-error" role="alert">{{ $error }}</p>
            @endif
        </div>
    @endforeach
    @if ($form->captcha && app(\Sunrice\Admin\Security\Captcha::class)->enabled())
        <div>
            {{ app(\Sunrice\Admin\Security\Captcha::class)->widget() }}
            @if ($captchaError = $bag?->first(\Sunrice\Cms\Site\FormController::CAPTCHA))
                <p id="form-{{ $form->handle }}-captcha-error" role="alert">{{ $captchaError }}</p>
            @endif
        </div>
    @endif
    <button type="submit">{{ $submit ?? __('sunrice-cms::site.forms.send') }}</button>
</form>
@endif
