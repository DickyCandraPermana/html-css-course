# Matriks Pemetaan Analogi Kedai Kopi Fisik (KopiCode)

Dokumen ini memetakan konsep abstrak HTML & CSS ke elemen fisik kedai kopi nyata. Gunakan analogi ini secara konsisten di seluruh modul kurikulum agar siswa memiliki model mental visual yang kokoh.

---

## 1. Fondasi Dokumen & Struktur Web (Modul 00 & 01)

| Konsep Web | Elemen Fisik Kedai Kopi | Alasan & Model Mental |
|---|---|---|
| `<!DOCTYPE html>` | Surat izin operasional / sertifikat standar ruko | Memberitahu pengawas (browser) bahwa bangunan ini mematuhi standar konstruksi modern, bukan ruko liar tanpa aturan. |
| `<html lang="id">` | Batas kavling tanah & identitas bahasa kedai | Garis tapak tanah yang membatasi seluruh area bangunan kedai kopi, sekaligus stiker "Pelayanan Bahasa Indonesia" di pintu gerbang. |
| `<head>` | Papan identitas di atap ruko luar | Berisi nama kedai di papan plang tinggi (`<title>`) dan info izin usaha (`<meta>`). Pengunjung melihat ini dari luar sebelum melangkah masuk. |
| `<body>` | Ruang dalam kedai kopi di balik pintu masuk | Tempat sebenarnya barista menyeduh, meja kasir melayani, dan tamu menikmati kopi. Semua yang bisa dilihat dan disentuh ada di sini. |
| `<h1>` | Neon box nama brand kedai di dinding utama | Tulisan paling mencolok di dalam kedai. Hanya ada satu nama brand utama di dinding bar. |
| `<p>` | Cerita asal-usul biji kopi di papan kapur | Kalimat narasi tentang petani lokal, profil rasa, atau jam buka harian kedai. |
| `<strong>` & `<em>` | Spidol tebal peringatan & coretan kapur miring barista | `<strong>` menandai info krusial (misal: "Buka jam **07.00**"), `<em>` menandai intonasi unik (misal: "*single origin* asli Ciwidey"). |
| `<hr>` | Lis kayu pemisah seksi etalase | Balok kayu yang memisahkan area kasir depan dengan area meja pelanggan. |
| `<img>` | Pigura foto meja seduh manual di dinding | Menampilkan visual nyata suasana kedai; atribut `src` adalah file fotonya, `alt` adalah keterangan bagi tuna netra atau saat pigura retak. |

---

## 2. Pengelompokan & Data Tabular (Modul 02 & 03)

| Konsep Web | Elemen Fisik Kedai Kopi | Alasan & Model Mental |
|---|---|---|
| `<ul>` & `<li>` | Papan daftar fasilitas kedai (bullet points) | Daftar fasilitas seperti Wi-Fi, colokan di tiap meja, dan musholla. Urutan butir tidak mengubah rasa atau fungsi. |
| `<ol>` & `<li>` | Kartu resep seduh manual brew (V60 / Tubruk) | Urutan bernomor wajib: (1) giling biji, (2) panaskan air, (3) pouring pertama (blooming), (4) tuang tetes akhir. Urutan tidak boleh tertukar. |
| `<div>` | Sekat partisi ruangan kedai | Dinding partisi tripleks atau kaca yang mengelompokkan area indoor, outdoor, atau sudut roastery agar mudah ditata letaknya. |
| `<span>` | Stempel kecil di tengah baris tulisan | Menandai kata "HOT" atau "ES" tepat di sebelah nama minuman tanpa membuat kalimat turun baris. |
| `<a>` | Papan plang penunjuk arah di lorong kedai | Menunjuk arah panah ke meja kasir, kamar mandi, atau menu QR di meja sebelah. |
| `<table>` | Papan daftar menu dan harga di atas meja kasir | Lembaran tabel kisi-kisi dua dimensi agar mata kasir dan pelanggan membaca harga secara presisi. |
| `<thead>` | Baris kayu kepala kolom menu | Baris paling atas yang membagi kategori: "Jenis Biji", "Metode Seduh", dan "Harga". |
| `<tbody>` | Deretan kartu pesanan menu harian | Kumpulan baris menu nyata yang siap diseduh barista. |
| `<tr>`, `<th>`, `<td>` | Baris rak menu, label kepala rak, dan kotak data | `<tr>` adalah satu rak horizontal; `<th>` adalah kepala label tebal; `<td>` adalah isi data harga dan nama. |
| `<mark>` | Stabilo kuning pada menu andalan (*Signature Drink*) | Coretan stabilo kuning di menu kasir yang langsung menarik perhatian: "Best Seller Barista". |
| `<small>` | Catatan kaki takaran / es batu | Tulisan kecil di bawah harga: "(Termasuk pajak 10%, ukuran reguler 250ml)". |

---

## 3. Interaksi & Formulir Reservasi (Modul 04)

