# Komentar

Komentar memungkinkan pengunjung berdiskusi tentang entri Anda: mereka dapat mengomentari artikel dan saling membalas. Anda menentukan apakah komentar langsung tampil atau menunggu persetujuan, lalu memoderasinya di admin: menyetujui, membalas, mengedit, menandai sebagai spam, atau menghapus.

## Mengaktifkan komentar untuk koleksi

Komentar diaktifkan per koleksi, misalnya untuk *Articles* tetapi tidak untuk *Pages*. Biasanya ini dilakukan oleh pengelola situs.

1. Buka **Manage → Collections**, lalu klik koleksinya.
2. Di kartu **Pages & URLs**, pastikan **Each entry has its own page** tercentang. Komentar memerlukan halaman untuk ditampilkan.
3. Centang **Allow comments**.
4. Klik **Save**.

Setelah setidaknya satu koleksi mengizinkan komentar, menu **Comments** muncul di sidebar pada grup **Content**.

> [!TECHNICAL]
> Utas komentar hanya tampil jika template entri memuat `<x-sunrice::comments :entry="$entry" />`. Template `show` bawaan sudah memuatnya. Lihat [Comments](docs:comments.md#showing-comments) dan [Blade components](docs:blade-components.md#x-sunricecomments).

## Pengaturan komentar

Aturan komentar untuk seluruh situs ada di **Manage → Settings**, pada tab **General**, di kartu **Comments**. Ubah pengaturannya lalu klik **Save settings**.

- **New comments**: cara memoderasi komentar baru.
  - **Hold a commenter's first comment for approval** (bawaan): komentar pertama seseorang menunggu persetujuan; setelah salah satu komentarnya disetujui, komentar berikutnya langsung tampil.
  - **Hold every comment for approval**: setiap komentar menunggu persetujuan.
  - **Publish comments right away**: komentar langsung tampil.

  Komentar dari orang yang berhak memoderasi selalu langsung terbit.
- **Only signed-in users can comment**: hanya pengguna yang masuk (login) yang dapat berkomentar; tamu tetap dapat membaca komentar tetapi tidak melihat formulirnya.
- **Ask for a captcha**: pengunjung harus membuktikan bahwa mereka bukan robot. Memakai captcha yang sama dengan formulir, dan tetap abu-abu sampai captcha disiapkan.
- **Rate limit**: berapa komentar yang dapat dikirim satu pengunjung dalam sekian menit (bawaan 3 setiap 1 menit).
- **Close comments after (days)**: hentikan komentar baru pada entri yang sudah terbit lebih lama dari jumlah hari ini. Kosong berarti tidak pernah. Komentar yang sudah ada tetap terlihat.
- **Reply levels shown**: seberapa dalam balasan ditampilkan menjorok di situs (bawaan 3). Balasan yang lebih dalam disejajarkan pada tingkat terakhir agar utas tetap mudah dibaca di ponsel.
- **Email moderators about new comments**: mengirim email untuk setiap komentar baru, dengan tautan untuk menyetujuinya. Pilih **Roles** (peran) penerimanya (tanpa centang berarti semua orang yang berhak memoderasi komentar) dan tambahkan alamat lain di **Also send to**. Komentar dari moderator sendiri tidak memicu email ini.
- **Let commenters get an email when someone replies**: menambahkan kotak "Email me when someone replies" pada formulir komentar. Setiap email berisi tautan untuk berhenti berlangganan.

> [!TECHNICAL]
> Email dikirim melalui antrean, jadi queue worker harus berjalan ([Mail](docs:mail.md#queue-worker)). Kunci captcha diisi di `.env` ([Forms](docs:forms.md#captcha)). Spam dihapus otomatis setelah 30 hari oleh scheduler (`sunrice.comments.prune_spam_after_days` di `config/sunrice.php`).

## Memoderasi komentar

Buka **Content → Comments**. Semua komentar ditampilkan, yang terbaru di atas, dengan tab:

- **All**: komentar yang menunggu dan yang sudah disetujui.
- **Pending**: menunggu persetujuan.
- **Approved**: sudah disetujui dan tampil di situs.
- **Spam**: ditandai sebagai spam.
- **Trash**: sudah dibuang, tetapi belum dihapus permanen.

Setiap tab menampilkan jumlah komentarnya. Gunakan **Search text, name or email…** untuk mencari komentar. Jika beberapa koleksi memiliki komentar, daftar koleksi (**All collections**) menampilkan komentar dari satu koleksi saja. Jika Anda datang dari sebuah entri atau dari email moderator, hanya komentar entri itu yang ditampilkan ("On" diikuti judul entri); klik tanda silang kecil untuk melihat komentar semua entri lagi.

Setiap komentar menampilkan penulis (dengan lencana **User** jika ia login), tanggal, lencana status, entri tempatnya berada, komentar yang dibalasnya, dan bahasanya. Ikon tautan (**View on the site**) membukanya di halaman situs.

### Tindakan pada satu komentar

- **Approve**: menerbitkan komentar yang menunggu atau yang ditandai spam.
- **Unapprove**: mengembalikan komentar yang sudah disetujui ke status menunggu.
- **Spam**: menandainya sebagai spam. Komentar hilang dari situs.
- **Reply**: ketik balasan Anda lalu klik **Post reply**. Balasan langsung terbit atas nama Anda, bahkan jika entri sudah ditutup. Membalas komentar yang menunggu sekaligus menyetujuinya.
- **Edit**: perbaiki salah ketik atau hapus tautan, lalu klik **Save**.
- **Trash**: menghapusnya dari situs dan memindahkannya ke tab **Trash**.
- **Restore** (di **Trash**): mengembalikannya.
- **Delete forever** (di **Trash**): menghapusnya secara permanen. Balasannya tetap ada, tanpa komentar tersebut.

### Tindakan massal

1. Centang komentar yang diinginkan, atau centang **Select all**.
2. Klik **Approve**, **Unapprove**, **Spam**, atau **Trash** (di tab **Trash**: **Restore** atau **Delete forever**).

> [!WARNING]
> **Delete forever** tidak dapat dibatalkan. Membuang dan menghapus komentar memerlukan izin menghapus komentar; lihat [Pengguna dan peran](users-roles.md).

## Komentar di editor entri

Saat Anda mengedit entri dalam koleksi yang memiliki komentar, editor menampilkan kartu **Comments**. Judulnya menunjukkan jumlah komentar yang disetujui, menunggu, dan spam, dan kartu ini menampilkan komentar terbaru entri tersebut dengan tindakan yang sama seperti di atas. Tindakan ini tidak memuat ulang editor, jadi perubahan yang belum disimpan tetap aman. Jika komentarnya lebih banyak, klik **See all … comments** untuk membukanya di **Content → Comments**.

### Menutup komentar pada satu entri

Nonaktifkan **Accept new comments on this entry** di kartu **Comments**. Perubahan langsung berlaku tanpa perlu menyimpan entri. Pengunjung tetap melihat komentar yang sudah disetujui, tetapi formulirnya diganti dengan tulisan "Comments are closed." (dalam bahasa pengunjung). Aktifkan lagi untuk membukanya kembali.

## Yang dilihat pengunjung

Di bawah entri, pengunjung melihat komentar yang sudah disetujui, yang terlama di atas, dengan balasan bertingkat di bawahnya, serta formulir untuk menulis komentar baru.

- Tamu mengisi nama dan email (email tidak pernah ditampilkan). Pengguna yang login berkomentar atas namanya sendiri.
- Setiap komentar memiliki tautan balas yang membuka formulir di bawahnya.
- Setelah mengirim, pengunjung melihat pesan bahwa komentarnya sudah terbit atau, jika menunggu persetujuan, bahwa komentarnya akan tampil setelah disetujui.
- Komentar berupa teks biasa; tautan otomatis dapat diklik.
- Jika hanya pengguna yang login yang boleh berkomentar, tamu melihat ajakan untuk login sebagai pengganti formulir.

Teks di situs tampil dalam bahasa pengunjung. Semua bahasa sebuah entri berbagi satu utas komentar, dan setiap komentar mencatat bahasa penulisannya.
