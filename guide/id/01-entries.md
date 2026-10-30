# Entri

Entri adalah isi situs web: halaman, artikel, produk, acara. Setiap entri termasuk dalam satu **koleksi**, dan field koleksi itulah yang menentukan apa yang Anda isi. Setiap koleksi punya item sendiri di bawah **Konten** pada sidebar (**Blog**, **Pages** …): buka untuk mengerjakan entrinya.

## Daftar entri

Daftar menampilkan satu koleksi dalam satu waktu; pilih koleksi lain lewat menu di samping judul. Anda hanya melihat koleksi yang diizinkan peran Anda.

- **Cari** mencari entri berdasarkan judul atau slug; ketik `#12` untuk menemukan entri bernomor 12.
- **Status** menampilkan hanya **Draf**, **Terbit**, **Terjadwal**, atau **Tempat sampah**.
- Saring berdasarkan penulis, term (misalnya kategori), dan **Bahasa**: daftar menampilkan judul dan status dalam bahasa tersebut. Jika ada lebih dari dua filter penulis dan taksonomi, atau taksonomi dengan banyak term (lebih dari 200, yang dicari dengan mengetik alih-alih menggulir daftar), semuanya dikumpulkan di **Filter**, yang menunjukkan berapa yang aktif.
- Klik judul kolom untuk mengurutkan. **Kolom** memilih kolom yang tampil, termasuk beberapa field entri itu sendiri (harga, tanggal…). Panel mengingat pilihan kolom dan jumlah baris per halaman Anda.
- Menu **⋮** di samping **Entri baru** mengarah ke hal yang mungkin Anda perlukan berikutnya: halaman daftar koleksi, term-nya, pengaturannya, dan blueprint-nya, sesuai izin peran Anda.
- **Ekspor CSV** (di menu **⋮**) mengunduh daftar sesuai filter, urutan, dan bahasanya, semua halamannya, untuk dibuka di spreadsheet. Ini membutuhkan izin tersendiri: bisa melihat daftar belum berarti boleh mengunduhnya.

Filter tersimpan di alamat halaman, jadi Anda bisa menyimpan tampilan sebagai markah atau mengirimkannya ke rekan.

### Beberapa sekaligus

Centang beberapa entri (atau kotak di atas untuk seluruh halaman) lalu pilih **Terbitkan**, **Batalkan terbit**, atau **Pindahkan ke tempat sampah** untuk semuanya sekaligus. Tepat setelah membuang, pesannya punya tombol **Urungkan**. Di tempat sampah, baris bertanda **Dibuang** dan masing-masing punya tombol **Pulihkan**; yang dicentang bisa **Pulihkan** atau **Hapus permanen** sekaligus. Entri yang tidak boleh Anda ubah, atau yang belum bisa diterbitkan (misalnya ada field wajib yang kosong), dilewati, dan panel menyebutkan jumlahnya.

### Mengurutkan entri

Di koleksi dengan *urutan manual*, klik **Urutkan** di atas daftar: semua entri koleksi tampil dalam satu daftar, dari halaman mana pun, masing-masing dengan nomornya. Seret setiap entri ke posisinya lewat pegangannya (atau dengan papan ketik: fokus ke pegangan, tekan Spasi, pindahkan dengan tombol panah, tekan Spasi lagi), lalu klik **Selesai**. Setiap pemindahan langsung tersimpan. Di daftar yang panjang, menu **⋯** pada entri lebih cepat: **Pindahkan ke paling atas**, **Pindahkan ke paling bawah**, atau **Pindahkan ke posisi…** lalu ketik angkanya (50 menaruhnya di urutan ke-50; angka melebihi yang terakhir menaruhnya paling belakang). Di koleksi yang entrinya bertingkat, daftar menampilkan susunan pohonnya (entri menjorok di bawah induknya) dan entri berpindah di antara entri sejajarnya, beserta isinya, jadi nomornya hanya menghitung entri sejajar itu; untuk menaruh entri di bawah entri lain, pilih **Induk**-nya di Pengaturan halaman. Koleksi dengan lebih dari 1.000 entri terlalu panjang untuk diseret: **Urutkan** memberi tahu hal itu, dan setiap baris tetap punya panah dan menu **⋯**.

Di daftarnya sendiri, panah di kolom **Urutan** memindahkan satu entri satu posisi ke atas atau ke bawah, dan **⋯** di sebelahnya punya **Pindahkan ke paling atas**, **Pindahkan ke paling bawah**, dan **Pindahkan ke posisi…** yang sama. Panah itu, juga **Urutkan**, tampil saat daftar dalam urutannya sendiri: tanpa pencarian, filter, atau pengurutan kolom (daftar memberi tahu jika salah satunya menyembunyikannya). Koleksi lain menampilkan entri terbaru lebih dulu (jika bertanggal) atau menurut judul.

