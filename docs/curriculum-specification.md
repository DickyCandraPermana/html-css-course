# Silabus & Kurikulum Lengkap: KopiCode (HTML & CSS Masterclass)

**Tema Proyek:** Membangun Website Interaktif "Kedai Kopi / Resto Mini-Hub"  
**Format:** Modul Pembelajaran Interaktif + Tantangan Live Coding Sidebar + FreeCodeCamp-Style Test Assertions  
**Level:** Pemula (Beginner-Friendly)

---

## DAFTAR MODUL

```
[ MODUL 01 ] ──▶ Fondasi HTML & Identitas Kedai Kopi (h1, p, img, semantic layout)
[ MODUL 02 ] ──▶ Fasilitas & Keunggulan Layanan (ul, ol, li)
[ MODUL 03 ] ──▶ Tabel Menu Makanan & Minuman Terstruktur (table, thead, tbody, tr, th, td)
[ MODUL 04 ] ──▶ Formulir Reservasi Meja Lengkap (form, input types, radio, select, textarea, button)
[ MODUL 05 ] ──▶ Styling Estetika dengan CSS & Box Model (warna, font, padding, border-radius, table styling)
[ MODUL 06 ] ──▶ Tata Letak Flexbox Modern & Sentuhan Interaktif (navbar flex, hover effects, onsubmit alert)
[ MODUL 07 ] ──▶ Audit Final, Uji Responsif, & Publikasi ke Showcase Gallery
```

---

## MODUL 01: FONDASI HTML & IDENTITAS KEDAI KOPI

### 1. Tujuan Pembelajaran
* Memahami cara browser membaca dokumen web.
* Memahami anatomi tag HTML (tag pembuka, isi/konten, tag penutup, dan atribut).
* Menguasai struktur dasar dokumen HTML5 (`<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`).
* Mengenal hirarki heading (`<h1>` - `<h6>`), paragraf (`<p>`), dan tag media gambar (`<img>`).

### 2. Teori & Analogi
> **Analogi Arsitektur Web:**  
> Jika sebuah website diibaratkan sebagai bangunan kedai kopi fisik:
> * **HTML** adalah pondasi, tiang beton, dinding, dan pintu (kerangka struktural).
> * **CSS** adalah cat warna dinding, lampu gantung estetik, dan tata letak meja (dekorasi & estetika).
> * **JavaScript** adalah bel pintu otomatis dan mesin kasir interaktif (fungsionalitas dinamis).

* **Struktur Wajib Dokumen:**
  ```html
  <!DOCTYPE html>
  <html lang="id">
    <head>
      <meta charset="UTF-8">
      <title>Kopi Senja Bahagia</title>
    </head>
    <body>
      <!-- Semua konten yang tampil di layar ditaruh di sini -->
    </body>
  </html>
  ```
* **Hirarki Heading:** Hanya boleh ada **satu** `<h1>` per halaman sebagai nama utama website/brand. Sub-bagian menggunakan `<h2>` dan `<h3>`.
* **Tag Gambar Mandiri (*Self-closing*):** `<img src="..." alt="...">`. Atribut `alt` wajib ada untuk mendeskripsikan gambar jika gagal dimuat atau bagi pengguna pembaca layar (*screen reader*).

### 3. Instruksi Tantangan Peserta (Sidebar Task)
1. Buat struktur dasar dokumen HTML di tab `index.html`.
2. Di dalam `<body>`, buat header brand kedai kopimu dengan tag `<h1>` (contoh: `<h1>Kopi Nusantara Brew & Co.</h1>`).
3. Buat satu kalimat tagline atau deskripsi singkat kedai kopi menggunakan tag `<p>`.
4. Tambahkan gambar banner kedai kopi dengan tag `<img>`. Gunakan URL foto banner yang disediakan dan beri atribut `alt` yang deskriptif.

### 4. Test Assertions (freeCodeCamp Style)
* `[TEST-1.1]` `doc.querySelector('h1') !== null && doc.querySelector('h1').textContent.trim().length > 0`  
  *Pesan:* Tag `<h1>` harus ada dan memiliki teks nama kedai kopi.
* `[TEST-1.2]` `doc.querySelector('p') !== null && doc.querySelector('p').textContent.trim().length > 0`  
  *Pesan:* Tag `<p>` harus ada sebagai kalimat tagline atau deskripsi cafe.
