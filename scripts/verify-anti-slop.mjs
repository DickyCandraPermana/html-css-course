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
      console.warn(`  ⚠️  [SLOP DETECTED (Pre-refactor baseline)] di ${relPath}: ${rule.label}`);
      fileViolations++;
    }
  }

  if (fileViolations === 0) {
    console.log(`  ✅ ${relPath}: Bersih dari pola terlarang (Skor Slop: 0/10).`);
  } else {
    console.log(`  📊 ${relPath}: Ditemukan ${fileViolations} pola slop (Perlu di-refactor pada Task implementasi).`);
  }
}

console.log("\n📋 Audit pre-refactor selesai.");
