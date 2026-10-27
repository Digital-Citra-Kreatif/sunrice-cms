# Struktur

**Struktur** adalah tempat pengelola situs menentukan konten apa yang dimiliki situs web dan bagaimana susunannya. Editor jarang memerlukannya. Perubahan di sini memengaruhi pekerjaan semua orang, jadi rencanakan bersama tim, dan bersama developer jika perubahan itu membutuhkan desain baru (template).

## Menyiapkan situs baru, berurutan

Beberapa pengaturan menunjuk ke hal lain, jadi baru bisa dipilih setelah hal itu ada. Saat membangun situs dari nol, urutan ini menghindarkan Anda dari gagal simpan:

1. **Fieldset** berisi field biasa (alamat, ajakan bertindak), dan **blueprint** yang hanya berisi field biasa (teks, media, tanggal…): belum ada yang menunjuk ke koleksi atau taksonomi.
2. **Taksonomi** (*Topik*, *Lokasi*), untuk sementara tanpa koleksinya.
3. **Koleksi**, masing-masing dengan blueprint-nya.
4. Kembali ke **blueprint** (dan fieldset): tambahkan field **Entri**, yang menautkan ke koleksi.
5. Kembali ke **taksonomi**: centang **Koleksi** yang entrinya dikelompokkan (atau, di setiap koleksi, **Taksonomi**-nya): entrinya mendapat term di kartu **Taksonomi** pada penyunting entri.
6. **Set global**, **pengaturan menu**, dan **formulir**; lalu kontennya, dan beranda di Pengaturan → Situs.

Di dasbor, **Menyiapkan situs** menampilkan apa yang masih kurang.

### Handle

**Handle** (milik field, koleksi, taksonomi…) adalah nama yang dipakai template: huruf kecil, angka, dan garis bawah, diawali huruf. `contact_person` bisa; `contact-person` (tanda hubung) dan `ContactPerson` tidak. Panel membuatnya dari judul atau label saat Anda mengetik. Di bawahnya, baris **Untuk developer** menunjukkan cara template memakainya, dengan handle yang Anda ketik (seperti `<x-sunrice-cms::form handle="newsletter" />` untuk formulir): teruskan ke developer Anda.

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
| **Taksonomi** | Taksonomi yang term-nya diberikan pada entrinya, di kartu **Taksonomi** pada penyunting entri (*Topik*, *Tag* …), dengan **hanya satu term** untuk masing-masing jika sebuah entri sebaiknya punya paling banyak satu. Sama dengan mencentang koleksi ini di taksonominya. |
| **Hierarkis** | Entri bisa berada di bawah entri induk, seperti halaman di bawah halaman (untuk jejak halaman dan sub-menu; alamatnya tetap). |
| **Setiap entri punya halaman sendiri** | Mati: entri tidak punya alamat, seperti FAQ atau anggota tim yang ditampilkan template. |
| **URL entri** | Letak entri di situs web, dengan `{slug}` untuk slug setiap entri: `/blog/{slug}`, atau `/{slug}` untuk halaman di tingkat teratas. Kosong: `/{handle}/{slug}`. URL baru yang akan menaruh entri di tempat halaman daftar atau halaman indeks (halaman `books` di `/books`) ditolak: pesannya menyebutkan keduanya. |
| **URL entri dalam …** | Bila ada lebih dari satu bahasa, setiap bahasa lain bisa punya URL sendiri, di bawah awalannya: `/buku/{slug}` untuk Bahasa Indonesia menghasilkan `/id/buku/…`, bukan `/id/books/…`. Kosong (URL utama tampil samar): URL utama di bawah awalan bahasa itu. |
| **Template entri** | Desain yang dipakai entri, jika developer membuatnya. |
| **Punya halaman daftar**, **URL halaman daftar**, **Blueprint halaman daftar**, **Entri per halaman**, **Template halaman daftar** | Halaman yang menampilkan daftar entri (seperti `/blog`; kosong: `/{handle}`), blueprint yang memberinya field sendiri (pengantar, gambar utama; editor mengisinya di entri koleksi itu → **Halaman daftar**; **Blueprint baru →** atau **Ubah blueprint →** di bawahnya; *Tidak ada* untuk tanpa field yang bisa disunting), jumlah entri per halaman, dan desain yang dipakainya, jika developer Anda membuatnya. **URL halaman daftar dalam …** memberi setiap bahasa lain URL sendiri (seperti `/buku`, dengan **Lihat di situs** ↗ di bawahnya). URL yang sudah dipakai entri atau term ditolak, dengan menyebutkan entri atau term itu. |
| **Izinkan komentar** | Pengunjung boleh mengomentari entrinya (membutuhkan URL). |
| **Jenis structured data** | Jenis entri yang diberitahukan ke mesin pencari (artikel, halaman web, listing properti, atau orang, tempat, atau produk yang dibahas halaman…). |

