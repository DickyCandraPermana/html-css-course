# Silabus & Kurikulum Lengkap: KopiCode (HTML & CSS Masterclass)

**Tema Proyek:** Membangun Website Interaktif "Kedai Kopi / Resto Mini-Hub"  
**Format:** Modul Pembelajaran Utama + Materi Pendukung (Praktek Langsung + FreeCodeCamp-Style Test Assertions + Side Knowledge Bites)  
**Level:** Pemula (Beginner-Friendly)

---

## 🗺️ PETA MATERI: UTAMA & PENDUKUNG

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│ MODUL 01 // FONDASI DOKUMEN, HEADING, TEKS FORMATTING & MEDIA                    │
│   • Utama: <!DOCTYPE>, <html>, <head>, <body>, <h1>-<h6>, <p>, <img>             │
│   • Pendukung: <strong>, <b>, <em>, <i>, <small>, <mark>, <br>, <hr>, <a>        │
│   • Konsep: Block-level vs Inline-level elements                                 │
├──────────────────────────────────────────────────────────────────────────────────┤
│ MODUL 02 // PENGELOMPOKAN DATA DENGAN LIST & CONTAINER DIV                       │
│   • Utama: <ul>, <ol>, <li> untuk fasilitas kedai kopi                           │
│   • Pendukung: <div> (wadah generik block) vs <span> (wadah generik inline)      │
│   • Konsep: Parent-child relationship dalam DOM                                  │
├──────────────────────────────────────────────────────────────────────────────────┤
│ MODUL 03 // TABEL DATA TABULAR & BADGE STATUS                                    │
│   • Utama: <table>, <thead>, <tbody>, <tr>, <th>, <td> (menu & harga)            │
│   • Pendukung: Tag <mark> (Best Seller) & <small> (keterangan porsi/pajak)       │
├──────────────────────────────────────────────────────────────────────────────────┤
│ MODUL 04 // FORMULIR RESERVASI MEJA LENGKAP & INPUT ACCESSIBILITY                │
│   • Utama: <form>, <input> (text, email, date, number, radio), <select>,         │
│            <textarea>, <button type="submit">                                    │
│   • Pendukung: Atribut required, placeholder, name, id, label for, disabled      │
├──────────────────────────────────────────────────────────────────────────────────┤
│ MODUL 05 // CSS BOX MODEL MENDALAM, WARNA, GRADASI, & CARA MENGETENGAHKAN DIV    │
│   • Utama: Selektor CSS, warna, font, padding, margin, border, border-radius     │
│   • Pendukung: box-sizing: border-box, width vs max-width, height/min-height     │
│   • Khusus: linear-gradient(...), background-image & background-size: cover      │
│   • Jurus: "Cara Mengetengahkan <div>" (margin: 0 auto & Flexbox)                │
├──────────────────────────────────────────────────────────────────────────────────┤
│ MODUL 06 // LAYOUT FLEXBOX & RAGAM PSEUDO-CLASS INTERAKTIF                       │
│   • Utama: display: flex, justify-content, align-items, gap                      │
│   • Pendukung: Ragam Pseudo-Class (:hover, :active, :focus, :nth-child)          │
│   • Interaktivitas Mikro: Atribut onsubmit JavaScript alert                      │
├──────────────────────────────────────────────────────────────────────────────────┤
│ MODUL 07 // AUDIT FINAL, INSPEKSI RESPONSIF, & PUBLIKASI KE SHOWCASE             │
│   • Review kode menyeluruh, uji responsive preview, publish ke database Postgres │
└──────────────────────────────────────────────────────────────────────────────────┘
```

---

## MODUL 01: FONDASI HTML, FORMAT TEKS, & MEDIA

### 1. Tujuan Pembelajaran
* Memahami cara browser membaca dokumen web.
* Menguasai struktur dasar dokumen HTML5 (`<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`).
* Mengenal hirarki heading (`<h1>` - `<h6>`), paragraf (`<p>`), dan tag media gambar (`<img>`).
* **Materi Pendukung:** Format teks (`<strong>`, `<b>`, `<em>`, `<i>`, `<small>`, `<mark>`), pemisah `<hr>`, dan ganti baris `<br>`.
* **Konsep Inti:** Membedakan elemen *Block* (mengambil lebar penuh) vs *Inline* (mengalir mengikuti teks).

### 2. Teori & Materi Pendukung

#### A. Rangka Dokumen Standar
```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kopi Artisan Senja</title>
</head>
<body>
  <!-- Semua konten visual diletakkan di sini -->
