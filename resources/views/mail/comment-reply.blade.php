{{ __('sunrice::frontend.comment_reply_intro', ['name' => $reply->author_name, 'title' => $title]) }}

{{ $reply->body }}

@if ($url)
{{ __('sunrice::frontend.comment_reply_read') }} {{ $url }}
@endif

{{ __('sunrice::frontend.comment_reply_stop') }} {{ $unsubscribeUrl }}
