# Technical Specification & Test Governance: KopiCode Materials Refinement & Web Slides Anti-Slop

**Document ID:** SPEC-2026-10-10-KOPICODE-MATERIALS-SLIDES-REFINE  
**Date:** 2026-10-10  
**Status:** Approved for Implementation (Ready for Plan & Execution)  
**Target Repository:** `/opt/data/html-css-course` (`kopicode-interactive-html-css`)  
**Lead Architect:** Dicky Candra Permana  
**Aesthetic Baseline:** True OLED Stark Minimalism (`#000000`, hairline border `#222222`, flat surfaces `#0A0A0A`, Geist / Space Grotesk / JetBrains Mono)  
**Pedagogy & Voice:** Authentic Indonesian Barista Craft (Project-Based Learning), 5-Layer Pedagogy, Strict Humanizer Anti-AI Slop

---

## 1. Executive Summary & Governance Approval Protocol

### 1.1 Latar Belakang & Urgensi Perubahan
Platform edukasi interaktif **KopiCode** dirancang untuk mengajarkan dasar HTML5 dan CSS3 melalui pembangunan website utuh kedai kopi fisik (*"Kedai Kopi / Resto Mini-Hub"*). Platform ini menggabungkan editor in-browser (CodeMirror 6), sandboxed live preview, dan freeCodeCamp-style test validation engine.

Meskipun sistem telah berjalan fungsional, evaluasi kualitas komprehensif menemukan dua area yang membutuhkan perbaikan mendalam:
1. **Pola Bahasa & Retorika Materi (Curriculum & Slides Copy):** Sebagian teks teori, deskripsi tugas, dan analogi masih mengandung residu pola generasi AI (formula 3 serangkai, kata klise seperti *"mari kita selami"*, *"lanskap web modern"*, *"esensial/krusial"*, dan struktur kalimat kaku) yang mengurangi autentisitas suara manusiawi dan model mental kedai kopi fisik.
2. **Desain Komponen SlideDeck & Route `/slides` (Web Presentation AI Slop):** Komponen slide deck saat ini masih menggunakan pola visual generic template AI (*tech gradients*, *unearned shadows*, *macOS-style traffic light dots*, dan *ikon Sparkles*) yang bertentangan dengan standar desain teknis minimalis portofolio (*True OLED Black* `#000000`, border hairline presisi `#222222`, dan tata letak fungsional Geist/Vercel-style).

Dokumen ini menetapkan spesifikasi teknis lengkap, tolok ukur audit *10 Tells of AI Slop*, acceptance criteria yang ketat, serta tata kelola verifikasi multi-tahap untuk refactoring materi kurikulum dan dek presentasi web KopiCode.

### 1.2 Architectural Decision Records (ADR)
* **ADR-01: Mempertahankan Format Web Slide Deck Native di Next.js App Router**
  * *Keputusan:* Format slide deck dipertahankan sebagai komponen web Next.js (`src/components/SlideDeck.tsx` dan route `src/app/slides/page.tsx`), bukan migrasi ke file PowerPoint (`.pptx`) atau file presentasi eksternal.
  * *Rasional:* Web slide deck terintegrasi langsung dengan ekosistem KopiCode, dapat diakses dari dashboard mentor (`/mentor`), memiliki mode layar penuh proyektor (`F`), navigasi keyboard native, serta mampu merender potongan kode dan tombol copy secara instan tanpa ketergantungan perangkat lunak pihak ketiga.
* **ADR-02: Transformasi Visual ke True OLED Stark Minimalism**
  * *Keputusan:* Mengeliminasi seluruh gradien latar belakang dekoratif, bayangan berat (*unearned drop-shadows*), dan ornamen jendela palsu. Mengadopsi palet `#000000` murni, permukaan kartu datar `#0A0A0A`, garis batas rambut (*hairline border*) `#222222`, serta aksen tipografis monospasial dengan warna fungsional (`#F59E0B` amber / `#10B981` emerald).
  * *Rasional:* Memaksimalkan rasio kontras pada layar proyektor kelas dan layar OLED, menghilangkan distraksi visual kecerdasan buatan, dan selaras dengan standar portofolio teknis rekayasa perangkat lunak.
* **ADR-03: Institusionalisasi In-Repo Skill `.agents/skills/kopicode-curriculum-craft`**
  * *Keputusan:* Memformalkan pedoman penulisan kurikulum menjadi skill in-repo lengkap dengan referensi rubrik anti-slop bahasa Indonesia dan matriks analogi kedai kopi.
  * *Rasional:* Mencegah regresi gaya bahasa saat penambahan modul masa depan dilakukan oleh kontributor atau agen AI lain.
* **ADR-04: Nol Regresi Terhadap Mesin Validasi dan Data Seed**
  * *Keputusan:* Seluruh ID assertion (`m0-doctype`, `m1-h1`, ..., `m7-allpassed`, total 36 test assertion) wajib dipertahankan 100% identik. Struktur dan teks kode kunci jawaban tidak boleh merusak kompatibilitas `scripts/verify-seed-assertions.mjs` maupun data seeded showcases di Neon PostgreSQL.

