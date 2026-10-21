# Komentar

Pengunjung bisa mengomentari entri dan saling membalas. Moderator menyetujui, menjawab, dan menghapus komentar di **Komentar** di bawah Konten.

Komentar dinyalakan per koleksi oleh pengelola situs (Struktur → Koleksi, *Izinkan komentar*), dan aturannya (siapa boleh berkomentar, apakah komentar menunggu persetujuan) ada di **Pengaturan → Komentar** (lihat [Pengaturan situs](guide:website/settings#komentar)).

## Memoderasi

Tab mengelompokkan komentar berdasarkan statusnya: **Semua** (menunggu dan disetujui), **Menunggu** (menunggu persetujuan), **Disetujui**, **Spam**, dan **Tempat sampah**. Cari berdasarkan teks, nama, atau email, atau saring per koleksi atau per entri. Setiap komentar menampilkan entrinya, komentar yang dibalasnya (jika berupa balasan), dan bahasanya.

Untuk setiap komentar:

- **Setujui** menampilkannya di situs web; **Batalkan persetujuan** menyembunyikannya lagi.
- **Spam** memindahkannya ke tab Spam. Spam terhapus otomatis setelah beberapa waktu.
- **Balas** menjawabnya, langsung tayang atas nama Anda. Membalas komentar yang sedang menunggu sekaligus menyetujuinya.
- **Ubah** memperbaiki salah ketik atau menghapus tautan.
- **Tempat sampah** memindahkannya ke tab Tempat sampah; di sana **Pulihkan** mengembalikannya dan **Hapus permanen** menghapusnya selamanya. Balasan untuk komentar yang dihapus tetap ada, naik satu tingkat.

Centang beberapa komentar untuk menyetujui, menandai sebagai spam, atau membuangnya sekaligus.

## Menutup komentar pada satu entri

Di penyunting entri, **Pengaturan halaman → Terima komentar baru** menutup atau membuka komentar entri itu. Komentar yang sudah disetujui tetap tampil; pengunjung hanya tidak bisa menambah yang baru. Tautan **Komentar**-nya membuka daftar moderasi untuk entri itu. Kartu **Komentar** di penyunting juga menampilkan komentar terbaru entri itu, dengan **Setujui**, **Spam**, dan **Balas**. Komentar juga bisa tertutup sendiri beberapa hari setelah terbit, jika diatur di Pengaturan → Komentar.

## Email

Moderator menerima email untuk setiap komentar baru, dengan tautan ke komentar itu. Pemberi komentar yang memintanya menerima email saat ada yang membalas, dengan tautan untuk berhenti menerima email tersebut.

> [!TIP]
> Komentar pertama seseorang biasanya menunggu persetujuan; setelah Anda menyetujui satu, komentar berikutnya langsung tampil. Komentar dari moderator selalu langsung tampil.

> [!TECHNICAL]
> Template menampilkan komentar dengan `<x-sunrice-cms::comments :entry="$entry" />`. Lihat [Comments](docs:cms/comments).