</body>
</html>
```

#### B. Anatomi Heading & Media
* `<h1>`: Judul utama brand kedai kopi (hanya 1 per halaman demi standar SEO & aksesibilitas).
* `<p>`: Paragraf teks deskripsi.
* `<img src="..." alt="...">`: Menampilkan foto. Atribut `alt` wajib diisi untuk mendeskripsikan konten gambar.

#### C. 💡 Materi Pendukung: Format Teks & Utility
Seringkali di teks cafe kita ingin menekankan kata tertentu:
* **`<strong>` vs `<b>`:**
  * `<strong>`: Teks tebal dengan makna **penting / krusial** secara semantik (contoh: *Buka setiap hari jam <strong>07.00 - 23.00</strong>*).
  * `<b>`: Teks tebal murni untuk visual tanpa penekanan khusus.
* **`<em>` vs `<i>`:**
  * `<em>` (*emphasis*): Teks miring dengan nada penekanan makna suara.
  * `<i>`: Teks miring untuk istilah asing, nama latin biji kopi (*Coffea canephora*), atau ikon.
* **`<small>`:** Teks ukuran kecil (bagus untuk catatan kaki: `<small>*Syarat & ketentuan berlaku</small>`).
* **`<mark>`:** Efek stabilo kuning untuk promo (contoh: `<mark>Diskon 20%</mark>`).
* **`<br>`:** Pindah baris tanpa membuat paragraf baru (*break line*).
* **`<hr>`:** Garis horizontal pemisah seksi (*horizontal rule*).

#### D. 💡 Konsep Penting: Block vs Inline
* **Block Element** (`<h1>`, `<p>`, `<hr>`, `<div>`): Selalu dimulai di baris baru dan melebar 100% dari kontainer.
* **Inline Element** (`<strong>`, `<em>`, `<span>`, `<a>`): Tidak membuat baris baru; mengalir berdampingan dengan kata-kata di sekitarnya.

---

### 3. Instruksi Tantangan Peserta (Sidebar Task)
1. Tulis struktur dokumen dasar HTML di tab `index.html`.
2. Di dalam `<body>`, buat tag `<h1>` yang berisi nama kedai kopimu (contoh: `<h1>Kopi Artisan Senja</h1>`).
3. Tambahkan satu kalimat tagline menggunakan tag `<p>`, dan gunakan tag `<strong>` atau `<em>` pada setidaknya satu kata di dalamnya untuk memberi penekanan.
4. Tambahkan garis pemisah menggunakan tag `<hr>`.
5. Tampilkan gambar banner kedai kopi menggunakan tag `<img>` dengan atribut `src` dan atribut `alt`.

---

### 4. Test Assertions (freeCodeCamp Style)
* `[TEST-1.1]` `doc.querySelector('h1') !== null && doc.querySelector('h1').textContent.trim().length > 0`  
  *Pesan:* Tag `<h1>` harus ada dan memuat nama kedai kopimu.
* `[TEST-1.2]` `doc.querySelector('p') !== null && doc.querySelector('p').textContent.trim().length > 0`  
  *Pesan:* Tag `<p>` harus ada sebagai kalimat deskripsi cafe.
* `[TEST-1.3]` `doc.querySelector('p strong') !== null || doc.querySelector('p em') !== null || doc.querySelector('strong') !== null || doc.querySelector('em') !== null`  
  *Pesan:* Gunakan tag format teks `<strong>` atau `<em>` untuk menekankan kata dalam kalimat.
* `[TEST-1.4]` `doc.querySelector('hr') !== null`  
  *Pesan:* Gunakan tag garis horizontal `<hr>` sebagai pemisah bagian.
* `[TEST-1.5]` `doc.querySelector('img') !== null && doc.querySelector('img').getAttribute('src') && doc.querySelector('img').getAttribute('alt')`  
  *Pesan:* Tag `<img>` harus memiliki atribut `src` dan atribut deskripsi `alt`.

---

### 5. Kode Kunci Jawaban
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
    <p>Menyajikan seduhan biji kopi <strong>single origin terbaik</strong> nusantara dengan suasana <em>paling nyaman</em> untuk bekerja.</p>
    <hr>
    <img src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800" alt="Suasana Kedai Kopi Artisan Senja">
  </header>
</body>
</html>
```