## Menulis entri

1. Klik **Entri baru**.
2. Ketik **Judul**. **Slug**, bagian alamat web entri (`/blog/tulisan-pertama-saya`), dibuat dari judul jika dibiarkan kosong; hanya huruf kecil, angka, dan tanda hubung. Slug yang akan menaruh entri di alamat halaman daftar (atau halaman indeks taksonomi) ditolak, karena pengunjung di sana akan melihat halaman itu: pesannya menyebutkan halaman tersebut; slug yang dibuat dari judul menghindarinya (`buku-2`). Mengubah slug entri yang pernah diterbitkan memindahkan alamatnya: catatan di bawah isian memberi tahu bahwa alamat lama akan dialihkan ke alamat baru setelah Anda menerbitkan (atau, untuk entri yang sudah ditarik dari situs, bahwa alamat lama tidak akan berfungsi lagi kecuali pengalihan ditambahkan).
3. Isi field-field-nya. Field wajib ditandai; field yang keliru disebutkan namanya saat Anda menyimpan.
4. Klik **Buat draf**.

Selanjutnya, **Simpan draf** menyimpan pekerjaan Anda (atau tekan **Ctrl S** / **⌘ S**). Menyimpan draf tidak pernah mengubah situs web.

### Field yang akan Anda temui

- **Teks kaya** memiliki bilah alat untuk judul, tebal, miring, daftar, kutipan, tautan, dan gambar dari pustaka media. Klik gambar (atau pindah ke gambar dengan tombol panah lalu tekan Tab) untuk bilah alatnya sendiri: lebar (25, 50, 75, atau 100% dari teks), perataan (kiri atau kanan dengan teks mengalir di sampingnya, tengah, atau lebar penuh), **Gaya** yang ditawarkan situs Anda (misalnya Membulat atau Bayangan, boleh beberapa sekaligus; hanya bila pengembang Anda telah menyiapkannya), **Keterangan** yang tampil di bawah gambar di situs (kosongkan untuk menghapus keterangan), teks alt yang menjelaskan gambar kepada orang yang tidak dapat melihatnya, dan **Hapus gambar**. Klik lagi tombol yang sedang aktif untuk membatalkannya; Esc kembali ke teks. Di ponsel, gambar di samping teks tampil selebar layar di atasnya. Klik tautan (atau pilih teks lalu tekan **Tautan**) untuk bilah alat tautan, yang tampil seperti field Tautan: di **Tautan ke** pilih **Tautan** lalu ketik alamat (Enter menerapkannya, Esc kembali ke teks), atau **Entri**, **Term**, atau **Halaman daftar** lalu cari menurut judul; di bawahnya Anda dapat mengubah teks tautan. Tautan ke entri, term, atau halaman daftar menampilkan judulnya (→ Tentang kami · Entri) dan mengikuti alamatnya meskipun berubah; jika nanti dibuang ke tempat sampah atau tidak diterbitkan lagi, situs hanya menampilkan teks tautannya. Bilah alat itu juga memiliki **Buka di tab baru** (sudah tercentang untuk alamat web baru), **nofollow** (mesin pencari tidak mengikutinya), **sponsored** (tautan berbayar dan iklan), dan **ugc** (tautan dalam tulisan pengunjung): arahkan penunjuk ke masing-masing untuk melihat kegunaannya. Tautan selalu dibuka dengan aman (noopener noreferrer), jadi tidak ada yang perlu diatur untuk itu. Tombol terakhir membuka tautan untuk memeriksanya dan menghapusnya.
- Field **Media** memilih gambar atau berkas dari [pustaka media](guide:panel/media), atau mengunggah yang baru.
- Field **Entri** dan **Term** menautkan ke entri lain atau ke term (misalnya "topik pilihan"); cari berdasarkan judul. Kategori dan tag entri itu sendiri ada di kartu **Taksonomi** (di bawah).
- Field **Tautan** menuju alamat web, entri, halaman term, atau halaman daftar: pilih **Tautan**, **Entri**, **Term**, atau **Halaman daftar**, lalu ketik alamatnya atau cari menurut judul. Entri, term, dan halaman daftar tetap diikuti meskipun alamatnya berubah. Tambahkan teks tautan, lalu centang **Buka di tab baru** (sudah tercentang untuk alamat web baru) atau **nofollow**, **sponsored**, dan **ugc** (arahkan penunjuk ke masing-masing untuk melihat kegunaannya). Tautan yang dibuka di tab baru selalu dibuka dengan aman.
- Field **Grup**, **Repeater**, dan **Konten fleksibel** menampung beberapa field sekaligus; repeater dan konten fleksibel menambahkan baris atau blok, yang Anda seret ke urutannya lewat pegangannya. Baris atau blok baru dimulai dengan nilai bawaan field-fieldnya. Setiap baris atau blok diberi nama dari teks pertamanya; klik namanya untuk melipatnya (**Lipat semua** melipat seluruh daftar), dan matikan **Tampil di situs** untuk menyimpannya di sini tanpa menampilkannya di halaman.

