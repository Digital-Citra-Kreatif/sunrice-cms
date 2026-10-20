# SEO: mesin pencari dan berbagi

{panel} mengurus sebagian besar kebutuhan mesin pencari: judul halaman, deskripsi, tautan antarbahasa, peta situs, dan pengalihan. Halaman ini menjelaskan apa yang bisa Anda atur sendiri.

## Pengaturan pencarian dan berbagi sebuah entri

Setiap entri memiliki kartu **Search and sharing** di bawah field-nya, per bahasa. Kartu ini disimpan bersama draf dan tayang saat Anda menerbitkan.

| Field | Fungsinya |
| --- | --- |
| **SEO title** | Judul di hasil pencarian dan tab peramban. Kosong: judul entri. Nama situs ditambahkan di belakangnya ("Tentang | Acme"), kecuali dimatikan. |
| **Description** | Satu atau dua kalimat yang tampil di bawah judul di hasil pencarian dan di tautan yang dibagikan. Tulislah untuk manusia: apa yang akan mereka temukan di halaman ini? |
| **Share image** | Gambar yang tampil saat halaman dibagikan di media sosial atau aplikasi obrolan. |
| **Hide from search engines** | Meminta mesin pencari tidak mencantumkan halaman ini, dan mengeluarkannya dari peta situs. Pengunjung tetap bisa membukanya. |
| **Canonical address** | Hanya untuk halaman yang menyalin halaman lain: alamat lengkap halaman tersebut. Hampir selalu dibiarkan kosong. |

Field yang kosong bisa diisi dari field entri itu sendiri, jika pengelola situs mengaturnya untuk koleksi tersebut (*SEO from fields*: ringkasan sebagai deskripsi, gambar utama sebagai gambar berbagi). Jika tidak, pengaturan bawaan situs yang dipakai.

> [!TIP]
> Usahakan judul SEO di bawah sekitar 60 karakter dan deskripsi di bawah sekitar 155 karakter, agar tidak terpotong oleh mesin pencari.

## Halaman term dan halaman daftar

Halaman sebuah term dan halaman daftar sebuah koleksi memiliki kartu **Search and sharing** yang sama: di halaman term (dari daftar term) dan di halaman daftar (lewat **Listing page** di atas daftar entri). Keduanya langsung tayang saat disimpan.

## Pengaturan bawaan situs

**Settings → Site** menyimpan apa yang tidak diatur sendiri oleh halaman: **Site name** (nama situs), **Description**, **Share image**, **Title separator** (tanda `|` dalam "Tentang | Acme"), apakah nama situs ditambahkan ke judul (**Add the site name to titles**), dan akun **X (Twitter)** situs. Judul beranda adalah nama situs. Lihat [Pengaturan situs](guide:website/settings#site).

**Hide the whole site from search engines** untuk salinan situs yang belum publik (situs *staging*). Pengaturan ini menyembunyikan semua halaman dan mengosongkan peta situs. Pastikan mati di situs yang sebenarnya.

**Structured data** (di bagian yang sama) menjelaskan halaman Anda kepada mesin pencari dalam bentuk yang langsung mereka pahami: organisasi atau nama Anda, logo, artikel, dan jejak halaman. Biarkan menyala kecuali developer menyarankan lain.

## Gambar

Beri setiap gambar yang bermakna **Alternative text** di [pustaka media](guide:panel/media): mesin pencari membacanya, begitu juga orang yang tidak bisa melihat gambar.

## Alamat dan pengalihan

Saat Anda menerbitkan entri dengan slug baru, alamat lamanya tetap berfungsi: {panel} otomatis menambahkan pengalihan dari alamat lama ke yang baru, sehingga tautan dan hasil pencarian tidak rusak. **Structure → Redirects** menampilkannya, dan pengelola situs bisa menambahkan sendiri: **From** (dari) alamat di situs, **To** (ke) alamat di situs atau alamat web, permanen (301) atau sementara (302).

## Peta situs

Situs web memiliki peta situs di `/sitemap.xml`, yang dibaca mesin pencari untuk menemukan semua halaman. Peta ini diperbarui otomatis dengan setiap entri yang tayang, halaman term, dan halaman daftar, kecuali yang disembunyikan dari mesin pencari. Anda tidak perlu melakukan apa pun, meskipun developer mungkin memberi tahu mesin pencari letaknya.

> [!TECHNICAL]
> Layout mencetak tag-nya dengan `<x-sunrice-cms::seo />`. Lihat [The site: SEO](docs:cms/site#seo).