### 1.3 Governance Approval Matrix & Gate Pipeline
Setiap tahapan refactoring wajib melewati gerbang persetujuan verifikasi berikut sebelum digabungkan ke cabang utama (`main`):

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        GOVERNANCE APPROVAL GATES (KOPICODE)                            │
├───────────────┬──────────────────────────────────┬───────────────────┬─────────────────┤
│ Gerbang       │ Fokus Evaluasi                   │ Kriteria Kelulusan│ Penanggung Jwb  │
├───────────────┼──────────────────────────────────┼───────────────────┼─────────────────┤
│ GATE 1: SPEC  │ Kelengkapan dokumen spec, ADR,   │ Dokumen disetujui │ Dicky Candra P. │
│ & ARCHITECTURE│ arsitektur skill, & rubrik slop  │ tanpa gap desain  │ (Lead Architect)│
├───────────────┼──────────────────────────────────┼───────────────────┼─────────────────┤
│ GATE 2: CODE  │ Refactoring `curriculum.ts`,     │ Typecheck pass,   │ Frontend Team / │
│ & ASSETS      │ `slidesData.ts`, `SlideDeck.tsx` │ ESLint bersih,    │ Subagent Exec   │
│               │ dan `.agents/skills/...`         │ Zero AI tropes    │                 │
├───────────────┼──────────────────────────────────┼───────────────────┼─────────────────┤
│ GATE 3: TEST  │ Script assertions execution &    │ 36/36 tests pass, │ Test Governance │
│ VERIFICATION  │ Next.js production build check   │ `npm run build` OK│ Automated Suite │
├───────────────┼──────────────────────────────────┼───────────────────┼─────────────────┤
│ GATE 4: FINAL │ Audit visual 10 Tells of Slop &  │ Skor Slop: 0/10,  │ Stakeholder     │
│ DE-SLOP AUDIT │ review bacaan nada bicara manusia│ zero banned words │ Sign-off        │
└───────────────┴──────────────────────────────────┴───────────────────┴─────────────────┘
```

---

## 2. Technical Specification: Sub-Sistem & Cakupan Refactoring

### 2.1 Sub-Sistem A: In-Repo Skill `.agents/skills/kopicode-curriculum-craft`
In-repo skill ini berfungsi sebagai acuan baku tata kelola materi dan pencegahan AI slop di tingkat repositori lokal KopiCode.

#### 2.1.1 Struktur File Skill
```
/opt/data/html-css-course/.agents/skills/kopicode-curriculum-craft/
├── SKILL.md                                  # Dokumentasi utama dan panduan operasional agen
└── references/
    ├── anti-slop-indonesian-rubric.md        # Rubrik kata terlarang, pola retorika, & nada bicara
    └── barista-analogies-map.md              # Matriks pemetaan fisik kedai kopi untuk 8 modul
```

#### 2.1.2 Arsitektur Pedagogis 5-Lapis (5-Layer PBL Framework)
Setiap modul kurikulum dan slide presentasi wajib mengalir melalui 5 lapis pemahaman:
1. **Lapis 1 - Kebutuhan Nyata Kedai Kopi (*Real-World Need*):** Konteks bisnis fisik yang dihadapi barista/kasir yang menuntut adanya elemen web tersebut.
2. **Lapis 2 - Model Mental Kedai Kopi Fisik (*Physical Barista Analogy*):** Pengait konkret di dunia nyata sebelum siswa melihat sintaks kode (misal: `<form>` sebagai tatakan clipboard bon kasir, `<mark>` sebagai stabilo kuning menu andalan).
3. **Lapis 3 - Standar Semantik Web (*Technical Semantics*):** Sintaks W3C yang tepat dan aksesibel tanpa simplifikasi keliru.
4. **Lapis 4 - Peringatan Jebakan Pemula (*Beginner Trap*):** Kesalahan umum yang sering memicu error (misal: lupa atribut `alt`, salah hierarki heading, atau benturan margin).
5. **Lapis 5 - Tantangan Praktis & Assertion Tervalidasi (*Targeted Quest & FC-style Assertions*):** Tugas mandiri berorientasi aksi dengan umpan balik pengujian instan.

---

### 2.2 Sub-Sistem B: Refactoring 8 Modul Kurikulum (`src/lib/curriculum.ts`)
Refactoring pada `src/lib/curriculum.ts` mencakup pembaruan teks teori, analogi, deskripsi tugas, tips pendukung, dan kode contoh untuk seluruh 8 modul (Modul 00 s.d. 07), dengan tetap mengunci integritas fungsional kode starter, kunci jawaban, dan 36 fungsi assertion.

#### 2.2.1 Skema Data Modul (`ModuleData`)
```typescript
export interface StepAssertion {
  id: string;                                                    // Identifier unik stabil (contoh: "m0-doctype")
  description: string;                                           // Kalimat kriteria keberhasilan yang manusiawi
  hint: string;                                                  // Petunjuk teknis jika siswa menemui kebuntuan
  check: (html: string, css: string, doc: Document) => boolean;  // Logika evaluasi DOM / CSS
}

export interface SupportingTipItem {
  tag?: string;
  name: string;
  explanation: string;
  example?: string;
}

export interface SupportingTip {
  title: string;
  items: SupportingTipItem[];
}

