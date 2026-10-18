# Selamat datang di Sunrice CMS

Panduan ini ditujukan bagi orang-orang yang mengelola situs web sehari-hari: editor yang menulis dan menerbitkan konten, serta pengelola situs yang mengurus struktur, pengguna, dan pengaturannya. Panduan ini menjelaskan cara admin disusun dan memandu Anda menyelesaikan setiap tugas langkah demi langkah. Semua pekerjaan dilakukan di admin, yang Anda buka di peramban dengan alamat situs Anda ditambah **/cms** (misalnya `https://example.com/cms`). Tampilan admin berbahasa Inggris, sehingga nama tombol dan menu dalam panduan ini ditulis persis seperti yang tampil di layar.

> [!TECHNICAL]
> Alamat admin dapat diubah dengan `SUNRICE_ADMIN_PATH` di `.env` (kunci `sunrice.admin.path`, bawaan `cms`). Lihat [Configuration](docs:configuration.md).

## Masuk ke admin

1. Buka alamat admin. Layar **Log in to …** akan tampil.
2. Isi **Email address** (alamat email) dan **Password** (kata sandi).
3. Centang **Remember me** jika Anda memakai komputer sendiri dan ingin tetap masuk.
4. Klik **Log in**.

Untuk keluar, buka menu pengguna di bagian bawah sidebar lalu pilih **Log out**.

### Kode login dua langkah

Situs Anda mungkin meminta langkah kedua setelah kata sandi. Jika demikian, layar **Check your email** akan tampil dan kode 6 digit dikirim ke alamat email Anda.

1. Buka email tersebut dan salin kodenya. Kode berlaku beberapa menit saja (layar menampilkan berapa lama).
2. Ketik kode di kolom **Login code**.
3. Klik **Verify and log in**.

Jika email tidak kunjung datang, periksa folder spam, lalu klik **send a new code** (tautan ini aktif setelah menunggu sebentar). Hanya kode terbaru yang berlaku. **Back to log in** membawa Anda kembali ke layar pertama.

