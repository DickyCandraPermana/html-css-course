"use client";

import React, { useState } from "react";
import { CheckCircle2, XCircle, HelpCircle, ChevronDown, ChevronUp, Zap } from "lucide-react";
import { StepEvaluation } from "@/lib/validator";

interface TestChecklistProps {
  evaluation: StepEvaluation;
  onRunTests: () => void;
  isLoading?: boolean;
  isReadMode?: boolean;
}

export default function TestChecklist({
  evaluation,
  onRunTests,
  isLoading,
  isReadMode,
}: TestChecklistProps) {
  const [expandedHints, setExpandedHints] = useState<Record<string, boolean>>({});

  const toggleHint = (id: string) => {
    setExpandedHints((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="flex flex-col bg-[#111111] border border-[#333333] rounded overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#0c0c0c] border-b border-dashed border-[#333333]">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-semibold text-white">
            CHECKLIST TANTANGAN
          </span>
          <span
            className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
              isReadMode
                ? "bg-amber-950/40 text-amber-300 border border-amber-800/60"
                : evaluation.allPassed
                ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                : "bg-[#1c1c1c] text-amber-400 border border-[#333333]"
            }`}
          >
            {isReadMode ? "OPSIONAL (MODE BACA)" : `${evaluation.passedTests} / ${evaluation.totalTests} LOLOS`}
          </span>
        </div>

        <button
          type="button"
          onClick={onRunTests}
          disabled={isLoading}
          className="flex items-center gap-1 text-[11px] font-mono px-2 py-1 bg-[#1a1a1a] hover:bg-[#252525] text-white border border-[#333333] rounded transition-colors disabled:opacity-50"
        >
          <Zap size={11} className={isLoading ? "animate-spin" : "text-amber-400"} />
          {isLoading ? "Menguji..." : "Uji Kode"}
        </button>
      </div>

      {/* Checklist Items */}
      <div className="p-2 space-y-1.5 max-h-[140px] overflow-y-auto">
        {evaluation.results.map((test) => {
          const isHintOpen = !!expandedHints[test.id];

          return (
            <div
              key={test.id}
              className={`p-2 rounded border text-xs transition-all ${
                test.passed
                  ? "bg-emerald-950/20 border-emerald-900/40 text-emerald-200"
                  : "bg-[#161616] border-[#292929] text-[#cccccc]"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2 flex-1">
                  {test.passed ? (
                    <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle size={15} className="text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <span className={`leading-relaxed ${test.passed ? "line-through opacity-80" : ""}`}>
                    {test.description}
                  </span>
                </div>

                {!test.passed && test.hint && (
                  <button
                    type="button"
                    onClick={() => toggleHint(test.id)}
                    title="Buka Petunjuk"
                    className="text-[#888888] hover:text-amber-400 p-0.5 transition-colors shrink-0"
                  >
                    {isHintOpen ? <ChevronUp size={13} /> : <HelpCircle size={13} />}
                  </button>
                )}
              </div>

              {/* Collapsible Hint */}
              {!test.passed && isHintOpen && test.hint && (
                <div className="mt-2 pt-2 border-t border-dashed border-[#333333] text-[11px] font-mono text-amber-300/90 bg-amber-950/20 p-2 rounded">
                  <span className="font-bold text-amber-400 block mb-0.5">💡 Petunjuk:</span>
                  {test.hint}
                </div>
              )}
            </div>
          );
        })}

        {evaluation.allPassed && evaluation.totalTests > 0 && (
          <div className="p-2 text-center bg-emerald-950/40 border border-emerald-600/50 text-emerald-300 text-xs font-mono rounded animate-pulse">
            🎉 Semua syarat modul ini telah terpenuhi! Silakan lanjut ke langkah berikutnya.
          </div>
        )}
      </div>
    </div>
  );
}
