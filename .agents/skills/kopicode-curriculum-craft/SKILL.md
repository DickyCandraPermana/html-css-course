---
name: kopicode-curriculum-craft
description: Author slop-free KopiCode PBL courses with cafe analogies.
version: 0.1.0
author: KopiCode Team, Hermes Agent
license: MIT
platforms: [linux, macos, windows]
metadata:
  hermes:
    tags: [curriculum, pbl, html, css, education, anti-slop, humanizer]
    related_skills: [humanizer, project-based-curriculum-authoring]
---

# KopiCode Curriculum Craft

Standar arsitektur dan pedoman kurikulum interaktif KopiCode: kursus HTML5 & CSS3 berbasis proyek riil kedai kopi fisik, bebas dari jargon klise AI (*anti-AI slop*), dan berorientasi pada tantangan praktis dengan pengujian otomatis (*FreeCodeCamp-style assertions*).

## When to Use

Gunakan skill ini saat:
- Menulis atau memperbarui modul di `src/lib/curriculum.ts`.
- Menyunting materi slide deck di `src/lib/slidesData.ts`.
- Mengaudit teks modul dari AI slop (bahasa kaku, formula 3 serangkai, metafora hampa).
- Menyelaraskan analogi teknis HTML/CSS dengan aktivitas fisik kedai kopi & barista.
- Merancang instruksi tugas (`tasks`) dan pengujian otomatis (`assertions`).

Jangan gunakan skill ini untuk:
- Mengubah skema database Drizzle (`src/db/schema.ts`).
- Mengatur konfigurasi build Next.js atau Tailwind CSS.
- Menulis dokumen di luar domain kurikulum KopiCode.

---

## 1. Arsitektur Pedagogis 5-Lapis (5-Layer PBL Architecture)

Setiap modul di KopiCode wajib memenuhi 5 lapis pemahaman agar siswa pemula tidak tersesat dalam sintaks abstrak:

1. **Kebutuhan Nyata Kedai Kopi (*Real-World Need*):** Alasan bisnis kenapa kedai kopi membutuhkan elemen ini sekarang (misal: "Pelanggan di kasir butuh melihat daftar harga secara jelas agar tidak salah pesan").
2. **Model Mental Kedai Kopi Fisik (*Barista Physical Analogy*):** Pengait visual sebelum menyentuh sintaks (lihat `references/barista-analogies-map.md`).
3. **Standar Semantik Web (*Technical Semantics*):** Sintaks standar W3C/HTML5/CSS3 yang bersih dan aksesibel (misal: penggunaan `<header>`, `<table>`, `<label for>`, `box-sizing: border-box`).
4. **Peringatan Jebakan Pemula (*Beginner Trap*):** Kesalahan paling umum yang sering dibuat pemula (misal: lupa menutup tag, lupa atribut `alt`, atau margin saling bertabrakan).
5. **Tantangan Praktis & Assertion Tervalidasi (*Targeted Quest & Assertions*):** Tugas dengan kata kerja imperatif aktif dan fungsi pengujian otomatis DOM/CSS tanpa mengunci whitespace.

---

## 2. Struktur Data Modul (`ModuleData` Schema)

Setiap entri dalam array `MODULES` pada `src/lib/curriculum.ts` mengikuti kontrak tipe berikut:

