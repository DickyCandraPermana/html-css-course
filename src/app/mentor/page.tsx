"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Shield, KeyRound, Users, CheckCircle, Clock, Eye, Code, X, RefreshCw, Presentation, BarChart3, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import SlideDeck from "@/components/SlideDeck";

interface ParticipantData {
  id: string;
  name: string;
  sessionCode: string;
  currentStep: number;
  completedSteps: number[];
  htmlDraft: string;
  cssDraft: string;
  updatedAt: string;
}

export default function MentorPage() {
  const [pin, setPin] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mentorTab, setMentorTab] = useState<"slides" | "monitoring">("slides");

  const [participantsList, setParticipantsList] = useState<ParticipantData[]>([]);
  const [totalShowcases, setTotalShowcases] = useState(0);

  // Inspector modal
  const [inspectingUser, setInspectingUser] = useState<ParticipantData | null>(null);
  const [modalTab, setModalTab] = useState<"code" | "preview">("preview");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setParticipantsList(data.participants || []);
        setTotalShowcases(data.totalShowcases || 0);
      } else {
        setErrorMsg(data.error || "PIN tidak valid.");
      }
    } catch {
      setErrorMsg("Koneksi gagal, silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });
      const data = await res.json();
      if (data.participants) {
        setParticipantsList(data.participants);
        setTotalShowcases(data.totalShowcases);
      }
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full">
        {!isAuthenticated ? (
          /* Login PIN Prompt */
          <div className="max-w-md mx-auto my-12 bg-[#0c0c0c] border border-dashed border-[#333333] p-8 rounded shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-12 h-12 mx-auto bg-[#1a1a1a] border border-amber-500/40 rounded-full flex items-center justify-center text-amber-400 mb-3">
                <Shield size={24} />
              </div>
              <h1 className="text-xl font-bold font-mono text-white">
                AKSES MENTOR // INSTRUKTUR
              </h1>
              <p className="text-xs font-mono text-[#888888] mt-1">
                Masukkan PIN instruktur untuk memantau progres kelas dan membimbing siswa
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono text-[#888888] mb-1.5">
                  SECRET PASSCODE / PIN:
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="Masukkan PIN mentor"
                    className="w-full px-3 py-2 pl-9 bg-[#141414] border border-[#333333] rounded text-white text-xs font-mono focus:outline-none focus:border-amber-400"
                  />
                  <KeyRound size={14} className="absolute left-3 top-2.5 text-[#666666]" />
                </div>
              </div>

              {errorMsg && (
                <div className="p-2 bg-rose-950/40 border border-rose-800 text-rose-300 text-xs font-mono rounded">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || !pin.trim()}
                className="w-full py-2 bg-white text-black font-mono font-bold text-xs rounded hover:bg-neutral-200 transition-colors disabled:opacity-50"
              >
                {isLoading ? "Memverifikasi..." : "Buka Dashboard Mentor"}
              </button>
            </form>

            {/* Quick Link to Slide Deck without Login */}
            <div className="mt-6 pt-5 border-t border-dashed border-[#222222] text-center">
              <p className="text-xs font-mono text-[#777777] mb-2.5">
                Ingin langsung memproyeksikan materi kelas tanpa login admin?
              </p>
              <Link
                href="/slides"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#161616] hover:bg-[#202020] text-amber-400 border border-amber-500/30 rounded text-xs font-mono transition-colors font-semibold"
              >
                <Presentation size={14} />
                <span>Buka Slide Presentasi Workshop (Mode PPT) &rarr;</span>
              </Link>
            </div>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-6 border-b border-dashed border-[#333333] gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="p-1 bg-[#1a1a1a] border border-[#333333] rounded text-emerald-400">
                    <Shield size={14} />
                  </span>
                  <span className="font-mono text-xs text-[#888888]">
                    MENTOR COMMAND CENTER // LIVE
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Instruktur & Materi Workshop KopiCode_
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/slides"
                  target="_blank"
                  className="px-3 py-1.5 bg-[#141414] hover:bg-[#202020] border border-[#333333] rounded text-xs font-mono text-amber-400 flex items-center gap-1.5 transition-colors"
                  title="Buka Slide di Tab Baru Khusus Layar Proyektor"
                >
                  <ExternalLink size={13} />
                  <span>Proyektor (Tab Baru)</span>
                </Link>
                <button
                  type="button"
                  onClick={handleRefresh}
                  disabled={isLoading}
                  className="px-3 py-1.5 bg-[#141414] hover:bg-[#202020] border border-[#333333] rounded text-xs font-mono text-white flex items-center gap-1.5 transition-colors"
                >
                  <RefreshCw size={13} className={isLoading ? "animate-spin" : ""} />
                  <span>Refresh Data</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsAuthenticated(false)}
                  className="bracket-framer text-xs text-rose-400"
                >
                  Keluar
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 mb-6 border-b border-[#222222] pb-3">
              <button
                type="button"
                onClick={() => setMentorTab("slides")}
                className={`flex items-center gap-2 px-3.5 py-2 rounded text-xs font-mono font-bold transition-all ${
                  mentorTab === "slides"
                    ? "bg-amber-400 text-black shadow-lg shadow-amber-950/20"
                    : "bg-[#141414] text-[#888888] hover:text-white border border-[#2a2a2a]"
                }`}
              >
                <Presentation size={14} />
                <span>🖥️ Slide Presentasi Kelas (PPT Web)</span>
              </button>

              <button
                type="button"
                onClick={() => setMentorTab("monitoring")}
                className={`flex items-center gap-2 px-3.5 py-2 rounded text-xs font-mono font-bold transition-all ${
                  mentorTab === "monitoring"
                    ? "bg-amber-400 text-black shadow-lg shadow-amber-950/20"
                    : "bg-[#141414] text-[#888888] hover:text-white border border-[#2a2a2a]"
                }`}
              >
                <BarChart3 size={14} />
                <span>📊 Monitoring Siswa & Live Code ({participantsList.length})</span>
              </button>
            </div>

            {/* Tab 1: Slide Deck Presentation */}
            {mentorTab === "slides" && (
              <div className="space-y-4">
                <SlideDeck standalone />
              </div>
            )}

            {/* Tab 2: Monitoring Siswa */}
            {mentorTab === "monitoring" && (
              <div>
                {/* Quick Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  <div className="p-4 bg-[#0e0e0e] border border-[#222222] rounded flex items-center gap-3">
                    <div className="p-2.5 bg-[#1a1a1a] rounded text-blue-400 border border-[#333333]">
                      <Users size={20} />
                    </div>
                    <div>
                      <div className="text-2xl font-bold font-mono text-white">{participantsList.length}</div>
                      <div className="text-xs text-[#888888] font-mono">Total Siswa Terdaftar</div>
                    </div>
                  </div>

                  <div className="p-4 bg-[#0e0e0e] border border-[#222222] rounded flex items-center gap-3">
                    <div className="p-2.5 bg-[#1a1a1a] rounded text-emerald-400 border border-[#333333]">
                      <CheckCircle size={20} />
                    </div>
                    <div>
                      <div className="text-2xl font-bold font-mono text-white">{totalShowcases}</div>
                      <div className="text-xs text-[#888888] font-mono">Karya Dipublikasikan</div>
                    </div>
                  </div>

                  <div className="p-4 bg-[#0e0e0e] border border-[#222222] rounded flex items-center gap-3">
                    <div className="p-2.5 bg-[#1a1a1a] rounded text-amber-400 border border-[#333333]">
                      <Clock size={20} />
                    </div>
                    <div>
                      <div className="text-2xl font-bold font-mono text-white">
                        {participantsList.filter((p) => p.currentStep === 7).length}
                      </div>
                      <div className="text-xs text-[#888888] font-mono">Siswa Selesai (Step 7)</div>
                    </div>
                  </div>
                </div>

                {/* Table of Participants */}
                <div className="bg-[#0e0e0e] border border-[#222222] rounded overflow-hidden">
                  <div className="px-4 py-3 bg-[#111111] border-b border-dashed border-[#333333] flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-white">
                      DAFTAR SISWA AKTIF // REALTIME
                    </span>
                    <span className="text-[11px] font-mono text-[#777777]">
                      {participantsList.length} peserta
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs font-mono">
                      <thead>
                        <tr className="bg-[#080808] border-b border-[#222222] text-[#888888]">
                          <th className="p-3">Nama Peserta</th>
                          <th className="p-3">Sesi / Batch</th>
                          <th className="p-3">Progres Step</th>
                          <th className="p-3">Draft Code</th>
                          <th className="p-3">Terakhir Aktif</th>
                          <th className="p-3 text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {participantsList.map((p) => {
                          const percent = Math.round((p.currentStep / 7) * 100);

                          return (
                            <tr
                              key={p.id}
                              className="border-b border-[#1a1a1a] hover:bg-[#141414] transition-colors"
                            >
                              <td className="p-3 font-semibold text-white">
                                {p.name}
                              </td>
                              <td className="p-3 text-[#888888]">
                                {p.sessionCode}
                              </td>
                              <td className="p-3">
                                <div className="flex items-center gap-2">
                                  <span className="text-amber-400 font-bold">
                                    Step {p.currentStep} / 7
                                  </span>
                                  <div className="w-16 h-1.5 bg-[#222222] rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-emerald-500 rounded-full"
                                      style={{ width: `${percent}%` }}
                                    />
                                  </div>
                                </div>
                              </td>
                              <td className="p-3 text-[#777777]">
                                HTML: {p.htmlDraft ? p.htmlDraft.length : 0} chars &bull; CSS: {p.cssDraft ? p.cssDraft.length : 0} chars
                              </td>
                              <td className="p-3 text-[#888888]">
                                {new Date(p.updatedAt).toLocaleTimeString("id-ID", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  second: "2-digit",
                                })}
                              </td>
                              <td className="p-3 text-right">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setInspectingUser(p);
                                    setModalTab("preview");
                                  }}
                                  className="bracket-framer text-xs text-[#aaaaaa] hover:text-white"
                                >
                                  Bantu Siswa / Inspeksi
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Student Inspector Modal for Mentors */}
      {inspectingUser && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e0e0e] border border-[#333333] rounded w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-4 py-3 bg-[#080808] border-b border-dashed border-[#333333]">
              <div>
                <span className="font-mono text-xs text-amber-400 font-bold">
                  INSPEKSI PROGRES // {inspectingUser.name}
                </span>
                <span className="text-xs text-[#777777] ml-2">
                  (Sedang di Step {inspectingUser.currentStep}/7)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center bg-[#161616] p-0.5 rounded border border-[#333]">
                  <button
                    type="button"
                    onClick={() => setModalTab("preview")}
                    className={`px-3 py-1 text-xs font-mono rounded ${
                      modalTab === "preview" ? "bg-white text-black font-bold" : "text-[#777] hover:text-white"
                    }`}
                  >
                    Live Preview
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalTab("code")}
                    className={`px-3 py-1 text-xs font-mono rounded ${
                      modalTab === "code" ? "bg-white text-black font-bold" : "text-[#777] hover:text-white"
                    }`}
                  >
                    Source Code
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setInspectingUser(null)}
                  className="p-1 text-[#777] hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="p-4 flex-1 overflow-auto bg-[#050505]">
              {modalTab === "preview" ? (
                <div className="h-[450px] bg-white rounded border border-[#333333] overflow-hidden">
                  <iframe
                    title="Student Preview"
                    srcDoc={`<!DOCTYPE html><html><head><style>${inspectingUser.cssDraft}</style></head><body>${inspectingUser.htmlDraft}</body></html>`}
                    sandbox="allow-scripts"
                    className="w-full h-full bg-white border-none"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 h-[450px]">
                  <div className="flex flex-col border border-[#222] bg-[#0c0c0c] rounded p-2">
                    <span className="text-xs font-mono text-amber-400 mb-1">index.html</span>
                    <pre className="text-xs font-mono text-[#ddd] overflow-auto flex-1 whitespace-pre-wrap">
                      <code>{inspectingUser.htmlDraft || "(Belum ada kode)"}</code>
                    </pre>
                  </div>
                  <div className="flex flex-col border border-[#222] bg-[#0c0c0c] rounded p-2">
                    <span className="text-xs font-mono text-blue-400 mb-1">style.css</span>
                    <pre className="text-xs font-mono text-[#ddd] overflow-auto flex-1 whitespace-pre-wrap">
                      <code>{inspectingUser.cssDraft || "(Belum ada kode)"}</code>
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