---

## MODUL 02: FASILITAS & CONTAINER PENGELOMPOK (LISTS & DIV)

### 1. Tujuan Pembelajaran
* Memahami cara menyajikan daftar informasi berbutir.
* Membedakan *Unordered List* (`<ul>`) dan *Ordered List* (`<ol>`).
* Memahami cara membungkus item dengan tag `<li>`.
* **Materi Pendukung:** Memahami tag kontainer serbaguna `<div>` vs `<span>`, dan tautan anchor `<a>`.

### 2. Teori & Materi Pendukung

#### A. Daftar: Unordered vs Ordered
* `<ul>` (*Unordered List*): Menampilkan bullet points bundar. Cocok untuk daftar fasilitas, keunggulan, atau varian rasa.
* `<ol>` (*Ordered List*): Menampilkan penomoran `1, 2, 3...`. Cocok untuk tata cara reservasi atau resep seduh kopi manual.
* Tag `<li>` (*List Item*): Wajib berada langsung di dalam `<ul>` atau `<ol>`.

#### B. 💡 Materi Pendukung: Mengenal `<div>` dan `<span>`
* **`<div>` (Division):** Kotak pembungkus generik bertipe **block**. Digunakan untuk mengelompokkan beberapa elemen (misalnya membungkus satu bagian kartu fasilitas lengkap) agar mudah diatur tata letak dan warnanya di CSS.
* **`<span>`:** Kotak pembungkus generik bertipe **inline**. Digunakan untuk menargetkan sebagian kecil kata di dalam kalimat tanpa merusak alur baris teks.
* **`<a>` (Anchor Link):**
  * Tautan eksternal: `<a href="https://instagram.com/..." target="_blank">Instagram Kami</a>`
  * Tautan internal (lompat ke bagian halaman): `<a href="#fasilitas">Lihat Fasilitas</a>`

---

### 3. Instruksi Tantangan Peserta (Sidebar Task)
1. Buat kontainer `<div id="fasilitas">` atau `<section id="fasilitas">`.
2. Di dalamnya, buat sub-judul `<h2>` bertuliskan `"Fasilitas & Layanan Kami"`.
3. Buat satu elemen `<ul>` yang memuat minimal 3 item fasilitas menggunakan tag `<li>`.
4. Tambahkan satu tag tautan `<a href="#menu">Lihat Daftar Menu &darr;</a>` di bawah list.

---

### 4. Test Assertions
* `[TEST-2.1]` `doc.querySelector('h2') !== null`  
  *Pesan:* Tag `<h2>` harus ada sebagai judul bagian fasilitas.
* `[TEST-2.2]` `doc.querySelector('ul') !== null || doc.querySelector('ol') !== null`  
  *Pesan:* Terdapat elemen pembungkus list (`<ul>` atau `<ol>`).
* `[TEST-2.3]` `doc.querySelectorAll('li').length >= 3`  
  *Pesan:* Terdapat minimal 3 item `<li>` di dalam list fasilitas.
* `[TEST-2.4]` `doc.querySelector('a') !== null && doc.querySelector('a').getAttribute('href')`  
  *Pesan:* Terdapat elemen tautan `<a>` dengan atribut `href`.

---

### 5. Kode Kunci Jawaban
```html
<div id="fasilitas" class="card-section">
  <h2>Fasilitas & Layanan Kami</h2>
  <ul>
    <li>Free Wi-Fi High-Speed 100 Mbps & Stopkontak di Setiap Meja</li>
    <li>Area Semi-Outdoor Sejuk dan Ruang Non-Smoking Ber-AC</li>
    <li>Biji Kopi Pilihan Specialty Grade dari Barista Berpengalaman</li>
    <li>Musholla Bersih dan Area Parkir Luas</li>
  </ul>
  <p><a href="#menu">Jelajahi Menu Makanan & Minuman &rarr;</a></p>
</div>
```

---

## MODUL 03: TABEL MENU & HARGA DENGAN STATUS BADGE