Kartu-kartu di penyunting (grup, **SEO**, dan kartu di kanan) bisa dilipat dengan mengeklik judulnya. Panel mengingat kartu mana yang Anda lipat, dan membuka sendiri kartu yang field di dalamnya bermasalah.

## Draf dan penerbitan

Setiap entri memiliki **versi tayang**, yang dilihat pengunjung, dan **perubahan Anda**, yang Anda sunting dan simpan tanpa terlihat oleh pengunjung. Versi tayang hanya berubah saat Anda menerbitkan. Entri yang belum pernah diterbitkan adalah **draf**.

Bilah di bagian atas penyunting selalu menunjukkan keadaannya:

- **Belum diterbitkan**: hanya yang bisa menyunting yang melihatnya (belum pernah diterbitkan).
- **Diturunkan dari situs**: pernah diterbitkan, lalu dibatalkan terbitnya; hanya yang bisa menyunting yang melihatnya. **Terbitkan lagi** menayangkannya kembali dengan tanggalnya.
- **Terjadwal**: tayang pada tanggal yang ditunjukkan.
- **Tayang**: pengunjung melihat persis yang ada di penyunting.
- **Tayang, dengan perubahan yang belum diterbitkan**: Anda sudah menyimpan perubahan, tetapi pengunjung masih melihat versi yang diterbitkan pada tanggal yang ditunjukkan, oleh orang yang disebut. **Lihat halaman yang tayang** membuka yang dilihat pengunjung; **Bandingkan dengan yang tayang** menampilkan perubahan Anda di sampingnya, field demi field (kata yang dihapus dicoret, yang ditambahkan disorot); **Pratinjau perubahan** menampilkan perubahan Anda di situs; **Buang perubahan** membuang perubahan Anda dan mengembalikan versi tayang, setelah bertanya dulu. Field yang Anda ubah diberi tanda kecil **Berubah** di samping namanya.

Selama ada suntingan yang belum disimpan, bilah itu menambahkan *Ada suntingan yang belum disimpan*. Di daftar entri, entri tayang yang punya perubahan tersimpan diberi **Ada perubahan** di samping statusnya.

- **Terbitkan** menayangkan draf di situs web. Untuk entri yang sudah tayang, tombolnya bertuliskan **Terbitkan perubahan**; bertuliskan **Terbit** jika tidak ada yang baru.
- Kartu **Status** di samping isian berisi **Tanggal terbit**: pilih tanggal dan jam (menurut zona waktu Anda, format 24 jam: ketik `14:30`) lalu tekan **Jadwalkan**; entri akan tayang saat itu, dan sampai waktunya statusnya **Terjadwal**. Tanggal yang sudah lewat langsung menerbitkan, dengan tanggal tersebut (untuk memundurkan tanggal tulisan). Pada entri yang sudah tayang atau terjadwal, ubah tanggalnya lalu tekan **Ubah tanggal** (atau **Jadwalkan ulang**): entri diterbitkan lagi dengan tanggal itu, beserta isi penyunting; tanggal yang akan datang menarik entri dari situs sampai waktunya. **Batalkan terbit** juga ada di sana.
- Panah di sebelah **Terbitkan** juga berisi **Terbitkan pada tanggal tertentu…** (pemilih tanggal dimulai dari besok; tanggal yang sudah lewat meminta konfirmasi dulu). Selama entri terjadwal, tombolnya bertuliskan **Terjadwal …**: tekan untuk mengganti tanggal; panahnya juga berisi **Terbitkan sekarang** dan **Batalkan jadwal (kembali ke draf)**.
- **Batalkan terbit** (di menu yang sama) menarik entri dari situs web; entri kembali menjadi draf. Jika diterbitkan lagi, tanggal aslinya tetap dipakai.

Kartu **Status** di kanan menunjukkan apakah entri masih draf, terjadwal, atau tayang (dan sejak kapan), dengan **Ada perubahan** jika ada perubahan yang belum diterbitkan.

