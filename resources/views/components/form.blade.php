{{--
    <x-sunrice-cms::form handle="contact" />: the form's fields, the honeypot, its errors and the
    thank-you message; with a slot, the markup inside the <form> is yours (name inputs data[handle]), after the
    error summary (unless the slot has its own element with id="form-{handle}-errors" tabindex="-1").
    Publish the views to change this markup; extra attributes go on <form>. Inside a class component's
    own view its properties ($form, $id) and methods ($error('email'), $old('email'), $success()) are variables.
--}}
@if ($replace && $success())
{{-- The visitor lands here (#form-{handle}-status), and focus with them. --}}
<p id="{{ $id }}-status" role="status" tabindex="-1" autofocus>{{ $success() }}</p>
@else
<form method="POST" action="{{ route('sunrice.cms.forms.submit', $form->handle) }}" id="{{ $id }}" @if ($form->takesFiles()) enctype="multipart/form-data" @endif {{ $attributes }}>
    @csrf
    <x-honeypot />
    <input type="hidden" name="locale" value="{{ $locale }}">
    <input type="hidden" name="{{ \Sunrice\Cms\View\Components\Form::FORM_INPUT }}" value="{{ $form->handle }}">
    @if ($success())
        <p id="{{ $id }}-status" role="status" tabindex="-1" autofocus>{{ $success() }}</p>
    @endif
    @php
        $slotHtml = $slot->isNotEmpty() ? (string) $slot : null;
    @endphp
    @if ($failed() && ($slotHtml === null || ! str_contains($slotHtml, 'id="'.$id.'-errors"')))
        {{-- Sent back with errors: the visitor lands here (#form-{handle}-errors), focus with them, and each error links to its field.
             A slot of yours can have its own: an element with id="{{ $id }}-errors" tabindex="-1". --}}
        <div id="{{ $id }}-errors" role="alert" tabindex="-1" autofocus>
            <p>{{ __($limited() ? 'sunrice-cms::site.forms.limited' : 'sunrice-cms::site.forms.errors') }}</p>
            <ul>
                @foreach ($errorSummary() as [$errorField, $message])
                    <li>@if ($errorField !== null && ($slotHtml === null || str_contains($slotHtml, 'id="'.$id.'-'.$errorField.'"')))<a href="#{{ $id }}-{{ $errorField }}">{{ $message }}</a>@else{{ $message }}@endif</li>
                @endforeach
            </ul>
        </div>
    @endif
    @if ($slotHtml !== null)
    {!! $slotHtml !!}
    @else
        @foreach ($form->schema()->fields() as $field)
            @php
                $inputId = 'form-'.$form->handle.'-'.$field->handle;
                $label = $field->labelIn($locale);
                $help = $field->instructionsIn($locale);
                $value = $old($field->handle, $form->schema()->type($field)->defaultValue($field));
                $fieldError = $error($field->handle);
                $describedBy = trim(($help !== '' || $field->type === 'file' ? $inputId.'-help ' : '').($fieldError ? $inputId.'-error' : ''));
                $options = $field->options($locale);
                $multiple = ($field->config['multiple'] ?? false) === true;
            @endphp
            <div>
                @if ($field->type === 'toggle')
                    <input type="hidden" name="data[{{ $field->handle }}]" value="0">
                    <input type="checkbox" id="{{ $inputId }}" name="data[{{ $field->handle }}]" value="1" @checked((bool) $value) @required($field->required) @if ($describedBy) aria-describedby="{{ $describedBy }}" @endif @if ($fieldError) aria-invalid="true" @endif>
                    <label for="{{ $inputId }}">{{ $label }}@if ($field->required) <span aria-hidden="true">*</span>@endif</label>
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
                                <option value="{{ $option['value'] }}" @selected(in_array($option['value'], array_map('strval', array_filter((array) $value, 'is_scalar')), true))>{{ $option['label'] }}</option>
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
                            @if ($type === 'date' && ($field->config['future'] ?? false) === true) min="{{ now()->toDateString() }}" @elseif ($type === 'datetime-local' && ($field->config['future'] ?? false) === true) min="{{ now()->startOfDay()->format('Y-m-d\TH:i') }}" @endif
                            @if ($describedBy) aria-describedby="{{ $describedBy }}" @endif @if ($fieldError) aria-invalid="true" @endif>
                    @endif
                @endif
                @if ($help !== '' || $field->type === 'file')
                    <p id="{{ $inputId }}-help">{{ $help }}@if ($field->type === 'file'){{ $help !== '' ? ' ' : '' }}{{ \Sunrice\Cms\Fields\Types\FileField::hint($field) }}@endif</p>
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
