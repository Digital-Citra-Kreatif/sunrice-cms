# Formulir

Formulir memungkinkan pengunjung mengirimkan informasi kepada Anda: pesan kontak, permintaan penawaran, pendaftaran acara, atau lamaran kerja beserta CV. Anda menyusun formulir di admin, menentukan apa yang terjadi setelah formulir dikirim, dan membaca semua kiriman di satu tempat.

## Cara kerja formulir

- Setiap formulir memiliki **Title** (judul), **Handle** (nama yang dipakai situs untuk menemukannya, misalnya `contact`), dan daftar **kolom**.
- Saat pengunjung mengirim formulir, Sunrice memeriksanya (kolom wajib, format email, jenis file), menyimpannya sebagai **submission** (kiriman), dan dapat mengirimkannya ke email Anda.
- Letak dan tampilan formulir di situs ditentukan oleh desain situs.

Formulir ada di sidebar pada **Structure → Forms**. Daftarnya menampilkan **Title**, **Handle**, dan jumlah **Submissions** setiap formulir, dengan tombol **Submissions**, **Edit**, dan **Delete**.

## Membuat formulir

1. Buka **Structure → Forms**, lalu klik **New form**.
2. Di kartu **Details**, isi **Title** dan **Handle** (huruf kecil, misalnya `contact`).
3. Tambahkan kolom di kartu **Fields** (lihat di bawah).
4. Isi kartu **Settings** (lihat di bawah).
5. Klik **Save form**.

> [!NOTE]
> Handle tidak dapat diubah setelah formulir dibuat, karena desain situs merujuk kepadanya.

### Menambahkan dan menyusun kolom

1. Di kartu **Fields**, buka **Add field** dan pilih jenisnya:
   - **text**: satu baris, misalnya nama atau alamat email.
   - **textarea**: beberapa baris, misalnya pesan.
   - **number** (angka), **date** (tanggal), **toggle** (sakelar ya/tidak), dan **select** (daftar pilihan).
   - **file**: unggahan, misalnya CV atau foto.
2. Klik kolom baru untuk membukanya, lalu isi:
   - **Handle**: nama internal kolom, misalnya `email`.
   - **Label**: teks yang dilihat pengunjung, misalnya *Email Anda*.
   - **Required**: centang jika formulir tidak boleh dikirim tanpa kolom ini.
   - **Instructions**: petunjuk tambahan (opsional).
   - **Settings** sesuai jenis kolom. Kolom **select** memiliki **Options**, satu per baris dengan format `nilai|Label`, serta **Allow multiple** (boleh memilih lebih dari satu). Kolom **file** memiliki **Accepted file types** (centang kelompok seperti gambar atau PDF, atau ketik ekstensi lain) dan **Maximum file size** dalam MB.
3. Seret kolom melalui pegangannya (ikon titik-titik) untuk mengubah urutan.
4. Klik ikon tempat sampah untuk menghapus kolom.

> [!TIP]
> Menghapus kolom tidak menghapus isi yang sudah dikirim pengunjung: kiriman lama tetap menampilkan nilainya, dengan tanda "(removed field)".

### Pengaturan formulir

- **Notify emails (comma separated)**: alamat yang menerima email untuk setiap kiriman, dipisahkan koma, misalnya `kantor@example.com, sales@example.com`.
- **Success message**: teks yang dilihat pengunjung setelah mengirim formulir. Jika kosong, tampil "Thank you!" standar dalam bahasa pengunjung.
- **Redirect URL (optional)**: arahkan pengunjung ke halaman lain setelah mengirim, misalnya halaman terima kasih. Jika diisi, ini dipakai sebagai pengganti pesan sukses.
- **Require captcha**: meminta pengunjung membuktikan bahwa mereka bukan robot. Sakelar ini tetap abu-abu sampai captcha disiapkan di server.

## Melihat kiriman

1. Buka **Structure → Forms**, lalu klik judul formulir (atau tombol **Submissions**).
2. Tabel menampilkan nomor setiap kiriman, waktu **Submitted** (dikirim), dan satu kolom untuk setiap kolom formulir. Nilai yang panjang dipersingkat.
3. Klik sebuah kiriman untuk melihat seluruh isinya, beserta bahasa, alamat IP, dan browser pengirim.
4. Untuk kolom file, klik **Download** untuk mengunduh file yang diunggah. File unggahan bersifat privat: hanya dapat diunduh dari admin.

### Mencari kiriman

Ketik di kotak **Search…** lalu tekan Enter atau klik **Filter**. Pencarian dilakukan pada nilai yang dikirim, sehingga Anda dapat menemukan kiriman berdasarkan nama, alamat email, atau kata dalam pesan.

### Ekspor ke CSV

Klik **Export CSV** untuk mengunduh semua kiriman formulir sebagai file spreadsheet yang dapat dibuka di Excel, Google Sheets, atau Numbers. Hasil ekspor berisi semua kiriman, bukan hanya yang cocok dengan pencarian Anda.

### Menghapus kiriman

Klik ikon tempat sampah pada baris, atau **Delete submission** di jendela kiriman, lalu konfirmasi.

> [!WARNING]
> Menghapus kiriman juga menghapus file unggahannya, dan kiriman tidak dapat dipulihkan dari admin. Ekspor ke CSV terlebih dahulu jika Anda memerlukan arsipnya.

Menghapus formulir (**Delete** di daftar formulir) juga menghapus semua kirimannya.

## Perlindungan dari spam

Setiap formulir sudah terlindungi dari spam otomatis tanpa pengaturan apa pun:

- kolom tersembunyi ("honeypot") yang tidak terlihat oleh manusia tetapi diisi oleh robot spam, sehingga kiriman semacam itu ditolak;
- batas seberapa sering pengunjung yang sama dapat mengirim formulir yang sama dalam waktu singkat.

Untuk formulir yang masih menerima spam, aktifkan **Require captcha** di pengaturan formulir.

> [!TECHNICAL]
> **Menampilkan formulir:** pengembang memasangnya di template dengan `<x-sunrice::form handle="contact">`, dengan input bernama `data[handle_kolom]`; blok bawaan `blocks/form.blade.php` menampilkan formulir yang dipilih berdasarkan handle. Lihat [Blade components](docs:blade-components.md#x-sunriceform).
>
> **Captcha:** isi `SUNRICE_CAPTCHA_PROVIDER` (`turnstile`, `recaptcha`, atau `hcaptcha`), `SUNRICE_CAPTCHA_SITE_KEY`, dan `SUNRICE_CAPTCHA_SECRET_KEY` di `.env`; lihat [Forms](docs:forms.md#captcha).
>
> **Email** dikirim melalui antrean (queue), jadi queue worker harus berjalan ([Mail](docs:mail.md#queue-worker)). Batas kiriman (`sunrice.forms.rate_limit`, 5 per menit), batas ukuran unggahan, dan penghapusan otomatis kiriman lama (`sunrice.forms.prune_after_days`) diatur di `config/sunrice.php`. Unggahan besar mungkin juga memerlukan batas PHP yang lebih tinggi; lihat [Forms](docs:forms.md#file-uploads).
