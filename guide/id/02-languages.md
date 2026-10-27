# Bahasa

Situs web bisa tersedia dalam beberapa bahasa. Setiap entri lalu memiliki versi untuk tiap bahasa (sebuah **terjemahan**), dengan judul, slug, field, draf, dan status terbitnya sendiri. Daftar bahasanya diatur di **Pengaturan → Bahasa** (lihat [Pengaturan situs](guide:website/settings#bahasa)); yang pertama adalah **bahasa utama**.

Di situs web, bahasa utama memakai alamat biasa (`/about`) dan bahasa lain diawali kodenya (`/id/about`). Bagian tetap alamat sebuah koleksi atau taksonomi juga bisa diterjemahkan, di Struktur (`/id/buku/…` untuk `/books/…`: lihat [Struktur](guide:website/structure)).

## Tab bahasa

Jika situs memiliki lebih dari satu bahasa, penyunting entri menampilkan satu tab untuk setiap bahasa di atas field, dengan kodenya (**EN**, **ID**): arahkan kursor ke tab untuk melihat nama bahasanya dan apakah itu bahasa utama. Di mana pun panel membiarkan Anda memilih bahasa yang sedang disunting (entri, term, global, halaman daftar dan indeks, Konten → Terjemahan, teks alternatif berkas, kata-kata field dalam bahasa lain), bentuknya sama: sebaris tab.

- Klik sebuah tab (atau pindah ke sana dengan tombol panah lalu tekan Enter) untuk menyunting terjemahan itu. Jika ada perubahan yang belum disimpan, panel bertanya dulu.
- Titik hijau berarti terjemahannya tayang; titik jingga berarti *usang* (lihat di bawah). Arahkan penunjuk ke tab untuk membaca statusnya (*Draf*, *Terjadwal*, *Tayang*).
- Tab pudar dengan garis putus-putus dan tanda **+** belum memiliki terjemahan. Klik untuk menambahkannya: terjemahan dimulai sebagai draf yang disalin dari bahasa utama, siap diterjemahkan. Penerjemah juga bisa menambahkan bahasa, bukan hanya yang bisa membuat entri.
- **Hapus bahasa ini**, di ujung baris, menghapus terjemahan yang sedang dibuka, beserta revisinya. Bahasa utama tidak bisa dihapus: pindahkan seluruh entri ke tempat sampah sebagai gantinya.

Terjemahan yang ditandai *usang* (titik jingga) terakhir disimpan sebelum perubahan terbaru di bahasa utama: isinya mungkin sudah tidak sesuai. Kartu **Status** entri juga memberi tahu.

Setiap terjemahan disimpan, diterbitkan, dijadwalkan, dan ditarik dari situs secara terpisah. Menerbitkan versi bahasa Inggris tidak ikut menerbitkan versi bahasa Indonesia.

Terjemahan yang pertama kali diterbitkan memakai tanggal versi bahasa utama (jadi artikel terjemahan tetap bertanggal sama), kecuali Anda memilih tanggal lain.

## Field yang diterjemahkan dan yang dipakai bersama

Sebagian field **diterjemahkan**: setiap bahasa punya isinya sendiri (judul, teks, rich text, tautan). Sebagian lagi **dipakai bersama**: satu nilai untuk semua bahasa (harga, tanggal, foto, saklar ya/tidak). Blueprint yang menentukan mana yang mana.

Field bersama disunting di bahasa utama. Di bahasa lain, field itu tampil abu-abu dengan nilai dari bahasa utama, masing-masing dengan catatan di bawahnya: *Tidak diterjemahkan: ubah dalam …* (group yang dipakai bersama seluruhnya punya catatan itu sekali saja, di bawah judulnya). Ubah harga sekali saja, di bahasa utama, dan harga itu berlaku di semua bahasa.

Di dalam group, baris repeater, dan blok flexible, aturannya sama per baris: teksnya per bahasa, dan nilai bersama diambil dari baris yang sesuai di bahasa utama. Global, halaman daftar, halaman indeks, dan term juga begitu.

## Menerjemahkan dengan mesin

Jika developer Anda menyiapkan terjemahan mesin, penyunting terjemahan memiliki **Terjemahkan dari …** di menu **⋯**. Tombol ini mengisi bagian yang belum diterjemahkan, dari bahasa utama, ke dalam draf. Simpan dulu perubahan Anda sendiri (tombol menunggu sampai Anda menyimpan), lalu baca hasilnya, perbaiki, dan terbitkan setelah benar. Pada halaman yang sudah tayang, pengunjung tetap melihat versi yang tayang sampai Anda menerbitkan: terjemahannya menampilkan **Ada perubahan**. Term entri (kartu **Taksonomi**) tetap seperti semula, dan jika orang lain menyimpan terjemahan ini sementara itu, simpanan mereka dipertahankan dan tidak ada yang diterjemahkan. Jika layanan tidak mengembalikan sebagian teks, pesan galat menyebutkan berapa banyak: teks itu tetap seperti semula, sisanya masuk ke draf. Tanpa itu, tombol **Terjemahkan dari …** tampil abu-abu: minta developer Anda menyiapkannya.

## Halaman yang belum diterjemahkan

Jika sebuah entri belum memiliki terjemahan yang tayang dalam suatu bahasa, pengunjung bahasa itu biasanya melihat isi bahasa utama di alamat bahasa tersebut, sehingga menu dan tautan tetap berfungsi dan tidak ada yang tersesat ke halaman kosong. Begitu terjemahannya terbit, terjemahan itulah yang tampil. (Ini bisa dimatikan di **Pengaturan → Situs** → **Tampilkan halaman yang belum diterjemahkan dalam bahasa utama**; jika begitu, halaman tersebut tidak ada dalam bahasa itu.)

## Daftar entri dan bahasa

Menu **Bahasa** di daftar menampilkan judul dan status dalam satu bahasa. Entri yang belum punya terjemahan dalam bahasa itu tidak tercantum; beralihlah ke bahasa utama untuk menemukannya. Dengan kolom **Status**, setiap entri juga menampilkan lencana kecil untuk tiap bahasa lain: kode bahasa saja bila terjemahannya terbit dan mutakhir, selain itu dengan kata di sampingnya (**draf**, **terjadwal**, **usang** berwarna jingga, atau **belum ada** dengan garis putus-putus).

## Menjaga terjemahan tetap mutakhir

Saat bahasa utama berubah, bahasa lain tidak ikut berubah, kecuali field bersama. Sebagai gantinya, bahasa lain ditandai *usang* (titik jingga di tab bahasanya, dan di lencana bahasa pada daftar) sampai ada yang menyimpannya lagi. Buka setiap terjemahan yang usang, bandingkan dengan bahasa utama, perbarui isinya, lalu simpan atau terbitkan: tandanya hilang.

## Konten lain dalam beberapa bahasa

- **Term**: setiap term memiliki judul dan slug per bahasa (lihat [Term](guide:website/terms)).
- **Global**: nilai setiap set per bahasa (lihat [Global](guide:website/globals)).
- **Menu**: label per bahasa untuk setiap tautan (lihat [Menu](guide:website/menus)).
- **Komentar** menyimpan bahasa tempat komentar itu ditulis, dan semua bahasa sebuah entri berbagi satu utas komentar.

## Formulir, menu, dan judul halaman daftar

**Konten → Terjemahan** mengumpulkan teks situs yang bukan entri, dalam bahasa lain, dikelompokkan menurut tempat pengunjung melihatnya: **Judul halaman daftar** (koleksi yang punya halaman daftar), **Judul halaman term** (taksonomi yang punya halaman term), **Formulir: …** (pesan terima kasih setiap formulir beserta label, petunjuk, dan pilihan field-nya), **Menu: …** (label tautan), dan **Deskripsi situs**. Setiap baris menampilkan teks dalam bahasa utama (dengan **Lihat** untuk membuka halamannya, jika ada) di samping kotak untuk terjemahannya; biarkan kotak kosong agar teks bahasa utama yang tampil. Bilah di atas, yang tetap terlihat saat menggulir, berisi tab bahasa (jika ada lebih dari satu bahasa tujuan), menyebutkan berapa teks yang sudah diterjemahkan ("12 dari 30 sudah diterjemahkan ke Bahasa Indonesia"), punya **Hanya yang belum diterjemahkan** untuk menyembunyikan sisanya, dan **Simpan**. Dua item dengan judul yang sama dibedakan dengan handle-nya. Penerjemah bisa memakainya tanpa perlu bisa mengubah struktur atau pengaturan.

> [!TECHNICAL]
> Terjemahan mesin diatur dengan `sunrice-cms.translation`; seluruh koleksi, term, global, menu, halaman daftar dan indeks, serta teks **Konten → Terjemahan** bisa diterjemahkan dengan `php artisan sunrice:translate`, dan bahasa utama diganti dengan `php artisan sunrice:switch-main-language`. Lihat [Machine translation](docs:cms/translation) dan [Collections and entries](docs:cms/collections#languages).
