# Pengguna dan peran

Setiap orang yang bekerja di admin memiliki akun pengguna sendiri. Apa yang dapat dilihat dan dilakukan setiap orang ditentukan oleh **peran** (role) mereka: peran adalah kumpulan izin yang diberi nama, misalnya "Editor". Halaman ini menjelaskan cara menambahkan orang, mengubah akun mereka, dan memberikan akses yang benar-benar mereka perlukan.

Kedua layar ada di bawah **Manage**: **Users** dan **Roles**. Masing-masing memerlukan izinnya sendiri (misalnya **View users** atau **Edit roles**), jadi tidak semua orang melihatnya.

## Pengguna

Daftar **Users** menampilkan nama, email, dan peran setiap orang. Gunakan kotak pencarian untuk mencari berdasarkan nama atau email, dan filter **Role** untuk menampilkan hanya orang dengan peran tertentu (atau **No role**).

### Menambahkan pengguna

Sunrice tidak mengirim undangan: Anda membuat akunnya dan menyampaikan detail login sendiri.

1. Buka **Manage → Users** dan klik **New user**.
2. Di kartu **Account**, isi **Name** dan **Email** orang tersebut.
3. Di kartu **Password**, isi **Password** dan ulangi di **Confirm password**.
4. Di kartu **Roles**, centang satu peran atau lebih.
5. Klik **Create user**.

Sampaikan alamat admin (biasanya alamat situs Anda diikuti `/cms`), email, dan kata sandinya, sebaiknya melalui saluran selain email. Minta orang tersebut membuat kata sandi baru melalui **Forgot password?** di halaman login.

> [!TIP]
> Pengguna tanpa peran tidak dapat memakai admin. Selalu centang setidaknya satu peran.

### Mengubah pengguna

1. Di daftar **Users**, klik baris orang tersebut.
2. Ubah **Name**, **Email**, atau perannya.
3. Untuk mengganti kata sandi, isi **New password** dan **Confirm password**. Biarkan keduanya kosong untuk mempertahankan kata sandi lama.
4. Klik **Save**.

Tidak ada halaman profil terpisah. Jika Anda lupa kata sandi sendiri, gunakan **Forgot password?** di halaman login; tautan reset akan dikirim ke email Anda.

### Menghapus pengguna

1. Klik ikon tempat sampah pada baris orang tersebut, atau tombol tempat sampah di halaman edit-nya.
2. Jika orang tersebut pernah membuat entri atau mengunggah file, pilih apa yang terjadi dengan konten itu:
   - **Move it to another user**: pilih siapa yang mengambil alih kontennya.
   - **Keep it without an author**: semuanya tetap ada; "Created by" tidak menampilkan siapa pun.
   - **Delete their entries**: entri mereka dipindahkan ke tempat sampah dan hilang dari situs. File yang diunggah tetap disimpan.
3. Klik **Delete user** (atau **Delete user and entries**).

> [!WARNING]
> Menghapus pengguna tidak dapat dibatalkan. Jika seseorang hanya perlu rehat sementara, cabut perannya saja: ia tidak dapat lagi memakai admin, dan Anda dapat mengembalikan perannya nanti.

Anda tidak dapat menghapus akun Anda sendiri.

## Peran

Daftar **Roles** menampilkan setiap peran beserta jumlah izinnya. Klik nama peran untuk melihat atau mengubahnya.

### Peran bawaan

Banyak situs dimulai dengan empat peran siap pakai:

| Peran | Yang dapat dilakukan |
| --- | --- |
| **Administrator** | Semua hal di admin, termasuk struktur, pengguna, peran, pengaturan, log aktivitas, dan akses AI. |
| **Editor** | Semua entri dan term, termasuk menerbitkan dan menerjemahkan; menu; mengubah globals; media; melihat dan mengekspor kiriman formulir; komentar. Tanpa struktur, pengguna, peran, atau pengaturan. |
| **Author** | Membuat entri, serta mengubah atau menghapus entri miliknya sendiri; melihat term; melihat dan mengunggah media. Tidak dapat menerbitkan: editor yang melakukannya. |
| **Translator** | Melihat entri dan hanya mengubah versi bahasa lainnya; melihat media. Tidak dapat menerbitkan atau menandai terjemahan sebagai siap. |

