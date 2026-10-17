# Struktur: koleksi, blueprint, dan fieldset

Halaman ini ditujukan bagi pengelola situs yang menentukan jenis konten apa saja yang dimiliki situs dan kolom apa yang diisi editor. Anda menyiapkannya sekali lalu menyesuaikannya seiring pertumbuhan situs; editor kemudian bekerja di dalam struktur tersebut. Semuanya ada di sidebar pada grup **Manage**: **Collections**, **Blueprints**, **Fieldsets**, dan **Taxonomies**.

## Komponen dasar

- **Koleksi** (collection) adalah jenis konten, misalnya *Pages*, *Articles*, atau *Products*. Setiap entri termasuk dalam satu koleksi.
- **Blueprint** adalah daftar kolom yang dimiliki entri (atau term, atau global set): ringkasan, gambar, harga, galeri, dan sebagainya.
- **Fieldset** adalah kelompok kolom yang dapat dipakai ulang oleh beberapa blueprint, misalnya *Alamat* atau *Ajakan bertindak*.
- **Taksonomi** mengelompokkan entri berdasarkan topik; lihat [Taksonomi](taxonomies.md).
- **Halaman daftar** (listing page) adalah halaman ringkasan koleksi, misalnya `/blog`, yang menampilkan entri-entrinya.

Buat blueprint terlebih dahulu, lalu koleksi yang memakainya.

## Koleksi

Buka **Manage → Collections**. Daftar menampilkan **Title**, **Handle**, **Blueprint**, **Taxonomies**, dan jumlah **Entries** setiap koleksi. Klik **New collection** untuk membuat koleksi, atau klik judul untuk mengubahnya; klik **Save** setelah selesai.

### Basics (dasar)

- **Title**: nama di sidebar. Pada situs multibahasa, Anda dapat memberi judul untuk setiap bahasa.
- **Handle**: nama internal, terisi otomatis dari judul.
- **Sidebar icon**: ikon di samping nama koleksi di sidebar.
- **Blueprint**: kolom yang dimiliki entri-entrinya.
- **Taxonomies**: centang taksonomi yang dapat dipakai entrinya, lalu pilih **Many terms** (banyak term) atau **One term** (satu term) per entri.

### Order (urutan)

Pilih cara entri diurutkan di situs dan di admin: **Manual (drag and drop)**, **Published date**, **Created date**, **Last updated**, atau **Title**, beserta arahnya. Dengan **Manual**, editor menyeret entri untuk mengurutkannya di daftar entri.

### Pages & URLs (halaman dan alamat)

- **Translatable (entries can have a version in each language)**: entri dapat memiliki versi dalam setiap bahasa.
- **Each entry has its own page**: setiap entri memiliki halaman sendiri. Nonaktifkan untuk konten yang hanya tampil di dalam halaman lain, seperti anggota tim atau FAQ. Entri seperti itu tidak memiliki alamat, dan menu tidak dapat menautkannya.
- **Entry URL**: pola alamat. Biarkan kosong untuk `/handle/slug`, ketik awalan seperti `blog`, pola seperti `/berita/{slug}`, atau `/` untuk akar situs. Setiap koleksi memerlukan pola sendiri.
- **Hierarchical (entries can have a parent entry)**: entri mendapat pilihan **Parent** (induk), dan alamat entri anak diawali alamat induknya (`/tentang/tim`).
- **Allow comments**: pengunjung dapat mengomentari setiap entri; lihat [Komentar](comments.md).
- **Has an archive/listing page**: memberi koleksi halaman ringkasan, dengan **Archive/listing URL**, **Entries per page** (jumlah entri per halaman), dan **Archive/listing blueprint** opsional untuk kolom tambahan seperti gambar utama.

Kartu **SEO defaults** mengisi detail hasil pencarian yang dibiarkan kosong oleh entri; lihat [SEO](seo.md).