* `[TEST-1.3]` `doc.querySelector('img') !== null && doc.querySelector('img').getAttribute('src') && doc.querySelector('img').getAttribute('alt')`  
  *Pesan:* Tag `<img>` harus memiliki atribut `src` dan atribut deskripsi `alt`.

### 5. Kode Kunci Jawaban (Reference Solution)
```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Kopi Artisan Senja</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <h1>Kopi Artisan Senja</h1>
    <p>Tempat ternyaman untuk seduhan kopi single origin terbaik dan cerita berharga.</p>
    <img src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800" alt="Suasana Kedai Kopi Artisan Senja">
  </header>
</body>
</html>
```

---

## MODUL 02: FASILITAS & KEUNGGULAN LAYANAN (LISTS)

### 1. Tujuan Pembelajaran
* Memahami fungsi pengelompokan informasi menggunakan daftar (*lists*).
* Membedakan *Unordered List* (`<ul>`) dan *Ordered List* (`<ol>`).
* Memahami cara membungkus item dengan tag `<li>` (*list item*).

### 2. Teori & Konsep
* **Unordered List (`<ul>`):** Digunakan ketika urutan tidak mempengaruhi arti (daftar fitur, fasilitas, bahan-bahan, menu rekomendasi). Default browser menampilkan *bullet points*.
* **Ordered List (`<ol>`):** Digunakan ketika urutan memiliki tahapan berurutan (panduan langkah demi langkah, peringkat terpopuler, alur pemesanan). Default browser menampilkan angka `1, 2, 3...`.
* **Aturan Penting:** Tag `<li>` **hanya boleh** menjadi anak langsung (*direct child*) dari `<ul>` atau `<ol>`.

### 3. Instruksi Tantangan Peserta (Sidebar Task)
1. Di bawah banner foto, buat sub-judul `<h2>` bertuliskan `"Fasilitas & Keunggulan Kami"`.
2. Buat satu elemen `<ul>` untuk mencantumkan keunggulan cafe.
3. Masukkan minimal 3 tag `<li>` di dalam `<ul>`, misalnya:
   * *High-Speed Wi-Fi & Banyak Colokan*
   * *Area Outdoor Teduh & Smoking Room Nyaman*
   * *Biji Kopi Asli Nusantara (Single Origin Manual Brew)*

### 4. Test Assertions
* `[TEST-2.1]` `doc.querySelector('h2') !== null && doc.querySelector('h2').textContent.trim().length > 0`  
  *Pesan:* Tag `<h2>` harus ada sebagai judul section fasilitas.
* `[TEST-2.2]` `doc.querySelector('ul') !== null || doc.querySelector('ol') !== null`  
  *Pesan:* Terdapat elemen pembungkus list (`<ul>` atau `<ol>`).
* `[TEST-2.3]` `doc.querySelectorAll('li').length >= 3`  
  *Pesan:* Terdapat minimal 3 item fasilitas yang dibungkus dengan tag `<li>`.

### 5. Kode Kunci Jawaban
```html
<section id="fasilitas">
  <h2>Fasilitas & Keunggulan Kami</h2>
  <ul>
    <li>Koneksi Wi-Fi Berkecepatan Tinggi & Stopkontak di Setiap Meja</li>
    <li>Area Semi-Outdoor Teduh dan Smoking Area Terpisah</li>
    <li>Biji Kopi Single Origin Pilihan dari Petani Lokal</li>
    <li>Pilihan Cemilan & Makanan Berat Ramah Kantong</li>
  </ul>
</section>
```

---

## MODUL 03: TABEL MENU MAKANAN & MINUMAN (TABLES)

### 1. Tujuan Pembelajaran
* Memahami cara menyajikan data terstruktur dua dimensi (baris dan kolom).
* Menguasai elemen semantic tabel: `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, dan `<td>`.
* Memahami konsep header kolom vs isi data sel.

### 2. Teori & Anatomi Tabel
* `<table>`: Kontainer utama pembungkus tabel.
* `<thead>`: Bagian kepala tabel yang memuat judul-judul kolom.
* `<tbody>`: Bagian badan tabel yang memuat data baris yang sebenarnya.
* `<tr>` (*Table Row*): Baris horizontal di dalam tabel.
* `<th>` (*Table Header*): Sel judul kolom (otomatis tebal dan rata tengah secara default).
* `<td>` (*Table Data*): Sel data biasa untuk isi konten.

```html
<table>
  <thead>
    <tr>
      <th>Kategori</th>
      <th>Nama Menu</th>
      <th>Harga</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Kopi</td>
      <td>Espresso Double Shot</td>
      <td>Rp 18.000</td>
    </tr>
  </tbody>
