# Pengaturan situs

Situs web menambahkan empat bagian ke **Pengaturan** di bawah Administrasi: **Situs**, **Bahasa**, **Kode situs**, dan **Komentar**. Masing-masing adalah izin tersendiri, jadi mungkin Anda hanya melihat sebagian. Bagian milik panel (**Branding**, **Keamanan**, dan **Email**) dijelaskan di [Pengaturan](guide:panel/settings).

Pengaturan langsung berlaku begitu Anda mengeklik **Simpan**.

## Situs

- **Beranda**: halaman yang tampil di alamat utama situs web (`/`), dalam setiap bahasa tempat entri itu terbit; ketik untuk mencari halaman yang sudah tayang. Alamat entri itu sendiri dialihkan ke sana. Editor juga bisa menekan **Jadikan beranda** di kartu Status halaman tayang yang berada di akar situs web (seperti `/about`), lalu mengonfirmasinya.

**Situs**, untuk halaman yang tidak mengatur sendiri:

- **Nama situs**: ditambahkan ke judul halaman dan tampil saat halaman dibagikan. Kosong: nama yang diatur developer.
- **Deskripsi**: dipakai jika halaman tidak punya sendiri.
- **Deskripsi dalam bahasa lain** (jika ada lebih dari satu bahasa): satu kotak per bahasa, untuk halaman dalam bahasa itu. Kosong: deskripsi di atas.

Gambar berbagi, nama situs di judul beserta pemisahnya, akun X (Twitter), dan menyembunyikan seluruh situs dari mesin pencari ada di **Pengaturan → SEO** (tepat setelah Situs pada menu Pengaturan; lihat [SEO](guide:website/seo)).

**Structured data**: **Tambahkan structured data ke halaman** (biarkan menyala kecuali ada alasan), apakah situs diterbitkan oleh organisasi atau perorangan (**Diterbitkan oleh**), dan **Logo** organisasi (persegi atau melebar, minimal 112 piksel). Mesin pencari juga menyukai detail penerbit: **Nama** (kosong: nama situs), **Jenis organisasi** sebagai jenis schema.org yang ditulis satu kata (*LocalBusiness*, *RealEstateAgent*, *Restaurant*…), **Telepon**, **Alamat**, dan **Profil di tempat lain** (halaman Instagram, LinkedIn… penerbit, satu alamat per baris).

## Bahasa

**Bahasa konten** berisi bahasa tempat konten ditulis, satu baris untuk tiap bahasa: **kode** yang dipakai di alamat (`id`) dan **nama** yang dilihat editor (`Bahasa Indonesia`). **Tambah bahasa** menambah baris; mengetik kode akan menyarankan bahasa umum dan mengisi namanya. **Alamat** adalah awalan alamat halaman bahasa itu: kosongkan untuk yang biasa (bahasa utama di `/about`, yang lain di `/id/about`), atau isi sendiri, misalnya `en` agar bahasa utama juga di `/en/about`. Tanda panah mengubah urutan, dan × menghapus baris.

Baris pertama adalah **bahasa utama** (bertanda *Utama*), di alamat biasa (`/about`); bahasa lain diawali kodenya (`/id/about`). Sebelum disimpan, daftar ini menampilkan bahasa yang dipakai situs saat disiapkan. Panel menolak daftar kosong, baris yang bukan kode bahasa, dan bahasa yang tercantum dua kali.

- **Menambah bahasa** membuatnya tersedia di bilah bahasa penyunting. Tidak ada yang diterjemahkan otomatis.
- **Menghapus bahasa** menyembunyikan kontennya (tidak ada yang dihapus); tambahkan kembali untuk memunculkan kontennya lagi.
- **Mengganti bahasa utama** setelah ada konten: pakai **Jadikan … bahasa utama** di kartu **Bahasa utama** di bawah formulir. Semuanya dipindahkan dengan aman, dan alamat berubah (bahasa utama baru kehilangan kodenya, yang lama mendapatkannya; alamat lama dialihkan). Setiap entri dan term perlu terjemahan dalam bahasa utama yang baru terlebih dahulu; panel memberi tahu berapa yang belum.

Lihat [Bahasa](guide:website/languages) untuk bekerja dengan terjemahan.

## Kode situs

Kode dari layanan lain yang ditambahkan ke setiap halaman situs web apa adanya: analitik, widget obrolan, tag verifikasi dari mesin pencari. Tempelkan sesuai petunjuk layanannya: **Di dalam `<head>`**, **Di awal `<body>`**, atau **Di akhir `<body>`**.

> [!WARNING]
> Kode di sini berjalan di peramban setiap pengunjung. Tempelkan hanya kode dari layanan yang Anda percayai, dan berikan izin ini hanya kepada orang yang Anda percayai untuk seluruh situs web. Setiap perubahan dicatat dan diemailkan kepada penerima peringatan keamanan.

## Komentar

Cara kerja komentar pengunjung pada koleksi yang mengizinkannya (lihat [Komentar](guide:website/comments)):

| Pengaturan | |
| --- | --- |
| **Komentar baru** | **Tahan komentar pertama seseorang untuk disetujui** (pilihan umum: setelah Anda menyetujui satu komentar seseorang, komentar berikutnya langsung tampil), **Tahan setiap komentar untuk disetujui**, atau **Terbitkan komentar langsung**. Komentar dari moderator selalu langsung tayang. |
| **Hanya pengguna yang masuk yang bisa berkomentar** | Pengunjung tanpa akun bisa melihat komentar, tetapi tidak melihat formulirnya. |
| **Minta captcha** | Pemeriksaan "buktikan Anda manusia", jika developer sudah menyiapkannya. |
| **Komentar per pengunjung per menit** | Mencegah banjir komentar. |
| **Tutup komentar setelah (hari)** | Jumlah hari setelah tanggal terbit entri; kosong: tidak pernah. |
| **Tingkat balasan yang ditampilkan** | Balasan yang lebih dalam dijajarkan di tingkat terakhir, agar utas tetap mudah dibaca di ponsel. |
| **Email moderator tentang komentar baru** | Orang yang boleh memoderasi komentar, dan alamat di **Email juga ke**. |
| **Email juga ke peran** | Semua orang dengan peran ini juga. |
| **Izinkan pemberi komentar menerima email saat ada yang membalas** | Menambahkan kotak centang di formulir komentar. |

Spam terhapus otomatis setelah beberapa waktu.
