# Struktur

**Struktur** adalah tempat pengelola situs menentukan konten apa yang dimiliki situs web dan bagaimana susunannya. Editor jarang memerlukannya. Perubahan di sini memengaruhi pekerjaan semua orang, jadi rencanakan bersama tim, dan bersama developer jika perubahan itu membutuhkan desain baru (template).

## Menyiapkan situs baru, berurutan

Beberapa pengaturan menunjuk ke hal lain, jadi baru bisa dipilih setelah hal itu ada. Saat membangun situs dari nol, urutan ini menghindarkan Anda dari gagal simpan:

1. **Fieldset** berisi field biasa (alamat, ajakan bertindak), dan **blueprint** yang hanya berisi field biasa (teks, media, tanggal…): belum ada yang menunjuk ke koleksi atau taksonomi.
2. **Taksonomi** (*Topik*, *Lokasi*), untuk sementara tanpa koleksinya.
3. **Koleksi**, masing-masing dengan blueprint-nya.
4. Kembali ke **blueprint** (dan fieldset): tambahkan field **Entri**, yang menautkan ke koleksi, dan field **Term**, yang menautkan ke taksonomi.
5. Kembali ke **taksonomi**: centang **Koleksi** yang entrinya dikelompokkan.
6. **Set global**, **pengaturan menu**, dan **formulir**; lalu kontennya, dan beranda di Pengaturan → Situs.

Di dasbor, **Menyiapkan situs** menampilkan apa yang masih kurang.

### Handle

**Handle** (milik field, koleksi, taksonomi…) adalah nama yang dipakai template: huruf kecil, angka, dan garis bawah, diawali huruf. `contact_person` bisa; `contact-person` (tanda hubung) dan `ContactPerson` tidak. Panel membuatnya dari judul atau label saat Anda mengetik.

Setiap entri sudah memiliki yang berikut, jadi tidak ada field yang boleh memakainya sebagai handle: `id`, `title`, `slug`, `url`, `status`, `locale`, `published_at`, `created_at`, `updated_at`, `parent`, `children`, `collection`, `blueprint`, `data`, `seo`, `author`.

Field **Fieldset** menaruh field-field fieldset itu di tempatnya, seolah-olah milik blueprint itu sendiri: handle-nya dihitung sebagai milik blueprint (dua field tidak boleh memakai handle yang sama), dan handle field Fieldset itu sendiri tidak dipakai apa pun.

## Koleksi

**Koleksi** adalah jenis konten: *Pages*, *Blog*, *Produk*, *Acara*. **Struktur → Koleksi** menampilkannya; **Tambah koleksi** membuat yang baru.

| Pengaturan | |
| --- | --- |
| **Judul** | Nama yang dilihat editor, dan pengunjung dalam bahasa utama. |
| **Judul dalam …** | Di situs multibahasa, satu per bahasa lain: yang dibaca pengunjung di sana (judul halaman daftar, breadcrumb, menu). Kosong: judul di atas. |
| **Handle** | Kode pendek yang dipakai template, seperti `articles`: huruf kecil, angka, dan garis bawah. Bisa diubah nanti: peran tetap memegang izinnya, tetapi formulir memperingatkan tentang template dan kode yang menyebutnya, yang harus diperbarui developer. |
| **Blueprint** | Field yang dimiliki entrinya (lihat di bawah). Menggantinya tetap mempertahankan isi entri yang sudah ada. |
| **Blueprint lain** | Blueprint lain yang bisa dipilih sebuah entri, di Pengaturan halaman entri itu (misalnya halaman promosi di antara halaman biasa). Blueprint formulir dan set global tidak ditawarkan. |
| **Bisa diterjemahkan** | Entri bisa punya versi di setiap bahasa. Mati: hanya dalam bahasa utama (berguna untuk konten yang tidak berbeda per bahasa). |
| **Entri bertanggal** | Entri menampilkan tanggal dan terurut dari yang terbaru, seperti artikel. |
| **Urutan manual** | Editor mengurutkan entri sendiri (**Urutkan** di atas daftar entri, atau panah di kolom **Urutan**), bukan menurut tanggal atau judul. |
| **Hierarkis** | Entri bisa berada di bawah entri induk, seperti halaman di bawah halaman (untuk jejak halaman dan sub-menu; alamatnya tetap). |
| **Setiap entri punya halaman sendiri** | Mati: entri tidak punya alamat, seperti FAQ atau anggota tim yang ditampilkan template. |
| **URL entri** | Letak entri di situs web, dengan `{slug}` untuk slug setiap entri: `/blog/{slug}`, atau `/{slug}` untuk halaman di tingkat teratas. Kosong: `/{handle}/{slug}`. |
| **Template entri** | Desain yang dipakai entri, jika developer membuatnya. |
| **Punya halaman daftar**, **URL halaman daftar**, **Field halaman daftar**, **Entri per halaman** | Halaman yang menampilkan daftar entri (seperti `/blog`; kosong: `/{handle}`), field khususnya (pengantar), dan jumlah entri per halaman. |
| **Izinkan komentar** | Pengunjung boleh mengomentari entrinya (membutuhkan URL). |
| **Jenis structured data** | Jenis entri yang diberitahukan ke mesin pencari (artikel, halaman web, listing properti, atau orang, tempat, atau produk yang dibahas halaman…). |

