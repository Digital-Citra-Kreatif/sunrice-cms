# Pengaturan situs

Situs web menambahkan enam halaman ke **Pengaturan** di bawah Administrasi: **Situs**, **SEO**, **Bahasa**, **Kode situs**, **Komentar**, dan **Cache**. Masing-masing adalah izin tersendiri, jadi mungkin Anda hanya melihat sebagian. Bagian milik panel (**Branding**, **Keamanan**, dan **Email**) dijelaskan di [Pengaturan](guide:panel/settings).

Pengaturan langsung berlaku begitu Anda mengeklik **Simpan**.

## Situs

- **Beranda**: halaman yang tampil di alamat utama situs web (`/`), dalam setiap bahasa tempat entri itu terbit; ketik untuk mencari halaman yang sudah tayang. Alamat entri itu sendiri dialihkan ke sana. Editor juga bisa menekan **Jadikan beranda** di kartu Status halaman tayang yang berada di akar situs web (seperti `/about`), lalu mengonfirmasinya.

**Situs**, untuk halaman yang tidak mengatur sendiri:

- **Nama situs**: ditambahkan ke judul halaman dan tampil saat halaman dibagikan. Kosong: nama yang diatur developer.
- **Deskripsi**: dipakai jika halaman tidak punya sendiri.
- **Deskripsi dalam bahasa lain** (jika ada lebih dari satu bahasa): satu kotak per bahasa, untuk halaman dalam bahasa itu. Kosong: deskripsi di atas.