### 1. Tujuan Pembelajaran
* Menguasai penyajian data dua dimensi (baris dan kolom).
* Menguasai elemen semantic tabel: `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, dan `<td>`.
* **Materi Pendukung:** Memanfaatkan tag `<mark>` dan `<small>` untuk label menu spesial (*Best Seller* / *Promo*).

### 2. Teori & Anatomi Tabel
* `<table>`: Kontainer utama pembungkus tabel.
* `<thead>`: Kepala tabel yang memuat judul-judul kolom.
* `<tbody>`: Badan tabel yang memuat data baris menu yang sebenarnya.
* `<tr>` (*Table Row*): Baris horizontal.
* `<th>` (*Table Header*): Sel judul kolom (tebal dan rata tengah secara default).
* `<td>` (*Table Data*): Sel data biasa untuk isi konten.

---

### 3. Instruksi Tantangan Peserta (Sidebar Task)
1. Buat sub-judul `<h2>` bertuliskan `"Daftar Menu Favorit"`.
2. Buat tabel `<table>` dengan blok `<thead>` dan `<tbody>`.
3. Di dalam `<thead>`, buat 1 baris `<tr>` dengan 3 kolom header `<th>`: `"Kategori"`, `"Menu"`, dan `"Harga"`.
4. Di dalam `<tbody>`, masukkan minimal 3 baris data `<tr>` menu dengan masing-masing 3 sel data `<td>`.
5. Gunakan tag `<mark>` pada salah satu nama menu untuk menandai menu rekomendasi (misal: `<mark>Best Seller</mark>`).

---

### 4. Test Assertions
* `[TEST-3.1]` `doc.querySelector('table') !== null && doc.querySelector('thead') !== null && doc.querySelector('tbody') !== null`  
  *Pesan:* Elemen `<table>` harus memiliki `<thead>` dan `<tbody>`.
* `[TEST-3.2]` `doc.querySelectorAll('thead th').length >= 3`  
  *Pesan:* Terdapat minimal 3 kolom header (`<th>`) pada `<thead>`.
* `[TEST-3.3]` `doc.querySelectorAll('tbody tr').length >= 3`  
  *Pesan:* Terdapat minimal 3 baris menu (`<tr>`) di dalam `<tbody>`.
* `[TEST-3.4]` `doc.querySelector('table mark') !== null || doc.querySelector('tbody mark') !== null`  
  *Pesan:* Gunakan tag `<mark>` untuk menandai salah satu menu rekomendasi / best seller.

---

### 5. Kode Kunci Jawaban
```html
<div id="menu" class="card-section">
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
        <td>V60 Aceh Gayo <mark>Best Seller</mark></td>
        <td>Rp 26.000</td>
      </tr>
      <tr>
        <td>Espresso Based</td>
        <td>Caramel Macchiato</td>
        <td>Rp 28.000</td>
      </tr>
      <tr>
        <td>Pastry</td>
        <td>Croissant Butter Crispy</td>
        <td>Rp 22.000</td>
      </tr>
    </tbody>
  </table>
