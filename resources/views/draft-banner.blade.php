{{--
    Shown at the top of a live page to people signed in to the panel with cms.entries.view-drafts, when the entry
    has unpublished changes ($draft false), or while they look at those changes (?draft, $draft true); and on
    every preview from the editor's link ($preview true), for whoever opens it.
    Inline styles: it doesn't depend on the site's CSS. Publish the starter templates to restyle the rest of the page.
--}}
<aside aria-label="{{ __('sunrice-cms::site.draft.label') }}" data-sunrice-draft-banner style="position:sticky;top:0;z-index:2147483000;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:6px 14px;margin:0;padding:9px 16px;background:#1c1917;color:#fafaf9;font:500 13px/1.4 ui-sans-serif,system-ui,-apple-system,'Segoe UI',sans-serif;text-align:center">
    <span style="padding:2px 8px;border-radius:999px;background:#f59e0b;color:#1c1917;font-weight:600;font-size:11px;letter-spacing:.04em;text-transform:uppercase">{{ __('sunrice-cms::site.draft.label') }}</span>
    @if ($preview ?? false)
        <span>{{ __('sunrice-cms::site.preview') }}. {{ __('sunrice-cms::site.preview_note') }}</span>
        @if ($liveUrl)<a href="{{ $liveUrl }}" style="color:#fafaf9;text-decoration:underline;text-underline-offset:2px">{{ __('sunrice-cms::site.draft.view_live') }}</a>@endif
    @elseif ($draft)
        <span>{{ __('sunrice-cms::site.draft.viewing') }}</span>
        @if ($liveUrl)<a href="{{ $liveUrl }}" style="color:#fafaf9;text-decoration:underline;text-underline-offset:2px">{{ __('sunrice-cms::site.draft.view_live') }}</a>@endif
    @else
        <span>{{ __('sunrice-cms::site.draft.changes') }}</span>
        @if ($draftUrl)<a href="{{ $draftUrl }}" style="color:#fafaf9;text-decoration:underline;text-underline-offset:2px">{{ __('sunrice-cms::site.draft.view_draft') }}</a>@endif
    @endif
    @if ($editUrl && ! ($preview ?? false))<a href="{{ $editUrl }}" style="color:#fafaf9;text-decoration:underline;text-underline-offset:2px">{{ __('sunrice-cms::site.draft.edit') }}</a>@endif
</aside>
