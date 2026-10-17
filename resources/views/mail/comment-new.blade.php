{{ $comment->author_name }}{{ $comment->author_email ? ' <'.$comment->author_email.'>' : '' }} {{ $comment->parent_id ? 'replied' : 'commented' }} on "{{ $title }}":

{{ $comment->body }}

@if (! $comment->isApproved())
It is waiting for approval.
@endif
@if ($pageUrl)
Page: {{ $pageUrl }}
@endif
@if ($adminUrl)
Moderate: {{ $adminUrl }}
@endif
