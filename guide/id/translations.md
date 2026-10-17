# Terjemahan

Jika situs Anda tersedia dalam lebih dari satu bahasa, setiap entri, term, global, dan item menu dapat memiliki versi untuk setiap bahasa. Halaman ini menjelaskan cara kerja bahasa di situs dan cara menerjemahkan konten di admin.

## Bahasa di situs

Setiap situs memiliki satu **bahasa utama**. Semua konten ditulis dalam bahasa utama terlebih dahulu; bahasa lainnya adalah terjemahannya.

- Halaman dalam bahasa utama memiliki alamat web biasa, misalnya `/tentang`.
- Bahasa lain diawali kode bahasanya, misalnya `/en/about`.
- Daftar bahasa dan bahasa utama dikelola di **Settings → General**, pada kartu **Languages** (lihat [Pengaturan](settings.md)).

### Yang dilihat pengunjung bila terjemahan belum ada

Pengunjung yang membuka halaman dalam bahasa yang belum diterjemahkan (atau belum ditandai siap) tidak akan melihat pesan galat. Mereka mendapatkan seluruh versi bahasa utama dari halaman tersebut. Terjemahan baru tampil di situs setelah berstatus **Ready** dan entrinya sendiri sudah terbit.

> [!TECHNICAL]
> Halaman cadangan (fallback) disajikan di alamat berawalan bahasa, dengan canonical URL yang mengarah ke halaman bahasa utama dan tanpa alternatif `hreflang`. Perilaku ini tidak dapat diubah. Lihat [Whole-entity fallback](docs:multilingual.md#whole-entity-fallback).

## Menerjemahkan entri

Jika situs memiliki lebih dari satu bahasa, editor entri menampilkan **tab bahasa** (misalnya **ID** dan **EN**) di atas field. Setiap bahasa disimpan terpisah.

1. Buka entri lalu klik tab bahasa yang ingin Anda terjemahkan.
2. Field berisi teks bahasa utama sebagai titik awal. Ganti dengan terjemahan Anda. Sebuah catatan di bagian atas mengingatkan bahwa di sini hanya teks yang diterjemahkan.
3. Terjemahkan **Title**. Biarkan **Slug** kosong agar dibuat dari judul terjemahan, atau ketik slug sendiri.
4. Klik **Save draft**.
5. Setelah terjemahan selesai, klik **Publish** selagi tab bahasa tersebut terbuka. Terjemahan akan tayang dan ditandai **Ready**.

Kartu **Status** menampilkan **Translation: Draft** atau **Translation: Ready** untuk bahasa yang sedang Anda lihat. Titik kecil pada tab membantu Anda melihat keadaannya sekilas: titik kuning berarti bahasa tersebut memiliki draf yang belum diterbitkan, titik hijau berarti terjemahannya sudah siap.

> [!NOTE]
> Berpindah tab saat ada perubahan yang belum disimpan akan meminta konfirmasi, karena perubahan pada bahasa saat ini akan hilang. Simpan terlebih dahulu.

### Field bersama

Tidak semua hal diterjemahkan. Gambar, sakelar, angka, tanggal, dan susunan baris serta blok adalah milik bahasa utama dan sama di semua bahasa. Di bahasa lain, field tersebut hanya dapat dibaca dan diberi tanda **Shared with** diikuti kode bahasa utama. Di sana Anda tidak dapat menambah, menghapus, mengubah urutan, atau menyembunyikan baris dan blok; hanya teksnya yang dapat diubah.

Artinya:

- Mengganti gambar atau urutan blok di bahasa utama langsung mengubah semua bahasa.
- Teks yang tidak Anda ubah dalam terjemahan tetap mengikuti bahasa utama.

> [!TECHNICAL]
> Apakah sebuah field diterjemahkan ditentukan oleh sakelar **Translatable** di blueprint. Field text, textarea, rich text, dan link dapat diterjemahkan secara bawaan. Lihat [Which fields are translatable](docs:multilingual.md#which-fields-are-translatable).

### Draft dan Ready

Sebuah terjemahan berstatus **Draft** (tidak tampil di situs) atau **Ready** (tampil, setelah diterbitkan). Selain dengan menerbitkan, Anda dapat mengubahnya melalui menu **More actions** (**⋯**):

- **Mark ready** / **Unmark ready**: mengaktifkan atau menonaktifkan status Ready.
- **Return to draft**: menurunkan kembali terjemahan yang sudah siap dari situs. Pengunjung lalu melihat bahasa utama untuk halaman itu sampai terjemahannya siap lagi.

Untuk menurunkan entri dari situs di semua bahasa, gunakan **Unpublish** (lihat [Entri](entries.md#menerbitkan-dan-menjadwalkan)).

### Lencana Outdated

Jika bahasa utama diterbitkan ulang setelah sebuah terjemahan selesai, terjemahan tersebut menampilkan lencana **Outdated translation**. Teks utama mungkin telah berubah, jadi bandingkan keduanya dan perbarui terjemahannya. Menerbitkan ulang terjemahan akan menghilangkan lencana ini.

## Slug dan alamat web terjemahan

Setiap bahasa memiliki slugnya sendiri, sehingga halaman bahasa Inggris dapat beralamat `/en/about-us` sementara halaman utamanya di `/tentang`. Halaman induk memakai slug masing-masing bahasa untuk seluruh alamatnya. Jika Anda mengubah slug yang sudah terbit lalu menerbitkannya lagi, alamat lama otomatis dialihkan ke alamat baru.

## Siapa yang dapat menerjemahkan

Sebagian peran hanya boleh menerjemahkan. Orang dengan peran seperti itu dapat menyunting bahasa lain tetapi tidak bahasa utama; pada tab bahasa utama mereka melihat pesan *You can translate this entry. Switch to another language to edit it.*

Dua orang dapat bekerja pada bahasa yang berbeda dari entri yang sama secara bersamaan: setiap bahasa dikunci terpisah (lihat [Entri](entries.md#saat-dua-orang-menyunting-entri-yang-sama)).

## Terjemahan mesin

Tidak ada tombol terjemahkan di admin, tetapi pengembang Anda dapat menerjemahkan situs secara otomatis dengan layanan AI. Entri hasil terjemahan mesin masuk sebagai **draf**: situs yang tayang tidak berubah sampai seorang editor memeriksa setiap terjemahan dan menerbitkannya. Terjemahan term masuk dengan **Ready** dalam keadaan mati. Globals dan label menu langsung ditulis. Asisten AI yang terhubung ke situs juga dapat menerjemahkan (lihat [Akses AI](ai-access.md)).

> [!TECHNICAL]
> Jalankan `php artisan sunrice:translate` (coba `--dry-run` terlebih dahulu) setelah menambahkan `GEMINI_API_KEY` atau kunci OpenRouter ke `.env`. Lihat [Machine translation](docs:translation.md).

## Menerjemahkan term, globals, dan menu

- **Term**: editor term memiliki tab bahasa yang sama. Biarkan judul terjemahan kosong untuk menampilkan bahasa utama. Sakelar **Ready** menentukan apakah terjemahan tampil di situs. Lihat [Taksonomi](taxonomies.md).
- **Globals**: buka global set lalu pindah ke tab bahasa; titik hijau menandai bahasa yang sudah memiliki terjemahan. Teks yang belum diterjemahkan menampilkan bahasa utama. Globals tidak memiliki tahap Ready. Lihat [Globals](globals.md).
- **Menu**: setiap item menu memiliki kotak **Label** untuk setiap bahasa. Bahasa yang dibiarkan kosong memakai label bahasa utama; untuk tautan ke entri atau term, label kosong memakai judul yang ditautkan. Lihat [Menu](menus.md).