Saat Anda memberi suatu bahasa URL sendiri (atau mengubahnya), alamat lamanya tetap berfungsi: pengunjung dan mesin pencari diarahkan ke alamat baru (`/id/books/halo` → `/id/buku/halo`). Dua koleksi tidak boleh memakai URL yang sama dalam satu bahasa.

Setelah disimpan, kartu-kartu di formulir menautkan ke tujuan berikutnya: **Lihat entri** (Halaman entri), **Lihat di situs** ↗ dan **Sunting halaman daftar** (Halaman daftar: field-nya, detail pencarian, dan template-nya). Pengaturan template menawarkan **Otomatis** (desain yang dibuat developer Anda untuk jenis halaman itu) dan template yang ada, atau **View lain…** untuk nama yang diberikan developer Anda; baris di bawahnya menyebutkan file yang dipakai, dan **File yang mana?** membuka daftar file template yang dicoba, untuk developer Anda.

Menghapus koleksi tidak menghapus entrinya: entri hilang dari panel dan situs web. Tombol **Tempat sampah** di daftar menampilkan koleksi yang dihapus, dengan **Pulihkan** untuk mengembalikannya dan **Hapus permanen** untuk menghapusnya selamanya, beserta semua entrinya, sehingga handle-nya bisa dipakai koleksi baru. Ini tidak bisa dibatalkan, jadi panel bertanya dulu. Taksonomi bekerja dengan cara yang sama, beserta istilahnya.

Setiap koleksi mendapat izinnya sendiri (melihat, membuat, menyunting, menerbitkan, menghapus, dan mengekspor entrinya), sehingga sebuah peran bisa dibatasi hanya ke *Blog*, misalnya. Lihat [Pengguna dan peran](guide:panel/users-roles).

## Blueprint dan fieldset

**Blueprint** adalah daftar field: apa yang diisi editor untuk entri sebuah koleksi, term sebuah taksonomi, set global, atau formulir. **Fieldset** adalah sekelompok field yang dipakai di beberapa blueprint (alamat, ajakan bertindak). Sunting di **Struktur → Blueprint** dan **Fieldset**.

Jika peran Anda boleh mengubah blueprint, Anda tak perlu mencarinya: di mana pun blueprint dipilih (**Blueprint**, **Blueprint lain**, dan **Blueprint halaman daftar** sebuah koleksi, **Blueprint** dan **Blueprint halaman indeks** sebuah taksonomi, **Blueprint** set global atau formulir), **Ubah blueprint →** di bawahnya membuka blueprint yang dipilih, dan **Blueprint baru →** membuat yang baru selama belum ada yang dipilih. Di tempat konten disunting (entri, term, set global, halaman daftar atau indeks, kiriman formulir, serta daftar entri dan term), menu **⋮** punya **Ubah blueprint**.

Untuk menambah field, pilih jenisnya, lalu atur (pengaturannya dikelompokkan sebagai **Dasar**, **Opsi**, **Batas dan nilai awal**, **Tampilan**, **Kapan tampil**, dan **Lanjutan**):

