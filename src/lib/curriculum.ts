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
    subtitle: "Bangun Kerangka Ruko Kedai Kopi Pertamamu dari Lembar Kosong",
    badge: "MODUL 00 // FONDASI RUKO KEDAI",
    requiresCss: false,
    summary:
      "Pahami cara browser membaca pasangan tag HTML, lalu bangun sendiri kerangka ruko kedai kopi pertamamu tanpa bantuan template.",
    theory: {
      heading: "Tag HTML & 4 Pilar Utama Dokumen Web",
      analogy:
        "Mendirikan website kedai kopi itu persis seperti membangun ruko fisik: <!DOCTYPE html> adalah surat izin resmi bahwa bangunan ini berstandar modern, <html> adalah batas tapak tanah kavling kedai, <head> adalah papan plang di atap ruko luar yang dibaca orang dari jalan, dan <body> adalah ruangan dalam ruko tempat barista menyeduh, meja kasir melayani, dan tamu menikmati kopi.",
      concept:
        "Browser mengenali elemen halaman lewat pasangan tag pembuka dan penutup (<tag> dan </tag>). Setiap dokumen web standar wajib memiliki empat bagian utama: deklarasi <!DOCTYPE html> di baris pertama, pembungkus kavling <html lang=\"id\">, ruang metadata <head> untuk judul tab, dan ruang visual <body> untuk semua hal yang tampil di layar.",
      supportingTips: {
        title: "4 Pilar Wajib Dokumen HTML",
        items: [
          {
            tag: "<!DOCTYPE html>",
            name: "Surat Izin Standar HTML5",
            explanation:
              "Wajib di baris paling atas agar browser merender halaman dengan standar web modern tanpa mode kompatibilitas usang.",
            example: "<!DOCTYPE html>",
          },
          {
            tag: '<html lang="id">',
            name: "Kavling Utama (Root)",
            explanation:
              "Membungkus seluruh bangunan web. Atribut lang='id' memberitahu browser bahwa kedai ini melayani pengunjung berbahasa Indonesia.",
            example: '<html lang="id">...</html>',
          },
          {
            tag: "<head>",
            name: "Papan Informasi Atap (Metadata)",
            explanation:
              "Wadah informasi teknis dan judul tab browser (<title>) yang dibaca orang dari luar sebelum melangkah masuk.",
            example: "<head><title>Nama Web</title></head>",
          },
          {
            tag: "<body>",
            name: "Ruang Dalam Kedai (Konten Visual)",
            explanation:
              "Wadah utama tempat semua teks plang, pigura foto, daftar menu, dan meja kasir diletakkan.",
            example: "<body><h1>Halo Dunia</h1></body>",
          },
        ],
      },
      codeExample: {
        title: "Kerangka Standar Ruko Kedai Kopi",
        language: "html",
        code: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Kedai Kopi Sudut Temu</title>
</head>
<body>
  <h1>Kedai Kopi Sudut Temu</h1>
  <p>Selamat datang di kedai kopi seduh manual pertama kami.</p>
</body>
</html>`,
      },
    },
    tasks: [
      "Ketik deklarasi <!DOCTYPE html> di baris paling atas tab index.html.",
      'Buka tag <html lang="id"> dan pastikan ditutup dengan </html> di baris paling bawah.',
      "Di dalam tag <html>, buat blok informasi <head>...</head>.",
      "Di dalam <head>, pasang tag <title> berisi nama kedai kopimu.",
      "Di bawah tag </head>, buka blok <body>...</body> lalu isi dengan minimal satu baris sapaan atau nama cafe.",
    ],
    starterHtml: `<!-- Tulis struktur dokumen HTML lengkap dari nol di bawah sini -->\n`,
    starterCss: `/* CSS belum diperlukan pada modul ini */\n`,
    solutionHtml: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Kedai Kopi Sudut Temu</title>
</head>
<body>
  <h1>Kedai Kopi Sudut Temu</h1>
  <p>Selamat datang di kedai kopi seduh manual pertama kami.</p>
</body>
</html>`,
    solutionCss: ``,
    assertions: [
      {
        id: "m0-doctype",
        description: "Deklarasi <!DOCTYPE html> terpasang di baris pertama.",
        hint: "Tulis <!DOCTYPE html> di baris paling atas dokumen.",
        check: (html: string) => /<!DOCTYPE\s+html>/i.test(html),
      },
      {
        id: "m0-html-tag",
        description: 'Tag <html> pembungkus tersedia dan memiliki atribut lang (contoh: lang="id").',
        hint: 'Tulis <html lang="id"> di awal dan </html> di akhir dokumen.',
        check: (html: string, _css: string, doc: Document) =>
          Boolean(
            (doc.querySelector("html") && doc.querySelector("html")?.hasAttribute("lang")) ||
              /<html\s+[^>]*lang=/i.test(html)
          ),
      },
      {
        id: "m0-head-tag",
        description: "Tag <head> terpasang di dalam <html>.",
        hint: "Bungkus informasi dokumen di dalam <head>...</head>.",
        check: (html: string) => /<head[\s>]/i.test(html) && /<\/head>/i.test(html),
      },
      {
        id: "m0-title-tag",
        description: "Tag <title> terpasang di dalam <head> dan memiliki teks nama cafe.",
        hint: "Tambahkan <title>Kedai Kopi Sudut Temu</title> di dalam tag <head>.",
        check: (_html: string, _css: string, doc: Document) =>
          Boolean(doc.title && doc.title.trim().length > 0),
      },
      {
        id: "m0-body-tag",
        description: "Tag <body> terpasang di dalam <html> dan berisi teks selamat datang atau judul.",
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
    title: "Fasad Kedai Kopi & Foto Suasana",
    subtitle: "Pasang Plang Neon Box, Cerita Seduhan, dan Banner Meja Barista",
    badge: "MODUL 01 // FASAD & MEDIA",
    requiresCss: false,
    summary:
      "Mulai isi ruang kedai dengan konten nyata: plang nama utama (h1), papan kapur cerita (p), penekanan kata (strong, em), lis kayu pembatas (hr), dan foto meja seduh (img).",
    theory: {
      heading: "Menata Fasad Depan: Judul, Paragraf & Foto",
      analogy:
        "Berdiri di depan pintu kedai kopi: <h1> adalah plang neon box nama brand yang menyala terang di atas pintu. <p> adalah papan kapur di samping pintu yang menceritakan racikan biji kopi andalan, lengkap dengan spidol tebal (<strong>) untuk jam buka dan tulisan miring barista (<em>) untuk metode seduhan. Lis kayu pembatas (<hr>) memisahkan area plang dengan etalase, dan <img> adalah pigura foto besar suasana meja seduh di dalam.",
      concept:
        "Browser membaca elemen di dalam <body> secara berurutan dari atas ke bawah. Tag <h1> punya hierarki tertinggi untuk nama kedai. Paragraf <p> menampung kalimat cerita. Tag inline seperti <strong> dan <em> memberi penekanan makna pada kata tertentu tanpa memutus alur kalimat. Tag <hr> memberi garis jeda visual, sementara tag <img> memanggil file foto lewat atribut src dan menyediakan teks alternatif lewat atribut alt jika foto gagal dimuat.",
      supportingTips: {
        title: "Penekanan Teks & Lis Pembatas",
        items: [
          {
            tag: "<strong>",
            name: "Spidol Tebal (Penting)",
            explanation:
              "Menandai informasi penting seperti jam operasional kedai agar terbaca jelas oleh mata maupun screen reader.",
            example: "<strong>Buka jam 08.00 pagi</strong>",
          },
          {
            tag: "<em>",
            name: "Tulisan Miring (Intonasi)",
            explanation:
              "Menandai nama varietas biji kopi atau istilah seduhan dengan intonasi khusus.",
            example: "<em>single origin Ciwidey</em>",
          },
          {
            tag: "<hr>",
            name: "Lis Kayu Pembatas",
            explanation:
              "Tag mandiri tanpa penutup untuk memberi garis jeda visual antar bagian etalase.",
            example: "<hr>",
          },
          {
            tag: "<br>",
            name: "Ganti Baris Seduhan",
            explanation: "Menurunkan teks satu baris ke bawah tanpa membuat blok paragraf baru.",
            example: "Kopi Susu<br>Gula Aren",
          },
        ],
      },
      codeExample: {
        title: "Contoh Fasad Kedai Kopi dengan Foto",
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
      "Tulis nama kedai kopimu memakai tag <h1>.",
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
        description: "Tag <h1> terpasang dan memuat nama kedai kopi.",
        hint: "Tambahkan tag <h1>Kedai Kopi Sudut Temu</h1> di dalam <body>.",
        check: (_html, _css, doc) => {
          const h1 = doc.querySelector("h1");
          return !!(h1 && h1.textContent && h1.textContent.trim().length > 0);
        },
      },
      {
        id: "m1-p",
        description: "Tag <p> terpasang sebagai kalimat cerita atau deskripsi kedai kopi.",
        hint: "Tambahkan tag <p>Tempat ngopi santai...</p> di bawah judul utama.",
        check: (_html, _css, doc) => {
          const p = doc.querySelector("p");
          return !!(p && p.textContent && p.textContent.trim().length > 0);
        },
      },
      {
        id: "m1-format",
        description: "Gunakan tag <strong> atau <em> untuk memberi penekanan pada kata.",
        hint: "Bungkus salah satu kata penting dengan <strong> atau <em>.",
        check: (_html, _css, doc) => {
          return !!(doc.querySelector("strong") || doc.querySelector("em") || doc.querySelector("b") || doc.querySelector("i"));
        },
      },
      {
        id: "m1-hr",
        description: "Garis pembatas horizontal <hr> terpasang.",
        hint: "Tambahkan tag <hr> setelah paragraf deskripsi.",
        check: (_html, _css, doc) => {
          return !!doc.querySelector("hr");
        },
      },
      {
        id: "m1-img",
        description: "Tag <img> memiliki atribut src dan alt.",
        hint: 'Gunakan <img src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800" alt="Suasana Meja Kayu dan Mesin Kopi Sudut Temu">.',
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
    title: "Daftar Fasilitas & Sekat Ruangan",
    subtitle: "Kelompokkan Poin Fasilitas Pakai <ul>, <li>, dan Sekat Partisi <div>",
    badge: "MODUL 02 // DAFTAR & SEKAT KEDAI",
    requiresCss: false,
    summary:
      "Kelompokkan info kenyamanan kedai ke dalam daftar butir (ul, li), pahami bedanya dengan urutan resep seduh (ol), dan gunakan sekat div untuk mengelompokkan area ruko.",
    theory: {
      heading: "Daftar Poin & Sekat Pengelompokan Ruang",
      analogy:
        "Di kedai kopi ada dua macam daftar: fasilitas dan resep seduh. Fasilitas kedai (Wi-Fi, colokan, area merokok) cocok memakai <ul> (Unordered List) karena urutannya bebas dibolak-balik tanpa mengubah arti. Sebaliknya, 4 langkah seduh resep V60 barista wajib memakai <ol> (Ordered List) karena urutan nomor 1 sampai 4 pantang tertukar kalau tidak ingin seduhan kopinya gagal. Tiap butirnya dicatat dalam <li>. Agar seluruh fasilitas ini tidak berserakan dan terpisah rapi dari meja kasir, kita bungkus di dalam sekat partisi <div>.",
      concept:
        "<ul> menampilkan butir poin tanpa nomor, sedangkan <ol> menampilkan deretan angka berurutan. Setiap butir daftar selalu dibungkus tag <li>. Elemen <div> bertindak sebagai sekat kontainer netral bertipe block untuk mengelompokkan beberapa elemen menjadi satu area tersendiri. Tautan <a> dengan atribut href bertindak sebagai papan petunjuk arah agar pengunjung bisa melompat ke bagian lain halaman.",
      supportingTips: {
        title: "Sekat Ruang & Penunjuk Jalan",
        items: [
          {
            tag: "<div>",
            name: "Sekat Partisi Ruang (Block)",
            explanation: "Membungkus sekelompok elemen agar menjadi satu seksi ruangan tersendiri yang mudah diatur posisinya.",
            example: '<div id="fasilitas">...</div>',
          },
          {
            tag: "<span>",
            name: "Stempel Teks (Inline)",
            explanation: "Membungkus kata kecil di tengah kalimat tanpa memutus baris teks.",
            example: '<span class="status">Buka</span>',
          },
          {
            tag: "<a>",
            name: "Papan Petunjuk Jalan (Anchor)",
            explanation: "Tautan navigasi untuk melompat ke seksi lain di halaman yang sama (#menu) atau situs luar.",
            example: '<a href="#menu">Lihat Daftar Menu</a>',
          },
        ],
      },
      codeExample: {
        title: "Contoh Seksi Fasilitas & Tautan Menu",
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
      'Buat sekat partisi <div id="fasilitas"> di bawah banner foto cafe.',
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
        description: "Tag <h2> terpasang sebagai judul seksi fasilitas.",
        hint: "Tambahkan <h2>Fasilitas & Layanan Kami</h2>.",
        check: (_html, _css, doc) => !!doc.querySelector("h2"),
      },
      {
        id: "m2-list",
        description: "Tersedia elemen list (<ul> atau <ol>).",
        hint: "Bungkus butir fasilitas dengan tag <ul>.",
        check: (_html, _css, doc) => !!(doc.querySelector("ul") || doc.querySelector("ol")),
      },
      {
        id: "m2-items",
        description: "Tersedia minimal 3 butir fasilitas memakai tag <li>.",
        hint: "Tambahkan minimal 3 tag <li> di dalam <ul>.",
        check: (_html, _css, doc) => doc.querySelectorAll("li").length >= 3,
      },
      {
        id: "m2-anchor",
        description: "Tersedia elemen tautan <a> dengan atribut href.",
        hint: 'Tambahkan tautan navigasi seperti <a href="#menu">Lihat Daftar Menu</a>.',
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
    title: "Papan Menu & Tabel Harga Meja Kasir",
    subtitle: "Tata Daftar Minuman Presisi Pakai <table>, <thead>, dan <tbody>",
    badge: "MODUL 03 // PAPAN MENU KASIR",
    requiresCss: false,
    summary:
      "Susun daftar minuman dan harga ke dalam format tabel semantik, lengkapi dengan bilah kepala kolom, dan tandai minuman andalan barista memakai tag mark.",
    theory: {
      heading: "Papan Tabel Dua Dimensi Meja Kasir",
      analogy:
        "Papan menu di atas meja kasir wajib punya kisi-kisi yang tegas agar barista dan pelanggan tidak salah hitung harga. <table> adalah papan kisi utamanya. <thead> adalah bilah kayu penunjuk kepala kolom (Kategori, Minuman, Harga). <tbody> adalah deretan kartu menu harian (<tr>) yang masing-masing punya kotak nama dan harga (<td>). Minuman racikan barista yang paling laris kita beri stabilo kuning memakai <mark> agar langsung menarik perhatian mata pelanggan.",
      concept:
        "Elemen <table> menata data dalam struktur baris dan kolom dua dimensi. Kepala tabel dibungkus di dalam <thead> dengan sel judul <th> yang otomatis tercetak tebal dan berada di tengah. Isi data menu ditampung di dalam <tbody> yang tersusun atas baris-baris <tr> dan sel data <td>. Tag <mark> memberi aksen stabilo kuning untuk menu andalan (signature), sedangkan <small> cocok untuk catatan takaran porsi atau keterangan pajak.",
      supportingTips: {
        title: "Aksen Stabilo & Catatan Porsi",
        items: [
          {
            tag: "<mark>",
            name: "Stabilo Menu Andalan",
            explanation: "Menandai minuman signature racikan barista agar langsung dilirik pengunjung: <mark>Favorit</mark>.",
            example: "V60 Aceh Gayo <mark>Favorit</mark>",
          },
          {
            tag: "<small>",
            name: "Catatan Porsi / Pajang",
            explanation: "Catatan kecil di samping nama atau harga: <small>(Porsi 250ml)</small>.",
            example: "<small>(Panas / Dingin)</small>",
          },
        ],
      },
      codeExample: {
        title: "Contoh Tabel Menu Meja Kasir",
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
      },
    },
    tasks: [
      'Buat sekat pembungkus <div id="menu"> di bawah seksi fasilitas.',
      'Buat judul seksi <h2> bertuliskan "Daftar Menu Favorit".',
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
        description: "Elemen <table> memiliki blok <thead> dan <tbody>.",
        hint: "Pastikan tabel dibungkus dengan <table><thead>..</thead><tbody>..</tbody></table>.",
        check: (_html, _css, doc) => {
          const table = doc.querySelector("table");
          return !!(table && doc.querySelector("table thead") && doc.querySelector("table tbody"));
        },
      },
      {
        id: "m3-headers",
        description: "Tersedia minimal 3 kolom kepala <th> di dalam <thead>.",
        hint: "Tambahkan 3 kolom <th> di baris <tr> dalam <thead> (Kategori, Menu, Harga).",
        check: (_html, _css, doc) => doc.querySelectorAll("thead th").length >= 3,
      },
      {
        id: "m3-rows",
        description: "Tersedia minimal 3 baris menu <tr> di dalam <tbody>.",
        hint: "Tambahkan minimal 3 baris <tr> di dalam <tbody>.",
        check: (_html, _css, doc) => doc.querySelectorAll("tbody tr").length >= 3,
      },
      {
        id: "m3-mark",
        description: "Gunakan tag <mark> untuk menandai salah satu menu rekomendasi barista.",
        hint: "Bungkus label seperti <mark>Favorit</mark> pada salah satu sel <td>.",
        check: (_html, _css, doc) => !!doc.querySelector("table mark"),
      },
    ],
  },
  {
    id: 4,
    slug: "form-reservasi-meja",
    title: "Formulir Bon Reservasi Meja",
    subtitle: "Rakit Form Interaktif: Nama Tamu, Tanggal, Pilihan Area, & Tombol Pesan",
    badge: "MODUL 04 // BON RESERVASI",
    requiresCss: false,
    summary:
      "Bangun formulir pemesanan meja interaktif: clipboard pembungkus (form), kolom isian tamu (input text, date, number), pilihan area duduk (radio), opsi cabang (select), catatan barista (textarea), dan tombol kirim.",
    theory: {
      heading: "Formulir Pemesanan Tamu & Validasi Input",
      analogy:
        "Ketika pelanggan ingin memesan meja untuk kumpul sore, barista menyodorkan papan bon reservasi (<form>). Di atas kertas bon itu ada kotak isian nama (<input type=\"text\">), kalender meja untuk memilih hari booking (type=\"date\"), kotak hitung kursi (type=\"number\"), sakelar pilihan area duduk indoor AC atau outdoor senja (type=\"radio\"), buku katalog pilihan cabang kedai (<select>), serta kolom catatan lapang (<textarea>) untuk pesan khusus. Begitu selesai diisi, pelanggan menekan tombol bel kasir (<button type=\"submit\">) untuk menyerahkan pesanan.",
      concept:
        "Tag <form> mengikat semua kontrol input menjadi satu paket data siap kirim. Label <label for=\"id\"> wajib dihubungkan ke atribut id pada input agar kolom mudah diklik dan ramah pembaca layar (screen reader). Atribut name yang sama pada radio button memastikan pelanggan hanya bisa memilih satu opsi area duduk. Atribut required mencegah form dikirim dalam keadaan kosong dengan validasi langsung dari browser.",
      supportingTips: {
        title: "Atribut Kunci Kontrol Form",
        items: [
          {
            tag: 'name="..."',
            name: "Kunci Identitas Data",
            explanation:
              "Wajib seragam untuk kelompok tombol radio agar pilihan bersifat eksklusif (hanya satu area yang bisa dipilih).",
            example: 'name="area"',
          },
          {
            tag: "required",
            name: "Validasi Wajib Isi",
            explanation:
              "Browser otomatis menolak pengiriman formulir jika kolom ini masih dibiarkan kosong.",
            example: "required",
          },
          {
            tag: 'placeholder="..."',
            name: "Panduan Isian Samar",
            explanation: "Teks abu-abu di dalam kolom sebagai contoh format penulisan sebelum tamu mengetik.",
            example: 'placeholder="Tulis nama Anda"',
          },
        ],
      },
      codeExample: {
        title: "Contoh Bon Reservasi Meja Cafe",
        language: "html",
        code: `<div id="reservasi">
  <h2>Reservasi Meja Cafe</h2>
  <form id="form-reservasi">
    <div>
      <label for="nama">Nama Lengkap:</label>
      <input type="text" id="nama" name="nama" placeholder="Tulis nama Anda" required>
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
      'Buat sekat pembungkus <div id="reservasi"> di bawah tabel menu.',
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
        description: "Elemen <form> terpasang membungkus seluruh kolom reservasi.",
        hint: "Bungkus seluruh field input di dalam tag <form>..</form>.",
        check: (_html, _css, doc) => !!doc.querySelector("form"),
      },
      {
        id: "m4-text",
        description: "Tersedia input teks nama tamu dengan atribut required.",
        hint: 'Gunakan <input type="text" name="nama" required>.',
        check: (_html, _css, doc) => {
          const inp = doc.querySelector('input[type="text"]');
          return !!(inp && inp.hasAttribute("required"));
        },
      },
      {
        id: "m4-date",
        description: "Tersedia input pemilih tanggal kunjungan (type='date').",
        hint: 'Gunakan <input type="date" name="tanggal" required>.',
        check: (_html, _css, doc) => !!doc.querySelector('input[type="date"]'),
      },
      {
        id: "m4-radio",
        description: "Tersedia minimal 2 radio button untuk pemilihan area meja.",
        hint: 'Gunakan <input type="radio" name="area" value="indoor">.',
        check: (_html, _css, doc) => doc.querySelectorAll('input[type="radio"]').length >= 2,
      },
      {
        id: "m4-select",
        description: "Tersedia dropdown <select> dengan minimal 2 <option> cabang.",
        hint: "Gunakan <select><option>Cabang Pusat</option><option>Cabang Timur</option></select>.",
        check: (_html, _css, doc) => {
          const select = doc.querySelector("select");
          return !!(select && select.querySelectorAll("option").length >= 2);
        },
      },
      {
        id: "m4-textarea",
        description: "Tersedia input <textarea> untuk catatan reservasi.",
        hint: 'Tambahkan tag <textarea name="catatan"></textarea>.',
        check: (_html, _css, doc) => !!doc.querySelector("textarea"),
      },
      {
        id: "m4-submit",
        description: "Tersedia tombol submit untuk mengirim formulir pesanan meja.",
        hint: 'Gunakan <button type="submit">Pesan Meja Sekarang</button>.',
        check: (_html, _css, doc) => {
          return !!(doc.querySelector('button[type="submit"]') || doc.querySelector("form button"));
        },
      },
    ],
  },
  {
    id: 5,
    slug: "css-box-model-gradient",
    title: "Box Model Meja Cafe, Cat Dinding & Posisi Kontainer",
    subtitle: "Kuasai Margin, Padding, border-box, dan Trik margin: 0 auto",
    badge: "MODUL 05 // BOX MODEL & WARNA",
    requiresCss: true,
    summary:
      "Pahami Box Model meja cafe (margin, padding, border), pentingnya reset box-sizing: border-box agar meja tidak membengkak, sapuan gradasi warna dinding, dan penempatan kontainer tepat di tengah ruko.",
    theory: {
      heading: "Box Model Meja Cafe & Tata Warna Ruang",
      analogy:
        "Setiap elemen di halaman web diperlakukan browser sebagai meja cafe persegi (Box Model). Permukaan kayu tempat cangkir ditaruh adalah content. Tatakan karet empuk di bawah cangkir adalah padding. Lis kayu pelindung di pinggir meja adalah border. Ruang lorong jalan barista antar meja agar tidak menyenggol kursi tetangga adalah margin. Tanpa aturan box-sizing: border-box, setiap kali kamu menambah lis kayu atau bantalan, ukuran total meja bakal membengkak dan menabrak jalan barista! Terakhir, trik margin: 0 auto menempatkan meja display utama persis di tengah-tengah ruko.",
      concept:
        "CSS Box Model mengatur kalkulasi dimensi setiap elemen dari lapisan terdalam (konten), bantalan dalam (padding), garis batas (border), hingga jarak luar (margin). Reset universal * { box-sizing: border-box; } memastikan nilai width sudah mencakup padding dan border sehingga ukuran kontainer tidak melar. Properti max-width dipadu dengan margin: 0 auto adalah cara standar untuk menjaga kontainer tetap berada di tengah layar monitor maupun laptop.",
      supportingTips: {
        title: "Box Model & Posisi Kontainer",
        items: [
          {
            name: "box-sizing: border-box",
            explanation: "Reset penggaris standar agar bantalan padding dan lis border tidak menambah ukuran total kotak elemen.",
            example: "* { box-sizing: border-box; }",
          },
          {
            name: "margin: 0 auto",
            explanation:
              "Menempatkan elemen block persis di tengah layar secara otomatis jika dipadukan dengan max-width.",
            example: ".main-container { max-width: 820px; margin: 0 auto; }",
          },
          {
            name: "linear-gradient(...)",
            explanation: "Sapuan gradasi halus dua warna untuk memberi nuansa hangat dinding semen ekspos atau header kedai.",
            example: "background: linear-gradient(135deg, #292524, #1c1917);",
          },
          {
            name: "border-collapse: collapse",
            explanation: "Merapatkan garis ganda antar sel tabel menu menjadi satu garis tipis yang tegas dan rapi.",
            example: "table { border-collapse: collapse; }",
          },
        ],
      },
      codeExample: {
        title: "Aturan Box Model & Tata Warna Kedai",
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
        hint: "Atur body { background-color: #0c0a09; color: #f5f5f4; }.",
        check: (_html, css) => /color\s*:/i.test(css) && /background(-color)?\s*:/i.test(css),
      },
      {
        id: "m5-centering",
        description: "Gunakan margin: 0 auto untuk mengetengahkan kontainer utama kedai kopi.",
        hint: "Gunakan margin: 0 auto; max-width: 820px; pada kelas kontainer.",
        check: (_html, css) => /margin\s*:\s*0\s+auto/i.test(css) || /margin-left\s*:\s*auto/i.test(css) || /display\s*:\s*flex/i.test(css),
      },
      {
        id: "m5-gradient",
        description: "Terapkan efek latar gradasi linear-gradient(...) pada header.",
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
    title: "Tata Letak Bar Barista Flexbox & Respons Interaksi",
    subtitle: "Sejajarkan Bar Navbar Pakai Flexbox dan Pasang Efek Sentuh :hover & :focus",
    badge: "MODUL 06 // FLEXBOX & RESPON FISIK",
    requiresCss: true,
    summary:
      "Gunakan Flexbox untuk menyejajarkan logo dan tautan menu di meja bar, pasang respons sentuhan kursor (:hover) serta kolom input aktif (:focus), dan siapkan pesan konfirmasi pesanan meja.",
    theory: {
      heading: "Tata Letak Sejajar Bar Barista & Respon Fisik",
      analogy:
        "Meja bar kasir barista selalu tertata rapi dalam satu garis lurus: mesin kasir di sudut kiri dan etalase roti di sudut kanan, dengan ruang lega di tengahnya. Di CSS, kita membuat bar sejajar ini memakai display: flex dan justify-content: space-between. Elemen web juga punya respons fisik seperti perabotan kedai: saat tangan pengunjung mendekati tombol, warnanya menyala (:hover). Saat tombol ditekan ke bawah, posisinya sedikit amblas (:active). Saat kolom formulir mulai diketik, garis tepinya berpijar terang (:focus). Begitu tombol reservasi ditekan, barista mengangguk ramah lewat jendela konfirmasi onsubmit.",
      concept:
        "display: flex mengubah kontainer menjadi fleksibel dalam satu sumbu. Properti justify-content: space-between menyebarkan elemen anak ke ujung kiri dan kanan, sementara align-items: center menyamakan posisi vertikalnya di garis tengah. Pseudo-class (:hover, :active, :focus) memberi tanda visual langsung ke pengunjung bahwa elemen siap menerima interaksi, dan atribut onsubmit pada form menangani respon pengiriman data.",
      supportingTips: {
        title: "Pseudo-Class Interaksi Fisik",
        items: [
          {
            tag: ":hover",
            name: "Kursor Mendekat",
            explanation: "Mengubah warna tombol atau tautan navigasi saat didekati mouse pengunjung.",
            example: "button:hover { background-color: #f59e0b; }",
          },
          {
            tag: ":active",
            name: "Tombol Ditekan",
            explanation: "Memberi efek tombol sedikit turun ke bawah saat diklik dengan jari.",
            example: "button:active { transform: translateY(0); }",
          },
          {
            tag: ":focus",
            name: "Kolom Aktif Mengetik",
            explanation: "Menyalakan garis tepi tegas saat pengunjung sedang mengisi isian formulir.",
            example: "input:focus { outline: 2px solid #f59e0b; }",
          },
        ],
      },
      codeExample: {
        title: "Contoh Navbar Flexbox & Respons Tombol",
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
        description: "Formulir memiliki interaksi mikro onsubmit dengan pesan konfirmasi.",
        hint: 'Tambahkan onsubmit="alert(\'Reservasi terkirim!\'); return false;" pada tag <form>.',
        check: (html) => /onsubmit\s*=/i.test(html) || /alert\(/i.test(html),
      },
    ],
  },
  {
    id: 7,
    slug: "final-polish-showcase",
    title: "Kalibrasi Akhir & Buka Pintu Kedai Kopi",
    subtitle: "Inspeksi Kerapian di Layar Penuh dan Pajang Karyamu di Galeri Showcase",
    badge: "MODUL 07 // GRAND OPENING",
    requiresCss: true,
    summary:
      "Lakukan inspeksi menyeluruh pada website kedai kopi buatanmu, uji tampilannya di mode layar penuh, dan resmikan publikasi karyamu ke galeri Showcase publik.",
    theory: {
      heading: "Inspeksi Kerapian & Peresmian Karya",
      analogy:
        "Sebelum membuka tirai ruko dan membalik plang dari 'CLOSED' menjadi 'OPEN', barista selalu melakukan inspeksi terakhir: mengelap meja bar, menyalakan lampu gantung, dan mencicipi seduhan espresso pertama untuk kalibrasi rasa. Di modul penutup ini, kamu memeriksa seluruh hasil kodemu dari Modul 00 sampai 06, memastikan tampilan rapi di layar monitor maupun ponsel, lalu meresmikan nama kedai kopimu dan memajang karyamu di galeri Showcase publik.",
      concept:
        "Tahap kalibrasi ini menguji keutuhan dokumen: apakah header, daftar fasilitas, tabel menu, dan form reservasi sudah menyatu rapi dengan styling CSS. Setelah semua checklist pengujian lolos, kamu memasukkan nama brand kedai kopi pilihanmu dan menekan tombol 'Publish Karya' untuk menyimpan website ke database agar bisa dinikmati dan diapresiasi oleh pengunjung lain.",
      supportingTips: {
        title: "Checklist Kesiapan Grand Opening",
        items: [
          {
            name: "Kelengkapan Struktur HTML",
            explanation: "Fasad nama ruko, daftar fasilitas, tabel menu kasir, dan bon reservasi terpasang utuh.",
            example: "<header>, <ul>, <table>, <form>",
          },
          {
            name: "Kerapian Tata Letak CSS",
            explanation: "Navigasi bar sejajar, warna kontras nyaman di mata, dan kontainer meja berada tepat di tengah layar.",
            example: "display: flex; margin: 0 auto;",
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