</table>
```

### 3. Instruksi Tantangan Peserta (Sidebar Task)
1. Buat sub-judul `<h2>` bertuliskan `"Daftar Menu Favorit"`.
2. Buat elemen `<table>` yang memiliki blok `<thead>` dan blok `<tbody>`.
3. Di dalam `<thead>`, buat 1 baris `<tr>` dengan 3 judul kolom `<th>`: `"Kategori"`, `"Menu"`, dan `"Harga"`.
4. Di dalam `<tbody>`, buat minimal 3 baris data `<tr>`, di mana setiap baris memiliki 3 sel data `<td>` (contoh: Americano, Croissant Butter, Matcha Latte).

### 4. Test Assertions
* `[TEST-3.1]` `doc.querySelector('table') !== null && doc.querySelector('thead') !== null && doc.querySelector('tbody') !== null`  
  *Pesan:* Elemen `<table>` harus memiliki blok `<thead>` dan blok `<tbody>`.
* `[TEST-3.2]` `doc.querySelectorAll('thead th').length >= 3`  
  *Pesan:* Terdapat minimal 3 kolom header (`<th>`) pada `<thead>` (Kategori, Menu, Harga).
* `[TEST-3.3]` `doc.querySelectorAll('tbody tr').length >= 3`  
  *Pesan:* Terdapat minimal 3 baris menu (`<tr>`) di dalam `<tbody>`.
* `[TEST-3.4]` `doc.querySelectorAll('tbody td').length >= 9`  
  *Pesan:* Setiap baris menu harus memiliki 3 sel data (`<td>`) yang lengkap.

### 5. Kode Kunci Jawaban
```html
<section id="menu">
  <h2>Daftar Menu Favorit</h2>
  <table>
    <thead>
      <tr>
        <th>Kategori</th>
        <th>Menu</th>
        <th>Harga</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Manual Brew</td>
        <td>V60 Aceh Gayo</td>
        <td>Rp 25.000</td>
      </tr>
      <tr>
        <td>Espresso Based</td>
        <td>Caramel Macchiato</td>
        <td>Rp 28.000</td>
      </tr>
      <tr>
        <td>Pastry / Cemilan</td>
        <td>Croissant Butter Crispy</td>
        <td>Rp 22.000</td>
      </tr>
      <tr>
        <td>Non-Coffee</td>
        <td>Artisan Matcha Latte</td>
        <td>Rp 26.000</td>
      </tr>
    </tbody>
  </table>
