# Entri

Entri adalah halaman, artikel, produk, dan isi lain di situs Anda. Halaman ini membahas daftar entri dan seluruh perjalanan sebuah entri: draf, penerbitan, penjadwalan, revisi, dan tempat sampah.

## Daftar entri

Di sidebar, pada kelompok **Content**, klik sebuah koleksi (misalnya *Articles*). Daftar menampilkan **Title** (judul), **Status** (*published*, *draft*, atau *scheduled*), **Created by** (pembuat), serta tanggal **Created** dan **Updated** setiap entri. Koleksi hierarkis juga menampilkan kolom **Parent** (induk).

- **Search…**: ketik untuk mencari entri berdasarkan judul.
- **Filter**: **Status** (**Published**, **Draft**, **Scheduled**), **Created by** (seseorang, atau **No author**), dan **Trash** (**Trashed**, untuk melihat entri di tempat sampah). Pilih **All** untuk menghapus filter.
- **Pengurutan**: klik judul kolom seperti **Title**, **Created**, atau **Updated** untuk mengurutkan; klik sekali lagi untuk membalik urutan.
- **Columns**: pilih kolom yang ditampilkan, termasuk field milik koleksi itu sendiri. Pilihan Anda diingat.
- **Export**: unduh entri yang sedang ditampilkan sebagai file spreadsheet (CSV).

Klik sebuah entri untuk membukanya. Tombol **Go to…** di samping **New entry** membawa Anda ke layar terkait, misalnya taksonomi koleksi tersebut. Koleksi yang memiliki halaman daftar (seperti halaman ikhtisar blog) juga memiliki tombol **Archive/listing page** untuk menyunting teks halaman itu.

### Tindakan massal

Centang kotak di depan entri (atau kotak di header untuk memilih semuanya), lalu pilih tindakan: **Trash**, **Restore**, **Publish**, atau **Delete forever**. **Restore** dan **Delete forever** hanya berlaku untuk entri yang ada di tempat sampah.

### Urutan manual

Sebagian koleksi diurutkan secara manual. Daftarnya menampilkan keterangan *Drag entries to set the order they appear in on the site*: seret entri melalui pegangannya untuk memindahkannya. Selama pencarian, filter, atau pengurutan kolom aktif, fitur seret dijeda; hapus semuanya untuk menyeret lagi.

## Membuat entri

1. Buka koleksi lalu klik **New entry**.
2. Ketik **Title**. Biarkan **Slug** kosong agar dibuat otomatis dari judul. Slug adalah bagian akhir alamat web halaman, misalnya `/blog/tulisan-pertama-saya`.
3. Jika kartu **Status** menawarkan beberapa pilihan **Blueprint**, pilih yang Anda inginkan (jika tidak, blueprint bawaan koleksi yang dipakai).
4. Isi field-fieldnya. Konten berulang memiliki tombol **Add row** atau **Add block**; setiap baris atau blok memiliki sakelar **Show** untuk menyembunyikannya di situs tanpa menghapusnya.
5. Klik **Create draft**. Entri tersimpan, tetapi belum tampil di situs.

## Draf dan konten yang tayang

Setiap penyimpanan masuk ke **draf**; pengunjung hanya melihat apa yang Anda **terbitkan**. Pada entri yang sudah terbit, Anda dapat terus menyimpan draf dengan **Save draft** sementara halaman yang tayang tetap seperti semula; header kemudian menampilkan lencana **Unpublished changes**. Mengeklik **Publish** menayangkan draf tersebut.

Kartu **Status** di sebelah kanan menampilkan keadaan entri (**Draft**, **Scheduled**, atau **Published**) dan tombol simpan: **Save draft** bila ada perubahan yang belum disimpan, **Saved** bila semuanya sudah tersimpan.

> [!WARNING]
> Meninggalkan halaman sebelum menyimpan akan menghilangkan perubahan Anda. Admin memang memperingatkan, tetapi biasakan menekan **Ctrl S** / **⌘ S**.

## Menerbitkan dan menjadwalkan

- **Terbitkan sekarang**: klik **Publish** di bagian atas. Perubahan yang belum disimpan akan disimpan terlebih dahulu.
- **Jadwalkan**: di kartu **Status**, isi **Publish date** dengan waktu di masa depan lalu klik **Schedule**. Status berubah menjadi **Scheduled** dan kartu menampilkan kapan entri **Goes live** (tayang).
- **Ubah tanggal** entri yang sudah terbit: pilih **Publish date** baru lalu klik **Update date** (atau **Reschedule** untuk tanggal di masa depan). Tanggal di masa lalu hanya ditampilkan sebagai tanggal terbit.
- **Batalkan penerbitan**: klik **Unpublish** di kartu **Status** (atau **Cancel schedule** untuk entri terjadwal). Entri kembali menjadi **Draft** dan hilang dari situs.

