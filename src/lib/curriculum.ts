export interface StepAssertion {
  id: string;
  description: string;
  hint: string;
  check: (html: string, css: string, doc: Document) => boolean;
}

export interface SupportingTip {
  title: string;
  items: {
    tag?: string;
    name: string;
    explanation: string;
    example?: string;
  }[];
}

export interface ModuleData {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  badge: string;
  summary: string;
  requiresCss?: boolean;
  theory: {
    heading: string;
    concept: string;
    analogy: string;
    supportingTips?: SupportingTip;
    codeExample: {
      title: string;
      language: "html" | "css";
      code: string;
    };
  };
  tasks: string[];
  starterHtml: string;
  starterCss: string;
  solutionHtml: string;
  solutionCss: string;
  assertions: StepAssertion[];
}

export const MODULES: ModuleData[] = [
  {
    id: 0,
    slug: "anatomi-dokumen-html",
    title: "Anatomi Tag & Dokumen HTML dari Nol",
    subtitle: "Menulis Kerangka Wajib Web Tanpa Bantuan Template",
    badge: "MODUL 00 // HTML SCRATCH",
    requiresCss: false,
    summary:
      "Pahami anatomi tag pembuka & penutup, dan tulis kerangka dokumen HTML lengkap dari halaman kosong dari nol tanpa template.",
    theory: {
      heading: "Anatomi Tag & 4 Elemen Utama Dokumen Web",
      analogy:
        "Bayangkan dokumen HTML seperti berkas resmi. <!DOCTYPE html> adalah stempel verifikasi internasional, <html> adalah map dokumennya, <head> adalah lembar identitas administrasi, dan <body> adalah isi lembar kerja yang dibaca langsung oleh audiens.",
      concept:
        "HTML (HyperText Markup Language) tersusun atas elemen-elemen yang ditulis menggunakan tag pembuka <tag> dan tag penutup </tag>. Setiap dokumen web standar wajib memiliki deklarasi <!DOCTYPE html>, elemen induk <html> beratribut bahasa (lang), elemen kepala <head> dengan <title>, dan elemen tubuh <body> tempat semua konten visual diletakkan.",
      supportingTips: {
        title: "💡 Anatomi Elemen & Tag Wajib Dokumen",
        items: [
          {
            tag: "<!DOCTYPE html>",
            name: "Deklarasi Versi HTML",
            explanation:
              "Wajib diletakkan di baris paling pertama agar browser merender halaman menggunakan standar HTML5 modern tanpa quirks mode.",
            example: "<!DOCTYPE html>",
          },
          {
            tag: '<html lang="id">',
            name: "Root Element (Akar Dokumen)",
            explanation:
              "Membungkus seluruh konten HTML. Atribut lang='id' memberitahu browser dan mesin pencari bahwa konten berbahasa Indonesia.",
            example: '<html lang="id">...</html>',
          },
          {
            tag: "<head>",
            name: "Kepala Dokumen (Metadata)",
            explanation:
              "Menampung informasi penting yang tidak langsung tampil di canvas, seperti judul tab (<title>) dan setelan karakter.",
            example: "<head><title>Nama Web</title></head>",
          },
          {
            tag: "<body>",
            name: "Badan Dokumen (Konten Visual)",
            explanation:
              "Wadah utama bagi semua elemen visual (teks, gambar, tombol, formulir) yang akan dilihat oleh pengunjung website.",
            example: "<body><h1>Halo Dunia</h1></body>",
          },
        ],
      },
      codeExample: {
        title: "Contoh Kerangka Minimal Dokumen HTML",
        language: "html",
        code: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Kedai Kopi Saya</title>
</head>
<body>
  <h1>Selamat Datang di Kedai Kopi</h1>
  <p>Website ini saya bangun dari selembar kode kosong.</p>
</body>
</html>`,
      },
    },
    tasks: [
      "Ketik deklarasi <!DOCTYPE html> di baris paling awal tab index.html.",
      'Buka tag <html lang="id"> dan pastikan ditutup dengan </html> di baris paling akhir.',
      "Di dalam tag <html>, buat elemen kepala <head> dan tutup dengan </head>.",
      "Di dalam <head>, tambahkan tag <title> dengan nama kedai kopimu (contoh: <title>Kedai Kopi Saya</title>).",
      "Di bawah tag </head>, buat elemen <body>...</body> dan tulis minimal satu tag judul atau teks di dalamnya.",
    ],
    starterHtml: `<!-- Tulis struktur dokumen HTML lengkap dari nol di bawah sini -->\n`,
    starterCss: `/* CSS belum diperlukan pada modul ini */\n`,
    solutionHtml: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Kedai Kopi Saya</title>
</head>
<body>
  <h1>Kedai Kopi Saya</h1>
  <p>Selamat datang di kedai kopi pertama kami.</p>
</body>
</html>`,
    solutionCss: ``,
    assertions: [
      {
        id: "m0-doctype",
        description: "Deklarasi <!DOCTYPE html> ada di baris pertama.",
        hint: "Tulis <!DOCTYPE html> di baris paling atas dokumen.",
        check: (html: string) => /<!DOCTYPE\s+html>/i.test(html),
      },
      {
        id: "m0-html-tag",
        description: 'Tag <html> pembungkus ada dan memiliki atribut lang (contoh: lang="id").',
        hint: 'Tulis <html lang="id"> di awal dan </html> di akhir dokumen.',
        check: (html: string, _css: string, doc: Document) =>
          Boolean(
            (doc.querySelector("html") && doc.querySelector("html")?.hasAttribute("lang")) ||
              /<html\s+[^>]*lang=/i.test(html)
          ),
      },
      {
        id: "m0-head-tag",
        description: "Tag <head> ada di dalam <html>.",
        hint: "Bungkus informasi dokumen di dalam <head>...</head>.",
        check: (html: string) => /<head[\s>]/i.test(html) && /<\/head>/i.test(html),
      },
      {
        id: "m0-title-tag",
        description: "Tag <title> ada di dalam <head> dan memiliki teks nama cafe.",
        hint: "Tambahkan <title>Nama Cafe</title> di dalam tag <head>.",
        check: (_html: string, _css: string, doc: Document) =>
          Boolean(doc.title && doc.title.trim().length > 0),
      },
      {
        id: "m0-body-tag",
        description: "Tag <body> ada di dalam <html> dan berisi teks selamat datang atau judul.",
        hint: "Buat tag <body>...</body> dan isi dengan teks seperti <h1>Nama Cafe</h1> atau <p>Selamat Datang</p>.",
        check: (html: string, _css: string, doc: Document) =>
          Boolean(
            /<body[\s>]/i.test(html) &&
              /<\/body>/i.test(html) &&
              doc.body &&
              doc.body.textContent &&
              doc.body.textContent.trim().length > 2
          ),
      },
    ],
  },
  {
    id: 1,
    slug: "fondasi-html-banner",
    title: "Fondasi Dokumen, Format Teks & Media",
    subtitle: "Membangun Kerangka Awal & Banner Kedai Kopi",
    badge: "MODUL 01 // HTML CORE",
    requiresCss: false,
    summary:
      "Pelajari cara browser membaca dokumen web, anatomi tag HTML, hierarki heading, penekanan teks penting, pemisah seksi, dan menampilkan banner foto kedai kopi.",
    theory: {
      heading: "Kerangka Dasar Web & Format Teks Esensial",
      analogy:
        "Jika website adalah bangunan kedai kopi fisik, HTML adalah pondasi beton, tiang penyangga, pintu, dan dindingnya. Tanpa HTML, tidak ada struktur yang bisa didekorasi!",
      concept:
        "Dokumen HTML standar selalu diawali dengan deklarasi <!DOCTYPE html>, diikuti pembungkus <html>, kepala dokumen <head> (untuk metadata dan judul tab), serta <body> yang memuat semua elemen visual yang tampil di layar.",
      supportingTips: {
        title: "💡 Format Teks & Tag Utility Esensial",
        items: [
          {
            tag: "<strong>",
            name: "Penekanan Penting (Importance)",
            explanation:
              "Menandai teks tebal dengan makna semantik krusial bagi pembaca layar.",
            example: "<strong>Buka 24 Jam</strong>",
          },
          {
            tag: "<em>",
            name: "Intonasi Miring (Emphasis)",
            explanation:
              "Menandai teks miring dengan penekanan nada bicara atau suasana.",
            example: "<em>paling nyaman</em>",
          },
          {
            tag: "<hr>",
            name: "Garis Pemisah (Horizontal Rule)",
            explanation:
              "Tag mandiri (self-closing) untuk membagi topik antar seksi secara visual.",
            example: "<hr>",
          },
          {
            tag: "<br>",
            name: "Pindah Baris (Break Line)",
            explanation: "Ganti baris tanpa membuat paragraf terpisah.",
            example: "Kopi<br>Senja",
          },
        ],
      },
      codeExample: {
        title: "Contoh Sintaks Dokumen Dasar & Banner",
        language: "html",
        code: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Kopi Artisan Senja</title>
</head>
<body>
  <header>
    <h1>Kopi Artisan Senja</h1>
    <p>Menyajikan seduhan kopi <strong>single origin terbaik</strong> nusantara dengan suasana <em>paling nyaman</em>.</p>
    <hr>
    <img src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800" alt="Suasana Kedai Kopi Artisan Senja">
  </header>
</body>
</html>`,
      },
    },
    tasks: [
      "Buat struktur dasar dokumen HTML (<!DOCTYPE html>, <html>, <head>, <body>) di tab index.html.",
      "Buat judul brand kedai kopimu menggunakan tag <h1> (contoh: Kopi Artisan Senja).",
      "Buat satu kalimat tagline/deskripsi menggunakan tag <p>, dan gunakan tag <strong> atau <em> pada salah satu kata penting.",
      "Tambahkan garis pemisah menggunakan tag <hr>.",
      "Tampilkan foto banner kedai kopi menggunakan tag <img> dengan atribut src dan atribut alt.",
    ],
    starterHtml: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Kedai Kopi Saya</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <!-- Tulis kode Modul 01 di bawah sini -->

</body>
</html>`,
    starterCss: `/* Tab style.css akan kita hias di Modul 05 */
body {
  font-family: sans-serif;
  margin: 20px;
}`,
    solutionHtml: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Kopi Artisan Senja</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <h1>Kopi Artisan Senja</h1>
    <p>Menyajikan seduhan kopi <strong>single origin terbaik</strong> nusantara dengan suasana <em>paling nyaman</em>.</p>
    <hr>
    <img src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800" alt="Suasana Kedai Kopi Artisan Senja">
  </header>
</body>
</html>`,
    solutionCss: `body {
  font-family: sans-serif;
  margin: 20px;
}`,
    assertions: [
      {
        id: "m1-h1",
        description: "Tag <h1> harus ada dan memiliki teks nama cafe.",
        hint: "Tambahkan tag <h1>Nama Cafe Anda</h1> di dalam <body>.",
        check: (_html, _css, doc) => {
          const h1 = doc.querySelector("h1");
          return !!(h1 && h1.textContent && h1.textContent.trim().length > 0);
        },
      },
      {
        id: "m1-p",
        description: "Tag <p> harus ada sebagai kalimat tagline atau deskripsi cafe.",
        hint: "Tambahkan tag <p>Kalimat tagline...</p> di bawah judul.",
        check: (_html, _css, doc) => {
          const p = doc.querySelector("p");
          return !!(p && p.textContent && p.textContent.trim().length > 0);
        },
      },
      {
        id: "m1-format",
        description: "Gunakan tag <strong> atau <em> untuk memberi penekanan pada kata.",
        hint: "Bungkus salah satu kata di dalam paragraf dengan <strong> atau <em>.",
        check: (_html, _css, doc) => {
          return !!(doc.querySelector("strong") || doc.querySelector("em") || doc.querySelector("b") || doc.querySelector("i"));
        },
      },
      {
        id: "m1-hr",
        description: "Terdapat garis pemisah horizontal <hr>.",
        hint: "Tambahkan tag <hr> setelah paragraf deskripsi.",
        check: (_html, _css, doc) => {
          return !!doc.querySelector("hr");
        },
      },
      {
        id: "m1-img",
        description: "Tag <img> harus memiliki atribut src dan alt.",
        hint: 'Gunakan <img src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800" alt="Foto Suasana Cafe">.',
        check: (_html, _css, doc) => {
          const img = doc.querySelector("img");
          return !!(img && img.getAttribute("src") && img.getAttribute("alt"));
        },
      },
    ],
  },
  {
    id: 2,
    slug: "fasilitas-list-container",
    title: "Fasilitas, Lists & Container Div",
    subtitle: "Mengelompokkan Keunggulan Cafe dengan <ul> dan <div>",
    badge: "MODUL 02 // LISTS & DIVS",
    requiresCss: false,
    summary:
      "Pelajari cara mengelompokkan informasi keunggulan cafe dengan Unordered List (<ul>), Ordered List (<ol>), List Item (<li>), dan mengenal container serbaguna <div>.",
    theory: {
      heading: "Pengelompokan Informasi dengan List & Container",
      analogy:
        "Daftar fasilitas adalah papan pengumuman di pintu masuk cafe: pengunjung bisa membaca sekilas apa saja kenyamanan yang disediakan (Wi-Fi, colokan listrik, smoking area).",
      concept:
        "Gunakan <ul> (Unordered List) jika urutan poin tidak krusial. Gunakan <ol> (Ordered List) jika urutan harus bertahap (1, 2, 3). Setiap butir selalu dibungkus tag <li>. Gunakan <div> untuk mengelompokkan kartu seksi.",
      supportingTips: {
        title: "💡 Container: <div> vs <span> dan Tautan <a>",
        items: [
          {
            tag: "<div>",
            name: "Generic Block Container",
            explanation: "Membungkus sekelompok elemen agar menjadi satu kartu / unit seksi.",
            example: '<div class="card">...</div>',
          },
          {
            tag: "<span>",
            name: "Generic Inline Container",
            explanation: "Menargetkan beberapa kata di dalam paragraf tanpa membuat baris baru.",
            example: '<span class="highlight">diskon</span>',
          },
          {
            tag: "<a>",
            name: "Anchor Link",
            explanation: "Tautan untuk melompat ke seksi lain (#menu) atau link eksternal.",
            example: '<a href="#menu">Lihat Menu</a>',
          },
        ],
      },
      codeExample: {
        title: "Contoh List Fasilitas & Anchor Link",
        language: "html",
        code: `<div id="fasilitas">
  <h2>Fasilitas & Keunggulan Kami</h2>
  <ul>
    <li>Koneksi Wi-Fi Berkecepatan Tinggi 100 Mbps</li>
    <li>Area Semi-Outdoor Teduh dan Smoking Room Nyaman</li>
    <li>Biji Kopi Asli Nusantara Specialty Grade</li>
  </ul>
  <p><a href="#menu">Jelajahi Menu Makanan & Minuman &rarr;</a></p>
</div>`,
      },
    },
    tasks: [
      'Buat pembungkus <div id="fasilitas"> di bawah banner foto cafe.',
      'Buat sub-judul <h2> bertuliskan "Fasilitas & Layanan Kami".',
      "Buat satu elemen <ul> untuk menampung keunggulan cafe.",
      "Tambahkan minimal 3 item fasilitas menggunakan tag <li>.",
      'Tambahkan satu tautan anchor <a href="#menu"> menuju seksi menu.',
    ],
    starterHtml: `<!-- Lanjutkan dari kode Modul 01 sebelumnya -->
<div id="fasilitas">
  <!-- Buat h2, ul dengan 3 li, dan link a di sini -->

</div>`,
    starterCss: `body {
  font-family: sans-serif;
  margin: 20px;
}`,
    solutionHtml: `<header>
  <h1>Kopi Artisan Senja</h1>
  <p>Menyajikan seduhan kopi <strong>single origin terbaik</strong> nusantara dengan suasana <em>paling nyaman</em>.</p>
  <hr>
  <img src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800" alt="Suasana Kedai Kopi Artisan Senja">
</header>

<div id="fasilitas">
  <h2>Fasilitas & Layanan Kami</h2>
  <ul>
    <li>Free Wi-Fi High-Speed 100 Mbps & Stopkontak di Setiap Meja</li>
    <li>Area Semi-Outdoor Sejuk dan Ruang Non-Smoking Ber-AC</li>
    <li>Biji Kopi Pilihan Specialty Grade dari Barista Berpengalaman</li>
  </ul>
  <p><a href="#menu">Jelajahi Menu Makanan & Minuman &rarr;</a></p>
</div>`,
    solutionCss: `body {
  font-family: sans-serif;
  margin: 20px;
}`,
    assertions: [
      {
        id: "m2-h2",
        description: "Tag <h2> harus ada sebagai judul seksi fasilitas.",
        hint: "Tambahkan <h2>Fasilitas & Keunggulan Kami</h2>.",
        check: (_html, _css, doc) => !!doc.querySelector("h2"),
      },
      {
        id: "m2-list",
        description: "Terdapat elemen list (<ul> atau <ol>).",
        hint: "Bungkus item fasilitas dengan tag <ul>.",
        check: (_html, _css, doc) => !!(doc.querySelector("ul") || doc.querySelector("ol")),
      },
      {
        id: "m2-items",
        description: "Terdapat minimal 3 item fasilitas dengan tag <li>.",
        hint: "Tambahkan minimal 3 tag <li> di dalam <ul>.",
        check: (_html, _css, doc) => doc.querySelectorAll("li").length >= 3,
      },
      {
        id: "m2-anchor",
        description: "Terdapat elemen tautan <a> dengan atribut href.",
        hint: 'Tambahkan tautan seperti <a href="#menu">Lihat Menu</a>.',
        check: (_html, _css, doc) => {
          const a = doc.querySelector("a");
          return !!(a && a.getAttribute("href"));
        },
      },
    ],
  },
  {
    id: 3,
    slug: "tabel-menu-harga",
    title: "Tabel Menu Makanan & Minuman",
    subtitle: "Penyajian Data Terstruktur dengan Semantic Table & Badge Status",
    badge: "MODUL 03 // DATA TABLES",
    requiresCss: false,
    summary:
      "Pelajari cara merancang tabel data tabular semantik (<table>, <thead>, <tbody>, <tr>, <th>, <td>) dan memanfaatkan tag <mark> untuk menandai menu best seller.",
    theory: {
      heading: "Struktur Tabel Semantik 2-Dimensi",
      analogy:
        "Buku menu kedai kopi yang rapi memiliki kolom Kategori, Nama Menu, dan Harga. Pengunjung dapat memindai baris demi baris dengan sangat cepat.",
      concept:
        "Tabel HTML modern memisahkan baris judul kolom di dalam <thead> dan baris data aktual di dalam <tbody>. Baris dinyatakan dengan <tr>, judul kolom tebal dengan <th>, dan sel data dengan <td>.",
      supportingTips: {
        title: "💡 Badge Status Menu dengan <mark> & <small>",
        items: [
          {
            tag: "<mark>",
            name: "Highlight Stabilo",
            explanation: "Sangat pas untuk menandai label menu favorit: <mark>Best Seller</mark>.",
          },
          {
            tag: "<small>",
            name: "Catatan Kaki Sel",
            explanation: "Keterangan ukuran/porsi: <small>(Panas/Dingin)</small>.",
          },
        ],
      },
      codeExample: {
        title: "Contoh Tabel Menu Terstruktur",
        language: "html",
        code: `<div id="menu">
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
        <td>Espresso</td>
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
</div>`,
      },
    },
    tasks: [
      'Buat pembungkus <div id="menu">.',
      'Buat sub-judul <h2> bertuliskan "Daftar Menu Favorit".',
      "Buat elemen <table> yang memiliki blok <thead> dan blok <tbody>.",
      'Di dalam <thead>, buat 1 baris <tr> dengan 3 header kolom <th>: "Kategori", "Menu", dan "Harga".',
      "Di dalam <tbody>, buat minimal 3 baris data <tr>, masing-masing dengan 3 sel <td>.",
      "Gunakan tag <mark> pada salah satu nama menu untuk menandai menu rekomendasi.",
    ],
    starterHtml: `<div id="menu">
  <!-- Buat tabel menu kopi dengan thead dan tbody di sini -->

</div>`,
    starterCss: `body {
  font-family: sans-serif;
  margin: 20px;
}`,
    solutionHtml: `<div id="menu">
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
        <td>Pastry / Cemilan</td>
        <td>Croissant Butter Crispy</td>
        <td>Rp 22.000</td>
      </tr>
    </tbody>
  </table>
</div>`,
    solutionCss: `body {
  font-family: sans-serif;
  margin: 20px;
}`,
    assertions: [
      {
        id: "m3-structure",
        description: "Elemen <table> harus memiliki <thead> dan <tbody>.",
        hint: "Pastikan tabel dibungkus dengan <table><thead>..</thead><tbody>..</tbody></table>.",
        check: (_html, _css, doc) => {
          const table = doc.querySelector("table");
          return !!(table && doc.querySelector("table thead") && doc.querySelector("table tbody"));
        },
      },
      {
        id: "m3-headers",
        description: "Terdapat minimal 3 kolom header <th> pada <thead>.",
        hint: "Tambahkan 3 kolom <th> di baris <tr> dalam <thead> (Kategori, Menu, Harga).",
        check: (_html, _css, doc) => doc.querySelectorAll("thead th").length >= 3,
      },
      {
        id: "m3-rows",
        description: "Terdapat minimal 3 baris menu <tr> di dalam <tbody>.",
        hint: "Tambahkan minimal 3 baris <tr> di dalam <tbody>.",
        check: (_html, _css, doc) => doc.querySelectorAll("tbody tr").length >= 3,
      },
      {
        id: "m3-mark",
        description: "Gunakan tag <mark> untuk menandai salah satu menu rekomendasi.",
        hint: "Bungkus label seperti <mark>Best Seller</mark> pada salah satu sel <td>.",
        check: (_html, _css, doc) => !!doc.querySelector("table mark"),
      },
    ],
  },
  {
    id: 4,
    slug: "form-reservasi-meja",
    title: "Formulir Reservasi Meja Lengkap",
    subtitle: "Mengumpulkan Input Pengguna dengan Form Controls HTML5",
    badge: "MODUL 04 // FORMS & INPUTS",
    requiresCss: false,
    summary:
      "Pelajari cara menyusun formulir interaktif lengkap: text, date, number, radio buttons mutually exclusive, select dropdown, textarea, dan button submit.",
    theory: {
      heading: "Interaktivitas Pengguna melalui Formulir HTML5",
      analogy:
        "Formulir reservasi adalah kartu pemesanan meja di kasir cafe: pengunjung mengisi nama, tanggal kedatangan, pilihan area (indoor AC atau outdoor garden), dan catatan request tempat duduk.",
      concept:
        "Semua kontrol input dikelompokkan di dalam tag <form>. Tag <label for='...'> menghubungkan teks panduan dengan input terkait. Atribut type mengatur perilaku browser (tipe date memunculkan kalender, number memunculkan spinner angka).",
      supportingTips: {
        title: "💡 Atribut Wajib & Aksesibilitas Form",
        items: [
          {
            tag: 'name="..."',
            name: "Nama Pengenal Data",
            explanation:
              "Wajib sama untuk semua radio button pada pertanyaan yang sama agar hanya 1 opsi yang terpilih.",
          },
          {
            tag: "required",
            name: "Validasi Wajib Isi",
            explanation:
              "Mencegah formulir dikirim jika input masih kosong tanpa perlu menulis JavaScript.",
          },
          {
            tag: 'placeholder="..."',
            name: "Contoh Teks Bayangan",
            explanation: "Memberikan instruksi contoh teks di dalam field input.",
          },
        ],
      },
      codeExample: {
        title: "Contoh Form Reservasi Meja",
        language: "html",
        code: `<div id="reservasi">
  <h2>Reservasi Meja Cafe</h2>
  <form id="form-reservasi">
    <div>
      <label for="nama">Nama Lengkap:</label>
      <input type="text" id="nama" name="nama" placeholder="Masukkan nama Anda" required>
    </div>
    <div>
      <label for="tanggal">Tanggal Kunjungan:</label>
      <input type="date" id="tanggal" name="tanggal" required>
    </div>
    <div>
      <label for="kursi">Jumlah Kursi:</label>
      <input type="number" id="kursi" name="kursi" min="1" value="2" required>
    </div>
    <div>
      <label>Area Pilihan:</label>
      <label><input type="radio" name="area" value="indoor" checked> Indoor AC</label>
      <label><input type="radio" name="area" value="outdoor"> Outdoor Garden</label>
    </div>
    <div>
      <label for="cabang">Pilih Cabang:</label>
      <select id="cabang" name="cabang">
        <option value="utama">Cabang Senopati</option>
        <option value="dago">Cabang Dago Heritage</option>
      </select>
    </div>
    <div>
      <label for="catatan">Catatan Meja:</label>
      <textarea id="catatan" name="catatan" rows="3" placeholder="Dekat stopkontak..."></textarea>
    </div>
    <button type="submit">Pesan Meja Sekarang</button>
  </form>
</div>`,
      },
    },
    tasks: [
      'Buat pembungkus <div id="reservasi">.',
      'Buat sub-judul <h2> bertuliskan "Reservasi Meja Cafe".',
      'Buat elemen <form id="form-reservasi"> yang membungkus seluruh kontrol.',
      'Buat field nama dengan <input type="text" placeholder="..." required>.',
      'Buat field tanggal kunjungan dengan <input type="date" required>.',
      'Buat field jumlah tamu dengan <input type="number" min="1" required>.',
      'Buat minimal 2 radio button dengan name="area" (Indoor dan Outdoor).',
      "Buat dropdown <select> cabang dengan minimal 2 <option>.",
      "Buat field <textarea> untuk catatan reservasi.",
      'Buat tombol submit <button type="submit">Pesan Meja Sekarang</button>.',
    ],
    starterHtml: `<div id="reservasi">
  <!-- Buat elemen form dengan kontrol lengkap di sini -->

</div>`,
    starterCss: `body {
  font-family: sans-serif;
  margin: 20px;
}`,
    solutionHtml: `<div id="reservasi">
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
      <label for="kursi">Jumlah Tamu (Kursi):</label>
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
        <option value="senopati">Cabang Senopati Central</option>
        <option value="dago">Cabang Dago Heritage</option>
      </select>
    </div>
    <div class="form-group">
      <label for="catatan">Catatan / Permintaan Khusus:</label>
      <textarea id="catatan" name="catatan" rows="3" placeholder="Contoh: Dekat stopkontak..."></textarea>
    </div>
    <button type="submit">Pesan Meja Sekarang</button>
  </form>
</div>`,
    solutionCss: `body {
  font-family: sans-serif;
  margin: 20px;
}`,
    assertions: [
      {
        id: "m4-form",
        description: "Elemen <form> harus ada membungkus formulir.",
        hint: "Bungkus seluruh field input di dalam tag <form>..</form>.",
        check: (_html, _css, doc) => !!doc.querySelector("form"),
      },
      {
        id: "m4-text",
        description: "Terdapat input teks nama tamu dengan atribut required.",
        hint: 'Gunakan <input type="text" name="nama" required>.',
        check: (_html, _css, doc) => {
          const inp = doc.querySelector('input[type="text"]');
          return !!(inp && inp.hasAttribute("required"));
        },
      },
      {
        id: "m4-date",
        description: "Terdapat input pemilih tanggal (type='date').",
        hint: 'Gunakan <input type="date" name="tanggal" required>.',
        check: (_html, _css, doc) => !!doc.querySelector('input[type="date"]'),
      },
      {
        id: "m4-radio",
        description: "Terdapat minimal 2 radio button untuk pemilihan area meja.",
        hint: 'Gunakan <input type="radio" name="area" value="indoor">.',
        check: (_html, _css, doc) => doc.querySelectorAll('input[type="radio"]').length >= 2,
      },
      {
        id: "m4-select",
        description: "Terdapat dropdown <select> dengan minimal 2 <option>.",
        hint: "Gunakan <select><option>Cabang A</option><option>Cabang B</option></select>.",
        check: (_html, _css, doc) => {
          const select = doc.querySelector("select");
          return !!(select && select.querySelectorAll("option").length >= 2);
        },
      },
      {
        id: "m4-textarea",
        description: "Terdapat input <textarea> untuk catatan reservasi.",
        hint: 'Tambahkan tag <textarea name="catatan"></textarea>.',
        check: (_html, _css, doc) => !!doc.querySelector("textarea"),
      },
      {
        id: "m4-submit",
        description: "Terdapat tombol submit untuk mengirim formulir.",
        hint: 'Gunakan <button type="submit">Pesan Meja</button>.',
        check: (_html, _css, doc) => {
          return !!(doc.querySelector('button[type="submit"]') || doc.querySelector("form button"));
        },
      },
    ],
  },
  {
    id: 5,
    slug: "css-box-model-gradient",
    title: "CSS Box Model, Warna & Mengetengahkan Div",
    subtitle: "Mantra box-sizing, linear-gradient, dan Jurus margin: 0 auto",
    badge: "MODUL 05 // CSS STYLING",
    requiresCss: true,
    summary:
      "Pelajari Box Model (margin, padding, border, border-radius), mantra wajib box-sizing: border-box, gradasi warna modern linear-gradient, dan jurus paling dicari: cara mengetengahkan div!",
    theory: {
      heading: "Dunia Box Model, Pewarnaan & Tata Letak Kontainer",
      analogy:
        "Mewarnai dinding cafe dengan cat warm espresso, memberi jarak antar meja (margin), memasang bantalan busa pada kursi (padding), dan memastikan seluruh ruangan berada di tengah ruko yang simetris.",
      concept:
        "Setiap elemen HTML adalah kotak persegi panjang. 'box-sizing: border-box' memastikan padding dan border tidak menambah lebar total elemen. Jurus klasik 'margin: 0 auto; max-width: 820px;' adalah cara teruji untuk mengetengahkan kontainer di tengah layar monitor.",
      supportingTips: {
        title: "💡 Background Gradasi & Jurus Mengetengahkan Div",
        items: [
          {
            name: "box-sizing: border-box",
            explanation: "Mantra universal reset agar kalkulasi lebar elemen selalu presisi.",
            example: "* { box-sizing: border-box; }",
          },
          {
            name: "margin: 0 auto",
            explanation:
              "Mengetengahkan div bertipe block di tengah layar secara otomatis jika dipadukan dengan max-width.",
            example: ".container { max-width: 820px; margin: 0 auto; }",
          },
          {
            name: "linear-gradient(...)",
            explanation: "Gradasi dua warna halus untuk memberi kesan elegan pada kartu atau header.",
            example: "background: linear-gradient(135deg, #292524, #1c1917);",
          },
          {
            name: "border-collapse: collapse",
            explanation: "Menyatukan garis ganda pada sel tabel agar garis tabel menjadi tipis dan rapi.",
            example: "table { border-collapse: collapse; }",
          },
        ],
      },
      codeExample: {
        title: "Contoh Styling CSS Box Model & Warna",
        language: "css",
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
  background: linear-gradient(135deg, #292524 0%, #1c1917 100%);
  border: 1px solid #44403c;
  border-radius: 12px;
  padding: 24px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px;
  border-bottom: 1px solid #292524;
}`,
      },
    },
    tasks: [
      "Buka tab style.css.",
      "Terapkan universal reset * { box-sizing: border-box; }.",
      "Atur warna latar belakang (background-color) gelap dan warna teks (color) terang pada body.",
      "Terapkan jurus margin: 0 auto dan max-width pada kontainer pembungkus utama agar website berada di tengah layar.",
      "Terapkan gradasi linear-gradient(...) pada header atau kartu cafe.",
      "Terapkan border-collapse: collapse pada elemen table.",
    ],
    starterHtml: `<div class="main-container">
  <!-- Struktur HTML dari Modul 1 sampai 4 sudah siap -->
</div>`,
    starterCss: `/* Tulis aturan CSS Modul 05 di sini */
* {
  box-sizing: border-box;
}

body {
  /* Berikan warna latar dan teks */
}`,
    solutionHtml: `<div class="main-container">
  <!-- HTML lengkap -->
</div>`,
    solutionCss: `* {
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

header, .card-section {
  background: linear-gradient(135deg, #292524 0%, #1c1917 100%);
  border: 1px solid #44403c;
  border-radius: 12px;
  padding: 28px;
  margin-bottom: 24px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
}

th, td {
  padding: 12px 16px;
  border-bottom: 1px solid #292524;
}

th {
  background-color: #292524;
  color: #f59e0b;
}

button {
  background-color: #d97706;
  color: #ffffff;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}`,
    assertions: [
      {
        id: "m5-boxsizing",
        description: "Terapkan box-sizing: border-box pada CSS.",
        hint: "Tambahkan * { box-sizing: border-box; } di baris awal style.css.",
        check: (_html, css) => /box-sizing\s*:\s*border-box/i.test(css),
      },
      {
        id: "m5-colors",
        description: "Definisikan warna teks (color) dan warna latar (background-color).",
        hint: "Atur body { background-color: #...; color: #...; }.",
        check: (_html, css) => /color\s*:/i.test(css) && /background(-color)?\s*:/i.test(css),
      },
      {
        id: "m5-centering",
        description: "Terapkan jurus margin: 0 auto untuk mengetengahkan kontainer.",
        hint: "Gunakan margin: 0 auto; max-width: 800px; pada kelas kontainer.",
        check: (_html, css) => /margin\s*:\s*0\s+auto/i.test(css) || /margin-left\s*:\s*auto/i.test(css) || /display\s*:\s*flex/i.test(css),
      },
      {
        id: "m5-gradient",
        description: "Terapkan efek gradasi modern linear-gradient(...).",
        hint: "Gunakan background: linear-gradient(135deg, #292524, #1c1917); pada header.",
        check: (_html, css) => /linear-gradient/i.test(css),
      },
      {
        id: "m5-collapse",
        description: "Terapkan border-collapse: collapse pada tabel menu.",
        hint: "Tambahkan table { border-collapse: collapse; }.",
        check: (_html, css) => /border-collapse\s*:\s*collapse/i.test(css),
      },
    ],
  },
  {
    id: 6,
    slug: "flexbox-layout-pseudoclasses",
    title: "Layout Flexbox & Ragam Pseudo-Class",
    subtitle: "Navbar Modern, Efek :hover/:focus/:active, dan Interaksi Mikro Form",
    badge: "MODUL 06 // FLEXBOX & STATES",
    requiresCss: true,
    summary:
      "Kuasai tata letak Flexbox (display: flex, justify-content, align-items, gap), ragam pseudo-class interaktif (:hover, :active, :focus, :nth-child), dan sentuhan mikro JavaScript pada form.",
    theory: {
      heading: "Tata Letak Fleksibel 1-Dimensi & Status Interaksi",
      analogy:
        "Barista yang menyambut hangat saat pelanggan datang (:hover), struk kasir yang langsung tercetak saat pembayaran dikonfirmasi (:active), dan lampu meja yang menyala terang saat pelanggan duduk (:focus).",
      concept:
        "Flexbox adalah model tata letak paling populer untuk menyejajarkan elemen secara horizontal (seperti navbar logo di kiri dan link di kanan). Pseudo-classes memberi feedback visual responsif saat pengguna berinteraksi dengan elemen.",
      supportingTips: {
        title: "💡 Ragam Pseudo-Class Interaktif",
        items: [
          {
            tag: ":hover",
            name: "Kursor Melayang",
            explanation: "Mengubah warna atau posisi tombol saat didekati mouse.",
            example: "button:hover { background-color: #f59e0b; }",
          },
          {
            tag: ":active",
            name: "Tombol Ditekan",
            explanation: "Efek animasi tombol tertekan ke dalam saat diklik.",
            example: "button:active { transform: translateY(0); }",
          },
          {
            tag: ":focus",
            name: "Input Sedang Aktif",
            explanation: "Menyalakan border saat pengunjung sedang mengetik di dalam field form.",
            example: "input:focus { outline: 2px solid #f59e0b; }",
          },
        ],
      },
      codeExample: {
        title: "Contoh Flexbox Navbar & Pseudo-Class",
        language: "css",
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

input:focus, textarea:focus {
  outline: 2px solid #f59e0b;
}

button:hover {
  background-color: #f59e0b;
  transform: translateY(-2px);
}`,
      },
    },
    tasks: [
      'Tambahkan elemen <nav class="navbar"> di bagian paling atas dengan logo di kiri dan link menu di kanan.',
      "Di style.css, atur .navbar dengan display: flex, justify-content: space-between, dan align-items: center.",
      "Tambahkan efek pseudo-class :hover pada tombol dan link navigasi.",
      "Tambahkan efek pseudo-class :focus pada input atau textarea saat sedang aktif diketik.",
      'Tambahkan atribut onsubmit="alert(\'Reservasi meja berhasil dikirim!\'); return false;" pada tag <form>.',
    ],
    starterHtml: `<!-- Tambahkan navbar di bagian paling atas -->
<nav class="navbar">
  <div class="logo">☕ Senja Brew</div>
  <div class="nav-links">
    <a href="#fasilitas">Fasilitas</a>
    <a href="#menu">Menu</a>
    <a href="#reservasi">Reservasi</a>
  </div>
</nav>`,
    starterCss: `/* Tulis aturan Flexbox & Pseudo-Classes di sini */
.navbar {
  display: flex;
}`,
    solutionHtml: `<nav class="navbar">
  <div class="logo">☕ Senja Brew</div>
  <div class="nav-links">
    <a href="#fasilitas">Fasilitas</a>
    <a href="#menu">Menu</a>
    <a href="#reservasi">Reservasi</a>
  </div>
</nav>

<form id="form-reservasi" onsubmit="alert('Terima kasih! Reservasi meja Anda telah kami catat.'); return false;">
  <!-- Kontrol form -->
</form>`,
    solutionCss: `.navbar {
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
}`,
    assertions: [
      {
        id: "m6-flex",
        description: "Gunakan tata letak display: flex pada CSS.",
        hint: "Atur .navbar { display: flex; }.",
        check: (_html, css) => /display\s*:\s*flex/i.test(css),
      },
      {
        id: "m6-align",
        description: "Gunakan properti perataan Flexbox (justify-content atau align-items).",
        hint: "Tambahkan justify-content: space-between; align-items: center; pada .navbar.",
        check: (_html, css) => /justify-content\s*:/i.test(css) || /align-items\s*:/i.test(css),
      },
      {
        id: "m6-hover",
        description: "Terapkan efek interaksi pseudo-class :hover.",
        hint: "Tambahkan button:hover { ... } atau a:hover { ... }.",
        check: (_html, css) => /:hover/i.test(css),
      },
      {
        id: "m6-focus",
        description: "Terapkan pseudo-class :focus pada input atau textarea.",
        hint: "Tambahkan input:focus { outline: ... }.",
        check: (_html, css) => /:focus/i.test(css),
      },
      {
        id: "m6-onsubmit",
        description: "Formulir memiliki interaksi mikro onsubmit dengan pesan alert.",
        hint: 'Tambahkan onsubmit="alert(\'Reservasi terkirim!\'); return false;" pada tag <form>.',
        check: (html) => /onsubmit\s*=/i.test(html) || /alert\(/i.test(html),
      },
    ],
  },
  {
    id: 7,
    slug: "final-polish-showcase",
    title: "Audit Final & Publikasi ke Showcase Gallery",
    subtitle: "Uji Responsivitas Device dan Pamerkan Karyamu ke Publik",
    badge: "MODUL 07 // CELEBRATION",
    requiresCss: true,
    summary:
      "Periksa kembali kelengkapan struktur website kedai kopi, uji tampilan melalui mode Fullscreen Device Inspector, dan publikasikan karyamu ke Showcase Gallery bersama peserta lain!",
    theory: {
      heading: "Audit Mutu Website & Langkah Publikasi",
      analogy:
        "Grand Opening kedai kopi! Pintu terbuka, aroma kopi semerbak, dan menu terpasang megah. Waktunya menyambut pelanggan pertama dan memperlihatkan hasil kerja kerasmu!",
      concept:
        "Tahap audit memastikan website nyaman dibaca di layar desktop maupun ponsel pintar. Setelah seluruh modul 1-6 tercentang hijau, tombol publikasi akan aktif dan menyimpan karya ke database PostgreSQL.",
      supportingTips: {
        title: "💡 Checklist Kesiapan Publikasi",
        items: [
          {
            name: "Semantik HTML",
            explanation: "Heading, list fasilitas, tabel menu, dan form reservasi lengkap.",
          },
          {
            name: "Estetika & Responsif",
            explanation: "Navigasi rapi, warna hangat, dan proporsi teks seimbang di semua ukuran layar.",
          },
        ],
      },
      codeExample: {
        title: "Website Kedai Kopi Siap Tayang",
        language: "html",
        code: `<!-- Proyek website kedai kopi utuh peserta siap dipamerkan di Showcase Gallery -->`,
      },
    },
    tasks: [
      "Periksa panel checklist tantangan: pastikan seluruh Modul 1 sampai 6 bertanda centang hijau ✓ Lolos.",
      "Klik tombol [ ⛶ Fullscreen Preview ] untuk menguji tampilan website cafe di mode Desktop, Tablet, dan Mobile.",
      'Ketikkan Nama Brand Kedai Kopi buatanmu pada kolom publikasi di bawah sidebar.',
      "Klik tombol glowing [ 🚀 Publish ke Showcase Gallery ] dan rayakan karyamu di galeri publik!",
    ],
    starterHtml: "",
    starterCss: "",
    solutionHtml: "",
    solutionCss: "",
    assertions: [
      {
        id: "m7-allpassed",
        description: "Seluruh tantangan dari Modul 1 sampai 6 telah selesai dikerjakan.",
        hint: "Kembali ke modul sebelumnya jika masih ada checklist yang belum bertanda hijau.",
        check: (html, css, doc) => {
          const hasH1 = !!doc.querySelector("h1");
          const hasTable = !!doc.querySelector("table");
          const hasForm = !!doc.querySelector("form");
          const hasFlex = /display\s*:\s*flex/i.test(css);
          return hasH1 && hasTable && hasForm && hasFlex;
        },
      },
    ],
  },
];
