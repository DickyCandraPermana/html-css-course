# Implementation Plan: Interactive HTML & CSS Learning Portal ("KopiCode")

**Date:** 2026-09-28  
**Spec Reference:** `docs/superpowers/specs/2026-09-28-interactive-html-css-learning-portal-design.md`  
**Curriculum Reference:** `docs/curriculum-specification.md`  
**Tech Stack:** Next.js (App Router, TypeScript) + Drizzle ORM + Neon Serverless PostgreSQL + Tailwind CSS v4 + CodeMirror 6 + Sandboxed Iframe Runner

---

## Proposed Changes

### Phase 1: Foundation & Project Scaffolding
- [ ] **Task 1:** Scaffolding Next.js (App Router, TypeScript, Tailwind CSS v4, PostCSS).
  - Target files: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`.
  - Verifikasi: Jalankan `npm run dev` dan pastikan server menyala tanpa error.
- [ ] **Task 2:** Setup Global Design System & Tokens sesuai `D:\dicky\portofolio`.
  - Target files: `src/app/globals.css`, `src/app/layout.tsx`.
  - Mengonfigurasi font `Space_Grotesk`, `Geist`, `JetBrains_Mono`.
  - Mengonfigurasi kelas `bracket-framer`, palet warna `--color-base: #050505`, dashed border, dan layout responsif.
  - Verifikasi: Inspect tampilan baseline di browser.
- [ ] **Task 3:** Setup Drizzle ORM & Database Neon PostgreSQL.
  - Target files: `src/db/schema.ts`, `src/db/index.ts`, `drizzle.config.ts`.
  - Schema tables: `participants` dan `showcases`.
  - Konfigurasi `@neondatabase/serverless` HTTP client + Drizzle ORM.
  - Verifikasi: Jalankan `npx drizzle-kit generate` dan pastikan migrasi SQL ter-generate rapi.

---

### Phase 2: Core Data & Curriculum Engine
- [ ] **Task 4:** Modul Data Kurikulum & Materi (7 Modul Lengkap).
  - Target file: `src/lib/curriculum.ts`.
  - Memuat seluruh teori, materi pendukung (format teks, gradients, box model deep dive, pseudo-classes), starter code, kode solusi, dan metadata tiap modul.
  - Verifikasi: Unit test / import data kurikulum tanpa circular dependency.
- [ ] **Task 5:** Engine Validasi freeCodeCamp-Style (DOMParser & CSS Inspector).
  - Target file: `src/lib/validator.ts`.
  - Fungsi evaluasi assertion `runStepTests(stepId, html, css)` yang menguji DOM tree dan CSS rules serta menghasilkan status `passed: boolean`, pesan deskripsi, dan petunjuk (*hints*).
  - Verifikasi: Uji assertion runner dengan sampel kode valid dan invalid untuk tiap modul (Step 1-6).

---

### Phase 3: Interactive Sandbox & Editor Components
- [ ] **Task 6:** Komponen CodeMirror 6 Editor (`src/components/CodeEditor.tsx`).
  - Mendukung tab `index.html` dan `style.css`, syntax highlighting, line numbering, dan tema technical dark.
  - Verifikasi: Editor dapat menerima input dan memicu event `onChange`.
- [ ] **Task 7:** Komponen Sandboxed Live Preview Runner (`src/components/LivePreview.tsx`).
  - Menggabungkan HTML + CSS ke dalam iframe dengan atribut `sandbox="allow-scripts"`.
  - Mendukung tombol switch viewport device (*Desktop 100%*, *Tablet 768px*, *Mobile 375px*).
  - Verifikasi: Ketikan kode di editor langsung mengupdate tampilan preview tanpa refresh layar.
- [ ] **Task 8:** Fitur Fullscreen Zen Mode & Fullscreen Preview.
  - Target files: `src/components/FullscreenModal.tsx`.
  - Toggle layar penuh untuk fokus coding (Split Editor + Preview 50:50) dan tombol keluar `Esc`.
  - Verifikasi: Tekan tombol fullscreen, pastikan layout responsif dan tombol tutup berfungsi.
- [ ] **Task 9:** Komponen Test Checklist Panel (`src/components/TestChecklist.tsx`).
  - Menampilkan daftar assertion per step dengan indikator `✓ Lolos` (hijau) dan `✗ Belum Selesai` (merah dengan hints).
  - Verifikasi: Checklist merespons real-time saat kode peserta diperbaiki.

---

### Phase 4: Alur Belajar Utama & Sinkronisasi Sesi
- [ ] **Task 10:** Halaman Utama & Modal Masuk Kelas (`src/app/page.tsx`).
  - Input nama peserta dan session code tanpa password/auth rumit.
  - Menyimpan ID sesi di cookie / localStorage.
  - Verifikasi: Input nama -> klik "Mulai Belajar" -> diarahkan ke `/learn`.
