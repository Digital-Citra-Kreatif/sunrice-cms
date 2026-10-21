# Struktur

**Struktur** adalah tempat pengelola situs menentukan konten apa yang dimiliki situs web dan bagaimana susunannya. Editor jarang memerlukannya. Perubahan di sini memengaruhi pekerjaan semua orang, jadi rencanakan bersama tim, dan bersama developer jika perubahan itu membutuhkan desain baru (template).

## Koleksi

**Koleksi** adalah jenis konten: *Pages*, *Blog*, *Produk*, *Acara*. **Struktur → Koleksi** menampilkannya; **Tambah koleksi** membuat yang baru.

| Pengaturan | |
| --- | --- |
| **Judul** | Nama yang dilihat editor. |
| **Handle** | Kode pendek yang dipakai template, seperti `articles`: huruf kecil, angka, dan garis bawah. Bisa diubah nanti: peran tetap memegang izinnya, tetapi formulir memperingatkan tentang template dan kode yang menyebutnya, yang harus diperbarui developer. |
| **Blueprint** | Field yang dimiliki entrinya (lihat di bawah). Menggantinya tetap mempertahankan isi entri yang sudah ada. |
| **Blueprint lain** | Blueprint lain yang bisa dipilih sebuah entri, di Pengaturan halaman entri itu (misalnya halaman promosi di antara halaman biasa). |
| **Bisa diterjemahkan** | Entri bisa punya versi di setiap bahasa. Mati: hanya dalam bahasa utama (berguna untuk konten yang tidak berbeda per bahasa). |
| **Entri bertanggal** | Entri menampilkan tanggal dan terurut dari yang terbaru, seperti artikel. |
| **Urutan manual** | Editor mengurutkan entri sendiri (**Urutkan** di daftar), bukan menurut tanggal atau judul. |
| **Hierarkis** | Entri bisa berada di bawah entri induk, seperti halaman di bawah halaman (untuk jejak halaman dan sub-menu; alamatnya tetap). |
| **Setiap entri punya halaman sendiri** | Mati: entri tidak punya alamat, seperti FAQ atau anggota tim yang ditampilkan template. |
| **URL entri** | Letak entri di situs web, dengan `{slug}` untuk slug setiap entri: `/blog/{slug}`, atau `/{slug}` untuk halaman di tingkat teratas. Kosong: `/{handle}/{slug}`. |
| **Template entri** | Desain yang dipakai entri, jika developer membuatnya. |
| **Punya halaman daftar**, **URL halaman daftar**, **Field halaman daftar**, **Entri per halaman** | Halaman yang menampilkan daftar entri (seperti `/blog`; kosong: `/{handle}`), field khususnya (pengantar), dan jumlah entri per halaman. |
| **Izinkan komentar** | Pengunjung boleh mengomentari entrinya (membutuhkan URL). |
| **Jenis structured data** | Jenis entri yang diberitahukan ke mesin pencari (artikel, halaman web…). |

Menghapus koleksi tidak menghapus entrinya: entri hilang dari panel dan situs web. Tombol **Tempat sampah** di daftar menampilkan koleksi yang dihapus, dengan **Pulihkan** untuk mengembalikannya.

Setiap koleksi mendapat izinnya sendiri (melihat, membuat, menyunting, menerbitkan, menghapus, dan mengekspor entrinya), sehingga sebuah peran bisa dibatasi hanya ke *Blog*, misalnya. Lihat [Pengguna dan peran](guide:panel/users-roles).

## Blueprint dan fieldset

**Blueprint** adalah daftar field: apa yang diisi editor untuk entri sebuah koleksi, term sebuah taksonomi, set global, atau formulir. **Fieldset** adalah sekelompok field yang dipakai di beberapa blueprint (alamat, ajakan bertindak). Sunting di **Struktur → Blueprint** dan **Fieldset**.

Untuk menambah field, pilih jenisnya, lalu atur:

