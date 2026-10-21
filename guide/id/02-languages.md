# Bahasa

Situs web bisa tersedia dalam beberapa bahasa. Setiap entri lalu memiliki versi untuk tiap bahasa (sebuah **terjemahan**), dengan judul, slug, field, draf, dan status terbitnya sendiri. Daftar bahasanya diatur di **Settings → Languages** (lihat [Pengaturan situs](guide:website/settings#languages)); yang pertama adalah **bahasa utama**.

Di situs web, bahasa utama memakai alamat biasa (`/about`) dan bahasa lain diawali kodenya (`/id/about`).

## Bilah bahasa

Jika situs memiliki lebih dari satu bahasa, penyunting entri menampilkan bilah bahasa di atas field. Bahasa utama ditandai **(main)**, dan setiap bahasa menampilkan statusnya (*Draft*, *Scheduled*, *Published*).

- Klik sebuah bahasa untuk menyunting terjemahan itu.
- Bahasa dengan garis putus-putus dan tanda **+** belum memiliki terjemahan. Klik untuk menambahkannya: terjemahan dimulai sebagai draf yang disalin dari bahasa utama, siap diterjemahkan.
- **Remove this language** menghapus terjemahan yang sedang dibuka, beserta revisinya. Bahasa utama tidak bisa dihapus: pindahkan seluruh entri ke tempat sampah sebagai gantinya.

Terjemahan yang ditandai **Outdated** terakhir disimpan sebelum perubahan terbaru di bahasa utama: isinya mungkin sudah tidak sesuai. Kartu **Status** entri juga memberi tahu.

Setiap terjemahan disimpan, diterbitkan, dijadwalkan, dan ditarik dari situs secara terpisah. Menerbitkan versi bahasa Inggris tidak ikut menerbitkan versi bahasa Indonesia.

Terjemahan yang pertama kali diterbitkan memakai tanggal versi bahasa utama (jadi artikel terjemahan tetap bertanggal sama), kecuali Anda memilih tanggal lain.

## Field yang diterjemahkan dan yang dipakai bersama

Sebagian field **diterjemahkan**: setiap bahasa punya isinya sendiri (judul, teks, rich text, tautan). Sebagian lagi **dipakai bersama**: satu nilai untuk semua bahasa (harga, tanggal, foto, saklar ya/tidak). Blueprint yang menentukan mana yang mana.

Field bersama disunting di bahasa utama. Di bahasa lain, field itu tampil abu-abu dengan nilai dari bahasa utama, dan catatan *Shared by all languages: edit it in …*. Ubah harga sekali saja, di bahasa utama, dan harga itu berlaku di semua bahasa.

Di dalam group, baris repeater, dan blok flexible, aturannya sama per baris: teksnya per bahasa, dan nilai bersama diambil dari baris yang sesuai di bahasa utama.

## Menerjemahkan dengan mesin

Jika developer Anda menyiapkan terjemahan mesin, penyunting terjemahan memiliki tombol **Translate from …**. Tombol ini mengisi bagian yang belum diterjemahkan, dari bahasa utama, ke dalam draf. Simpan dulu perubahan Anda sendiri (tombol menunggu sampai Anda menyimpan), lalu baca hasilnya, perbaiki, dan terbitkan setelah benar.

## Halaman yang belum diterjemahkan

Jika sebuah entri belum memiliki terjemahan yang tayang dalam suatu bahasa, pengunjung bahasa itu biasanya melihat isi bahasa utama di alamat bahasa tersebut, sehingga menu dan tautan tetap berfungsi dan tidak ada yang tersesat ke halaman kosong. Begitu terjemahannya terbit, terjemahan itulah yang tampil. (Developer bisa mematikan ini; jika begitu, halaman tersebut tidak ada dalam bahasa itu.)

## Daftar entri dan bahasa

Menu **Language** di daftar menampilkan judul dan status dalam satu bahasa. Entri yang belum punya terjemahan dalam bahasa itu tidak tercantum; beralihlah ke bahasa utama untuk menemukannya. Dengan kolom **Status**, setiap entri juga menampilkan lencana kecil untuk tiap bahasa lain; lencana terjemahan yang usang diberi garis jingga.

## Menjaga terjemahan tetap mutakhir

Saat bahasa utama berubah, bahasa lain tidak ikut berubah, kecuali field bersama. Sebagai gantinya, bahasa lain ditandai **Outdated** (di bilah bahasa dan di lencana bahasa pada daftar) sampai ada yang menyimpannya lagi. Buka setiap terjemahan yang usang, bandingkan dengan bahasa utama, perbarui isinya, lalu simpan atau terbitkan: tandanya hilang.

## Konten lain dalam beberapa bahasa

- **Term**: setiap term memiliki judul dan slug per bahasa (lihat [Term](guide:website/terms)).
- **Global**: nilai setiap set per bahasa (lihat [Global](guide:website/globals)).
- **Menu**: label per bahasa untuk setiap tautan (lihat [Menu](guide:website/menus)).
- **Komentar** menyimpan bahasa tempat komentar itu ditulis, dan semua bahasa sebuah entri berbagi satu utas komentar.

> [!TECHNICAL]
> Terjemahan mesin diatur dengan `sunrice-cms.translation`; seluruh koleksi bisa diterjemahkan dengan `php artisan sunrice:translate`, dan bahasa utama diganti dengan `php artisan sunrice:switch-main-language`. Lihat [Machine translation](docs:cms/translation) dan [Collections and entries](docs:cms/collections#languages).
