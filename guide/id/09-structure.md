# Struktur

**Structure** adalah tempat pengelola situs menentukan konten apa yang dimiliki situs web dan bagaimana susunannya. Editor jarang memerlukannya. Perubahan di sini memengaruhi pekerjaan semua orang, jadi rencanakan bersama tim, dan bersama developer jika perubahan itu membutuhkan desain baru (template).

## Koleksi

**Koleksi** adalah jenis konten: *Pages*, *Blog*, *Produk*, *Acara*. **Structure → Collections** menampilkannya; **New collection** menambah yang baru.

| Pengaturan | |
| --- | --- |
| **Title** | Nama yang dilihat editor. |
| **Handle** | Kode pendek yang dipakai template, seperti `articles`: huruf kecil, angka, dan garis bawah. Bisa diubah nanti: peran tetap memegang izinnya, tetapi formulir memperingatkan tentang template dan kode yang menyebutnya, yang harus diperbarui developer. |
| **Blueprint** | Field yang dimiliki entrinya (lihat di bawah). Menggantinya tetap mempertahankan isi entri yang sudah ada. |
| **Other blueprints** | Blueprint lain yang bisa dipilih sebuah entri, di Page settings-nya (misalnya halaman promosi di antara halaman biasa). |
| **Dated entries** | Entri menampilkan tanggal dan terurut dari yang terbaru, seperti artikel. |
| **Manual order** | Editor mengurutkan entri sendiri (**Reorder** di daftar), bukan menurut tanggal atau judul. |
| **Hierarchical** | Entri bisa berada di bawah entri induk, seperti halaman di bawah halaman (untuk jejak halaman dan sub-menu; alamatnya tetap). |
| **URL** | Letak entri di situs web, dengan `{slug}` untuk slug setiap entri: `/blog/{slug}`, atau `/{slug}` untuk halaman di tingkat teratas. Kosong: entri tidak punya halaman sendiri. |
| **Template** | Desain yang dipakai entri, jika developer membuatnya. |
| **Listing page URL**, **Listing page fields**, **Entries per listing page** | Halaman yang menampilkan daftar entri (seperti `/blog`), field khususnya (pengantar), dan jumlah entri per halaman. |
| **Allow comments** | Pengunjung boleh mengomentari entrinya (membutuhkan URL). |
| **Structured data type** | Jenis entri yang diberitahukan ke mesin pencari (artikel, halaman web, listing properti, atau orang, tempat, atau produk yang dibahas halaman…). |
| **SEO from fields** | Field entri mana yang mengisi judul SEO, deskripsi, dan gambar berbagi yang kosong. |

Menghapus koleksi tidak menghapus entrinya: entri hilang dari panel dan situs web. Filter **Deleted** di daftar menampilkan koleksi yang dihapus, dengan **Restore** untuk mengembalikannya.

Setiap koleksi mendapat izinnya sendiri (melihat, membuat, menyunting, menerbitkan, menghapus, dan mengekspor entrinya), sehingga sebuah peran bisa dibatasi hanya ke *Blog*, misalnya. Lihat [Pengguna dan peran](guide:panel/users-roles).

## Blueprint dan fieldset

**Blueprint** adalah daftar field: apa yang diisi editor untuk entri sebuah koleksi, term sebuah taksonomi, global set, atau formulir. **Fieldset** adalah sekelompok field yang dipakai di beberapa blueprint (alamat, ajakan bertindak). Sunting di **Structure → Blueprints** dan **Fieldsets**.

Untuk menambah field, pilih jenisnya, lalu atur:

- **Label**: yang dilihat editor. **Handle** (cara template membaca field) dibuat dari label; mengganti handle nanti menyembunyikan nilai yang tersimpan dengan handle lama, jadi mintalah developer untuk mengganti nama field dengan aman. Field di tingkat teratas blueprint tidak bisa memakai handle yang dipakai konten itu sendiri, dan builder langsung memberi tahu saat Anda mengetik: `id`, `title`, `slug`, `url`, `status`, `locale`, `published_at`, `created_at`, `updated_at`, `parent`, `children`, `collection`, `blueprint`, `data`, `seo`, `author`.
- **Instructions**: petunjuk yang tampil di bawah field.
- **Required**: entri tidak bisa disimpan atau diterbitkan tanpanya.
- **Per language**: **Yes, translated** (setiap bahasa punya isinya sendiri), **No, shared** (satu nilai untuk semua bahasa), atau **As the type decides** (teks diterjemahkan; angka, tanggal, saklar, dan media dipakai bersama).
- **Extra rules**: pemeriksaan untuk developer, satu per baris (misalnya `email`).
- Pengaturan khusus tiap jenis: pilihan sebuah select, koleksi yang ditautkan field entries, jenis berkas yang diterima field media, jumlah maksimal…

