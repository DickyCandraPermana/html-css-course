import { neon } from "@neondatabase/serverless";

let sqlInstance;
function getSql() {
  if (!sqlInstance) {
    if (!process.env.DATABASE_URL) {
      console.error("DATABASE_URL is not set in environment!");
      process.exit(1);
    }
    sqlInstance = neon(process.env.DATABASE_URL);
  }
  return sqlInstance;
}

export const SEED_SHOWCASES = [
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
    <nav class="navbar">
      <div class="logo">☕ Pawon Klotok</div>
      <div class="nav-links">
        <a href="#fasilitas">Fasilitas</a>
        <a href="#menu">Menu Pawon</a>
        <a href="#reservasi">Reservasi Bale</a>
      </div>
    </nav>

    <header class="pawon-header">
      <div class="badge-pawon">PAWON JOGJA // EST. 1984</div>
      <h1>Kopi Klotok & Pawon Ndeso</h1>
      <p class="tagline">
        Seduhan arang <strong>tungku kayu bakar</strong> & kehangatan pisang kepok panas di lereng <em>Gunung Merapi</em>.
      </p>
      <hr class="garis-motif">
      <img src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=900" alt="Suasana Pawon Kopi Klotok Pedesaan">
    </header>

    <div id="fasilitas" class="card-seksi">
      <h2>Kenyamanan & Suasana Pedesaan</h2>
      <ul class="list-pawon">
        <li>Bale bambu lesehan dengan semilir angin sawah terasering</li>
        <li>Seduhan kopi tradisional langsung dari cerek tembaga mendidih</li>
        <li>Pisang goreng kepok kuning dan jadah bakar panas setiap jam</li>
        <li>Area parkir luas, mushola joglo kayu, dan bebas polusi kota</li>
      </ul>
      <p><a href="#menu" class="btn-tautan">Lihat Daftar Seduhan &rarr;</a></p>
    </div>

    <div id="menu" class="card-seksi">
      <h2>Sajian Khas Tungku & Wedangan</h2>
      <table class="tabel-pawon">
        <thead>
          <tr>
            <th>Kategori</th>
            <th>Menu Pawon</th>
            <th>Harga</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Seduhan Arang</td>
            <td>Kopi Klotok Gula Aren <mark>Favorit</mark></td>
            <td>Rp 12.000</td>
          </tr>
          <tr>
            <td>Rempah Alami</td>
            <td>Wedang Uwuh Secang Jahe</td>
            <td>Rp 14.000</td>
          </tr>
          <tr>
            <td>Gorengan Hangat</td>
            <td>Pisang Goreng Kepok Garing</td>
            <td>Rp 15.000</td>
          </tr>
          <tr>
            <td>Camilan Bakar</td>
            <td>Jadah Bakar Gurih Daun Pisang</td>
            <td>Rp 10.000</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div id="reservasi" class="card-seksi form-box">
      <h2>Pesan Bale Lesehan Rombongan</h2>
      <form id="form-reservasi" class="form-pawon" onsubmit="alert('Matur nuwun! Bale lesehan Anda telah disiapkan.'); return false;">
        <div class="form-group">
          <label for="nama">Nama Lengkap Pemesan:</label>
          <input type="text" id="nama" name="nama" required placeholder="Contoh: Pak Rahardjo">
        </div>
        <div class="form-group">
          <label for="tanggal">Tanggal Kunjungan:</label>
          <input type="date" id="tanggal" name="tanggal" required>
        </div>
        <div class="form-group">
          <label for="kursi">Jumlah Tamu (Orang):</label>
          <input type="number" id="kursi" name="kursi" min="1" value="4" required>
        </div>
        <div class="form-group">
          <label>Pilihan Tempat Duduk:</label>
          <label class="radio-label"><input type="radio" name="area" value="bale" checked> Bale Lesehan Pinggir Sawah</label>
          <label class="radio-label"><input type="radio" name="area" value="joglo"> Ruang Joglo Utama</label>
        </div>
        <div class="form-group">
          <label for="sesi">Pilih Waktu Kedatangan:</label>
          <select id="sesi" name="sesi">
            <option value="pagi">Sesi Sarapan Pagi (07.00 - 10.00)</option>
            <option value="sore">Sesi Senja Sawah (15.30 - 18.00)</option>
          </select>
        </div>
        <div class="form-group">
          <label for="catatan">Catatan / Permintaan Pisang Kepok:</label>
          <textarea id="catatan" name="catatan" rows="3" placeholder="Contoh: Mohon siapkan 2 porsi pisang goreng hangat saat rombongan tiba..."></textarea>
        </div>
        <button type="submit" class="btn-pawon">Konfirmasi Reservasi Bale</button>
      </form>
    </div>

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
  background-color: #17110c;
  color: #f5ebd9;
  font-family: 'Plus Jakarta Sans', sans-serif;
  line-height: 1.7;
  padding: 24px 16px;
}

.pawon-container {
  max-width: 820px;
  margin: 0 auto;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background-color: #231811;
  border: 1px solid #3d2b1f;
  border-radius: 10px;
  margin-bottom: 24px;
}

.logo {
  font-weight: 700;
  font-size: 15px;
  color: #e07a3f;
}

.nav-links {
  display: flex;
  gap: 16px;
}

.nav-links a {
  color: #d1b89d;
  text-decoration: none;
  font-size: 13px;
  transition: color 0.2s;
}

.nav-links a:hover {
  color: #f5ebd9;
}

