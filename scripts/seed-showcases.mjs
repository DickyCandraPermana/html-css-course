import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set in environment!");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

const SEED_SHOWCASES = [
  {
    participant: {
      name: "Bambang Triyono",
      sessionCode: "jogja-artisan-batch1",
      currentStep: 7,
      completedSteps: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    showcase: {
      cafeName: "Kopi Klotok & Pawon Ndeso",
      likesCount: 38,
      htmlCode: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kopi Klotok & Pawon Ndeso</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="pawon-container">
    <header class="pawon-header">
      <div class="badge-pawon">PAWON JOGJA // EST. 1984</div>
      <h1>Kopi Klotok & Pawon Ndeso</h1>
      <p class="tagline">
        Seduhan arang <strong>tungku kayu bakar</strong> & kehangatan pisang goreng kepok di bawah sejuknya <em>lereng Gunung Merapi</em>.
      </p>
      <hr class="garis-motif">
    </header>

    <div class="banner-box">
      <img src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=900" alt="Suasana Pawon Kopi Klotok Pedesaan">
    </div>

    <section id="fasilitas" class="card-seksi">
      <h2>Kenyamanan & Suasana Pedesaan</h2>
      <ul class="list-pawon">
        <li>Bale bambu lesehan dengan semilir angin sawah terasering</li>
        <li>Seduhan kopi tradisional langsung dari cerek tembaga mendidih</li>
        <li>Pisang goreng kepok kuning dan jadah bakar panas setiap jam</li>
        <li>Area parkir luas, mushola joglo kayu, dan bebas polusi kota</li>
      </ul>
      <a href="#menu" class="btn-tautan">Lihat Daftar Seduhan &rarr;</a>
    </section>

    <section id="menu" class="card-seksi">
      <h2>Sajian Khas Tungku & Wedangan</h2>
      <table class="tabel-pawon">
        <thead>
          <tr>
            <th>Menu Pawon</th>
            <th>Ciri Khas</th>
            <th>Harga</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Kopi Klotok Gula Aren</strong></td>
            <td>Dimasak bersama bubuk kopi hingga meletup</td>
            <td><span class="harga">Rp 12.000</span></td>
          </tr>
          <tr>
            <td><strong>Wedang Uwuh Rempah</strong></td>
            <td>Secang, jahe bakar, cengkeh & gula batu</td>
            <td><span class="harga">Rp 14.000</span></td>
          </tr>
          <tr>
            <td><strong>Pisang Goreng Kepok</strong></td>
            <td>Garing di luar, manis lumer bertabur gula semut</td>
            <td><span class="harga">Rp 15.000</span></td>
          </tr>
          <tr>
            <td><strong>Jadah Bakar Gurih</strong></td>
            <td>Ketan putih kelapa gurih beraroma asap daun pisang</td>
            <td><span class="harga">Rp 10.000</span></td>
          </tr>
        </tbody>
      </table>
    </section>

    <section id="reservasi" class="card-seksi form-box">
      <h2>Pesan Bale Lesehan Rombongan</h2>
      <form class="form-pawon" onsubmit="event.preventDefault(); alert('Matur nuwun! Bale lesehan Anda telah disiapkan.');">
        <div class="form-group">
          <label>Nama Lengkap / Kontak Keluarga:</label>
          <input type="text" required placeholder="Contoh: Pak Rahardjo">
        </div>
        <div class="form-group">
          <label>Pilihan Area Duduk:</label>
          <select>
            <option>Bale Sawah Terbuka (Angin Sepoi)</option>
            <option>Area Joglo Kayu Utama</option>
            <option>Dekat Tungku Pawon Hangat</option>
          </select>
        </div>
        <div class="form-group">
          <label>Catatan Tambahan / Jam Kedatangan:</label>
          <textarea rows="3" placeholder="Contoh: Datang pukul 16.00 WIB waktu sunset, mohon siapkan 2 piring pisang kepok."></textarea>
        </div>
        <button type="submit" class="btn-pawon">Konfirmasi Reservasi Bale</button>
      </form>
    </section>

    <footer class="pawon-footer">
      <p>Kopi Klotok & Pawon Ndeso // Buka Setiap Hari 07.00 - 22.00 WIB // Pakem, Sleman, D.I. Yogyakarta</p>
    </footer>
  </div>
</body>
</html>`,
      cssCode: `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: #1a130e;
  color: #f3e8dc;
  font-family: 'Georgia', serif;
  line-height: 1.7;
  padding: 24px 16px;
}

.pawon-container {
  max-width: 760px;
  margin: 0 auto;
}

.pawon-header {
  text-align: center;
  padding: 28px 16px 20px;
}

.badge-pawon {
  display: inline-block;
  font-family: monospace;
  font-size: 11px;
  letter-spacing: 2px;
  background: #2f2016;
  color: #e07a3f;
  padding: 4px 12px;
  border-radius: 4px;
  border: 1px solid #4a3222;
  margin-bottom: 12px;
}

.pawon-header h1 {
  font-size: 2.2rem;
  font-weight: 700;
  color: #fff4eb;
  letter-spacing: -0.5px;
  margin-bottom: 10px;
}

.pawon-header .tagline {
  font-size: 0.95rem;
  color: #d1bfae;
  max-width: 580px;
  margin: 0 auto;
}

.pawon-header .tagline strong {
  color: #e07a3f;
}

.pawon-header .tagline em {
  color: #fce7d2;
}

.garis-motif {
  border: none;
  border-top: 2px dashed #4a3222;
  margin: 24px auto 0;
  width: 60%;
}

.banner-box {
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #3d2a1c;
  margin: 20px 0 28px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.banner-box img {
  width: 100%;
  height: 280px;
  object-fit: cover;
  display: block;
}

.card-seksi {
  background: #241a13;
  border: 1px solid #38271a;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
}

.card-seksi h2 {
  font-size: 1.35rem;
  color: #ffdfc4;
  margin-bottom: 16px;
  border-bottom: 1px solid #3d2a1c;
  padding-bottom: 10px;
}

.list-pawon {
  list-style: none;
  margin-bottom: 18px;
}

.list-pawon li {
  position: relative;
  padding-left: 24px;
  margin-bottom: 10px;
  font-size: 0.92rem;
  color: #dec8b3;
}

.list-pawon li::before {
  content: "☕";
  position: absolute;
  left: 0;
  font-size: 12px;
}

.btn-tautan {
  display: inline-block;
  color: #e07a3f;
  text-decoration: none;
  font-size: 0.88rem;
  font-weight: bold;
  border-bottom: 1px solid #e07a3f;
  padding-bottom: 2px;
  transition: all 0.2s ease;
}

.btn-tautan:hover {
  color: #ff9b66;
  border-color: #ff9b66;
  padding-left: 4px;
}

.tabel-pawon {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  font-size: 0.9rem;
}

.tabel-pawon th {
  text-align: left;
  background: #2f2117;
  color: #e07a3f;
  padding: 10px 14px;
  font-weight: 600;
  font-size: 0.85rem;
  border-bottom: 2px solid #4a3222;
}

.tabel-pawon td {
  padding: 12px 14px;
  border-bottom: 1px solid #2d1f14;
  color: #ebdcd0;
}

.tabel-pawon tr:hover {
  background: #2c2017;
}

.tabel-pawon .harga {
  font-family: monospace;
  font-weight: bold;
  color: #f7b267;
}

.form-group {
  margin-bottom: 14px;
}

.form-group label {
  display: block;
  font-size: 0.82rem;
  color: #c9b19b;
  margin-bottom: 6px;
  font-family: sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  background: #17100b;
  border: 1px solid #4a3222;
  border-radius: 6px;
  padding: 10px 12px;
  color: #fff;
  font-family: inherit;
  font-size: 0.9rem;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #e07a3f;
}

.btn-pawon {
  width: 100%;
  background: #e07a3f;
  color: #17100b;
  border: none;
  border-radius: 6px;
  padding: 12px;
  font-size: 0.95rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-pawon:hover {
  background: #ff8e4d;
}

.pawon-footer {
  text-align: center;
  font-size: 0.75rem;
  color: #8c7664;
  padding: 24px 0 12px;
  font-family: sans-serif;
}`,
    },
  },
  {
    participant: {
      name: "Farhan Wijaya",
      sessionCode: "pontianak-brew-club",
      currentStep: 7,
      completedSteps: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    showcase: {
      cafeName: "Warung Kopi Tiam 'Aroma Selat'",
      likesCount: 52,
      htmlCode: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Warung Kopi Tiam Aroma Selat</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="kopitiam-wrap">
    <header class="kopitiam-head">
      <div class="chinese-sign">聯 成 咖 啡 棧</div>
      <h1>WARUNG KOPI TIAM AROMA SELAT</h1>
      <p class="sub">Racikan Kopi Saring Tradisional & Roti Srikaya Panggang Arang Sejak 1968</p>
      <div class="loc-pill">Jl. Gajah Mada No. 48, Pontianak, Kalimantan Barat</div>
    </header>

    <div class="frame-banner">
      <img src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=900" alt="Cangkir Kopi Tarik Kopitiam Jadul">
    </div>

    <div class="grid-layout">
      <section class="card-tiam">
        <h2>Keunggulan Racikan Kopi Selat</h2>
        <ul class="tiam-list">
          <li>Biji kopi liberika lokal pilihan disangrai dengan resep turun-temurun</li>
          <li>Kain saring tarik tinggi menghasilkan busa halus dan rasa mantap</li>
          <li>Selai srikaya buatan sendiri dari telur bebek dan santan kental murni</li>
          <li>Meja marmer klasik dingin dan suasana hangat percakapan warga kota</li>
        </ul>
      </section>

      <section class="card-tiam">
        <h2>Daftar Menu & Kwitansi</h2>
        <table class="nota-table">
          <thead>
            <tr>
              <th>Nama Pesanan</th>
              <th>Penyajian</th>
              <th>Harga</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Kopi O Panas</td>
              <td>Hitam Pekat Gula Pasir</td>
              <td class="price">Rp 9.000</td>
            </tr>
            <tr>
              <td>Kopi Susu Tarik Peng</td>
              <td>Dingin Es Susu Kental Manis</td>
              <td class="price">Rp 13.000</td>
            </tr>
            <tr>
              <td>Roti Panggang Srikaya</td>
              <td>Arang Kayu + Mentega Gurih</td>
              <td class="price">Rp 12.000</td>
            </tr>
            <tr>
              <td>Telur Ayam Setengah Matang</td>
              <td>2 Butir + Kecap Asin & Lada</td>
              <td class="price">Rp 8.000</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>

    <section class="reservasi-tiam">
      <h2>Pesan Meja Rombongan Sarapan</h2>
      <form class="form-tiam" onsubmit="event.preventDefault(); alert('Meja sarapan Kopitiam telah diamankan!');">
        <div class="tiam-fields">
          <input type="text" placeholder="Nama Pemesan..." required>
          <select>
            <option>Sesi Pagi (06.00 - 09.00)</option>
            <option>Sesi Siang (10.00 - 14.00)</option>
            <option>Sesi Sore & Malam (16.00 - 22.00)</option>
          </select>
          <button type="submit">Amankan Kursi Meja Marmer</button>
        </div>
      </form>
    </section>

    <footer class="kopitiam-foot">
      &copy; 1968 - 2026 Kedai Kopi Tiam Aroma Selat. Warisan Cita Rasa Khatulistiwa.
    </footer>
  </div>
</body>
</html>`,
      cssCode: `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: #0a1410;
  color: #e5eee8;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  line-height: 1.6;
  padding: 24px 16px;
}

.kopitiam-wrap {
  max-width: 800px;
  margin: 0 auto;
}

.kopitiam-head {
  text-align: center;
  padding: 20px 10px;
  border-bottom: 2px solid #1a382c;
  margin-bottom: 24px;
}

.chinese-sign {
  font-size: 1.3rem;
  letter-spacing: 8px;
  color: #fbbf24;
  margin-bottom: 6px;
}

.kopitiam-head h1 {
  font-size: 1.8rem;
  font-weight: 900;
  color: #f3faf6;
  letter-spacing: 1px;
}

.kopitiam-head .sub {
  color: #92b5a5;
  font-size: 0.95rem;
  margin-top: 6px;
}

.loc-pill {
  display: inline-block;
  background: #12281f;
  color: #2dd4bf;
  border: 1px solid #1d4d3a;
  border-radius: 999px;
  padding: 4px 14px;
  font-size: 0.78rem;
  margin-top: 12px;
  font-family: monospace;
}

.frame-banner {
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #204b38;
  margin-bottom: 24px;
}

.frame-banner img {
  width: 100%;
  height: 260px;
  object-fit: cover;
  display: block;
}

.grid-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-bottom: 24px;
}

@media (min-width: 640px) {
  .grid-layout {
    grid-template-columns: 1fr 1fr;
  }
}

.card-tiam {
  background: #0f221b;
  border: 1px solid #1b4533;
  border-radius: 8px;
  padding: 20px;
}

.card-tiam h2 {
  font-size: 1.15rem;
  color: #2dd4bf;
  margin-bottom: 14px;
  font-weight: 700;
}

.tiam-list {
  list-style: none;
}

.tiam-list li {
  padding-left: 20px;
  position: relative;
  margin-bottom: 10px;
  font-size: 0.88rem;
  color: #c0d8cc;
}

.tiam-list li::before {
  content: "✔";
  position: absolute;
  left: 0;
  color: #fbbf24;
  font-size: 11px;
}

.nota-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}

.nota-table th {
  text-align: left;
  padding: 6px 8px;
  border-bottom: 2px dashed #204b38;
  color: #2dd4bf;
  font-size: 0.75rem;
  text-transform: uppercase;
}

.nota-table td {
  padding: 8px;
  border-bottom: 1px solid #153225;
}

.nota-table .price {
  font-family: monospace;
  font-weight: bold;
  color: #fbbf24;
}

.reservasi-tiam {
  background: #112a20;
  border: 1px dashed #2dd4bf;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  margin-bottom: 24px;
}

.reservasi-tiam h2 {
  font-size: 1.1rem;
  color: #f3faf6;
  margin-bottom: 14px;
}

.tiam-fields {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 480px;
  margin: 0 auto;
}

@media (min-width: 480px) {
  .tiam-fields {
    flex-direction: row;
    flex-wrap: wrap;
  }
  .tiam-fields input { flex: 1 1 200px; }
  .tiam-fields select { flex: 1 1 180px; }
  .tiam-fields button { flex: 1 1 100%; }
}

.tiam-fields input,
.tiam-fields select {
  background: #091712;
  border: 1px solid #1d4d3a;
  padding: 9px 12px;
  color: white;
  border-radius: 4px;
  font-size: 0.85rem;
}

.tiam-fields button {
  background: #2dd4bf;
  color: #071911;
  font-weight: bold;
  border: none;
  padding: 10px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.tiam-fields button:hover {
  opacity: 0.9;
}

.kopitiam-foot {
  text-align: center;
  font-size: 0.75rem;
  color: #6a8e7e;
  padding-bottom: 12px;
}`,
    },
  },
  {
    participant: {
      name: "Nadira Alisya",
      sessionCode: "dago-indie-creatives",
      currentStep: 7,
      completedSteps: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    showcase: {
      cafeName: "KALENG & SUNYI // Micro Roastery",
      likesCount: 64,
      htmlCode: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>KALENG & SUNYI // Micro Roastery</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="brutal-wrap">
    <nav class="brutal-nav">
      <span class="brand-code">[KS-BDG // 022]</span>
      <span class="status-live">● ROASTING BATCH #42 TODAY</span>
    </nav>

    <header class="brutal-hero">
      <div class="tag-orange">GANG SUNYI // DAGO ATAS</div>
      <h1>KALENG &amp; SUNYI_</h1>
      <p class="manifesto">
        Ruang kerja hening untuk perajin kode, pembaca zine, dan penikmat pour-over anaerobik Jawa Barat.
      </p>
    </header>

    <div class="brutal-image">
      <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900" alt="V60 Pour Over Dago">
    </div>

    <div class="brutal-specs">
      <div class="spec-card">
        <h3>SPEK RUANG:</h3>
        <ul>
          <li>Wi-Fi simetris 250 Mbps (Fiber Dedicated)</li>
          <li>Stopkontak perorangan di setiap kubikel beton</li>
          <li>Koleksi kaset pita lofi &amp; deck tape analog</li>
          <li>Area bebas asap rokok &amp; zona hening absolut</li>
        </ul>
      </div>

      <div class="spec-card">
        <h3>SINGLE ORIGIN BATCH:</h3>
        <table class="spec-table">
          <thead>
            <tr>
              <th>ORIGIN</th>
              <th>PROSES</th>
              <th>CUPPING</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Pangalengan Natural</td>
              <td>Anaerobic 72H</td>
              <td><strong>Rp 30K</strong></td>
            </tr>
            <tr>
              <td>Ciwidey Washed</td>
              <td>Slow Dry 21D</td>
              <td><strong>Rp 28K</strong></td>
            </tr>
            <tr>
              <td>Kamojang Honey</td>
              <td>Yellow Pulp</td>
              <td><strong>Rp 32K</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="brutal-cta">
      <div class="cta-inner">
        <h3>BOOK SILENT WORKSTATION</h3>
        <p>Tersedia 12 meja kerja fokus dengan kursi ergonomis.</p>
        <button onclick="alert('Slot meja kerja Anda telah diamankan untuk 4 jam ke depan!')" class="btn-safety">KLAIM MEJA KERJA SEKARANG</button>
      </div>
    </div>

    <footer class="brutal-foot">
      <span>NO COMPROMISE ON COFFEE &amp; FOCUS.</span>
      <span>BANDUNG, ID // LAT -6.864</span>
    </footer>
  </div>
</body>
</html>`,
      cssCode: `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: #101010;
  color: #e0e0e0;
  font-family: 'JetBrains Mono', Consolas, monospace;
  line-height: 1.6;
  padding: 16px;
}

.brutal-wrap {
  max-width: 820px;
  margin: 0 auto;
  border: 1px solid #2a2a2a;
  background: #080808;
}

.brutal-nav {
  display: flex;
  justify-content: space-between;
  padding: 10px 16px;
  border-bottom: 1px solid #2a2a2a;
  font-size: 11px;
}

.brand-code {
  font-weight: bold;
  color: #fff;
}

.status-live {
  color: #ff5400;
}

.brutal-hero {
  padding: 32px 20px 24px;
  border-bottom: 1px solid #2a2a2a;
}

.tag-orange {
  display: inline-block;
  background: #ff5400;
  color: #000;
  font-size: 10px;
  font-weight: 900;
  padding: 2px 8px;
  letter-spacing: 1px;
  margin-bottom: 12px;
}

.brutal-hero h1 {
  font-size: 2.4rem;
  font-weight: 900;
  letter-spacing: -1.5px;
  color: #fff;
  margin-bottom: 8px;
}

.manifesto {
  color: #999;
  font-size: 0.9rem;
  max-width: 620px;
}

.brutal-image {
  border-bottom: 1px solid #2a2a2a;
  overflow: hidden;
}

.brutal-image img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  display: block;
  filter: grayscale(40%) contrast(110%);
}

.brutal-specs {
  display: grid;
  grid-template-columns: 1fr;
  border-bottom: 1px solid #2a2a2a;
}

@media (min-width: 640px) {
  .brutal-specs {
    grid-template-columns: 1fr 1fr;
  }
}

.spec-card {
  padding: 20px;
}

.spec-card:first-child {
  border-bottom: 1px solid #2a2a2a;
}

@media (min-width: 640px) {
  .spec-card:first-child {
    border-bottom: none;
    border-right: 1px solid #2a2a2a;
  }
}

.spec-card h3 {
  font-size: 0.8rem;
  letter-spacing: 1.5px;
  color: #ff5400;
  margin-bottom: 12px;
}

.spec-card ul {
  list-style: none;
  font-size: 0.82rem;
  color: #bbb;
}

.spec-card ul li {
  padding: 6px 0;
  border-bottom: 1px dashed #222;
}

.spec-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.82rem;
}

.spec-table th {
  text-align: left;
  color: #777;
  font-size: 0.72rem;
  padding: 6px 0;
  border-bottom: 1px solid #222;
}

.spec-table td {
  padding: 8px 0;
  border-bottom: 1px dashed #1a1a1a;
}

.spec-table td strong {
  color: #fff;
}

.brutal-cta {
  padding: 24px 20px;
  background: #0f0f0f;
  border-bottom: 1px solid #2a2a2a;
}

.cta-inner h3 {
  font-size: 1rem;
  color: #fff;
  margin-bottom: 4px;
}

.cta-inner p {
  font-size: 0.8rem;
  color: #777;
  margin-bottom: 16px;
}

.btn-safety {
  display: inline-block;
  background: #fff;
  color: #000;
  border: none;
  font-family: inherit;
  font-weight: 900;
  font-size: 0.82rem;
  letter-spacing: 1px;
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-safety:hover {
  background: #ff5400;
  color: #000;
}

.brutal-foot {
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  font-size: 10px;
  color: #555;
}`,
    },
  },
  {
    participant: {
      name: "Suryo Wicaksono",
      sessionCode: "solo-heritage-vibes",
      currentStep: 7,
      completedSteps: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    showcase: {
      cafeName: "Kopi Tubruk Sudut Pasar Triwindu",
      likesCount: 45,
      htmlCode: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kopi Tubruk Sudut Pasar Triwindu</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="antik-frame">
    <header class="antik-header">
      <div class="cap-vintage">PASAR ANTIK TRIWINDU // SOLO</div>
      <h1>KOPI TUBRUK SUDUT PASAR</h1>
      <p class="filosofi">
        Gilingan kasar wajan tanah liat, cangkir seng blirik loreng hijau, dan canda tawa nostalgia tempo doeloe.
      </p>
    </header>

    <div class="blirik-card">
      <img src="https://images.unsplash.com/photo-1541167760496-1628856ab772?w=900" alt="Cangkir Seng Blirik Kopi Tubruk">
    </div>

    <section class="blok-sejarah">
      <h2>Pojok Lesehan &amp; Radio Kayu</h2>
      <p>
        Duduk bersila di tikar mendong, ditemani alunan tembang keroncong dari radio tabung tua dan kepulan asap kopi hitam kental yang diseduh air mendidih dari ketel tembaga.
      </p>
    </section>

    <section class="blok-menu">
      <h2>Wedangan &amp; Kudapan Pasar</h2>
      <div class="menu-retro-grid">
        <div class="menu-retro-item">
          <span class="nama">Kopi Tubruk Giling Kasar</span>
          <span class="garis"></span>
          <span class="bea">Rp 7.000</span>
        </div>
        <div class="menu-retro-item">
          <span class="nama">Kopi Jahe Geprek Karanganyar</span>
          <span class="garis"></span>
          <span class="bea">Rp 9.000</span>
        </div>
        <div class="menu-retro-item">
          <span class="nama">Teh Kampul Jeruk Khas Solo</span>
          <span class="garis"></span>
          <span class="bea">Rp 8.000</span>
        </div>
        <div class="menu-retro-item">
          <span class="nama">Mendoan Panas Sambal Kecap</span>
          <span class="garis"></span>
          <span class="bea">Rp 10.000</span>
        </div>
      </div>
    </section>

    <section class="blok-kontak">
      <p class="pesan-singkat">"Monggo pinarak, kopi anget tansah sumadya."</p>
      <button class="btn-onthel" onclick="alert('Matur suwun! Tikar lesehan sampun dipun-pesanaken.')">PESAN TIKAR LESEHAN SORE</button>
    </section>

    <footer class="antik-foot">
      Surakarta Hadiningrat // Nguri-uri Tradisi Wedangan
    </footer>
  </div>
</body>
</html>`,
      cssCode: `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: #17140f;
  color: #faebd7;
  font-family: 'Times New Roman', Times, serif;
  line-height: 1.7;
  padding: 24px 16px;
}

.antik-frame {
  max-width: 740px;
  margin: 0 auto;
  border: 1px solid #3d3527;
  padding: 24px;
  background: #1c1813;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.6);
}

.antik-header {
  text-align: center;
  border-bottom: 2px solid #5a4e39;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.cap-vintage {
  display: inline-block;
  font-family: monospace;
  font-size: 11px;
  color: #84cc16;
  border: 1px solid #556b2f;
  padding: 3px 10px;
  letter-spacing: 2px;
  margin-bottom: 8px;
}

.antik-header h1 {
  font-size: 2rem;
  letter-spacing: 2px;
  color: #f7eedd;
  margin-bottom: 8px;
}

.filosofi {
  font-size: 0.95rem;
  color: #c9baa4;
  font-style: italic;
  max-width: 540px;
  margin: 0 auto;
}

.blirik-card {
  border: 1px solid #4a3f2d;
  margin-bottom: 24px;
}

.blirik-card img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  display: block;
}

.blok-sejarah {
  background: #241f18;
  border-left: 3px solid #84cc16;
  padding: 16px 20px;
  margin-bottom: 24px;
}

.blok-sejarah h2 {
  font-size: 1.2rem;
  color: #fcefdc;
  margin-bottom: 8px;
}

.blok-sejarah p {
  font-size: 0.92rem;
  color: #d1c1ab;
}

.blok-menu {
  margin-bottom: 28px;
}

.blok-menu h2 {
  font-size: 1.25rem;
  color: #d97706;
  text-align: center;
  margin-bottom: 16px;
  letter-spacing: 1px;
}

.menu-retro-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.menu-retro-item {
  display: flex;
  align-items: baseline;
  font-size: 0.95rem;
}

.menu-retro-item .nama {
  color: #f7eedd;
}

.menu-retro-item .garis {
  flex: 1;
  border-bottom: 1px dotted #554834;
  margin: 0 10px;
}

.menu-retro-item .bea {
  font-family: monospace;
  font-weight: bold;
  color: #84cc16;
}

.blok-kontak {
  text-align: center;
  border-top: 1px dashed #4a3f2d;
  padding-top: 20px;
  margin-bottom: 16px;
}

.pesan-singkat {
  font-style: italic;
  font-size: 1rem;
  color: #ffdfa9;
  margin-bottom: 14px;
}

.btn-onthel {
  background: #d97706;
  color: #17140f;
  border: none;
  font-family: monospace;
  font-weight: bold;
  font-size: 0.85rem;
  letter-spacing: 1px;
  padding: 12px 24px;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-onthel:hover {
  background: #f59e0b;
}

.antik-foot {
  text-align: center;
  font-size: 0.75rem;
  color: #7c6b54;
  letter-spacing: 1px;
}`,
    },
  },
  {
    participant: {
      name: "Maria Goretti",
      sessionCode: "flores-artisan-2026",
      currentStep: 7,
      completedSteps: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    showcase: {
      cafeName: "Kopi Pesisir Senja Laut // Labuan Bajo",
      likesCount: 71,
      htmlCode: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kopi Pesisir Senja Laut</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="sea-container">
    <header class="sea-header">
      <div class="island-badge">FLORES // KOMODO SUNSET VIEW</div>
      <h1>KOPI PESISIR SENJA LAUT</h1>
      <p class="ocean-tagline">
        Seduhan biji <strong>Arabika Bajawa</strong> beraroma manis apel &amp; coklat dengan panorama gradasi senja laut kepulauan Flores.
      </p>
    </header>

    <div class="sea-hero-image">
      <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900" alt="Senja Laut Labuan Bajo">
    </div>

    <div class="sea-deck-grid">
      <div class="sea-box">
        <h2>Sunset Deck Sanctuary</h2>
        <ul class="sea-list">
          <li>Dermaga kayu jati terbuka menghadap gugusan pulau karst</li>
          <li>Biji kopi single origin Bajawa diproses dry anaerobic</li>
          <li>Cold brew segar infused air kelapa muda bakar pesisir</li>
          <li>Spot sunset terbaik dengan live acoustic instrumental santai</li>
        </ul>
      </div>

      <div class="sea-box">
        <h2>Pilihan Seduhan Pesisir</h2>
        <div class="cocktail-menu">
          <div class="menu-row">
            <div>
              <strong>Flores Bajawa V60</strong>
              <small>Notes: Apel Merah, Coklat, Karamel Halus</small>
            </div>
            <span class="price-pill">Rp 30K</span>
          </div>
          <div class="menu-row">
            <div>
              <strong>Cold Brew Kelapa Bakar</strong>
              <small>Infusi air kelapa muda bakar dingin segar</small>
            </div>
            <span class="price-pill">Rp 34K</span>
          </div>
          <div class="menu-row">
            <div>
              <strong>Espresso Sunset Tonic</strong>
              <small>Espresso dobel + soda tonic + irisan jeruk nipis</small>
            </div>
            <span class="price-pill">Rp 28K</span>
          </div>
        </div>
      </div>
    </div>

    <section class="booking-deck">
      <h2>Reservasi Meja Sunset Depan Dermaga</h2>
      <p>Slot meja terbatas untuk jam emas matahari terbenam (17.00 - 18.30 WITA).</p>
      <button class="sea-btn" onclick="alert('Meja sunset deck tepi dermaga Anda telah terkonfirmasi!')">AMANKAN MEJA SUNSET DECK</button>
    </section>

    <footer class="sea-footer">
      Dermaga Marina Labuan Bajo, Nusa Tenggara Timur // Buka 14.00 - 23.00 WITA
    </footer>
  </div>
</body>
</html>`,
      cssCode: `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: #061118;
  color: #e0f2fe;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  line-height: 1.6;
  padding: 24px 16px;
}

.sea-container {
  max-width: 800px;
  margin: 0 auto;
}

.sea-header {
  text-align: center;
  padding: 24px 10px 16px;
}

.island-badge {
  display: inline-block;
  background: #0c2738;
  color: #38bdf8;
  border: 1px solid #164e63;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 11px;
  letter-spacing: 1.5px;
  font-weight: 700;
  margin-bottom: 12px;
}

.sea-header h1 {
  font-size: 2.1rem;
  font-weight: 900;
  letter-spacing: -0.5px;
  color: #f0f9ff;
  margin-bottom: 8px;
}

.ocean-tagline {
  color: #94a3b8;
  font-size: 0.95rem;
  max-width: 580px;
  margin: 0 auto;
}

.ocean-tagline strong {
  color: #38bdf8;
}

.sea-hero-image {
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #164e63;
  margin: 20px 0 24px;
  box-shadow: 0 12px 30px rgba(6, 17, 24, 0.8);
}

.sea-hero-image img {
  width: 100%;
  height: 260px;
  object-fit: cover;
  display: block;
}

.sea-deck-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-bottom: 24px;
}

@media (min-width: 640px) {
  .sea-deck-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.sea-box {
  background: #091a24;
  border: 1px solid #15384d;
  border-radius: 10px;
  padding: 20px;
}

.sea-box h2 {
  font-size: 1.15rem;
  color: #38bdf8;
  margin-bottom: 14px;
}

.sea-list {
  list-style: none;
}

.sea-list li {
  position: relative;
  padding-left: 20px;
  margin-bottom: 10px;
  font-size: 0.88rem;
  color: #cbd5e1;
}

.sea-list li::before {
  content: "🌊";
  position: absolute;
  left: 0;
  font-size: 11px;
}

.cocktail-menu {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.menu-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #07151e;
  border: 1px solid #133448;
  padding: 10px 12px;
  border-radius: 6px;
}

.menu-row strong {
  display: block;
  font-size: 0.9rem;
  color: #f0f9ff;
}

.menu-row small {
  display: block;
  font-size: 0.75rem;
  color: #64748b;
}

.price-pill {
  font-family: monospace;
  font-weight: 700;
  font-size: 0.85rem;
  color: #f97316;
  background: #27140a;
  border: 1px solid #7c2d12;
  padding: 3px 8px;
  border-radius: 4px;
}

.booking-deck {
  background: linear-gradient(135deg, #0d283b 0%, #153e5c 100%);
  border: 1px solid #38bdf8;
  border-radius: 10px;
  padding: 24px;
  text-align: center;
  margin-bottom: 24px;
}

.booking-deck h2 {
  font-size: 1.25rem;
  color: #f0f9ff;
  margin-bottom: 6px;
}

.booking-deck p {
  font-size: 0.85rem;
  color: #bae6fd;
  margin-bottom: 16px;
}

.sea-btn {
  background: #f97316;
  color: #fff;
  border: none;
  font-weight: 800;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(249, 115, 22, 0.4);
  transition: all 0.2s;
}

.sea-btn:hover {
  background: #ea580c;
  transform: translateY(-1px);
}

.sea-footer {
  text-align: center;
  font-size: 0.75rem;
  color: #475569;
  padding-bottom: 12px;
}`,
    },
  },
];

async function seed() {
  console.log("🌱 Starting Indonesian coffee shop showcase seed...");

  for (const item of SEED_SHOWCASES) {
    console.log(`Processing: ${item.showcase.cafeName} by ${item.participant.name}`);

    // 1. Check or insert participant
    let participantId;
    const existing = await sql(
      `SELECT id FROM participants WHERE name = $1 AND session_code = $2 LIMIT 1`,
      [item.participant.name, item.participant.sessionCode]
    );

    if (existing.length > 0) {
      participantId = existing[0].id;
      console.log(`  Found existing participant: ${participantId}`);
    } else {
      const inserted = await sql(
        `INSERT INTO participants (name, session_code, current_step, completed_steps, html_draft, css_draft)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id`,
        [
          item.participant.name,
          item.participant.sessionCode,
          item.participant.currentStep,
          JSON.stringify(item.participant.completedSteps),
          item.showcase.htmlCode,
          item.showcase.cssCode,
        ]
      );
      participantId = inserted[0].id;
      console.log(`  Created participant: ${participantId}`);
    }

    // 2. Check or insert showcase
    const existingShowcase = await sql(
      `SELECT id FROM showcases WHERE cafe_name = $1 LIMIT 1`,
      [item.showcase.cafeName]
    );

    if (existingShowcase.length > 0) {
      console.log(`  Showcase already exists for ${item.showcase.cafeName}, updating code & likes...`);
      await sql(
        `UPDATE showcases SET html_code = $1, css_code = $2, likes_count = $3, updated_at = NOW() WHERE id = $4`,
        [item.showcase.htmlCode, item.showcase.cssCode, item.showcase.likesCount, existingShowcase[0].id]
      );
    } else {
      await sql(
        `INSERT INTO showcases (participant_id, cafe_name, html_code, css_code, likes_count, is_approved)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          participantId,
          item.showcase.cafeName,
          item.showcase.htmlCode,
          item.showcase.cssCode,
          item.showcase.likesCount,
          true,
        ]
      );
      console.log(`  Inserted showcase for ${item.showcase.cafeName}`);
    }
  }

  const count = await sql(`SELECT count(*) FROM showcases`);
  console.log(`✅ Seeding complete! Total showcases in database: ${count[0].count}`);
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