</section>
```

---

## MODUL 04: FORMULIR RESERVASI MEJA LENGKAP (FORMS)

### 1. Tujuan Pembelajaran
* Memahami cara kerja form web untuk mengumpulkan input dari pengguna.
* Menguasai berbagai tipe `<input>` HTML5 (`text`, `email`, `date`, `number`, `radio`, `checkbox`).
* Menguasai elemen pilihan dropdown `<select>` dan `<option>`.
* Menguasai input teks multi-baris `<textarea>`.
* Menguasai tag `<label>` dan tombol submit `<button type="submit">`.

### 2. Teori & Macam-Macam Kontrol Form
* `<form>`: Pembungkus seluruh kontrol formulir.
* `<label>`: Label teks pendamping input. Mengklik label akan memfokuskan input terkait jika dihubungkan dengan atribut `for="id_input"` atau dibungkus langsung.
* `<input type="text">`: Input teks 1 baris untuk nama lengkap.
* `<input type="email">`: Input email dengan validasi format otomatis browser.
* `<input type="date">`: Pemilih tanggal kalender bawaan browser.
* `<input type="number">`: Input angka khusus (dengan batas `min="1"`).
* `<input type="radio">`: Pilihan satu opsi dari beberapa alternatif. **Wajib memiliki atribut `name` yang sama** agar hanya satu yang bisa dipilih.
* `<select>` & `<option>`: Menu tarik-turun (*dropdown*).
* `<textarea>`: Input teks luas untuk catatan khusus / request meja.
* `<button type="submit">`: Tombol pemicu pengiriman form.

### 3. Instruksi Tantangan Peserta (Sidebar Task)
1. Buat sub-judul `<h2>` bertuliskan `"Reservasi Meja Cafe"`.
2. Buat elemen `<form>` yang membungkus:
   - Field Nama Lengkap Tamu (`<input type="text" placeholder="Nama Anda" required>`)
   - Field Tanggal Reservasi (`<input type="date" required>`)
   - Field Jumlah Kursi (`<input type="number" min="1" required>`)
   - Pilihan Area Meja menggunakan minimal 2 radio button dengan `name="area"` (contoh: Area Indoor AC dan Area Outdoor Taman).
   - Dropdown pilihan Cabang Cafe (`<select>` dengan minimal 2 `<option>`).
   - Field Catatan Khusus menggunakan `<textarea>`.
   - Tombol submit `<button type="submit">` bertuliskan `"Pesan Meja Sekarang"`.

### 4. Test Assertions
* `[TEST-4.1]` `doc.querySelector('form') !== null`  
  *Pesan:* Elemen `<form>` harus ada untuk menampung formulir reservasi.
* `[TEST-4.2]` `doc.querySelector('input[type="text"]') !== null`  
  *Pesan:* Terdapat input teks untuk nama pemesan.
* `[TEST-4.3]` `doc.querySelector('input[type="date"]') !== null`  
  *Pesan:* Terdapat input pemilih tanggal kedatangan.
* `[TEST-4.4]` `doc.querySelectorAll('input[type="radio"]').length >= 2`  
  *Pesan:* Terdapat minimal 2 opsi radio button untuk pemilihan area meja.
* `[TEST-4.5]` `doc.querySelector('select') !== null && doc.querySelectorAll('select option').length >= 2`  
  *Pesan:* Terdapat dropdown `<select>` dengan minimal 2 pilihan opsi cabang/meja.
* `[TEST-4.6]` `doc.querySelector('textarea') !== null`  
  *Pesan:* Terdapat input `<textarea>` untuk catatan atau request khusus.
* `[TEST-4.7]` `doc.querySelector('button[type="submit"]') !== null || doc.querySelector('form button') !== null`  
  *Pesan:* Terdapat tombol submit untuk mengirim reservasi.

### 5. Kode Kunci Jawaban
```html
<section id="reservasi">
  <h2>Reservasi Meja Cafe</h2>
  <form id="form-reservasi">
    <div class="form-group">
      <label for="nama">Nama Lengkap:</label>
      <input type="text" id="nama" name="nama" placeholder="Masukkan nama Anda" required>
    </div>

    <div class="form-group">
      <label for="tanggal">Tanggal Kunjungan:</label>
      <input type="date" id="tanggal" name="tanggal" required>
    </div>

    <div class="form-group">
      <label for="jumlah">Jumlah Tamu (Kursi):</label>
      <input type="number" id="jumlah" name="jumlah" min="1" value="2" required>
    </div>

    <div class="form-group">
      <label>Pilihan Area:</label>
      <label><input type="radio" name="area" value="indoor" checked> Indoor AC (Bebas Asap)</label>
      <label><input type="radio" name="area" value="outdoor"> Semi-Outdoor Garden</label>
    </div>

    <div class="form-group">
      <label for="cabang">Pilih Cabang:</label>
      <select id="cabang" name="cabang">
        <option value="senopati">Cabang Senopati Central</option>
        <option value="dago">Cabang Dago Atas</option>
      </select>
    </div>

    <div class="form-group">
      <label for="catatan">Catatan / Permintaan Khusus:</label>
      <textarea id="catatan" name="catatan" rows="3" placeholder="Contoh: Dekat stopkontak, baby chair..."></textarea>
    </div>

    <button type="submit">Pesan Meja Sekarang</button>
  </form>
</section>
```

---

## MODUL 05: STYLING ESTETIKA DENGAN CSS & BOX MODEL

### 1. Tujuan Pembelajaran
* Memahami cara kerja CSS (Cascading Style Sheets) dalam menghias struktur HTML.
* Menguasai selektor elemen, class (`.class`), dan ID (`#id`).
* Memahami penerapan palet warna (Hex, RGB, HSL) dan tipografi modern Google Fonts.
* Menguasai konsep fundamental **Box Model** (`content`, `padding`, `border`, `margin`).
* Memahami teknik styling tabel (`border-collapse`, zebra-striping `nth-child`).