.pawon-header {
  background: linear-gradient(135deg, #2a1a11 0%, #190f09 100%);
  border: 1px solid #4a3224;
  border-radius: 12px;
  text-align: center;
  padding: 28px 20px 24px;
  margin-bottom: 24px;
}

.badge-pawon {
  display: inline-block;
  font-family: monospace;
  font-size: 11px;
  letter-spacing: 2px;
  background: #382114;
  color: #e07a3f;
  padding: 4px 12px;
  border-radius: 4px;
  margin-bottom: 12px;
}

.pawon-header h1 {
  font-size: 26px;
  color: #fceddb;
  margin-bottom: 8px;
}

.tagline {
  color: #c9b099;
  font-size: 14px;
  margin-bottom: 16px;
}

.garis-motif {
  border: none;
  height: 1px;
  background: #4a3224;
  margin: 16px 0 20px;
}

.pawon-header img {
  width: 100%;
  max-height: 340px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #4a3224;
}

.card-seksi {
  background: linear-gradient(135deg, #22150e 0%, #150c07 100%);
  border: 1px solid #3d291c;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
}

.card-seksi h2 {
  font-size: 18px;
  color: #e07a3f;
  margin-bottom: 16px;
  border-bottom: 1px dashed #3d291c;
  padding-bottom: 8px;
}

.list-pawon {
  list-style: none;
  margin-bottom: 16px;
}

.list-pawon li {
  position: relative;
  padding-left: 20px;
  margin-bottom: 10px;
  font-size: 14px;
  color: #dfcdb9;
}

.list-pawon li::before {
  content: "✦";
  position: absolute;
  left: 0;
  color: #e07a3f;
}

.btn-tautan {
  display: inline-block;
  color: #e07a3f;
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
  transition: transform 0.2s;
}

.btn-tautan:hover {
  transform: translateX(4px);
  color: #f7a06d;
}

.tabel-pawon {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.tabel-pawon th,
.tabel-pawon td {
  padding: 12px 14px;
  text-align: left;
  border-bottom: 1px solid #332014;
}

.tabel-pawon th {
  background-color: #2b1a10;
  color: #e07a3f;
  font-weight: 600;
}

mark {
  background-color: #e07a3f;
  color: #17110c;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: bold;
}

.form-group {
  margin-bottom: 14px;
}

.form-group label {
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: #c9b099;
  margin-bottom: 6px;
}

.radio-label {
  display: inline-flex !important;
  align-items: center;
  gap: 8px;
  margin-right: 16px;
  font-weight: normal !important;
  cursor: pointer;
}

.form-group input[type="text"],
.form-group input[type="date"],
.form-group input[type="number"],
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px 14px;
  background-color: #120905;
  border: 1px solid #3d291c;
  border-radius: 6px;
  color: #f5ebd9;
  font-size: 13px;
  outline: none;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #e07a3f;
}

.btn-pawon {
  background-color: #d97736;
  color: #17110c;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-pawon:hover {
  background-color: #f38f4d;
  transform: translateY(-2px);
}

.pawon-footer {
  text-align: center;
  font-size: 12px;
  color: #7d6550;
  padding-top: 12px;
  border-top: 1px dashed #332014;
}`,
    },
  },
  {
    participant: {
      name: "Siti Rahmawati",
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
    <nav class="navbar">
      <div class="logo">☕ AROMA SELAT</div>
      <div class="nav-links">
        <a href="#fasilitas">Keunggulan</a>
        <a href="#menu">Menu Sarapan</a>
        <a href="#reservasi">Pesan Meja</a>
      </div>
    </nav>

    <header class="kopitiam-head">
      <div class="chinese-sign">聯 成 咖 啡 棧 // EST. 1968</div>
      <h1>WARUNG KOPI TIAM AROMA SELAT</h1>
      <p class="sub">
        Kopi saring tarik arang & roti srikaya panggang sejak <strong>1968</strong> dengan resep <em>turun-temurun</em>.
      </p>
      <hr class="garis-tiam">
      <img src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=900" alt="Cangkir Kopi Tarik Kopitiam Jadul">
    </header>

    <div id="fasilitas" class="card-tiam">
      <h2>Keunggulan Racikan Kopi Selat</h2>
      <ul class="tiam-list">
        <li>Biji kopi liberika lokal pilihan disangrai dengan resep turun-temurun</li>
        <li>Kain saring tarik tinggi menghasilkan busa halus dan rasa mantap</li>
        <li>Selai srikaya buatan sendiri dari telur bebek dan santan kental murni</li>
        <li>Meja marmer klasik dingin dan suasana hangat percakapan warga kota</li>
      </ul>
      <p><a href="#menu" class="link-menu">Buka Menu Sarapan &rarr;</a></p>
    </div>

    <div id="menu" class="card-tiam">
      <h2>Daftar Pesanan & Kwitansi</h2>
      <table class="nota-table">
        <thead>
          <tr>
            <th>Kategori</th>
            <th>Nama Pesanan</th>
            <th>Harga</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Minuman Panas</td>
            <td>Kopi O Panas Pekat</td>
            <td>Rp 9.000</td>
          </tr>
          <tr>
            <td>Es Segar</td>
            <td>Kopi Susu Tarik Peng <mark>Favorit</mark></td>
            <td>Rp 13.000</td>
          </tr>
          <tr>
            <td>Panggangan</td>
            <td>Roti Panggang Srikaya Mentega</td>
            <td>Rp 12.000</td>
          </tr>
          <tr>
            <td>Sarapan Pagi</td>
            <td>Telur Ayam Setengah Matang (2 Butir)</td>
            <td>Rp 8.000</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div id="reservasi" class="card-tiam form-reservasi-box">
      <h2>Pesan Meja Marmer Rombongan</h2>
      <form id="form-reservasi" class="form-tiam" onsubmit="alert('Terima kasih! Meja marmer sarapan Anda telah diamankan.'); return false;">
        <div class="form-group">
          <label for="nama">Nama Pemesan:</label>
          <input type="text" id="nama" name="nama" placeholder="Contoh: Koh Hendra" required>
        </div>
        <div class="form-group">
          <label for="tanggal">Tanggal Kunjungan:</label>
          <input type="date" id="tanggal" name="tanggal" required>
        </div>
        <div class="form-group">
          <label for="kursi">Jumlah Kursi:</label>
          <input type="number" id="kursi" name="kursi" min="1" value="2" required>
        </div>
        <div class="form-group">
          <label>Pilihan Area:</label>
          <label class="radio-label"><input type="radio" name="area" value="marmer" checked> Meja Marmer Dalam</label>
          <label class="radio-label"><input type="radio" name="area" value="teras"> Teras Depan Pasar</label>
        </div>
        <div class="form-group">
          <label for="sesi">Pilih Waktu Kedatangan:</label>
          <select id="sesi" name="sesi">
            <option value="pagi">Sesi Pagi (06.00 - 09.00)</option>
            <option value="siang">Sesi Siang (10.00 - 13.00)</option>
          </select>
        </div>
        <div class="form-group">
          <label for="catatan">Catatan Meja:</label>
          <textarea id="catatan" name="catatan" rows="3" placeholder="Contoh: Roti srikaya disajikan hangat begitu kami duduk..."></textarea>
        </div>
        <button type="submit" class="btn-tiam">Amankan Kursi Meja Marmer</button>
      </form>
    </div>

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
  background-color: #081712;
  color: #edf7f2;
  font-family: 'Plus Jakarta Sans', sans-serif;
  line-height: 1.6;
  padding: 24px 16px;
}

.kopitiam-wrap {
  max-width: 820px;
  margin: 0 auto;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 18px;
  background-color: #0e271f;
  border: 1px solid #1a4235;
  border-radius: 8px;
  margin-bottom: 24px;
}

.logo {
  font-weight: bold;
  color: #34d399;
  font-size: 14px;
  letter-spacing: 1px;
}

.nav-links {
  display: flex;
  gap: 16px;
}

.nav-links a {
  color: #a7d9c6;
  text-decoration: none;
  font-size: 13px;
  transition: color 0.2s;
}

.nav-links a:hover {
  color: #ffffff;
}

.kopitiam-head {
  background: linear-gradient(135deg, #102e24 0%, #061611 100%);
  border: 1px solid #1e4d3d;
  border-radius: 10px;
  text-align: center;
  padding: 28px 20px;
  margin-bottom: 24px;
}

.chinese-sign {
  font-family: monospace;
  font-size: 12px;
  letter-spacing: 3px;
  color: #fbbf24;
  margin-bottom: 8px;
}

.kopitiam-head h1 {
  font-size: 24px;
  color: #ffffff;
  letter-spacing: 1px;
  margin-bottom: 8px;
}

.sub {
  color: #a7d9c6;
  font-size: 14px;
  margin-bottom: 16px;
}

.garis-tiam {
  border: none;
  height: 1px;
  background: #1e4d3d;
  margin: 16px 0 20px;
}

.kopitiam-head img {
  width: 100%;
  max-height: 320px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #1e4d3d;
}

.card-tiam {
  background: linear-gradient(135deg, #0d261e 0%, #081712 100%);
  border: 1px solid #183e31;
  border-radius: 10px;
  padding: 24px;
  margin-bottom: 24px;
}

.card-tiam h2 {
  font-size: 17px;
  color: #34d399;
  margin-bottom: 16px;
  border-bottom: 1px dashed #1e4d3d;
  padding-bottom: 8px;
}

.tiam-list {
  list-style: none;
  margin-bottom: 14px;
}

.tiam-list li {
  padding-left: 20px;
  position: relative;
  font-size: 14px;
  color: #cce7dc;
  margin-bottom: 8px;
}

.tiam-list li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #34d399;
}

.link-menu {
  color: #34d399;
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
}

.link-menu:hover {
  text-decoration: underline;
}

.nota-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.nota-table th,
.nota-table td {
  padding: 12px 14px;
  text-align: left;
  border-bottom: 1px solid #163a2e;
}

.nota-table th {
  background-color: #133529;
  color: #34d399;
}

mark {
  background-color: #059669;
  color: #ffffff;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 11px;
}

.form-group {
  margin-bottom: 14px;
}

.form-group label {
  display: block;
  font-size: 12px;
  color: #a7d9c6;
  margin-bottom: 6px;
}

.radio-label {
  display: inline-flex !important;
  align-items: center;
  gap: 8px;
  margin-right: 16px;
  color: #edf7f2 !important;
  cursor: pointer;
}

.form-group input[type="text"],
.form-group input[type="date"],
.form-group input[type="number"],
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px 12px;
  background-color: #05100c;
  border: 1px solid #1a4235;
  border-radius: 6px;
  color: #edf7f2;
  font-size: 13px;
  outline: none;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #34d399;
}

.btn-tiam {
  background-color: #059669;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-tiam:hover {
  background-color: #10b981;
  transform: translateY(-2px);
}

.kopitiam-foot {
  text-align: center;
  font-size: 12px;
  color: #558774;
  padding-top: 14px;
  border-top: 1px dashed #163a2e;
}`,
    },
  },
  {
    participant: {
      name: "Rian Hidayat",
      sessionCode: "bandung-roasters",
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
  <div class="roastery-shell">
    <nav class="navbar">
      <div class="logo">⚡ KALENG & SUNYI</div>
      <div class="nav-links">
        <a href="#fasilitas">Lab Spek</a>
        <a href="#menu">Beans</a>
        <a href="#reservasi">Sesi Cupping</a>
      </div>
    </nav>

    <header class="roastery-header">
      <div class="spec-label">LAB // ROASTING BATCH #049</div>
      <h1>KALENG & SUNYI // MICRO ROASTERY</h1>
      <p class="manifesto">
        Eksperimen profil sangrai <strong>aerobic fermentation</strong> & manual brew presisi dalam ruang kedap <em>minimalis</em>.
      </p>
      <hr class="divider-line">
      <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900" alt="Ruang Mesin Roasting dan Bar Kaleng Sunyi">
    </header>

    <div id="fasilitas" class="brutal-card">
      <h2>SPESIFIKASI RUANG & PERANGKAT SEDUH</h2>
      <ul class="spec-list">
        <li>Mesin Roaster Giesen W6A dengan pencatatan curve Artisan real-time</li>
        <li>Water filtration system remineralized Magnesium 120 ppm</li>
        <li>Ruang kedap akustik dengan playlist lo-fi ambient tape deck</li>
        <li>Tersedia cold brew kaleng nitrogen dingin untuk dibawa pulang</li>
      </ul>
      <p><a href="#menu" class="btn-mono">CEK BEANS CATALOG &rarr;</a></p>
    </div>

    <div id="menu" class="brutal-card">
      <h2>DAILY BATCH CATALOGUE</h2>
      <table class="data-table">
        <thead>
          <tr>
            <th>Origin</th>
            <th>Proses & Profil</th>
            <th>Harga Seduh</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Kerinci Kayu Aro</td>
            <td>Anaerobic Natural, Notes: Strawberry Candy <mark>Favorit</mark></td>
            <td>Rp 32.000</td>
          </tr>
          <tr>
            <td>Gunung Halu</td>
            <td>Honey Washed, Notes: Jasmine Green Tea</td>
            <td>Rp 28.000</td>
          </tr>
          <tr>
            <td>Aceh Pantan Musara</td>
            <td>Full Washed, Notes: Citrus & Bergamot</td>
            <td>Rp 30.000</td>
          </tr>
          <tr>
            <td>Nitro Cold Brew</td>
            <td>Kaleng 250ml Siap Minum</td>
            <td>Rp 25.000</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div id="reservasi" class="brutal-card">
      <h2>BOOKING SESI SENSORY CUPPING</h2>
      <form id="form-reservasi" class="brutal-form" onsubmit="alert('Seat cupping session confirmed.'); return false;">
        <div class="field-row">
          <label for="nama">KODE PESERTA / NAMA:</label>
          <input type="text" id="nama" name="nama" placeholder="Contoh: Rian Hidayat" required>
        </div>
        <div class="field-row">
          <label for="tanggal">TANGGAL SESI:</label>
          <input type="date" id="tanggal" name="tanggal" required>
        </div>
        <div class="field-row">
          <label for="kursi">JUMLAH SEAT (MAKS 4):</label>
          <input type="number" id="kursi" name="kursi" min="1" max="4" value="1" required>
        </div>
        <div class="field-row">
          <label>AREA TESTING:</label>
          <label class="radio-label"><input type="radio" name="area" value="bar" checked> Slow Bar Tasting</label>
          <label class="radio-label"><input type="radio" name="area" value="lab"> Roastery Lab Table</label>
        </div>
        <div class="field-row">
          <label for="sesi">BATCH WAKTU:</label>
          <select id="sesi" name="sesi">
            <option value="batch1">Slot 1 (13.00 - 15.00 WIB)</option>
            <option value="batch2">Slot 2 (19.00 - 21.00 WIB)</option>
          </select>
        </div>
        <div class="field-row">
          <label for="catatan">CATATAN PREFERENSI CUPPING:</label>
          <textarea id="catatan" name="catatan" rows="3" placeholder="Sebutkan tingkat toleransi acidity atau proses fermentasi yang ingin dicoba..."></textarea>
        </div>
        <button type="submit" class="submit-brutal">KUNCI RESERVASI SEAT</button>
      </form>
    </div>

    <footer class="roastery-foot">
      KALENG & SUNYI // JL. DAGO PAKAR NO. 14, BANDUNG // ALL RIGHTS RESERVED
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
  background-color: #0c0c0d;
  color: #e4e4e7;
  font-family: 'Plus Jakarta Sans', monospace, sans-serif;
  line-height: 1.6;
  padding: 24px 16px;
}

.roastery-shell {
  max-width: 820px;
  margin: 0 auto;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 18px;
  background-color: #141416;
  border: 1px solid #27272a;
  border-radius: 6px;
  margin-bottom: 24px;
}

.logo {
  font-weight: 800;
  font-size: 13px;
  color: #facc15;
  letter-spacing: 2px;
}

.nav-links {
  display: flex;
  gap: 16px;
}

.nav-links a {
  color: #a1a1aa;
  text-decoration: none;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: color 0.2s;
}

.nav-links a:hover {
  color: #ffffff;
}

.roastery-header {
  background: linear-gradient(135deg, #18181b 0%, #09090b 100%);
  border: 1px solid #27272a;
  border-radius: 8px;
  padding: 28px 20px;
  margin-bottom: 24px;
}

.spec-label {
  font-family: monospace;
  font-size: 11px;
  color: #facc15;
  margin-bottom: 10px;
  letter-spacing: 2px;
}

.roastery-header h1 {
  font-size: 24px;
  font-weight: 900;
  color: #ffffff;
  letter-spacing: 1px;
  margin-bottom: 8px;
}

.manifesto {
  color: #a1a1aa;
  font-size: 14px;
  margin-bottom: 16px;
}

.divider-line {
  border: none;
  height: 1px;
  background: #27272a;
  margin: 16px 0 20px;
}

.roastery-header img {
  width: 100%;
  max-height: 320px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #27272a;
  filter: grayscale(20%);
}

.brutal-card {
  background: linear-gradient(135deg, #141416 0%, #09090b 100%);
  border: 1px solid #27272a;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;
}

.brutal-card h2 {
  font-size: 14px;
  letter-spacing: 2px;
  color: #facc15;
  margin-bottom: 16px;
  border-bottom: 1px dashed #27272a;
  padding-bottom: 8px;
}

.spec-list {
  list-style: none;
  margin-bottom: 14px;
}

.spec-list li {
  padding-left: 20px;
  position: relative;
  font-size: 13px;
  color: #d4d4d8;
  margin-bottom: 8px;
}

.spec-list li::before {
  content: "→";
  position: absolute;
  left: 0;
  color: #facc15;
}

.btn-mono {
  display: inline-block;
  color: #facc15;
  text-decoration: none;
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: bold;
}

.btn-mono:hover {
  text-decoration: underline;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.data-table th,
.data-table td {
  padding: 12px 14px;
  text-align: left;
  border-bottom: 1px solid #27272a;
}

.data-table th {
  background-color: #1f1f23;
  color: #facc15;
  font-size: 12px;
  letter-spacing: 1px;
}

mark {
  background-color: #facc15;
  color: #000000;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 11px;
  font-weight: bold;
}

.field-row {
  margin-bottom: 14px;
}

.field-row label {
  display: block;
  font-size: 11px;
  letter-spacing: 1px;
  color: #a1a1aa;
  margin-bottom: 6px;
}

.radio-label {
  display: inline-flex !important;
  align-items: center;
  gap: 8px;
  margin-right: 16px;
  color: #e4e4e7 !important;
  cursor: pointer;
}

.field-row input[type="text"],
.field-row input[type="date"],
.field-row input[type="number"],
.field-row select,
.field-row textarea {
  width: 100%;
  padding: 10px 12px;
  background-color: #09090b;
  border: 1px solid #27272a;
  border-radius: 4px;
  color: #ffffff;
  font-family: monospace;
  font-size: 12px;
  outline: none;
  transition: border-color 0.2s;
}

.field-row input:focus,
.field-row select:focus,
.field-row textarea:focus {
  border-color: #facc15;
}

.submit-brutal {
  background-color: #facc15;
  color: #000000;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  font-weight: 800;
  font-size: 12px;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.2s;
}

.submit-brutal:hover {
  background-color: #fde047;
  transform: translateY(-2px);
}

.roastery-foot {
  text-align: center;
  font-size: 11px;
  color: #71717a;
  letter-spacing: 1px;
  padding-top: 14px;
  border-top: 1px dashed #27272a;
}`,
    },
  },
  {
    participant: {
      name: "Dewi Sekar Sari",
      sessionCode: "solo-klangenan-lab",
      currentStep: 7,
      completedSteps: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    showcase: {
      cafeName: "Kopi Tubruk Sudut Pasar Triwindu",
      likesCount: 47,
      htmlCode: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kopi Tubruk Sudut Pasar Triwindu</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="triwindu-wrapper">
    <nav class="navbar">
      <div class="logo">☕ SUDUT TRIWINDU</div>
      <div class="nav-links">
        <a href="#fasilitas">Suasana</a>
        <a href="#menu">Wedangan</a>
        <a href="#reservasi">Booking</a>
      </div>
    </nav>

    <header class="triwindu-header">
      <div class="tag-lawasan">KLANGENAN SURAKARTA // EST. 1978</div>
      <h1>Kopi Tubruk Sudut Pasar Triwindu</h1>
      <p class="intro">
        Kopi tubruk kental bergula batu diapit deretan <strong>benda antik lawasan</strong> dan lantunan <em>kroncong tempo doeloe</em>.
      </p>
      <hr class="garis-kayu">
      <img src="https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=900" alt="Kedai Kopi Antik Pasar Triwindu Solo">
    </header>

    <div id="fasilitas" class="card-lawas">
      <h2>Suasana & Kenyamanan Bernostalgia</h2>
      <ul class="list-lawas">
        <li>Duduk di kursi sedan jati otentik tahun 1950-an dan radio tabung tua</li>
        <li>Seduhan kopi robusta Jawa klasik dengan ampas kental dan aroma harum</li>
        <li>Koleksi piring enamel blirik, cangkir seng loreng, dan stoples kuno</li>
        <li>Tepat di jantung pasar barang antik legendaris Triwindu Solo</li>
      </ul>
      <p><a href="#menu" class="link-wedangan">Lihat Pilihan Wedangan &rarr;</a></p>
    </div>

    <div id="menu" class="card-lawas">
      <h2>Daftar Wedangan & Klangenan</h2>
      <table class="tabel-lawas">
        <thead>
          <tr>
            <th>Kategori</th>
            <th>Nama Wedangan</th>
            <th>Harga</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Tubruk Murni</td>
            <td>Kopi Tubruk Gula Batu <mark>Favorit</mark></td>
            <td>Rp 11.000</td>
          </tr>
          <tr>
            <td>Rempah Solo</td>
            <td>Wedang Dongo Jahe Kacang</td>
            <td>Rp 15.000</td>
          </tr>
          <tr>
            <td>Tradisional</td>
            <td>Teh Ginastel (Legi Panas Kentel)</td>
            <td>Rp 8.000</td>
          </tr>
          <tr>
            <td>Camilan Pasar</td>
            <td>Serabi Gulung Solo Santan</td>
            <td>Rp 12.000</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div id="reservasi" class="card-lawas">
      <h2>Pesan Meja Lawasan Sore</h2>
      <form id="form-reservasi" class="form-lawas" onsubmit="alert('Sampun kuncen! Meja antik Anda telah kami siapkan.'); return false;">
        <div class="grup-input">
          <label for="nama">Nama Pemesan:</label>
          <input type="text" id="nama" name="nama" placeholder="Contoh: Bu Sekar" required>
        </div>
        <div class="grup-input">
          <label for="tanggal">Tanggal Kunjungan:</label>
          <input type="date" id="tanggal" name="tanggal" required>
        </div>
        <div class="grup-input">
          <label for="kursi">Jumlah Tamu:</label>
          <input type="number" id="kursi" name="kursi" min="1" value="2" required>
        </div>
        <div class="grup-input">
          <label>Pilihan Area Duduk:</label>
          <label class="radio-label"><input type="radio" name="area" value="teras" checked> Kursi Sedan Teras Pasar</label>
          <label class="radio-label"><input type="radio" name="area" value="dalam"> Pojok Radio Tabung Antik</label>
        </div>
        <div class="grup-input">
          <label for="sesi">Waktu Kunjungan:</label>
          <select id="sesi" name="sesi">
            <option value="sore">Sore Santai (15.00 - 17.30 WIB)</option>
            <option value="malam">Malam Teduh (18.30 - 21.00 WIB)</option>
          </select>
        </div>
        <div class="grup-input">
          <label for="catatan">Catatan Meja:</label>
          <textarea id="catatan" name="catatan" rows="3" placeholder="Contoh: Mohon meja dekat lampu minyak antik..."></textarea>
        </div>
        <button type="submit" class="tombol-lawas">Konfirmasi Reservasi</button>
      </form>
    </div>

    <footer class="footer-lawas">
      Kopi Tubruk Sudut Pasar Triwindu // Keprabon, Banjarsari, Kota Surakarta // Solo Tempo Doeloe
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
  background-color: #191410;
  color: #faebd7;
  font-family: 'Plus Jakarta Sans', Georgia, serif;
  line-height: 1.7;
  padding: 24px 16px;
}

.triwindu-wrapper {
  max-width: 820px;
  margin: 0 auto;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 18px;
  background-color: #261e18;
  border: 1px solid #403228;
  border-radius: 8px;
  margin-bottom: 24px;
}

.logo {
  font-weight: bold;
  color: #f59e0b;
  font-size: 14px;
}

.nav-links {
  display: flex;
  gap: 16px;
}

.nav-links a {
  color: #d1bda9;
  text-decoration: none;
  font-size: 13px;
  transition: color 0.2s;
}

.nav-links a:hover {
  color: #faebd7;
}

.triwindu-header {
  background: linear-gradient(135deg, #2b2018 0%, #150f0c 100%);
  border: 1px solid #48372b;
  border-radius: 10px;
  text-align: center;
  padding: 28px 20px;
  margin-bottom: 24px;
}

.tag-lawasan {
  font-family: monospace;
  font-size: 11px;
  letter-spacing: 2px;
  color: #f59e0b;
  margin-bottom: 8px;
}

.triwindu-header h1 {
  font-size: 25px;
  color: #ffffff;
  margin-bottom: 8px;
}

.intro {
  color: #cfb9a3;
  font-size: 14px;
  margin-bottom: 16px;
}

.garis-kayu {
  border: none;
  height: 1px;
  background: #48372b;
  margin: 16px 0 20px;
}

.triwindu-header img {
  width: 100%;
  max-height: 320px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #48372b;
}

.card-lawas {
  background: linear-gradient(135deg, #221812 0%, #130d0a 100%);
  border: 1px solid #3c2d22;
  border-radius: 10px;
  padding: 24px;
  margin-bottom: 24px;
}

.card-lawas h2 {
  font-size: 17px;
  color: #f59e0b;
  margin-bottom: 16px;
  border-bottom: 1px dashed #3c2d22;
  padding-bottom: 8px;
}

.list-lawas {
  list-style: none;
  margin-bottom: 14px;
}

.list-lawas li {
  padding-left: 20px;
  position: relative;
  font-size: 14px;
  color: #e5d3c0;
  margin-bottom: 8px;
}

.list-lawas li::before {
  content: "♦";
  position: absolute;
  left: 0;
  color: #f59e0b;
}

.link-wedangan {
  color: #f59e0b;
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
}

.link-wedangan:hover {
  text-decoration: underline;
}

.tabel-lawas {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.tabel-lawas th,
.tabel-lawas td {
  padding: 12px 14px;
  text-align: left;
  border-bottom: 1px solid #33241b;
}

.tabel-lawas th {
  background-color: #2d1f17;
  color: #f59e0b;
}

mark {
  background-color: #d97706;
  color: #ffffff;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 11px;
}

.grup-input {
  margin-bottom: 14px;
}

.grup-input label {
  display: block;
  font-size: 12px;
  color: #cfb9a3;
  margin-bottom: 6px;
}

.radio-label {
  display: inline-flex !important;
  align-items: center;
  gap: 8px;
  margin-right: 16px;
  color: #faebd7 !important;
  cursor: pointer;
}

.grup-input input[type="text"],
.grup-input input[type="date"],
.grup-input input[type="number"],
.grup-input select,
.grup-input textarea {
  width: 100%;
  padding: 10px 12px;
  background-color: #100b08;
  border: 1px solid #3c2d22;
  border-radius: 6px;
  color: #faebd7;
  font-size: 13px;
  outline: none;
  transition: border-color 0.2s;
}

.grup-input input:focus,
.grup-input select:focus,
.grup-input textarea:focus {
  border-color: #f59e0b;
}

.tombol-lawas {
  background-color: #d97706;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.tombol-lawas:hover {
  background-color: #f59e0b;
  transform: translateY(-2px);
}

.footer-lawas {
  text-align: center;
  font-size: 12px;
  color: #7d6550;
  padding-top: 14px;
  border-top: 1px dashed #33241b;
}`,
    },
  },
  {
    participant: {
      name: "I Putu Bayu Mahendra",
      sessionCode: "bali-beach-brew",
      currentStep: 7,
      completedSteps: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    showcase: {
      cafeName: "Kopi Pesisir Senja Laut",
      likesCount: 59,
      htmlCode: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kopi Pesisir Senja Laut</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="pesisir-wrapper">
    <nav class="navbar">
      <div class="logo">🌊 SENJA LAUT</div>
      <div class="nav-links">
        <a href="#fasilitas">Pantai</a>
        <a href="#menu">Minuman</a>
        <a href="#reservasi">Booking Sunset</a>
      </div>
    </nav>

    <header class="pesisir-header">
      <div class="coastal-badge">BATU BELIG BEACH // EST. 2021</div>
      <h1>Kopi Pesisir Senja Laut</h1>
      <p class="tagline">
        Menikmati deburan ombak pantai barat dengan <strong>cold brew kelapa muda</strong> saat matahari <em>terbenam</em>.
      </p>
      <hr class="garis-pantai">
      <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900" alt="Suasana Senja Pantai Tempat Ngopi">
    </header>

    <div id="fasilitas" class="card-pantai">
      <h2>Kenyamanan Tepi Ombak Pasir Putih</h2>
      <ul class="list-pantai">
        <li>Beanbag empuk warna-warni tepat di atas pasir putih berangin sejuk</li>
        <li>Cold brew khas Kintamani dicampur air kelapa muda segar tanpa pemanis buatan</li>
        <li>Pemandangan matahari terbenam (golden hour) langsung tanpa terhalang gedung</li>
        <li>Outdoor sound system santai dengan petikan gitar akustik tropis</li>
      </ul>
      <p><a href="#menu" class="link-pantai">Lihat Menu Pantai &rarr;</a></p>
    </div>

    <div id="menu" class="card-pantai">
      <h2>Menu Segar Pesisir</h2>
      <table class="tabel-pantai">
        <thead>
          <tr>
            <th>Kategori</th>
            <th>Menu Minuman</th>
            <th>Harga</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Signature Cold</td>
            <td>Kopi Kelapa Senja <mark>Favorit</mark></td>
            <td>Rp 28.000</td>
          </tr>
          <tr>
            <td>Manual Brew</td>
            <td>V60 Kintamani Orange Notes</td>
            <td>Rp 26.000</td>
          </tr>
          <tr>
            <td>Espresso Tonic</td>
            <td>Sparkling Espresso Citrus</td>
            <td>Rp 27.000</td>
          </tr>
          <tr>
            <td>Camilan Pantai</td>
            <td>Pisang Karamel Tabur Kayumanis</td>
            <td>Rp 20.000</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div id="reservasi" class="card-pantai">
      <h2>Reservasi Beanbag Sunset</h2>
      <form id="form-reservasi" class="form-pantai" onsubmit="alert('Suksma! Spot beanbag sunset Anda telah dicatat.'); return false;">
        <div class="form-group">
          <label for="nama">Nama Pemesan:</label>
          <input type="text" id="nama" name="nama" placeholder="Contoh: Bayu Mahendra" required>
        </div>
        <div class="form-group">
          <label for="tanggal">Tanggal Kunjungan:</label>
          <input type="date" id="tanggal" name="tanggal" required>
        </div>
        <div class="form-group">
          <label for="kursi">Jumlah Orang (Beanbag):</label>
          <input type="number" id="kursi" name="kursi" min="1" value="2" required>
        </div>
        <div class="form-group">
          <label>Pilihan Baris Duduk:</label>
          <label class="radio-label"><input type="radio" name="area" value="depan" checked> Baris Terdepan Pinggir Ombak</label>
          <label class="radio-label"><input type="radio" name="area" value="dek"> Area Dek Kayu Berpayung</label>
        </div>
        <div class="form-group">
          <label for="sesi">Slot Waktu:</label>
          <select id="sesi" name="sesi">
            <option value="sunset">Sunset Golden Hour (16.30 - 18.30 WITA)</option>
            <option value="malam">Bintang Malam Pesisir (19.00 - 22.00 WITA)</option>
          </select>
        </div>
        <div class="form-group">
          <label for="catatan">Catatan Reservasi:</label>
          <textarea id="catatan" name="catatan" rows="3" placeholder="Contoh: Mohon spot dekat payung pantai untuk perayaan ulang tahun..."></textarea>
        </div>
        <button type="submit" class="btn-pantai">Pesan Spot Sunset Sekarang</button>
      </form>
    </div>

    <footer class="footer-pantai">
      Kopi Pesisir Senja Laut // Pantai Batu Belig, Seminyak, Bali // Open Daily 15.00 - 23.00 WITA
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
  background-color: #0b1520;
  color: #e2e8f0;
  font-family: 'Plus Jakarta Sans', sans-serif;
  line-height: 1.6;
  padding: 24px 16px;
}

.pesisir-wrapper {
  max-width: 820px;
  margin: 0 auto;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 18px;
  background-color: #112233;
  border: 1px solid #1e3a5a;
  border-radius: 8px;
  margin-bottom: 24px;
}

.logo {
  font-weight: bold;
  color: #38bdf8;
  font-size: 14px;
}

.nav-links {
  display: flex;
  gap: 16px;
}

.nav-links a {
  color: #94a3b8;
  text-decoration: none;
  font-size: 13px;
  transition: color 0.2s;
}

.nav-links a:hover {
  color: #38bdf8;
}

.pesisir-header {
  background: linear-gradient(135deg, #132a42 0%, #08131d 100%);
  border: 1px solid #22476d;
  border-radius: 10px;
  text-align: center;
  padding: 28px 20px;
  margin-bottom: 24px;
}

.coastal-badge {
  font-family: monospace;
  font-size: 11px;
  letter-spacing: 2px;
  color: #f97316;
  margin-bottom: 8px;
}

.pesisir-header h1 {
  font-size: 25px;
  color: #ffffff;
  margin-bottom: 8px;
}

.tagline {
  color: #94a3b8;
  font-size: 14px;
  margin-bottom: 16px;
}

.garis-pantai {
  border: none;
  height: 1px;
  background: #22476d;
  margin: 16px 0 20px;
}

.pesisir-header img {
  width: 100%;
  max-height: 320px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #22476d;
}

.card-pantai {
  background: linear-gradient(135deg, #0e1e2f 0%, #071018 100%);
  border: 1px solid #1a3857;
  border-radius: 10px;
  padding: 24px;
  margin-bottom: 24px;
}

.card-pantai h2 {
  font-size: 17px;
  color: #38bdf8;
  margin-bottom: 16px;
  border-bottom: 1px dashed #1a3857;
  padding-bottom: 8px;
}

.list-pantai {
  list-style: none;
  margin-bottom: 14px;
}

.list-pantai li {
  padding-left: 20px;
  position: relative;
  font-size: 14px;
  color: #cbd5e1;
  margin-bottom: 8px;
}

.list-pantai li::before {
  content: "🌊";
  position: absolute;
  left: 0;
  font-size: 12px;
}

.link-pantai {
  color: #38bdf8;
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
}

.link-pantai:hover {
  text-decoration: underline;
}

.tabel-pantai {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.tabel-pantai th,
.tabel-pantai td {
  padding: 12px 14px;
  text-align: left;
  border-bottom: 1px solid #1a3857;
}

.tabel-pantai th {
  background-color: #173250;
  color: #38bdf8;
}

mark {
  background-color: #f97316;
  color: #ffffff;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 11px;
}

.form-group {
  margin-bottom: 14px;
}

.form-group label {
  display: block;
  font-size: 12px;
  color: #94a3b8;
  margin-bottom: 6px;
}

.radio-label {
  display: inline-flex !important;
  align-items: center;
  gap: 8px;
  margin-right: 16px;
  color: #e2e8f0 !important;
  cursor: pointer;
}

.form-group input[type="text"],
.form-group input[type="date"],
.form-group input[type="number"],
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px 12px;
  background-color: #060e16;
  border: 1px solid #1e3a5a;
  border-radius: 6px;
  color: #e2e8f0;
  font-size: 13px;
  outline: none;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #38bdf8;
}

.btn-pantai {
  background-color: #0284c7;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-pantai:hover {
  background-color: #0ea5e9;
  transform: translateY(-2px);
}

.footer-pantai {
  text-align: center;
  font-size: 12px;
  color: #64748b;
  padding-top: 14px;
  border-top: 1px dashed #1a3857;
}`,
    },
  },
];

async function seed() {
  const sql = getSql();
  console.log("🌱 Mulai seeding 5 showcase otentik yang memenuhi seluruh kriteria 8 modul...");

  try {
    for (const item of SEED_SHOWCASES) {
      // 1. Check or insert participant
      const existingParticipant = await sql`
        SELECT id FROM participants WHERE name = ${item.participant.name} LIMIT 1
      `;
      let participantId;
      if (existingParticipant && existingParticipant.length > 0) {
        participantId = existingParticipant[0].id;
        await sql`
          UPDATE participants SET
            session_code = ${item.participant.sessionCode},
            current_step = ${item.participant.currentStep},
            completed_steps = ${JSON.stringify(item.participant.completedSteps)},
            html_draft = ${item.showcase.htmlCode},
            css_draft = ${item.showcase.cssCode},
            updated_at = NOW()
          WHERE id = ${participantId}
        `;
      } else {
        const generatedId = crypto.randomUUID();
        await sql`
          INSERT INTO participants (id, name, session_code, current_step, completed_steps, html_draft, css_draft, created_at, updated_at)
          VALUES (${generatedId}, ${item.participant.name}, ${item.participant.sessionCode}, ${item.participant.currentStep}, ${JSON.stringify(item.participant.completedSteps)}, ${item.showcase.htmlCode}, ${item.showcase.cssCode}, NOW(), NOW())
        `;
        participantId = generatedId;
      }

      // 2. Check or insert showcase
      const existingShowcase = await sql`
        SELECT id FROM showcases WHERE cafe_name = ${item.showcase.cafeName} LIMIT 1
      `;
      if (existingShowcase && existingShowcase.length > 0) {
        await sql`
          UPDATE showcases SET
            participant_id = ${participantId},
            html_code = ${item.showcase.htmlCode},
            css_code = ${item.showcase.cssCode},
            likes_count = ${item.showcase.likesCount},
            updated_at = NOW()
          WHERE id = ${existingShowcase[0].id}
        `;
      } else {
        const showcaseId = crypto.randomUUID();
        await sql`
          INSERT INTO showcases (id, participant_id, cafe_name, html_code, css_code, likes_count, is_approved, created_at, updated_at)
          VALUES (${showcaseId}, ${participantId}, ${item.showcase.cafeName}, ${item.showcase.htmlCode}, ${item.showcase.cssCode}, ${item.showcase.likesCount}, true, NOW(), NOW())
        `;
      }

      console.log(`✅ Berhasil seed: "${item.showcase.cafeName}" oleh ${item.participant.name}`);
    }

    console.log("🎉 Seeding 5 showcase selesai & tersimpan di Neon PostgreSQL!");
  } catch (err) {
    console.error("❌ Error saat seeding:", err);
    process.exit(1);
  }
}

if (process.argv[1] && process.argv[1].endsWith("seed-showcases.mjs")) {
  seed();
}