| Konsep Web | Elemen Fisik Kedai Kopi | Alasan & Model Mental |
|---|---|---|
| `<form>` | Tatakan clipboard kertas reservasi meja di meja kasir | Papan penjepit kertas formulir yang menyatukan seluruh isian pelanggan sebelum diserahkan ke kasir. |
| `<label for="...">` | Tulisan judul kolom di samping kotak isian | Teks petunjuk yang jelas agar pelanggan tahu kotak mana yang harus diisi nama atau nomor telepon. |
| `<input type="text">` | Kotak isian nama pemesan meja | Kolom kosong untuk menuliskan nama pemesan secara bebas. |
| `<input type="date">` | Kotak pemilih kalender tanggal booking | Kalender meja kecil yang dibalik pelanggan untuk memilih hari kedatangan. |
| `<input type="number">` | Kotak putar jumlah kursi / orang | Kolom angka yang membatasi pesanan kursi (tidak bisa diisi huruf). |
| `<input type="radio">` | Tombol pilihan area duduk (Indoor AC vs Outdoor Senja) | Sakelar toggle: pelanggan hanya bisa duduk di salah satu area, tidak bisa berada di dua tempat sekaligus. |
| `<select>` & `<option>` | Buku katalog pilihan cabang kedai | Daftar tarik-turun untuk memilih cabang kedai (Pusat, Timur, atau Pesisir). |
| `<textarea>` | Kotak catatan permintaan khusus ke barista | Kotak lapang untuk menulis pesan: "Tolong siapkan meja dekat colokan dan jangan terlalu manis". |
| `<button type="submit">` | Tombol bel beling di meja kasir (*Ting!*) | Tombol yang ditekan untuk menyerahkan seluruh formulir ke meja dapur barista. |

---

## 4. Estetika & CSS Box Model (Modul 05)

| Konsep Web | Elemen Fisik Kedai Kopi | Alasan & Model Mental |
|---|---|---|
| **Content** | Permukaan kayu meja saji tempat cangkir kopi ditaruh | Inti area kerja atau teks konten yang dibaca pengunjung. |
| **Padding** | Tatakan gabus / karet di bawah cangkir | Jarak empuk antara bibir cangkir dengan tepi meja agar cangkir tidak licin atau tumpah. |
| **Border** | Lis kayu pelindung atau pelat besi di tepian meja | Garis batas tegas meja yang menjaga bentuk dan memberi aksen estetis. |
| **Margin** | Jarak lorong kosong antar meja pelanggan | Ruang lorong agar barista bisa lewat membawa teko seduh tanpa menyenggol kursi pelanggan lain. |
| `box-sizing: border-box` | Penggaris tukang kayu standar | Memastikan ukuran meja 80 cm sudah termasuk kayu lis tepian; meja tidak mendadak melebar saat dipasangi lis tepi. |
| `margin: 0 auto` | Menaruh meja utama tepat di sumbu tengah ruangan | Memposisikan meja display barista persis seimbang di tengah ruko. |
| `linear-gradient(...)` | Cat dinding semen ekspos gradasi gelap | Sapuan warna dinding kedai yang bergradasi dari cokelat biji kopi sangrai tua ke hitam arang. |
| `border-collapse: collapse` | Mengapit bilah kayu sekat tabel | Menghilangkan celah ganda antar garis tabel agar menjadi garis tipis yang rapi dan tegas. |

---

## 5. Tata Letak Fleksibel & Respons Interaksi (Modul 06 & 07)

| Konsep Web | Elemen Fisik Kedai Kopi | Alasan & Model Mental |
|---|---|---|
| `display: flex` | Meja bar barista satu garis lurus | Menjajarkan mesin espresso, grinder, dan kasir dalam satu baris kerja yang rapi. |
| `justify-content: space-between` | Logo di sudut kiri meja, tautan menu di sudut kanan | Menaruh mesin kasir di ujung kiri dan etalase roti di ujung kanan dengan ruang lega di tengahnya. |
| `align-items: center` | Menyamakan ketinggian pandang barista dan kasir | Memastikan semua alat seduh sejajar di garis tengah horizontal. |
| `:hover` | Reaksi tangan menyentuh kenop pintu kedai | Kenop pintu terasa hangat atau lampu meja menyala redup saat tangan pelanggan mendekat. |
| `:active` | Tombol bel pesanan kasir yang amblas saat ditekan | Reaksi fisik saat tombol ditekan ke bawah dengan jari. |
| `:focus` | Lampu sorot meja belajar yang menyala saat tamu mulai duduk | Lampu fokus yang menyala di atas formulir saat pelanggan mulai mengetik. |
| `onsubmit` & `alert()` | Respon barista tersenyum sambil menyobek struk | Barista mengangguk ramah: "Pesanan meja dicatat, silakan duduk!". |
| **Audit & Showcase** | Pengecekan akhir meja & Membalik plang "OPEN" | Barista mengelap meja, mengecek seduhan espresso pertama, membuka tirai, dan membuka pintu kedai untuk umum. |
