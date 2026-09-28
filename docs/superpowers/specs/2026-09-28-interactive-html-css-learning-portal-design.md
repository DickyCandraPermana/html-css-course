# Design Specification: Interactive HTML & CSS Learning Portal ("KopiCode")

**Date:** 2026-09-28  
**Status:** Approved for Implementation  
**Target Platform:** Vercel + PostgreSQL  
**Design Standards:** Technical Monochrome Dark (aligned with `D:\dicky\portofolio`)

---

## 1. Executive Summary & Objective

**KopiCode** adalah web portal edukasi interaktif untuk pembelajaran materi dasar **HTML & CSS**. Platform ini menggabungkan modul materi berformat slide/artikel terstruktur dengan **in-browser live coding editor & sandboxed preview**, yang memungkinkan peserta mempraktikkan materi secara langsung tanpa perlu menginstall IDE lokal.

Di akhir alur belajar, peserta menghasilkan sebuah proyek mini-web utuh bertema **"Kedai Kopi / Resto Mini-Hub"** yang mencakup seluruh elemen esensial web:
* Struktur semantik HTML & tipografi (`<header>`, `<nav>`, `<h1>`-`<h6>`, `<p>`)
* Media gambar banner (`<img>`)
* Daftar fasilitas kedai kopi (`<ul>`, `<ol>`, `<li>`)
* Tabel menu makanan & minuman (`<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`)
* Formulir reservasi meja lengkap (`<form>`, `<input>`, `<select>`, radio buttons, checkbox, `<textarea>`, `<button>`)
* Styling modern dengan CSS Box Model & tata letak **Flexbox**
* Sentuhan interaksi mikro JavaScript sederhana (`onsubmit` alert konfirmasi)

Platform ini juga dilengkapi dengan:
1. **freeCodeCamp-Style Step Validation Engine:** Pengecekan otomatis kode peserta dengan tes assertion (DOM & CSS parser) yang harus lolos sebelum dapat melangkah ke step berikutnya.
2. **Showcase Gallery Publik:** Tempat memamerkan dan saling mengapresiasi karya peserta dengan mini-preview iframe dan like counter.
3. **Dashboard Monitoring Mentor:** Memantau progres step setiap siswa di kelas secara realtime via Admin PIN.
4. **Live Playground:** Lab eksperimen koding bebas real-time terpisah dari proyek materi.

---

## 2. Tech Stack & Architecture

### 2.1 Core Stack
* **Framework:** Next.js (App Router, React 19, TypeScript)
* **Styling & Design System:** Tailwind CSS v4 + Vanilla CSS Design Tokens (konsisten dengan portofolio)
* **Database & ORM:** PostgreSQL (Neon Serverless / Supabase) via **Prisma ORM** (`@prisma/client` + `pg` adapter)
* **Code Editor:** CodeMirror 6 / Monaco Editor lightweight (HTML & CSS mode, syntax highlighting, line numbers, auto-closing tags)
* **Code Execution:** Client-side sandboxed iframe (`sandbox="allow-scripts"`)
* **Validation Engine:** Client-side DOMParser & CSS AST/Rule Inspector (Zero backend latency)
* **Hosting:** Vercel (Edge/Serverless API routes)

### 2.2 System Architecture Diagram
```
┌──────────────────────────────────────────────────────────────────────────┐
│                             VERCEL PLATFORM                              │
│                                                                          │
│  ┌─────────────────────────────────┐   ┌──────────────────────────────┐  │
│  │       Next.js App Router        │   │     Next.js API Routes       │  │
│  │                                 │   │                              │  │
│  │  • / (Landing & Join Session)   │   │  • POST /api/participants    │  │
│  │  • /learn (Materi & Sidebar)    │──▶│  • POST /api/sync-draft      │  │
│  │  • /playground (Free Sandbox)   │   │  • POST /api/publish         │  │
│  │  • /showcase (Public Gallery)   │   │  • GET  /api/showcase        │  │
│  │  • /mentor (Admin Monitor)      │   │  • POST /api/mentor/login    │  │
│  └─────────────────────────────────┘   │  • GET  /api/mentor/students │  │
│                                        └──────────────┬───────────────┘  │
└───────────────────────────────────────────────────────┼──────────────────┘
                                                        │ Prisma ORM
                                                        ▼
                                         ┌─────────────────────────────┐
                                         │     PostgreSQL Database     │
                                         │     (Neon / Supabase)       │
                                         └─────────────────────────────┘
```

