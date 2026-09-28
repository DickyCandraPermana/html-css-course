"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Monitor, Coffee } from "lucide-react";
import SlideDeck from "@/components/SlideDeck";

export default function SlidesPage() {
  return (
    <div className="min-h-screen bg-[#040404] text-[#F5F5F5] flex flex-col p-2 sm:p-4">
      {/* Slim Top Navigation */}
      <header className="flex items-center justify-between px-3 py-2 bg-[#0c0c0c] border border-[#222222] rounded-lg mb-3 shrink-0">
        <div className="flex items-center gap-3">
          <Link
            href="/mentor"
            className="flex items-center gap-1.5 text-xs font-mono text-[#888888] hover:text-white px-2 py-1 bg-[#141414] hover:bg-[#1f1f1f] rounded border border-[#2c2c2c] transition-colors"
          >
            <ArrowLeft size={13} />
            <span>Dashboard Mentor</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="p-1 bg-amber-500/20 text-amber-400 rounded">
              <Coffee size={13} />
            </span>
            <span className="font-mono text-xs font-bold text-white">
              KOPICODE // MODE PRESENTASI SLIDE (PPT WEB)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#777777]">
          <span className="hidden sm:inline">Navigasi: &larr; &rarr; / Spasi | F: Layar Penuh | N: Catatan Mentor</span>
          <Link
            href="/learn"
            className="text-amber-400 hover:underline ml-2"
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