- [ ] **Task 11:** Halaman Belajar Step-by-Step (`src/app/learn/page.tsx`).
  - Main content (Materi modul, analogi, tips pendukung) di sebelah kiri.
  - Collapsible Practice Sidebar di sebelah kanan (Code Editor, Test Checklist, Live Preview).
  - Tombol `[ Next Step ▶ ]` yang hanya aktif jika seluruh tes modul lolos.
  - Verifikasi: Navigasi antar step berjalan lancar dan progres tersimpan.
- [ ] **Task 12:** Sinkronisasi Hybrid (LocalStorage + Cloud Sync API).
  - Target files: `src/app/api/sync-draft/route.ts`, `src/app/api/participants/route.ts`.
  - Auto-save instan ke `localStorage` + debounced sync (1500ms) ke database PostgreSQL.
  - Verifikasi: Refresh halaman tidak menghilangkan kode peserta; data di Postgres terupdate.

---

### Phase 5: Free Live Playground
- [ ] **Task 13:** Halaman 🧪 Live Playground (`src/app/playground/page.tsx`).
  - Workspace mandiri untuk eksplorasi tag HTML/CSS bebas tanpa mengganggu draft cafe.
  - Tombol Quick Tag Boilerplate: `[+ Form]`, `[+ Tabel]`, `[+ Flexbox Card]`, `[+ Media]`.
  - Tombol reset dan export code.
  - Verifikasi: Ketik di playground tidak mengubah data di `/learn`.

---

### Phase 6: Showcase Gallery & Mentor Monitoring Dashboard
- [ ] **Task 14:** Alur Publikasi & Galeri Showcase Publik (`src/app/showcase/page.tsx`, `src/app/api/publish/route.ts`).
  - Tombol `[ 🚀 Publish ke Showcase ]` di Step 7.
  - Grid galeri website kedai kopi peserta dengan mini iframe preview, like counter (`POST /api/showcase/[id]/like`), dan modal inspect source code.
  - Verifikasi: Publish proyek -> muncul di galeri -> beri like -> inspeksi kode.
- [ ] **Task 15:** Dashboard Monitoring Mentor (`src/app/mentor/page.tsx`, `src/app/api/mentor/route.ts`).
  - Proteksi Admin PIN (`MENTOR_SECRET_PIN`).
  - Tabel monitoring peserta realtime (Nama, Step aktif, Waktu terakhir, tombol inspect code).
  - Verifikasi: Masukkan PIN benar -> tabel muncul; masukkan PIN salah -> akses ditolak.

---

### Phase 7: Final Verification & Build Validation
- [ ] **Task 16:** Validasi End-to-End semua modul dari Step 1 sampai Step 7.
- [ ] **Task 17:** Jalankan `npm run build` dan pastikan zero build errors & siap deploy ke Vercel.

---

## Verification Plan

### Automated & Unit Checks:
1. `npm run build`: Memastikan semua halaman Next.js, API routes, dan type definitions lulus kompilasi tanpa type error.
2. `validator.test.ts`: Uji programmatic terhadap validator engine untuk tiap modul.

### Manual User Journey Check:
1. **Student Flow:**
   - Buka `/` -> Masukkan nama "Dicky" -> Masuk `/learn`.
   - Modul 1: Tulis `<h1>`, `<p>`, `<strong>`, `<hr>`, `<img>` -> Indikator checklist hijau -> Klik "Lanjut ke Step 2".
   - Modul 2: Tulis `<ul>` dan 3 `<li>` -> Lolos -> Lanjut ke Step 3.
   - Modul 3: Tulis tabel menu dengan `<thead>`, `<tbody>`, 3 baris -> Lolos -> Lanjut ke Step 4.
   - Modul 4: Tulis form reservasi meja lengkap -> Lolos -> Lanjut ke Step 5.
   - Modul 5: Tulis CSS box-sizing, background gradient, `margin: 0 auto`, padding -> Lolos -> Lanjut ke Step 6.
   - Modul 6: Tulis CSS `display: flex`, pseudo-class `:hover`, `:focus`, `:active`, `onsubmit` alert -> Lolos -> Lanjut ke Step 7.
   - Modul 7: Input nama brand cafe -> Klik "Publish ke Showcase".
2. **Showcase Flow:**
   - Buka `/showcase` -> Karya Dicky muncul -> Klik tombol "Like" -> Like counter bertambah -> Klik "Inspect Code".
3. **Playground Flow:**
   - Buka `/playground` -> Klik `[+ Tabel]` -> Kode otomatis tersisip dan live preview merender tabel.
4. **Mentor Flow:**
   - Buka `/mentor` -> Masukkan PIN -> Lihat peserta "Dicky" dengan status Step 7 dan preview kodenya.
