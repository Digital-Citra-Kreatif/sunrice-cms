{{--
    <x-sunrice-cms::form handle="contact" />: the form's fields, the honeypot, its errors and the
    thank-you message; with a slot, the markup inside the <form> is yours (name inputs data[handle]).
    Publish the views to change this markup; extra attributes go on <form>. Inside a class component's
    own view its properties ($form, $id) and methods ($error('email'), $old('email'), $success()) are variables.
--}}
@if ($replace && $success())
<p id="{{ $id }}" role="status">{{ $success() }}</p>
@else
<form method="POST" action="{{ route('sunrice.cms.forms.submit', $form->handle) }}" id="{{ $id }}" @if ($form->takesFiles()) enctype="multipart/form-data" @endif {{ $attributes }}>
    @csrf
    <x-honeypot />
    <input type="hidden" name="locale" value="{{ $locale }}">
    <input type="hidden" name="{{ \Sunrice\Cms\View\Components\Form::FORM_INPUT }}" value="{{ $form->handle }}">
    @if ($success())
        <p role="status">{{ $success() }}</p>
    @endif
    @if ($slot->isNotEmpty())
    {{ $slot }}
    @else
        @foreach ($form->schema()->fields() as $field)
            @php
                $inputId = 'form-'.$form->handle.'-'.$field->handle;
                $label = $field->label ?: \Illuminate\Support\Str::headline($field->handle);
                $value = $old($field->handle, $form->schema()->type($field)->defaultValue($field));
                $fieldError = $error($field->handle);
                $describedBy = trim(($field->instructions !== '' ? $inputId.'-help ' : '').($fieldError ? $inputId.'-error' : ''));
                $options = is_array($field->config['options'] ?? null) ? $field->config['options'] : [];
                $multiple = ($field->config['multiple'] ?? false) === true;
            @endphp
            <div>
                @if ($field->type === 'toggle')
                    <input type="hidden" name="data[{{ $field->handle }}]" value="0">
                    <input type="checkbox" id="{{ $inputId }}" name="data[{{ $field->handle }}]" value="1" @checked((bool) $value) @if ($describedBy) aria-describedby="{{ $describedBy }}" @endif @if ($fieldError) aria-invalid="true" @endif>
                    <label for="{{ $inputId }}">{{ $label }}</label>
                @else
                    <label for="{{ $inputId }}">{{ $label }}@if ($field->required) <span aria-hidden="true">*</span>@endif</label>
                    @if ($field->type === 'textarea')
                        <textarea id="{{ $inputId }}" name="data[{{ $field->handle }}]" rows="5" @required($field->required) @if ($describedBy) aria-describedby="{{ $describedBy }}" @endif @if ($fieldError) aria-invalid="true" @endif>{{ is_scalar($value) ? $value : '' }}</textarea>
                    @elseif ($field->type === 'file')
                        <input type="file" id="{{ $inputId }}" name="data[{{ $field->handle }}]{{ \Sunrice\Cms\Fields\Types\FileField::isMultiple($field) ? '[]' : '' }}" @if (\Sunrice\Cms\Fields\Types\FileField::isMultiple($field)) multiple @endif @if (\Sunrice\Cms\Fields\Types\FileField::types($field) !== []) accept=".{{ implode(',.', \Sunrice\Cms\Fields\Types\FileField::types($field)) }}" @endif @required($field->required) @if ($describedBy) aria-describedby="{{ $describedBy }}" @endif @if ($fieldError) aria-invalid="true" @endif>
                    @elseif ($field->type === 'select')
                        <select id="{{ $inputId }}" name="data[{{ $field->handle }}]{{ $multiple ? '[]' : '' }}" @if ($multiple) multiple @endif @required($field->required) @if ($describedBy) aria-describedby="{{ $describedBy }}" @endif @if ($fieldError) aria-invalid="true" @endif>
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
                        <input type="{{ $type }}" id="{{ $inputId }}" name="data[{{ $field->handle }}]" value="{{ is_scalar($value) ? $value : '' }}" @required($field->required)
                            @if ($type === 'number' && is_numeric($field->config['step'] ?? null)) step="{{ $field->config['step'] }}" @elseif ($type === 'number') step="any" @endif
                            @if ($type === 'text' && is_int($field->config['max'] ?? null)) maxlength="{{ $field->config['max'] }}" @endif
                            @if ($describedBy) aria-describedby="{{ $describedBy }}" @endif @if ($fieldError) aria-invalid="true" @endif>
                    @endif
                @endif
                @if ($field->instructions !== '')
                    <p id="{{ $inputId }}-help">{{ $field->instructions }}</p>
                @endif
                @if ($fieldError)
                    <p id="{{ $inputId }}-error" role="alert">{{ $fieldError }}</p>
                @endif
            </div>
        @endforeach
        @if ($widget = $captcha())
            <div>
                {{ $widget }}
                @if ($captchaMessage = $captchaError())
                    <p id="{{ $id }}-captcha-error" role="alert">{{ $captchaMessage }}</p>
                @endif
            </div>
        @endif
        <button type="submit">{{ $submit ?? __('sunrice-cms::site.forms.send') }}</button>
    @endif
</form>
@endif
