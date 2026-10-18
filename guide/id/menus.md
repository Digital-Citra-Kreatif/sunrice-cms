# Menu

Menu adalah daftar navigasi di situs Anda, misalnya menu utama di header atau daftar tautan di footer. Anda menyusunnya di admin dari tautan ke entri, halaman daftar, halaman term, atau alamat web apa pun, dan situs akan memperbaruinya sendiri ketika halaman diganti nama atau dipindahkan.

## Cara kerja menu

- Sebuah situs dapat memiliki beberapa menu. Setiap menu memiliki **Title** (judul, untuk Anda) dan **Handle**, yaitu nama yang dipakai desain situs untuk menemukannya (misalnya `main`).
- Menu berisi **item**. Setiap item menautkan ke sesuatu dan memiliki label.
- Item dapat memiliki **sub-item**, satu tingkat saja, yang biasanya tampil sebagai dropdown.
- Tautan ke entri dan term selalu mengikuti tujuannya: jika alamat entri berubah, tautan di menu ikut berubah. Item yang menunjuk ke sesuatu yang belum terbit atau sudah tidak ada tidak ditampilkan di situs.

Menu ada di sidebar pada **Structure → Menus**.

## Membuat menu

1. Buka **Structure → Menus**, lalu klik **New menu**.
2. Isi **Title**, misalnya *Navigasi utama*. **Handle** terisi otomatis; ubah hanya jika pengembang Anda meminta nama tertentu.
3. Klik **Create menu**. Menu terbuka dalam keadaan kosong, siap diisi item.

> [!TIP]
> Desain situs bawaan menampilkan menu dengan handle `main` di header. Buat menu dengan handle tersebut dan menu langsung muncul.

## Menambahkan item

1. Buka menu, lalu klik **Add item**.
2. Di kartu **Link**, pilih tujuan item pada **Links to**:
   - **Entry**: pilih halaman atau artikel. Hanya entri yang memiliki halaman sendiri yang dapat dipilih.
   - **Collection archive/listing page**: pilih koleksi untuk menautkan ke halaman daftarnya (misalnya halaman ringkasan blog). Jika koleksi tidak memiliki halaman daftar, muncul peringatan bahwa item akan tetap tersembunyi sampai halaman tersebut diaktifkan.
   - **Term page**: pilih taksonominya, lalu term-nya.
   - **URL**: ketik alamat apa pun, seperti `/tentang` atau `https://example.com`.
3. Centang **Open in a new tab** jika tautan perlu dibuka di tab browser baru (berguna untuk situs lain).
4. Di kartu **Label**, ketik teks yang dilihat pengunjung. Biarkan kosong untuk memakai judul halaman yang ditautkan.
5. Klik **Add item**.

## Menambahkan sub-item

1. Di menu, cari item tingkat atas yang akan menjadi induk sub-item.
2. Klik tombol **+** pada item tersebut (**Add sub-item**).
3. Isi tautan dan label seperti di atas, lalu klik **Add item**. Judul halaman menunjukkan "under" (di bawah) nama item induknya.

Sub-item tidak dapat memiliki sub-item lagi. Untuk memindahkan item ke induk lain, hapus item tersebut lalu tambahkan lagi di tempat yang benar.

## Mengubah, mengurutkan, dan menghapus item

- **Mengubah:** klik label item atau ikon pensilnya, ubah, lalu klik **Save**.
- **Mengurutkan:** gunakan panah atas dan bawah (**Move up**, **Move down**) untuk memindahkan item di antara item di sekitarnya. Sub-item berpindah di dalam induknya.
- **Menghapus:** klik ikon tempat sampah pada item (atau **Remove item** di editor item), lalu konfirmasi.

Setiap baris di menu menampilkan label, lencana jenis item, dan tujuannya. Jika entri atau term yang ditautkan sudah dihapus, baris tersebut bertuliskan **Missing target**: ubah atau hapus item itu.

> [!WARNING]
> Menghapus item tingkat atas juga menghapus semua sub-itemnya.

## Label dalam setiap bahasa

Pada situs multibahasa, kartu **Label** memiliki satu kotak untuk setiap bahasa.

- Ketik label di setiap bahasa yang ingin Anda atur sendiri.
- Kotak yang kosong memakai label bahasa utama, dan jika itu juga kosong, judul halaman yang ditautkan dalam bahasa pengunjung.

Jadi untuk tautan ke entri dan term, sering kali Anda cukup mengosongkan semua label dan membiarkan judul halaman yang sudah diterjemahkan bekerja. Item **URL** tidak memiliki judul halaman sebagai cadangan, jadi beri label.

## Menghapus menu

Di **Structure → Menus**, klik **Delete** di samping menu lalu konfirmasi. Semua itemnya ikut terhapus, dan tempat menu itu ditampilkan di situs menjadi kosong.

## Di mana menu tampil di situs

Letak dan tampilan setiap menu ditentukan oleh desain situs, bukan oleh menu itu sendiri. Dengan desain bawaan:

- menu `main` tampil di header, dengan sub-item sebagai dropdown di layar lebar;
- di layar kecil, menu dilipat menjadi tombol **Menu**.

Menu lain (misalnya menu footer) tampil di tempat yang ditentukan pengembang Anda. Tanyakan handle yang perlu dipakai.

> [!TECHNICAL]
> Template memuat menu berdasarkan handle dengan `sunrice_menu('main')` (atau `Sunrice::menu('main')`), yang menghasilkan URL item untuk bahasa yang aktif dan membuang tujuan yang belum terbit. File bawaan `partials/header.blade.php` dan `partials/menu.blade.php` menampilkan item bertingkat. Lihat [Content modeling](docs:content-modeling.md#menus) dan [Templates](docs:templates.md#header-and-mobile-menu).
