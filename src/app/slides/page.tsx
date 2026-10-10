"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Coffee } from "lucide-react";
import SlideDeck from "@/components/SlideDeck";

export default function SlidesPage() {
  return (
    <div className="min-h-screen bg-[#000000] text-[#EDEDED] flex flex-col p-2 sm:p-4 font-sans">
      {/* Slim Top Navigation */}
      <header className="flex items-center justify-between px-3 py-2 bg-[#0A0A0A] border border-[#222222] rounded mb-3 shrink-0">
        <div className="flex items-center gap-3">
          <Link
            href="/mentor"
            className="flex items-center gap-1.5 text-xs font-mono text-[#888888] hover:text-white px-2 py-1 bg-[#000000] hover:bg-[#111111] rounded border border-[#222222] transition-colors"
          >
            <ArrowLeft size={13} />
            <span>Dashboard Mentor</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="p-1 bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20 rounded">
              <Coffee size={13} />
            </span>
            <span className="font-mono text-xs font-bold text-white tracking-wide">
              KOPICODE // MODE PRESENTASI SLIDE (WEB DECK)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#777777]">
          <span className="hidden sm:inline">Navigasi: &larr; &rarr; / Spasi | F: Layar Penuh | N: Catatan Mentor</span>
          <Link
            href="/learn"
            className="text-[#F59E0B] hover:text-[#F59E0B]/80 font-mono text-xs hover:underline ml-2"
          >
            Buka Editor Kode &rarr;
          </Link>
        </div>
      </header>

      {/* Presentation Deck Container */}
      <main className="flex-1 flex flex-col min-h-0">
        <SlideDeck standalone />
      </main>
    </div>
  );
}
