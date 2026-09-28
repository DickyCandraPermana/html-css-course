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

Platform ini juga dilengkapi dengan **Showcase Gallery** publik untuk memamerkan karya peserta, **Dashboard Monitoring Mentor** untuk memantau progres kelas secara realtime, serta fitur **Live Playground** untuk eksperimen tag HTML/CSS secara bebas.

---

## 2. Tech Stack & Architecture

### 2.1 Core Stack
* **Framework:** Next.js (App Router, React 19, TypeScript)
* **Styling & Design System:** Tailwind CSS v4 + Vanilla CSS Design Tokens (konsisten dengan portofolio)
* **Database & ORM:** PostgreSQL (Neon Serverless / Supabase) via **Prisma ORM** (`@prisma/client` + `pg` adapter)
* **Code Editor:** CodeMirror 6 / Monaco Editor lightweight (HTML & CSS mode, syntax highlighting, line numbers, auto-closing tags)
* **Code Execution:** Client-side sandboxed iframe (`sandbox="allow-scripts"`)
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
* **Sidebar (Kanan):** Panel praktek yang dapat di-toggle buka/tutup dan di-resize lebarnya. Berisi tab `index.html`, `style.css`, serta mini preview iframe live.

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
| **01** | **Fondasi Dokumen HTML** | Dokumen web, tag pembuka/penutup, atribut, `<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`, `<h1>`-`<h6>`, `<p>`, `<img>`. | Membuat struktur dasar, nama cafe (`<h1>`), tagline (`<p>`), dan banner foto cafe (`<img>`). |
| **02** | **Fasilitas & Layanan (Lists)** | Sintaks `<ul>`, `<ol>`, `<li>`, perbedaan list bernomor dan bullet points. | Menambahkan section fasilitas (Free WiFi, Outdoor Garden, Single-Origin Beans, Smoking Area). |
| **03** | **Daftar Menu & Harga (Tables)** | Semantic table: `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`, colspan/rowspan dasar. | Menyusun tabel menu makanan & minuman cafe lengkap dengan kolom Kategori, Menu, Varian, dan Harga. |
| **04** | **Formulir Reservasi Meja (Forms)** | Form controls: `<form>`, `<label>`, `<input type="...">` (text, email, date, time, number), `<input type="radio">`, `<select>`, `<textarea>`, `<button type="submit">`. | Membangun form reservasi meja lengkap dengan pilihan area (Indoor/Outdoor), tanggal kunjungan, dan jumlah kursi. |
| **05** | **Styling CSS & Box Model** | Selektor CSS, warna, font Google, `margin`, `padding`, `border`, `border-radius`, `box-shadow`, zebra-striping table (`tr:nth-child(even)`). | Memberikan sentuhan visual estetika cafe: warna warm espresso/amber, kartu shadow, dan tabel bergaris rapi. |
| **06** | **Layouting Flexbox & Interaksi** | `display: flex`, `justify-content`, `align-items`, efek `:hover`, transisi halus, micro-JS `onsubmit="alert('Reservasi berhasil!'); return false;"`. | Menyejajarkan navigasi navbar horizontal, kartu fasilitas fleksibel, animasi tombol pesan meja, dan responsivitas. |
| **07** | **Final Polish & Showcase** | Review kode komprehensif, validasi tampilan preview di mobile/desktop, input nama brand cafe peserta. | Klik tombol `[ 🚀 Publish ke Showcase ]` untuk mengirim karya ke database dan galeri publik. |

---

## 6. Database Schema (Prisma PostgreSQL)

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

## 7. Data Flow & Sinkronisasi Kode

1. **Auto-Save Lokal (Client):** Setiap ketikan pada CodeMirror langsung disimpan ke `localStorage` (key: `kopicode_draft_html`, `kopicode_draft_css`) secara instan (0ms delay).
2. **Debounced Cloud Sync (Server):** Setelah 1500ms tidak ada aktivitas mengetik (*debounce*), client mengirim payload `POST /api/sync-draft` ke backend Next.js untuk memperbarui kolom `html_draft` dan `css_draft` di PostgreSQL.
3. **Indikator Status:** Header menampilkan status visual:
   * `[ ☁️ Menyimpan... ]` saat sedang request
   * `[ ☁️ Tersimpan ke Cloud ]` saat sukses
   * `[ ⚠️ Disimpan Lokal ]` saat offline/gagal koneksi
4. **Publish ke Showcase:** Saat peserta mengklik `[ 🚀 Publish ke Showcase ]`, sistem menyimpan snapshot final ke tabel `Showcase` dan menampilkan notifikasi sukses beserta tautan ke `/showcase`.

---

## 8. Dashboard Showcase & Mentor Monitoring

### 8.1 Public Showcase Gallery (`/showcase`)
* Tampilan kartu grid berdesain technical monochrome dengan dashed border.
* Iframe mini-preview yang merender website cafe buatan peserta secara dinamis.
* Informasi: Nama Cafe, Nama Pembuat, Waktu Publikasi, dan tombol `[ ♥ Like ]`.
* Fitur modal `[ 🔍 Inspect Code ]` untuk melihat source code HTML dan CSS buatan peserta.

### 8.2 Mentor Monitoring Dashboard (`/mentor`)
* Dilindungi oleh `MENTOR_SECRET_PIN` (dikonfigurasi via `.env`).
* Tabel pemantauan realtime peserta:
  * Nama Peserta & Sesi Kelas
  * Progres Step (contoh: `Step 4 / 7`)
  * Waktu Aktivitas Terakhir
  * Tombol `[ Preview Web ]` dan `[ Lihat Kode ]` untuk memantau peserta yang tertinggal atau membutuhkan bantuan mentor secara langsung.

---

## 9. Security & Error Handling

* **Iframe Sandboxing:** Iframe runner menggunakan atribut `sandbox="allow-scripts"`. Atribut berbahaya seperti `allow-top-navigation`, `allow-same-origin`, dan `allow-modals` dinonaktifkan untuk mencegah akses ke cookie/token parent window atau URL redirect jahat.
* **Input Sanitization:** Nama peserta dan nama cafe divalidasi dengan batasan panjang karakter dan escape HTML untuk mencegah XSS pada tampilan dashboard/showcase.
* **Database Connection Pooling:** Menggunakan connection pooling (Neon Serverless pooler / `@prisma/adapter-pg`) untuk mencegah connection exhaustion saat banyak peserta melakukan cloud sync bersamaan di Vercel Serverless.

---

## 10. Verification & Test Plan

1. **Unit & Component Testing:**
   * Test rendering modul materi (Step 1 sampai 7).
   * Test sinkronisasi debounced save ke database.
   * Test CodeMirror editor (perubahan teks men-trigger render preview iframe).
2. **Integration Testing:**
   * Alur pendaftaran peserta tanpa login (cukup nama) -> sinkronisasi step -> publish showcase.
   * Alur login mentor via PIN -> membuka tabel peserta dan melihat kode peserta.
   * Alur playground independen tanpa mengubah draft materi.
   * Uji responsive preview (Desktop, Tablet, Mobile) dan mode Fullscreen Zen.