---

## 3. UI/UX Design System (Technical Dark Portfolio Standards)

Mengikuti standar visual dari `D:\dicky\portofolio`, platform mengadopsi tema **Technical Dark / Engineering Minimalist**:

### 3.1 Design Tokens
* `--color-base`: `#050505` (Deep pitch black)
* `--color-surface`: `#111111` (Container surface)
* `--color-surface-hover`: `#1A1A1A`
* `--color-text-primary`: `#F5F5F5` (High-contrast clean white)
* `--color-text-secondary`: `#888888` (Muted technical gray)
* `--color-accent`: `#FFFFFF`
* `--color-border`: `#333333` (Dipadukan dengan border dashed: `1px dashed var(--color-border)`)
* `--color-success`: `#10B981` (Checklist pass)
* `--color-error`: `#EF4444` (Checklist fail hint)

### 3.2 Typography Hierarchy
* **Headings (`h1` - `h6`):** `Space Grotesk` (geometric, modern, engineering look)
* **Body & Explanations:** `Geist Sans` (crisp readability)
* **Code, Labels, & Prompts:** `JetBrains Mono` (monospace)

### 3.3 Signature Interactions
* **`bracket-framer`:** Efek hover pada link navigasi dan tombol aksi yang memunculkan bracket siku `[` dan `]` secara dinamis.
* **Terminal Prompt Caret:** Aksen visual `_` berkedip pada header brand.
* **Technical Image / Preview Frame:** Kontainer preview dengan border dashed `1px dashed #333333` dan filter kontras yang elegan.

---

## 4. Layout & Display Modes

### 4.1 Mode 1: Default (Full Content + Collapsible Practice Sidebar)
* **Main Area (Kiri):** Membaca modul materi secara komprehensif, analogi visual, potongan kode contoh, dan navigasi `[ Prev Step ]` / `[ Next Step ]`.
* **Sidebar (Kanan):** Panel praktek yang dapat di-toggle buka/tutup dan di-resize lebarnya.
  * Tab Editor: `index.html` dan `style.css`.
  * **Test Checklist Panel:** Daftar syarat kelulusan tantangan step (freeCodeCamp style).
  * Mini Preview Iframe live.
  * Tombol `[ Cek Kode & Lanjut ▶ ]` (aktif hanya jika semua checklist terpenuhi).

### 4.2 Mode 2: Fullscreen Editor & Preview (Zen / Focus Mode)
* Peserta dapat mengklik ikon `[ ⛶ Fullscreen Editor ]` untuk membuka mode layar penuh tanpa materi.
* Tampilan split 50:50 (atau horizontal/vertical toggle) antara Code Editor dan Live Preview, memungkinkan pengalaman coding leluasa seperti desktop IDE.
* Tombol keluar `[ ✕ Exit Fullscreen ]` atau tombol `Esc`.

### 4.3 Mode 3: Fullscreen Preview (Device Inspector)
* Peserta dapat mengklik ikon `[ ⛶ Fullscreen Preview ]` pada iframe preview.
* Menampilkan hasil web dalam ukuran layar penuh dengan toolbar pengubah viewport:
  * **Desktop:** `100% width`
  * **Tablet:** `768px centered`
  * **Mobile:** `375px centered` (iPhone standard)

### 4.4 Mode 4: Live Playground (`/playground`)
* Halaman lab koding bebas real-time terpisah dari materi proyek kedai kopi.
* Fitur **Quick Tag Boilerplates** (tombol insert cepat: `[+ Form]`, `[+ Tabel]`, `[+ Flexbox Card]`, `[+ Media]`).
* State disimpan di LocalStorage independen agar tidak menimpa proyek materi utama.

---

## 5. Kurikulum Pembelajaran Step-by-Step (Kedai Kopi / Resto Mini-Hub)

