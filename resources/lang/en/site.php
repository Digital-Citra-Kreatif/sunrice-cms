<?php

declare(strict_types=1);

// What visitors read on the site: the CMS's plain views, comments and forms (sunrice-cms::site.*).
return [
    'preview' => 'Preview of the draft',
    'newer' => 'Newer',
    'older' => 'Older',
    'previous' => 'Previous',
    'next' => 'Next',
    'search' => [
        'title' => 'Search',
        'title_query' => 'Search: :query',
        'label' => 'Search',
        'button' => 'Search',
        'results' => ':count result for “:query”|:count results for “:query”',
    ],
    'comments' => [
        'count' => ':count comment|:count comments',
        'closed' => 'Comments are closed.',
        'sign_in' => 'Sign in to comment.',
        'replying_to' => 'Replying to :name',
        'cancel' => 'Cancel',
        'comment' => 'Comment',
        'name' => 'Name',
        'email' => 'Email (not shown)',
        'notify' => 'Email me when someone replies',
        'post' => 'Post comment',
        'post_reply' => 'Post reply',
        'reply' => 'Reply',
        'posted' => 'Your comment is posted.',
        'held' => 'Thank you! Your comment will appear once it is approved.',
        'parent_gone' => 'The comment you replied to is gone.',
        'unsubscribed' => 'You won\'t get emails about replies to this comment any more.',
        'replied_subject' => ':name replied to your comment',
        'replied' => ':name replied to your comment on :title:',
        'read' => 'Read the conversation',
        'stop' => 'Stop emails about replies to this comment',
    ],
    'forms' => [
        'send' => 'Send',
        'errors' => 'Please correct the following and send the form again:',
        'too_many' => 'You\'ve sent this form several times in a short while. Please wait :seconds seconds and send it again; what you typed is kept.',
        'file_hint' => 'Accepted: :types, up to :size.',
        'file_size' => 'Up to :size.',
        'too_big' => 'The :attribute file is larger than :size, the most this site accepts.',
    ],
    'captcha' => 'Please confirm you\'re not a robot, then send the form again.',
];
