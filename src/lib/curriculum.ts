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
    title: "Struktur Dokumen HTML dari Nol",
    subtitle: "Bikin Kerangka Dasar Web Pertama Kamu Tanpa Bantuan Template",
    badge: "MODUL 00 // FONDASI DOKUMEN",
    requiresCss: false,
    summary:
      "Pahami cara kerja tag pembuka dan penutup, lalu tulis sendiri kerangka dokumen HTML lengkap di selembar file kosong.",
    theory: {
      heading: "Tag HTML & 4 Elemen Wajib Halaman Web",
      analogy:
        "Bikin file HTML itu mirip kayak nyiapin berkas surat resmi. <!DOCTYPE html> itu kop resminya, <html> itu map pembungkusnya, <head> lembar catatan judul & metadata di luar, dan <body> isi tulisan yang bakal dibaca pengunjung.",
      concept:
        "Browser membaca kode HTML lewat tag-tag berpasangan (<tag>konten</tag>) dan tag mandiri. Setiap file web standar wajib punya 4 bagian: deklarasi <!DOCTYPE html>, elemen root <html lang=\"id\">, elemen <head> buat judul tab, dan <body> buat semua hal yang tampil di layar.",
      supportingTips: {
        title: "💡 4 Elemen Wajib Dokumen HTML",
        items: [
          {
            tag: "<!DOCTYPE html>",
            name: "Deklarasi Standar HTML5",
            explanation:
              "Wajib ditaruh di baris paling atas agar browser merender halaman dengan standar modern.",
            example: "<!DOCTYPE html>",
          },
          {
            tag: '<html lang="id">',
            name: "Root Element (Akar Halaman)",
            explanation:
              "Membungkus seluruh isi file HTML. Atribut lang='id' memberitahu browser bahasa yang dipakai.",
            example: '<html lang="id">...</html>',
          },
          {
            tag: "<head>",
            name: "Kepala Dokumen (Metadata)",
            explanation:
              "Tempat naruh info yang tidak tampil di canvas, seperti judul tab browser (<title>).",
            example: "<head><title>Nama Web</title></head>",
          },
          {
            tag: "<body>",
            name: "Badan Dokumen (Konten Visual)",
            explanation:
              "Wadah utama buat semua teks, gambar, tombol, dan tabel yang dilihat pengunjung web.",
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
      "Ketik deklarasi <!DOCTYPE html> di baris paling atas tab index.html.",
      'Buka tag <html lang="id"> dan pastikan ditutup dengan </html> di baris paling bawah.',
      "Di dalam tag <html>, buat blok <head>...</head>.",
      "Di dalam <head>, tambahkan tag <title> dengan nama kedai kopi kamu.",
      "Di bawah tag </head>, buat blok <body>...</body> dan isi dengan minimal satu kalimat sapaan atau nama cafe.",
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
    title: "Struktur Konten & Media Banner",
    subtitle: "Bikin Header, Teks Penjelas, dan Banner Foto Kedai Kopi",
    badge: "MODUL 01 // KONTEN DASAR",
    requiresCss: false,
    summary:
      "Mulai mengisi halaman web dengan konten nyata: judul utama (h1), deskripsi (p), penekanan kata (strong, em), garis pemisah (hr), dan foto banner (img).",
    theory: {
      heading: "Menata Elemen Konten Teks & Gambar",
      analogy:
        "Sederhananya, HTML itu kerangka fisik sebuah toko: plang nama toko di atas, papan deskripsi di kaca depan, dan poster foto menu utama. Tanpa kerangka ini, pengunjung nggak tahu toko apa ini.",
      concept:
        "Di dalam tag <body>, kita menyusun konten visual yang dibaca pengguna. Browser membaca tag dari atas ke bawah. Tag <h1> digunakan untuk judul terpenting, <p> untuk kalimat deskripsi, <strong> untuk teks tebal penting, <em> untuk penekanan miring, <hr> untuk garis pemisah, dan <img> untuk menampilkan gambar dengan atribut src dan alt.",
      supportingTips: {
        title: "💡 Penekanan Teks & Tag Pembantu",
        items: [
          {
            tag: "<strong>",
            name: "Teks Tebal Berbobot (Importance)",
            explanation:
              "Menandai teks penting. Berguna untuk SEO dan pembaca layar (screen reader).",
            example: "<strong>Buka 24 Jam</strong>",
          },
          {
            tag: "<em>",
            name: "Penekanan Miring (Emphasis)",
            explanation:
              "Menandai kata dengan intonasi berbeda atau aksen khusus.",
            example: "<em>resep asli</em>",
          },
          {
            tag: "<hr>",
            name: "Garis Pembatas (Horizontal Rule)",
            explanation:
              "Tag mandiri tanpa penutup untuk memberi jeda visual antar bagian.",
            example: "<hr>",
          },
          {
            tag: "<br>",
            name: "Ganti Baris (Break Line)",
            explanation: "Membuat teks turun satu baris tanpa membuat paragraf baru.",
            example: "Kopi Susu<br>Gula Aren",
          },
        ],
      },
      codeExample: {
        title: "Contoh Header Kedai Kopi dengan Foto",
        language: "html",
        code: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Kedai Kopi Sudut Temu</title>
</head>
<body>
  <header>
    <h1>Kedai Kopi Sudut Temu</h1>
    <p>Tempat ngopi santai di pinggir kota. Buka setiap hari mulai jam <strong>08.00 pagi</strong> sampai <em>tengah malam</em>.</p>
    <hr>
    <img src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800" alt="Suasana Meja Kayu dan Mesin Kopi Sudut Temu">
  </header>
</body>
</html>`,
      },
    },
    tasks: [
      "Pastikan kerangka dokumen HTML (<!DOCTYPE html>, <html>, <head>, <body>) sudah siap di tab index.html.",
      "Buat judul nama kedai kopimu memakai tag <h1>.",
      "Tulis satu paragraf deskripsi singkat dengan tag <p>, lalu beri tag <strong> atau <em> pada kata yang ingin ditekankan.",
      "Tambahkan garis pembatas horizontal memakai tag <hr>.",
      "Tampilkan foto banner kedai kopi memakai tag <img> lengkap dengan atribut src dan alt.",
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
    starterCss: `/* File style.css akan kita pelajari mulai Modul 05 */
body {
  font-family: sans-serif;
  margin: 20px;
}`,
    solutionHtml: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Kedai Kopi Sudut Temu</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <h1>Kedai Kopi Sudut Temu</h1>
    <p>Tempat ngopi santai di pinggir kota. Buka setiap hari mulai jam <strong>08.00 pagi</strong> sampai <em>tengah malam</em>.</p>
    <hr>
    <img src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800" alt="Suasana Meja Kayu dan Mesin Kopi Sudut Temu">
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
    title: "Daftar Fasilitas & Pengelompokan Elemen",
    subtitle: "Rapikan Poin Layanan Pakai <ul>, <li>, dan Pembungkus <div>",
    badge: "MODUL 02 // LIST & CONTAINER",
    requiresCss: false,
    summary:
      "Kelompokkan info fasilitas cafe ke dalam daftar butir (ul, li), pelajari bedanya dengan list berurutan (ol), dan gunakan div untuk mengelompokkan satu bagian halaman.",
    theory: {
      heading: "Menyusun Daftar Poin & Mengelompokkan Konten",
      analogy:
        "Kayak papan info fasilitas di pintu masuk cafe: pengunjung langsung tahu ada Wi-Fi kencang, banyak colokan listrik, atau ruangan ber-AC tanpa harus membaca paragraf panjang.",
      concept:
        "Gunakan <ul> (Unordered List) saat urutan butir tidak harus bertingkat (misal daftar fasilitas). Kalau urutannya harus langkah demi langkah (misal resep), pakai <ol> (Ordered List). Tiap butir selalu dibungkus tag <li>. Tag <div> dipakai sebagai kotak pembungkus netral untuk mengelompokkan beberapa elemen menjadi satu seksi.",
      supportingTips: {
        title: "💡 Kontainer Pembungkus: <div> vs <span> dan Link <a>",
        items: [
          {
            tag: "<div>",
            name: "Generic Block Container",
            explanation: "Membungkus kumpulan elemen agar menjadi satu blok/seksi tersendiri.",
            example: '<div id="fasilitas">...</div>',
          },
          {
            tag: "<span>",
            name: "Generic Inline Container",
            explanation: "Membungkus sebagian kata di tengah kalimat tanpa bikin baris baru.",
            example: '<span class="status">Buka</span>',
          },
          {
            tag: "<a>",
            name: "Anchor Link (Tautan)",
            explanation: "Tautan untuk melompat ke bagian halaman lain (#menu) atau link luar.",
            example: '<a href="#menu">Lihat Daftar Menu</a>',
          },
        ],
      },
      codeExample: {
        title: "Contoh Seksi Fasilitas & Link Menu",
        language: "html",
        code: `<div id="fasilitas">
  <h2>Fasilitas & Layanan Kami</h2>
  <ul>
    <li>Wi-Fi kencang 100 Mbps & colokan di tiap meja</li>
    <li>Ruang ber-AC bebas asap rokok & area outdoor santai</li>
    <li>Biji kopi pilihan lokal dari roastery rekanan</li>
  </ul>
  <p><a href="#menu">Lihat Daftar Menu &rarr;</a></p>
</div>`,
      },
    },
    tasks: [
      'Buat kotak pembungkus <div id="fasilitas"> di bawah banner foto cafe.',
      'Buat judul seksi dengan tag <h2> bertuliskan "Fasilitas & Layanan Kami".',
      "Buat elemen <ul> untuk menampung butir-butir fasilitas.",
      "Tambahkan minimal 3 poin fasilitas memakai tag <li>.",
      'Tambahkan satu tautan anchor <a href="#menu"> untuk mengarahkan pengunjung ke daftar menu.',
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
  <h1>Kedai Kopi Sudut Temu</h1>
  <p>Tempat ngopi santai di pinggir kota. Buka setiap hari mulai jam <strong>08.00 pagi</strong> sampai <em>tengah malam</em>.</p>
  <hr>
  <img src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800" alt="Suasana Meja Kayu dan Mesin Kopi Sudut Temu">
</header>

<div id="fasilitas">
  <h2>Fasilitas & Layanan Kami</h2>
  <ul>
    <li>Wi-Fi kencang 100 Mbps & colokan di tiap meja</li>
    <li>Ruang ber-AC bebas asap rokok & area outdoor santai</li>
    <li>Biji kopi pilihan lokal dari roastery rekanan</li>
  </ul>
  <p><a href="#menu">Lihat Daftar Menu &rarr;</a></p>
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
    title: "Tabel Menu Minuman & Harga",
    subtitle: "Menata Menu Minuman Rapi Pakai <table>, <thead>, dan <tbody>",
    badge: "MODUL 03 // TABEL DATA",
    requiresCss: false,
    summary:
      "Susun daftar menu dan harga ke dalam format tabel semantik, lengkapi dengan header kolom dan tandai menu favorit memakai tag mark.",
    theory: {
      heading: "Struktur Tabel Data Dua Dimensi",
      analogy:
        "Buku menu fisik di meja kasir punya kolom yang jelas: Kategori, Nama Menu, dan Harga. Pengunjung bisa langsung lirik minuman yang dicari dan harganya tanpa bingung.",
      concept:
        "Tabel HTML yang terstruktur memisahkan baris judul kolom di dalam <thead> dan deretan baris data di <tbody>. Tiap baris dinyatakan dengan <tr>, judul kolom dengan <th> (otomatis tebal), dan sel data dengan <td>.",
      supportingTips: {
        title: "💡 Label Tambahan: <mark> & <small>",
        items: [
          {
            tag: "<mark>",
            name: "Highlight Stabilo",
            explanation: "Cocok untuk menandai menu andalan: <mark>Favorit</mark> atau <mark>Best Seller</mark>.",
          },
          {
            tag: "<small>",
            name: "Keterangan Ukuran / Porsi",
            explanation: "Catatan kecil di samping nama: <small>(Panas / Dingin)</small>.",
          },
        ],
      },
      codeExample: {
        title: "Contoh Tabel Menu Minuman",
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
        <td>V60 Aceh Gayo <mark>Favorit</mark></td>
        <td>Rp 26.000</td>
      </tr>
      <tr>
        <td>Espresso</td>
        <td>Kopi Susu Gula Aren</td>
        <td>Rp 22.000</td>
      </tr>
      <tr>
        <td>Camilan</td>
        <td>Roti Bakar Cokelat Keju</td>
        <td>Rp 18.000</td>
      </tr>
    </tbody>
  </table>
</div>`,
      },
    },
    tasks: [
      'Buat pembungkus <div id="menu"> di bawah seksi fasilitas.',
      'Buat sub-judul <h2> bertuliskan "Daftar Menu Favorit".',
      "Buat elemen <table> yang memiliki blok <thead> dan <tbody>.",
      'Di dalam <thead>, buat 1 baris <tr> dengan 3 header kolom <th>: "Kategori", "Menu", dan "Harga".',
      "Di dalam <tbody>, buat minimal 3 baris data <tr>, masing-masing dengan 3 sel <td>.",
      "Gunakan tag <mark> pada salah satu nama menu untuk menandai menu favorit.",
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
        <td>V60 Aceh Gayo <mark>Favorit</mark></td>
        <td>Rp 26.000</td>
      </tr>
      <tr>
        <td>Espresso Based</td>
        <td>Kopi Susu Gula Aren</td>
        <td>Rp 22.000</td>
      </tr>
      <tr>
        <td>Camilan</td>
        <td>Roti Bakar Cokelat Keju</td>
        <td>Rp 18.000</td>
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
    title: "Formulir Pemesanan Meja",
    subtitle: "Bikin Form Interaktif: Text, Tanggal, Pilihan Area, & Tombol Kirim",
    badge: "MODUL 04 // FORM & INPUT",
    requiresCss: false,
    summary:
      "Bangun formulir pemesanan lengkap menggunakan elemen form, berbagai tipe input (text, date, number, radio), dropdown select, catatan textarea, dan tombol submit.",
    theory: {
      heading: "Mengumpulkan Data Pengunjung Lewat Form HTML5",
      analogy:
        "Mirip lembar reservasi yang disodorkan barista: nama pemesan siapa, tanggal datang kapan, mau pesan berapa kursi, duduk di area ber-AC atau outdoor, plus catatan tambahan.",
      concept:
        "Semua kontrol input wajib dibungkus di dalam tag <form>. Tag <label for='...'> menghubungkan teks keterangan dengan input pasangannya. Atribut type menentukan bentuk kontrol (date memunculkan kalender bawaan browser, number membatasi input ke angka). Radio button yang memiliki atribut name yang sama akan saling mengunci (hanya bisa dipilih salah satu).",
      supportingTips: {
        title: "💡 Atribut Penting pada Elemen Form",
        items: [
          {
            tag: 'name="..."',
            name: "Kunci Identitas Data",
            explanation:
              "Wajib sama untuk pilihan radio button agar pilihan bersifat eksklusif (hanya 1 yang bisa dipilih).",
          },
          {
            tag: "required",
            name: "Validasi Wajib Diisi",
            explanation:
              "Mencegah form dikirim jika isian ini masih kosong, langsung divalidasi oleh browser.",
          },
          {
            tag: 'placeholder="..."',
            name: "Teks Panduan Awal",
            explanation: "Teks bayangan abu-abu di dalam kolom sebagai contoh isian.",
          },
        ],
      },
      codeExample: {
        title: "Contoh Form Pemesanan Meja",
        language: "html",
        code: `<div id="reservasi">
  <h2>Reservasi Meja Cafe</h2>
  <form id="form-reservasi">
    <div>
      <label for="nama">Nama Lengkap:</label>
      <input type="text" id="nama" name="nama" placeholder="Tulis nama Anda" required>
    </div>
    <div>
      <label for="tanggal">Tanggal Datang:</label>
      <input type="date" id="tanggal" name="tanggal" required>
    </div>
    <div>
      <label for="kursi">Jumlah Kursi:</label>
      <input type="number" id="kursi" name="kursi" min="1" value="2" required>
    </div>
    <div>
      <label>Pilihan Area:</label>
      <label><input type="radio" name="area" value="indoor" checked> Ruang AC</label>
      <label><input type="radio" name="area" value="outdoor"> Area Outdoor</label>
    </div>
    <div>
      <label for="cabang">Pilih Cabang:</label>
      <select id="cabang" name="cabang">
        <option value="utama">Cabang Sudut Temu Pusat</option>
        <option value="timur">Cabang Timur</option>
      </select>
    </div>
    <div>
      <label for="catatan">Catatan Meja:</label>
      <textarea id="catatan" name="catatan" rows="3" placeholder="Contoh: Meja dekat colokan..."></textarea>
    </div>
    <button type="submit">Pesan Meja Sekarang</button>
  </form>
</div>`,
      },
    },
    tasks: [
      'Buat pembungkus <div id="reservasi"> di bawah tabel menu.',
      'Buat sub-judul <h2> bertuliskan "Reservasi Meja Cafe".',
      'Buat elemen <form id="form-reservasi"> yang membungkus semua input dan tombol.',
      'Buat kolom nama dengan <input type="text" placeholder="..." required>.',
      'Buat kolom tanggal kunjungan dengan <input type="date" required>.',
      'Buat kolom jumlah tamu dengan <input type="number" min="1" required>.',
      'Buat minimal 2 radio button dengan name="area" (Ruang AC dan Area Outdoor).',
      "Buat dropdown <select> cabang dengan minimal 2 <option>.",
      "Buat kolom <textarea> untuk catatan reservasi.",
      'Buat tombol kirim <button type="submit">Pesan Meja Sekarang</button>.',
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
      <input type="text" id="nama" name="nama" placeholder="Tulis nama Anda" required>
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
      <label>Pilihan Area:</label>
      <label><input type="radio" name="area" value="indoor" checked> Ruang AC</label>
      <label><input type="radio" name="area" value="outdoor"> Area Outdoor</label>
    </div>
    <div class="form-group">
      <label for="cabang">Pilih Cabang:</label>
      <select id="cabang" name="cabang">
        <option value="utama">Cabang Sudut Temu Pusat</option>
        <option value="timur">Cabang Timur</option>
      </select>
    </div>
    <div class="form-group">
      <label for="catatan">Catatan / Permintaan Khusus:</label>
      <textarea id="catatan" name="catatan" rows="3" placeholder="Contoh: Meja dekat colokan..."></textarea>
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
    title: "CSS Box Model, Warna & Posisi Kontainer",
    subtitle: "Pahami Margin, Padding, border-box, dan Trik margin: 0 auto",
    badge: "MODUL 05 // DASAR CSS",
    requiresCss: true,
    summary:
      "Pahami konsep Box Model (margin, padding, border), pentingnya box-sizing: border-box agar ukuran elemen tidak meleset, membuat latar gradasi warna, dan cara merapikan kontainer ke tengah layar.",
    theory: {
      heading: "Memahami Box Model, Pewarnaan & Posisi Kontainer",
      analogy:
        "Kalau HTML bikin dinding dan sekat ruangannya, CSS yang ngecat warna dinding, ngatur jarak antar meja (margin), pasang bantalan busa di kursi (padding), dan mastiin posisi bangunan simetris di tengah ruko.",
      concept:
        "Semua elemen HTML dihitung sebagai kotak persegi (Box Model). Secara default, padding dan border akan menambah ukuran total elemen, sehingga 'box-sizing: border-box' penting digunakan agar kalkulasi lebar tetap presisi. Untuk menempatkan kontainer utama di tengah layar, kombinasi 'max-width: 820px; margin: 0 auto;' adalah teknik standar yang paling sering dipakai.",
      supportingTips: {
        title: "💡 Box Model & Posisi Kontainer",
        items: [
          {
            name: "box-sizing: border-box",
            explanation: "Reset standar agar padding dan border tidak menambah lebar total elemen.",
            example: "* { box-sizing: border-box; }",
          },
          {
            name: "margin: 0 auto",
            explanation:
              "Menempatkan elemen block di tengah layar secara otomatis jika dipadukan dengan max-width.",
            example: ".main-container { max-width: 820px; margin: 0 auto; }",
          },
          {
            name: "linear-gradient(...)",
            explanation: "Gradasi dua warna halus untuk memberi sentuhan visual modern pada kartu atau header.",
            example: "background: linear-gradient(135deg, #292524, #1c1917);",
          },
          {
            name: "border-collapse: collapse",
            explanation: "Menyatukan garis ganda pada sel tabel agar garis pembatas jadi tipis dan rapi.",
            example: "table { border-collapse: collapse; }",
          },
        ],
      },
      codeExample: {
        title: "Contoh Aturan Box Model & Warna",
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
      "Terapkan reset * { box-sizing: border-box; } di baris paling atas.",
      "Atur warna latar (background-color) gelap dan warna teks (color) terang pada selektor body.",
      "Gunakan kombinasi margin: 0 auto dan max-width pada kontainer pembungkus utama (.main-container).",
      "Terapkan gradasi linear-gradient(...) pada elemen header.",
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
        description: "Gunakan margin: 0 auto untuk mengetengahkan kontainer utama.",
        hint: "Gunakan margin: 0 auto; max-width: 800px; pada kelas kontainer.",
        check: (_html, css) => /margin\s*:\s*0\s+auto/i.test(css) || /margin-left\s*:\s*auto/i.test(css) || /display\s*:\s*flex/i.test(css),
      },
      {
        id: "m5-gradient",
        description: "Terapkan efek latar gradasi linear-gradient(...).",
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
    title: "Layout Navigasi Flexbox & Efek Interaksi",
    subtitle: "Sejajarkan Menu Pakai Flexbox dan Respons Tombol Saat Disentuh",
    badge: "MODUL 06 // FLEXBOX & HOVER",
    requiresCss: true,
    summary:
      "Gunakan Flexbox untuk menyejajarkan logo dan tautan navigasi, tambahkan efek interaktif kursor melayang (:hover) serta kolom input aktif (:focus), dan pasang respon pengiriman form.",
    theory: {
      heading: "Tata Letak Sejajar & Interaksi Elemen",
      analogy:
        "Bayangin sakelar atau kenop pintu cafe: pas tangan mendekat ada bayangan (:hover), pas ditekan ada respon klik (:active), dan pas aktif lampunya menyala terang (:focus). Interaksi visual mikro ini bikin pengunjung betah karena website terasa hidup.",
      concept:
        "Flexbox (display: flex) adalah teknik paling praktis untuk menata elemen secara mendatar dalam satu baris (seperti logo di ujung kiri dan link menu di ujung kanan). Pseudo-classes seperti :hover dan :focus memungkinkan kita memberikan feedback visual instan saat pengguna berinteraksi dengan elemen.",
      supportingTips: {
        title: "💡 Pseudo-Class Interaktif Populer",
        items: [
          {
            tag: ":hover",
            name: "Kursor Melayang",
            explanation: "Mengubah warna atau posisi tombol saat didekati mouse pengguna.",
            example: "button:hover { background-color: #f59e0b; }",
          },
          {
            tag: ":active",
            name: "Tombol Sedang Ditekan",
            explanation: "Efek animasi tombol tertekan ke bawah saat diklik.",
            example: "button:active { transform: translateY(0); }",
          },
          {
            tag: ":focus",
            name: "Kolom Input Aktif",
            explanation: "Menyalakan garis batas saat pengguna sedang mengetik di dalam kolom.",
            example: "input:focus { outline: 2px solid #f59e0b; }",
          },
        ],
      },
      codeExample: {
        title: "Contoh Navbar Flexbox & Pseudo-Class",
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
      "Di tab style.css, atur .navbar dengan display: flex, justify-content: space-between, dan align-items: center.",
      "Tambahkan efek pseudo-class :hover pada tombol atau link navigasi.",
      "Tambahkan efek pseudo-class :focus pada input atau textarea saat sedang aktif diketik.",
      'Tambahkan atribut onsubmit="alert(\'Reservasi meja berhasil dikirim!\'); return false;" pada tag <form>.',
    ],
    starterHtml: `<!-- Tambahkan navbar di bagian paling atas -->
<nav class="navbar">
  <div class="logo">☕ Sudut Temu</div>
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
  <div class="logo">☕ Sudut Temu</div>
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
    title: "Cek Tampilan Akhir & Simpan ke Galeri",
    subtitle: "Uji Tampilan di Berbagai Layar dan Simpan Website Kedai Kopi Buatanmu",
    badge: "MODUL 07 // PUBLIKASI",
    requiresCss: true,
    summary:
      "Periksa kembali hasil akhir website kedai kopi yang sudah dibuat, uji tampilannya di mode layar penuh, dan simpan websitemu ke galeri Showcase publik.",
    theory: {
      heading: "Pemeriksaan Akhir & Langkah Publikasi",
      analogy:
        "Website kedai kopimu sekarang sudah punya kerangka lengkap, daftar menu rapi, form reservasi, dan styling modern. Sebelum ditunjukkan ke orang lain, saatnya cek tampilannya di layar laptop maupun ponsel.",
      concept:
        "Tahap akhir ini memastikan seluruh struktur HTML dan aturan CSS bekerja harmonis dan proporsional. Setelah modul-modul sebelumnya selesai, kamu bisa memasukkan nama brand kedai kopi buatanmu lalu mempublikasikannya agar tersimpan di database dan bisa diakses lewat galeri Showcase.",
      supportingTips: {
        title: "💡 Checklist Kesiapan Tampilan",
        items: [
          {
            name: "Struktur HTML Lengkap",
            explanation: "Header banner, daftar fasilitas, tabel harga menu, dan formulir reservasi tertata rapi.",
          },
          {
            name: "Kerapian Styling CSS",
            explanation: "Navigasi sejajar, warna kontras mudah dibaca, dan proporsi jarak nyaman di layar.",
          },
        ],
      },
      codeExample: {
        title: "Status Halaman Siap Tayang",
        language: "html",
        code: `<!-- Seluruh struktur website kedai kopi sudah siap dipamerkan di galeri Showcase -->`,
      },
    },
    tasks: [
      "Periksa panel checklist tantangan: pastikan seluruh Modul 0 sampai 6 sudah selesai.",
      "Gunakan Zen Mode atau tombol Fullscreen Preview untuk melihat tampilan website dalam layar penuh.",
      "Ketikkan nama brand kedai kopi buatanmu pada kolom publikasi di bagian bawah sidebar.",
      "Klik tombol 'Publish Karya' untuk menyimpan websitemu ke galeri Showcase.",
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
