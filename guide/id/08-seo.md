# SEO: mesin pencari dan berbagi

{panel} mengurus sebagian besar kebutuhan mesin pencari: judul halaman, deskripsi, tautan antarbahasa, peta situs, dan pengalihan. Halaman ini menjelaskan apa yang bisa Anda atur sendiri.

## Pengaturan pencarian dan berbagi sebuah entri

Setiap entri memiliki kartu **SEO** di bawah field-nya, per bahasa. Kartu ini disimpan bersama draf dan tayang saat Anda menerbitkan.

| Field | Fungsinya |
| --- | --- |
| **Judul meta** | Judul di hasil pencarian dan tab peramban. Jika kosong, memakai **Judul** entri. Nama situs ditambahkan di belakangnya ("Tentang | Acme"), kecuali dimatikan. |
| **Deskripsi meta** | Satu atau dua kalimat yang tampil di bawah judul di hasil pencarian dan di tautan yang dibagikan. Tulislah untuk manusia: apa yang akan mereka temukan di halaman ini? |
| **Gambar Open Graph** | Gambar yang tampil saat halaman dibagikan di media sosial atau aplikasi obrolan. |
| **Sembunyikan dari mesin pencari (noindex)** | Meminta mesin pencari tidak mencantumkan halaman ini, dan mengeluarkannya dari peta situs. Pengunjung tetap bisa membukanya. |
| **URL kanonis** | Hanya untuk halaman yang menyalin halaman lain: alamat lengkap halaman tersebut. Hampir selalu dibiarkan kosong. |

Field yang kosong bisa diisi dari field entri itu sendiri, jika pengelola situs mengaturnya di halaman **SEO** (**Field yang dipakai untuk SEO**: ringkasan sebagai deskripsi, gambar utama sebagai gambar berbagi). Jika tidak, pengaturan bawaan situs yang dipakai.

> [!TIP]
> Usahakan judul SEO di bawah sekitar 60 karakter dan deskripsi di bawah sekitar 155 karakter, agar tidak terpotong oleh mesin pencari.

## Halaman term dan halaman daftar

Halaman sebuah term dan halaman daftar sebuah koleksi memiliki kartu **SEO** yang sama: di penyunting term (dari daftar term) dan di halaman daftar (lewat **Halaman daftar** di atas daftar entri). Keduanya langsung tayang saat disimpan.

## Pengaturan bawaan situs

**Pengaturan → Situs** menyimpan **Nama situs** dan **Deskripsi**, dipakai oleh halaman yang tidak punya sendiri. Judul beranda adalah nama situs. Lihat [Pengaturan situs](guide:website/settings#situs).

Halaman **SEO** (di bawah Struktur pada sidebar) menyimpan sisanya, di **Mesin pencari dan berbagi**: **Gambar berbagi bawaan**, apakah nama situs ditambahkan ke judul (**Tambahkan nama situs ke judul halaman**) beserta **Pemisah** di antaranya (tanda `|` dalam "Tentang | Acme"), dan **Akun X (Twitter)** situs. Di bawahnya, **Field yang dipakai untuk SEO** menentukan, untuk tiap koleksi dan taksonomi, field mana yang mengisi judul meta, deskripsi meta, atau gambar berbagi yang kosong.

**Sembunyikan seluruh situs dari mesin pencari** (di halaman yang sama) untuk salinan situs yang belum publik (situs *staging*). Pengaturan ini menyembunyikan semua halaman dan mengosongkan peta situs. Pastikan mati di situs yang sebenarnya.

**Structured data** (di Pengaturan → Situs) menjelaskan halaman Anda kepada mesin pencari dalam bentuk yang langsung mereka pahami: organisasi atau nama Anda, logo, artikel, dan jejak halaman. Biarkan menyala kecuali developer menyarankan lain.

## Gambar

Beri setiap gambar yang bermakna **Teks alternatif** di [pustaka media](guide:panel/media): mesin pencari membacanya, begitu juga orang yang tidak bisa melihat gambar.

## Alamat dan pengalihan

Saat Anda menerbitkan entri dengan slug baru, alamat lamanya tetap berfungsi: {panel} otomatis menambahkan pengalihan dari alamat lama ke yang baru, sehingga tautan dan hasil pencarian tidak rusak. **Struktur → Pengalihan** menampilkannya, dan pengelola situs bisa menambahkan sendiri: **Dari** alamat di situs, **Ke** alamat di situs atau alamat web, permanen (301) atau sementara (302).

## Peta situs

Situs web memiliki peta situs di `/sitemap.xml`, yang dibaca mesin pencari untuk menemukan semua halaman. Peta ini diperbarui otomatis dengan setiap entri yang tayang, halaman term, dan halaman daftar, kecuali yang disembunyikan dari mesin pencari. Anda tidak perlu melakukan apa pun, meskipun developer mungkin memberi tahu mesin pencari letaknya.

> [!TECHNICAL]
> Layout mencetak tag-nya dengan `<x-sunrice-cms::seo />`. Lihat [The site: SEO](docs:cms/site#seo).
