# Akses AI

Anda dapat menghubungkan agen AI, seperti Claude, ChatGPT, Cursor, atau VS Code, ke situs Anda agar dapat membantu pekerjaan: menulis dan menerjemahkan entri, memperbaiki SEO, menambahkan teks alt pada gambar, memperbarui menu, dan lainnya. Agen terhubung melalui MCP (Model Context Protocol), cara standar bagi alat AI untuk berkomunikasi dengan perangkat lunak lain, menggunakan **token akses** yang Anda buat di admin.

Buka **Manage → AI access**. Anda memerlukan izin **Connect AI agents (MCP) with an access token**. Administrator memilikinya.

## Cara kerjanya

Agen tidak pernah memiliki wewenang lebih dari Anda. Agen bertindak **sebagai Anda**: ia dapat melakukan persis apa yang dapat dilakukan akun Anda, tidak lebih. Jika Anda tidak dapat menerbitkan entri, agen yang Anda hubungkan juga tidak bisa.

Setiap perubahan oleh agen melewati pemeriksaan yang sama seperti bekerja di admin: draf, revisi, izin, dan validasi. Setiap perubahan juga dicatat di [log aktivitas](activity-log.md).

## Menghubungkan agen

### 1. Buat token

1. Buka **Manage → AI access**.
2. Di kartu **Your tokens**, ketik **Name** untuk token, misalnya "Claude di laptop saya".
3. Klik **Create token**.
4. Jendela **Your new token** menampilkan token tersebut. Klik **Copy** dan simpan di tempat aman untuk langkah berikutnya.
5. Klik **I've copied it**.

> [!WARNING]
> Token hanya ditampilkan sekali. Jika hilang, cabut token itu dan buat yang baru. Perlakukan token seperti kata sandi: siapa pun yang memilikinya dapat bekerja di situs Anda sebagai Anda.

### 2. Tambahkan situs ke agen Anda

Kartu **Connect an agent** menampilkan pengaturan siap salin:

- **Server URL**: alamat yang dihubungi agen.
- **Claude Code**: satu perintah untuk ditempelkan di terminal.
- **Claude Desktop, Cursor, VS Code… (JSON config)**: pengaturan untuk ditempelkan ke konfigurasi agen.

Tepat setelah Anda membuat token, cuplikan ini sudah memuat token tersebut, sampai Anda meninggalkan halaman. Jika tidak, ganti `YOUR_TOKEN` dengan token Anda.

Setiap agen punya tempatnya sendiri untuk pengaturan ini. Cari "MCP servers" atau "connectors" di pengaturan atau dokumentasinya.

> [!TECHNICAL]
> Agen yang berjalan di server itu sendiri dapat terhubung tanpa token dengan `php artisan mcp:start sunrice`, dengan `SUNRICE_MCP_USER` diisi email pengguna yang diwakilinya. Token juga dapat dibuat dengan `php artisan sunrice:mcp-token {email} --name="Claude"`. Jika halaman menyebutkan server MCP dimatikan, itu dilakukan melalui `SUNRICE_MCP_ENABLED`. Lihat [Connecting an agent](docs:ai-agents.md#connecting-an-agent).

### 3. Minta dengan bahasa sehari-hari

Setelah terhubung, bicaralah dengan agen seperti biasa, misalnya:

- "Tampilkan artikel terbit yang belum punya deskripsi meta dan usulkan satu untuk masing-masing."
- "Terjemahkan menu utama dan footer ke bahasa Inggris, sebagai draf."
- "Cari gambar tanpa teks alt dan isikan."
- "Apa saja yang berubah di situs minggu ini?"

## Apa yang dapat dilakukan agen

Dalam batas izin Anda, agen dapat bekerja dengan:

- **Entri**: menampilkan, membaca, membuat, dan memperbaruinya, sebagai draf atau langsung terbit; membatalkan terbit, membuang, memulihkan, dan menduplikasi; melihat dan memulihkan versi sebelumnya.
- **Struktur**: koleksi, blueprint, fieldset, dan taksonomi.
- **Term, menu, dan globals.**
- **Media**: mengunggah gambar, mengubah judul, teks alt, dan keterangan, serta mengatur folder.
- **Formulir** beserta kirimannya.
- **SEO**: menjalankan audit judul, deskripsi, gambar berbagi, dan terjemahan yang belum ada.
- **Terjemahan**: menerjemahkan entri dan konten lain.
- **Template**: membaca dan, khusus super admin, mengubah template situs.
- **Perintah pemeliharaan** dan **log galat**, dengan izin tambahan (di bawah).

> [!NOTE]
> Agen diminta bertanya dulu sebelum menghapus sesuatu atau menerbitkan perubahan besar, tetapi tetap bisa keliru. Periksa hasil kerjanya, seperti Anda memeriksa pekerjaan rekan baru.

## Izin yang terkait

| Izin | Yang diizinkan |
| --- | --- |
| **Connect AI agents (MCP) with an access token** | Membuka **AI access** dan membuat token. |
| **Let AI agents run maintenance commands** | Agen boleh menjalankan daftar pendek tugas pemeliharaan yang disetujui, seperti mengosongkan cache atau menerbitkan entri terjadwal. |
| **Let AI agents read the error log** | Agen boleh membaca galat terbaru dari log galat situs, untuk menjelaskan masalah dan menyarankan perbaikan. |
| **View the activity log** | Agen boleh membaca log aktivitas, misalnya untuk memberi tahu apa yang telah diubahnya. |
| **Read the developer docs** | Agen boleh membaca dokumentasi developer. |

> [!WARNING]
> Log galat dapat berisi data pribadi pengunjung, seperti alamat email. Kata sandi dan kunci disamarkan, tetapi berikan **Let AI agents read the error log** hanya kepada orang yang boleh melihat data tersebut. Secara bawaan, hanya Administrator yang memilikinya.

> [!TECHNICAL]
> Perintah yang diizinkan tercantum di `sunrice.mcp.commands` dalam `config/sunrice.php`. `SUNRICE_MCP_TEMPLATES=false` mematikan penulisan template dan `SUNRICE_MCP_ERROR_LOG=false` mematikan pembacaan log galat. Setiap token dibatasi 300 permintaan per menit. Lihat [Configuration](docs:ai-agents.md#configuration) dan [Safety](docs:ai-agents.md#safety).

## Mencabut token

Daftar **Your tokens** menampilkan **Name** setiap token, kapan terakhir dipakai (**Last used**), dan kapan dibuat (**Created**). Anda hanya melihat token milik Anda sendiri.

1. Klik ikon tempat sampah pada baris token.
2. Konfirmasi. Agen yang memakai token tersebut tidak dapat terhubung lagi.

## Tips keamanan

- **Satu token untuk setiap agen atau perangkat.** Dengan begitu Anda dapat mencabut satu tanpa memutus yang lain.
- **Beri nama token dengan jelas**, agar mudah dikenali di daftar dan di log aktivitas.
- **Cabut token yang tidak lagi dipakai**, serta token yang mungkin bocor. Kolom "Last used" membantu menemukan token yang terlupakan.
- **Gunakan akun dengan akses secukupnya.** Untuk pekerjaan konten, agen yang dihubungkan oleh pengguna berperan Editor sering kali sudah cukup; lihat [Pengguna dan peran](users-roles.md).
- **Tinjau hasil kerja agen** di [log aktivitas](activity-log.md): atur **Source** ke **AI agent**.
- **Utamakan draf.** Minta agen menyimpan perubahan sebagai draf agar Anda dapat meninjaunya sebelum menerbitkan. Revisi entri memungkinkan Anda kembali ke versi sebelumnya bila perlu.
