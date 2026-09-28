"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Grid,
  FileText,
  Clock,
  Sparkles,
  Coffee,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Copy,
  Check,
  ExternalLink,
  X,
  Code,
  Layers,
} from "lucide-react";
import { SLIDES, SlideData } from "@/lib/slidesData";

interface SlideDeckProps {
  initialSlideIndex?: number;
  standalone?: boolean;
}

export default function SlideDeck({ initialSlideIndex = 0, standalone = false }: SlideDeckProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(initialSlideIndex);
  const [showNotes, setShowNotes] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const currentSlide: SlideData = SLIDES[currentSlideIndex] || SLIDES[0];
  const totalSlides = SLIDES.length;

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlideIndex(index);
      setShowGrid(false);
    }
  }, [totalSlides]);

  const nextSlide = useCallback(() => {
    if (currentSlideIndex < totalSlides - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
    }
  }, [currentSlideIndex, totalSlides]);

  const prevSlide = useCallback(() => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
    }
  }, [currentSlideIndex]);

  // Fullscreen toggle handler
  const toggleFullscreen = useCallback(async () => {
    if (!containerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch {
      // fallback toggle state
      setIsFullscreen((prev) => !prev);
    }
  }, []);

  // Listen to native fullscreenchange
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      switch (e.key) {
        case "ArrowRight":
        case "PageDown":
        case " ":
          e.preventDefault();
          nextSlide();
          break;
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          prevSlide();
          break;
        case "f":
        case "F":
          e.preventDefault();
          toggleFullscreen();
          break;
        case "n":
        case "N":
          e.preventDefault();
          setShowNotes((prev) => !prev);
          break;
        case "g":
        case "G":
        case "o":
        case "O":
          e.preventDefault();
          setShowGrid((prev) => !prev);
          break;
        case "Escape":
          if (showGrid) setShowGrid(false);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide, toggleFullscreen, showGrid]);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const progressPercentage = ((currentSlideIndex + 1) / totalSlides) * 100;

  return (
    <div
      ref={containerRef}
      className={`flex flex-col bg-[#080808] text-[#f5f5f5] font-sans select-none relative overflow-hidden ${
        isFullscreen
          ? "w-screen h-screen fixed inset-0 z-50 p-3 sm:p-6"
          : standalone
          ? "min-h-[88vh] rounded-xl border border-[#262626] shadow-2xl p-3 sm:p-6"
          : "h-[720px] rounded-xl border border-[#262626] shadow-2xl p-3 sm:p-5"
      }`}
    >
      {/* Top Presentation Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-[#1f1f1f] text-xs font-mono text-[#888888] shrink-0 gap-3">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
          </div>

          <span className="px-2 py-0.5 bg-[#141414] border border-[#2a2a2a] rounded text-amber-400 font-bold text-[11px] truncate">
            {currentSlide.badge}
          </span>

          <span className="hidden md:inline-flex items-center gap-1 text-[#666666]">
            <Clock size={12} />
            <span>~{currentSlide.speakerNotes.targetMinutes} mnt</span>
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => setShowGrid(true)}
            className={`p-1.5 rounded transition-colors flex items-center gap-1 text-[11px] ${
              showGrid ? "bg-amber-400 text-black font-bold" : "bg-[#141414] hover:bg-[#202020] text-[#aaaaaa] hover:text-white border border-[#2a2a2a]"
            }`}
            title="Daftar Slide (Tekan 'G')"
          >
            <Grid size={13} />
            <span className="hidden sm:inline">Grid</span>
          </button>

          <button
            type="button"
            onClick={() => setShowNotes((prev) => !prev)}
            className={`p-1.5 rounded transition-colors flex items-center gap-1 text-[11px] ${
              showNotes ? "bg-amber-400 text-black font-bold" : "bg-[#141414] hover:bg-[#202020] text-[#aaaaaa] hover:text-white border border-[#2a2a2a]"
            }`}
            title="Catatan Mentor / Speaker Notes (Tekan 'N')"
          >
            <FileText size={13} />
            <span className="hidden sm:inline">Catatan Mentor</span>
          </button>

          {!standalone && (
            <Link
              href="/slides"
              target="_blank"
              className="p-1.5 bg-[#141414] hover:bg-[#202020] text-[#aaaaaa] hover:text-white border border-[#2a2a2a] rounded transition-colors"
              title="Buka Slide di Tab Proyektor Penuh"
            >
              <ExternalLink size={13} />
            </Link>
          )}

          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-1.5 bg-[#141414] hover:bg-[#202020] text-[#aaaaaa] hover:text-white border border-[#2a2a2a] rounded transition-colors"
            title="Layar Penuh Proyektor (Tekan 'F')"
          >
            {isFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          </button>
        </div>
      </div>

      {/* Slide Main Content Area */}
      <div className="flex-1 min-h-0 flex flex-col my-3 sm:my-4 overflow-y-auto pr-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-full items-start">
          {/* Left Column: Concept, Analogy, Key Points */}
          <div className={`${currentSlide.codeSnippet ? "lg:col-span-7" : "lg:col-span-12"} flex flex-col gap-4`}>
            <div>
              <div className="text-[11px] font-mono text-amber-400/90 font-semibold tracking-wider uppercase mb-1">
                Langkah {currentSlide.id} dari {totalSlides} // {currentSlide.category.toUpperCase()}
              </div>
              <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                {currentSlide.title}
              </h2>
              <p className="text-xs sm:text-sm font-mono text-[#888888] mt-1">
                {currentSlide.subtitle}
              </p>
            </div>

            {/* Concept Paragraph */}
            <div className="p-3.5 bg-[#101010] border border-[#222222] rounded-lg text-xs sm:text-sm text-[#cccccc] leading-relaxed">
              {currentSlide.concept}
            </div>

            {/* Real World Coffee Analogy Box */}
            <div className="p-3.5 bg-gradient-to-r from-amber-950/20 via-[#16120e] to-[#111111] border border-amber-900/40 rounded-lg">
              <div className="flex items-center gap-2 mb-1.5 text-xs font-mono font-bold text-amber-300">
                <span className="text-base">{currentSlide.analogy.icon}</span>
                <span>ANALOGI DUNIA NYATA: {currentSlide.analogy.title}</span>
              </div>
              <p className="text-xs text-[#d4af37]/90 leading-relaxed italic">
                &ldquo;{currentSlide.analogy.description}&rdquo;
              </p>
            </div>

            {/* Key Points Badges / Cards */}
            <div>
              <div className="text-[11px] font-mono text-[#777777] font-semibold mb-2">
                POIN KUNCI & TAG PENTING:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentSlide.keyPoints.map((pt, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-[#0f0f0f] border border-[#242424] hover:border-[#383838] rounded transition-colors flex flex-col justify-start"
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-xs font-mono font-bold text-white">
                        {pt.label}
                      </span>
                      {pt.tag && (
                        <span className="px-1.5 py-0.2 bg-amber-950/50 border border-amber-800/60 text-amber-300 font-mono text-[10px] rounded">
                          {pt.tag}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-[#999999] leading-snug">
                      {pt.detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Code Snippet & Challenge */}
          {currentSlide.codeSnippet && (
            <div className="lg:col-span-5 flex flex-col gap-3 h-full">
              {/* Code Box */}
              <div className="bg-[#0b0b0b] border border-[#2b2b2b] rounded-lg overflow-hidden flex flex-col flex-1 shadow-lg">
                <div className="flex items-center justify-between px-3 py-2 bg-[#121212] border-b border-[#242424] text-[11px] font-mono">
                  <span className="text-amber-400 font-bold flex items-center gap-1.5">
                    <Code size={13} />
                    {currentSlide.codeSnippet.title}
                  </span>
                  <button
                    type="button"
                    onClick={() => copyCode(currentSlide.codeSnippet?.code || "")}
                    className="bracket-framer text-[10px] text-[#aaaaaa] hover:text-white flex items-center gap-1 px-2 py-0.5"
                  >
                    {copied ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                    <span>{copied ? "Tersalin!" : "Salin Kode"}</span>
                  </button>
                </div>
                <div className="p-3 overflow-x-auto bg-[#070707] flex-1">
                  <pre className="font-mono text-xs text-[#e0e0e0] leading-relaxed">
                    <code>{currentSlide.codeSnippet.code}</code>
                  </pre>
                </div>
              </div>

              {/* Student Challenge Card */}
              {currentSlide.studentChallenge && (
                <div className="p-3 bg-[#13110e] border border-amber-800/40 rounded-lg">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 mb-1">
                    <Sparkles size={13} />
                    <span>TUGAS PRAKTIK SISWA</span>
                  </div>
                  <p className="text-xs text-[#cccccc] leading-relaxed">
                    {currentSlide.studentChallenge}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Speaker Notes Drawer (Mentor Teaching Notes) */}
      {showNotes && (
        <div className="p-4 bg-[#0d0d0d] border border-amber-500/40 rounded-lg shadow-2xl mb-3 animate-in slide-in-from-bottom duration-200 shrink-0 max-h-[35vh] overflow-y-auto">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-dashed border-[#333333]">
            <div className="flex items-center gap-2">
              <span className="p-1 bg-amber-500/20 text-amber-400 rounded">
                <Lightbulb size={14} />
              </span>
              <span className="text-xs font-mono font-bold text-white">
                CATATAN KHUSUS MENTOR // PANDUAN MENGAJAR
              </span>
              <span className="text-[11px] font-mono text-[#888888]">
                (Estimasi: {currentSlide.speakerNotes.targetMinutes} menit)
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowNotes(false)}
              className="p-1 text-[#888888] hover:text-white rounded"
            >
              <X size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            {/* Goals */}
            <div className="p-2.5 bg-[#141414] border border-[#262626] rounded">
              <div className="flex items-center gap-1.5 text-emerald-400 font-mono font-semibold mb-1.5">
                <CheckCircle2 size={13} />
                <span>Target Pemahaman Siswa:</span>
              </div>
              <ul className="space-y-1 text-[#bbbbbb] list-disc list-inside">
                {currentSlide.speakerNotes.teachingGoals.map((g, i) => (
                  <li key={i}>{g}</li>
                ))}
              </ul>
            </div>

            {/* Icebreakers / Questions */}
            <div className="p-2.5 bg-[#141414] border border-[#262626] rounded">
              <div className="flex items-center gap-1.5 text-amber-400 font-mono font-semibold mb-1.5">
                <Coffee size={13} />
                <span>Pertanyaan Pancingan Kelas:</span>
              </div>
              <ul className="space-y-1 text-[#bbbbbb] list-disc list-inside">
                {currentSlide.speakerNotes.icebreakersOrQuestions.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            </div>

            {/* Common Traps */}
            <div className="p-2.5 bg-[#141414] border border-[#262626] rounded">
              <div className="flex items-center gap-1.5 text-rose-400 font-mono font-semibold mb-1.5">
                <AlertTriangle size={13} />
                <span>Jebakan / Error Sering Muncul:</span>
              </div>
              <ul className="space-y-1 text-[#bbbbbb] list-disc list-inside">
                {currentSlide.speakerNotes.commonTraps.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation Toolbar */}
      <div className="pt-2 border-t border-[#1f1f1f] flex items-center justify-between shrink-0 gap-3 text-xs font-mono">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={prevSlide}
            disabled={currentSlideIndex === 0}
            className="px-3 py-1.5 bg-[#141414] hover:bg-[#202020] text-white border border-[#2a2a2a] rounded flex items-center gap-1 transition-colors disabled:opacity-30 disabled:pointer-events-none"
            title="Slide Sebelumnya (Panah Kiri)"
          >
            <ChevronLeft size={14} />
            <span className="hidden sm:inline">Sebelumnya</span>
          </button>

          <button
            type="button"
            onClick={nextSlide}
            disabled={currentSlideIndex === totalSlides - 1}
            className="px-3 py-1.5 bg-white text-black font-bold hover:bg-neutral-200 rounded flex items-center gap-1 transition-colors disabled:opacity-30 disabled:pointer-events-none"
            title="Slide Berikutnya (Panah Kanan / Spasi)"
          >
            <span className="hidden sm:inline">Berikutnya</span>
            <ChevronRight size={14} />
          </button>
        </div>

        {/* Progress Bar & Slide Indicator */}
        <div className="flex-1 max-w-md mx-2 sm:mx-4 flex flex-col gap-1 items-center">
          <div className="w-full bg-[#1c1c1c] h-1.5 rounded-full overflow-hidden border border-[#262626]">
            <div
              className="bg-amber-400 h-full transition-all duration-300 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="text-[10px] text-[#777777]">
            Slide {String(currentSlideIndex + 1).padStart(2, "0")} / {String(totalSlides).padStart(2, "0")}
          </div>
        </div>

        {/* Keyboard shortcut hint */}
        <div className="hidden md:flex items-center gap-2 text-[10px] text-[#555555]">
          <span>Gunakan &larr; &rarr; / Spasi</span>
          <span>&bull;</span>
          <span>F: Fullscreen</span>
          <span>&bull;</span>
          <span>N: Notes</span>
        </div>
      </div>

      {/* Slide Grid Drawer / Modal */}
      {showGrid && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col p-4 sm:p-8 animate-in fade-in duration-150">
          <div className="max-w-6xl mx-auto w-full flex flex-col h-full">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-dashed border-[#333333]">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-amber-400 text-black rounded font-bold">
                  <Grid size={16} />
                </span>
                <h3 className="text-base font-bold text-white font-mono">
                  DAFTAR SELURUH SLIDE WORKSHOP ({totalSlides} SLIDE)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowGrid(false)}
                className="p-1.5 text-[#888888] hover:text-white rounded hover:bg-[#202020] transition-colors"
                title="Tutup Grid (Esc)"
              >
                <X size={20} />
              </button>
            </div>

            {/* Slide Cards Grid */}
            <div className="flex-1 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pr-1">
              {SLIDES.map((slide, idx) => (
                <div
                  key={slide.id}
                  onClick={() => goToSlide(idx)}
                  className={`p-3.5 rounded-lg border cursor-pointer transition-all flex flex-col justify-between text-left group ${
                    idx === currentSlideIndex
                      ? "bg-[#181818] border-amber-400 shadow-lg shadow-amber-950/30 scale-[1.02]"
                      : "bg-[#0e0e0e] border-[#262626] hover:border-[#444444] hover:bg-[#141414]"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#777777] mb-2">
                      <span className="font-bold text-amber-400">
                        SLIDE {String(slide.id).padStart(2, "0")}
                      </span>
                      <span>~{slide.speakerNotes.targetMinutes} mnt</span>
                    </div>

                    <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors mb-1 line-clamp-2">
                      {slide.title}
                    </h4>

                    <p className="text-[11px] font-mono text-[#888888] line-clamp-2 mb-3">
                      {slide.subtitle}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-dashed border-[#222222] flex items-center justify-between text-[10px] text-[#666666]">
                    <span className="truncate max-w-[150px]">{slide.badge}</span>
                    <span>{slide.analogy.icon}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
