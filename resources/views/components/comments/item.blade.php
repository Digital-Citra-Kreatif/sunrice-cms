@php($comment = $node['comment'])
<li class="sunrice-comment" id="comment-{{ $comment->id }}">
    <article>
        <header class="sunrice-comment-meta">
            <strong class="sunrice-comment-author">{{ $comment->author_name }}</strong>
            <a class="sunrice-comment-date" href="#comment-{{ $comment->id }}">
                <time datetime="{{ $comment->created_at?->toIso8601String() }}">{{ $comment->created_at?->translatedFormat('j F Y, H:i') }}</time>
            </a>
        </header>
        <div class="sunrice-comment-body">{{ $body($comment) }}</div>
        @if ($open && ! $loginRequired && $replyTo !== $comment->id)
            <a class="sunrice-comment-reply" href="{{ $replyUrl($comment) }}" rel="nofollow">{{ __('sunrice::frontend.comment_reply') }}</a>
        @endif
    </article>

    @if ($open && ! $loginRequired && $replyTo === $comment->id)
        @include('sunrice::components.comments.form', ['parent' => $comment])
    @endif

    @if ($node['replies'] !== [])
        <ol class="sunrice-comment-replies">
            @foreach ($node['replies'] as $reply)
                @include('sunrice::components.comments.item', ['node' => $reply])
            @endforeach
        </ol>
    @endif
</li>