| Step | Topik | Teori & Konsep | Praktek Sidebar (Hasil Proyek) |
| :--- | :--- | :--- | :--- |
| **01** | **Fondasi HTML, Format Teks & Media** | Struktur `<!DOCTYPE html>`, `<html>`, `<h1>`-`<h6>`, `<p>`, `<img>`, serta materi pendukung format teks (`<strong>`, `<b>`, `<em>`, `<i>`, `<small>`, `<mark>`, `<br>`, `<hr>`). Konsep Block vs Inline. | Struktur dokumen dasar, nama cafe (`<h1>`), tagline berpenekanan (`<strong>`/`<em>`), garis `<hr>`, dan banner foto cafe (`<img>`). |
| **02** | **Fasilitas & Layanan (Lists & Divs)** | Sintaks `<ul>`, `<ol>`, `<li>`, perbedaan wadah pembungkus `<div>` (block) vs `<span>` (inline), dan anchor link `<a>`. | Membuat container `<div id="fasilitas">`, list keunggulan cafe (`<ul>` & minimal 3 `<li>`), serta tautan navigasi `<a>`. |
| **03** | **Daftar Menu & Harga (Tables & Badges)** | Semantic table: `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`. Penggunaan badge `<mark>` (Best Seller) & `<small>`. | Menyusun tabel menu cafe terstruktur dengan 3 header kolom `<th>`, minimal 3 baris data `<tr>` dan `<td>`, serta label rekomendasi `<mark>`. |
| **04** | **Formulir Reservasi Meja (Forms & Inputs)** | Form controls: `<form>`, `<label for="...">`, `<input>` (text, date, number, radio), `<select>`, `<textarea>`, `<button type="submit">`, atribut `required` & `placeholder`. | Membangun form reservasi meja lengkap dengan pilihan area (Indoor/Outdoor), tanggal kunjungan, dropdown cabang, catatan, dan tombol kirim. |
| **05** | **CSS Box Model, Warna & Mengetengahkan Div** | Box Model (`margin`, `padding`, `border`, `border-radius`), `box-sizing: border-box`, `linear-gradient(...)`, background image, serta jurus "Mengetengahkan Div" (`margin: 0 auto; max-width: ...`). | Menata container utama terpusat, gradasi hangat cafe, box shadow kartu, sudut rounded, dan `border-collapse` tabel. |
| **06** | **Layouting Flexbox & Ragam Pseudo-Class** | `display: flex`, `justify-content`, `align-items`, `gap`, ragam pseudo-class (`:hover`, `:active`, `:focus`, `:nth-child`), dan mikro-JS `onsubmit="alert(...); return false;"`. | Merapikan navbar horizontal dengan Flexbox, input glow saat `:focus`, efek tombol tertekan `:active`/`:hover`, dan alert konfirmasi submit form. |
| **07** | **Final Polish & Showcase** | Review kode komprehensif, validasi responsivitas di Fullscreen Device Inspector (Mobile, Tablet, Desktop), input nama cafe, dan klik Publish. | Klik tombol `[ 🚀 Publish ke Showcase ]` untuk menyimpan snapshot ke PostgreSQL dan tampil di galeri publik. |

---

## 6. Step Validation Engine (freeCodeCamp-Style Tests)

Setiap langkah memiliki spesifikasi tes assertion otomatis yang diuji langsung di browser menggunakan `DOMParser` dan regex/CSS inspector. Jika kode peserta belum memenuhi syarat, indikator checklist menampilkan status merah/kuning beserta petunjuk (*hint*) perbaikan.

```
┌────────────────────────────────────────────────────────┐
│ 📋 CHECKLIST TANTANGAN STEP 03                         │
├────────────────────────────────────────────────────────┤
│  ✓ Elemen <table> harus ada dengan <thead> dan <tbody> │
│  ✓ Minimal memiliki 1 baris header <tr> dengan <th>    │
│  ✗ Minimal memiliki 3 baris menu <tr> di dalam <tbody> │
│    ↳ Petunjuk: Tambahkan <tr><td>Kopi</td><td>..</td>  │
├────────────────────────────────────────────────────────┤
│ [ ⚡ Jalankan Tes ]           [ 🔒 Next Step (Locked) ]│
└────────────────────────────────────────────────────────┘
```

### 6.1 Spesifikasi Tes Assertion per Step

#### **Step 01: Fondasi & Banner Cafe**
1. `doc.querySelector('h1') !== null && doc.querySelector('h1').textContent.trim().length > 0`
   * *Deskripsi:* "Tag `<h1>` harus ada dan memiliki teks nama cafe."
2. `doc.querySelector('p') !== null && doc.querySelector('p').textContent.trim().length > 0`
   * *Deskripsi:* "Tag `<p>` harus ada sebagai kalimat tagline/deskripsi cafe."
