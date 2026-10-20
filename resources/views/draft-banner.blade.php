{{--
    Shown at the top of a live page to people signed in to the panel with cms.entries.view-drafts, when the entry
    has unpublished changes ($draft false), or while they look at those changes (?draft, $draft true).
    Inline styles: it doesn't depend on the site's CSS. Publish the starter templates to restyle the rest of the page.
--}}
<aside aria-label="{{ __('Draft') }}" data-sunrice-draft-banner style="position:sticky;top:0;z-index:2147483000;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:6px 14px;margin:0;padding:9px 16px;background:#1c1917;color:#fafaf9;font:500 13px/1.4 ui-sans-serif,system-ui,-apple-system,'Segoe UI',sans-serif;text-align:center">
    <span style="padding:2px 8px;border-radius:999px;background:#f59e0b;color:#1c1917;font-weight:600;font-size:11px;letter-spacing:.04em;text-transform:uppercase">{{ __('Draft') }}</span>
    @if ($draft)
        <span>{{ __('You are viewing unpublished changes. Visitors see the live page.') }}</span>
        @if ($liveUrl)<a href="{{ $liveUrl }}" style="color:#fafaf9;text-decoration:underline;text-underline-offset:2px">{{ __('View the live page') }}</a>@endif
    @else
        <span>{{ __('This page has unpublished changes.') }}</span>
        @if ($draftUrl)<a href="{{ $draftUrl }}" style="color:#fafaf9;text-decoration:underline;text-underline-offset:2px">{{ __('View the draft') }}</a>@endif
    @endif
    @if ($editUrl)<a href="{{ $editUrl }}" style="color:#fafaf9;text-decoration:underline;text-underline-offset:2px">{{ __('Edit') }}</a>@endif
</aside>
