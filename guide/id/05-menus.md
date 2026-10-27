# Menu

**Menu** adalah navigasi situs web: menu utama di atas, tautan di kaki halaman, menu di samping. Pengelola situs membuat menunya; editor mengisinya di **Menu** di bawah Konten.

Nama dan handle sebuah menu diubah di **Pengaturan** menu tersebut oleh mereka yang diizinkan (*Ubah pengaturan* di bawah Menu pada Peran): editor hanya mengubah tautannya, karena situs web menemukan setiap menu dari handle-nya.

> Menu menautkan entri yang sudah ada, jadi buat halamannya dulu (lihat [Entri](guide:website/entries)), baru menunya; tautan ke alamat web bisa ditambahkan kapan saja.

## Menyunting menu

Klik sebuah menu untuk membukanya. Tautannya tercantum berurutan, menjorok untuk menunjukkan mana yang berada di bawah mana.

### Menambahkan tautan

Tombol di atas daftar menambahkan tautan ke:

- **Entri**: halaman, artikel, atau entri lain. Label dan alamatnya mengikuti entri di setiap bahasa: ganti nama atau pindahkan entrinya, dan menu ikut menyesuaikan.
- **Term**: halaman sebuah term, misalnya kategori (jika taksonominya memiliki halaman term).
- **Halaman daftar**: halaman yang menampilkan entri sebuah koleksi, misalnya blog. **Filter** (opsional) mempersempitnya, seperti "Dijual" di halaman properti: bagian setelah `?` di alamat halaman itu saat Anda menyaringnya, misalnya `listing_type=for-sale`. Saring halamannya di situs web, lalu salin bagian alamat itu. Tautan memakai filter yang sama di setiap bahasa.
- **Indeks taksonomi**: halaman indeks sebuah taksonomi, halaman yang menampilkan term-nya, misalnya semua kategori (jika taksonominya memilikinya: yang bersama, atau milik sebuah koleksi).
- **Tautan**: alamat web apa pun (`https://…`), alamat di situs ini (`/kontak`), email (`mailto:`), atau nomor telepon (`tel:`).

### Setiap tautan

- **Label**: teks yang tampil, per bahasa. Untuk entri, term, dan halaman daftar, label boleh kosong (judulnya yang dipakai). Di bahasa lain yang belum punya label sendiri, item menampilkan judul tujuannya dalam bahasa itu jika ada, dan jika tidak, label bahasa utama. Halaman daftar dengan **Filter** menampilkan label bahasa utama, bukan judul daftarnya, jadi beri label di setiap bahasa. **Tautan** membutuhkan label dalam bahasa utama, dan bahasa lain memakainya jika belum punya label sendiri.
- **Tab baru**: membuka tautan di tab peramban baru. Gunakan untuk tautan ke situs web lain.
- **Ubah tujuan tautan** (ikon pensil) memperbaiki alamat tautan, atau mengarahkannya ke entri, term, halaman daftar, atau indeks taksonomi lain (dari jenis yang sama). Label, pengaturan tab baru, posisi, dan sub-tautannya tetap, jadi tidak perlu menghapus lalu menambahkannya lagi.
- Seret tautan lewat pegangannya untuk mengubah posisinya di antara tautan setingkat (atau dengan papan ketik: fokus ke pegangan, tekan Spasi, pindahkan dengan tombol panah, tekan Spasi lagi).
- **Masuk satu tingkat** menempatkan tautan di bawah tautan di atasnya (sub-menu); **Keluar satu tingkat** mengeluarkannya (beserta isinya) dari sub-menu, tepat setelah sub-menu itu; tautan lain tetap di tempatnya. Menu bisa sampai tiga tingkat.
- **Hapus, beserta yang ada di bawahnya** menghapus tautan beserta sub-tautannya.

Tautan ke entri yang tidak tayang di situs (draf, terjadwal, di tempat sampah) ditandai **Tidak ada di situs**: tetap ada di menu, tetapi pengunjung tidak melihatnya sampai entri tayang.

### Menyimpan

Klik **Simpan**. Seluruh menu disimpan sekaligus, dan perubahan langsung tayang.

Jika rekan menyimpan menu yang sama setelah Anda membukanya, menyimpan tidak mengembalikan tautan mereka: pilih **Muat versi mereka** (perubahan Anda yang belum disimpan dibuang) atau **Tetap simpan versi saya** (perubahan mereka diganti).

> [!NOTE]
> Alamat yang bisa menjalankan kode (misalnya `javascript:`) ditolak. Gunakan `https://`, alamat di situs, `mailto:`, atau `tel:`.

> [!TECHNICAL]
> Menu dibuat di Konten → Menu (**Tambah menu**), dengan handle yang dipakai template: `Cms::menu('main')`. Lihat [Menus](docs:cms/menus).