- **Label**: yang dilihat editor. **Handle** (cara template membaca field) dibuat dari label; mengganti handle nanti menyembunyikan nilai yang tersimpan dengan handle lama, jadi mintalah developer untuk mengganti nama field dengan aman. Field di tingkat teratas blueprint tidak bisa memakai handle yang dipakai konten itu sendiri, dan builder langsung memberi tahu saat Anda mengetik: `id`, `title`, `slug`, `url`, `status`, `locale`, `published_at`, `created_at`, `updated_at`, `parent`, `children`, `collection`, `blueprint`, `data`, `seo`, `author`.
- **Teks bantuan**: tampil di bawah field (di bawah judul grup, repeater, atau daftar blok). Markdown sederhana bisa dipakai: `[teks](https://…)` untuk tautan (terbuka di tab baru), `**tebal**`, `*miring*`, dan `` `kode` ``.
- **Petunjuk singkat** dan **Tooltip petunjuk**: catatan singkat di kanan label field dalam teks abu-abu kecil (*Sebelum pajak*, *Maks. 160 karakter*), dan penjelasan yang lebih panjang di balik ⓘ di sampingnya, yang tampil saat ditunjuk atau dicapai dengan Tab.
- **Wajib**: entri tidak bisa disimpan atau diterbitkan tanpanya.
- **Dapat diterjemahkan**: nyala, setiap bahasa punya nilainya sendiri; mati, satu nilai dipakai bersama semua bahasa. Awalnya mengikuti tipenya (nyala untuk teks, mati untuk angka, tanggal, saklar, dan media). Di baris field, penanda **Bersama** menunjukkan field yang tidak diterjemahkan. Mematikannya untuk field yang tadinya diterjemahkan tidak menghilangkan nilai bahasa-bahasa lain: nilainya disimpan tanpa ditampilkan (setiap bahasa menampilkan nilai bahasa utama) dan muncul kembali jika Anda menyalakannya lagi.
- **Lebar**: seberapa lebar field di barisnya pada editor: 25%, 33%, 50%, 66%, 75%, atau 100% (bawaan). Field yang berdampingan berbagi satu baris (dua 50%, 33% dan 66%, empat 25%) dan pindah ke baris berikutnya bila tidak muat; di tempat sempit (editor di ponsel) setiap field selebar penuh. Ini berlaku juga di dalam grup, baris repeater, dan blok, dan field sebuah fieldset memakai lebar yang diatur di fieldset itu. Baris field menunjukkan lebarnya (**50%**) bila bukan 100%. Formulir di situs web ditata oleh template-nya.
- **Tampilan** (field teks, angka, teks panjang, kode, dan tautan): **Placeholder** yang tampil di input yang masih kosong, dan untuk teks dan angka **Awalan** dan **Akhiran** yang menempel pada input (`Rp` sebelum harga, `m²` setelah luas, `https://` sebelum alamat). Ini hanya mengubah tampilan input: yang disimpan adalah yang diketik.
- **Dalam bahasa lain** (di situs dengan beberapa bahasa; **Dalam …** jika hanya ada satu bahasa lain): label, teks bantuan, dan opsi pilihan sebagaimana dibaca pengunjung di setiap bahasa lain, satu tab per bahasa. Formulir di situs web menampilkannya, dan pesan kesalahannya menyebut field dengan nama ini. Kosong: seperti yang ditulis di atas.
- **Kapan tampil**: field bisa tampil hanya pada saat tertentu. **Tambah syarat**, lalu pilih field lain, cara membandingkan, dan nilainya (opsi daftar pilihan itu sendiri, *aktif* atau *nonaktif* untuk saklar, sebuah term atau entri): *Hanya jika Layout adalah Video*. Dengan dua syarat atau lebih, pilih **Semua ini** atau **Salah satu ini**. Field yang tersembunyi tidak wajib diisi dan tetap menyimpan isinya.
- **Aturan tambahan** (di **Lanjutan**): pemeriksaan opsional, satu per baris (misalnya `email` atau `max:100`; untuk developer: aturan validasi Laravel).
- Pengaturan khusus tiap jenis: opsi sebuah field pilihan, koleksi yang ditautkan field entri, jenis berkas yang diterima field media… Saklar **Beberapa** (**Beberapa term**, **Beberapa entri**, **Beberapa file**, **Beberapa pilihan**) membuat editor bisa memilih lebih dari satu; selama nyala, **Maksimal** di sebelahnya membatasi jumlahnya (kosong: tanpa batas).

