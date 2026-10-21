{{-- <x-sunrice-cms::comments :entry="$entry" />: publish the views to change this markup. --}}
@if ($model->collection->comments)
<section class="sunrice-comments" id="comments">
    <h2>{{ $count === 0 && $open ? __('sunrice-cms::site.comments.none') : trans_choice('sunrice-cms::site.comments.count', $count) }}</h2>
    @if ($message = session(\Sunrice\Cms\Site\CommentController::FLASH))
        <p class="sunrice-comments-status" role="status">{{ $message }}</p>
    @endif
    @if ($thread !== [])
        <ol class="sunrice-comments-list">
            @foreach ($thread as $item)
                @include('sunrice-cms::comments.item', ['item' => $item])
            @endforeach
        </ol>
    @endif
    @if ($open && $replyTo === null)
        @include('sunrice-cms::comments.form')
    @elseif (! $open)
        <p class="sunrice-comments-status">{{ __('sunrice-cms::site.comments.closed') }}</p>
    @endif
</section>
@endif
