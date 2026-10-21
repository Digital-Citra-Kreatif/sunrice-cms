<?php

declare(strict_types=1);

// Yang dibaca pengunjung situs: tampilan bawaan CMS, komentar dan formulir (sunrice-cms::site.*).
return [
    'home' => 'Beranda',
    'preview' => 'Pratinjau draf',
    'newer' => 'Lebih baru',
    'older' => 'Lebih lama',
    'previous' => 'Sebelumnya',
    'next' => 'Berikutnya',
    'search' => [
        'title' => 'Cari',
        'title_query' => 'Cari: :query',
        'label' => 'Cari',
        'button' => 'Cari',
        'results' => ':count hasil untuk “:query”',
    ],
    'comments' => [
        'count' => ':count komentar',
        'closed' => 'Komentar ditutup.',
        'sign_in' => 'Masuk untuk berkomentar.',
        'replying_to' => 'Membalas :name',
        'cancel' => 'Batal',
        'comment' => 'Komentar',
        'name' => 'Nama',
        'email' => 'Email (tidak ditampilkan)',
        'notify' => 'Kirimi saya email saat ada yang membalas',
        'post' => 'Kirim komentar',
        'post_reply' => 'Kirim balasan',
        'reply' => 'Balas',
        'posted' => 'Komentar Anda sudah tampil.',
        'held' => 'Terima kasih! Komentar Anda akan tampil setelah disetujui.',
        'parent_gone' => 'Komentar yang Anda balas sudah tidak ada.',
        'unsubscribed' => 'Anda tidak akan lagi menerima email tentang balasan komentar ini.',
        'replied_subject' => ':name membalas komentar Anda',
        'replied' => ':name membalas komentar Anda di :title:',
        'read' => 'Baca percakapannya',
        'stop' => 'Berhenti menerima email balasan untuk komentar ini',
    ],
    'forms' => [
        'send' => 'Kirim',
        'thanks' => 'Terima kasih, pesan Anda sudah kami terima.',
    ],
    'captcha' => 'Konfirmasikan bahwa Anda bukan robot, lalu kirim formulir lagi.',
];