3. `doc.querySelector('img') !== null && doc.querySelector('img').getAttribute('src') && doc.querySelector('img').getAttribute('alt')`
   * *Deskripsi:* "Tag `<img>` harus memiliki atribut `src` dan atribut deskripsi `alt`."

#### **Step 02: Fasilitas & Daya Tarik (Lists)**
1. `doc.querySelector('ul') !== null || doc.querySelector('ol') !== null`
   * *Deskripsi:* "Terdapat elemen list (`<ul>` atau `<ol>`)."
2. `doc.querySelectorAll('li').length >= 3`
   * *Deskripsi:* "Minimal terdapat 3 item fasilitas menggunakan tag `<li>`."

#### **Step 03: Tabel Menu & Harga**
1. `doc.querySelector('table') !== null && doc.querySelector('thead') !== null && doc.querySelector('tbody') !== null`
   * *Deskripsi:* "Elemen `<table>` harus memiliki `<thead>` dan `<tbody>`."
2. `doc.querySelectorAll('thead th').length >= 2`
   * *Deskripsi:* "Terdapat minimal 2 kolom header (`<th>`) di dalam `<thead>` (misal: Menu dan Harga)."
3. `doc.querySelectorAll('tbody tr').length >= 3`
   * *Deskripsi:* "Terdapat minimal 3 baris menu (`<tr>`) di dalam `<tbody>`."

#### **Step 04: Formulir Reservasi Meja**
1. `doc.querySelector('form') !== null`
   * *Deskripsi:* "Elemen `<form>` harus dibuat untuk membungkus formulir pemesanan."
2. `doc.querySelector('input[type="text"]') !== null || doc.querySelector('input[type="email"]') !== null`
   * *Deskripsi:* "Terdapat field `<input>` untuk nama tamu atau kontak."
3. `doc.querySelectorAll('input[type="radio"]').length >= 2 || doc.querySelector('select') !== null`
   * *Deskripsi:* "Terdapat pilihan area meja via radio buttons atau dropdown `<select>`."
4. `doc.querySelector('button[type="submit"]') !== null || doc.querySelector('input[type="submit"]') !== null || doc.querySelector('form button') !== null`
   * *Deskripsi:* "Terdapat tombol submit reservasi di dalam form."

#### **Step 05: Styling CSS & Box Model**
1. `/background(-color)?\s*:/i.test(css) || /color\s*:/i.test(css)`
   * *Deskripsi:* "CSS mendefinisikan warna teks (`color`) atau warna latar (`background-color`)."
2. `/padding\s*:/i.test(css) || /margin\s*:/i.test(css)`
   * *Deskripsi:* "Menggunakan properti box model (`margin` atau `padding`) untuk memberi jarak."
3. `/border(-radius)?\s*:/i.test(css)`
   * *Deskripsi:* "Menggunakan `border` atau `border-radius` untuk mempercantik sudut elemen/tabel."

#### **Step 06: Layouting Flexbox & Interaktivitas**
1. `/display\s*:\s*flex/i.test(css)`
   * *Deskripsi:* "Menggunakan `display: flex` pada navbar atau container kartu."
2. /:hover/i.test(css)
   * *Deskripsi:* "Memiliki efek interaksi pseudo-class `:hover` pada tombol atau link."
3. `/alert\(|confirm\(|onsubmit/i.test(html) || /<script/i.test(html)`
   * *Deskripsi:* "Memiliki interaksi mikro JavaScript (misal atribut `onsubmit` konfirmasi alert)."

#### **Step 07: Final Polish & Publish**
1. Seluruh tes Step 1–6 lulus.
2. Nama brand kedai kopi peserta telah diinputkan pada kolom publikasi.
3. Tombol `[ 🚀 Publish ke Showcase ]` aktif.

> **Mentor Bypass Option:** Pada mode mentor, tersedia tombol toggle *Force Unlock Next Step* agar instruktur dapat memandu peserta yang kesulitan tanpa terblokir.

---

## 7. Database Schema (Prisma PostgreSQL)

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Participant {
  id              String     @id @default(uuid())
  name            String
  session_code    String     @default("default-workshop")
  current_step    Int        @default(1)
  completed_steps Json       @default("[]")
  html_draft      String     @default("") @db.Text
  css_draft       String     @default("") @db.Text
  created_at      DateTime   @default(now())
  updated_at      DateTime   @updatedAt
  showcases       Showcase[]

  @@index([session_code])
}

