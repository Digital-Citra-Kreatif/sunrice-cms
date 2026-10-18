# Tampilan

Halaman ini menjelaskan bagaimana tampilan situs publik Anda tersusun, apa yang dapat Anda ubah sendiri di admin, dan apa yang memerlukan developer. Singkatnya: **Anda mengatur konten, developer mengatur desain.**

## Cara kerja tampilan situs

Setiap halaman situs dibangun dari dua hal:

- **Konten**, yang Anda kelola di admin: entri, field-nya, gambar, menu, dan globals.
- **Template**, yang menentukan cara konten itu ditampilkan: tata letak, warna, huruf, letak menu, dan bentuk daftar artikel.

Saat pengunjung membuka sebuah halaman, situs mengambil konten entri lalu menuangkannya ke template yang sesuai. Template "Artikel" yang sama, misalnya, menampilkan semua artikel, masing-masing dengan judul, teks, dan gambarnya sendiri. Ubah teks sebuah artikel, maka hanya artikel itu yang berubah; ubah templatenya, maka semua artikel ikut berubah tampilannya.

> [!TECHNICAL]
> Template adalah view Blade di `resources/views/sunrice/`, sedangkan CSS dan JavaScript tema berada di `public/sunrice-theme/`. Template sebuah halaman dicari dengan urutan tetap: template milik entri itu sendiri, lalu milik koleksi, lalu `sunrice.{collection}.show`, `sunrice.show`, dan akhirnya template bawaan. Lihat [Resolution order](docs:templates.md#resolution-order).

## Yang dapat Anda ubah di admin

| Anda ingin… | Tempatnya |
| --- | --- |
| Mengubah teks, gambar, dan konten lain di sebuah halaman | Entrinya, di bawah **Content**. Lihat [Entri](entries.md). |
| Mengubah tautan di menu header atau footer | **Structure → Menus**. Lihat [Menu](menus.md). |
| Mengubah konten yang berlaku di seluruh situs, seperti detail kontak, teks footer, atau tautan media sosial | **Structure → Globals**. Lihat [Globals](globals.md). |
| Mengunggah atau mengganti gambar | **Manage → Assets**. Lihat [Media](media.md). |
| Memilih halaman yang menjadi beranda | **Manage → Settings**, **Homepage**. Lihat [Pengaturan](settings.md#umum). |
| Mengubah nama situs, bahasa, dan nama bahasa | **Manage → Settings**. Lihat [Pengaturan](settings.md). |
| Menambahkan kode analitik atau pelacakan | **Manage → Settings**, **Code snippets**. |

Field yang Anda lihat saat mengedit entri, seperti "Hero image" atau "Summary", disiapkan khusus untuk situs Anda. Template membaca field-field ini, jadi mengisinya adalah cara Anda membentuk setiap halaman. Field yang terdiri dari **blok** (misalnya blok hero, teks, galeri, atau formulir) memungkinkan Anda menyusun halaman dari potongan-potongan dalam urutan yang Anda pilih, sementara tampilan setiap blok tetap seragam.

> [!NOTE]
> Field opsional yang dibiarkan kosong biasanya berarti bagian itu tidak muncul di halaman. Itu wajar dan bukan kesalahan.

> [!NOTE]
> **Branding** di Settings hanya mengubah tampilan **admin**, bukan situs publik Anda.

## Yang memerlukan developer

Mintalah developer, atau orang yang terbiasa mengedit kode, untuk:

- Mengubah tata letak, warna, huruf, atau jarak pada situs publik.
- Memindahkan letak menu, kotak pencarian, atau pemilih bahasa.
- Menambahkan jenis halaman baru atau jenis blok baru.
- Menambahkan field baru ke blueprint sebuah koleksi, agar editor mendapat isian baru. Orang yang memiliki akses ke **Manage → Blueprints** juga dapat melakukannya (lihat [Struktur](structure.md)), tetapi template kemudian perlu diperbarui agar field baru itu tampil.

> [!TECHNICAL]
> Gaya tampilan ada di `public/sunrice-theme/app.css` (CSS biasa; dapat diganti dengan hasil build Vite atau Tailwind). Blok ditampilkan oleh `resources/views/sunrice/blocks/{handle}.blade.php`, satu file per handle fieldset. Lihat [Templates](docs:templates.md) dan [Blade components](docs:blade-components.md).

### Memilih template untuk satu halaman

Beberapa entri memerlukan desain khusus, misalnya halaman landing. Jika developer telah membuat template tambahan untuk itu, buka entrinya dan ketik nama template tersebut di kartu **Template** pada panel samping. Biarkan kosong untuk memakai template biasa dari koleksinya. Kartu ini menunjukkan file mana yang dipakai bila kosong.

Koleksi dan taksonomi memiliki pilihan yang sama untuk semua halamannya (**Entry template**, **Archive/listing template**, dan **Term page template** di **Manage → Collections** dan **Manage → Taxonomies**), yang biasanya diatur oleh developer.

> [!WARNING]
> Ketik hanya nama template yang diberikan developer Anda, lalu periksa halamannya dengan **View draft**. Nama yang salah ketik dapat membuat halaman tidak tampil dengan benar.

## Mempratinjau perubahan

Sebelum menerbitkan, periksa bagaimana halaman akan terlihat:

1. Buka entrinya dan simpan perubahan Anda.
2. Klik **View draft** di bagian atas editor. Halaman terbuka di tab baru dengan spanduk "Draft". Hanya orang yang sedang login dan berizin melihat entri yang belum terbit yang dapat membukanya.
3. Jika sudah puas, klik **Publish**.

Setelah entri terbit, tombol tersebut bertuliskan **View page** dan membuka halaman publiknya.

> [!TIP]
> Periksa juga pratinjaunya di ponsel. Sebagian besar template menata ulang halaman pada layar kecil, misalnya dengan melipat menu menjadi tombol **Menu**.

## Template awal

Situs baru biasanya dimulai dengan **template awal** (starter templates) dari Sunrice: desain sederhana siap pakai yang langsung berfungsi. Isinya mencakup header dengan menu utama, kotak pencarian, dan pemilih bahasa; footer; halaman untuk entri tunggal, daftar entri, dan kategori; halaman pencarian; serta halaman "tidak ditemukan" dan halaman galat.

Template ini dimaksudkan sebagai titik awal. Developer biasanya menyesuaikannya, atau menggantinya dengan desain Anda sendiri. Selama menu, global, atau field yang diharapkan belum ada, bagian itu cukup tidak menampilkan apa-apa, sehingga situs baru tidak pernah rusak.

> [!TECHNICAL]
> Terbitkan template awal dengan `php artisan vendor:publish --tag=sunrice-templates`. Header membaca menu dengan handle `main` dan global `site`. Setiap file diawali komentar yang mencantumkan handle field yang diharapkan. Agen AI dengan akses template juga dapat membaca dan mengeditnya; lihat [Akses AI](ai-access.md) dan [Starter templates](docs:templates.md#starter-templates).