> [!TECHNICAL]
> Entri terjadwal diterbitkan oleh `sunrice:publish-scheduled`, yang berjalan setiap menit melalui scheduler Laravel. Cron server harus menjalankan `php artisan schedule:run`. Lihat [Scheduler](docs:commands.md#scheduler).

## Melihat halaman

Jika entri memiliki halaman sendiri di situs, header menampilkan **View page** (halaman publik) atau, sebelum tayang, **View draft**. Draf hanya dapat dilihat oleh Anda dan editor lain selama sedang masuk ke admin.

## Tindakan lainnya

Tombol **⋯** (**More actions**) di bagian atas berisi:

- **Duplicate**: membuat salinan sebagai draf baru, dengan `-copy` ditambahkan pada slugnya.
- **Unpublish**: menurunkan entri yang sudah terbit dari situs.
- **Mark ready** / **Unmark ready** dan **Return to draft**: untuk terjemahan, lihat [Terjemahan](translations.md).
- **Move to trash**: memindahkan entri ke tempat sampah, sehingga hilang dari situs dan dari daftar.

## Tempat sampah, memulihkan, dan menghapus

Entri di tempat sampah tidak dapat dibuka. Untuk mengembalikannya, buka daftar, atur filter **Trash** ke **Trashed**, centang entrinya, lalu pilih **Restore**. Untuk menghapusnya selamanya, pilih **Delete forever**.

> [!WARNING]
> **Delete forever** tidak dapat dibatalkan. Halaman anak dari halaman yang dihapus akan pindah ke tingkat teratas.

## Revisi

Setiap kali diterbitkan, sebuah revisi disimpan. Kartu **Revisions** mencantumkan revisi terbaru berdasarkan tanggal.

1. Klik **Restore** di samping sebuah revisi.
2. Konfirmasi. Konten lama disalin ke draf; halaman yang tayang belum berubah.
3. Periksa, lalu klik **Publish**. Berubah pikiran? Klik **Undo** di kartu tersebut.

> [!TECHNICAL]
> Jumlah revisi yang disimpan per bahasa diatur dengan `sunrice.revisions.keep` (bawaan 50).

## Saat dua orang menyunting entri yang sama

Hanya satu orang yang dapat menyunting sebuah entri (dalam satu bahasa) pada satu waktu. Jika rekan Anda sedang membukanya, Anda akan melihat siapa dan sejak kapan, lalu dapat memilih **Go back** (kembali), **View only** (hanya melihat), atau **Take over** (mengambil alih). Jika Anda mengambil alih, perubahan rekan Anda yang belum disimpan tetap disimpan terpisah dan muncul di halaman dengan tombol **Load into the form** dan **Discard**.

Jika seseorang menyimpan entri setelah Anda membukanya, penyimpanan Anda ditolak: pilih **Reload** untuk melihat versi mereka, atau **Overwrite with mine** untuk menimpanya dengan versi Anda.

> [!TECHNICAL]
> Kunci penyuntingan disimpan di cache store, yang harus dipakai bersama oleh semua server. Lihat [Two people editing](docs:content-modeling.md#two-people-editing-the-same-thing).

## Halaman induk

Pada koleksi hierarkis (biasanya *Pages*), kartu **Parent** menempatkan entri di bawah entri lain; pilih **None (top level)** agar tetap di tingkat teratas. Alamat web diawali alamat induknya, misalnya `/tentang/tim`. Induk baru langsung berlaku begitu Anda menyimpan, dan alamat lama dialihkan ke alamat baru.

## Term

Jika koleksi memakai taksonomi, kartu **Taxonomies** memungkinkan Anda menandai entri: klik **Add term…**, cari, lalu pilih term. Taksonomi yang bertanda **(one)** hanya mengizinkan satu term. Lihat [Taksonomi](taxonomies.md).

## Template

Kartu **Template** (terlipat secara bawaan) memungkinkan Anda memberi satu entri desain halaman yang berbeda dari entri lain di koleksinya. Biarkan kosong kecuali pengembang Anda memberikan nama template.

> [!TECHNICAL]
> Isinya adalah nama view Blade, misalnya `pages.landing`; nilai ini mengalahkan template koleksi. Lihat [Resolution order](docs:templates.md#resolution-order).