- **Label**: yang dilihat editor. **Handle** (cara template membaca field) dibuat dari label; mengganti handle nanti menyembunyikan nilai yang tersimpan dengan handle lama, jadi mintalah developer untuk mengganti nama field dengan aman.
- **Petunjuk**: teks yang tampil di bawah field.
- **Wajib**: entri tidak bisa disimpan atau diterbitkan tanpanya.
- **Per bahasa**: **Ya, diterjemahkan** (setiap bahasa punya isinya sendiri), **Tidak, dipakai bersama** (satu nilai untuk semua bahasa), atau **Sesuai tipenya** (teks diterjemahkan; angka, tanggal, saklar, dan media dipakai bersama).
- **Aturan tambahan**: pemeriksaan untuk developer, satu per baris (misalnya `email`).
- Pengaturan khusus tiap jenis: opsi sebuah field pilihan, koleksi yang ditautkan field entri, jenis berkas yang diterima field media, jumlah maksimal…

Jenis-jenisnya: **Teks**, **Textarea**, **Teks kaya**, **Angka**, **Toggle**, **Pilihan**, **Tanggal**, **Tautan**, **Media**, **Entri**, **Term**, **Grup** (beberapa field bersama), **Repeater** (baris berisi field), **Konten fleksibel** (blok berbagai jenis), **Fieldset** (menyertakan fieldset), dan **File (formulir)** (berkas yang dikirim pengunjung lewat formulir).

Seret field ke urutannya lewat pegangannya (field di dalam grup atau repeater di antara sesamanya), lalu klik **Simpan** (atau **Buat blueprint** untuk yang baru). Blueprint yang masih dipakai tidak bisa dihapus.

## Taksonomi

**Struktur → Taksonomi**: **Judul**, **Handle** (bisa diubah nanti, seperti pada koleksi), **Term bertingkat** (term di bawah term lain, seperti subkategori), **Koleksi** yang entrinya dikelompokkan, **URL halaman term** (seperti `/topik/{slug}`; kosong: term tidak punya halaman), **Field term** (blueprint untuk field term), dan **Template halaman term**. Editor lalu menambahkan term di bagian Taksonomi pada sidebar (lihat [Term](guide:website/terms)). Agar editor bisa memberi term pada entri, tambahkan field **Term** ke blueprint koleksinya.

## Set global

**Konten → Global → Tambah set global**: **Judul**, **Handle**, dan **Blueprint** untuk field set tersebut (nanti, lewat **Pengaturan** set itu). Membuka sebuah set menampilkan isinya (lihat [Global](guide:website/globals)).

## Menu

**Konten → Menu → Tambah menu**: **Judul** dan **Handle** (seperti `main` atau `footer`) yang dipakai template (nanti, lewat **Pengaturan** menu itu). Membuka sebuah menu menampilkan tautannya (lihat [Menu](guide:website/menus)).

## Formulir

**Struktur → Formulir**: **Judul**, **Handle** (bisa diubah nanti, seperti pada koleksi), **Blueprint** berisi field formulir (pengunjung mendapat field teks, textarea, angka, toggle, pilihan, tanggal, dan file), serta:

- **Email ke**: alamat yang menerima setiap kiriman, satu per baris; **Email juga ke peran**: semua orang dengan peran ini juga.
- **Pesan terima kasih**: tampil setelah mengirim; atau **Lalu buka** halaman pilihan Anda.
- **Kiriman per pengunjung per menit** dan **Wajibkan captcha**, untuk mencegah spam.

Developer lalu memasang formulir di sebuah halaman. Isian pengunjung masuk ke Konten → Kiriman (lihat [Kiriman formulir](guide:website/submissions)).

## Pengalihan

**Struktur → Pengalihan** menampilkan pengalihan yang dibuat saat alamat entri berubah, dan menerima pengalihan Anda sendiri: **Dari** alamat di situs (diawali `/`), **Ke** alamat di situs atau alamat web, **Pindah permanen (301)** atau **Sementara (302)**. Halaman yang tayang selalu menang atas pengalihan dari alamatnya.

> [!TECHNICAL]
> Struktur bisa diekspor dan diimpor antarsitus (`sunrice:export-structure`, `sunrice:import-structure`), dan field bisa diganti namanya dengan aman (`sunrice:rename-field`). Lihat [Structure tools](docs:cms/structure) dan [Fields](docs:cms/fields).
