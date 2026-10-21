# Entri

Entri adalah isi situs web: halaman, artikel, produk, acara. Setiap entri termasuk dalam satu **koleksi**, dan field koleksi itulah yang menentukan apa yang Anda isi. Buka **Entries** di bawah Content untuk mengerjakannya.

## Daftar entri

Daftar menampilkan satu koleksi dalam satu waktu; pilih koleksi lain lewat menu di samping judul. Anda hanya melihat koleksi yang diizinkan peran Anda.

- **Search** mencari entri berdasarkan judul atau slug; ketik `#12` untuk menemukan entri bernomor 12.
- **Status** menampilkan hanya **Drafts** (draf), **Published** (terbit), **Scheduled** (terjadwal, tayang nanti), atau **Trash** (tempat sampah).
- Saring berdasarkan penulis, term (misalnya kategori), dan **Language**: daftar menampilkan judul dan status dalam bahasa tersebut.
- Klik judul kolom untuk mengurutkan. **Columns** memilih kolom yang tampil, termasuk beberapa field entri itu sendiri (harga, tanggal…). Panel mengingat pilihan kolom dan jumlah baris per halaman Anda.
- **Go to** mengarah ke hal yang mungkin Anda perlukan berikutnya: halaman daftar koleksi, term-nya, pengaturannya, dan blueprint-nya, sesuai izin peran Anda.
- **Export CSV** mengunduh daftar sesuai filter, urutan, dan bahasanya, semua halamannya, untuk dibuka di spreadsheet. Ini membutuhkan izin tersendiri: bisa melihat daftar belum berarti boleh mengunduhnya.

Filter tersimpan di alamat halaman, jadi Anda bisa menyimpan tampilan sebagai markah atau mengirimkannya ke rekan.

### Beberapa sekaligus

Centang beberapa entri (atau kotak di atas untuk seluruh halaman) untuk **Publish** (terbitkan), **Unpublish** (tarik dari situs), atau **Move to the trash** (pindahkan ke tempat sampah) sekaligus. Tepat setelah membuang, pesannya punya tombol **Undo** (batalkan). Di tempat sampah, baris bertanda **Trashed** dan masing-masing punya tombol **Restore** (pulihkan); yang dicentang bisa dipulihkan atau **Delete for good** (hapus selamanya) sekaligus. Entri yang tidak boleh Anda ubah, atau yang belum bisa diterbitkan (misalnya ada field wajib yang kosong), dilewati, dan panel menyebutkan jumlahnya.

### Mengurutkan entri

Di koleksi dengan *urutan manual*, klik **Reorder** di atas daftar, seret setiap entri ke posisinya lewat pegangannya (atau dengan papan ketik: fokus ke pegangan, tekan Spasi, pindahkan dengan tombol panah, tekan Spasi lagi), lalu klik **Done**. Di koleksi yang entrinya bertingkat, entri berpindah di antara entri sejajarnya. Panah **Order** (**Move up** dan **Move down**) juga memindahkan satu entri satu posisi, saat daftar dalam urutannya sendiri, tanpa filter atau pencarian. Koleksi lain menampilkan entri terbaru lebih dulu (jika bertanggal) atau menurut judul.

## Menulis entri

1. Klik **New entry**.
2. Ketik **Title** (judul). **Slug**, bagian alamat web entri (`/blog/tulisan-pertama-saya`), dibuat dari judul jika dibiarkan kosong; hanya huruf kecil, angka, dan tanda hubung.
3. Isi field-field-nya. Field wajib ditandai; field yang keliru disebutkan namanya saat Anda menyimpan.
4. Klik **Create draft**.

Selanjutnya, **Save draft** menyimpan pekerjaan Anda (atau tekan **Ctrl S** / **⌘ S**). Menyimpan draf tidak pernah mengubah situs web.

### Field yang akan Anda temui

- **Rich text** memiliki bilah alat untuk judul, tebal, miring, daftar, kutipan, tautan, dan gambar dari pustaka media.
- Field **Media** memilih gambar atau berkas dari [pustaka media](guide:panel/media), atau mengunggah yang baru.
- Field **Entries** dan **Terms** menautkan ke entri lain atau ke kategori dan tag; cari berdasarkan judul.
- Field **Link** menerima alamat web, atau entri lain (pilih **Entry** agar mengikuti alamat entri itu meskipun berubah).
- Field **Group**, **Repeater**, dan **Flexible** menampung beberapa field sekaligus; repeater dan flexible menambahkan baris atau blok, yang Anda seret ke urutannya lewat pegangannya. Setiap baris atau blok diberi nama dari teks pertamanya; klik namanya untuk melipatnya (**Collapse all** melipat seluruh daftar), dan matikan **Visible on site** untuk menyimpannya di sini tanpa menampilkannya di halaman.

Kartu-kartu di penyunting (group, **Search and sharing**, dan kartu di kanan) bisa dilipat dengan mengeklik judulnya. Panel mengingat kartu mana yang Anda lipat, dan membuka sendiri kartu yang field di dalamnya bermasalah.

## Draf dan penerbitan

Setiap entri memiliki **draf**, yang Anda sunting, dan versi **tayang**, yang dilihat pengunjung. Versi tayang hanya berubah saat Anda menerbitkan.

