"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, Code2, Eye, Coffee, X, Copy, Check, Maximize2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import LivePreview from "@/components/LivePreview";

interface ShowcaseItem {
  id: string;
  cafeName: string;
  authorName?: string;
  sessionCode?: string;
  likesCount: number;
  createdAt: string;
  htmlCode: string;
  cssCode: string;
}

export default function ShowcasePage() {
  const [showcases, setShowcases] = useState<ShowcaseItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({});
  const [selectedInspect, setSelectedInspect] = useState<ShowcaseItem | null>(null);
  const [selectedPreview, setSelectedPreview] = useState<ShowcaseItem | null>(null);
  const [inspectTab, setInspectTab] = useState<"html" | "css">("html");
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    async function fetchShowcases() {
      try {
        const res = await fetch("/api/showcase");
        const data = await res.json();
        if (data.showcases) {
          setShowcases(data.showcases);
        }
      } catch (err) {
        console.warn("Failed to fetch showcases:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchShowcases();
  }, []);

  // Handle escape key to close modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedPreview(null);
        setSelectedInspect(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleLike = async (id: string) => {
    if (likedIds[id]) return;

    // Optimistic UI update
    setLikedIds((prev) => ({ ...prev, [id]: true }));
    setShowcases((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, likesCount: item.likesCount + 1 } : item
      )
    );

    // Also update selectedPreview likes count if open
    if (selectedPreview && selectedPreview.id === id) {
      setSelectedPreview((prev) =>
        prev ? { ...prev, likesCount: prev.likesCount + 1 } : null
      );
    }

    try {
      await fetch(`/api/showcase/${id}/like`, { method: "POST" });
    } catch {
      // ignore
    }
  };

  const handleCopyInspected = () => {
    if (!selectedInspect) return;
    const textToCopy =
      inspectTab === "html" ? selectedInspect.htmlCode : selectedInspect.cssCode;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-10 w-full">
        {/* Gallery Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-dashed border-[#333333] gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1 bg-[#1a1a1a] border border-[#333333] rounded text-amber-400">
                <Coffee size={14} />
              </span>
              <span className="font-mono text-xs text-[#888888]">
                PUBLIC SHOWCASE GALLERY // KOMUNITAS
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
              Galeri Website Kedai Kopi Peserta_
            </h1>
            <p className="text-xs sm:text-sm font-mono text-[#888888] mt-1">
              Pameran karya langsung hasil latihan materi HTML & CSS dasar peserta workshop
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/learn"
              className="px-4 py-2 bg-white text-black font-mono font-bold text-xs rounded hover:bg-neutral-200 transition-colors"
            >
              + Buat Karyamu Sendiri
            </Link>
          </div>
        </div>

        {/* Gallery Grid */}
        {isLoading ? (
          <div className="py-20 text-center font-mono text-sm text-[#777777] animate-pulse">
            Memuat galeri karya peserta...
          </div>
        ) : showcases.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-[#333333] rounded p-8">
            <Coffee size={36} className="mx-auto text-[#555555] mb-3" />
            <h3 className="font-mono text-sm text-white font-bold mb-1">
              Belum ada karya yang dipublikasikan
            </h3>
            <p className="text-xs text-[#777777] font-mono mb-4">
              Jadilah peserta pertama yang menyelesaikan Modul 07 dan mempublikasikan karya ke sini!
            </p>
            <Link
              href="/learn"
              className="px-4 py-2 bg-amber-500 text-black font-mono font-bold text-xs rounded"
            >
              Mulai Praktek Sekarang &rarr;
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {showcases.map((item) => {
              const combinedDoc = `<!DOCTYPE html><html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><style>body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; } ${item.cssCode}</style></head><body>${item.htmlCode}</body></html>`;

              return (
                <div
                  key={item.id}
                  className="bg-[#0e0e0e] border border-[#262626] hover:border-[#444444] rounded overflow-hidden flex flex-col transition-all group"
                >
                  {/* Clickable Live Preview Thumbnail */}
                  <div
                    onClick={() => setSelectedPreview(item)}
                    className="h-[220px] bg-white relative overflow-hidden border-b border-[#262626] cursor-pointer group/thumb"
                    role="button"
                    tabIndex={0}
                    title="Klik untuk membuka Full Preview"
                  >
                    <iframe
                      title={item.cafeName}
                      srcDoc={combinedDoc}
                      sandbox="allow-scripts"
                      className="w-[200%] h-[200%] transform scale-50 origin-top-left pointer-events-none bg-white"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-all flex items-center justify-center backdrop-blur-[1px]">
                      <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0a0a0a]/90 text-white font-mono text-xs font-semibold rounded border border-[#444444] shadow-lg transform translate-y-1 group-hover/thumb:translate-y-0 transition-transform">
                        <Eye size={13} className="text-amber-400" />
                        Full Preview
                      </span>
                    </div>
                  </div>

                  {/* Card Content Info */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-[#666666] mb-1">
                        <span>{item.authorName || "Kreator Anonim"}</span>
                        <span>{item.sessionCode || "workshop"}</span>
                      </div>

                      <h3
                        onClick={() => setSelectedPreview(item)}
                        className="text-base font-bold text-white group-hover:text-amber-300 transition-colors mb-3 cursor-pointer"
                      >
                        {item.cafeName}
                      </h3>
                    </div>

                    {/* Card Actions */}
                    <div className="pt-3 border-t border-dashed border-[#222222] flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => handleLike(item.id)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                          likedIds[item.id]
                            ? "bg-rose-950/60 text-rose-400 border border-rose-900"
                            : "bg-[#161616] text-[#888888] hover:text-white border border-[#262626]"
                        }`}
                      >
                        <Heart
                          size={13}
                          className={likedIds[item.id] ? "fill-rose-400 text-rose-400" : ""}
                        />
                        <span>{item.likesCount}</span>
                      </button>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setSelectedPreview(item)}
                          className="px-2.5 py-1 bg-[#1a1a1a] hover:bg-[#252525] text-white hover:text-amber-300 border border-[#333333] rounded text-xs font-mono flex items-center gap-1.5 transition-colors"
                          title="Buka pratinjau interaktif layar penuh"
                        >
                          <Eye size={12} className="text-amber-400" />
                          <span>Full Preview</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setSelectedInspect(item)}
                          className="bracket-framer text-xs text-[#888888] hover:text-white flex items-center gap-1 px-2 py-1"
                          title="Lihat kode HTML dan CSS"
                        >
                          <Code2 size={12} />
                          <span>Inspect</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Full Preview Modal */}
      {selectedPreview && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col p-2 sm:p-5 animate-in fade-in duration-150">
          <div className="bg-[#0d0d0d] border border-[#333333] rounded-lg w-full max-w-7xl h-[92vh] sm:h-[94vh] mx-auto overflow-hidden shadow-2xl flex flex-col">
            {/* Modal Bar */}
            <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 bg-[#070707] border-b border-dashed border-[#2c2c2c] shrink-0">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/60"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/60"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]/60"></span>
                </div>

                <div className="flex items-center gap-2 min-w-0">
                  <h2 className="text-xs sm:text-sm font-bold text-white truncate">
                    ☕ {selectedPreview.cafeName}
                  </h2>
                  <span className="hidden md:inline-flex text-[11px] font-mono px-2 py-0.5 bg-[#161616] border border-[#2c2c2c] rounded text-[#888888]">
                    Karya: {selectedPreview.authorName || "Peserta"} // {selectedPreview.sessionCode || "workshop"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleLike(selectedPreview.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                    likedIds[selectedPreview.id]
                      ? "bg-rose-950/60 text-rose-400 border border-rose-900"
                      : "bg-[#161616] text-[#888888] hover:text-white border border-[#2c2c2c]"
                  }`}
                >
                  <Heart
                    size={12}
                    className={likedIds[selectedPreview.id] ? "fill-rose-400 text-rose-400" : ""}
                  />
                  <span>{selectedPreview.likesCount} Suka</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const curr = selectedPreview;
                    setSelectedPreview(null);
                    setSelectedInspect(curr);
                  }}
                  className="bracket-framer text-xs text-[#aaaaaa] hover:text-white flex items-center gap-1 px-2.5 py-1 bg-[#161616] border border-[#2c2c2c] rounded font-mono"
                  title="Buka panel kode"
                >
                  <Code2 size={12} />
                  <span className="hidden sm:inline">Inspect Kode</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPreview(null)}
                  className="flex items-center gap-1 px-2 py-1 text-[#888888] hover:text-white hover:bg-[#202020] rounded transition-colors text-xs font-mono"
                  title="Tutup (Esc)"
                >
                  <span className="hidden sm:inline text-[10px] text-[#666666]">ESC</span>
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Interactive Live Preview Component */}
            <div className="flex-1 min-h-0 bg-[#080808]">
              <LivePreview
                htmlCode={selectedPreview.htmlCode}
                cssCode={selectedPreview.cssCode}
                height="100%"
              />
            </div>
          </div>
        </div>
      )}

      {/* Code Inspector Modal */}
      {selectedInspect && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e0e0e] border border-[#333333] rounded w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#080808] border-b border-dashed border-[#333333]">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-amber-400 font-bold">
                  INSPECT KODE // {selectedInspect.cafeName}
                </span>
                <span className="text-xs text-[#777777]">
                  oleh {selectedInspect.authorName}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const curr = selectedInspect;
                    setSelectedInspect(null);
                    setSelectedPreview(curr);
                  }}
                  className="bracket-framer text-xs text-[#aaaaaa] hover:text-white flex items-center gap-1 font-mono"
                >
                  <Eye size={12} className="text-amber-400" />
                  Pratinjau
                </button>
                <button
                  type="button"
                  onClick={handleCopyInspected}
                  className="bracket-framer text-xs text-[#aaaaaa] hover:text-white flex items-center gap-1"
                >
                  {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  {copied ? "Tersalin!" : "Salin"}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedInspect(null)}
                  className="p-1 text-[#777777] hover:text-white rounded"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Tab Selector */}
            <div className="flex items-center px-4 bg-[#141414] border-b border-[#222222]">
              <button
                type="button"
                onClick={() => setInspectTab("html")}
                className={`px-4 py-2 font-mono text-xs transition-colors border-b-2 ${
                  inspectTab === "html"
                    ? "border-white text-white font-bold"
                    : "border-transparent text-[#777777] hover:text-white"
                }`}
              >
                index.html
              </button>
              <button
                type="button"
                onClick={() => setInspectTab("css")}
                className={`px-4 py-2 font-mono text-xs transition-colors border-b-2 ${
                  inspectTab === "css"
                    ? "border-white text-white font-bold"
                    : "border-transparent text-[#777777] hover:text-white"
                }`}
              >
                style.css
              </button>
            </div>

            {/* Code Body */}
            <div className="p-4 overflow-auto flex-1 bg-[#080808]">
              <pre className="font-mono text-xs text-[#dcdcdc] leading-relaxed whitespace-pre-wrap">
                <code>
                  {inspectTab === "html"
                    ? selectedInspect.htmlCode
                    : selectedInspect.cssCode}
                </code>
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
