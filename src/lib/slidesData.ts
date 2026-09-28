export interface SlideData {
  id: number;
  slug: string;
  badge: string;
  title: string;
  subtitle: string;
  category: "intro" | "html" | "css" | "review" | "outro";
  concept: string;
  analogy: {
    title: string;
    description: string;
    icon: string;
  };
  keyPoints: {
    label: string;
    detail: string;
    tag?: string;
  }[];
  codeSnippet?: {
    language: "html" | "css";
    title: string;
    code: string;
  };
  studentChallenge?: string;
  speakerNotes: {
    targetMinutes: number;
    teachingGoals: string[];
    icebreakersOrQuestions: string[];
    commonTraps: string[];
  };
}

export const SLIDES: SlideData[] = [
  {
    id: 1,
    slug: "cover-intro",
    badge: "WORKSHOP KOPICODE // MODUL PEMBELAJARAN",
    title: "Membangun Website Kedai Kopi dari Nol",
    subtitle: "Masterclass Fondasi HTML5 & CSS3 Interaktif untuk Pemula",
    category: "intro",
    concept:
      "Website modern bukan sekadar template instan. Melalui studi kasus nyata 'Kedai Kopi Nusantara', siswa akan memahami struktur kerangka halaman web menggunakan HTML semantik dan memoles estetika desain dengan CSS modern.",
    analogy: {
      title: "Filosofi Kedai Kopi Fisik vs Website",
      description:
        "HTML adalah kerangka fisik bangunan ruko (pondasi, dinding, meja kasir, dan etalase). CSS adalah desain interior, cat dinding, pencahayaan hangat, dan papan logo yang menarik pengunjung masuk.",
      icon: "☕",
    },
    keyPoints: [
      {
        label: "Zero to Hero",
        detail: "Dimulai dari selembar file teks kosong tanpa framework yang rumit.",
      },
      {
        label: "8 Modul Berjenjang",
        detail: "Tiap modul berfokus pada 1 konsep utama yang langsung dipraktikkan.",
      },
      {
        label: "Auto-Validator Realtime",
        detail: "Hasil kode siswa langsung diuji otomatis dengan sistem verifikasi.",
      },
      {
        label: "Live Showcase",
        detail: "Karya akhir dipublikasikan ke galeri bersama untuk saling di-review.",
      },
    ],
    speakerNotes: {
      targetMinutes: 5,
      teachingGoals: [
        "Bangun rasa percaya diri siswa: coding web tidak seseram matematika rumit.",
        "Jelaskan bahwa HTML & CSS adalah bahasa visual yang hasilnya bisa langsung dilihat detik itu juga.",
        "Ajak siswa membayangkan kedai kopi impian masing-masing sebelum mulai mengetik.",
      ],
      icebreakersOrQuestions: [
        "Siapa di sini yang belum pernah nulis kode HTML sama sekali?",
        "Kalau kamu punya kedai kopi sendiri besok, apa menu signature andalan yang ingin kamu pajang?",
      ],
      commonTraps: [
        "Siswa takut salah mengetik atau salah sintaks. Tegaskan bahwa error adalah hal normal dan browser selalu ramah.",
      ],
    },
  },
  {
    id: 2,
    slug: "roadmap-workshop",
    badge: "ROADMAP KELAS // 8 LANGKAH PRAKTIK",
    title: "Peta Perjalanan Belajar",
    subtitle: "8 Modul Bertahap Menuju Website Kedai Kopi Siap Tayang",
    category: "intro",
    concept:
      "Kurikulum disusun secara kumulatif. Siswa tidak melompat ke styling sebelum paham struktur, dan tidak belajar Flexbox sebelum menguasai Box Model.",
    analogy: {
      title: "Tahapan Meracik Secangkir Manual Brew",
      description:
        "Kamu tidak menuang susu sebelum espresso diekstraksi. Begitu juga web: siapkan kerangka dokumen dulu, susun teks & gambar, buat tabel harga, lalu poles warnanya.",
      icon: "🗺️",
    },
    keyPoints: [
      { label: "Modul 00", detail: "Anatomi Dokumen HTML dari Nol (Doctype, html, head, title, body)", tag: "<!DOCTYPE>" },
      { label: "Modul 01", detail: "Struktur Konten & Media Banner (h1, p, strong, em, hr, img)", tag: "<h1> <img>" },
      { label: "Modul 02", detail: "Daftar Fasilitas & Pengelompokan Elemen (ul, li, div, anchor link)", tag: "<ul> <div> <a>" },
      { label: "Modul 03", detail: "Tabel Menu Minuman & Harga (table, thead, tbody, th, tr, td, mark)", tag: "<table> <mark>" },
      { label: "Modul 04", detail: "Formulir Pemesanan Meja (form, input text/date/radio, select, submit)", tag: "<form> <input>" },
      { label: "Modul 05", detail: "CSS Box Model, Warna & Gradient (margin, padding, border-box, collapse)", tag: "box-sizing" },
      { label: "Modul 06", detail: "Flexbox Layout & Interaksi Hover (display: flex, :hover, :focus, alert)", tag: "display: flex" },
      { label: "Modul 07", detail: "Pemeriksaan Akhir & Publikasi Showcase (Responsive testing & publish)", tag: "Showcase" },
    ],
    speakerNotes: {
      targetMinutes: 5,
      teachingGoals: [
        "Berikan overview mental map agar siswa tahu ada di posisi mana sepanjang kelas.",
        "Ingatkan bahwa di Modul 0-4 kita murni fokus HTML tanpa CSS agar siswa paham struktur sejati halaman web.",
      ],
      icebreakersOrQuestions: [
        "Ada yang pernah lihat website jaman 90-an sebelum ada CSS? Tampilannya polos hitam putih tapi tetap kebaca.",
      ],
      commonTraps: [
        "Siswa tidak sabar ingin langsung mewarnai. Ingatkan bahwa fondasi HTML yang baik adalah syarat mutlak web profesional.",
      ],
    },
  },
  {
    id: 3,
    slug: "modul-00-anatomi-html",
    badge: "MODUL 00 // FONDASI DOKUMEN",
    title: "Anatomi Dokumen HTML dari Nol",
    subtitle: "4 Elemen Wajib Dokumen Web Standar W3C",
    category: "html",
    concept:
      "Setiap halaman web di dunia tersusun atas 4 pilar utama. Browser memerlukan deklarasi standar DOCTYPE dan pembungkus root <html> sebelum dapat menampilkan konten di layar.",
    analogy: {
      title: "Surat Izin Resmi Kedai Kopi",
      description:
        "<!DOCTYPE html> adalah kop surat resminya, <html lang='id'> map pembungkus berkasnya, <head> lembar catatan judul di luar map, dan <body> isi ruangan cafe tempat transaksi terjadi.",
      icon: "📋",
    },
    keyPoints: [
      { label: "<!DOCTYPE html>", detail: "Memberitahu browser untuk merender dengan standar HTML5 modern." },
      { label: "<html lang='id'>", detail: "Akar seluruh elemen. Atribut lang='id' penting untuk aksesibilitas dan SEO." },
      { label: "<head> & <title>", detail: "Memuat metadata, judul tab browser, dan tautan file eksternal." },
      { label: "<body>", detail: "Wadah utama bagi semua elemen yang dilihat dan disentuh pengunjung web." },
    ],
    codeSnippet: {
      language: "html",
      title: "Kerangka Dasar index.html",
      code: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Kedai Kopi Pawon Ndeso</title>
</head>
<body>
  <h1>Selamat Datang di Kedai Kopi</h1>
  <p>Website ini saya bangun dari selembar kode kosong.</p>
</body>
</html>`,
    },
    studentChallenge: "Tuliskan struktur di atas dari lembar kosong tanpa copy-paste untuk melatih ingatan motorik tag HTML.",
    speakerNotes: {
      targetMinutes: 10,
      teachingGoals: [
        "Pastikan siswa memahami prinsip tag berpasangan: dibuka dengan <tag> dan WAJIB ditutup dengan </tag>.",
        "Jelaskan bahwa <head> tidak pernah tampil di canvas utama, sedangkan <body> adalah panggung utama.",
      ],
      icebreakersOrQuestions: [
        "Kenapa nama di dalam tag <title> tidak muncul di layar putih, tapi muncul di tab browser atas?",
      ],
      commonTraps: [
        "Lupa tanda garis miring penutup pada </head> atau </body>.",
        "Menulis <h1> di dalam <head> (kesalahan umum pemula).",
      ],
    },
  },
  {
    id: 4,
    slug: "modul-01-konten-banner",
    badge: "MODUL 01 // KONTEN DASAR",
    title: "Struktur Konten & Media Banner",
    subtitle: "Menata Plang Nama Toko, Teks Penjelas, dan Foto Banner",
    category: "html",
    concept:
      "Informasi web harus memiliki hierarki visual yang jelas. Tag <h1> hanya boleh satu per halaman sebagai topik utama, sedangkan gambar memerlukan atribut src dan teks alternatif alt untuk aksesibilitas.",
    analogy: {
      title: "Papan Nama & Poster Kaca Depan",
      description:
        "<h1> adalah plang nama besar di atas ruko. <p> adalah papan menu bertuliskan jam buka. <strong> adalah tulisan tebal 'PROMO'. <img> adalah poster foto seduhan kopi panas di kaca depan.",
      icon: "🖼️",
    },
    keyPoints: [
      { label: "<h1>", detail: "Heading level 1: judul terpenting, hanya 1 per halaman demi kaidah SEO.", tag: "<h1>" },
      { label: "<p>, <strong>, <em>", detail: "Paragraf deskripsi dengan aksen tebal penting (strong) dan miring (em).", tag: "<p>" },
      { label: "<hr>", detail: "Tag mandiri (self-closing) untuk memberi garis pemisah horizontal antar seksi.", tag: "<hr>" },
      { label: "<img> (src + alt)", detail: "Atribut src berisi URL gambar, alt wajib diisi deskripsi foto untuk tunanetra.", tag: "<img>" },
    ],
    codeSnippet: {
      language: "html",
      title: "Header & Media Banner",
      code: `<header>
  <h1>Kedai Kopi Sudut Temu</h1>
  <p>
    Seduhan biji arabika lokal. Buka setiap hari mulai
    <strong>08.00 pagi</strong> sampai <em>tengah malam</em>.
  </p>
  <hr>
  <img 
    src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800" 
    alt="Suasana Meja Kayu dan Mesin Espresso Sudut Temu"
  >
</header>`,
    },
    studentChallenge: "Ganti foto banner dengan foto Unsplash kedai kopi pilihan sendiri dan tulis alt teks yang deskriptif.",
    speakerNotes: {
      targetMinutes: 10,
      teachingGoals: [
        "Tekankan fungsi 'alt' pada gambar: bukan pajangan, tapi deskripsi bagi screen reader dan jika gambar gagal dimuat.",
        "Bahas perbedaan tag berpasangan (<p>..</p>) vs tag mandiri (<hr>, <img>).",
      ],
      icebreakersOrQuestions: [
        "Apa bedanya <b> vs <strong>? (Secara visual sama-sama tebal, tapi strong memberi makna semantik penting bagi mesin pencari).",
      ],
      commonTraps: [
        "Lupa menutup tag <img> (pada HTML5 <img> tidak butuh penutup, tapi jangan diberi </img>).",
        "Menulis alt='' kosong padahal gambarnya memuat informasi penting.",
      ],
    },
  },
  {
    id: 5,
    slug: "modul-02-fasilitas-list",
    badge: "MODUL 02 // LIST & CONTAINER",
    title: "Daftar Fasilitas & Pengelompokan Elemen",
    subtitle: "Menata Poin Layanan Menggunakan <ul>, <li>, dan <div>",
    category: "html",
    concept:
      "Halaman web yang panjang perlu dibagi ke dalam blok-blok logis menggunakan <div>. Untuk informasi berupa poin, elemen list (<ul> & <li>) memberikan struktur semantik yang jauh lebih rapi dibanding mengetik titik manual.",
    analogy: {
      title: "Papan Fasilitas & Sekat Ruangan Cafe",
      description:
        "Tag <div> adalah dinding sekat ruangan (area non-smoking, bar barista, toilet). Tag <ul> adalah papan buletin fasilitas: Wi-Fi kencang, colokan tiap meja, parkir luas.",
      icon: "📌",
    },
    keyPoints: [
      { label: "<div>", detail: "Wadah blok generik untuk membungkus sekelompok elemen menjadi satu seksi.", tag: "<div>" },
      { label: "<ul> vs <ol>", detail: "Unordered list (bullet points) vs Ordered list (urutan bernomor 1, 2, 3).", tag: "<ul>" },
      { label: "<li>", detail: "List Item: elemen anak yang selalu berada di dalam <ul> atau <ol>.", tag: "<li>" },
      { label: "<a href='#menu'>", detail: "Anchor link untuk navigasi lompat ke ID elemen lain di halaman yang sama.", tag: "<a>" },
    ],
    codeSnippet: {
      language: "html",
      title: "Seksi Fasilitas & Tautan Menu",
      code: `<div id="fasilitas">
  <h2>Fasilitas & Kenyamanan</h2>
  <ul>
    <li>Wi-Fi kencang 100 Mbps & colokan di tiap meja</li>
    <li>Ruangan ber-AC bebas asap rokok & area outdoor</li>
    <li>Mushola bersih dan area parkir motor luas</li>
  </ul>
  <p><a href="#menu">Lihat Daftar Minuman &rarr;</a></p>
</div>`,
    },
    studentChallenge: "Tambahkan atribut id='fasilitas' pada <div> dan buat tautan <a href='#menu'> untuk melompat.",
    speakerNotes: {
      targetMinutes: 10,
      teachingGoals: [
        "Tunjukkan bahwa tag <li> tidak boleh berdiri sendiri tanpa bapak <ul> atau <ol>.",
        "Demonstrasikan cara kerja anchor hash link (#fasilitas, #menu): browser akan scroll otomatis ke ID yang dituju.",
      ],
      icebreakersOrQuestions: [
        "Kapan kita harus pakai <ol> dibanding <ul>? (Resep racik kopi = urutan langkah bernomor = <ol>).",
      ],
      commonTraps: [
        "Menaruh teks langsung di dalam <ul> tanpa membungkusnya dengan <li>.",
      ],
    },
  },
  {
    id: 6,
    slug: "modul-03-tabel-menu",
    badge: "MODUL 03 // TABEL DATA",
    title: "Tabel Menu Minuman & Harga",
    subtitle: "Menata Data Dua Dimensi dengan <table> Semantik",
    category: "html",
    concept:
      "Tabel HTML modern memisahkan baris judul kolom (<thead>) dan isi data (<tbody>). Elemen semantik ini menjamin data terbaca rapi oleh browser, search engine, dan pembaca layar.",
    analogy: {
      title: "Buku Menu Kasir Dua Dimensi",
      description:
        "Buku menu di kasir punya baris dan kolom yang presisi: Kategori di kiri, Nama Kopi di tengah, dan Harga di kanan. Pengunjung langsung paham tanpa salah baca.",
      icon: "📊",
    },
    keyPoints: [
      { label: "<table>", detail: "Membungkus keseluruhan tabel data.", tag: "<table>" },
      { label: "<thead> & <th>", detail: "Baris judul kolom (Table Header), teks otomatis tebal dan center.", tag: "<th>" },
      { label: "<tbody> & <tr>", detail: "Badan tabel yang menampung deretan baris data (Table Row).", tag: "<tr>" },
      { label: "<td> & <mark>", detail: "Sel data (Table Data). Tag <mark> memberi efek stabilo pada menu favorit.", tag: "<mark>" },
    ],
    codeSnippet: {
      language: "html",
      title: "Tabel Menu Minuman",
      code: `<div id="menu">
  <h2>Daftar Menu Favorit</h2>
  <table>
    <thead>
      <tr>
        <th>Kategori</th>
        <th>Menu Minuman</th>
        <th>Harga</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Manual Brew</td>
        <td>V60 Aceh Gayo <mark>Favorit</mark></td>
        <td>Rp 26.000</td>
      </tr>
      <tr>
        <td>Espresso Based</td>
        <td>Kopi Susu Gula Aren</td>
        <td>Rp 22.000</td>
      </tr>
    </tbody>
  </table>
</div>`,
    },
    studentChallenge: "Pastikan ada minimal 3 kolom <th> di <thead>, minimal 3 baris <tr> di <tbody>, dan beri tag <mark> pada menu andalan.",
    speakerNotes: {
      targetMinutes: 12,
      teachingGoals: [
        "Jelaskan relasi hierarki: table > thead/tbody > tr > th/td.",
        "Tegaskan bahwa tabel jangan digunakan untuk membuat layout halaman (itu kebiasaan jadul era 90-an), tabel hanya untuk data tabular.",
      ],
      icebreakersOrQuestions: [
        "Apa singkatan dari <tr>, <th>, dan <td>? (Table Row, Table Header, Table Data).",
      ],
      commonTraps: [
        "Menulis <td> di luar <tr>, atau lupa menutup </tr> di tiap akhir baris.",
      ],
    },
  },
  {
    id: 7,
    slug: "modul-04-form-reservasi",
    badge: "MODUL 04 // FORM & INPUT",
    title: "Formulir Pemesanan Meja Interaktif",
    subtitle: "Mengumpulkan Data Pengunjung dengan Kontrol Input HTML5",
    category: "html",
    concept:
      "Formulir memungkinkan interaksi dua arah antara pengunjung dan pengelola web. Atribut 'type' menentukan rupa kontrol input (text, date, number, radio), sementara 'required' memberi validasi otomatis tanpa JavaScript.",
    analogy: {
      title: "Formulir Kertas Reservasi Barista",
      description:
        "Lembaran kertas pesanan: Nama pemesan siapa, tanggal datang kapan, berapa orang rombongannya, mau duduk di AC atau outdoor, plus permintaan khusus.",
      icon: "📝",
    },
    keyPoints: [
      { label: "<form>", detail: "Membungkus semua elemen input dan tombol submit.", tag: "<form>" },
      { label: "input[type='text' | 'date']", detail: "Input teks standar dan date picker kalender bawaan browser.", tag: "<input>" },
      { label: "input[type='radio']", detail: "Pilihan tunggal eksklusif. Wajib memiliki atribut 'name' yang persis sama.", tag: "radio" },
      { label: "<select> & <textarea>", detail: "Menu dropdown pilihan cabang dan kotak catatan multi-baris.", tag: "<select>" },
    ],
    codeSnippet: {
      language: "html",
      title: "Form Reservasi Lengkap",
      code: `<form id="form-reservasi">
  <div>
    <label for="nama">Nama Lengkap:</label>
    <input type="text" id="nama" name="nama" required>
  </div>
  <div>
    <label for="tanggal">Tanggal Kunjungan:</label>
    <input type="date" id="tanggal" name="tanggal" required>
  </div>
  <div>
    <label>Pilihan Area:</label>
    <label><input type="radio" name="area" value="indoor" checked> Ruang AC</label>
    <label><input type="radio" name="area" value="outdoor"> Area Luar</label>
  </div>
  <button type="submit">Pesan Meja Sekarang</button>
</form>`,
    },
    studentChallenge: "Buat form dengan kontrol text required, date, 2 radio area, dropdown cabang, textarea, dan submit button.",
    speakerNotes: {
      targetMinutes: 15,
      teachingGoals: [
        "Kunci utama radio button: kalau atribut name berbeda, browser tidak tahu kalau itu satu kelompok pilihan eksklusif.",
        "Tunjukkan fungsi atribut required: klik submit saat kolom kosong, browser akan memunculkan tooltip peringatan otomatis!",
      ],
      icebreakersOrQuestions: [
        "Kenapa radio button dinamai radio? (Mirip tombol fisik radio zaman dulu: tekan tombol 1, tombol lain otomatis terangkat!).",
      ],
      commonTraps: [
        "Lupa atribut name pada radio button sehingga kedua pilihan bisa tercentang bersamaan.",
        "Lupa meletakkan tombol di dalam tag <form>.",
      ],
    },
  },
  {
    id: 8,
    slug: "modul-05-css-boxmodel",
    badge: "MODUL 05 // DASAR CSS",
    title: "CSS Box Model, Warna & Posisi Kontainer",
    subtitle: "Mengatur Margin, Padding, border-box, dan Trik margin: 0 auto",
    category: "css",
    concept:
      "Semua elemen HTML di mata CSS adalah kotak persegi panjang. Box Model mengatur Padding (bantalan dalam), Border (garis pinggir), dan Margin (jarak antar kotak). Reset 'box-sizing: border-box' adalah senjata utama desainer web modern.",
    analogy: {
      title: "Menata Meja & Bantalan Kursi Cafe",
      description:
        "Konten = mangkok kopi. Padding = busa tatakan mangkok agar tidak goyang. Border = bibir baki kayu. Margin = jarak aman antar meja agar pengunjung tidak senggolan.",
      icon: "📦",
    },
    keyPoints: [
      { label: "box-sizing: border-box", detail: "Membuat padding dan border tidak menambah ukuran total lebar elemen.", tag: "border-box" },
      { label: "margin: 0 auto", detail: "Merapikan kontainer agar selalu berada presisi di tengah layar secara simetris.", tag: "margin" },
      { label: "linear-gradient(...)", detail: "Gradasi dua warna halus untuk memberi atmosfer mewah pada banner header.", tag: "gradient" },
      { label: "border-collapse: collapse", detail: "Menyatukan garis batas ganda pada sel tabel menjadi garis tipis elegan.", tag: "collapse" },
    ],
    codeSnippet: {
      language: "css",
      title: "Aturan Dasar style.css",
      code: `* {
  box-sizing: border-box;
}

body {
  background-color: #0c0a09;
  color: #f5f5f4;
  font-family: sans-serif;
  padding: 24px;
}

.main-container {
  max-width: 820px;
  margin: 0 auto;
}

header {
  background: linear-gradient(135deg, #292524, #1c1917);
  border: 1px solid #44403c;
  border-radius: 12px;
  padding: 24px;
}

table {
  width: 100%;
  border-collapse: collapse;
}`,
    },
    studentChallenge: "Terapkan reset border-box di baris 1, beri background gelap, ketengahkan halaman dengan margin: 0 auto, dan buat gradasi pada header.",
    speakerNotes: {
      targetMinutes: 15,
      teachingGoals: [
        "Gambarkan di papan tulis 4 lapisan Box Model: Content, Padding, Border, Margin.",
        "Demonstrasikan apa yang terjadi jika tanpa box-sizing: border-box: elemen 100% lebar + padding 20px akan jebol ke kanan layar!",
      ],
      icebreakersOrQuestions: [
        "Kenapa harus margin: 0 auto? (Nilai 'auto' di kiri dan kanan membagi sisa ruang kosong layar secara sama rata).",
      ],
      commonTraps: [
        "Lupa memberi max-width pada kontainer saat memakai margin: 0 auto (kalau lebarnya 100%, tidak ada sisa ruang untuk di-tengahkan).",
      ],
    },
  },
  {
    id: 9,
    slug: "modul-06-flexbox-hover",
    badge: "MODUL 06 // FLEXBOX & HOVER",
    title: "Layout Navigasi Flexbox & Efek Interaksi",
    subtitle: "Sejajarkan Menu dengan Flexbox dan Hidupkan Tombol dengan Pseudo-Class",
    category: "css",
    concept:
      "Flexbox (display: flex) menyederhanakan penataan elemen mendatar. Pseudo-class seperti :hover, :focus, dan :active memberi umpan balik instan sehingga website terasa responsif dan hidup.",
    analogy: {
      title: "Sakelar Lampu & Interaksi Pintu Cafe",
      description:
        "Gagang pintu cafe yang disorot lampu saat tangan mendekat (:hover), sakelar yang menyala saat ditekan (:active), dan lampu bar yang terang saat barista sedang bekerja (:focus).",
      icon: "✨",
    },
    keyPoints: [
      { label: "display: flex", detail: "Mengubah elemen anak menjadi baris sejajar mendatar tanpa kalkulasi manual.", tag: "flex" },
      { label: "justify-content: space-between", detail: "Mendorong logo ke ujung kiri dan link navigasi ke ujung kanan.", tag: "justify" },
      { label: ":hover & :focus", detail: "Memberi respon visual saat mouse melayang atau input sedang aktif diketik.", tag: ":hover" },
      { label: "onsubmit alert", detail: "Interaksi mikro konfirmasi saat tamu mengirim formulir reservasi.", tag: "onsubmit" },
    ],
    codeSnippet: {
      language: "css",
      title: "Navbar Flexbox & Efek Hover",
      code: `.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: #1c1917;
}

.nav-links {
  display: flex;
  gap: 20px;
}

button:hover {
  background-color: #f59e0b;
  transform: translateY(-2px);
}

input:focus {
  outline: 2px solid #f59e0b;
}`,
    },
    studentChallenge: "Buat .navbar sejajar dengan justify-content: space-between, tambahkan efek :hover pada tombol, dan beri alert pada tag <form>.",
    speakerNotes: {
      targetMinutes: 15,
      teachingGoals: [
        "Flexbox adalah konsep terpenting CSS modern: jelaskan 'main axis' (horizontal) dan 'cross axis' (vertikal).",
        "Ajak siswa merasakan perbedaan tombol statis kaku vs tombol yang bergerak sedikit (-2px) saat disentuh mouse.",
      ],
      icebreakersOrQuestions: [
        "Ada yang pernah merasa website lemot gara-gara tombolnya nggak ada efek pas diklik? Itulah pentingnya :hover dan :active.",
      ],
      commonTraps: [
        "Menaruh display: flex pada elemen anak, padahal harus ditaruh pada elemen induk / pembungkusnya (.navbar).",
      ],
    },
  },
  {
    id: 10,
    slug: "modul-07-showcase-qa",
    badge: "MODUL 07 // PUBLIKASI",
    title: "Pemeriksaan Akhir & Publikasi Showcase",
    subtitle: "Uji Tampilan di Berbagai Layar dan Simpan Website ke Galeri",
    category: "review",
    concept:
      "Sebelum karya dipublikasikan, web developer melakukan tahap QA (Quality Assurance): memastikan seluruh tautan bekerja, form tervalidasi, dan tampilan rapi di perangkat desktop maupun smartphone.",
    analogy: {
      title: "Grand Opening & Cicip Rasa Terakhir",
      description:
        "Sebelum plang 'BUKA' diputar dan pita merah dipotong, barista mencicipi rasa seduhan, mengecek kebersihan meja, dan memastikan mesin kasir berfungsi 100%.",
      icon: "🚀",
    },
    keyPoints: [
      { label: "Responsive Check", detail: "Gunakan tombol Desktop (100%), Tablet (768px), dan Mobile (375px) di panel pratinjau." },
      { label: "Checklist Validasi", detail: "Pastikan seluruh checklist Modul 0 sampai 6 sudah berwarna hijau lolos uji." },
      { label: "Identitas Brand Cafe", detail: "Isi nama kedai kopi impian yang otentik dan berkarakter pada kolom publikasi." },
      { label: "Simpan ke Database", detail: "Klik 'Publish Karya' untuk menyimpan websitemu ke galeri publik dan Neon PostgreSQL." },
    ],
    codeSnippet: {
      language: "html",
      title: "Status Publikasi Siap",
      code: `<!-- 
  Selamat! Seluruh struktur HTML semantik & CSS modern 
  telah selesai dirangkai menjadi satu website kedai kopi utuh.
-->
<div class="pawon-container">
  <!-- Navbar Flexbox + Banner + Fasilitas + Menu + Form -->
</div>`,
    },
    studentChallenge: "Lakukan pengujian layar penuh (Zen Mode), ketik nama cafe buatanmu, dan publish ke Showcase!",
    speakerNotes: {
      targetMinutes: 10,
      teachingGoals: [
        "Beri apresiasi tinggi kepada seluruh siswa yang berhasil menyelesaikan dari selembar file kosong hingga jadi website utuh!",
        "Ajak siswa saling membuka galeri Showcase dan memberi tombol Like pada karya teman sekelas.",
      ],
      icebreakersOrQuestions: [
        "Coba lihat karya teman di sampingmu: apa ide paling unik yang dia terapkan?",
      ],
      commonTraps: [
        "Siswa lupa mengisi nama cafe sebelum klik tombol publish.",
      ],
    },
  },
  {
    id: 11,
    slug: "cheat-sheet-sintaks",
    badge: "REFERENSI CEPAT // CHEAT SHEET",
    title: "Rangkuman Sintaks Kunci HTML & CSS",
    subtitle: "Lembar Sontekan Standar untuk Pemula",
    category: "review",
    concept:
      "Jangan menghafal semua tag di luar kepala. Yang terpenting adalah mengerti struktur pohon elemen (DOM), kapan menggunakan tag yang tepat, dan cara mencari dokumentasi saat menemui masalah.",
    analogy: {
      title: "Buku Resep Standar Barista",
      description:
        "Barista profesional tetap punya buku panduan rasio takaran air dan gramasi kopi di laci kasir sebagai pegangan harian.",
      icon: "📖",
    },
    keyPoints: [
      { label: "Tag Struktur", detail: "<html>, <head>, <title>, <body>, <header>, <nav>, <div>, <footer>" },
      { label: "Tag Konten", detail: "<h1> sampai <h6>, <p>, <strong>, <em>, <hr>, <br>, <img> (src, alt)" },
      { label: "Tag Data & Form", detail: "<ul>, <ol>, <li>, <table>, <thead>, <tbody>, <tr>, <th>, <td>, <mark>, <form>, <input>, <select>, <textarea>, <button>" },
      { label: "CSS Properti Utama", detail: "color, background-color, font-family, margin, padding, border, box-sizing, display (flex), justify-content, align-items, :hover, :focus" },
    ],
    speakerNotes: {
      targetMinutes: 5,
      teachingGoals: [
        "Tekankan kepada siswa bahwa programmer profesional di Google atau Meta sekalipun tetap rutin membuka dokumentasi (MDN Web Docs).",
        "Kunci utama seorang developer adalah kemampuan problem solving dan ketekunan membaca pesan error.",
      ],
      icebreakersOrQuestions: [
        "Ada yang tahu kepanjangan MDN? (Mozilla Developer Network - ensiklopedia web terpercaya).",
      ],
      commonTraps: [
        "Merasa berkecil hati jika lupa nama atribut. Ingatkan bahwa ada Google dan AI assistant yang siap bantu.",
      ],
    },
  },
  {
    id: 12,
    slug: "penutup-qa",
    badge: "SESI AKHIR // TANYA JAWAB",
    title: "Sesi Tanya Jawab & Langkah Selanjutnya",
    subtitle: "Dari Dasar ke Tingkat Lanjutan: JavaScript, Framework, & Portofolio",
    category: "outro",
    concept:
      "Selamat! Siswa telah menguasai dua fondasi terpenting web modern: HTML5 & CSS3. Langkah berikutnya adalah menambahkan logika interaktif menggunakan JavaScript dan membangun portofolio pribadi.",
    analogy: {
      title: "Lulus Uji Barista Madya",
      description:
        "Kini kamu sudah bisa meracik espresso standar dan membuat latte art sendiri. Saatnya terus berlatih dan mengeksplorasi resep-resep minuman baru.",
      icon: "🎓",
    },
    keyPoints: [
      { label: "Portofolio GitHub", detail: "Simpan source code website kedai kopi ke GitHub Pages agar bisa diakses dari internet publik." },
      { label: "Lanjut Belajar JavaScript", detail: "Tambahkan logika perhitungan total belanja kasir otomatis dan mode gelap dinamis." },
      { label: "Jelajahi CSS Lanjutan", detail: "Pelajari CSS Grid, Media Queries untuk mobile-first, dan Animasi Keyframes." },
      { label: "Komunitas KopiCode", detail: "Tetap terhubung di grup komunitas dan terus saling berbagi kode." },
    ],
    speakerNotes: {
      targetMinutes: 10,
      teachingGoals: [
        "Buka sesi tanya jawab bebas: biarkan siswa bertanya apa pun seputar kendala yang mereka temui selama workshop.",
        "Arahkan siswa ke tombol 'Materi & Praktek' untuk mengulang kembali latihan kapan saja dari rumah.",
      ],
      icebreakersOrQuestions: [
        "Ada bagian modul yang menurut kalian paling menantang hari ini?",
        "Fitur apa yang paling ingin kamu tambahkan ke website kedai kopimu kalau ada waktu ekstra?",
      ],
      commonTraps: [
        "Siswa berhenti ngoding setelah workshop selesai. Motivasi mereka untuk membuat website kedua (misal: warung makan atau portofolio pribadi) dalam 48 jam ke depan.",
      ],
    },
  },
];