> [!TECHNICAL]
> **Entry template** dan **Archive/listing template** menentukan view Blade yang merender halaman (bawaan `sunrice.{handle}.show` / `sunrice.show` dan `sunrice.{handle}.index` / `sunrice.index`). URL juga dapat memuat entri terkait, misalnya `/projects/{project}/{slug}`. Jika dua pola dapat cocok dengan alamat yang sama, lihat [Which URL wins](docs:content-modeling.md#which-url-wins) dan [Parent pages](docs:content-modeling.md#parent-pages).

## Halaman daftar

Jika **Has an archive/listing page** aktif, daftar entri koleksi memiliki tombol **Archive/listing page**. Di sana Anda mengubah, per bahasa, **Heading & intro** (**Heading** dan **Intro**), kolom tambahan di **Content**, dan **SEO**, lalu klik **Save archive/listing page**. Tombol **View** membuka halamannya di situs.

## Blueprint

Buka **Manage → Blueprints**. Daftar menampilkan jumlah **Fields** (kolom) setiap blueprint dan **Used by** (dipakai oleh). Klik **New blueprint**, isi **Title**, tambahkan kolom, lalu klik **Save blueprint**.

### Menambahkan dan mengatur kolom

1. Buka **Add field** dan pilih jenisnya. Kolom baru muncul di bagian bawah.
2. Klik kolom untuk membukanya, lalu isi **Handle** (nama internal), **Label** (teks yang dilihat editor), dan **Instructions** (petunjuk di bawah kolom, opsional).
3. Centang **Required** jika entri tidak boleh disimpan tanpa kolom ini.
4. Gunakan sakelar **Translatable**: aktif berarti nilainya berbeda per bahasa ("differs per language"); nonaktif berarti satu nilai untuk semua bahasa ("shared by all languages"). Kolom teks dapat diterjemahkan secara bawaan; gambar, angka, dan toggle dipakai bersama. Pengaturan ini berlaku di mana pun blueprint dipakai.
5. Isi **Settings** untuk jenis kolom tersebut, jika ada.
6. Seret kolom melalui pegangannya untuk mengubah urutan; ikon tempat sampah menghapus kolom.

### Jenis kolom

- **text**, **textarea**, **rich text** (teks berformat dengan judul, tautan, daftar).
- **number** (angka), **toggle** (ya/tidak), **select** (daftar pilihan), **date** (tanggal, opsional dengan jam).
- **link** (ke entri atau alamat apa pun), **asset** (gambar dan file dari Assets), **entries** (tautan ke entri lain), **terms** (term dari satu taksonomi).
- **group** (beberapa kolom yang dikelompokkan), **repeater** (baris yang ditambahkan editor sesuai kebutuhan, misalnya jam buka), **flexible** (blok konten yang disusun bebas oleh editor; setiap jenis blok adalah sebuah fieldset).
- **fieldset** (memasukkan kolom-kolom sebuah fieldset di sini).
- **file** ditujukan untuk [formulir](forms.md).

## Fieldset

Buka **Manage → Fieldsets**, klik **New fieldset**, tambahkan kolom dengan cara yang sama seperti di blueprint, lalu klik **Save fieldset**. Setelah itu, masukkan ke blueprint dengan kolom **fieldset** (**Fieldset to include**), atau izinkan sebagai jenis blok di kolom **flexible**. Mengubah fieldset akan memperbarui semua blueprint yang memakainya.

## Taksonomi

Buka **Manage → Taxonomies**, lalu klik **New taxonomy**. Isi **Title**, **Blueprint** opsional untuk kolom tambahan pada term, **Hierarchical (terms have parents)** jika term dapat memiliki induk, dan centang **Collections** yang memakainya. Di kartu **Term pages**, centang **Term archive/listing pages** agar setiap term memiliki halaman, lengkap dengan **Term page URL** dan **Entries per page**. Klik **Save**.

## Mengubah struktur dengan aman

- **Menghapus kolom** menyembunyikan isinya, tetapi isinya tetap tersimpan di database. Tambahkan lagi kolom dengan handle yang sama untuk memunculkannya kembali.
- **Mengganti handle** koleksi, taksonomi, blueprint, fieldset, atau kolom dapat merusak template dan alamat; admin memperingatkan Anda sebelum menyimpan. Lakukan hanya bersama pengembang Anda.
- **Blueprint atau fieldset yang sedang dipakai** tidak dapat dihapus. Pindahkan pemakainya ke yang lain terlebih dahulu.
- **Menghapus koleksi atau taksonomi** menyembunyikan entri atau term-nya dari admin dan situs, tetapi tetap menyimpannya. Buat lagi dengan handle yang sama untuk mengembalikannya.
- **Mengubah Entry URL** mengubah alamat semua entri di koleksi tersebut, sehingga tautan dan hasil pencarian yang ada mungkin mengarah ke alamat lama.

> [!WARNING]
> Jika memungkinkan, cobalah perubahan struktur pada salinan situs terlebih dahulu.

> [!TECHNICAL]
> Memindahkan isi ke kolom yang diganti namanya: `php artisan sunrice:rename-field {blueprint} {from} {to}`. Menghapus permanen isi tersembunyi dari koleksi dan taksonomi yang dihapus: `php artisan sunrice:orphans --purge`. Lihat [Changing handles](docs:content-modeling.md#changing-handles), [Deleting collections and taxonomies](docs:content-modeling.md#deleting-collections-and-taxonomies), dan [Artisan commands](docs:commands.md#content).