</div>
```

---

## MODUL 04: FORMULIR RESERVASI MEJA LENGKAP & KONTROL INPUT

### 1. Tujuan Pembelajaran
* Memahami cara kerja formulir web untuk mengumpulkan data dari pengunjung.
* Menguasai kontrol input HTML5: `text`, `date`, `number`, `radio`, `<select>`, `<textarea>`, `<button>`.
* **Materi Pendukung:** Atribut validasi bawaan browser: `required`, `placeholder`, `min`, `name`, `id`, `value`, dan tag `<label for="...">`.

### 2. Teori & Aksesibilitas Form
* **Hubungan `<label>` dan `<input>`:** Menggunakan atribut `for` pada label yang sama dengan `id` pada input memungkinkan pengunjung memfokuskan field hanya dengan mengklik label teksnya.
* **Atribut `name` pada Radio Button:** Semua opsi radio button untuk satu kelompok pertanyaan wajib memiliki nilai atribut `name` yang persis sama, agar hanya satu opsi yang bisa dipilih dalam satu waktu.
* **Atribut `required`:** Mencegah form dikirim jika field wajib masih kosong tanpa perlu menulis JavaScript.

---

### 3. Instruksi Tantangan Peserta (Sidebar Task)
1. Buat sub-judul `<h2>` bertuliskan `"Reservasi Meja Cafe"`.
2. Buat elemen `<form id="form-reservasi">` yang mencakup:
   * Input nama tamu: `<input type="text" placeholder="..." required>`
   * Input tanggal reservasi: `<input type="date" required>`
   * Input jumlah tamu: `<input type="number" min="1" required>`
   * Pilihan area meja: minimal 2 radio button dengan `name="area"` (contoh: Indoor dan Outdoor).
   * Pilihan cabang: dropdown `<select>` dengan minimal 2 tag `<option>`.
   * Catatan khusus: `<textarea placeholder="..."></textarea>`.
   * Tombol submit: `<button type="submit">Pesan Meja Sekarang</button>`.

---

### 4. Test Assertions
* `[TEST-4.1]` `doc.querySelector('form') !== null`  
  *Pesan:* Tag `<form>` harus ada membungkus field reservasi.
* `[TEST-4.2]` `doc.querySelector('input[type="text"]') !== null && doc.querySelector('input[type="text"]').hasAttribute('required')`  
  *Pesan:* Terdapat input teks nama tamu dengan atribut `required`.
* `[TEST-4.3]` `doc.querySelector('input[type="date"]') !== null`  
  *Pesan:* Terdapat input pemilih tanggal (`type="date"`).
* `[TEST-4.4]` `doc.querySelectorAll('input[type="radio"]').length >= 2`  
  *Pesan:* Terdapat minimal 2 radio button untuk pemilihan area meja.
* `[TEST-4.5]` `doc.querySelector('select') !== null && doc.querySelectorAll('select option').length >= 2`  
  *Pesan:* Terdapat dropdown `<select>` dengan minimal 2 opsi cabang.
* `[TEST-4.6]` `doc.querySelector('textarea') !== null`  
  *Pesan:* Terdapat input `<textarea>` untuk catatan pemesanan.
* `[TEST-4.7]` `doc.querySelector('button[type="submit"]') !== null || doc.querySelector('form button') !== null`  
  *Pesan:* Terdapat tombol submit untuk mengirim formulir.

---

### 5. Kode Kunci Jawaban
```html
<div id="reservasi" class="card-section">
  <h2>Reservasi Meja Cafe</h2>
  <form id="form-reservasi">
    <div class="form-group">
      <label for="nama">Nama Lengkap:</label>
      <input type="text" id="nama" name="nama" placeholder="Masukkan nama pemesan" required>
    </div>

    <div class="form-group">
      <label for="tanggal">Tanggal Kunjungan:</label>
      <input type="date" id="tanggal" name="tanggal" required>
    </div>

    <div class="form-group">
      <label for="kursi">Jumlah Kursi:</label>
      <input type="number" id="kursi" name="kursi" min="1" value="2" required>
    </div>

    <div class="form-group">
      <label>Area Pilihan:</label>
      <label><input type="radio" name="area" value="indoor" checked> Indoor AC</label>
      <label><input type="radio" name="area" value="outdoor"> Outdoor Garden</label>
    </div>

    <div class="form-group">
      <label for="cabang">Pilih Cabang:</label>
      <select id="cabang" name="cabang">
        <option value="utama">Cabang Utama Senopati</option>
        <option value="dago">Cabang Dago Heritage</option>
      </select>
    </div>

    <div class="form-group">
      <label for="catatan">Catatan / Permintaan Meja:</label>
      <textarea id="catatan" name="catatan" rows="3" placeholder="Contoh: Meja dekat jendela..."></textarea>
    </div>

    <button type="submit" class="btn-primary">Pesan Meja Sekarang</button>
  </form>
</div>
```

---

## MODUL 05: CSS BOX MODEL, WARNA, GRADASI, & CARA MENGETENGAHKAN DIV

### 1. Tujuan Pembelajaran
* Memahami sintaks dasar CSS (Selektor, Properti, Nilai).
* Menguasai konsep fundamental **Box Model** (`margin`, `border`, `padding`, `width`, `height`).
* Memahami mantra sakti CSS: `box-sizing: border-box`.
* **Materi Pendukung Lengkap:**
  * Palet warna: Hex (`#1c1917`), RGB, dan RGBA transparan.
  * Dunia Background: `background-color`, `background-image`, `background-size: cover`, dan `linear-gradient(...)`.
  * **Jurus Esensial:** "Cara Mengetengahkan `<div>`" menggunakan teknik `margin: 0 auto; max-width: ...`.