**Bahasa** (jika ada lebih dari satu bahasa): **Tampilkan halaman yang belum diterjemahkan dalam bahasa utama** (menyala secara bawaan). Halaman yang belum diterjemahkan ke suatu bahasa lalu menampilkan isi bahasa utamanya di alamat bahasa tersebut (`/id/about`), sehingga tautan dan pengalih bahasa tetap berfungsi; jika dimatikan, halaman itu tidak ditemukan dalam bahasa tersebut dan daftar hanya menampilkan yang sudah diterjemahkan. Jika developer sudah mengaturnya di konfigurasi aplikasi, sakelarnya berwarna abu-abu. Lihat [Halaman yang belum diterjemahkan](guide:website/languages#halaman-yang-belum-diterjemahkan).

Gambar berbagi, nama situs di judul beserta pemisahnya, akun X (Twitter), menyembunyikan seluruh situs dari mesin pencari, dan structured data ada di **Pengaturan → SEO**, tepat setelah Situs pada menu Pengaturan.

## SEO

Apa yang dilihat mesin pencari dan tautan yang dibagikan dari situs web, dengan izin yang sama seperti **Situs**. **Mesin pencari dan berbagi** serta **Field yang dipakai untuk SEO** dijelaskan di [SEO](guide:website/seo#pengaturan-bawaan-situs).

**Structured data**: **Tambahkan structured data ke halaman** (biarkan menyala kecuali ada alasan), apakah situs diterbitkan oleh organisasi atau perorangan (**Diterbitkan oleh**), dan **Logo** organisasi (persegi atau melebar, minimal 112 piksel). Mesin pencari juga menyukai detail penerbit: **Nama** (kosong: nama situs), **Jenis organisasi** (cari di daftar: *Usaha lokal*, *Agen properti*, *Restoran*…; atau pilih **Lainnya…** dan ketik jenis schema.org apa pun sebagai satu kata, misalnya *Brewery*), **Telepon**, **Alamat**, dan **Profil di tempat lain** (halaman Instagram, LinkedIn… penerbit: **Tambah profil** untuk masing-masing, alamat yang diawali https://; situsnya tampil di sebelahnya).

## Bahasa

**Bahasa konten** berisi bahasa tempat konten ditulis, satu baris untuk tiap bahasa: **kode** yang dipakai di alamat (`id`) dan **nama** yang dilihat editor (`Bahasa Indonesia`). **Tambah bahasa** menambah baris; kodenya membuka daftar bahasa umum yang bisa dicari menurut kode atau nama ("Bahasa Melayu · ms"), dan memilih salah satunya mengisi namanya. Untuk bahasa yang tidak ada di daftar, ketik kodenya lalu pilih **Pakai “…”**. **Alamat** adalah awalan alamat halaman bahasa itu: kosongkan untuk yang biasa (bahasa utama di `/about`, yang lain di `/id/about`), atau isi sendiri, misalnya `en` agar bahasa utama juga di `/en/about`. Tanda panah mengubah urutan, dan × menghapus baris.

Baris pertama adalah **bahasa utama** (bertanda *Utama*), di alamat biasa (`/about`); bahasa lain diawali kodenya (`/id/about`). Sebelum disimpan, daftar ini menampilkan bahasa yang dipakai situs saat disiapkan. Panel menolak daftar kosong, baris yang bukan kode bahasa, dan bahasa yang tercantum dua kali; daftar kode tiap baris tidak menampilkan bahasa yang sudah dipakai baris lain.

- **Menambah bahasa** menambahkan tab untuknya di tab bahasa penyunting. Tidak ada yang diterjemahkan otomatis.
- **Menghapus bahasa** menyembunyikan kontennya (tidak ada yang dihapus); tambahkan kembali untuk memunculkan kontennya lagi.
- **Mengganti bahasa utama** setelah ada konten: pakai **Jadikan … bahasa utama** di kartu **Bahasa utama** di bawah formulir. Semuanya dipindahkan dengan aman, dan alamat berubah (bahasa utama baru kehilangan kodenya, yang lama mendapatkannya; alamat lama dialihkan). Setiap entri dan term perlu terjemahan dalam bahasa utama yang baru terlebih dahulu; panel memberi tahu berapa yang belum.

Lihat [Bahasa](guide:website/languages) untuk bekerja dengan terjemahan.

## Kode situs

Kode dari layanan lain yang ditambahkan ke setiap halaman situs web apa adanya: analitik, widget obrolan, tag verifikasi dari mesin pencari. Tempelkan sesuai petunjuk layanannya: **Di dalam `<head>`**, **Di awal `<body>`**, atau **Di akhir `<body>`**. Setiap kotak adalah editor kode dengan nomor baris dan warna; Tab menjorokkan baris, lalu Esc kemudian Tab pindah ke kotak berikutnya.

> [!WARNING]
> Kode di sini berjalan di setiap halaman, di peramban setiap pengunjung: skrip yang salah atau berbahaya bisa merusak situs, mencuri data pengunjung, atau mengambil alih sesi admin. Tempelkan hanya kode dari layanan yang Anda percayai, periksakan ke developer Anda, dan berikan izin ini hanya kepada orang yang Anda percayai untuk seluruh situs web. Setiap perubahan dicatat dan diemailkan kepada penerima peringatan keamanan.

Jika situs Anda tidak membutuhkannya, developer Anda bisa mematikan **Kode situs**: halamannya hilang dari Pengaturan dan tidak ada yang tersimpan di sana yang ditambahkan ke situs web (kodenya tetap disimpan, dan muncul lagi jika dinyalakan kembali).

## Komentar

Cara kerja komentar pengunjung pada koleksi yang mengizinkannya (lihat [Komentar](guide:website/comments)):

| Pengaturan | |
| --- | --- |
| **Komentar baru** | **Tahan komentar pertama seseorang untuk disetujui** (pilihan umum: setelah Anda menyetujui satu komentar seseorang, komentar berikutnya langsung tampil), **Tahan setiap komentar untuk disetujui**, atau **Terbitkan komentar langsung**. Komentar dari moderator selalu langsung tayang. |
| **Hanya pengguna yang masuk yang bisa berkomentar** | Pengunjung tanpa akun bisa melihat komentar, tetapi tidak melihat formulirnya. |
| **Minta captcha** | Pemeriksaan "buktikan Anda manusia", jika developer sudah menyiapkannya. |
| **Komentar per pengunjung per menit** | Mencegah banjir komentar. |
| **Tutup komentar setelah (hari)** | Jumlah hari setelah tanggal terbit entri; kosong: tidak pernah. |
| **Tingkat balasan yang ditampilkan** | Balasan yang lebih dalam dijajarkan di tingkat terakhir, agar utas tetap mudah dibaca di ponsel. |
| **Email moderator tentang komentar baru** | Orang yang boleh memoderasi komentar, dan alamat di **Email juga ke**. |
| **Email juga ke peran** | Semua orang dengan peran ini juga. |
| **Izinkan pemberi komentar menerima email saat ada yang membalas** | Menambahkan kotak centang di formulir komentar. |

Spam terhapus otomatis setelah beberapa waktu.

## Cache

Situs web menyimpan apa yang sering ditampilkannya agar halaman cepat dimuat. Perubahan konten tetap langsung tampil: Anda jarang memerlukan bagian ini. Dengan **Cache halaman utuh** menyala, halaman dirender sekali lalu disimpan untuk pengunjung yang tidak masuk (saat masuk, Anda selalu melihat halaman terbaru).

**Halaman utuh**:

- **Cache halaman utuh**: **Sesuai pengaturan developer** (tertulis apakah itu menyala atau mati), **Simpan halaman utuh**, atau **Jangan simpan halaman utuh**. Matikan jika halaman menampilkan sesuatu yang berbeda untuk setiap pengunjung, seperti keranjang atau "Hai, Ana".
- **Simpan halaman selama (menit)**: paling lama sebuah halaman disimpan. Kosong: selama data situs.

**Halaman yang tidak pernah disimpan**, selalu dirender ulang:

- **Alamat**: **Tambah alamat** untuk masing-masing, diawali `/`. Tanda `*` berarti apa saja: `/contact` adalah halaman itu, `/account/*` setiap halaman di bawah `/account`, `/search*` setiap alamat yang diawali `/search`. Sebuah alamat berlaku di setiap bahasa (`/contact` juga `/id/contact`).
- **Koleksi**: centang koleksi agar halaman-halamannya dan halaman daftarnya tidak pernah disimpan.

**Query string** adalah bagian setelah `?` pada alamat, seperti `?sort=price` dari filter atau `?utm_source=newsletter` dari tautan newsletter:

- **Parameter yang membuat halaman tersendiri**: parameter yang mengubah isi halaman (filter, urutan, tab), sehingga setiap nilainya disimpan terpisah. Developer mungkin sudah mengatur sebagian; teks bantuan menyebutkannya.
- **Parameter lainnya**: **Abaikan** (pilihan umum: pengunjung mendapat halaman tersimpan) atau **Lewati cache** (halaman dirender ulang dan tidak disimpan), untuk halaman yang membaca parameter yang tidak bisa Anda daftarkan.
- **Parameter yang selalu diabaikan** (dengan **Lewati cache**): parameter pelacakan dari newsletter dan iklan, yang tidak pernah melewati cache. `utm_*` berarti `utm_source`, `utm_medium`…

**Pemuatan awal** meminta halaman situs sebelum pengunjung, sehingga pengunjung pertama pun mendapat halaman tersimpan. Berjalan di latar belakang, beberapa halaman sekaligus:

- **Muat ulang cache setelah dibersihkan**: setelah salah satu tombol Bersihkan di bawah.
- **Muat ulang cache setelah konten berubah**: semenit setelah perubahan terakhir. Di situs besar yang sering disunting, biarkan mati.
- **Muat cache terjadwal**: **Tidak pernah**, **Setiap jam**, atau **Setiap hari**.

**Data situs**: **Simpan data situs selama (menit)**: halaman mana yang ada di sebuah alamat, menu, dan sitemap. Kosong: sesuai pengaturan developer.

Menyimpan langsung berlaku: semua yang disimpan sebelumnya dibaca ulang.

Kartu **Cache** di bawah formulir menunjukkan apakah halaman utuh disimpan, di mana semuanya disimpan, serta kapan dan oleh siapa cache terakhir dibersihkan. Tombol-tombolnya bertanya dulu:

- **Muat cache**: mulai memuat sekarang. Selama berjalan, kartu menunjukkan sejauh mana dan tombolnya hilang sampai selesai; setelahnya tertulis berapa halaman yang tersimpan dan berapa yang gagal.
- **Bersihkan cache halaman**: pengunjung mendapat halaman yang baru dirender. Pakai setelah developer mengubah template, jika halaman terlihat lama.
- **Bersihkan semua cache situs**: halaman, alamat, menu, dan sitemap dibaca ulang.

Situs sedikit lebih lambat sesaat setelah dibersihkan. Keduanya dicatat di log aktivitas.

Jika cache halaman utuh tidak tersedia di server Anda, pengaturannya berwarna abu-abu dan kartunya memberi tahu: tanyakan kepada developer Anda.

> [!TECHNICAL]
> Pengaturan di sini mengalahkan `config/sunrice-cms.php` (`cache.pages`, `cache.ttl`, `cache.query`); tempat penyimpanan tetap di config. Halaman utuh memerlukan `spatie/laravel-responsecache` (`composer require spatie/laravel-responsecache`). Dari baris perintah: `php artisan responsecache:clear` dan `php artisan sunrice:cache-preload`. Pemuatan berjalan sebagai job antrean, jadi perlu queue worker (`php artisan queue:work`); jadwal perlu scheduler Laravel di cron. Lihat [Caching](docs:cms/caching#cache-settings).

## Captcha

Captcha adalah pemeriksaan "buktikan Anda manusia" di formulir (**Wajibkan captcha**, di **Perlindungan spam** setiap formulir) dan komentar (**Minta captcha**, di atas). Kedua tombol itu tetap mati dan berwarna abu-abu sampai developer menghubungkan layanan captcha ke situs: akun Cloudflare Turnstile (gratis), Google reCAPTCHA, atau hCaptcha, yang kuncinya dimasukkan ke pengaturan server. Setelah disiapkan, bantuan di bawah setiap tombol menyebutkan layanan yang dipakai.

> [!TECHNICAL]
> Di `.env` aplikasi: `SUNRICE_CAPTCHA_PROVIDER` (`turnstile`, `recaptcha`, atau `hcaptcha`), `SUNRICE_CAPTCHA_SITE_KEY`, dan `SUNRICE_CAPTCHA_SECRET_KEY`; lalu `php artisan config:clear` (atau `config:cache`). Lihat [Keamanan](docs:panel/security#captcha).
