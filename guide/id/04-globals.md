# Global

**Global** menyimpan hal yang dipakai bersama di seluruh situs web: informasi kontak, tautan media sosial, pengumuman, teks kaki halaman. Isinya dikelompokkan dalam **global set** (misalnya *Kontak* atau *Footer*), masing-masing dengan field-nya sendiri. Buka **Globals** di bawah Content.

## Menyunting sebuah set

1. Klik sebuah set di daftar.
2. Pilih bahasa di bagian atas, jika situs memiliki beberapa bahasa.
3. Ubah field-nya dan klik **Save**.

Global tidak memiliki draf: nilai yang disimpan langsung tayang di situs web, di setiap halaman yang menampilkannya.

Field yang dipakai bersama oleh semua bahasa (nomor telepon, logo) disunting di bahasa utama dan tampil abu-abu di bahasa lain, seperti pada entri.

Jika set menyatakan tidak punya field, pengelola situs masih perlu memilih field-nya di Structure → Global sets.

## Jika orang lain sedang menyunting

Satu orang menyunting sebuah set dalam satu bahasa pada satu waktu; yang lain bisa memilih **View only** atau **Take over**. Jika rekan menyimpan setelah Anda membukanya, pilih **Load theirs** atau **Save mine anyway** (lihat [Bekerja dengan aman](guide:panel/welcome#bekerja-dengan-aman)).

> [!TIP]
> Gambar di global berasal dari [pustaka media](guide:panel/media), yang mencantumkan set tersebut di **Used by** gambar itu.

> [!TECHNICAL]
> Template membaca global dengan `Cms::global('contact')`. Lihat [Globals](docs:cms/globals).
