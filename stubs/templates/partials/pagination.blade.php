{{-- Previous and next links of a paginator. @include('cms.partials.pagination', ['paginator' => $entries]) --}}
@if ($paginator->hasPages())
    <nav class="pagination" aria-label="{{ __('Pages') }}">
        @if ($paginator->previousPageUrl())
            <a href="{{ $paginator->previousPageUrl() }}" rel="prev">{{ __('Previous') }}</a>
        @endif
        <span>{{ __('Page :page of :pages', ['page' => $paginator->currentPage(), 'pages' => $paginator->lastPage()]) }}</span>
        @if ($paginator->nextPageUrl())
            <a href="{{ $paginator->nextPageUrl() }}" rel="next">{{ __('Next') }}</a>
        @endif
    </nav>
@endif
