"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, Code2, Eye, Coffee, Sparkles, X, Copy, Check } from "lucide-react";
import Navbar from "@/components/Navbar";

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

  const handleLike = async (id: string) => {
    if (likedIds[id]) return;

    // Optimistic UI update
    setLikedIds((prev) => ({ ...prev, [id]: true }));
    setShowcases((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, likesCount: item.likesCount + 1 } : item
      )
    );

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
              const combinedDoc = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${item.cssCode}</style></head><body>${item.htmlCode}</body></html>`;

              return (
                <div
                  key={item.id}
                  className="bg-[#0e0e0e] border border-[#262626] hover:border-[#444444] rounded overflow-hidden flex flex-col transition-all group"
                >
                  {/* Live Iframe Mini Preview Thumbnail */}
                  <div className="h-[220px] bg-white relative overflow-hidden border-b border-[#262626]">
                    <iframe
                      title={item.cafeName}
                      srcDoc={combinedDoc}
                      sandbox="allow-scripts"
                      className="w-[200%] h-[200%] transform scale-50 origin-top-left pointer-events-none bg-white"
                    />
                    <div className="absolute inset-0 bg-transparent group-hover:bg-black/10 transition-colors pointer-events-none" />
                  </div>

                  {/* Card Content Info */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-[#666666] mb-1">
                        <span>{item.authorName || "Kreator Anonim"}</span>
                        <span>{item.sessionCode || "workshop"}</span>
                      </div>

                      <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors mb-3">
                        {item.cafeName}
                      </h3>
                    </div>

                    {/* Card Actions */}
                    <div className="pt-3 border-t border-dashed border-[#222222] flex items-center justify-between">
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

                      <button
                        type="button"
                        onClick={() => setSelectedInspect(item)}
                        className="bracket-framer text-xs text-[#888888] hover:text-white flex items-center gap-1"
                      >
                        <Code2 size={13} />
                        Inspect Code
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

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