> [!TECHNICAL]
> Login dua langkah diaktifkan di **Settings → Security** atau dengan `SUNRICE_TWO_FACTOR=true`. Fitur ini membutuhkan email yang berfungsi; jika kode tidak dapat terkirim, matikan di server dengan `php artisan sunrice:two-factor off`. Lihat [Two-factor login](docs:mail.md#two-factor-login).

### Lupa kata sandi

1. Di layar login, klik **Forgot password?**.
2. Isi **Email address** lalu klik **Email password reset link**.
3. Buka email yang masuk dan ikuti tautannya.
4. Ketik kata sandi baru di **New password**, ulangi di **Confirm password**, lalu klik **Reset password**.
5. Masuk dengan kata sandi baru.

## Dashboard

Setelah masuk, Anda tiba di **Dashboard**. Halaman ini menampilkan:

- **Your workspace, at a glance**: sapaan serta jumlah total entri dan koleksi.
- **Your collections**: satu kartu untuk setiap koleksi beserta jumlah entrinya. Klik panah pada kartu untuk membuka koleksi tersebut.
- **Recent edits**: entri yang terakhir diubah di seluruh situs, lengkap dengan statusnya. Klik salah satunya untuk membukanya.
- **Recent form submissions**: pesan terbaru yang dikirim pengunjung melalui formulir situs.

Setiap kartu dapat dilipat dengan mengeklik judulnya; admin mengingat pilihan ini di peramban Anda.

## Berkeliling di admin

### Sidebar

Sidebar di sebelah kiri memuat semua bagian yang boleh Anda gunakan. Isinya bergantung pada peran (role) Anda, jadi rekan Anda mungkin melihat menu yang lebih banyak atau lebih sedikit. Di bagian atas, **Dashboard** (atau logo) membawa Anda kembali ke halaman awal. Menu lainnya dikelompokkan sebagai berikut:

- **Content**: satu menu untuk setiap koleksi (misalnya *Pages* atau *Articles*), ditambah **Comments** jika situs memiliki komentar.
- **Taxonomies**: satu menu untuk setiap taksonomi, seperti *Categories* atau *Tags*.
- **Structure**: **Menus**, **Globals**, dan **Forms**.
- **Manage**: **Assets** (pustaka media), serta layar administrasi seperti **Collections**, **Blueprints**, **Fieldsets**, **Taxonomies**, **Users**, **Roles**, **Activity log**, **Settings**, **AI access**, dan **Docs**.

Sebagian situs juga menampilkan kelompok tambahan, seperti **Resources**, yang ditambahkan oleh pengembangnya.

Klik nama kelompok untuk melipat atau membukanya. Admin mengingat kelompok yang dilipat dan membukanya kembali saat Anda mengunjungi salah satu halamannya. Tombol di kiri atas header halaman mengecilkan sidebar menjadi ikon saja (arahkan kursor ke ikon untuk melihat namanya). Di ponsel, tombol yang sama membuka sidebar sebagai panel.

### Breadcrumb

Header di bagian atas setiap halaman menampilkan jejak navigasi (breadcrumb), misalnya **Content › Articles › Tulisan pertama saya**. Klik bagian sebelumnya untuk naik satu tingkat. Sebagian besar layar penyuntingan juga memiliki tombol panah kembali di samping judul halaman.

### Menu pengguna

Bagian bawah sidebar menampilkan nama dan alamat email Anda. Klik untuk membuka menu pengguna:

- **Appearance**: pilih **Light** (terang), **Dark** (gelap), atau **System** (mengikuti pengaturan komputer Anda).
- **Log out**: keluar dari admin.

Tidak ada halaman profil tersendiri. Untuk mengubah nama, email, atau kata sandi, hubungi pengelola situs, atau gunakan **Manage → Users** jika peran Anda mengizinkan (lihat [Pengguna dan peran](users-roles.md)).

### Menyimpan

Layar penyuntingan memberi tahu jika ada **Unsaved changes** (perubahan yang belum disimpan) dan memperingatkan Anda sebelum meninggalkan halaman yang belum disimpan. Anda dapat menyimpan dengan **Ctrl S** (Windows) atau **⌘ S** (Mac).

## Cara CMS ini disusun

Beberapa istilah akan sering muncul dalam panduan ini:

- **Collections** (koleksi) adalah jenis konten, seperti *Pages*, *Articles*, atau *Products*. Setiap koleksi memiliki daftarnya sendiri di sidebar.
- **Entries** (entri) adalah isi masing-masing koleksi: satu halaman, satu artikel, satu produk.
- **Blueprints** menentukan **field** (isian) apa saja yang dimiliki sebuah entri: selalu ada judul dan slug, ditambah misalnya ringkasan, gambar, atau teks kaya. **Fieldsets** adalah kelompok field yang dapat dipakai ulang.
- **Taxonomies** (taksonomi) mengelompokkan entri berdasarkan topik. Taksonomi seperti *Categories* berisi **terms** (istilah) seperti *Berita* atau *Acara*.
- **Menus** adalah daftar navigasi di situs, seperti menu utama atau tautan di footer.
- **Globals** menyimpan konten yang dipakai di seluruh situs, seperti detail kontak atau teks footer.
- **Assets** adalah file yang Anda unggah: gambar, dokumen, dan video.

Editor umumnya bekerja dengan entri, term, menu, globals, dan aset. Pengelola situs menyiapkan koleksi, blueprint, dan taksonomi.

## Isi panduan ini

- [Entri](entries.md): menulis, menerbitkan, menjadwalkan, dan mengatur konten.
- [Terjemahan](translations.md): konten dalam lebih dari satu bahasa.
- [Media](media.md): mengunggah dan mengelola gambar serta file.
- [SEO](seo.md): mesin pencari dan berbagi di media sosial.
- [Taksonomi](taxonomies.md): kategori, tag, dan term lainnya.
- [Menu](menus.md): navigasi situs.
- [Globals](globals.md): konten untuk seluruh situs.
- [Formulir](forms.md) dan [Komentar](comments.md): kiriman dari pengunjung.
- [Struktur](structure.md): koleksi, blueprint, fieldset, dan taksonomi.
- [Pengaturan](settings.md) dan [Tampilan](appearance.md): opsi seluruh situs dan branding.
- [Pengguna dan peran](users-roles.md), [Log aktivitas](activity-log.md), dan [Akses AI](ai-access.md): siapa boleh melakukan apa, dan apa saja yang telah terjadi.
