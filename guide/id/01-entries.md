# Entri

Entri adalah isi situs web: halaman, artikel, produk, acara. Setiap entri termasuk dalam satu **koleksi**, dan field koleksi itulah yang menentukan apa yang Anda isi. Setiap koleksi punya item sendiri di bawah **Konten** pada sidebar (**Blog**, **Pages** …): buka untuk mengerjakan entrinya.

## Daftar entri

Daftar menampilkan satu koleksi dalam satu waktu; pilih koleksi lain lewat menu di samping judul. Anda hanya melihat koleksi yang diizinkan peran Anda.

- **Cari** mencari entri berdasarkan judul atau slug; ketik `#12` untuk menemukan entri bernomor 12.
- **Status** menampilkan hanya **Draf**, **Terbit**, **Terjadwal**, atau **Tempat sampah**.
- Saring berdasarkan penulis, term (misalnya kategori), dan **Bahasa**: daftar menampilkan judul dan status dalam bahasa tersebut.
- Klik judul kolom untuk mengurutkan. **Kolom** memilih kolom yang tampil, termasuk beberapa field entri itu sendiri (harga, tanggal…). Panel mengingat pilihan kolom dan jumlah baris per halaman Anda.
- Menu **⋮** di samping **Entri baru** mengarah ke hal yang mungkin Anda perlukan berikutnya: halaman daftar koleksi, term-nya, pengaturannya, dan blueprint-nya, sesuai izin peran Anda.
- **Ekspor CSV** (di menu **⋮**) mengunduh daftar sesuai filter, urutan, dan bahasanya, semua halamannya, untuk dibuka di spreadsheet. Ini membutuhkan izin tersendiri: bisa melihat daftar belum berarti boleh mengunduhnya.

Filter tersimpan di alamat halaman, jadi Anda bisa menyimpan tampilan sebagai markah atau mengirimkannya ke rekan.

### Beberapa sekaligus

Centang beberapa entri (atau kotak di atas untuk seluruh halaman) lalu pilih **Terbitkan**, **Batalkan terbit**, atau **Pindahkan ke tempat sampah** untuk semuanya sekaligus. Tepat setelah membuang, pesannya punya tombol **Urungkan**. Di tempat sampah, baris bertanda **Dibuang** dan masing-masing punya tombol **Pulihkan**; yang dicentang bisa **Pulihkan** atau **Hapus permanen** sekaligus. Entri yang tidak boleh Anda ubah, atau yang belum bisa diterbitkan (misalnya ada field wajib yang kosong), dilewati, dan panel menyebutkan jumlahnya.

### Mengurutkan entri

Di koleksi dengan *urutan manual*, klik **Urutkan** di atas daftar, seret setiap entri ke posisinya lewat pegangannya (atau dengan papan ketik: fokus ke pegangan, tekan Spasi, pindahkan dengan tombol panah, tekan Spasi lagi), lalu klik **Selesai**. Di koleksi yang entrinya bertingkat, daftar menampilkan susunan pohonnya (entri menjorok di bawah induknya) dan entri berpindah di antara entri sejajarnya, beserta isinya; untuk menaruh entri di bawah entri lain, pilih **Induk**-nya di Pengaturan halaman. Panah di kolom **Urutan** juga memindahkan satu entri satu posisi ke atas atau ke bawah, saat daftar dalam urutannya sendiri, tanpa filter atau pencarian. Koleksi lain menampilkan entri terbaru lebih dulu (jika bertanggal) atau menurut judul.

## Menulis entri

1. Klik **Entri baru**.
2. Ketik **Judul**. **Slug**, bagian alamat web entri (`/blog/tulisan-pertama-saya`), dibuat dari judul jika dibiarkan kosong; hanya huruf kecil, angka, dan tanda hubung. Mengubah slug entri yang pernah diterbitkan memindahkan alamatnya: catatan di bawah isian memberi tahu bahwa alamat lama akan dialihkan ke alamat baru setelah Anda menerbitkan (atau, untuk entri yang sudah ditarik dari situs, bahwa alamat lama tidak akan berfungsi lagi kecuali pengalihan ditambahkan).
3. Isi field-field-nya. Field wajib ditandai; field yang keliru disebutkan namanya saat Anda menyimpan.
4. Klik **Buat draf**.

Selanjutnya, **Simpan draf** menyimpan pekerjaan Anda (atau tekan **Ctrl S** / **⌘ S**). Menyimpan draf tidak pernah mengubah situs web.

### Field yang akan Anda temui