> [!NOTE]
> Jika peran Anda bisa menulis tetapi tidak bisa menerbitkan (misalnya peran *author*), Anda menyimpan draf dan orang lain yang menerbitkannya. Saat draf siap, klik **Ajukan untuk ditinjau**: draf disimpan, semua orang yang bisa menerbitkannya menerima email, dan draf muncul di **Menunggu tinjauan** pada dasbor mereka. Entri menampilkan lencana **Menunggu tinjauan** sampai ada yang menerbitkannya. Berubah pikiran? **Tarik permintaan** di kartu Status menarik kembali permintaannya.
>
> Jika Anda bisa menerbitkan, draf yang menunggu tinjauan Anda punya **Kembalikan…** di kartu Status: tulis apa yang perlu diubah (opsional) dan penulisnya menerimanya lewat email. Permintaannya dihapus dan drafnya tetap seperti sekarang, untuk diperbaiki lalu diajukan lagi.

## Melihat hasil kerja Anda di situs

- **Pratinjau perubahan** (**Pratinjau** untuk entri yang belum diterbitkan), di bilah atas, membuka yang Anda simpan seperti tampilannya nanti di situs, di tab baru. Simpan dulu: pratinjau menampilkan yang tersimpan, bukan yang ada di layar Anda. Pita gelap di bagian atas menandai bahwa itu pratinjau. Koleksi yang entrinya tidak punya halaman sendiri (misalnya testimoni) tidak punya pratinjau.
- **Bagikan tautan pratinjau…** di menu **⋯** memberi tautan yang sama untuk disalin dan dikirim ke orang yang tidak bisa masuk. Tautan berlaku 30 menit (dialognya menyebut sampai kapan); muat ulang penyunting untuk tautan baru.
- **Lihat halaman yang tayang** membuka halaman yang dilihat pengunjung.
- Jika peran Anda boleh melihat perubahan yang belum diterbitkan di situs, halaman tayang yang punya perubahan belum terbit menampilkan spanduk kecil **Perubahan belum terbit** selama Anda masuk, dengan **Lihat perubahan yang belum diterbitkan** (dan, selama Anda melihatnya, **Lihat halaman yang tayang**). Pengunjung tidak pernah melihatnya.

## Pengaturan halaman

Kartu **Pengaturan halaman** di kanan berlaku untuk semua bahasa. Isinya disimpan bersama draf (**Simpan draf**, **Terbitkan**, Ctrl+S), kecuali blueprint, yang punya tombolnya sendiri:

- **Induk**: di koleksi yang entrinya bertingkat (seperti halaman di bawah halaman), entri tempat entri ini berada; bisa juga dipilih saat membuat entri. Dipakai untuk jejak halaman dan sub-menu; alamat webnya tidak berubah.
- **Blueprint**: jika koleksi menawarkan lebih dari satu susunan field (misalnya halaman biasa atau halaman promosi), susunan yang dipakai entri ini. Menggantinya tetap menyimpan semua nilai: field yang ada di keduanya mempertahankan isinya, dan sisanya disimpan tersembunyi dan muncul lagi jika Anda kembali. Simpan draf dulu, lalu tekan **Ganti blueprint**: penyunting dimuat ulang dengan field yang baru.
- **Template**: desain lain khusus untuk entri ini, jika developer membuatnya: pilih dari daftar, atau ketik namanya. **Otomatis** memakai desain koleksi. Di bawahnya, file yang dipakai, dan **Bagaimana dipilih?** menampilkan, untuk developer, file yang dicoba berurutan.
- **Terima komentar baru**: di koleksi yang memiliki komentar, matikan untuk menutup komentar entri ini (komentar yang sudah disetujui tetap tampil). **Lihat komentar** membuka komentar entri ini.

## Taksonomi

Kartu **Taksonomi**, di bawah Pengaturan halaman, memberi entri term-nya: kategori, tag, atau topiknya. Ada satu pemilih untuk setiap taksonomi koleksinya (*Kategori*, *Tag* …), sama untuk semua taksonomi: term yang dipilih tampil sebagai chip, masing-masing dengan **×** untuk menghapusnya, dan **Pilih term…** (atau **Pilih satu term…** jika koleksi hanya mengizinkan satu; **Tambah…** atau **Ganti…** setelah ada yang dipilih) membuka daftar yang bisa dicari, dengan term di bawah term lain ditampilkan menjorok. Kartu ini hanya tampil jika koleksi punya taksonomi.