Menghapus koleksi tidak menghapus entrinya: entri hilang dari panel dan situs web. Tombol **Tempat sampah** di daftar menampilkan koleksi yang dihapus, dengan **Pulihkan** untuk mengembalikannya. Menghapusnya untuk selamanya, beserta entrinya, dilakukan oleh developer (`sunrice:orphans --purge`), sehingga kekeliruan di panel selalu bisa dibatalkan.

Setiap koleksi mendapat izinnya sendiri (melihat, membuat, menyunting, menerbitkan, menghapus, dan mengekspor entrinya), sehingga sebuah peran bisa dibatasi hanya ke *Blog*, misalnya. Lihat [Pengguna dan peran](guide:panel/users-roles).

## Blueprint dan fieldset

**Blueprint** adalah daftar field: apa yang diisi editor untuk entri sebuah koleksi, term sebuah taksonomi, set global, atau formulir. **Fieldset** adalah sekelompok field yang dipakai di beberapa blueprint (alamat, ajakan bertindak). Sunting di **Struktur → Blueprint** dan **Fieldset**.

Untuk menambah field, pilih jenisnya, lalu atur (pengaturannya dikelompokkan sebagai **Dasar**, **Opsi**, **Batas dan nilai awal**, **Kapan tampil**, dan **Lanjutan**):

- **Label**: yang dilihat editor. **Handle** (cara template membaca field) dibuat dari label; mengganti handle nanti menyembunyikan nilai yang tersimpan dengan handle lama, jadi mintalah developer untuk mengganti nama field dengan aman. Field di tingkat teratas blueprint tidak bisa memakai handle yang dipakai konten itu sendiri, dan builder langsung memberi tahu saat Anda mengetik: `id`, `title`, `slug`, `url`, `status`, `locale`, `published_at`, `created_at`, `updated_at`, `parent`, `children`, `collection`, `blueprint`, `data`, `seo`, `author`.
- **Petunjuk**: teks yang tampil di bawah field.
- **Wajib**: entri tidak bisa disimpan atau diterbitkan tanpanya.
- **Dapat diterjemahkan**: nyala, setiap bahasa punya nilainya sendiri; mati, satu nilai dipakai bersama semua bahasa. Awalnya mengikuti tipenya (nyala untuk teks, mati untuk angka, tanggal, saklar, dan media). Di baris field, penanda **Bersama** menunjukkan field yang tidak diterjemahkan.
- **Dalam bahasa lain** (di situs dengan beberapa bahasa): label, petunjuk, dan opsi pilihan sebagaimana dibaca pengunjung di setiap bahasa lain. Formulir di situs web menampilkannya, dan pesan kesalahannya menyebut field dengan nama ini. Kosong: seperti yang ditulis di atas.
- **Kapan tampil**: field bisa tampil hanya pada saat tertentu. **Tambah syarat**, lalu pilih field lain, cara membandingkan, dan nilainya (opsi daftar pilihan itu sendiri, *aktif* atau *nonaktif* untuk saklar, sebuah term atau entri): *Hanya jika Layout adalah Video*. Dengan dua syarat atau lebih, pilih **Semua ini** atau **Salah satu ini**. Field yang tersembunyi tidak wajib diisi dan tetap menyimpan isinya.
- **Aturan tambahan** (di **Lanjutan**): pemeriksaan opsional, satu per baris (misalnya `email` atau `max:100`; untuk developer: aturan validasi Laravel).
- Pengaturan khusus tiap jenis: opsi sebuah field pilihan, koleksi yang ditautkan field entri, jenis berkas yang diterima field media, jumlah maksimal…