```typescript
export interface ModuleData {
  id: number;                          // Indeks modul (0 s.d. 7)
  slug: string;                        // URL path slug (contoh: "anatomi-dokumen-html")
  title: string;                       // Judul modul lugas dan berbobot
  subtitle: string;                    // Subjudul yang merangkum hasil kerja siswa
  badge: string;                       // Label ringkas (contoh: "MODUL 00 // FONDASI DOKUMEN")
  requiresCss?: boolean;               // Apakah tab CSS aktif untuk modul ini
  summary: string;                     // 1-2 kalimat ringkas tentang apa yang dibangun
  theory: {
    heading: string;                   // Judul topik teori
    concept: string;                   // Penjelasan konsep teknis langsung tanpa basa-basi
    analogy: string;                   // Analogi fisik kedai kopi yang konkret
    supportingTips?: SupportingTip;    // Kartu info pendukung (atribut, tag pelengkap)
    codeExample: {
      title: string;                   // Judul contoh kode
      language: "html" | "css";        // Bahasa kode
      code: string;                    // Potongan kode nyata bertema kedai kopi
    };
  };
  tasks: string[];                     // Checklist langkah kerja (kata kerja aktif)
  starterHtml: string;                 // Kode awal HTML (valid dan siap diedit)
  starterCss: string;                  // Kode awal CSS
  solutionHtml: string;                // Kunci jawaban lengkap HTML
  solutionCss: string;                 // Kunci jawaban lengkap CSS
  assertions: StepAssertion[];         // Pengujian otomatis berbasis DOM dan CSS
}
```

---

## 3. Standar Humanizer & Anti-AI Slop

Teks kurikulum wajib bersih dari gaya tulisan AI yang artifisial. Rujukan lengkap kata terlarang dan perbaikannya ada di `references/anti-slop-indonesian-rubric.md`.

### Prinsip Utama:
- **Haramkan Klise Pembuka:** Dilarang menggunakan "Mari kita selami...", "Dalam era digital saat ini...", "Website modern membutuhkan...", "Let's dive in...".
- **Hapus Formula Tiga Serangkai:** Potong pengelompokan 3 kata sifat palsu ("menarik, interaktif, dan modern").
- **Gunakan Copula Alami:** Gunakan kata "adalah", "punya", atau langsung sambungkan subjek ke predikat, bukan "berfungsi sebagai", "bertindak selaku", "merupakan salah satu bukti".
- **Potong Kalimat Menggantung (*-ing Participle*):** Jangan gunakan "memastikan bahwa...", "menciptakan suasana...", "menghadirkan kesan...". Tulis konsekuensinya secara langsung.
- **Batasi Em-Dash (—):** Gunakan tanda titik atau koma biasa.
- **Gaya Bahasa Rekan Kerja:** Bicara santai tapi presisi, seperti barista senior mendampingi barista junior di bar seduh.

---

## 4. Matriks Pemetaan Analogi 8 Modul (00 - 07)

Rincian lengkap analogi per elemen tersimpan di `references/barista-analogies-map.md`. Ringkasan per modul:

- **Modul 00 (Fondasi Dokumen):** Sertifikat izin ruko kedai (`<!DOCTYPE>`), tapak kavling ruko (`<html>`), plang nama di genteng luar (`<head>` & `<title>`), dan ruangan dalam ruko tempat barista beroperasi (`<body>`).
- **Modul 01 (Konten & Media):** Fasad kedai kopi depan jalan: neon box nama brand (`<h1>`), papan kapur cerita seduhan (`<p>`, `<strong>`, `<em>`), lis kayu pembatas (`<hr>`), dan pigura foto meja seduh (`<img>`).
- **Modul 02 (List & Container):** Papan daftar fasilitas kedai (`<ul>`), kartu 4 tahapan seduh resep V60 (`<ol>`), sekat partisi ruko (`<div>`), stempel status (`<span>`), dan papan penunjuk jalan ke kasir (`<a>`).
- **Modul 03 (Tabel Menu & Harga):** Papan menu kasir kisi-kisi (`<table>`), kepala kolom harga (`<thead>`), deretan menu harian (`<tbody>`), stempel menu rekomendasi barista (`<mark>`), dan catatan porsi/es (`<small>`).
- **Modul 04 (Formulir Reservasi):** Clipboard bon reservasi meja kasir (`<form>`), kolom nama tamu (`<input type="text">`), kalender booking (`date`), jumlah tamu (`number`), pilihan area AC/Outdoor (`radio`), opsi cabang (`select`), catatan meja (`textarea`), dan tombol bel pendaftaran (`button submit`).
- **Modul 05 (Box Model & Warna):** Meja cafe fisik: kayu meja (*content*), tatakan cangkir karet (*padding*), lis tepi kayu (*border*), lorong jalan barista antar meja (*margin*), penggaris paten agar meja tidak membesar saat dilis (`box-sizing: border-box`), posisi meja di tengah ruko (`margin: 0 auto`), dan warna dinding ekspos (`linear-gradient`).
- **Modul 06 (Flexbox & Interaksi):** Meja bar barista sejajar satu garis (`display: flex; justify-content: space-between`), respon kenop pintu saat tangan mendekat (`:hover`), bel kasir saat ditekan (`:active`), lampu meja menyala saat tamu duduk (`:focus`), dan konfirmasi pesanan (`onsubmit alert`).
- **Modul 07 (Grand Opening & Showcase):** Quality check barista sebelum buka pintu: lap meja, kalibrasi espresso, nyalakan lampu, balik plang "CLOSED" jadi "OPEN", dan pamerkan website ke galeri publik.