### 2. Teori & Materi Pendukung

#### A. Anatomi Box Model
Setiap elemen di layar browser adalah sebuah kotak persegi panjang:
```
┌───────────────────────────────────────────────┐
│ MARGIN (Jarak luar antar elemen)              │
│  ┌─────────────────────────────────────────┐  │
│  │ BORDER (Garis tepi / batas)             │  │
│  │  ┌───────────────────────────────────┐  │  │
│  │  │ PADDING (Bantalan udara dalam)    │  │  │
│  │  │  ┌─────────────────────────────┐  │  │  │
│  │  │  │ CONTENT (Teks, gambar, dll) │  │  │  │
│  │  │  └─────────────────────────────┘  │  │  │
│  │  └───────────────────────────────────┘  │  │
│  └─────────────────────────────────────────┘  │
└───────────────────────────────────────────────┘
```

#### B. 💡 Mantra Wajib: `box-sizing: border-box`
Secara default, jika sebuah elemen diberi `width: 300px` dan `padding: 20px`, browser akan menghitung total lebarnya menjadi `340px` (sering merusak tata letak).
Dengan `box-sizing: border-box`, browser memasukkan padding dan border ke dalam hitungan lebar `300px` tersebut:
```css
* {
  box-sizing: border-box;
}
```

#### C. 💡 Jurus: "Cara Mengetengahkan `<div>` di Layar"
Salah satu pertanyaan paling populer dalam web development!
Untuk elemen bertipe block seperti kontainer utama:
```css
.container {
  max-width: 800px;  /* Batas lebar maksimum agar nyaman dibaca */
  margin: 0 auto;    /* 0 di atas/bawah, dan AUTO di kiri/kanan memusatkan posisi ke tengah */
}
```

#### D. 💡 Dunia Background & Gradasi Modern (`linear-gradient`)
Membuat tampilan web terlihat mahal dan modern:
* **Solid Background:** `background-color: #0c0a09;`
* **Linear Gradient:** Memberi transisi gradasi halus antar dua warna:
  ```css
  .hero-banner {
    background: linear-gradient(135deg, #292524 0%, #0c0a09 100%);
  }
  ```
* **Background Image Cover:**
  ```css
  .cafe-bg {
    background-image: url('foto-cafe.jpg');
    background-size: cover;       /* Gambar menutupi seluruh area kotak */
    background-position: center;  /* Fokus tengah */
  }
  ```

---

### 3. Instruksi Tantangan Peserta (Sidebar Task)
1. Buka tab `style.css`.
2. Pasang aturan universal reset `* { box-sizing: border-box; }`.
3. Terapkan warna background gelap dan warna teks terang pada `body`.
4. Berikan pembungkus kartu atau section dengan `max-width` dan pusatkan posisinya dengan `margin: 0 auto`.
5. Terapkan efek gradasi `linear-gradient(...)` atau `background-color` pada header/kartu.
6. Berikan `padding`, `border`, atau `border-radius` pada kartu dan tombol reservasi.
7. Rapikan tabel dengan `border-collapse: collapse; width: 100%;`.

---

### 4. Test Assertions
* `[TEST-5.1]` `/box-sizing\s*:\s*border-box/i.test(css)`  
  *Pesan:* Terapkan `box-sizing: border-box` untuk kalkulasi Box Model yang rapi.
* `[TEST-5.2]` `/color\s*:/i.test(css) && /background(-color)?\s*:/i.test(css)`  
  *Pesan:* Definisikan warna teks (`color`) dan warna latar (`background-color`).
* `[TEST-5.3]` `/margin\s*:\s*0\s+auto/i.test(css) || /margin-left\s*:\s*auto/i.test(css)`  
  *Pesan:* Terapkan jurus `margin: 0 auto` untuk mengetengahkan kontainer utama di layar.
* `[TEST-5.4]` `/linear-gradient/i.test(css)`  
  *Pesan:* Terapkan efek gradasi modern `linear-gradient(...)` pada salah satu elemen kartu atau header.
* `[TEST-5.5]` `/border-collapse\s*:\s*collapse/i.test(css)`  
  *Pesan:* Pasang `border-collapse: collapse` pada tabel menu.

