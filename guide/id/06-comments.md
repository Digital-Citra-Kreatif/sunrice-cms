# Komentar

Pengunjung bisa mengomentari entri dan saling membalas. Moderator menyetujui, menjawab, dan menghapus komentar di **Comments** di bawah Content.

Komentar dinyalakan per koleksi oleh pengelola situs (Structure → Collections, *Allow comments*), dan aturannya (siapa boleh berkomentar, apakah komentar menunggu persetujuan) ada di **Settings → Comments** (lihat [Pengaturan situs](guide:website/settings#comments)).

## Memoderasi

Tab mengelompokkan komentar berdasarkan statusnya: **All** (menunggu dan disetujui), **Pending** (menunggu persetujuan), **Approved** (disetujui), **Spam**, dan **Trash** (tempat sampah). Cari berdasarkan teks, nama, atau email, atau saring per koleksi. Setiap komentar menampilkan entrinya, komentar yang dibalasnya (jika berupa balasan), dan bahasanya.

Untuk setiap komentar:

- **Approve** menampilkannya di situs web; **Unapprove** menyembunyikannya lagi.
- **Spam** memindahkannya ke tab Spam. Spam terhapus otomatis setelah beberapa waktu.
- **Reply** menjawabnya, langsung tayang atas nama Anda. Membalas komentar yang sedang menunggu sekaligus menyetujuinya.
- **Edit** memperbaiki salah ketik atau menghapus tautan.
- **Trash** memindahkannya ke tab Trash, tempat **Restore** mengembalikannya dan **Delete for good** menghapusnya selamanya. Balasan untuk komentar yang dihapus tetap ada, naik satu tingkat.

Centang beberapa komentar untuk menyetujui, menandai sebagai spam, atau membuangnya sekaligus.

## Menutup komentar pada satu entri

Di penyunting entri, **Page settings → Accept new comments** menutup atau membuka komentar entri itu. Komentar yang sudah disetujui tetap tampil; pengunjung hanya tidak bisa menambah yang baru. Tautan **Comments**-nya membuka daftar moderasi untuk entri itu. Komentar juga bisa tertutup sendiri beberapa hari setelah terbit, jika diatur di Settings → Comments.

## Email

Moderator menerima email untuk setiap komentar baru, dengan tautan ke komentar itu. Pemberi komentar yang memintanya menerima email saat ada yang membalas, dengan tautan untuk berhenti menerima email tersebut.

> [!TIP]
> Komentar pertama seseorang biasanya menunggu persetujuan; setelah Anda menyetujui satu, komentar berikutnya langsung tampil. Komentar dari moderator selalu langsung tampil.

> [!TECHNICAL]
> Template menampilkan komentar dengan `<x-sunrice-cms::comments :entry="$entry" />`. Lihat [Comments](docs:cms/comments).