- **Publish** menayangkan draf di situs web. Untuk entri yang sudah tayang, tombolnya bertuliskan **Publish changes**; bertuliskan **Published** jika tidak ada yang baru.
- Panah di sebelahnya berisi **Publish on a date…**: pilih tanggal dan jam (menurut zona waktu Anda) dan entri akan tayang saat itu. Sampai waktunya, statusnya **Scheduled**. Tanggal yang sudah lewat langsung menerbitkan, dengan tanggal tersebut.
- **Unpublish** (di menu yang sama) menarik entri dari situs web; entri kembali menjadi draf. Jika diterbitkan lagi, tanggal aslinya tetap dipakai.

Kartu **Status** di kanan menunjukkan apakah entri masih draf, terjadwal, atau terbit (dan sejak kapan), dan memberi peringatan jika *The draft has changes the site doesn't show yet* (draf berisi perubahan yang belum tampil di situs).

> [!NOTE]
> Jika peran Anda bisa menulis tetapi tidak bisa menerbitkan (misalnya peran *author*), Anda menyimpan draf dan orang lain yang menerbitkannya. Saat draf siap, klik **Submit for review** (ajukan untuk ditinjau): draf disimpan, semua orang yang bisa menerbitkannya menerima email, dan draf muncul di **Waiting for review** pada dasbor mereka. Entri menampilkan lencana **Waiting for review** sampai ada yang menerbitkannya.

## Melihat hasil kerja Anda di situs

- **Preview** membuka draf yang tersimpan seperti tampilannya nanti di situs, di tab baru. Simpan dulu: pratinjau menampilkan yang tersimpan, bukan yang ada di layar Anda. Tautan pratinjau berlaku 30 menit, dan siapa pun yang Anda kirimi bisa membukanya selama itu.
- **View** membuka halaman yang tayang.
- Jika peran Anda boleh melihat draf di situs, halaman tayang yang punya perubahan belum terbit menampilkan spanduk kecil selama Anda masuk, dengan **View draft**. Pengunjung tidak pernah melihatnya.

## Pengaturan halaman

Kartu **Page settings** di kanan disimpan tersendiri, untuk semua bahasa, dengan **Save settings**:

- **Parent** (induk): di koleksi yang entrinya bertingkat (seperti halaman di bawah halaman), entri tempat entri ini berada. Dipakai untuk jejak halaman dan sub-menu; alamat webnya tidak berubah.
- **Blueprint**: jika koleksi menawarkan lebih dari satu susunan field (misalnya halaman biasa atau halaman promosi), susunan yang dipakai entri ini. Menggantinya tetap menyimpan semua nilai: field yang ada di keduanya mempertahankan isinya, dan sisanya disimpan tersembunyi dan muncul lagi jika Anda kembali. Penyunting dimuat ulang dengan field yang baru.
- **Template**: desain lain khusus untuk entri ini, jika developer membuatnya. Kosongkan untuk desain koleksi.
- **Accept new comments**: di koleksi yang memiliki komentar, matikan untuk menutup komentar entri ini (komentar yang sudah disetujui tetap tampil). **Comments** membuka komentar entri ini.

## Komentar

Di koleksi yang memiliki komentar, kartu **Comments** menampilkan berapa komentar entri ini yang menunggu, disetujui, atau spam, dan lima yang terbaru, dengan **Approve**, **Spam**, dan **Reply** jika peran Anda memoderasi komentar. Tautannya membuka [halaman komentar](guide:website/comments) yang hanya berisi komentar entri ini.

## Dipakai oleh

Kartu **Used by** menampilkan konten lain yang menautkan ke entri ini (entri lain, term, global), beserta field yang menautkannya. Periksa sebelum membuang entri ke tempat sampah: tautan ke entri ini akan menjadi kosong.

## Revisi

Setiap penerbitan menyimpan sebuah **revisi**: salinan dari yang diterbitkan, beserta tanggalnya. Kartu **Revisions** menampilkannya; **Restore** memuat revisi ke dalam draf, sehingga Anda bisa memeriksanya dan menerbitkan saat siap. Berubah pikiran? **Undo the restore** mengembalikan draf Anda sebelumnya (sampai Anda keluar). Disimpan 50 revisi terakhir untuk setiap bahasa.

## Tindakan lain

- **Duplicate** menyalin entri, dalam semua bahasa, sebagai draf baru berjudul "… (copy)".
- Tombol tempat sampah **memindahkan entri ke tempat sampah**: entri hilang dari situs web dan dari daftar, dalam semua bahasa, dan bisa dipulihkan. Jika dipakai konten lain, panel menyebutkan di mana terlebih dahulu.
- Di tempat sampah, entri memiliki **Restore** dan **Delete for good** (menghapus semuanya, dalam semua bahasa, beserta revisinya; tidak bisa dibatalkan).

## Jika orang lain sedang menyunting

Hanya satu orang yang bisa menyunting entri dalam satu bahasa pada satu waktu. Jika rekan sedang membukanya, Anda bisa memilih **View only** atau **Take over** (lihat [Bekerja dengan aman](guide:panel/welcome#bekerja-dengan-aman)). Jika ia menyimpan setelah Anda membukanya, pilih **Load theirs** atau **Save mine anyway**.

## Halaman daftar

Sebuah koleksi bisa memiliki **halaman daftar** yang menampilkan entrinya di situs web (misalnya `/blog`). Kata-katanya sendiri (pengantar, judul) serta pengaturan pencarian dan berbaginya disunting lewat **Listing page** di atas daftar entri, dan langsung tayang saat disimpan (tidak ada draf).

> [!TECHNICAL]
> Koleksi, alamat, dan template-nya diatur di bawah Structure. Lihat [Collections and entries](docs:cms/collections) dan [The site](docs:cms/site).
