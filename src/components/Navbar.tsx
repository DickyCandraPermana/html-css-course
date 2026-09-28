"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Coffee, Shield } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [participantName, setParticipantName] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("kopicode_participant");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setParticipantName(parsed.name || null);
        } catch {
          // ignore
        }
      }
    }
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#050505]/95 backdrop-blur-md border-b border-dashed border-[#333333]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 text-white font-mono text-sm tracking-wider group"
          >
            <span className="p-1 bg-[#1a1a1a] border border-[#333333] rounded text-amber-500">
              <Coffee size={14} />
            </span>
            <span className="font-bold tracking-tight">
              KOPI<span className="text-[#888888]">CODE</span>
              <span className="text-white inline-block animate-pulse">_</span>
            </span>
          </Link>

          <span className="hidden sm:inline-block text-[11px] font-mono text-[#555555]">
            // HTML & CSS MASTERCLASS
          </span>
        </div>

        {/* Navigation Links with bracket-framer */}
        <nav className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/learn"
            className={`bracket-framer text-xs ${
              pathname.startsWith("/learn") ? "active text-white font-semibold" : ""
            }`}
          >
            Materi & Praktek
          </Link>

          <Link
            href="/playground"
            className={`bracket-framer text-xs ${
              pathname === "/playground" ? "active text-white font-semibold" : ""
            }`}
          >
            Playground
          </Link>

          <Link
            href="/showcase"
            className={`bracket-framer text-xs ${
              pathname === "/showcase" ? "active text-white font-semibold" : ""
            }`}
          >
            Showcase
          </Link>
        </nav>

        {/* Participant Indicator */}
        <div className="hidden md:flex items-center gap-2">
          {participantName ? (
            <div className="flex items-center gap-2 px-2.5 py-1 bg-[#111111] border border-[#2b2b2b] rounded-full text-xs font-mono text-[#aaaaaa]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span className="text-white font-medium">{participantName}</span>
              <span className="text-[#555555]">|</span>
              <span className="text-[11px] text-emerald-400/90 flex items-center gap-1">
                ☁️ Synced
              </span>
            </div>
          ) : (
            <Link
              href="/"
              className="text-xs font-mono text-[#888888] hover:text-white bracket-framer"
            >
              Masuk Sesi
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