---

## 5. Kaidah Perancangan Assertion (FreeCodeCamp-Style)

Pengujian kode siswa harus mendidik dan tidak kaku:
1. **Uji Lewat DOM & Regex Terarah:** Periksa node DOM (`doc.querySelector('h1')`) atau regex CSS terarah (`/box-sizing\s*:\s*border-box/i`), jangan menguji kecocokan teks mentah seluruh dokumen yang sensitif terhadap spasi atau urutan atribut.
2. **Satu Hal Per Assertion:** Satu assertion hanya menguji satu syarat keberhasilan.
3. **Pesan Deskripsi & Petunjuk Manusiawi:**
   - Deskripsi menjelaskan kriteria keberhasilan secara positif.
   - Hint memberikan contoh sintaks ramah jika siswa mengalami kebuntuan.
4. **Jaga Kompatibilitas Sistem:** Jangan mengubah `id` assertion (`m0-doctype`, `m1-h1`, dll.) karena script verifikasi `scripts/verify-seed-assertions.mjs` dan validator UI bergantung pada identifier tersebut.

---

## 6. Prosedur Kerja Penyuntingan Modul (De-Slop Workflow)

Saat menyunting atau memperbarui modul di `src/lib/curriculum.ts`:

1. **Baca teks modul eksisting:** Identifikasi kalimat yang kaku, klise AI, atau analogi yang keluar jalur (misal: analogi surat kantor pos bukannya kedai kopi).
2. **Terapkan audit Humanizer:**
   - Cek kata terlarang di `references/anti-slop-indonesian-rubric.md`.
   - Ubah frasa pasif menjadi kalimat aktif.
   - Periksa ritme kalimat: variasikan kalimat pendek dan sedang.
3. **Kaitkan ke Analogi Kedai Kopi:** Pastikan objek analogi adalah barang fisik yang biasa dijumpai di kedai kopi.
4. **Periksa Tugas (*Tasks*):** Pastikan setiap butir instruksi diawali kata kerja tindakan ("Ketik...", "Bungkus...", "Tambahkan...", "Beri...").
5. **Jalankan Verifikasi Teknis:**
   - Pastikan tipe TypeScript valid (`npx tsc --noEmit`).
   - Jalankan verifikasi assertion (`DATABASE_URL=... node scripts/verify-seed-assertions.mjs`).

---

## 7. Verification Checklist

Sebelum menandai pekerjaan kurikulum selesai, pastikan:
- [ ] Teks bebas dari kata klise AI (*lanskap, krusial, esensial, mari kita selami, tidak hanya... tetapi juga*).
- [ ] Analogi 100% konsisten berakar di dunia fisik kedai kopi & barista.
- [ ] `id` assertion dan fungsi `check` tetap kompatibel dengan 5 seeded showcases.
- [ ] `starterHtml` dan `starterCss` dalam kondisi sintaks valid.
- [ ] `solutionHtml` dan `solutionCss` lolos semua assertion pada modul tersebut.
- [ ] TypeScript typecheck lulus tanpa error (`npx tsc --noEmit`).
