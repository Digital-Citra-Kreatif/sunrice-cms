# Menu

**Menu** adalah navigasi situs web: menu utama di atas, tautan di kaki halaman, menu di samping. Pengelola situs membuat menunya; editor mengisinya di **Menus** di bawah Content.

> Menu menautkan entri yang sudah ada, jadi buat halamannya dulu (lihat [Entri](guide:website/entries)), baru menunya; tautan ke alamat web bisa ditambahkan kapan saja.

## Menyunting menu

Klik sebuah menu untuk membukanya. Tautannya tercantum berurutan, menjorok untuk menunjukkan mana yang berada di bawah mana.

### Menambahkan tautan

Tombol di atas daftar menambahkan tautan ke:

- **Entry**: halaman, artikel, atau entri lain. Label dan alamatnya mengikuti entri di setiap bahasa: ganti nama atau pindahkan entrinya, dan menu ikut menyesuaikan.
- **Term**: halaman sebuah term, misalnya kategori (jika taksonominya memiliki halaman term).
- **Listing**: halaman daftar sebuah koleksi, misalnya blog.
- **Link**: alamat web apa pun (`https://…`), alamat di situs ini (`/kontak`), email (`mailto:`), atau nomor telepon (`tel:`).

### Setiap tautan

- **Label**: teks yang tampil, per bahasa. Untuk entri, term, dan halaman daftar, label boleh kosong (judulnya yang dipakai); **Link** membutuhkan label dalam bahasa utama, dan bahasa lain memakainya jika belum punya label sendiri.
- **New tab**: membuka tautan di tab peramban baru. Gunakan untuk tautan ke situs web lain.
- Seret tautan lewat pegangannya untuk mengubah posisinya di antara tautan setingkat (atau dengan papan ketik: fokus ke pegangan, tekan Spasi, pindahkan dengan tombol panah, tekan Spasi lagi).
- **In a level** menempatkan tautan di bawah tautan di atasnya (sub-menu); **Out a level** mengembalikannya. Menu bisa sampai tiga tingkat.
- **Remove, with what's under it** menghapus tautan beserta sub-tautannya.

Tautan ke entri yang tidak tayang di situs (draf, terjadwal, di tempat sampah) ditandai **Not on the site**: tetap ada di menu, tetapi pengunjung tidak melihatnya sampai entri tayang.

### Menyimpan

Klik **Save**. Seluruh menu disimpan sekaligus, dan perubahan langsung tayang.

> [!NOTE]
> Alamat yang bisa menjalankan kode (misalnya `javascript:`) ditolak. Gunakan `https://`, alamat di situs, `mailto:`, atau `tel:`.

> [!TECHNICAL]
> Menu dibuat di Structure → Menu settings, dengan handle yang dipakai template: `Cms::menu('main')`. Lihat [Menus](docs:cms/menus).
