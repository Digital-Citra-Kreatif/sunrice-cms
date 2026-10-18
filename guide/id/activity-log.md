# Log aktivitas

Log aktivitas adalah catatan tentang siapa membuat, mengubah, atau menghapus apa di admin, dan kapan. Gunakan untuk mencari tahu siapa yang mengedit sebuah halaman, memeriksa apa yang berubah minggu lalu, atau meninjau apa yang dilakukan agen AI. Buka melalui **Manage → Activity log**.

Anda memerlukan izin **View the activity log** untuk melihatnya. Administrator dan super admin memilikinya.

## Apa saja yang dicatat

Log menyimpan satu baris untuk setiap perubahan pada:

- **Konten**: entri (dibuat, diubah, diterbitkan, dibatalkan terbitnya, dibuang ke tempat sampah, dipulihkan, dihapus), term, menu dan itemnya, globals, file media dan foldernya, formulir, serta kiriman formulir yang dihapus.
- **Struktur**: koleksi, taksonomi, blueprint, dan fieldset.
- **Orang**: pengguna dan perannya, peran dan izinnya, serta token akses AI.
- **Pengaturan**: pengaturan situs dan beranda.
- **Pengurutan ulang**: satu baris setiap kali seseorang mengubah urutan entri, term, item menu, atau koleksi.

Beberapa hal tidak dicatat:

- Tindakan pengunjung, seperti mengirim formulir atau berkomentar di situs.
- Preferensi tabel masing-masing orang, seperti kolom yang ditampilkan.
- **Nilai** lama dan baru. Log mencatat *field mana* yang berubah, bukan isinya. Untuk melihat atau memulihkan konten sebelumnya, gunakan revisi entri (lihat [Entri](entries.md)).

## Membaca sebuah baris

Perubahan terbaru ada di paling atas. Setiap baris memiliki kolom berikut:

| Kolom | Isinya |
| --- | --- |
| **Date** | Kapan perubahan terjadi. |
| **User** | Siapa yang melakukannya. Perubahan dari server sendiri tertulis **System**. |
| **Source** | Dari mana perubahan berasal (lihat di bawah). |
| **Action** | Apa yang dilakukan, seperti created, updated, published, atau deleted. |
| **Activity** | Kalimat tentang perubahan, misalnya Updated entry “About us (Pages)”. |
| **Details** | Field mana yang berubah. |

Di **Details**, field yang diterjemahkan menampilkan bahasanya, seperti `title (en)`, dan `draft` berarti perubahan disimpan sebagai draf dan belum tayang. Contohnya, `title (en, draft)` berarti judul bahasa Inggris diubah dalam draf.

> [!NOTE]
> Beberapa perubahan yang disimpan bersamaan menjadi satu baris. Menyimpan entri beserta terjemahannya sekaligus menghasilkan satu baris "updated".

Nama pengguna disimpan sebagaimana adanya saat itu, sehingga baris tetap terbaca walaupun pengguna tersebut kemudian dihapus.

> [!TIP]
> Gunakan **Columns** di kanan atas tabel untuk menyembunyikan kolom yang tidak Anda perlukan.

### Asal perubahan

Kolom **Source** memiliki tiga nilai:

- **Admin**: seseorang yang bekerja di admin.
- **AI agent**: agen AI yang terhubung melalui [Akses AI](ai-access.md). Nama token aksesnya ditampilkan di belakang, misalnya `AI agent · Claude Desktop`. **User** adalah pemilik token tersebut.
- **System**: tugas yang dijalankan di server, seperti impor atau terjemahan otomatis.

## Menyaring

Di atas tabel terdapat kotak pencarian dan filter. Gabungkan keduanya untuk mempersempit daftar:

- **Period**: **Last 24 hours**, **Last 7 days**, **Last 30 days**, atau **Last 90 days**.
- **Source**: **Admin**, **AI agent**, atau **System**.
- **Action**: misalnya hanya "deleted".
- **Type**: jenis hal yang berubah, seperti entry, term, atau setting.
- **User**: satu orang, atau **System**.

Kotak pencarian (**Search by name, user or token…**) mencari baris berdasarkan nama hal yang berubah, nama pengguna, atau nama token akses AI. Pilih **All** pada sebuah filter untuk menghapusnya.

### Meninjau pekerjaan agen AI

1. Atur **Source** ke **AI agent**.
2. Jika perlu, ketik nama token di kotak pencarian untuk melihat satu agen saja.
3. Jika perlu, atur **Period**, misalnya **Last 7 days**.

> [!TIP]
> Untuk menjawab "siapa yang menghapus halaman ini?", cari judul halaman itu dan atur **Action** ke deleted atau trashed.

## Memangkas baris lama

Log bertambah setiap kali ada penyimpanan. Anda dapat menghapus baris lama agar log tetap ringkas. Ini memerlukan izin **Delete old activity log entries**.

1. Klik **Prune** di bagian atas halaman.
2. Di **Older than (days)**, isi batas usia dalam hari. Nilai yang disarankan biasanya 180.
3. Klik **Delete old entries**.

Sebuah pesan memberi tahu berapa baris yang dihapus, dan pemangkasan itu sendiri dicatat sebagai baris baru, "Pruned activity log".

> [!WARNING]
> Baris yang dipangkas hilang selamanya. Jika organisasi Anda wajib menyimpan riwayat selama jangka waktu tertentu, periksa terlebih dahulu sebelum memangkas.

> [!TECHNICAL]
> Developer dapat memangkas dari server dengan `php artisan sunrice:prune-activity` (`--days=30` untuk usia lain), atau menjadwalkannya setiap hari di `routes/console.php`. Usia bawaan diatur oleh `sunrice.activity.prune_days` (180), dan `SUNRICE_ACTIVITY_LOG=false` di `.env` menghentikan pencatatan sama sekali. Lihat [Keeping it small](docs:activity-log.md#keeping-it-small) dan [Turning it off, and imports](docs:activity-log.md#turning-it-off-and-imports).

## Siapa yang dapat melihat log

| Izin | Memungkinkan |
| --- | --- |
| **View the activity log** | Membuka log. |
| **Delete old activity log entries** | Memakai **Prune**. |

Berikan izin ini kepada peran lain di **Manage → Roles**; lihat [Pengguna dan peran](users-roles.md). Agen AI yang penggunanya memiliki **View the activity log** juga dapat membaca log, misalnya untuk menjawab "apa saja yang berubah minggu ini?".
