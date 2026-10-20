@php
    $comment = $item['comment'];
@endphp
<li class="sunrice-comment" id="comment-{{ $comment->id }}">
    <p class="sunrice-comment-meta">
        <strong>{{ $comment->authorName() }}</strong>
        <time datetime="{{ $comment->created_at?->toAtomString() }}">{{ $comment->created_at?->translatedFormat('j F Y, H:i') }}</time>
    </p>
    <div class="sunrice-comment-body">{{ $comment->html() }}</div>
    @if ($open)
        <p class="sunrice-comment-reply"><a href="?reply_to={{ $comment->id }}#comment-form" rel="nofollow">{{ __('sunrice-cms::site.comments.reply') }}</a></p>
    @endif
    @if ($replyTo?->id === $comment->id)
        @include('sunrice-cms::comments.form', ['parent' => $comment])
    @endif
    @if ($item['replies'] !== [])
        <ol class="sunrice-comment-replies">
            @foreach ($item['replies'] as $reply)
                @include('sunrice-cms::comments.item', ['item' => $reply])
            @endforeach
        </ol>
    @endif
</li>
