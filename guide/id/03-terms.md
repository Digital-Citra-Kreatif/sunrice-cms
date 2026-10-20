# Term

**Term** mengelompokkan entri berdasarkan topik: *Berita* dan *Acara* dalam taksonomi bernama *Kategori*, atau *Jakarta* dan *Bali* dalam *Tempat*. Pengunjung memakainya untuk menemukan konten terkait, dan entri mendapatkannya lewat field **Terms**. Buka **Terms** di bawah Content.

## Daftar term

Pilih taksonomi lewat menu di samping judul, dan bahasanya lewat **Language**. Tabel menampilkan **Slug** setiap term, berapa **Entries** (entri) yang memakainya, dan kapan dibuat (**Created**), sesuai tingkatannya: dalam taksonomi bertingkat, *Lokal* bisa berada di bawah *Berita*. **Search terms…** mencari term berdasarkan judul atau slug.

- **New term** membuka halaman baru: ketik **Title** (judul; **Slug** dibuat dari judul jika dikosongkan), pilih letaknya di **Under** (di bawah term lain) atau **Top level** (tingkat teratas), lalu klik **Create term**. Jika term punya halaman, Anda dibawa ke halaman term baru itu; jika tidak, kembali ke daftar. **Add a term under it** di menu **⋯** sebuah baris langsung menaruhnya di bawah term itu.
- Klik judul term untuk membuka **halaman term itu sendiri** (lihat di bawah), atau untuk mengganti namanya jika term tidak punya halaman. Ikon panah di sampingnya membuka halamannya di situs web.
- Menu **⋯** di setiap baris: **Rename** (judul dan slug dalam bahasa yang tampil, serta letaknya), **Edit page**, dan **Move to trash** (beserta term di bawahnya).
- Seret term lewat pegangannya untuk mengubah posisinya di antara term sejajarnya; term di bawahnya ikut pindah. Untuk menempatkan term di bawah term lain, **ganti namanya** dan pilih **Under**.
- Menu **⋮** di samping **New term** menampilkan koleksi yang memakai taksonomi ini, serta membuka **Taxonomy settings** dan **Trash**.

Term yang belum berjudul dalam bahasa yang tampil ditulis abu-abu sebagai *… · not translated*. Ganti namanya dalam bahasa itu untuk menerjemahkannya.

## Halaman term

Jika taksonomi memiliki halaman term di situs web (misalnya `/topik/berita`), halaman setiap term menampilkan entrinya, dan Anda bisa menambahkan:

- field khususnya, jika taksonomi memilikinya (deskripsi, gambar…);
- **Search and sharing**: judul SEO, deskripsi, gambar untuk dibagikan, dan *Hide from search engines* (lihat [SEO](guide:website/seo));
- **Template**, jika developer membuat desain khusus (kosongkan untuk desain taksonomi).

Pilih bahasa di bagian atas, sunting, lalu klik **Save**. Perubahan langsung tayang: term tidak memiliki draf. **View page** membuka halamannya di situs web. **Used by** menampilkan konten yang menautkan ke term ini lewat field-nya.

Satu orang menyunting halaman term dalam satu bahasa pada satu waktu: jika rekan sedang membukanya, Anda bisa memilih **View only** atau **Take over**. Jika rekan menyimpan term yang sama setelah Anda membukanya, pilih **Load theirs** atau **Save mine anyway**.

## Tempat sampah

**Trash** di bagian atas menampilkan term yang dibuang. Pulihkan untuk mengembalikannya (term yang induknya masih di tempat sampah pindah ke tingkat teratas), atau hapus selamanya: term di bawahnya naik satu tingkat, dan entri kehilangan term itu. Jika konten lain menautkan ke term tersebut, panel menyebutkan di mana sebelum Anda menghapusnya.

## Memberi term pada entri

Di penyunting entri, field **Terms** memungkinkan Anda memilih dari taksonominya: term dimuat saat field tampil (daftar yang panjang dicari, bukan ditampilkan semua), dan Anda memilih satu atau beberapa, sesuai yang diizinkan field. Term sama untuk semua bahasa sebuah entri.

> [!TECHNICAL]
> Taksonomi, koleksinya, halaman term, dan field-nya diatur di Structure → Taxonomies. Lihat [Taxonomies and terms](docs:cms/taxonomies).
