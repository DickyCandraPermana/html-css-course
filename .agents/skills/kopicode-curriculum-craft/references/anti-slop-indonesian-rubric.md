# Rubrik De-Slop & Standar Humanizer Bahasa Indonesia (KopiCode)

Dokumen ini adalah pedoman operasional penulisan teks kurikulum di KopiCode. Gunakan pedoman ini saat menulis atau menyunting `theory`, `analogy`, `concept`, `supportingTips`, `tasks`, dan `assertions` di `src/lib/curriculum.ts`.

---

## 1. Daftar Kata & Frasa Terlarang (Banned AI Clichés)

| Frasa AI Slop / Kaku | Mengapa Buruk? | Alternatif Manusiawi & Alami |
|---|---|---|
| *Mari kita selami...* / *Yuk kita dive-in...* | Signposting klise ala ChatGPT tutorial. | Langsung masuk ke pokok masalah: "Buka file index.html..." |
| *Tidak hanya... tetapi juga...* | Formula paralel negatif artifisial. | Tulis kalimat langsung dan jelas. |
| *Lanskap web modern* | Metafora abstrak tanpa makna konkret. | "Standar browser hari ini" / "website masa kini". |
| *Berperan penting / krusial / esensial* | Penggelembungan signifikansi tanpa bukti. | Jelaskan fungsinya secara konkret: "tanpa ini browser bakal bingung membaca..." |
| *Merupakan sebuah bukti nyata...* | Bahasa humas/korporat basi. | Tulis fakta langsung: "Tag ini sudah dipakai sejak..." |
| *Harmonis dan proporsional* | Adjektiva hampa pemanis kalimat. | "Jaraknya pas di mata" / "Teks tidak bertabrakan". |
| *Memberikan pengalaman tanpa batas* | Bahasa brosur marketing murahan. | Jelaskan fungsi: "Biar pengunjung gampang pesan kopi lewat HP". |
| *Menyajikan solusi inovatif* | AI jargon klise. | "Biar urutan seduh kopi tidak berantakan". |
| *Dalam era digital saat ini...* | Klise pembuka esai sekolah/ChatGPT. | Potong total. Langsung ke meja kerja. |
| *Tak terlupakan / menakjubkan* | Hiperbola palsu untuk fitur biasa. | Gunakan kata wajar: "rapi", "kontras", "mudah dibaca". |
| *Menyimpan potensi besar* | AI hedging / janji kosong. | "Bisa kamu pakai buat..." |

---

## 2. Pola Penulisan & Retorika (Anti-Slop Patterns)

### A. Potong Formula Tiga Serangkai (Rule of Three)
LLM cenderung memaksakan 3 kata sifat berurutan agar terdengar komprehensif (misal: "rapi, elegan, dan profesional").
- ❌ **Slop:** "Website kedai kopi ini akan tampil menarik, interaktif, dan modern."
- ✅ **Manusiawi:** "Website kedai kopi ini bakal rapi di layar HP dan gampang dibaca pelanggan."

### B. Hindari Copula Avoidance
LLM sering mengganti kata kerja sederhana "adalah" / "punya" dengan frasa kaku seperti "berfungsi sebagai", "bertindak selaku", "merupakan wujud dari".
- ❌ **Slop:** "Elemen `<header>` bertindak sebagai wadah yang menaungi identitas kedai kopi."
- ✅ **Manusiawi:** "`<header>` adalah bagian atas ruko tempat kita memasang plang kedai kopi."

### C. Hapus Participle Menggantung (*-ing Endings*)
Dalam bahasa Indonesia, AI sering menerjemahkan participle Inggris menjadi anak kalimat menggantung berawalan "memastikan...", "menampilkan...", "menciptakan...", "menghadirkan...".
- ❌ **Slop:** "Atur padding 16px, memastikan tata letak tetap proporsional dan menghadirkan kenyamanan visual."
- ✅ **Manusiawi:** "Beri padding 16px biar teks tidak mepet ke pinggir kotak."

### D. Hindari Em-Dash Berlebihan (—)
Ganti em-dash yang bertebaran dengan titik, koma, atau tanda kurung santai.
- ❌ **Slop:** "HTML adalah kerangka—tanpa kerangka ini—website tidak punya bentuk."
- ✅ **Manusiawi:** "HTML itu kerangkanya. Tanpa kerangka, browser tidak tahu mana judul dan mana tombol."

### E. Gunakan Kalimat Aktif untuk Perintah Tugas (Tasks)
Instruksi tugas harus memakai kata kerja imperatif tegas yang bisa langsung dieksekusi di editor:
- ❌ **Slop:** "Pengguna sebaiknya menambahkan tag `<h1>` yang memuat nama kedai."
- ✅ **Manusiawi:** "Tulis nama kedai kopimu di dalam tag `<h1>`."

---

## 3. Panduan Nada Bicara KopiCode (Tone & Voice)

1. **Rekan Kerja di Meja Barista:** Bayangkan kamu adalah barista senior yang sedang mendampingi barista junior di depan mesin kopi. Santai, hangat, tidak menggurui, tapi tegas soal takaran dan standar.
2. **Kosa Kata Otentik:** Gunakan istilah nyata dari dunia kopi: *grinder*, *portafilter*, *single origin*, *manual brew V60*, *cangkir keramik*, *biji kopi sangrai*, *meja seduh*, *bon kasir*. Jangan pakai nama generik seperti "Produk A", "Item 1", atau "Lorem Ipsum".
3. **Bahasa Indonesia Bernapas:** Gunakan bahasa Indonesia percakapan yang renyah ("kamu", "bikin", "biar", "pakai", "coba lirik", "jangan lupa"), dipadu dengan istilah teknis web resmi yang dipertahankan dalam format inline-code (`<div>`, `padding`, `display: flex`).
4. **Kejelasan di Atas Kepintaran:** Jangan berputar-putar mencari metafora puitis jika kalimat lugas lebih cepat dipahami siswa pemula.