- **Teks kaya** memiliki bilah alat untuk judul, tebal, miring, daftar, kutipan, tautan, dan gambar dari pustaka media.
- Field **Media** memilih gambar atau berkas dari [pustaka media](guide:panel/media), atau mengunggah yang baru.
- Field **Entri** dan **Term** menautkan ke entri lain atau ke kategori dan tag; cari berdasarkan judul.
- Field **Tautan** menerima alamat web, atau entri lain (pilih **Entri** agar mengikuti alamat entri itu meskipun berubah).
- Field **Grup**, **Repeater**, dan **Konten fleksibel** menampung beberapa field sekaligus; repeater dan konten fleksibel menambahkan baris atau blok, yang Anda seret ke urutannya lewat pegangannya. Setiap baris atau blok diberi nama dari teks pertamanya; klik namanya untuk melipatnya (**Lipat semua** melipat seluruh daftar), dan matikan **Tampil di situs** untuk menyimpannya di sini tanpa menampilkannya di halaman.

Kartu-kartu di penyunting (grup, **SEO**, dan kartu di kanan) bisa dilipat dengan mengeklik judulnya. Panel mengingat kartu mana yang Anda lipat, dan membuka sendiri kartu yang field di dalamnya bermasalah.

## Draf dan penerbitan

Setiap entri memiliki **draf**, yang Anda sunting, dan versi **tayang**, yang dilihat pengunjung. Versi tayang hanya berubah saat Anda menerbitkan.

- **Terbitkan** menayangkan draf di situs web. Untuk entri yang sudah tayang, tombolnya bertuliskan **Terbitkan perubahan**; bertuliskan **Terbit** jika tidak ada yang baru.
- Kartu **Status** di samping isian berisi **Tanggal terbit**: pilih tanggal dan jam (menurut zona waktu Anda, format 24 jam: ketik `14:30`) lalu tekan **Jadwalkan**; entri akan tayang saat itu, dan sampai waktunya statusnya **Terjadwal**. Tanggal yang sudah lewat langsung menerbitkan, dengan tanggal tersebut (untuk memundurkan tanggal tulisan). Pada entri yang sudah tayang atau terjadwal, ubah tanggalnya lalu tekan **Ubah tanggal** (atau **Jadwalkan ulang**): entri diterbitkan lagi dengan tanggal itu, beserta isi penyunting; tanggal yang akan datang menarik entri dari situs sampai waktunya. **Batalkan terbit** juga ada di sana.
- Panah di sebelah **Terbitkan** juga berisi **Terbitkan pada tanggal tertentu…** (pemilih tanggal dimulai dari besok; tanggal yang sudah lewat meminta konfirmasi dulu). Selama entri terjadwal, tombolnya bertuliskan **Terjadwal …**: tekan untuk mengganti tanggal; panahnya juga berisi **Terbitkan sekarang** dan **Batalkan jadwal (kembali ke draf)**.
- **Batalkan terbit** (di menu yang sama) menarik entri dari situs web; entri kembali menjadi draf. Jika diterbitkan lagi, tanggal aslinya tetap dipakai.

Kartu **Status** di kanan menunjukkan apakah entri masih draf, terjadwal, atau terbit (dan sejak kapan), dan memberi peringatan *Draf memiliki perubahan yang belum ditampilkan di situs.* jika draf berisi perubahan yang belum tampil di situs.

> [!NOTE]
> Jika peran Anda bisa menulis tetapi tidak bisa menerbitkan (misalnya peran *author*), Anda menyimpan draf dan orang lain yang menerbitkannya. Saat draf siap, klik **Ajukan untuk ditinjau**: draf disimpan, semua orang yang bisa menerbitkannya menerima email, dan draf muncul di **Menunggu tinjauan** pada dasbor mereka. Entri menampilkan lencana **Menunggu tinjauan** sampai ada yang menerbitkannya. Berubah pikiran? **Tarik permintaan** di kartu Status menarik kembali permintaannya.
>
> Jika Anda bisa menerbitkan, draf yang menunggu tinjauan Anda punya **Kembalikan…** di kartu Status: tulis apa yang perlu diubah (opsional) dan penulisnya menerimanya lewat email. Permintaannya dihapus dan drafnya tetap seperti sekarang, untuk diperbaiki lalu diajukan lagi.

## Melihat hasil kerja Anda di situs

- **Pratinjau** membuka draf yang tersimpan seperti tampilannya nanti di situs, di tab baru. Simpan dulu: pratinjau menampilkan yang tersimpan, bukan yang ada di layar Anda. Tautan pratinjau berlaku 30 menit, dan siapa pun yang Anda kirimi bisa membukanya selama itu; pita gelap di bagian atas menandai bahwa itu pratinjau. Koleksi yang entrinya tidak punya halaman sendiri (misalnya testimoni) tidak punya Pratinjau.
- **Lihat halaman** membuka halaman yang tayang.
- Jika peran Anda boleh melihat draf di situs, halaman tayang yang punya perubahan belum terbit menampilkan spanduk kecil selama Anda masuk, dengan **View the draft**. Pengunjung tidak pernah melihatnya.

## Pengaturan halaman

Kartu **Pengaturan halaman** di kanan berlaku untuk semua bahasa. Isinya disimpan bersama draf (**Simpan draf**, **Terbitkan**, Ctrl+S), kecuali blueprint, yang punya tombolnya sendiri:

- **Induk**: di koleksi yang entrinya bertingkat (seperti halaman di bawah halaman), entri tempat entri ini berada; bisa juga dipilih saat membuat entri. Dipakai untuk jejak halaman dan sub-menu; alamat webnya tidak berubah.
- **Blueprint**: jika koleksi menawarkan lebih dari satu susunan field (misalnya halaman biasa atau halaman promosi), susunan yang dipakai entri ini. Menggantinya tetap menyimpan semua nilai: field yang ada di keduanya mempertahankan isinya, dan sisanya disimpan tersembunyi dan muncul lagi jika Anda kembali. Simpan draf dulu, lalu tekan **Ganti blueprint**: penyunting dimuat ulang dengan field yang baru.
- **Template**: desain lain khusus untuk entri ini, jika developer membuatnya. Kosongkan untuk desain koleksi. **File yang mana?** di bawahnya menampilkan, untuk developer, file yang dicoba berurutan dan menandai yang dipakai.
- **Terima komentar baru**: di koleksi yang memiliki komentar, matikan untuk menutup komentar entri ini (komentar yang sudah disetujui tetap tampil). **Komentar** membuka komentar entri ini.

## Komentar

Di koleksi yang memiliki komentar, kartu **Komentar** menampilkan berapa komentar entri ini yang menunggu, disetujui, atau spam, dan lima yang terbaru, dengan **Setujui**, **Spam**, dan **Balas** jika peran Anda memoderasi komentar. Tautannya membuka [halaman komentar](guide:website/comments) yang hanya berisi komentar entri ini.

## Dipakai oleh

Kartu **Dipakai oleh** menampilkan konten lain yang menautkan ke entri ini (entri lain, term, global), beserta field yang menautkannya. Periksa sebelum membuang entri ke tempat sampah: tautan ke entri ini akan menjadi kosong.

## Revisi

Setiap penerbitan menyimpan sebuah **revisi**: salinan dari yang diterbitkan, beserta tanggal dan siapa yang menerbitkannya. Kartu **Revisi** menampilkannya beserta field yang diubah tiap revisi; **Bandingkan** menampilkan revisi di samping draf yang tersimpan, field demi field; **Pulihkan** memuat revisi ke dalam draf, sehingga Anda bisa memeriksanya dan menerbitkan saat siap. Berubah pikiran? **Batalkan pemulihan** mengembalikan draf Anda sebelumnya (sampai Anda keluar). Disimpan 50 revisi terakhir untuk setiap bahasa.

## Tindakan lain

- Tombol **⋯** di samping **Simpan draf** berisi aksi lainnya.
- **Duplikat** menyalin entri, dalam semua bahasa, sebagai draf baru berjudul "… (copy)". Selama belum pernah diterbitkan, mengganti judulnya ikut mengganti slug-nya (kecuali Anda mengetik slug sendiri).
- **Ubah blueprint** membuka blueprint entri (field-nya), jika peran Anda boleh mengubah blueprint.
- **Pindahkan ke tempat sampah** membuang entri: entri hilang dari situs web dan dari daftar, dalam semua bahasa, dan bisa dipulihkan. Jika dipakai konten lain, panel menyebutkan di mana terlebih dahulu.
- Di tempat sampah, entri memiliki **Pulihkan** dan **Hapus permanen** (menghapus semuanya, dalam semua bahasa, beserta revisinya; tidak bisa dibatalkan).

## Jika orang lain sedang menyunting

Hanya satu orang yang bisa menyunting entri dalam satu bahasa pada satu waktu. Jika rekan sedang membukanya, Anda bisa memilih **Hanya lihat** atau **Ambil alih** (lihat [Bekerja dengan aman](guide:panel/welcome#bekerja-dengan-aman)). Jika ia menyimpan setelah Anda membukanya, pilih **Muat versi mereka** atau **Tetap simpan versi saya**.

## Halaman daftar

Sebuah koleksi bisa memiliki **halaman daftar** yang menampilkan entrinya di situs web (misalnya `/blog`). Kata-katanya sendiri (pengantar, judul) serta pengaturan pencarian dan berbaginya disunting lewat **Ubah halaman daftar** di menu **⋮** di atas daftar entri, dan langsung tayang saat disimpan (tidak ada draf). Setiap bahasa punya kata-katanya sendiri: kode bahasa di bagian atas menunjukkan bahasa yang sedang Anda sunting dan bahasa yang sudah punya kata-katanya sendiri (tanda centang), dengan baris seperti "Menyunting: English (utama) — beralih untuk menyunting Bahasa Indonesia"; klik sebuah kode untuk beralih.

> [!TECHNICAL]
> Koleksi, alamat, dan template-nya diatur di bawah Struktur. Lihat [Collections and entries](docs:cms/collections) dan [The site](docs:cms/site).