Editor, Author, dan Translator juga dapat melihat entri yang belum terbit di situs selama mereka login. Keempat peran memiliki izin **Read the user guide**, yang menampilkan panduan ini di **Manage → Guide**.

> [!TECHNICAL]
> Peran bawaan dibuat dengan `php artisan sunrice:seed-roles` (atau `sunrice:install --roles`). Menjalankannya lagi menambahkan izin baru tanpa menghapus perubahan Anda. Lihat [Default roles](docs:permissions.md#default-roles).

### Membuat atau mengubah peran

1. Buka **Manage → Roles** dan klik **New role** (atau klik peran yang sudah ada).
2. Isi **Name**.
3. Centang izin yang harus dimiliki peran ini. Izin dikelompokkan dalam kartu seperti **Admin**, **Structure**, **Navigation**, **Globals**, **Users & roles**, **Forms**, **Assets**, dan **Comments**. Tautan **toggle all** di setiap kartu mencentang atau mengosongkan seluruh kelompok.
4. Klik **Create role** (atau **Save role**).

Untuk menghapus peran, klik **Delete** di sebelahnya pada daftar. Peran yang masih diberikan kepada pengguna tidak dapat dihapus: cabut dulu peran itu dari pengguna tersebut.

### Izin per koleksi

Izin konten diatur terpisah untuk setiap koleksi, di kartu bernama **Entries — (koleksi)**. Dengan begitu Anda dapat, misalnya, mengizinkan seseorang menulis berita tetapi tidak menyentuh halaman utama. Tindakannya:

- **view**, **create**, **edit**, **delete**, **publish**
- **edit-own** dan **delete-own**: hanya entri yang dibuat orang itu sendiri
- **translate**: hanya mengubah versi bahasa lain; bahasa utama tetap hanya-baca

Taksonomi (**Terms — …**), formulir (**Forms — …**), dan beberapa bagian tambahan bekerja dengan cara yang sama.

> [!NOTE]
> Saat developer menambahkan koleksi, taksonomi, atau formulir baru, izinnya muncul di editor peran. Jangan lupa mencentangnya untuk peran yang perlu memakainya.

> [!TECHNICAL]
> Izin untuk koleksi, taksonomi, formulir, dan resource baru dibuat dengan `php artisan sunrice:sync-permissions`. Lihat [Entity-scoped permissions](docs:permissions.md#entity-scoped-permissions).

### Super admin

**Super admin** selalu memiliki semua izin, apa pun yang dicentang, dan perannya tidak dapat diubah. Super admin terlindungi: hanya super admin lain yang dapat mengubah atau menghapus pengguna super admin, atau memberikan peran super admin kepada seseorang. Akun pertama yang dibuat saat instalasi biasanya adalah super admin.

> [!TECHNICAL]
> Nama peran super admin diatur oleh `sunrice.super_admin_role` di `config/sunrice.php` (bawaan `Super Admin`). Lihat [Permissions](docs:permissions.md).

## Memberikan akses dengan aman

- **Berikan akses sesedikit mungkin yang masih memadai.** Mulailah dari Author atau Editor, lalu tambahkan hanya yang kurang.
- **Batasi jumlah super admin dan administrator.** Mereka dapat mengubah pengguna, peran, dan pengaturan.
- **Berhati-hatilah dengan izin sensitif** seperti **Edit settings**, **Edit roles**, **Connect AI agents (MCP) with an access token**, dan **Let AI agents read the error log**.
- **Satu akun untuk satu orang.** Jangan pernah berbagi login, agar [log aktivitas](activity-log.md) menunjukkan siapa melakukan apa.
- **Cabut akses segera** saat seseorang keluar: hapus akunnya atau cabut perannya.
- **Aktifkan login dua langkah** di [Pengaturan](settings.md#keamanan) untuk perlindungan tambahan.