Jenis-jenisnya: **Teks**, **Textarea**, **Teks kaya**, **Angka**, **Toggle**, **Pilihan**, **Tanggal**, **Tautan**, **Media**, **Entri**, **Term**, **Grup** (beberapa field bersama), **Repeater** (baris berisi field), **Konten fleksibel** (blok berbagai jenis), **Fieldset** (menyertakan fieldset: field-nya ditambahkan di tempatnya dengan handle masing-masing; agar tetap di bawah satu nama, taruh di dalam **Grup**), dan **File (formulir)** (berkas yang dikirim pengunjung lewat formulir: satu, atau beberapa dengan **Beberapa file**).

Baris setiap field menampilkan tipe, label, dan handle-nya, dengan **Duplikat** (salinan tepat di bawahnya, berlabel "(salinan)", dengan handle sendiri, disimpan bersama blueprint) dan **Hapus** di ujungnya. Seret field ke urutannya lewat pegangannya (field di dalam grup atau repeater di antara sesamanya), lalu klik **Simpan** (atau **Buat blueprint** untuk yang baru). Blueprint yang masih dipakai tidak bisa dihapus. Begitu blueprint dipakai untuk entri atau term, set global, atau formulir, pilihan blueprint untuk jenis lain tidak lagi menawarkannya.

## Taksonomi

**Struktur → Taksonomi**: **Judul** (dan **Judul dalam …** untuk setiap bahasa lain, bagi pengunjung di halaman term-nya), **Handle** (bisa diubah nanti, seperti pada koleksi), **Term bertingkat** (term di bawah term lain, seperti subkategori), **Koleksi** yang entrinya dikelompokkan, **URL halaman term** (seperti `/topik/{slug}`; kosong: term tidak punya halaman), **Field term** (blueprint untuk field term), dan **Template halaman term**. Editor lalu menambahkan term di bagian Taksonomi pada sidebar (lihat [Term](guide:website/terms)). Agar editor bisa memberi term pada entri, tambahkan field **Term** ke blueprint koleksinya: itu sudah cukup agar daftar entri bisa disaring menurut taksonomi tersebut, tanpa mencentang koleksinya di sini.

## Set global

**Konten → Global → Tambah set global**: **Judul**, **Handle**, dan **Blueprint** untuk field set tersebut (nanti, lewat **Pengaturan** set itu). Membuka sebuah set menampilkan isinya (lihat [Global](guide:website/globals)).

## Menu

**Konten → Menu → Tambah menu**: **Judul** dan **Handle** (seperti `main` atau `footer`) yang dipakai template (nanti, lewat **Pengaturan** menu itu). Membuka sebuah menu menampilkan tautannya (lihat [Menu](guide:website/menus)).

## Formulir

**Struktur → Formulir**: **Judul**, **Handle** (bisa diubah nanti, seperti pada koleksi), **Blueprint** berisi field formulir (pengunjung mendapat field teks, textarea, angka, toggle, pilihan, tanggal, dan file), serta:

- **Email ke**: alamat yang menerima setiap kiriman, satu per baris; **Email juga ke peran**: semua orang dengan peran ini juga.
- **Pesan terima kasih**: tampil setelah mengirim (di situs multibahasa, satu per bahasa lain; jika kosong, ucapan terima kasih bawaan situs dalam bahasa itu); atau **Lalu buka** halaman pilihan Anda.
- **Kiriman per pengunjung per menit** dan **Wajibkan captcha**, untuk mencegah spam.

Developer lalu memasang formulir di sebuah halaman. Isian pengunjung masuk ke Konten → Kiriman (lihat [Kiriman formulir](guide:website/submissions)).

## Pengalihan

**Struktur → Pengalihan** menampilkan pengalihan yang dibuat saat alamat entri berubah, dan menerima pengalihan Anda sendiri: **Dari** alamat di situs (diawali `/`), **Ke** alamat di situs atau alamat web, **Pindah permanen (301)** atau **Sementara (302)**. Halaman yang tayang selalu menang atas pengalihan dari alamatnya.

> [!TECHNICAL]
> Struktur bisa diekspor dan diimpor antarsitus (`sunrice:export-structure`, `sunrice:import-structure`), dan field bisa diganti namanya dengan aman (`sunrice:rename-field`). Lihat [Structure tools](docs:cms/structure) dan [Fields](docs:cms/fields).
