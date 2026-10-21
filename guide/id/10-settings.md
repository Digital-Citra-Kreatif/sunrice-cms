# Pengaturan situs

Situs web menambahkan empat bagian ke **Settings** di bawah Administration: **Site**, **Languages**, **Site code**, dan **Comments**. Masing-masing adalah izin tersendiri, jadi mungkin Anda hanya melihat sebagian. Bagian milik panel (**Branding**, **Security**, dan **Mail**) dijelaskan di [Pengaturan](guide:panel/settings).

Pengaturan langsung berlaku begitu Anda mengeklik **Save**.

## Site

- **Homepage** (beranda): entri yang tampil di alamat utama situs web (`/`), dalam setiap bahasa tempat entri itu terbit. Alamat entri itu sendiri dialihkan ke sana.

**Search and sharing**, untuk halaman yang tidak mengatur sendiri (lihat [SEO](guide:website/seo)):

- **Site name**: ditambahkan ke judul halaman dan tampil saat halaman dibagikan. Kosong: nama yang diatur developer.
- **Description** dan **Share image**: dipakai jika halaman tidak punya sendiri.
- **Title separator**: pemisah antara judul halaman dan nama situs (`|` dalam "Tentang | Acme").
- **Add the site name to titles**: "Tentang | Acme" di hasil pencarian dan tab peramban.
- **X (Twitter) account**: akun situs, seperti `@acme`, untuk tautan yang dibagikan.
- **Hide the whole site from search engines**: untuk situs yang masih dibangun. Semua halaman meminta tidak diindeks dan peta situs kosong. Matikan saat situs mulai tayang.

**Structured data**: **Add structured data to pages** (biarkan menyala kecuali ada alasan), apakah situs diterbitkan oleh organisasi atau perorangan (**Published by**), dan **Logo** organisasi (persegi atau melebar, minimal 112 piksel).

## Languages

**Content languages** berisi bahasa tempat konten ditulis, satu per baris: kode yang dipakai di alamat, titik dua, dan namanya:

```
en: English
id: Bahasa Indonesia
```

Baris pertama adalah **bahasa utama**, di alamat biasa (`/about`); bahasa lain diawali kodenya (`/id/about`). Sebelum disimpan, kotak ini menampilkan bahasa yang dipakai situs saat disiapkan. Panel menolak daftar kosong, baris yang bukan kode bahasa, dan bahasa yang tercantum dua kali.

- **Menambah bahasa** membuatnya tersedia di bilah bahasa penyunting. Tidak ada yang diterjemahkan otomatis.
- **Menghapus bahasa** menyembunyikan kontennya (tidak ada yang dihapus); tambahkan kembali untuk memunculkan kontennya lagi.
- **Mengganti bahasa utama** setelah ada konten: pakai **Make … the main language** di kartu **Main language** di bawah formulir. Semuanya dipindahkan dengan aman, dan alamat berubah (bahasa utama baru kehilangan kodenya, yang lama mendapatkannya; alamat lama dialihkan). Setiap entri dan term perlu terjemahan dalam bahasa utama yang baru terlebih dahulu; panel memberi tahu berapa yang belum.

Lihat [Bahasa](guide:website/languages) untuk bekerja dengan terjemahan.

## Site code

Kode dari layanan lain yang ditambahkan ke setiap halaman situs web apa adanya: analitik, widget obrolan, tag verifikasi dari mesin pencari. Tempelkan sesuai petunjuk layanannya: **In the `<head>`**, **At the start of the `<body>`**, atau **At the end of the `<body>`**.

> [!WARNING]
> Kode di sini berjalan di peramban setiap pengunjung. Tempelkan hanya kode dari layanan yang Anda percayai, dan berikan izin ini hanya kepada orang yang Anda percayai untuk seluruh situs web. Setiap perubahan dicatat dan diemailkan kepada penerima peringatan keamanan.

## Comments

Cara kerja komentar pengunjung pada koleksi yang mengizinkannya (lihat [Komentar](guide:website/comments)):

| Pengaturan | |
| --- | --- |
| **New comments** | **Hold a commenter's first comment for approval** (pilihan umum: setelah Anda menyetujui satu komentar seseorang, komentar berikutnya langsung tampil), **Hold every comment for approval** (semua komentar menunggu persetujuan), atau **Publish comments at once** (langsung tayang). Komentar dari moderator selalu langsung tayang. |
| **Only signed-in users can comment** | Pengunjung tanpa akun bisa melihat komentar, tetapi tidak melihat formulirnya. |
| **Ask for a captcha** | Pemeriksaan "buktikan Anda manusia", jika developer sudah menyiapkannya. |
| **Comments per visitor a minute** | Mencegah banjir komentar. |
| **Close comments after (days)** | Jumlah hari setelah tanggal terbit entri; kosong: tidak pernah. |
| **Reply levels shown** | Balasan yang lebih dalam dijajarkan di tingkat terakhir, agar utas tetap mudah dibaca di ponsel. |
| **Email moderators about new comments** | Orang yang boleh memoderasi komentar, dan alamat di **Also email**. |
| **Also email roles** | Semua orang dengan peran ini juga. |
| **Let commenters get an email when someone replies** | Menambahkan kotak centang di formulir komentar. |

Spam terhapus otomatis setelah beberapa waktu.