Jenis-jenisnya: **Teks**, **Textarea**, **Teks kaya**, **Kode** (kode untuk ditampilkan atau disematkan, di editor dengan nomor baris dan warna sesuai **Bahasa**-nya: HTML, CSS, JavaScript, JSON, atau teks biasa; Tab menjorokkan baris, lalu Esc kemudian Tab pindah ke field berikutnya. Situs web menampilkannya sebagai teks kecuali templatnya dibuat untuk menjalankannya; tidak pernah diterjemahkan mesin), **Angka**, **Toggle**, **Pilihan**, **Tanggal**, **Tautan**, **Media**, **Entri**, **Term**, **Grup** (beberapa field bersama), **Repeater** (baris berisi field), **Konten fleksibel** (blok berbagai jenis), **Fieldset** (menyertakan fieldset: field-nya ditambahkan di tempatnya dengan handle masing-masing; agar tetap di bawah satu nama, taruh di dalam **Grup**), dan **File (formulir)** (berkas yang dikirim pengunjung lewat formulir: satu, atau beberapa dengan **Beberapa file**).

Baris setiap field menampilkan tipe, label, dan handle-nya, dengan **Duplikat** (salinan tepat di bawahnya, berlabel "(salinan)", dengan handle sendiri, disimpan bersama blueprint) dan **Hapus** di ujungnya. Seret field ke urutannya lewat pegangannya (field di dalam grup atau repeater di antara sesamanya), lalu klik **Simpan** (atau **Buat blueprint** untuk yang baru). Blueprint yang masih dipakai tidak bisa dihapus. Begitu blueprint dipakai untuk entri atau term, set global, atau formulir, pilihan blueprint untuk jenis lain tidak lagi menawarkannya.

## Taksonomi

**Struktur → Taksonomi**, disusun seperti formulir koleksi. **Umum**: **Judul** (dan **Judul dalam …** untuk setiap bahasa lain, bagi pengunjung di halaman term-nya), **Handle** (bisa diubah nanti, seperti pada koleksi), **Blueprint** (field yang dimiliki term-nya) dan **Term bertingkat** (term di bawah term lain, seperti subkategori). **Koleksi**: koleksi yang entrinya dikelompokkan. Mencentang sebuah koleksi membuat editor bisa memberi term pada entrinya, di kartu **Taksonomi** pada penyunting entri, dan daftar entrinya bisa disaring menurut taksonomi itu; blueprint tidak berubah. Di bawah tiap koleksi yang dicentang: **Hanya satu term** (setiap entri koleksi itu punya paling banyak satu term), serta **Halaman term** dan **Halaman indeks** milik koleksi itu dengan URL-nya (seperti `/books/tags/featured` dan `/books/tags`). **Halaman term**: **Halaman term bersama** (halaman per term yang mendaftar entrinya dari semua koleksi), **URL halaman term bersama** (seperti `/topik/{slug}`; kosong: `/{handle}/{slug}`; URL yang akan menaruh term di tempat halaman daftar atau halaman indeks ditolak) dengan **… dalam …** untuk setiap bahasa lain, dan **Template halaman term** untuk semua halaman term (dengan **Lihat term**, daftar term-nya): desain bawaan, yang dikalahkan oleh **Template** milik sebuah term, dan didahului oleh desain yang dibuat developer Anda untuk halaman term satu koleksi. **Halaman indeks**: **Halaman indeks bersama** yang mendaftar semua term-nya dan URL-nya, lalu **Blueprint halaman indeks** dan **Template halaman indeks** (field dan desain sendiri untuk halaman indeksnya, yang bersama dan milik tiap koleksi), dengan **Lihat halaman indeks** ↗ dan **Edit halaman indeks**. Editor lalu menambahkan term di bagian Taksonomi pada sidebar (lihat [Term](guide:website/terms)). Kartu di samping formulir mendaftar koleksi yang dikelompokkan taksonomi ini. Saat Anda tidak mencentang lagi sebuah koleksi, entrinya tetap menyimpan term-nya, tersembunyi, dan mendapatkannya kembali jika Anda mencentangnya lagi.

