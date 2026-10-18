# Global

Global menyimpan hal-hal yang sama di setiap halaman situs Anda: nama dan slogan situs, detail kontak, jam buka, tautan media sosial, teks footer, dan sebagainya. Anda cukup mengubahnya sekali di satu tempat, dan setiap halaman yang menampilkannya ikut diperbarui.

## Cara kerja global

- Nilai-nilai dikelompokkan dalam **global set**. Contohnya *Site* (nama, logo, slogan), *Contact* (telepon, email, alamat), atau *Footer* (baris hak cipta, tautan footer).
- Setiap set memakai sebuah **blueprint** yang menentukan kolom apa saja yang dimilikinya. Pengelola situs menyiapkan blueprint; Anda mengisi nilainya.
- Setiap set termasuk dalam sebuah **Group**: **Global** untuk nilai yang berlaku di seluruh situs, atau **Template part** untuk blok konten bergaya header dan footer. Grup hanya membantu merapikan daftar; keduanya diedit dengan cara yang sama.
- Letak setiap nilai di situs ditentukan oleh desain situs.

Global set ada di sidebar pada **Structure → Globals**. Halamannya berjudul **Globals & template parts** dan menampilkan **Title**, **Handle**, **Group**, dan **Blueprint** setiap set.

## Mengubah nilai global

1. Buka **Structure → Globals**, lalu klik judul set.
2. Isi atau ubah kolom di kartu **Content**.
3. Klik **Save** (atau tekan Ctrl/Cmd + S). Jika tidak ada lagi yang perlu disimpan, tombol bertuliskan **Saved**, dan catatan di bawah panel samping menunjukkan **All changes saved**.

Perubahan langsung tampil di situs, di setiap halaman yang memakainya.

> [!NOTE]
> Satu bahasa dari sebuah global set hanya dapat diedit oleh satu orang pada satu waktu. Jika orang lain sedang membukanya, Anda akan diberi tahu siapa orangnya, lalu dapat melihatnya dalam mode baca saja atau mengambil alih, sama seperti pada entri. Lihat [Entri](entries.md).

## Nilai dalam setiap bahasa

Pada situs multibahasa, editor memiliki tab untuk setiap bahasa, dengan bahasa utama paling depan. Titik hijau pada tab berarti bahasa tersebut memiliki nilainya sendiri.

1. Buka global set, lalu klik tab bahasa.
2. Ubah kolom teks yang perlu berbeda dalam bahasa ini.
3. Klik **Save**. Setiap bahasa disimpan terpisah.

Beberapa hal yang perlu diketahui:

- Hanya kolom yang **translatable** (dapat diterjemahkan, biasanya teks) yang bisa berbeda per bahasa. Kolom yang dipakai bersama semua bahasa, seperti gambar, angka, atau nomor telepon, bertanda **Shared with** diikuti kode bahasa utama, dan hanya dapat diubah di bahasa utama.
- Teks yang tidak Anda terjemahkan tetap mengikuti bahasa utama, sehingga situs tidak pernah menampilkan ruang kosong.
- Global tidak memiliki tombol **Ready**: teks terjemahan langsung tampil di situs begitu Anda menyimpannya.

> [!WARNING]
> Jika Anda pindah ke tab bahasa lain saat masih ada perubahan yang belum disimpan, Anda akan ditanya apakah perubahan itu dibuang. Simpan dulu jika ingin mempertahankannya.

## Membuat global set

Biasanya pengelola situs atau pengembang yang membuat global set, karena desain situs perlu mengenalnya.

1. Buka **Structure → Globals**, lalu klik **New global**.
2. Di kartu **Details**, isi **Title** (**Handle** terisi otomatis).
3. Pilih **Group**: **Global** atau **Template part**.
4. Pilih **Blueprint**. Jika Anda memerlukan kolom baru, buat blueprint terlebih dahulu (lihat [Struktur](structure.md#blueprint)).
5. Klik **Create**. Set terbuka sehingga Anda dapat mengisi nilainya.

Jika kartu **Content** bertuliskan "This blueprint has no fields yet", tambahkan kolom ke blueprint-nya lalu kembali lagi.

## Mengubah judul atau blueprint set

Buka set dan gunakan kartu **Settings** di sebelah kanan: ubah **Title** atau pilih **Blueprint** lain, lalu klik **Save**. Kartu ini juga menampilkan handle set.

> [!WARNING]
> Mengganti blueprint mengubah kolom yang dimiliki set. Nilai dari kolom yang tidak ada di blueprint baru tidak lagi ditampilkan di editor maupun di situs, jadi tanyakan dulu kepada pengelola situs sebelum menggantinya.

## Menghapus global set

Di **Structure → Globals**, klik **Delete** di samping set lalu konfirmasi.

> [!WARNING]
> Menghapus set akan menghapus nilainya, dan bagian situs yang menampilkannya menjadi kosong. Tanyakan dulu kepada pengembang sebelum menghapus set yang dipakai desain situs.

> [!TECHNICAL]
> Template membaca set berdasarkan handle dengan `sunrice_global('handle')->field` atau `->get('field', 'default')` (juga `Sunrice::global('handle')`), dalam bahasa yang aktif dengan cadangan bahasa utama. Header bawaan membaca `sunrice_global('site')`; footer membaca global bergrup template part. Mengganti handle akan memutus rujukan tersebut. Lihat [Content modeling](docs:content-modeling.md#globals-and-template-parts), [Templates](docs:templates.md#reading-data), dan [Multilingual content](docs:multilingual.md#which-fields-are-translatable).