---

### 5. Kode Kunci Jawaban (style.css)
```css
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: #0c0a09;
  color: #f5f5f4;
  font-family: 'Plus Jakarta Sans', sans-serif;
  line-height: 1.6;
  padding: 24px;
}

.main-container {
  max-width: 820px;
  margin: 0 auto;
}

header {
  background: linear-gradient(135deg, #292524 0%, #1c1917 100%);
  border: 1px solid #44403c;
  border-radius: 12px;
  padding: 32px;
  margin-bottom: 24px;
}

.card-section {
  background-color: #1c1917;
  border: 1px solid #292524;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
}

img {
  width: 100%;
  max-height: 380px;
  object-fit: cover;
  border-radius: 8px;
  margin-top: 16px;
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
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
}
```

---

## MODUL 06: LAYOUT FLEXBOX & RAGAM PSEUDO-CLASS INTERAKTIF

### 1. Tujuan Pembelajaran
* Menguasai tata letak 1-dimensi menggunakan **CSS Flexbox**.
* Menguasai properti Flex Container: `display: flex`, `justify-content`, `align-items`, dan `gap`.
* Menguasai perataan elemen vertikal dan horizontal dengan Flexbox.
* **Materi Pendukung Lengkap:**
  * Memahami ragam **Pseudo-Class**:
    * `:hover` (saat mouse melayang di atas elemen)
    * `:active` (saat elemen sedang ditekan)
    * `:focus` / `:focus-visible` (saat field input form sedang aktif diketik)
    * `:nth-child(even)` & `:nth-child(odd)` (seleksi baris genap/ganjil)
    * `:disabled` (state tombol nonaktif)
  * Sentuhan mikro-interaksi JavaScript sederhana (`onsubmit` alert konfirmasi).

### 2. Teori & Ragam Pseudo-Class

#### A. Konsep Inti Flexbox
* `display: flex;`: Mengaktifkan mode flexbox pada elemen pembungkus (container).
* `justify-content: space-between;`: Meletakkan logo di ujung kiri dan link navigasi di ujung kanan.
* `justify-content: center;`: Meletakkan seluruh elemen pas di tengah sumbu horizontal.
* `align-items: center;`: Menyejajarkan elemen pas di tengah sumbu vertikal.
* `gap: 16px;`: Memberikan celah renggang yang rapi antar elemen anak.

#### B. 💡 Mengetengahkan dengan Flexbox (Metode Paling Populer)
```css
.center-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

#### C. 💡 Galeri Ragam Pseudo-Class
Pseudo-class digunakan untuk mengubah gaya tampilan elemen berdasarkan status interaksi pengguna:
1. **`:hover`:**
   ```css
   button:hover {
     background-color: #b45309;
     transform: translateY(-2px);
   }
   ```
2. **`:active`:**
   ```css
   button:active {
     transform: translateY(0); /* Efek tombol tertekan ke dalam */
   }
   ```
3. **`:focus`:**
   Memberi highlight terang saat input diklik/difokuskan, sangat bagus untuk kenyamanan pengguna:
   ```css
   input:focus, textarea:focus {
     outline: 2px solid #f59e0b;
     border-color: #f59e0b;
   }
   ```
4. **`:nth-child(even)`:**
   Digunakan untuk membuat baris selang-seling (*zebra-striping*) pada tabel menu.

#### D. Sentuhan Interaksi JavaScript 1 Baris
Mencegah halaman me-refresh dan memberi feedback instan kepada pengunjung cafe:
```html
<form onsubmit="alert('Terima kasih! Reservasi meja Anda telah kami catat.'); return false;">
```

---

### 3. Instruksi Tantangan Peserta (Sidebar Task)
1. Buat elemen `<nav class="navbar">` di bagian paling atas dengan logo kedai kopi di sisi kiri dan link navigasi di sisi kanan.
2. Di `style.css`, atur `.navbar` menggunakan `display: flex; justify-content: space-between; align-items: center;`.
3. Tambahkan efek `:hover` dan `:active` pada tombol reservasi meja.
4. Tambahkan pseudo-class `:focus` pada elemen `input` dan `textarea` agar garis border menyala saat sedang diketik.
5. Tambahkan atribut `onsubmit="alert('Reservasi meja berhasil dikirim!'); return false;"` pada `<form>`.

---

### 4. Test Assertions
* `[TEST-6.1]` `/display\s*:\s*flex/i.test(css)`  
  *Pesan:* Gunakan `display: flex` pada navbar atau komponen layout.
* `[TEST-6.2]` `/justify-content\s*:/i.test(css) || /align-items\s*:/i.test(css)`  
  *Pesan:* Gunakan properti perataan Flexbox (`justify-content` atau `align-items`).
* `[TEST-6.3]` /:hover/i.test(css)  
  *Pesan:* Berikan efek interaksi pseudo-class `:hover` pada tombol atau link.
* `[TEST-6.4]` /:focus/i.test(css)  
  *Pesan:* Terapkan pseudo-class `:focus` pada input/textarea saat field aktif.
* `[TEST-6.5]` `/onsubmit\s*=/i.test(html) || /alert\(/i.test(html)`  
  *Pesan:* Formulir memiliki sentuhan interaksi mikro dengan atribut `onsubmit` dan pesan alert.

---

### 5. Kode Kunci Jawaban
```html
<!-- Navbar Header -->
<nav class="navbar">
  <div class="brand">☕ Senja Coffee Co.</div>
  <div class="nav-links">
    <a href="#fasilitas">Fasilitas</a>
    <a href="#menu">Menu</a>
    <a href="#reservasi">Reservasi</a>
  </div>
</nav>
```

```css
/* Flexbox & Pseudo-Classes */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
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
  font-weight: 500;
  transition: color 0.2s;
}