model Showcase {
  id             String      @id @default(uuid())
  participant_id String
  participant    Participant @relation(fields: [participant_id], references: [id], onDelete: Cascade)
  cafe_name      String
  html_code      String      @db.Text
  css_code       String      @db.Text
  likes_count    Int         @default(0)
  is_approved    Boolean     @default(true)
  created_at     DateTime    @default(now())
  updated_at     DateTime    @updatedAt

  @@index([participant_id])
  @@index([created_at])
}
```

---

## 8. Data Flow & Sinkronisasi Kode

1. **Auto-Save Lokal (Client):** Setiap ketikan pada CodeMirror langsung disimpan ke `localStorage` (key: `kopicode_draft_html`, `kopicode_draft_css`) secara instan (0ms delay).
2. **Debounced Cloud Sync (Server):** Setelah 1500ms tidak ada aktivitas mengetik (*debounce*), client mengirim payload `POST /api/sync-draft` ke backend Next.js untuk memperbarui kolom `html_draft` dan `css_draft` di PostgreSQL.
3. **Indikator Status:** Header menampilkan status visual:
   * `[ ☁️ Menyimpan... ]` saat sedang request
   * `[ ☁️ Tersimpan ke Cloud ]` saat sukses
   * `[ ⚠️ Disimpan Lokal ]` saat offline/gagal koneksi
4. **Publish ke Showcase:** Saat peserta mengklik `[ 🚀 Publish ke Showcase ]`, sistem menyimpan snapshot final ke tabel `Showcase` dan menampilkan notifikasi sukses beserta tautan ke `/showcase`.

---

## 9. Dashboard Showcase & Mentor Monitoring

### 9.1 Public Showcase Gallery (`/showcase`)
* Tampilan kartu grid berdesain technical monochrome dengan dashed border.
* Iframe mini-preview yang merender website cafe buatan peserta secara dinamis.
* Informasi: Nama Cafe, Nama Pembuat, Waktu Publikasi, dan tombol `[ ♥ Like ]`.
* Fitur modal `[ 🔍 Inspect Code ]` untuk melihat source code HTML dan CSS buatan peserta.

### 9.2 Mentor Monitoring Dashboard (`/mentor`)
* Dilindungi oleh `MENTOR_SECRET_PIN` (dikonfigurasi via `.env`).
* Tabel pemantauan realtime peserta:
  * Nama Peserta & Sesi Kelas
  * Progres Step (contoh: `Step 4 / 7`)
  * Waktu Aktivitas Terakhir
  * Tombol `[ Preview Web ]` dan `[ Lihat Kode ]` untuk memantau peserta yang tertinggal atau membutuhkan bantuan mentor secara langsung.

---

## 10. Security & Error Handling

* **Iframe Sandboxing:** Iframe runner menggunakan atribut `sandbox="allow-scripts"`. Atribut berbahaya seperti `allow-top-navigation`, `allow-same-origin`, dan `allow-modals` dinonaktifkan untuk mencegah akses ke cookie/token parent window atau URL redirect jahat.
* **Input Sanitization:** Nama peserta dan nama cafe divalidasi dengan batasan panjang karakter dan escape HTML untuk mencegah XSS pada tampilan dashboard/showcase.
* **Database Connection Pooling:** Menggunakan connection pooling (Neon Serverless pooler / `@prisma/adapter-pg`) untuk mencegah connection exhaustion saat banyak peserta melakukan cloud sync bersamaan di Vercel Serverless.

---

## 11. Verification & Test Plan

1. **Unit & Validation Testing:**
   * Test assertion rule engine untuk tiap Step 1-7 dengan variasi kode valid dan invalid.
   * Test rendering modul materi (Step 1 sampai 7).
   * Test sinkronisasi debounced save ke database.
2. **Integration Testing:**
   * Alur pendaftaran peserta tanpa login (cukup nama) -> validasi step 1-6 -> publish showcase di step 7.
   * Alur login mentor via PIN -> membuka tabel peserta dan melihat kode peserta.
   * Alur playground independen tanpa mengubah draft materi.
   * Uji responsive preview (Desktop, Tablet, Mobile) dan mode Fullscreen Zen.
