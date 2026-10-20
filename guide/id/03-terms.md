# Term

**Term** mengelompokkan entri berdasarkan topik: *Berita* dan *Acara* dalam taksonomi bernama *Kategori*, atau *Jakarta* dan *Bali* dalam *Tempat*. Pengunjung memakainya untuk menemukan konten terkait, dan entri mendapatkannya lewat field **Terms**. Buka **Terms** di bawah Content.

## Daftar term

Pilih taksonomi lewat menu di samping judul, dan bahasanya lewat **Language**. Term ditampilkan sesuai tingkatannya: dalam taksonomi bertingkat, *Lokal* bisa berada di bawah *Berita*.

- **Add term**: ketik **Title** (judul; **Slug** dibuat dari judul jika dikosongkan), pilih letaknya di **Under** (di bawah term lain) atau **Top level** (tingkat teratas), lalu klik **Add term**.
- Ikon pensil **mengganti nama** term dalam bahasa yang sedang tampil: judul dan slug-nya.
- Panah **memindahkan** term naik atau turun di antara term sejajarnya.
- Ikon halaman membuka **halaman term itu sendiri** (lihat di bawah).
- Ikon tempat sampah **memindahkannya ke tempat sampah**, beserta term di bawahnya.

Term yang belum berjudul dalam bahasa yang tampil ditulis abu-abu sebagai *… · not translated*. Ganti namanya dalam bahasa itu untuk menerjemahkannya.

## Halaman term

Jika taksonomi memiliki halaman term di situs web (misalnya `/topik/berita`), halaman setiap term menampilkan entrinya, dan Anda bisa menambahkan:

- field khususnya, jika taksonomi memilikinya (deskripsi, gambar…);
- **Search and sharing**: judul SEO, deskripsi, gambar untuk dibagikan, dan *Hide from search engines* (lihat [SEO](guide:website/seo));
- **Template**, jika developer membuat desain khusus (kosongkan untuk desain taksonomi).

Pilih bahasa di bagian atas, sunting, lalu klik **Save**. Perubahan langsung tayang: term tidak memiliki draf. **View** membuka halamannya di situs web. **Used by** menampilkan konten yang menautkan ke term ini lewat field-nya.

Jika rekan menyimpan term yang sama setelah Anda membukanya, pilih **Load theirs** atau **Save mine anyway**.

## Tempat sampah

**Trash** di bagian atas menampilkan term yang dibuang. Pulihkan untuk mengembalikannya (term yang induknya masih di tempat sampah pindah ke tingkat teratas), atau hapus selamanya: term di bawahnya naik satu tingkat, dan entri kehilangan term itu. Jika konten lain menautkan ke term tersebut, panel menyebutkan di mana sebelum Anda menghapusnya.

## Memberi term pada entri

Di penyunting entri, field **Terms** memungkinkan Anda memilih dari taksonominya: cari berdasarkan judul, dan pilih satu atau beberapa, sesuai yang diizinkan field. Term sama untuk semua bahasa sebuah entri.

> [!TECHNICAL]
> Taksonomi, koleksinya, halaman term, dan field-nya diatur di Structure → Taxonomies. Lihat [Taxonomies and terms](docs:cms/taxonomies).
