# Pengaturan

Halaman Settings berisi pilihan yang berlaku untuk seluruh situs. Buka melalui **Manage → Settings**; Anda memerlukan izin **Edit settings**.

## Mengenal halaman ini

Di bagian atas terdapat dua tab, **General** dan **SEO**. Beberapa situs menampilkan tab tambahan dari paket yang terpasang, misalnya pengaturan toko.

Tab **General** dibagi menjadi beberapa kartu: **General**, **Languages**, **Branding**, **Code snippets**, **Email**, **Security**, dan **Comments**. Klik judul kartu untuk melipat atau membukanya kembali.

Untuk menyimpan perubahan:

1. Ubah yang diperlukan di kartu mana pun.
2. Klik **Save settings** (di bagian atas atau bawah halaman), atau tekan Ctrl S (⌘ S di Mac).
3. Pesan "Settings saved." menandakan perubahan telah tersimpan.

> [!TIP]
> Jika Anda hendak meninggalkan halaman sementara masih ada perubahan yang belum disimpan, admin akan memperingatkan Anda terlebih dahulu.

## Umum

- **Site name**: nama situs Anda. Dipakai pada judul halaman dan di mana pun template menampilkannya.
- **Description**: ringkasan singkat tentang situs. Dipakai sebagai deskripsi meta untuk halaman yang tidak memiliki deskripsi sendiri.
- **Timezone**: zona waktu untuk tanggal dan jam. Pilih kota atau wilayah Anda dari daftar, misalnya `Asia/Jakarta`.
- **Homepage**: entri yang ditampilkan di alamat utama situs. Klik kolomnya, pilih entri, lalu simpan. Tombol **×** di sebelahnya menghapus pilihan tersebut.

> [!NOTE]
> Pilih entri yang sudah terbit: pengunjung tidak dapat melihat draf, sehingga beranda yang belum terbit akan membuat alamat utama kosong.

## Bahasa

Kartu **Languages** mencantumkan semua bahasa situs. Bahasa utama memiliki alamat pendek (misalnya `/tentang`); bahasa lain diawali kodenya (`/en/about`).

Untuk menambahkan bahasa:

1. Ketik kodenya di kotak kecil di bagian bawah, misalnya `en`, `id`, atau `pt-BR`.
2. Klik **Add language**.
3. Ketik nama tampilan bahasa di sebelah kodenya, misalnya "English". Pengunjung melihat nama ini pada pemilih bahasa.
4. Klik **Save settings**.

Untuk menghapus bahasa, klik **×** di sebelahnya. Bahasa utama ditandai **Main language** dan tidak dapat dihapus. Selama situs belum memiliki konten, tombol **Make main** menjadikan bahasa lain sebagai bahasa utama.

> [!WARNING]
> Setelah konten ada, bahasa utama terkunci. Menggantinya berarti mengonversi seluruh konten, sehingga harus dilakukan oleh developer di server. Kartu ini menampilkan tautan "How do I change it?" berisi langkah-langkahnya.