Term sama untuk semua bahasa entri, disimpan bersama draf, dan baru tampil di situs saat Anda menerbitkan, seperti perubahan lainnya: sampai saat itu kartunya bertanda **Berubah**, **Bandingkan dengan yang tayang** menampilkan term sebelum dan sesudahnya, dan **Buang perubahan** mengembalikan term yang tayang. Revisi menyimpan term saat diterbitkan, jadi memulihkannya juga mengembalikan term-nya. Penerjemah bisa melihat term, tetapi tidak bisa mengubahnya.

## Komentar

Di koleksi yang memiliki komentar, kartu **Komentar** menampilkan berapa komentar entri ini yang menunggu, disetujui, atau spam, dan lima yang terbaru, dengan **Setujui**, **Spam**, dan **Balas** jika peran Anda memoderasi komentar. Tautannya membuka [halaman komentar](guide:website/comments) yang hanya berisi komentar entri ini.

## Dipakai oleh

Kartu **Dipakai oleh** menampilkan konten lain yang menautkan ke entri ini (entri lain, term, global), beserta field yang menautkannya. Periksa sebelum membuang entri ke tempat sampah: tautan ke entri ini akan menjadi kosong.

## Revisi

Setiap penerbitan menyimpan sebuah **revisi**: salinan dari yang diterbitkan, beserta tanggal dan siapa yang menerbitkannya. Kartu **Revisi** menampilkannya beserta field yang diubah tiap revisi; **Bandingkan** menampilkan revisi di samping versi yang tayang (atau perubahan Anda, jika ada), field demi field, dengan nama di tiap sisi; **Pulihkan** memuat revisi ke dalam draf, sehingga Anda bisa memeriksanya dan menerbitkan saat siap. Berubah pikiran? **Batalkan pemulihan** mengembalikan draf Anda sebelumnya (sampai Anda keluar). Disimpan 50 revisi terakhir untuk setiap bahasa.

## Tindakan lain

- Tombol **⋯** di samping **Simpan draf** berisi aksi lainnya.
- **Duplikat** menyalin entri, dalam semua bahasa, sebagai draf baru berjudul "… (copy)", dengan term yang sama di kartu **Taksonomi**-nya (salinan baru tercantum di bawah term itu setelah Anda menerbitkannya). Selama belum pernah diterbitkan, mengganti judulnya ikut mengganti slug-nya (kecuali Anda mengetik slug sendiri).
- **Ubah blueprint** membuka blueprint entri (field-nya), jika peran Anda boleh mengubah blueprint.
- **Pindahkan ke tempat sampah** membuang entri: entri hilang dari situs web dan dari daftar, dalam semua bahasa, dan bisa dipulihkan. Jika dipakai konten lain, panel menyebutkan di mana terlebih dahulu.
- Di tempat sampah, entri memiliki **Pulihkan** dan **Hapus permanen** (menghapus semuanya, dalam semua bahasa, beserta revisinya; tidak bisa dibatalkan).

## Jika orang lain sedang menyunting

Hanya satu orang yang bisa menyunting entri dalam satu bahasa pada satu waktu. Jika rekan sedang membukanya, Anda bisa memilih **Hanya lihat** atau **Ambil alih** (lihat [Bekerja dengan aman](guide:panel/welcome#bekerja-dengan-aman)). Jika ia menyimpan setelah Anda membukanya, pilih **Muat versi mereka** atau **Tetap simpan versi saya**.

## Halaman daftar

Sebuah koleksi bisa memiliki **halaman daftar** yang menampilkan entrinya di situs web (misalnya `/blog`). Kata-katanya sendiri (pengantar, judul) serta pengaturan pencarian dan berbaginya disunting lewat **Ubah halaman daftar** di menu **⋮** di atas daftar entri, dan langsung tayang saat disimpan (tidak ada draf). Setiap bahasa punya kata-katanya sendiri: tab bahasa di bagian atas menunjukkan bahasa yang sedang Anda sunting, dan bahasa yang belum punya kata-katanya sendiri tampil pudar dengan tanda **+**; klik sebuah tab untuk beralih.

Pengelola situs juga melihat **Template**-nya di sana: desain yang dipakai halaman daftar, di semua bahasa. **Otomatis** memakai desain yang dibuat developer Anda untuknya; pilih yang lain dari daftar jika mereka membuat lebih dari satu. **Bagaimana dipilih?** menampilkan berkas template yang dicoba, untuk developer Anda. Halaman indeks sebuah taksonomi (**Halaman indeks** di menu **⋮** daftar istilahnya) punya pilihan yang sama, berlaku untuk semua halaman indeksnya.

> [!TECHNICAL]
> Koleksi, alamat, dan template-nya diatur di bawah Struktur. Lihat [Collections and entries](docs:cms/collections) dan [The site](docs:cms/site).