### 2. Teori & Konsep Box Model
* **Margin:** Ruang kosong di **luar** elemen (memberi jarak antar elemen/kartu).
* **Border:** Garis batas di sekeliling elemen (`border: 1px solid #333333`).
* **Padding:** Ruang udara di **dalam** elemen, antara border dengan konten tulisan.
* **Border Radius:** Membuat sudut tajam menjadi melengkung halus (`border-radius: 8px`).
* **Styling Tabel Modern:**
  ```css
  table {
    width: 100%;
    border-collapse: collapse; /* Menghilangkan celah dobel antar sel */
  }
  th, td {
    padding: 12px;
    border-bottom: 1px solid #222;
  }
  tbody tr:nth-child(even) {
    background-color: #161616; /* Efek garis selang-seling (zebra) */
  }
  ```

### 3. Instruksi Tantangan Peserta (Sidebar Task)
1. Buka tab `style.css`.
2. Tentukan warna latar belakang gelap/hangat pada `body` atau pembungkus utama serta atur warna teks menjadi terang.
3. Berikan properti `padding` dan `margin` pada section kartu agar konten tidak menempel ke tepi layar.
4. Berikan styling pada `table`: gunakan `width: 100%`, `border-collapse: collapse`, dan berikan `padding` pada `th` dan `td`.
5. Berikan `border-radius` pada tombol submit dan gambar banner agar memiliki sudut rounded modern.

### 4. Test Assertions
* `[TEST-5.1]` `/color\s*:/i.test(css) && /background(-color)?\s*:/i.test(css)`  
  *Pesan:* CSS harus mendefinisikan warna teks (`color`) dan warna latar (`background-color`).
* `[TEST-5.2]` `/padding\s*:/i.test(css) && /margin\s*:/i.test(css)`  
  *Pesan:* Menggunakan properti Box Model (`padding` dan `margin`) untuk mengatur jarak elemen.
* `[TEST-5.3]` `/border(-radius)?\s*:/i.test(css)`  
  *Pesan:* Menggunakan `border` atau `border-radius` untuk mempercantik kartu, tabel, atau tombol.
* `[TEST-5.4]` `/border-collapse\s*:\s*collapse/i.test(css)`  
  *Pesan:* Mengatur tabel dengan `border-collapse: collapse` agar garis tabel tersusun rapi.

### 5. Kode Kunci Jawaban (style.css)
```css
body {
  background-color: #0c0a09;
  color: #f5f5f4;
  font-family: 'Plus Jakarta Sans', sans-serif;
  margin: 0;
  padding: 24px;
}

header, section {
  background-color: #1c1917;
  border: 1px solid #292524;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
}

img {
  width: 100%;
  max-height: 350px;
  object-fit: cover;
  border-radius: 8px;
  margin-top: 12px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
}

th, td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #292524;
}

th {
  background-color: #292524;
  color: #f59e0b;
}

tbody tr:nth-child(even) {
  background-color: #171513;
}

button {
  background-color: #d97706;
  color: #ffffff;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}
```

---

## MODUL 06: TATA LETAK FLEXBOX & SENTUHAN INTERAKTIF

### 1. Tujuan Pembelajaran
* Memahami konsep tata letak 1-dimensi menggunakan **CSS Flexbox**.
* Menguasai properti Flex Container: `display: flex`, `justify-content`, `align-items`, dan `gap`.
* Menguasai pseudo-class interaktif `:hover` dan transisi halus `transition`.
* Menambahkan interaksi formulir mikro sederhana menggunakan atribut HTML `onsubmit` JavaScript alert.

### 2. Teori & Konsep Flexbox
* **`display: flex`:** Mengubah elemen pembungkus menjadi flex container; anak-anaknya otomatis sejajar horizontal berdampingan.
* **`justify-content: space-between`:** Mendorong elemen pertama ke ujung kiri dan elemen terakhir ke ujung kanan (sangat ideal untuk bar navigasi / header brand).
* **`align-items: center`:** Menyelaraskan elemen secara vertikal agar pas di tengah garis.
* **`gap: 16px`:** Memberi jarak yang rapi dan terukur antar item flex tanpa perlu trik margin manual.
* **Efek `:hover`:**
  ```css
  button:hover {
    background-color: #b45309;
    transform: translateY(-2px);
    transition: all 0.2s ease;
  }
  ```
* **Interaksi Mikro Form:**
  `<form onsubmit="alert('Terima kasih! Reservasi meja Anda telah kami terima.'); return false;">`  
  *Penjelasan:* Menghentikan reload halaman default browser (`return false`) dan menampilkan pop-up konfirmasi yang ramah.