.nav-links a:hover {
  color: #f59e0b;
}

input:focus, textarea:focus, select:focus {
  outline: 2px solid #f59e0b;
  border-color: #f59e0b;
}

button {
  transition: all 0.2s ease;
}

button:hover {
  background-color: #f59e0b;
  transform: translateY(-2px);
}

button:active {
  transform: translateY(0);
}
```

---

## MODUL 07: AUDIT FINAL, UJI RESPONSIF, & PUBLIKASI KE SHOWCASE

### 1. Tujuan Pembelajaran
* Melakukan peninjauan menyeluruh (*self-code review*) pada proyek HTML & CSS yang sudah dibuat.
* Menguji responsivitas tampilan menggunakan fitur **Fullscreen Device Inspector** (Desktop 100%, Tablet 768px, Mobile 375px).
* Mempublikasikan karya final ke **Showcase Gallery** publik dan database PostgreSQL.

### 2. Checklist Audit Kesiapan Publikasi
1. [x] **Struktur Semantik:** Header, Nav, Sections, Table, Form, dan Footer tersusun rapi.
2. [x] **Format Teks & Media:** Gambar banner memiliki `alt`, teks penting dipertegas dengan `<strong>`/`<em>`, garis pemisah `<hr>`.
3. [x] **Tabel Menu:** Menampilkan daftar harga dengan kolom dan baris yang jelas serta label status `<mark>`.
4. [x] **Formulir Interaktif:** Seluruh field input (nama, tanggal, kursi, area radio, catatan) dapat diisi dan dicoba.
5. [x] **Estetika CSS:** Warna hangat kedai kopi, Box Model terukur dengan `box-sizing: border-box`, `linear-gradient` elegan, sudut rounded, dan jarak padding/margin nyaman dipandang.
6. [x] **Flexbox Layout & Pseudo-Classes:** Navigasi horizontal rapi, tombol responsif saat `:hover` dan `:active`, serta input glow saat `:focus`.

### 3. Aksi Publikasi (Sidebar Action)
1. Periksa panel checklist; pastikan seluruh indikator dari Modul 1 sampai 6 bertanda centang hijau `✓ Lolos`.
2. Klik tombol `[ ⛶ Fullscreen Preview ]` untuk memastikan tampilan website kedai kopimu terlihat sempurna di layar penuh.
3. Di panel publikasi, isi kolom **"Nama Kedai Kopi"** karyamu.
4. Klik tombol glowing **`[ 🚀 Publish ke Showcase Gallery ]`**.
5. Karyamu seketika tersimpan di database PostgreSQL dan langsung tayang di `/showcase` untuk dilihat dan diberi apresiasi (*like*) oleh teman-teman sekelas!