Jenis-jenisnya: **Text**, **Textarea**, **Rich text**, **Number**, **Toggle**, **Select**, **Date**, **Link**, **Media**, **Entries**, **Terms**, **Group** (beberapa field bersama), **Repeater** (baris berisi field), **Flexible content** (blok berbagai jenis), **Fieldset** (menyertakan fieldset: field-nya ditambahkan di tempatnya dengan handle masing-masing; agar tetap di bawah satu nama, taruh di dalam **Group**), dan **File (forms)** (berkas yang dikirim pengunjung lewat formulir: satu, atau beberapa dengan **Several files**).

Seret field ke urutannya lewat pegangannya (field di dalam group atau repeater di antara sesamanya), lalu klik **Save** (atau **Create blueprint** untuk yang baru). Blueprint yang masih dipakai tidak bisa dihapus. Begitu blueprint dipakai untuk entri atau term, global set, atau formulir, pilihan blueprint untuk jenis lain tidak lagi menawarkannya.

## Taksonomi

**Structure → Taxonomies**: **Title**, **Handle** (bisa diubah nanti, seperti pada koleksi), **Nested terms** (term di bawah term lain, seperti subkategori), **Collections** yang entrinya dikelompokkan, **Term pages URL** (seperti `/topik/{slug}`; kosong: term tidak punya halaman), **Term fields** (blueprint untuk field term), **Template**, dan **SEO from fields**. Editor lalu menambahkan term di Content → Terms (lihat [Term](guide:website/terms)). Agar editor bisa memberi term pada entri, tambahkan field **Terms** ke blueprint koleksinya: itu sudah cukup agar daftar entri bisa disaring menurut taksonomi tersebut, tanpa mencentang koleksinya di sini.

## Global set

**Structure → Global sets**: **Title**, **Handle**, dan **Blueprint** untuk field set tersebut. Editor mengisinya di Content → Globals (lihat [Global](guide:website/globals)).

## Menu

**Structure → Menu settings**: **Title** dan **Handle** (seperti `main` atau `footer`) yang dipakai template. Editor mengisinya di Content → Menus (lihat [Menu](guide:website/menus)).

## Formulir

**Structure → Forms**: **Title**, **Handle** (bisa diubah nanti, seperti pada koleksi), **Blueprint** berisi field formulir (pengunjung mendapat field text, textarea, number, toggle, select, date, dan file), serta:

- **Email to**: alamat yang menerima setiap kiriman, satu per baris; **Also email roles**: semua orang dengan peran ini juga.
- **Thank-you message**: tampil setelah mengirim; atau **After sending, go to** halaman pilihan Anda.
- **Sends per visitor a minute** dan **Require a captcha**, untuk mencegah spam.

Developer lalu memasang formulir di sebuah halaman. Isian pengunjung masuk ke Content → Submissions (lihat [Kiriman formulir](guide:website/submissions)).

## Pengalihan

**Structure → Redirects** menampilkan pengalihan yang dibuat saat alamat entri berubah, dan menerima pengalihan Anda sendiri: **From** alamat di situs (diawali `/`), **To** alamat di situs atau alamat web, **Moved for good (301)** (permanen) atau **For now (302)** (sementara). Halaman yang tayang selalu menang atas pengalihan dari alamatnya.

> [!TECHNICAL]
> Struktur bisa diekspor dan diimpor antarsitus (`sunrice:export-structure`, `sunrice:import-structure`), dan field bisa diganti namanya dengan aman (`sunrice:rename-field`). Lihat [Structure tools](docs:cms/structure) dan [Fields](docs:cms/fields).
