<?php

declare(strict_types=1);

namespace Sunrice\Cms\View\Components;

use Illuminate\Contracts\Support\MessageBag as Messages;
use Illuminate\Contracts\View\View;
use Illuminate\Support\HtmlString;
use Illuminate\Support\MessageBag;
use Illuminate\Support\ViewErrorBag;
use Illuminate\View\Component;
use Sunrice\Admin\Security\Captcha;
use Sunrice\Cms\Models\Form as FormModel;
use Sunrice\Cms\Site\FormController;
use Sunrice\Cms\Support\Locales;

/**
 * A form for visitors. Empty, it prints the form's fields itself:
 *
 *     <x-sunrice-cms::form handle="contact" submit="Send message" class="contact" />
 *
 * With a slot, the markup inside the <form> is yours (the component adds
 * the CSRF token, the honeypot and what tells the forms apart); name the
 * inputs data[handle] and use this form's own errors and old input:
 *
 *     <x-sunrice-cms::form handle="contact" replace>
 *         <label for="email">Email</label>
 *         <input id="email" name="data[email]" value="{{ $component->old('email') }}">
 *
 *         <p>{{ $component->error('email') }}</p>
 *         {{ $component->captcha() }}
 *         <button>Send</button>
 *     </x-sunrice-cms::form>
 *
 * `replace`: once it's sent, the thank-you message takes the form's place
 * (else it shows above the form). Nothing is printed for an unknown form.
 *
 * @api
 */
final class Form extends Component
{
    /** The hidden input that says which form was sent, so old input stays with its own form. */
    public const FORM_INPUT = '_form';

    public ?FormModel $form;

    /** The <form>'s id (and the thank-you message's, with `replace`). */
    public string $id;

    public string $locale;

    public function __construct(string $handle, public ?string $submit = null, public bool $replace = false)
    {
        $this->form = FormModel::query()->where('handle', $handle)->first();
        $this->id = 'form-'.$handle;
        $this->locale = Locales::current();
    }

    public function shouldRender(): bool
    {
        return $this->form !== null;
    }

    /** The thank-you message, right after this form was sent (else null). */
    public function success(): ?string
    {
        $message = $this->form === null ? null : session(FormController::flashKey($this->form));

        return is_string($message) && $message !== '' ? $message : null;
    }

    /** Whether the page comes right after this form was sent back with errors. */
    public function submitted(): bool
    {
        return $this->form !== null && session()->getOldInput(self::FORM_INPUT) === $this->form->handle;
    }

    /** This form's first error for a field (FormController::CAPTCHA: the captcha's), or null. */
    public function error(string $field): ?string
    {
        $message = $this->bag()->first($field);

        return $message !== '' ? $message : null;
    }

    /** Whether this form has errors (for a summary above it). */
    public function failed(): bool
    {
        return $this->bag()->isNotEmpty();
    }

    /**
     * What this form's field was sent with, when it came back with errors
     * (another form's input is never shown here); else `$default`.
     */
    public function old(string $field, mixed $default = null): mixed
    {
        if (! $this->submitted()) {
            return $default;
        }

        return session()->getOldInput('data.'.$field, session()->getOldInput($field, $default));
    }

    /** The captcha widget and its script, when this form asks for one (else null). */
    public function captcha(): ?HtmlString
    {
        $captcha = app(Captcha::class);

        return $this->form !== null && $this->form->captcha && $captcha->enabled() ? $captcha->widget($this->locale) : null;
    }

    /** The captcha's error after a failed send, or null. */
    public function captchaError(): ?string
    {
        return $this->error(FormController::CAPTCHA);
    }

    public function render(): View
    {
        return view('sunrice-cms::components.form');
    }

    private function bag(): Messages
    {
        $errors = session('errors');

        return $this->form !== null && $errors instanceof ViewErrorBag ? $errors->getBag($this->form->handle) : new MessageBag;
    }
}
