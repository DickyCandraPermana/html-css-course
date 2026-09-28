"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Coffee, Code, Sparkles, ArrowRight, ShieldCheck, Layers, PlayCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import { MODULES } from "@/lib/curriculum";

export default function HomePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [sessionCode, setSessionCode] = useState("workshop-senja");
  const [isLoading, setIsLoading] = useState(false);
  const [existingUser, setExistingUser] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("kopicode_participant");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.name) {
            setExistingUser(parsed.name);
            setName(parsed.name);
          }
        } catch {
          // ignore
        }
      }
    }
  }, []);

  const handleStartLearning = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/participants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          sessionCode: sessionCode.trim(),
        }),
      });

      const data = await res.json();
      if (data.participant) {
        localStorage.setItem("kopicode_participant", JSON.stringify(data.participant));
        router.push("/learn");
      }
    } catch {
      // Fallback local session if offline
      const localParticipant = {
        id: "local-" + Date.now(),
        name: name.trim(),
        sessionCode: sessionCode.trim(),
        currentStep: 0,
        completedSteps: [],
      };
      localStorage.setItem("kopicode_participant", JSON.stringify(localParticipant));
      router.push("/learn");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-12 w-full">
        {/* Hero Section */}
        <div className="border border-dashed border-[#333333] bg-[#0c0c0c] p-6 sm:p-10 rounded mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 text-white pointer-events-none">
            <Coffee size={320} />
          </div>

          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1a1a1a] border border-[#333333] rounded text-xs font-mono text-amber-400 mb-6">
              <Sparkles size={13} />
              <span>INTERACTIVE WEB LAB // HTML & CSS FOUNDATION</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4 text-white">
              Belajar HTML & CSS Sambil Membangun Website Kedai Kopi_
            </h1>

            <p className="text-base text-[#aaaaaa] leading-relaxed mb-8">
              Tanpa ribet install text editor atau setup environment lokal. Pelajari materi HTML &amp; CSS
              secara bertahap, coba langsung kodenya di browser editor, atau gunakan mode cek modul
              untuk membaca materi dengan santai.
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 text-center font-mono">
              <div className="p-3 bg-[#111111] border border-[#222222] rounded">
                <div className="text-lg font-bold text-white">8 Modul</div>
                <div className="text-[10px] text-[#777777]">00 s/d 07 Lengkap</div>
              </div>
              <div className="p-3 bg-[#111111] border border-[#222222] rounded">
                <div className="text-lg font-bold text-amber-400">100% Browser</div>
                <div className="text-[10px] text-[#777777]">Sandboxed Runner</div>
              </div>
              <div className="p-3 bg-[#111111] border border-[#222222] rounded">
                <div className="text-lg font-bold text-emerald-400">Automated</div>
                <div className="text-[10px] text-[#777777]">Test Assertions</div>
              </div>
              <div className="p-3 bg-[#111111] border border-[#222222] rounded">
                <div className="text-lg font-bold text-blue-400">PostgreSQL</div>
                <div className="text-[10px] text-[#777777]">Neon Cloud Sync</div>
              </div>
            </div>

            {/* Entry Form */}
            <div className="bg-[#111111] border border-[#333333] p-5 rounded">
              <h3 className="font-mono text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Code size={15} className="text-amber-400" />
                MASUK SESI BELAJAR
              </h3>

              <form onSubmit={handleStartLearning} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-[#888888] mb-1">
                      NAMA PESERTA / NICKNAME:
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Contoh: Budi Santoso"
                      className="w-full px-3 py-2 bg-[#080808] border border-[#333333] rounded text-white text-xs font-mono focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-[#888888] mb-1">
                      KODE SESI / KELAS (OPSIONAL):
                    </label>
                    <input
                      type="text"
                      value={sessionCode}
                      onChange={(e) => setSessionCode(e.target.value)}
                      placeholder="workshop-senja"
                      className="w-full px-3 py-2 bg-[#080808] border border-[#333333] rounded text-white text-xs font-mono focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isLoading || !name.trim()}
                    className="w-full sm:w-auto px-6 py-2.5 bg-white text-black font-mono font-bold text-xs rounded hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isLoading ? "Menyiapkan Sesi..." : existingUser ? "Lanjutkan Belajar" : "Mulai Praktek Sekarang"}
                    <ArrowRight size={14} />
                  </button>

                  <Link
                    href="/learn"
                    className="bracket-framer text-xs text-[#888888] hover:text-white"
                  >
                    atau Langsung Cek Materi &rarr;
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Curriculum Roadmap Overview */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6 border-b border-dashed border-[#333333] pb-3">
            <div>
              <h2 className="text-xl font-bold font-mono tracking-tight text-white">
                ROADMAP KURIKULUM // 8 MODUL LENGKAP
              </h2>
              <p className="text-xs text-[#888888] font-mono mt-0.5">
                Alur belajar terstruktur dari dokumen HTML dasar hingga website kedai kopi utuh
              </p>
            </div>
            <Link href="/learn" className="bracket-framer text-xs">
              Buka Semua Modul
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MODULES.map((m) => (
              <div
                key={m.id}
                className="bg-[#0e0e0e] border border-[#222222] hover:border-[#444444] p-5 rounded transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#777777] mb-2">
                    <span className="text-amber-500 font-semibold">{m.badge}</span>
                    <span>MODUL 0{m.id}</span>
                  </div>

                  <h3 className="text-base font-semibold text-white group-hover:text-amber-300 transition-colors mb-2">
                    {m.title}
                  </h3>

                  <p className="text-xs text-[#888888] leading-relaxed mb-4">
                    {m.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-dashed border-[#222222] flex items-center justify-between text-[11px] font-mono text-[#666666]">
                  <span>{m.assertions.length} Uji Validasi</span>
                  <span className="text-white group-hover:translate-x-1 transition-transform">
                    &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Highlights Footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-dashed border-[#333333] pt-8 text-xs font-mono text-[#888888]">
          <div className="p-4 bg-[#0a0a0a] border border-[#1f1f1f] rounded">
            <span className="text-white font-bold block mb-1">01 // Live In-Browser Testing</span>
            Setiap baris kode langsung diuji di browser dengan petunjuk perbaikan jika ada tag atau properti yang belum tepat.
          </div>
          <div className="p-4 bg-[#0a0a0a] border border-[#1f1f1f] rounded">
            <span className="text-white font-bold block mb-1">02 // Hybrid Auto-Sync</span>
            Draft kode tersimpan otomatis di LocalStorage dan disinkronkan ke PostgreSQL Neon tanpa risiko kehilangan progress.
          </div>
          <div className="p-4 bg-[#0a0a0a] border border-[#1f1f1f] rounded">
            <span className="text-white font-bold block mb-1">03 // Showcase Gallery</span>
            Simpan hasil karya website kedai kopimu, lihat inspirasi desain peserta lain, dan pelajari kodenya.
          </div>
        </div>
      </main>

      <footer className="border-t border-dashed border-[#333333] py-6 px-4 text-center font-mono text-xs text-[#555555]">
        KopiCode // Masterclass HTML & CSS &bull; Aligned with Technical Monochrome Design
      </footer>
    </div>
  );
}