export interface ModuleData {
  id: number;                          // 0 s.d. 7
  slug: string;                        // URL slug unik
  title: string;                       // Judul modul padat & lugas
  subtitle: string;                    // Subjudul berorientasi hasil karya
  badge: string;                       // Format: "MODUL 0X // NAMA BAGIAN"
  requiresCss?: boolean;               // Modul 0-4 false; Modul 5-7 true
  summary: string;                     // 1-2 kalimat ringkas tanpa AI jargon
  theory: {
    heading: string;
    concept: string;                   // Penjelasan teknis lugas
    analogy: string;                   // Analogi barista dunia nyata
    supportingTips?: SupportingTip;
    codeExample: {
      title: string;
      language: "html" | "css";
      code: string;
    };
  };
  tasks: string[];                     // Checklist langkah kerja dengan kata kerja imperatif aktif
  starterHtml: string;
  starterCss: string;
  solutionHtml: string;
  solutionCss: string;
  assertions: StepAssertion[];
}
```

#### 2.2.2 Matriks 8 Modul Kurikulum KopiCode
| Modul | Identifier & Badge | Topik & Konsep Inti | Analogi Fisik Kedai Kopi | Total Assertion |
|---|---|---|---|---|
| **Modul 00** | `anatomi-dokumen-html`<br>`MODUL 00 // FONDASI DOKUMEN` | `<!DOCTYPE>`, `<html>`, `<head>`, `<title>`, `<body>` | Sertifikat izin ruko, patok kavling ruko, papan nama atap, dan ruangan dalam kedai. | 5 tes (`m0-doctype` s.d. `m0-body-tag`) |
| **Modul 01** | `struktur-konten-banner`<br>`MODUL 01 // KONTEN & MEDIA` | `<h1>`-`<h6>`, `<p>`, `<strong>`, `<em>`, `<hr>`, `<img>` | Neon box plang nama bar, papan kapur cerita biji kopi, lis kayu pembatas, dan pigura foto meja seduh. | 5 tes (`m1-h1` s.d. `m1-img`) |
| **Modul 02** | `daftar-fasilitas-kontainer`<br>`MODUL 02 // FASILITAS & LIST` | `<ul>`, `<ol>`, `<li>`, `<div>`, `<span>`, `<a>` | Papan butir fasilitas Wi-Fi/AC, kartu 4 langkah resep seduh V60, sekat kaca partisi ruko, dan plang petunjuk jalan kasir. | 4 tes (`m2-h2` s.d. `m2-anchor`) |
| **Modul 03** | `tabel-menu-harga`<br>`MODUL 03 // DATA TABULAR` | `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`, `<mark>`, `<small>` | Papan menu kasir berkisi dua dimensi, baris kepala kolom, stempel stabilo menu andalan barista, dan catatan kaki takaran es. | 4 tes (`m3-structure` s.d. `m3-mark`) |
| **Modul 04** | `formulir-pemesanan-meja`<br>`MODUL 04 // FORMULIR RESERVASI`| `<form>`, `<input>` (text, date, radio, number), `<select>`, `<textarea>`, `<button type="submit">` | Papan clipboard bon pemesanan kasir, kolom isian tamu, pemilih tanggal kedatangan, pilihan area AC/outdoor, catatan ke barista, dan bel meja kasir (*Ting!*). | 7 tes (`m4-form` s.d. `m4-submit`) |
| **Modul 05** | `css-box-model-dasar`<br>`MODUL 05 // BOX MODEL & WARNA`| CSS Selectors, Padding, Margin, Border, `box-sizing: border-box`, `margin: 0 auto`, `linear-gradient` | Konstruksi meja kayu cafe fisik: permukaan meja (*content*), tatakan cangkir karet (*padding*), lis besi pelindung tepi (*border*), lorong jalan barista (*margin*), dan penggaris standar tukang kayu. | 5 tes (`m5-boxsizing` s.d. `m5-collapse`) |
| **Modul 06** | `flexbox-navbar-interaksi`<br>`MODUL 06 // FLEXBOX & INTERAKSI`| `display: flex`, `justify-content`, `align-items`, Pseudo-classes (`:hover`, `:active`, `:focus`), `onsubmit` | Meja bar barista sejajar satu garis lurus, reaksi sentuhan kenop pintu cafe (`:hover`), tombol kasir amblas saat dipencet (`:active`), lampu sorot meja belajar nyala saat tamu duduk (`:focus`), dan senyum barista sobek struk (`alert`). | 5 tes (`m6-flex` s.d. `m6-onsubmit`) |
| **Modul 07** | `audit-tampilan-showcase`<br>`MODUL 07 // SHOWCASE & AUDIT` | Evaluasi integrasi lengkap, responsivitas multi-device, dan publikasi showcase | Quality check barista sebelum buka pintu: lap meja seduh, kalibrasi espresso pertama, balik plang "CLOSED" jadi "OPEN", lalu sambut tamu perdana. | 1 tes gabungan (`m7-allpassed`) |

---

### 2.3 Sub-Sistem C: Web Presentation Deck (`SlideDeck.tsx`, `/slides`, `slidesData.ts`)

