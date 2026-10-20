# Kiriman formulir

Formulir di situs web (formulir kontak, permintaan penawaran, pendaftaran) mengirim isian pengunjung ke {panel}. Setiap pesan adalah sebuah **kiriman** (*submission*), disimpan di **Submissions** di bawah Content dan diemailkan kepada orang yang dipilih untuk formulir itu.

## Membaca kiriman

Pilih formulir lewat menu di samping judul (menampilkan jumlah kiriman masing-masing). Daftar menampilkan kapan setiap kiriman **Sent** (dikirim), yang terbaru lebih dulu, dan field-field pertama formulir.

Klik tanggalnya untuk membuka sebuah kiriman:

- semua field yang diisi pengunjung;
- berkas yang dikirimnya, sebagai tautan unduhan;
- bahasa halaman yang dipakainya;
- jika situs Anda menyimpannya: **IP address** pengunjung, **Browser** (peramban), dan halaman tempat ia mengirim (**Sent from**).

**Delete** menghapus kiriman (dan berkasnya) selamanya. **Export CSV** mengunduh semua kiriman formulir itu untuk dibuka di spreadsheet.

Anda hanya melihat formulir yang diizinkan peran Anda.

## Pemberitahuan email

Setiap kiriman baru diemailkan ke alamat dan peran yang diatur untuk formulir itu. Balas email tersebut untuk menjawab pengunjung: balasan dikirim ke alamat email yang diketiknya, jika formulir memintanya.

## Data pribadi

Kiriman berisi data pribadi. Bacalah hanya sejauh pekerjaan Anda memerlukannya, jangan meneruskannya lebih luas dari yang perlu, dan hapus yang tidak lagi diperlukan. Situs Anda mungkin menghapus kiriman lama secara otomatis setelah sejumlah hari tertentu.

> [!TECHNICAL]
> Formulir dibuat di Structure → Forms dengan blueprint untuk field-nya, dan dipasang di halaman dengan `<x-sunrice-cms::form handle="contact" />`. Penyimpanan data pengunjung diatur dengan `sunrice-cms.forms.visitor_details`, dan penghapusan otomatis dengan `sunrice-cms.forms.prune_after_days`. Lihat [Forms](docs:cms/forms).