> [!TECHNICAL]
> Bahasa utama diganti dengan `php artisan sunrice:switch-main-language {code}` (terlebih dahulu dengan `--dry-run`, dan `--copy-missing` untuk mengisi item yang belum diterjemahkan). Cadangkan database terlebih dahulu dan jalankan `php artisan optimize` sesudahnya jika route atau config di-cache. Lihat [Changing the main language](docs:multilingual.md#changing-the-main-language).

Untuk menerjemahkan konten, lihat [Terjemahan](translations.md).

## Branding

Kartu **Branding** mengubah tampilan **admin**, bukan situs publik Anda.

- **Panel name** dan **Tagline**: ditampilkan di sidebar, di halaman login, dan di tab browser. Mengganti nama juga menyembunyikan catatan "Powered by Sunrice CMS".
- **Logo**: klik **Choose logo** untuk memilih gambar dari pustaka media. Gambar persegi berformat SVG atau PNG paling cocok; gambar ini juga dipakai sebagai ikon tab browser.
- **Font**: jenis huruf yang dipakai di admin.
- **Accent color**: warna tombol utama, item menu yang aktif, dan garis fokus. Gunakan pemilih warna atau ketik kode seperti `#1e66f5`; **Reset** mengembalikan ke warna netral bawaan.

Setelah disimpan, halaman dimuat ulang agar tampilan baru berlaku.

> [!TIP]
> Setiap orang dapat mengganti tampilan admin menjadi **Light**, **Dark**, atau **System** melalui menu pengguna di bagian bawah sidebar.

## Cuplikan kode

Di kartu **Code snippets**, tempelkan potongan kode kecil yang harus ada di setiap halaman, seperti analitik, tag manager, atau tag verifikasi dari mesin pencari, ke kotak **In <head>**, **Start of <body>**, atau **End of <body>** sesuai petunjuk penyedia layanan, lalu simpan.

> [!WARNING]
> Cuplikan dicetak persis seperti yang Anda tempelkan, di setiap halaman. Cuplikan yang rusak dapat merusak tampilan seluruh situs. Tempelkan hanya kode dari sumber yang Anda percayai.

> [!TECHNICAL]
> Cuplikan hanya muncul jika layout memuat `<x-sunrice::code position="head" />` (serta `body_start`, `body_end`). Template awal sudah memuatnya. Lihat [`<x-sunrice::code>`](docs:blade-components.md#x-sunricecode).

## Email

Situs mengirim kode login, tautan reset kata sandi, serta notifikasi formulir dan komentar melalui email. Kartu **Email** menampilkan pengaturan saat ini (**Mailer**, **Server**, **From**); pengaturan ini tidak dapat diubah di sini. Jika muncul peringatan kuning bahwa mailer "doesn't deliver email", pesan hanya ditulis ke file log: minta developer Anda menyiapkan email.

Untuk memeriksa apakah email berfungsi:

1. Di bawah **Send a test email**, ketik alamat email Anda sendiri.
2. Klik **Send test**.
3. Periksa kotak masuk (dan folder spam). Jika pengiriman gagal, pesan galat dari server email muncul di bawah kotak tersebut.

> [!TECHNICAL]
> Email dikonfigurasi di `.env` dengan kunci `MAIL_*` (misalnya `MAIL_MAILER=smtp`, `MAIL_HOST`, `MAIL_FROM_ADDRESS`). Notifikasi formulir dan komentar dikirim lewat antrean, jadi queue worker harus berjalan kecuali `QUEUE_CONNECTION=sync`. Lihat [SMTP settings](docs:mail.md#smtp-settings) dan [Queue worker](docs:mail.md#queue-worker).

## Keamanan

Di kartu **Security**, aktifkan **Two-factor login with an emailed code** agar login lebih aman: setelah memasukkan kata sandi, setiap orang juga harus memasukkan kode 6 digit yang dikirim ke alamat emailnya.

> [!WARNING]
> Aktifkan fitur ini hanya setelah email uji sampai kepada Anda. Jika kode login tidak dapat terkirim, tidak ada yang bisa login, termasuk Anda.

> [!TECHNICAL]
> Jika semua orang terkunci, developer dapat menonaktifkannya di server dengan `php artisan sunrice:two-factor off`. Fitur ini juga dapat diatur dengan `SUNRICE_TWO_FACTOR=true`. Lihat [Two-factor login](docs:mail.md#two-factor-login).

## Komentar

Kartu **Comments** mengatur komentar pada koleksi yang mengizinkannya: apakah komentar baru menunggu persetujuan, siapa yang boleh berkomentar, captcha, batas jumlah komentar, kapan komentar ditutup, berapa tingkat balasan yang ditampilkan, dan siapa yang menerima email tentang komentar baru. Setiap pilihan dijelaskan di [Komentar](comments.md).

## Tab SEO

Tab **SEO** berisi pilihan mesin pencari dan berbagi untuk seluruh situs. Simpan dengan **Save SEO settings**.

Di kartu **Search engines & sharing**:

- **Hide the whole site from search engines**: meminta mesin pencari untuk tidak menampilkan halaman mana pun dan mengosongkan sitemap. Ditujukan untuk salinan uji; pastikan nonaktif di situs live Anda.
- **Add the site name to page titles**: menampilkan judul seperti "Tentang kami | Situs Saya" di tab browser dan hasil pencarian. Kotak **Separator** menentukan karakter pemisahnya.
- **X/Twitter handle**: akun Anda, misalnya `@acme`, yang ditambahkan ke pratinjau saat dibagikan.
- **Default share image**: klik **Choose image** untuk memilih gambar yang tampil saat halaman tanpa gambar sendiri dibagikan di media sosial.

Di bawahnya, **Fields used for SEO** memungkinkan Anda memilih, per koleksi dan taksonomi, field mana yang mengisi **Meta title**, **Meta description**, dan **Share image** ketika sebuah entri mengosongkan field SEO-nya sendiri. **Automatic** memilih field yang sesuai; **None** tidak memakai apa pun. Lihat [SEO](seo.md).
