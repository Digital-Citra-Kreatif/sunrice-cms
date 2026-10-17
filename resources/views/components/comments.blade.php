{{-- Inside a class component's own view, public properties ($thread, $open…) and methods ($body(), $commentErrors()…) are plain variables. --}}
<section class="sunrice-comments" id="comments" {{ $attributes }}>
    <h2 class="sunrice-comments-title">{{ trans_choice('sunrice::frontend.comments_count', $count, ['count' => $count]) }}</h2>

    @if ($status)
        <p class="sunrice-comments-status" role="status">{{ $status }}</p>
    @endif

    @if ($thread === [])
        <p class="sunrice-comments-empty">{{ __('sunrice::frontend.comments_none') }}</p>
    @else
        <ol class="sunrice-comments-list">
            @foreach ($thread as $node)
                @include('sunrice::components.comments.item', ['node' => $node])
            @endforeach
        </ol>
    @endif

    @if (! $open)
        <p class="sunrice-comments-closed">{{ __('sunrice::frontend.comments_closed') }}</p>
    @elseif ($loginRequired)
        <p class="sunrice-comments-login">
            @if (Route::has('login'))
                <a href="{{ route('login') }}">{{ __('sunrice::frontend.comments_login') }}</a>
            @else
                {{ __('sunrice::frontend.comments_login') }}
            @endif
        </p>
    @elseif ($replyTo === null)
        @include('sunrice::components.comments.form', ['parent' => null])
    @endif
</section>
