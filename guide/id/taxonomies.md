# Taksonomi dan term

Taksonomi membantu Anda mengelompokkan entri berdasarkan topik. **Taksonomi** adalah jenis pengelompokan, misalnya *Kategori* atau *Tag*, sedangkan **term** adalah nilai-nilainya, misalnya *Berita*, *Acara*, atau *Resep*. Anda memberi term pada sebuah entri, lalu pengunjung dapat menelusuri semua entri yang memiliki term yang sama.

## Cara kerja taksonomi

- Setiap taksonomi muncul di sidebar pada grup **Taxonomies**, lengkap dengan daftar term-nya sendiri.
- Taksonomi dipasangkan ke satu atau beberapa koleksi. Entri di koleksi tersebut mendapat kartu **Taxonomies** di editor untuk memilih term.
- Taksonomi dapat bersifat **hierarkis**: term dapat berada di bawah term induk (misalnya *Asia* di bawah *Perjalanan*). Tag biasanya datar, sedangkan kategori sering kali hierarkis.
- Setiap term memiliki judul dan slug (bagian dari alamat web) dalam setiap bahasa situs.

Membuat taksonomi dan memilih koleksi yang memakainya adalah tugas pengelola situs; lihat [Struktur](structure.md#taksonomi).

## Mengelola term

Buka taksonomi dari sidebar pada grup **Taxonomies**. Daftar menampilkan **Title** (judul), **Slug**, **Entries** (jumlah entri yang memakainya), tanggal **Created** dan, pada situs multibahasa, **Languages**. Taksonomi hierarkis juga menampilkan kolom **Parent** (induk), dan term anak ditampilkan menjorok di bawah induknya.

Gunakan kotak **Search terms…** untuk mencari term berdasarkan judul atau slug. Pada taksonomi hierarkis, filter **Parent** hanya menampilkan anak dari satu term, atau **Top level only** (hanya tingkat teratas). Pada situs multibahasa, filter **Missing language** menampilkan term yang belum memiliki versi dalam bahasa tertentu.

### Membuat term

1. Di sidebar, pada grup **Taxonomies**, klik taksonominya.
2. Klik **New term**.
3. Isi **Title**. Biarkan **Slug** kosong agar dibuat otomatis dari judul.
4. Isi kolom tambahan yang dimiliki taksonomi tersebut (misalnya deskripsi atau gambar).
5. Pada taksonomi hierarkis, pilih induk di kartu **Parent**, atau biarkan **None (top level)**.
6. Klik **Create term**.

### Mengubah term

1. Klik term di daftar.
2. Ubah yang diperlukan.
3. Klik **Save** (atau tekan Ctrl/Cmd + S). Catatan di kanan bawah menunjukkan **Unsaved changes** (belum disimpan) atau **All changes saved** (semua tersimpan).

Jika taksonomi memiliki halaman term, editor juga menampilkan kartu **SEO** (tampilan halaman term di hasil pencarian dan saat dibagikan di media sosial) serta tombol **View page** untuk membuka halamannya di situs.

> [!NOTE]
> Satu term hanya dapat diedit oleh satu orang pada satu waktu. Jika orang lain sedang membukanya, Anda akan diberi tahu siapa orangnya, lalu dapat melihatnya dalam mode baca saja atau mengambil alih. Cara kerjanya sama seperti pada entri; lihat [Entri](entries.md).

### Menyusun term bertingkat (induk dan anak)

Pada taksonomi hierarkis, buka term anak, pilih induknya di kartu **Parent**, lalu klik **Save**. Sebuah term tidak dapat ditempatkan di bawah dirinya sendiri atau di bawah salah satu anaknya.

### Mengurutkan term

Selama daftar tidak sedang dicari, difilter, atau diurutkan, muncul catatan "Drag terms to set their order." Seret term ke atas atau ke bawah untuk memindahkannya di antara term yang setingkat. Untuk memindahkan term ke induk lain, ubah **Parent** di editornya.

### Menerjemahkan term

Pada situs multibahasa, editor term memiliki tab untuk setiap bahasa (bahasa utama paling depan).

1. Buka term, lalu klik tab bahasa.
2. Isi **Title** dan, bila perlu, **Slug** dalam bahasa tersebut. Biarkan judul kosong untuk menampilkan versi bahasa utama.
3. Aktifkan **Ready** jika terjemahan sudah boleh tampil di situs. Selama nonaktif, pengunjung melihat versi bahasa utama.
4. Klik **Save**.

Titik hijau pada tab berarti bahasa tersebut sudah diterjemahkan dan siap; titik kuning berarti terjemahan ada tetapi belum siap. Lihat [Terjemahan](translations.md) untuk informasi lebih lanjut tentang bahasa.

### Menghapus term

- Satu term: buka term, klik ikon tempat sampah (**Delete term**), lalu konfirmasi.
- Beberapa term: centang kotaknya di daftar, lalu klik **Delete** di samping tulisan "*n* selected" dan konfirmasi.

> [!WARNING]
> Menghapus term akan melepasnya dari semua entri yang memakainya, dan pada taksonomi hierarkis term anaknya ikut terhapus. Tidak ada Trash (tempat sampah) untuk term di admin, jadi Anda tidak dapat memulihkannya sendiri. Periksa jumlah **Entries** sebelum menghapus.

## Memasang term pada entri

1. Buka entri.
2. Di kartu **Taxonomies** di sebelah kanan, cari taksonominya (misalnya **Categories**).
3. Klik **Add term…**, cari, lalu pilih term. Ulangi untuk term lainnya.
4. Simpan atau terbitkan entri seperti biasa.

Jika sebuah taksonomi bertanda **(one)**, entri hanya boleh memiliki satu term dari taksonomi itu; tombolnya kemudian berbunyi **Change term…**. Term tidak dapat dibuat dari editor entri: buat dulu di taksonominya. Term yang dimiliki entri sama untuk semua bahasa.

## Halaman term di situs

Jika pengelola situs mengaktifkan halaman term untuk sebuah taksonomi, setiap term memiliki halaman sendiri yang menampilkan entri dengan term tersebut, misalnya `/blog/category/news`. Di daftar term, ada ikon tautan kecil di samping setiap term (**Visit term page**) untuk membukanya.

Halaman term menampilkan judul dalam bahasa pengunjung setelah terjemahannya **Ready**, dan bahasa utama jika belum.

> [!TECHNICAL]
> Halaman term diaktifkan per taksonomi di kartu **Term pages** (**Term archive/listing pages**) dengan pola URL seperti `{collection}/{taxonomy}/{slug}`. Halaman dirender oleh template Blade (bawaan `sunrice.taxonomies.{handle}.show`, lalu `sunrice.taxonomies.show`); kartu **Template** pada term dapat menggantinya. Template membaca term melalui `$entry->terms` atau menampilkannya dengan `<x-sunrice::terms>`. Lihat [Content modeling](docs:content-modeling.md#taxonomies) dan [Blade components](docs:blade-components.md#x-sunriceterms).
