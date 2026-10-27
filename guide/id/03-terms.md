# Term

**Term** mengelompokkan entri berdasarkan topik: *Berita* dan *Acara* dalam taksonomi bernama *Kategori*, atau *Jakarta* dan *Bali* dalam *Tempat*. Pengunjung memakainya untuk menemukan konten terkait, dan entri mendapatkannya di kartu **Taksonomi** pada penyunting entri. Setiap taksonomi punya item sendiri di bawah **Taksonomi** pada sidebar.

## Daftar term

Pilih taksonomi lewat menu di samping judul, dan bahasanya lewat **Bahasa**. Tabel menampilkan **Slug** setiap term, berapa **Entri** yang memakainya, dan kapan term itu **Dibuat**, sesuai tingkatannya: dalam taksonomi bertingkat, *Lokal* bisa berada di bawah *Berita*. **Cari term…** mencari term berdasarkan judul atau slug.

- **Term baru** membuka penyunting term (lihat di bawah) dalam keadaan kosong: ketik **Judul** (**Slug** dibuat dari judul jika dikosongkan), pilih letaknya di **Di bawah** (atau **Tingkat teratas**), isi field-nya, lalu klik **Buat term**: Anda tetap di penyunting term baru itu. **Tambah term di bawahnya** di menu **⋯** sebuah baris langsung menaruhnya di bawah term itu.
- Klik judul term untuk membukanya di penyunting yang sama, dalam bahasa yang tampil. Ikon panah di sampingnya membuka halamannya di situs web, jika term punya halaman.
- Menu **⋯** di setiap baris: **Ubah**, **Tambah term di bawahnya**, dan **Pindahkan ke tempat sampah** (beserta term di bawahnya).
- Seret term lewat pegangannya untuk mengubah posisinya di antara term sejajarnya; term di bawahnya ikut pindah. Untuk menempatkan term di bawah term lain, buka term itu dan pilih **Di bawah**.
- Menu **⋮** di samping **Term baru** menampilkan koleksi yang memakai taksonomi ini, serta membuka **Pengaturan taksonomi** dan, jika peran Anda boleh mengubah blueprint, **Ubah blueprint** (field term). **Tempat sampah**, di samping pencarian, menampilkan term yang dibuang.

Term yang belum berjudul dalam bahasa yang tampil ditulis abu-abu sebagai *… · belum diterjemahkan*. Buka term itu dan beri judul dalam bahasa tersebut untuk menerjemahkannya.

## Penyunting term

Semua tentang sebuah term disunting di satu tempat, baru maupun lama:

- **tab bahasa** di bagian atas (lihat [Bahasa](guide:website/languages#tab-bahasa)): bahasa yang sedang Anda sunting terpilih, dan bahasa yang belum punya judul tampil pudar dengan tanda **+**. Di bahasa seperti itu, memberi judul di sana akan menambahkannya;
- **Judul** dan **Slug**-nya dalam bahasa itu. Slug baru memindahkan halaman term begitu Anda menyimpan: sebuah catatan memberi tahu bahwa alamat lama tidak akan berfungsi lagi kecuali pengalihan ditambahkan (**Tambah pengalihan**, jika Anda boleh mengelola pengalihan);
- **Di bawah**, dalam taksonomi bertingkat: letaknya (tidak pernah di bawah dirinya sendiri atau term di bawahnya);
- field khususnya: **Deskripsi** untuk memperkenalkan halamannya, atau field yang diberikan developer untuk taksonomi (gambar…);
- **SEO**: judul SEO, deskripsi, gambar untuk dibagikan, dan *Sembunyikan dari mesin pencari (noindex)* (lihat [SEO](guide:website/seo));
- **Pengaturan halaman**: **Template**, jika developer membuat desain khusus (biarkan **Otomatis** untuk **Template halaman term** taksonomi). Template milik term selalu menang, di semua halaman term itu. Dengan **Otomatis**, desain yang dibuat developer Anda untuk halaman term satu koleksi, atau untuk term ini, didahulukan sebelum milik taksonomi; **Bagaimana dipilih?** di bawahnya menampilkan template yang dicoba, berurutan, dan menandai yang dipakai.

Klik **Simpan**. Perubahan langsung tayang: term tidak memiliki draf. **Lihat halaman** membuka halamannya di situs web jika term punya halaman. **Dipakai oleh** menampilkan konten yang menautkan ke term ini lewat field-nya.

Satu orang menyunting sebuah term dalam satu bahasa pada satu waktu: jika rekan sedang membukanya, Anda bisa memilih **Hanya lihat** atau **Ambil alih**. Jika rekan menyimpan term yang sama setelah Anda membukanya, pilih **Muat versi mereka** atau **Tetap simpan versi saya**.

## Tempat sampah

**Tempat sampah** di bagian atas menampilkan term yang dibuang. Pulihkan untuk mengembalikannya (term yang induknya masih di tempat sampah pindah ke tingkat teratas), atau hapus secara permanen: term di bawahnya naik satu tingkat, dan entri kehilangan term itu. Jika konten lain menautkan ke term tersebut, panel menyebutkan di mana sebelum Anda menghapusnya.

## Memberi term pada entri

Di penyunting entri, kartu **Taksonomi** punya satu pemilih untuk setiap taksonomi koleksi entri itu: term yang dipilih tampil sebagai chip yang bisa dihapus (**×**), dan **Pilih term…** (**Pilih satu term…** jika koleksi hanya mengizinkan satu term) membuka daftar yang bisa dicari, dengan term di bawah term lain ditampilkan menjorok. Term sama untuk semua bahasa sebuah entri, dan tampil di situs saat entri diterbitkan (lihat [Entri](guide:website/entries)). Field **Term**, jika developer menambahkannya, adalah hal lain: tautan ke sebuah term (misalnya "topik pilihan"), diisi seperti field lainnya.

> [!TECHNICAL]
> Taksonomi, koleksinya, halaman term, dan field-nya diatur di Struktur → Taksonomi. Lihat [Taxonomies and terms](docs:cms/taxonomies).