#### 2.3.1 Prinsip Desain True OLED Stark Minimalism
Dek presentasi web KopiCode dirombak dengan panduan teknis berikut:
* **Background Utama:** `#000000` (True OLED Black).
* **Permukaan Kartu / Kontainer:** `#0A0A0A` (Flat Dark Surface, zero blur, zero gradient).
* **Garis Batas (Borders):** `1px solid #222222` (Hairline border), dengan aksen putus-putus teknis `1px dashed #333333` pada pemisah metadata.
* **Tipografi:**
  * Judul Slide: `Space Grotesk` (tebal, tegas, *clean tracking*).
  * Penjelasan & Konsep: `Geist Sans` (keterbacaan tinggi, kontras tajam).
  * Tag, Kode, & Metadata: `JetBrains Mono` (monospace).
* **Palet Aksen Fungsional:**
  * Amber Barista: `#F59E0B` (Badge modul, penanda kode aktif, shortcut navigasi).
  * Emerald Pass: `#10B981` (Status checklist tuntas, indikator sukses salin kode).
  * Teks Utama: `#F5F5F5` (High-contrast white).
  * Teks Sekunder/Muted: `#888888` / `#666666`.
* **Zero AI Ornaments:**
  * ❌ Hapus tiga titik warna macOS window (`bg-rose-500`, `bg-amber-500`, `bg-emerald-500`). Ganti dengan indikator progres teks monospasial teknis: `[SLIDE 01/12]`.
  * ❌ Hapus ikon AI template seperti `Sparkles` pada kartu tugas. Ganti dengan ikon teknis fungsional `Terminal` atau badge label teks murni `TANTANGAN PRAKTIK`.
  * ❌ Hapus gradien `bg-gradient-to-r from-amber-950/20 via-[#16120e] to-[#111111]`. Ganti dengan panel datar `#0A0A0A` dan border hairline `#222222`.
  * ❌ Hapus `shadow-2xl` dan `shadow-lg` yang membebani komposit rendering.

#### 2.3.2 Pemetaan 12 Slide Presentasi (`src/lib/slidesData.ts`)
1. **Slide 1 (`cover-intro`):** *"Membangun Website Kedai Kopi dari Nol"* — Filosofi ruko fisik vs kerangka web semantik.
2. **Slide 2 (`roadmap-workshop`):** *"Peta Perjalanan Belajar"* — 8 langkah terstruktur dari kanvas kosong hingga website siap tayang.
3. **Slide 3 (`modul-00-fondasi-html`):** *"Struktur Dokumen HTML dari Nol"* — Anatomi `<!DOCTYPE>`, `<html>`, `<head>`, dan `<body>`.
4. **Slide 4 (`modul-01-konten-banner`):** *"Struktur Konten & Media Banner"* — Hirarki heading, teks narasi, dan media gambar kedai kopi.
5. **Slide 5 (`modul-02-list-kontainer`):** *"Daftar Fasilitas & Pengelompokan Elemen"* — List `<ul>`/`<ol>` dan pengelompokan kontainer `<div>`.
6. **Slide 6 (`modul-03-tabel-harga`):** *"Tabel Menu Minuman & Harga"* — Struktur tabel tabular kasir dan badge penanda harga.
7. **Slide 7 (`modul-04-form-reservasi`):** *"Formulir Pemesanan Meja"* — Elemen form, validasi input, dan kontrol interaksi pengunjung.
8. **Slide 8 (`modul-05-boxmodel-warna`):** *"CSS Box Model, Warna & Posisi Kontainer"* — Padding, margin, border, box-sizing, dan penataan ruang.
9. **Slide 9 (`modul-06-flexbox-interaksi`):** *"Layout Navigasi Flexbox & Efek Interaksi"* — Distribusi flexbox baris kasir dan micro-interaction state.
10. **Slide 10 (`modul-07-showcase-audit`):** *"Cek Tampilan Akhir & Simpan ke Galeri"* — Audit komprehensif dan penyajian ke etalase publik.
11. **Slide 11 (`tips-barista-developer`):** *"Mindset Barista Developer"* — Tiga prinsip kerja: perhatikan struktur sebelum polesan, jaga kebersihan kode, dan uji langsung di browser.
12. **Slide 12 (`closing-showcase`):** *"Waktunya Buka Kedai Kopi Kamu!"* — Perayaan hasil belajar dan panduan langkah berikutnya.

#### 2.3.3 Fitur Interaksi Presentasi Native
* **Navigasi Keyboard:** `ArrowRight` / `Space` / `PageDown` (Maju), `ArrowLeft` / `PageUp` (Mundur).
* **Mode Layar Penuh (F):** Mengaktifkan Fullscreen API browser native untuk kebutuhan proyektor.
* **Catatan Khusus Mentor / Speaker Notes (N):** Drawer bawah berisi alokasi waktu target, tujuan ajar, pertanyaan pemantik, dan jebakan umum pemula.
* **Grid Overview (G / O):** Tampilan matriks 12 slide untuk navigasi cepat antar sesi.
* **Copy Code Snippet:** Salin cepat potongan kode kunci ke clipboard.

---

