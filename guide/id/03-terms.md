# Term

**Term** mengelompokkan entri berdasarkan topik: *Berita* dan *Acara* dalam taksonomi bernama *Kategori*, atau *Jakarta* dan *Bali* dalam *Tempat*. Pengunjung memakainya untuk menemukan konten terkait, dan entri mendapatkannya lewat field **Term**. Setiap taksonomi punya item sendiri di bawah **Taksonomi** pada sidebar.

## Daftar term

Pilih taksonomi lewat menu di samping judul, dan bahasanya lewat **Bahasa**. Tabel menampilkan **Slug** setiap term, berapa **Entri** yang memakainya, dan kapan term itu **Dibuat**, sesuai tingkatannya: dalam taksonomi bertingkat, *Lokal* bisa berada di bawah *Berita*. **Cari term…** mencari term berdasarkan judul atau slug.

- **Term baru** membuka halaman baru: ketik **Judul** (**Slug** dibuat dari judul jika dikosongkan), pilih letaknya: **Di bawah** term lain, atau **Tingkat teratas**, lalu klik **Buat term**. Jika term punya halaman, Anda dibawa ke halaman term baru itu; jika tidak, kembali ke daftar. **Tambah term di bawahnya** di menu **⋯** sebuah baris langsung menaruhnya di bawah term itu.
- Klik judul term untuk membuka **halaman term itu sendiri** (lihat di bawah), atau untuk mengganti namanya jika term tidak punya halaman. Ikon panah di sampingnya membuka halamannya di situs web.
- Menu **⋯** di setiap baris: **Ganti nama** (judul dan slug dalam bahasa yang tampil, serta letaknya), **Ubah halaman**, dan **Pindahkan ke tempat sampah** (beserta term di bawahnya).
- Seret term lewat pegangannya untuk mengubah posisinya di antara term sejajarnya; term di bawahnya ikut pindah. Untuk menempatkan term di bawah term lain, **ganti namanya** dan pilih **Di bawah**.
- Menu **⋮** di samping **Term baru** menampilkan koleksi yang memakai taksonomi ini, serta membuka **Pengaturan taksonomi** dan **Tempat sampah**.

Term yang belum berjudul dalam bahasa yang tampil ditulis abu-abu sebagai *… · belum diterjemahkan*. Ganti namanya dalam bahasa itu untuk menerjemahkannya, atau beri judul di halamannya sendiri.

## Halaman term

Jika taksonomi memiliki halaman term di situs web (misalnya `/topik/berita`), halaman setiap term menampilkan entrinya, dan Anda bisa menambahkan:

- **Judul** dan **Slug**-nya dalam bahasa yang tampil: di bahasa yang belum diterjemahkan, memberi judul di sini akan menambahkannya (tidak perlu mengganti nama di daftar lebih dulu);
- field khususnya: **Deskripsi** untuk memperkenalkan halamannya, atau field yang diberikan developer untuk taksonomi (gambar…);
- **SEO**: judul SEO, deskripsi, gambar untuk dibagikan, dan *Sembunyikan dari mesin pencari (noindex)* (lihat [SEO](guide:website/seo));
- **Template**, jika developer membuat desain khusus (kosongkan untuk desain taksonomi).

Pilih bahasa di bagian atas, sunting, lalu klik **Simpan**. Perubahan langsung tayang: term tidak memiliki draf. **Lihat halaman** membuka halamannya di situs web. **Dipakai oleh** menampilkan konten yang menautkan ke term ini lewat field-nya.

Satu orang menyunting halaman term dalam satu bahasa pada satu waktu: jika rekan sedang membukanya, Anda bisa memilih **Hanya lihat** atau **Ambil alih**. Jika rekan menyimpan term yang sama setelah Anda membukanya, pilih **Muat versi mereka** atau **Tetap simpan versi saya**.

## Tempat sampah

**Tempat sampah** di bagian atas menampilkan term yang dibuang. Pulihkan untuk mengembalikannya (term yang induknya masih di tempat sampah pindah ke tingkat teratas), atau hapus selamanya: term di bawahnya naik satu tingkat, dan entri kehilangan term itu. Jika konten lain menautkan ke term tersebut, panel menyebutkan di mana sebelum Anda menghapusnya.

## Memberi term pada entri

Di penyunting entri, field **Term** memungkinkan Anda memilih dari taksonominya: term dimuat saat field tampil (daftar yang panjang dicari, bukan ditampilkan semua), dan Anda memilih satu atau beberapa, sesuai yang diizinkan field. Term sama untuk semua bahasa sebuah entri.

> [!TECHNICAL]
> Taksonomi, koleksinya, halaman term, dan field-nya diatur di Struktur → Taksonomi. Lihat [Taxonomies and terms](docs:cms/taxonomies).
