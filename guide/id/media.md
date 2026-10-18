# Media

Pustaka aset menyimpan setiap file yang Anda unggah: gambar, dokumen, dan video. Anda dapat mengatur file dalam folder, memberi keterangan untuk pengunjung dan mesin pencari, serta memilihnya di field mana pun yang meminta gambar atau file.

## Pustaka aset

Di sidebar, pada kelompok **Manage**, klik **Assets**. Di sebelah kiri terdapat daftar **Folders**; di sebelah kanan, file Anda.

- **Search assets…**: ketik kata kunci lalu tekan Enter untuk mencari.
- **All types**: tampilkan hanya **Images** (gambar), **Documents** (dokumen), atau **Video**.
- **Active**: ganti ke **With trashed** atau **Trashed only** untuk melihat file di tempat sampah.
- Tombol grid/daftar beralih antara tampilan gambar mini dan daftar dengan kolom **Name**, **Type**, dan **Size**.
- **Per page**: jumlah file yang ditampilkan per halaman.

Bagian bawah halaman menampilkan jumlah file dan ukuran file terbesar yang diizinkan per unggahan.

## Mengunggah file

1. Buka folder tujuan (atau **All assets** untuk tingkat teratas).
2. Klik **Upload** lalu pilih satu atau beberapa file, atau seret file dari komputer Anda ke area file.
3. Tunggu pesan *Uploaded*. Unggahan dalam jumlah banyak dikirim satu per satu.

File yang terlalu besar atau jenisnya tidak diterima situs akan dilewati dengan sebuah pesan; file lainnya tetap terunggah.

> [!TECHNICAL]
> Batas ukuran diatur oleh `sunrice.assets.max_upload_kb`, dan batas unggah PHP di server juga berlaku. Jika pustaka menyebut tautan `public/storage` tidak ada, jalankan `php artisan storage:link` di server. Lihat [Assets](docs:assets.md).

## Folder

- **Membuat folder**: klik **+** (**New folder**) di samping **Folders**. Ketik **Name**, pilih letaknya di **Inside** (**Top level** atau folder lain), lalu klik **Create folder**. Jika sebuah folder sedang terbuka, folder baru dibuat di dalamnya.
- **Mengganti nama folder**: arahkan kursor ke folder lalu klik ikon pensil (**Rename folder**), ubah **Name**, lalu klik **Save**.
- **Menghapus folder**: arahkan kursor ke folder lalu klik ikon tempat sampah (**Delete folder**). Hanya folder kosong yang dapat dihapus.

> [!NOTE]
> Admin tidak menyediakan tombol untuk memindahkan file ke folder lain setelah diunggah. Unggahlah file langsung ke folder yang tepat. Folder hanya membantu Anda menemukan file; folder tidak mengubah alamat web file.

## Menyunting aset

Klik sebuah file untuk membukanya. Halamannya terdiri dari tiga bagian:

- **Preview**: gambar (atau ikon file), dengan tombol **Copy link** (menyalin alamat web file), **Open file**, dan **Replace file**.
- **Details**: **Title**, **Alt text**, dan **Caption**.
- **File**: jenis, ukuran, dimensi, dan tanggal unggah, serta **Used by**, yaitu daftar entri, term, dan globals yang memakai file ini.

Untuk mengubah keterangan:

1. Isi **Title** (nama yang mudah dibaca di pustaka), **Alt text**, dan jika perlu **Caption** (keterangan gambar).
2. Klik **Save**.

> [!TIP]
> Selalu isi **Alt text** untuk gambar. Teks ini menjelaskan gambar kepada pengguna pembaca layar dan kepada mesin pencari. Jelaskan apa yang tampak di gambar, misalnya *Dua relawan menanam pohon*, bukan *gambar1*.

### Mengganti file

**Replace file** menukar filenya tetapi mempertahankan asetnya, sehingga setiap halaman yang memakainya langsung menampilkan file baru. Gunakan fitur ini untuk memperbarui brosur atau mengganti foto tanpa menyunting setiap halaman.

1. Buka aset lalu klik **Replace file**.
2. Pilih file baru lalu konfirmasi.

### Ukuran gambar

Saat Anda mengunggah gambar, situs otomatis membuat salinan yang lebih kecil (misalnya gambar mini persegi serta versi sedang dan besar), dan halaman memakai ukuran yang sesuai. Anda tidak perlu mengubah ukuran gambar sendiri, meskipun foto yang sangat besar membutuhkan waktu unggah lebih lama. Gambar SVG tidak pernah diubah ukurannya.

> [!TECHNICAL]
> Ukuran ditentukan di `sunrice.assets.image_sizes` (bawaan `thumbnail` 300×300 crop, `medium` lebar 800, `large` lebar 1600). Setelah mengubahnya, jalankan `php artisan sunrice:regenerate-images`. File asli yang terlalu besar dapat diperkecil dengan `php artisan sunrice:optimize-images`. Lihat [Optimizing images](docs:assets.md#optimizing-images).

## Tempat sampah dan memulihkan

- **Membuang satu file**: buka file lalu klik ikon tempat sampah (**Move to trash**).
- **Membuang beberapa file**: centang kotak pada gambar mini lalu klik **Trash** diikuti jumlah file.
- **Memulihkan**: atur filter ke **Trashed only**, buka file, lalu klik **Restore**.
- **Menghapus selamanya**: buka file yang ada di tempat sampah lalu klik **Delete forever**.

> [!WARNING]
> **Delete forever** menghapus file beserta semua ukurannya secara permanen. File yang masih dipakai tidak dapat dihapus dengan cara ini; periksa **Used by** dan lepaskan file dari halaman-halaman tersebut terlebih dahulu.

## Memilih aset di field

Field yang menerima gambar atau file menampilkan tombol **Choose image** atau **Choose asset**.

1. Klik tombol tersebut. Jendela **Asset library** terbuka.
2. Pilih folder di bagian atas, atau gunakan **Search…**.
3. Klik sebuah file untuk memilihnya. Pada field yang mengizinkan beberapa file, klik file lain juga.
4. Klik **Select**.

Anda juga dapat mengeklik **Upload** di jendela tersebut untuk menambahkan file baru: file itu langsung terpilih, jadi Anda cukup mengeklik **Select**. Setelah dipilih, gunakan **Change** untuk memilih file lain, **Add more** untuk menambah file pada field multi-file, atau tombol **×** (**Remove**) untuk melepas file dari field. Melepas file dari field tidak menghapusnya dari pustaka.