## Set global

**Konten → Global → Tambah set global**: **Judul**, **Handle**, dan **Blueprint** untuk field set tersebut (nanti, lewat **Pengaturan** set itu). Membuka sebuah set menampilkan isinya (lihat [Global](guide:website/globals)).

## Menu

**Konten → Menu → Tambah menu**: **Judul** dan **Handle** (seperti `main` atau `footer`) yang dipakai template (nanti, lewat **Pengaturan** menu itu). Membuka sebuah menu menampilkan tautannya (lihat [Menu](guide:website/menus)).

## Formulir

**Struktur → Formulir**: **Judul**, **Handle** (bisa diubah nanti, seperti pada koleksi), **Blueprint** berisi field formulir (pengunjung mendapat field teks, textarea, angka, toggle, pilihan, tanggal, dan file), serta:

- **Email ke**: alamat yang menerima setiap kiriman (**Tambah alamat** untuk masing-masing); **Email juga ke peran**: semua orang dengan peran ini juga.
- **Pesan terima kasih**: tampil setelah mengirim (di situs multibahasa, satu per bahasa lain; jika kosong, ucapan terima kasih bawaan situs dalam bahasa itu); atau **Lalu buka** halaman pilihan Anda.
- **Kiriman per pengunjung per menit** dan **Wajibkan captcha**, untuk mencegah spam.

Developer lalu memasang formulir di sebuah halaman. Isian pengunjung masuk ke Konten → Kiriman (lihat [Kiriman formulir](guide:website/submissions)).

## Pengalihan

**Struktur → Pengalihan** menampilkan pengalihan yang dibuat saat alamat entri berubah, dan menerima pengalihan Anda sendiri: **Dari** alamat di situs (diawali `/`), **Ke** alamat di situs atau alamat web, dan **Jenis**: **Permanen (301)** atau **Sementara (302)**. Di situs dengan beberapa bahasa, nyalakan **Di semua bahasa** agar pengalihan juga berlaku dari alamat yang sama di setiap bahasa: /listings → /properties juga mengirim /id/listings ke /id/properties. Halaman yang tayang selalu menang atas pengalihan dari alamatnya.

**Wildcard** memindahkan satu bagian situs sekaligus: akhiri **Dari** dengan `/*` maka semua alamat di bawahnya ikut. Taruh `*` di **Ke** untuk sisa alamatnya: `/blog/*` → `/journal/*` mengirim `/blog/2024/hello` ke `/journal/2024/hello`; tanpa `*`, semuanya menuju satu halaman (`/old-shop/*` → `/products`). Kolom **Cakupan** di daftar menandai yang seperti ini dengan **Semua di bawahnya**. Pengalihan untuk satu alamat persis menang atas wildcard, dan wildcard yang lebih panjang atas yang lebih pendek (`/blog/2024/*` sebelum `/blog/*`). Formulir menolak `*` selain di ujung **Dari**, lebih dari satu `*` di **Ke**, dan **Ke** yang akan dicakup **Dari** lagi (berputar-putar).

> [!TECHNICAL]
> Struktur bisa diekspor dan diimpor antarsitus (`sunrice:export-structure`, `sunrice:import-structure`), dan field bisa diganti namanya dengan aman (`sunrice:rename-field`). Lihat [Structure tools](docs:cms/structure) dan [Fields](docs:cms/fields).