### 2.4 Sub-Sistem D: Mesin Validasi & Integritas Data
* **Validator DOM Client-side (`src/lib/validator.ts`):** Menggunakan `DOMParser` browser untuk menguji struktur HTML peserta secara realtime dan regex CSS untuk memeriksa style rules.
* **Database & Seed Harness (`scripts/seed-showcases.mjs` & `scripts/verify-seed-assertions.mjs`):** Memuat 5 showcase kedai kopi otentik (*Kopi Klotok & Pawon Ndeso*, *Warung Kopi Tiam 'Aroma Selat'*, *KALENG & SUNYI // Micro Roastery*, *Kopi Tubruk & Toko Buku Senja*, *Kopi Tepi Sawah Langit Cerah*) yang masing-masing wajib lulus 36/36 assertion.

---

## 3. Checklist Audit: 10 Tells of AI Slop (Visual & Textual)

Sebagai instrumen evaluasi ketat, seluruh komponen antarmuka web slides dan materi kurikulum diaudit menggunakan checklist komprehensif berikut:

### 3.1 10 Tells of AI Visual Slop (Claude Design Standard)

| # | Indikator Slop (*Tell*) | Manifestasi Buruk (AI Default) | Standar Perbaikan KopiCode (True OLED Stark) |
|---|---|---|---|
| **1** | **Tech Gradient** | Gradasi ungu/biru/indigo berkilau atau gradasi amber berlebihan di latar belakang (`bg-gradient-to-r`). | **Zero gradient.** Latar belakang solid hitam OLED `#000000`, permukaan panel datar solid `#0A0A0A`. |
| **2** | **Generic Tech Hue** | Warna aksen violet/cyan sembarangan yang tidak relevan dengan identitas produk. | **Warna Brand Fungsional:** Amber sangrai `#F59E0B` (aksen hangat kopi) dan emerald `#10B981` (status lolos). |
| **3** | **Feature-Tile Grid** | Grid 3 kartu identik (ikon + heading + satu kalimat) tanpa hierarki informasi yang jelas. | **Komposisi Hirarkis Asimetris:** Blok analogi barista terpisah dari poin teknis, ukuran disesuaikan dengan bobot isi. |
| **4** | **Accent Rail** | Garis tebal berwarna di sisi kiri kartu hanya sebagai hiasan kosong tanpa makna navigasi. | **Hilangkan Accent Rail.** Gunakan garis batas rambut (*hairline border*) `1px solid #222222` merata di seluruh sisi. |
| **5** | **Unearned Blur** | Efek kaca kabur (*backdrop-blur* / *glassmorphism*) tanpa sistem kedalaman/elevasi nyata. | **Zero Blur.** Hilangkan `backdrop-blur-*`, gunakan permukaan solid dengan kontras warna tegas. |
| **6** | **Monument Stat** | Angka raksasa hampa yang memakan tempat tanpa relevansi cerita teknis. | **Metrik Proporsional:** Angka menit target dan nomor modul disajikan dalam tipografi monospasial fungsional (`text-xs font-mono`). |
| **7** | **Icon Topper** | Ikon kotak melengkung (*rounded square*) di atas setiap judul seperti template Tailwind murah. | **Tipografi Sebagai Hirarki:** Judul berbicara lewat ukuran dan ketebalan huruf (`Space Grotesk`), bukan mahkota ikon. |
| **8** | **Center Stack** | Semua elemen dipusatkan ke tengah (*text-center*) karena ketidakberanian menyusun tata letak. | **Tata Letak Rata Kiri (*Left-Aligned*):** Struktur kolom kiri (konsep & analogi) dan kolom kanan (kode & tantangan). |
| **9** | **Default Type** | Menggunakan font standar tanpa karakter (Inter/system-ui murni tanpa konfigurasi hierarki). | **Paduan Tipografi Khusus:** `Space Grotesk` (headings), `Geist Sans` (konten bacaan), `JetBrains Mono` (kode & label). |
| **10**| **Wrong Surface** | Komposisi yang tidak sesuai konteks (misal: gaya hero landing page dipaksakan ke dalam slide presentasi). | **Deck Presentasi Fungsional:** Mengoptimalkan ruang pandang proyektor 16:9, tata letak dua kolom, dan navigasi ramah panggung. |

---

### 3.2 5 Tells of AI Textual Slop (Humanizer Standard)

| # | Indikator Slop Teks | Contoh Buruk (AI Slop) | Contoh Manusiawi KopiCode (Barista Craft) |
|---|---|---|---|
| **11**| **Banned AI Clichés** | *"Mari kita selami lanskap web modern yang esensial dan krusial..."* | *"Buka file index.html. Sekarang kita pasang plang nama kedai kopimu."* |
| **12**| **Rule of Three (3 Serangkai)** | *"Website kedai kopi ini akan tampil menarik, interaktif, dan modern."* | *"Website kedai kopi ini bakal rapi di layar HP dan gampang dibaca pelanggan."* |
| **13**| **Copula Avoidance** | *"Elemen `<header>` bertindak sebagai wadah yang menaungi identitas kedai."* | *"`<header>` adalah bagian atas ruko tempat kita memasang plang kedai kopi."* |
| **14**| **Hanging Participles** | *"Beri padding 16px, memastikan tata letak proporsional dan menghadirkan kenyamanan."* | *"Beri padding 16px biar teks tidak mepet ke pinggir kotak kayu meja."* |
| **15**| **Excessive Em-Dashes (—)** | *"HTML adalah kerangka—tanpa kerangka ini—browser tidak tahu bentuknya."* | *"HTML itu kerangkanya. Tanpa kerangka, browser bingung membaca isi ruko."* |

---

### 3.3 Metodologi & Scoring Rubrik
* Setiap kemunculan satu indikator slop visual atau tekstual dihitung sebagai **1 poin slop** (skor 0 = bersih total, skor 10 = slop maksimal).
* **Baseline Audit (Kondisi Awal):** SlideDeck.tsx dan slidesData.ts lama mencatat skor **6/10** (kemunculan tech gradient, macOS dots, ikon Sparkles, unearned shadow, padding berlebih, dan beberapa frasa klise).
* **Target Post-Refactor:** Seluruh komponen dan data wajib mencatat skor **0/10** (bersih total dari 15 indikator di atas).

---

## 4. Acceptance Criteria (AC)

### 4.1 AC-01: In-Repo Skill `kopicode-curriculum-craft`
* [ ] **AC-01.1:** File `.agents/skills/kopicode-curriculum-craft/SKILL.md` tersimpan dengan frontmatter YAML valid (`name`, `description`, `version`, `metadata.hermes.tags`).
* [ ] **AC-01.2:** File referensi `.agents/skills/kopicode-curriculum-craft/references/anti-slop-indonesian-rubric.md` memuat daftar kata terlarang, pola retorika, dan panduan nada bicara barista rekan kerja.
* [ ] **AC-01.3:** File referensi `.agents/skills/kopicode-curriculum-craft/references/barista-analogies-map.md` memetakan seluruh elemen HTML & CSS dari Modul 00 hingga 07 ke analogi fisik kedai kopi nyata.
* [ ] **AC-01.4:** Panduan skill mencakup arsitektur pedagogis 5-lapis (*Real-World Need*, *Physical Barista Analogy*, *Technical Semantics*, *Beginner Trap*, *Targeted Quest & Assertions*).

### 4.2 AC-02: 8 Modul Kurikulum (`src/lib/curriculum.ts`)
* [ ] **AC-02.1:** Seluruh 8 modul (ID 0 s.d. 7) memiliki field wajib: `id`, `slug`, `title`, `subtitle`, `badge`, `summary`, `theory` (heading, concept, analogy, supportingTips, codeExample), `tasks`, `starterHtml`, `starterCss`, `solutionHtml`, `solutionCss`, `assertions`.
* [ ] **AC-02.2:** Teks `concept`, `analogy`, dan `tasks` bersih 100% dari 5 indikator textual slop (zero *"mari kita selami"*, zero rule of three kaku, zero em-dash berlebihan).
* [ ] **AC-02.3:** Analogi fisik konsisten dengan `barista-analogies-map.md` di seluruh modul.
* [ ] **AC-02.4:** 36 ID assertion tidak mengalami perubahan nama maupun urutan, menjaga kompatibilitas total dengan mesin evaluasi.
* [ ] **AC-02.5:** Setiap assertion memiliki deskripsi kriteria positif dan petunjuk (*hint*) praktis yang membimbing siswa.

### 4.3 AC-03: 12 Web Slides Data (`src/lib/slidesData.ts`)
* [ ] **AC-03.1:** Memuat tepat 12 entri slide dengan urutan ID 1 hingga 12 dan kategori yang tepat (`intro`, `html`, `css`, `review`, `outro`).
* [ ] **AC-03.2:** Setiap slide memiliki struktur lengkap: `id`, `slug`, `badge`, `title`, `subtitle`, `category`, `concept`, `analogy` (`title`, `description`, `icon`), `keyPoints`, `codeSnippet` (opsional), `studentChallenge` (opsional), dan `speakerNotes` (`targetMinutes`, `teachingGoals`, `icebreakersOrQuestions`, `commonTraps`).
* [ ] **AC-03.3:** Teks narasi analogi dan konsep terbebas dari bahasa brosur AI dan selaras dengan tema barista nusantara.
* [ ] **AC-03.4:** Potongan kode contoh pada slide akurat, valid, dan dapat disalin langsung oleh mentor saat demonstrasi kelas.

### 4.4 AC-04: Komponen Web Slide Deck & Route `/slides`
* [ ] **AC-04.1:** Komponen `src/components/SlideDeck.tsx` menerapkan estetika True OLED Black (`#000000`), border hairline `#222222`, permukaan kartu datar `#0A0A0A`, dan bebas dari `bg-gradient-*` dekoratif.
* [ ] **AC-04.2:** Mengeliminasi dekorasi jendela macOS palsu (tiga titik merah/kuning/hijau) dan ikon AI generic (`Sparkles`).
* [ ] **AC-04.3:** Navigasi keyboard (`ArrowRight`, `ArrowLeft`, `Space`, `F`, `N`, `G`, `Escape`) berfungsi tanpa cacat di desktop browser.
* [ ] **AC-04.4:** Route `src/app/slides/page.tsx` menyajikan tampilan proyektor mandiri (*standalone*) dengan latar `#000000` dan header kontrol minimalis yang terhubung ke dashboard mentor (`/mentor`) dan editor kode (`/learn`).
* [ ] **AC-04.5:** Drawer *Catatan Khusus Mentor* (`speakerNotes`) dapat dibuka/tutup dengan tombol `N` atau klik tombol, menampilkan alokasi waktu dan jebakan pemula secara rapi.

### 4.5 AC-05: Integritas Validasi & Kompatibilitas Sistem
* [ ] **AC-05.1:** File `src/lib/validator.ts` berfungsi normal mengevaluasi input kode tanpa memicu runtime error.
* [ ] **AC-05.2:** Menjalankan script `scripts/verify-seed-assertions.mjs` membuktikan seluruh 5 showcase lolos 36/36 assertion (100% kelulusan).
* [ ] **AC-05.3:** Tidak ada perubahan skema database PostgreSQL (`src/db/schema.ts`) yang dapat merusak data peserta yang telah ada.

### 4.6 AC-06: Kualitas Kode & Standar Build
* [ ] **AC-06.1:** Perintah `npx tsc --noEmit` selesai dengan exit code 0 (tanpa error tipe TypeScript sama sekali).
* [ ] **AC-06.2:** Perintah `npm run build` menyelesaikan build produksi Next.js 15 tanpa kegagalan pada tahap pengumpulan halaman statis maupun linting.

---

## 5. Tata Kelola & Rencana Pengujian Verifikasi (Verification Governance Plan)

Pengujian verifikasi dilakukan secara berjenjang untuk memastikan tidak ada kecacatan teknis maupun regresi visual/fungsional.

### 5.1 Pipeline Verifikasi 4 Tahap

```
[TAHAP 1: STATIC QUALITY GATE]
  ├── npx tsc --noEmit (Strict TypeScript Compilation)
  └── Anti-Slop Keyword & Pattern Grep Linter
            │ (Pass)
            ▼
[TAHAP 2: UNIT & ASSERTION INTEGRITY GATE]
  ├── scripts/verify-seed-assertions.mjs (5 Showcases x 36 Assertions = 180 checks)
  └── Standalone Headless Assertion Runner Check
            │ (Pass)
            ▼
[TAHAP 3: PRODUCTION BUILD GATE]
  └── npm run build (Next.js 15 App Router Optimised Production Artifact)
            │ (Pass)
            ▼
[TAHAP 4: INTERFACE & ANTI-SLOP AUDIT GATE]
  ├── Browser/Headless Route Inspection (/slides, /mentor, /learn)
  └── Slop Audit Checklist Verification (Target Score: 0/10)
```

---

### 5.2 Script Test Assertions Otomatis

#### 5.2.1 Pengujian Regresi Seed Showcase (36 Assertions)
Script verifikasi yang telah ada di `scripts/verify-seed-assertions.mjs` dijalankan dengan mocking environment variable database untuk memastikan 5 data kedai kopi seeded lulus seluruh kriteria Modul 0 s.d. 7:

```bash
DATABASE_URL="postgresql://mock:mock@localhost:5432/mock" node scripts/verify-seed-assertions.mjs
```
*Kriteria Kelulusan:*
* 5/5 Cafe lulus (`Passed 36 / 36 tests` untuk setiap cafe).
* Output akhir memuat pesan: `ALL 5 SEEDED SHOWCASES PERFECTLY PASS ALL MODULE 0 TO 7 ASSERTIONS!`.
* Exit code: 0.

---

#### 5.2.2 Script Verifikasi Anti-Slop Statis (`scripts/verify-anti-slop.mjs`)
Untuk menjaga governance penulisan di masa depan, dibuat script inspeksi statis yang secara otomatis memindai `src/lib/curriculum.ts`, `src/lib/slidesData.ts`, dan `src/components/SlideDeck.tsx` dari kemunculan kata atau pola AI slop terlarang:

```javascript
// scripts/verify-anti-slop.mjs
import fs from "fs";
import path from "path";

const BANNED_PATTERNS = [
  { pattern: /mari kita selami/i, label: "AI Cliché: 'mari kita selami'" },
  { pattern: /lanskap web modern/i, label: "AI Cliché: 'lanskap web modern'" },
  { pattern: /dalam era digital/i, label: "AI Cliché: 'dalam era digital'" },
  { pattern: /harmonis dan proporsional/i, label: "AI Cliché: 'harmonis dan proporsional'" },
  { pattern: /memberikan pengalaman tanpa batas/i, label: "AI Cliché: 'memberikan pengalaman tanpa batas'" },
  { pattern: /menyajikan solusi inovatif/i, label: "AI Cliché: 'menyajikan solusi inovatif'" },
  { pattern: /bg-gradient-to/i, fileFilter: /SlideDeck\.tsx/, label: "Visual Slop: 'bg-gradient-to' in SlideDeck" },
  { pattern: /Sparkles/i, fileFilter: /SlideDeck\.tsx/, label: "Visual Slop: 'Sparkles' icon trope in SlideDeck" },
  { pattern: /bg-rose-500\/80/i, fileFilter: /SlideDeck\.tsx/, label: "Visual Slop: fake macOS traffic dots in SlideDeck" },
];

const TARGET_FILES = [
  "src/lib/curriculum.ts",
  "src/lib/slidesData.ts",
  "src/components/SlideDeck.tsx",
];

let hasErrors = false;

console.log("🔍 Menjalankan Anti-Slop Audit Linter pada KopiCode...\n");

for (const relPath of TARGET_FILES) {
  const fullPath = path.resolve(process.cwd(), relPath);
  if (!fs.existsSync(fullPath)) {
    console.error(`❌ File tidak ditemukan: ${relPath}`);
    hasErrors = true;
    continue;
  }

  const content = fs.readFileSync(fullPath, "utf-8");
  let fileViolations = 0;

  for (const rule of BANNED_PATTERNS) {
    if (rule.fileFilter && !rule.fileFilter.test(relPath)) {
      continue;
    }

    if (rule.pattern.test(content)) {
      console.error(`  ❌ [SLOP DETECTED] di ${relPath}: ${rule.label}`);
      fileViolations++;
      hasErrors = true;
    }
  }

  if (fileViolations === 0) {
    console.log(`  ✅ ${relPath}: Bersih dari pola terlarang (Skor Slop: 0/10).`);
  }
}

if (hasErrors) {
  console.error("\n❌ Verifikasi Anti-Slop Gagal! Silakan bersihkan pola terdeteksi.");
  process.exit(1);
} else {
  console.log("\n🎉 SELURUH FILE LULUS AUDIT ANTI-SLOP DENGAN SKOR 0/10!");
  process.exit(0);
}
```

---

### 5.3 Prosedur Verifikasi Build Next.js & TypeScript
Verifikasi lingkungan produksi wajib dieksekusi dengan urutan perintah shell berikut:

```bash
# 1. Verifikasi tipe TypeScript tanpa emit berkas
npx tsc --noEmit

# 2. Verifikasi kompilasi produksi dan static page generation Next.js
npm run build

# 3. Verifikasi seed assertion regression
DATABASE_URL="postgresql://mock:mock@localhost:5432/mock" node scripts/verify-seed-assertions.mjs
```

Setiap perintah wajib mengembalikan exit code 0. Kegagalan pada salah satu tahap langsung membatalkan kelayakan rilis (*deployment gate blocked*).

---

## 6. Rencana Pelaksanaan & Mitigasi Risiko

### 6.1 Urutan Tugas Implementasi (Phased Tasks)
1. **Fase 1: In-Repo Skill & Knowledge Assets (Task 0 Alignment)**
   * Finalisasi `.agents/skills/kopicode-curriculum-craft/SKILL.md`.
   * Finalisasi `references/anti-slop-indonesian-rubric.md` dan `references/barista-analogies-map.md`.
2. **Fase 2: Refactor UI SlideDeck & Route `/slides` (Task 1 Alignment)**
   * Pembersihan ornamen slop di `src/components/SlideDeck.tsx` (hapus gradients, dots macOS, ikon Sparkles, unearned shadow).
   * Penerapan tema True OLED Black `#000000`, hairline border `#222222`, flat `#0A0A0A`.
   * Penyelarasan route `src/app/slides/page.tsx`.
3. **Fase 3: Refactor Data Kurikulum (`src/lib/curriculum.ts`)**
   * Peremajaan teks teori, analogi, deskripsi tugas, dan tips pendukung untuk Modul 00 s.d. 07.
   * Verifikasi penguncian 36 assertion ID agar tidak ada deviasi.
4. **Fase 4: Refactor Data 12 Slide (`src/lib/slidesData.ts`)**
   * Peremajaan narasi, analogi kedai kopi fisik, dan catatan mentor untuk 12 slide.
5. **Fase 5: Eksekusi Verifikasi Menyeluruh & Testing Gates**
   * Jalankan `scripts/verify-anti-slop.mjs`.
   * Jalankan `scripts/verify-seed-assertions.mjs`.
   * Jalankan `npx tsc --noEmit`.
   * Jalankan `npm run build`.

### 6.2 Matriks Risiko & Strategi Kontingensi
| Risiko Teridentifikasi | Tingkat Risiko | Dampak Potensial | Rencana Mitigasi / Rollback |
|---|---|---|---|
| Perubahan teks soal merusak asumsi kode kunci jawaban / tester | Sedang | Peserta gagal validasi meski kodenya benar | Kunci jawaban (`solutionHtml`/`solutionCss`) dan assertion regex wajib diuji silang sebelum perubahan teks difinalisasi. |
| Regresi assertion ID memutus sinkronisasi seed database | Tinggi | Test suite database fail, peserta tidak dapat lanjut modul | ID assertion dinyatakan *immutable* (tidak boleh diubah satu huruf pun). |
| Tailwind CSS v4 class collision pada styling OLED hitam | Rendah | Warna tidak sepenuhnya hitam murni (`#000000`) | Gunakan token CSS eksplisit dari `globals.css` (`--color-base: #050505` atau utility class `bg-black`, `bg-[#000000]`). |
| Bundle size Next.js membengkak akibat penambahan teks | Sangat Rendah | Waktu muat halaman bertambah | Data kurikulum dan slide berupa static TypeScript literal yang dikompilasi ke chunk terpisah oleh Next.js bundler. |

---

## 7. Sign-Off & Deklarasi Kesiapan

Dokumen spesifikasi teknis dan tata kelola pengujian ini telah disusun secara komprehensif, mencakup 10 Tells of AI Slop checklist, acceptance criteria 8 modul kurikulum dan 12 slide presentasi web, serta tata kelola pengujian build dan assertion.

*Disiapkan untuk tahap penyusunan Implementation Plan (`writing-plans`) dan eksekusi bertahap (`executing-plans` / `subagent-driven-development`).*
