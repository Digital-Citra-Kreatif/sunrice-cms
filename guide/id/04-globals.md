# Global

**Global** menyimpan hal yang dipakai bersama di seluruh situs web: informasi kontak, tautan media sosial, pengumuman, teks kaki halaman. Isinya dikelompokkan dalam **set global** (misalnya *Kontak* atau *Footer*), masing-masing dengan field-nya sendiri. Buka **Global** di bawah Konten.

## Menyunting sebuah set

1. Klik sebuah set di daftar.
2. Pilih bahasa di bagian atas, jika situs memiliki beberapa bahasa.
3. Ubah field-nya dan klik **Simpan**.

Global tidak memiliki draf: nilai yang disimpan langsung tayang di situs web, di setiap halaman yang menampilkannya.

Field yang dipakai bersama oleh semua bahasa (nomor telepon, logo) disunting di bahasa utama dan tampil abu-abu di bahasa lain, seperti pada entri, termasuk di dalam group, baris repeater, dan blok flexible.

Di bahasa lain, set yang belum pernah disimpan di bahasa itu dimulai dengan nilai bahasa utama, yang ditampilkan situs web sementara ini: terjemahkan, lalu simpan. Field yang Anda biarkan kosong menampilkan nilai bahasa utama di situs web.

Jika set menyatakan tidak punya field, pengelola situs masih perlu memilih field-nya di **Pengaturan** set tersebut (Konten → Global). Nama, handle, dan field sebuah set diubah di sana oleh mereka yang diizinkan (*Ubah pengaturan* di bawah Global pada Peran): editor hanya mengubah nilainya, karena situs web menemukan setiap set dari handle-nya.

## Jika orang lain sedang menyunting

Satu orang menyunting sebuah set dalam satu bahasa pada satu waktu; yang lain bisa memilih **Hanya lihat** atau **Ambil alih**. Jika rekan menyimpan setelah Anda membukanya, pilih **Muat versi mereka** atau **Tetap simpan versi saya** (lihat [Bekerja dengan aman](guide:panel/welcome#bekerja-dengan-aman)).

> [!TIP]
> Gambar di global berasal dari [pustaka media](guide:panel/media), yang mencantumkan set tersebut di **Dipakai oleh** gambar itu.

> [!TECHNICAL]
> Template membaca global dengan `Cms::global('contact')`. Lihat [Globals](docs:cms/globals).
