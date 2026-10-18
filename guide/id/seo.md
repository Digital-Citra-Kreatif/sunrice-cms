# SEO

SEO (search engine optimisation) berkaitan dengan cara halaman Anda tampil di hasil pencarian dan saat dibagikan di media sosial. Sunrice mengisi nilai yang wajar secara otomatis; halaman ini menjelaskan di mana Anda dapat menyempurnakannya, baik per entri maupun untuk seluruh situs.

## Cara situs memilih judul, deskripsi, dan gambar

Untuk setiap halaman, situs mencari setiap nilai dengan urutan berikut dan memakai yang pertama ditemukan:

1. Field **SEO** milik halaman itu sendiri (diisi pada entri).
2. Field entri yang dipilih di **Settings → SEO** (misalnya ringkasan atau gambar utamanya).
3. **SEO defaults** dari koleksi atau taksonominya.
4. Pengaturan seluruh situs (**Description** situs di **Settings → General**, dan **Default share image** di **Settings → SEO**).

Jadi, Anda hanya perlu mengisi field SEO sebuah entri bila menginginkan sesuatu yang berbeda dari pilihan otomatis situs.

## Field SEO pada entri

Setiap entri memiliki kartu **SEO** di bawah field lainnya: *How this entry appears in search results and social shares.*

- **Meta title**: judul yang tampil di tab peramban dan sebagai judul di hasil pencarian. Jika kosong, judul entri yang dipakai.
- **Meta description**: teks singkat di bawah judul pada hasil pencarian. Cukup satu atau dua kalimat (sekitar 160 karakter).
- **Canonical URL**: hanya untuk halaman yang isinya juga ada di alamat lain; ketik alamat halaman aslinya. Hampir selalu biarkan kosong.
- **Open Graph image**: gambar yang tampil saat halaman dibagikan di media sosial atau aplikasi chat. Klik **Choose image** untuk memilihnya (lihat [Media](media.md#memilih-aset-di-field)).
- **Hide from search engines (noindex)**: meminta mesin pencari untuk tidak mencantumkan halaman ini, dan mengeluarkannya dari sitemap. Gunakan untuk halaman terima kasih, halaman internal, dan sejenisnya.

Field SEO disimpan bersama draf dan tayang saat Anda menerbitkan, sama seperti bagian entri lainnya. Di situs multibahasa, setiap bahasa memiliki field SEO sendiri (lihat [Terjemahan](translations.md)).

> [!NOTE]
> Term dan halaman daftar (seperti halaman ikhtisar blog) memiliki field SEO yang sama di editornya masing-masing.

## Settings → SEO

Pengelola situs membuka **Manage → Settings** lalu mengeklik tab **SEO**.

### Search engines & sharing

- **Hide the whole site from search engines**: menambahkan noindex ke setiap halaman dan mengosongkan sitemap. Berguna untuk situs uji coba (staging); pastikan pengaturan ini mati di situs yang tayang.
- **Add the site name to page titles**: menampilkan judul seperti *Tentang kami | Situs Saya* di tab peramban dan hasil pencarian. Ubah **Separator** jika Anda lebih suka karakter lain. Pratinjau saat dibagikan tetap memakai judul tanpa nama situs.
- **X/Twitter handle**: nama akun Anda, misalnya `@acme`, yang ditambahkan ke pratinjau saat dibagikan.
- **Default share image**: klik **Choose image**. Gambar ini dipakai saat halaman dibagikan dan tidak memiliki gambar sendiri.

### Fields used for SEO

Untuk setiap koleksi dan taksonomi, pilih field mana yang mengisi **Meta title**, **Meta description**, dan **Share image** yang kosong:

- **Automatic** memilih field yang cocok dengan sendirinya, misalnya field bernama *excerpt* atau *summary* untuk deskripsi, atau field gambar pertama untuk gambar berbagi. Menu menampilkan field mana yang dipilihnya.
- **None** tidak memakai field apa pun.
- Atau pilih field tertentu dari daftar.

Deskripsi yang diambil dari field dipotong menjadi 160 karakter. Klik **Save SEO settings** setelah selesai.

## SEO defaults per koleksi dan taksonomi

Setiap koleksi dan taksonomi juga memiliki kartu **SEO defaults** di pengaturannya, pada **Manage → Collections** atau **Manage → Taxonomies** (lihat [Struktur](structure.md)):

- **Default meta description**: untuk halaman yang mengosongkan deskripsinya sendiri.
- **Default share image**: untuk halaman tanpa Open Graph image sendiri.
- **Hide all of these pages from search engines (noindex)**: menyembunyikan semua entri koleksi tersebut (atau semua halaman term taksonomi tersebut) dan mengeluarkannya dari sitemap.

## Sitemap dan robots

Situs menerbitkan **sitemap** di `/sitemap.xml`: daftar semua halaman publik yang dibaca mesin pencari untuk menemukan konten Anda. Sitemap diperbarui dengan sendirinya. Isinya mencakup entri yang sudah terbit, halaman daftar, dan halaman term, dalam setiap bahasa yang terjemahannya sudah siap. Halaman bertanda noindex, halaman dengan canonical URL yang mengarah ke tempat lain, dan seluruh situs saat disembunyikan tidak dimasukkan.

Sakelar noindex di atas memberi tahu mesin pencari agar tidak mencantumkan halaman, melalui instruksi *robots* di dalam halaman itu sendiri. Draf yang Anda lihat selagi masuk ke admin tidak pernah diindeks.

> [!TECHNICAL]
> Sitemap disimpan di cache dan dibangun ulang saat konten berubah. Sunrice tidak membuat file `robots.txt`; jika Anda membutuhkannya (misalnya untuk mengarahkan mesin pencari ke `/sitemap.xml`), tambahkan ke folder `public/` aplikasi. Tag-tagnya sendiri berasal dari `<x-sunrice::seo>` di layout; lihat [SEO](docs:templates.md#seo).

## Pengalihan saat slug berubah

Jika Anda mengubah slug entri yang sudah terbit lalu menerbitkannya lagi, atau memindahkan halaman ke bawah induk lain, alamat lama otomatis mengalihkan pengunjung dan mesin pencari ke alamat baru (pengalihan permanen *301*). Tautan lama dan hasil pencarian tetap berfungsi, jadi Anda tidak perlu melakukan apa pun.

> [!NOTE]
> Tidak ada layar untuk melihat atau menambahkan pengalihan secara manual. Hindari memakai ulang slug lama untuk halaman yang berbeda, karena halaman baru itu akan mengambil alih alamat tersebut.

> [!TECHNICAL]
> Pengalihan disimpan di tabel `sunrice_redirects` dan diperiksa sebelum halaman 404 dikembalikan. Pengalihan untuk alamat lain (misalnya dari situs web lama) dibuat di route Laravel atau konfigurasi web server Anda.