### 3. Instruksi Tantangan Peserta (Sidebar Task)
1. Buat elemen `<nav>` di bagian atas header kedai kopi dengan logo brand di kiri dan tautan menu di kanan (`<nav class="navbar">`).
2. Di `style.css`, terapkan `display: flex`, `justify-content: space-between`, dan `align-items: center` pada class navbar.
3. Tambahkan efek `:hover` dengan transisi halus pada tombol pesan reservasi meja.
4. Tambahkan atribut `onsubmit="alert('Reservasi meja berhasil dikirim!'); return false;"` pada tag `<form>`.

### 4. Test Assertions
* `[TEST-6.1]` `/display\s*:\s*flex/i.test(css)`  
  *Pesan:* CSS harus menggunakan tata letak `display: flex` pada navbar atau komponen layout.
* `[TEST-6.2]` `/justify-content\s*:/i.test(css) || /align-items\s*:/i.test(css)`  
  *Pesan:* Menggunakan properti perataan Flexbox (`justify-content` atau `align-items`).
* `[TEST-6.3]` /:hover/i.test(css)  
  *Pesan:* Terdapat efek `:hover` pada tombol atau link navigasi.
* `[TEST-6.4]` `/onsubmit\s*=/i.test(html) || /alert\(/i.test(html)`  
  *Pesan:* Formulir memiliki sentuhan interaksi mikro (atribut `onsubmit` dengan pesan alert).

### 5. Kode Kunci Jawaban
```html
<!-- Penambahan Navbar di Header -->
<nav class="navbar">
  <div class="logo">☕ Senja Brew</div>
  <div class="nav-links">
    <a href="#fasilitas">Fasilitas</a>
    <a href="#menu">Menu</a>
    <a href="#reservasi">Reservasi</a>
  </div>
</nav>
```

```css
/* Penambahan CSS Flexbox & Interaksi */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background-color: #1c1917;
  border-bottom: 1px dashed #44403c;
  margin-bottom: 24px;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-links a {
  color: #a8a29e;
  text-decoration: none;
  transition: color 0.2s;
}

.nav-links a:hover {
  color: #f59e0b;
}

button {
  transition: background-color 0.2s, transform 0.1s;
}

button:hover {
  background-color: #f59e0b;
  transform: translateY(-2px);
}
```

---

## MODUL 07: AUDIT FINAL, UJI RESPONSIF, & PUBLIKASI KE SHOWCASE

### 1. Tujuan Pembelajaran
* Melakukan peninjauan menyeluruh (*self-code review*) pada proyek HTML & CSS yang sudah dibuat.
* Menguji responsivitas tampilan menggunakan fitur **Fullscreen Device Inspector** (Desktop, Tablet, dan Mobile).
* Mempublikasikan karya final ke **Showcase Gallery** publik dan database PostgreSQL.

### 2. Checklist Audit Kesiapan Publikasi
1. [x] **Struktur Semantik:** Header, Nav, Sections, Table, Form, dan Footer tersusun rapi.
2. [x] **Tabel Menu:** Menampilkan daftar harga dengan kolom dan baris yang jelas.
3. [x] **Formulir Interaktif:** Seluruh field input (nama, tanggal, kursi, area radio, catatan) dapat diisi dan dicoba.
4. [x] **Estetika CSS:** Warna hangat kedai kopi, tipografi proporsional, sudut rounded, dan jarak padding/margin nyaman dipandang.
5. [x] **Flexbox Layout:** Navigasi horizontal rapi dan tombol responsif saat disentuh kursor.

### 3. Aksi Publikasi (Sidebar Action)
1. Periksa panel checklist; pastikan seluruh indikator dari Modul 1 sampai 6 bertanda centang hijau `✓ Lolos`.
2. Klik tombol `[ ⛶ Fullscreen Preview ]` untuk memastikan tampilan website kedai kopimu terlihat sempurna di layar penuh.
3. Di panel publikasi, isi kolom **"Nama Kedai Kopi"** karyamu.
4. Klik tombol glowing **`[ 🚀 Publish ke Showcase Gallery ]`**.
5. Karyamu seketika tersimpan di database PostgreSQL dan langsung tayang di `/showcase` untuk dilihat dan diberi apresiasi (*like*) oleh teman-teman sekelas!
