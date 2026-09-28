"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  CheckCircle2,
  Lock,
  Sparkles,
  RotateCcw,
  Upload,
  BookOpen,
  Code2,
  PanelRightClose,
  PanelRightOpen,
  Lightbulb,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import CodeEditor from "@/components/CodeEditor";
import LivePreview from "@/components/LivePreview";
import TestChecklist from "@/components/TestChecklist";
import FullscreenModal from "@/components/FullscreenModal";
import { MODULES, ModuleData } from "@/lib/curriculum";
import { evaluateStep, StepEvaluation } from "@/lib/validator";

export default function LearnPage() {
  const router = useRouter();

  // Active module step: 1 to 7
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [editorTab, setEditorTab] = useState<"html" | "css">("html");

  // Code state
  const [htmlCode, setHtmlCode] = useState<string>("");
  const [cssCode, setCssCode] = useState<string>("");

  // UI toggles
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [fullscreenMode, setFullscreenMode] = useState<"none" | "zen-split" | "preview-only">("none");

  // Participant info
  const [participant, setParticipant] = useState<{
    id: string;
    name: string;
    sessionCode: string;
  } | null>(null);

  // Sync state
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSynced, setLastSynced] = useState<string | null>(null);

  // Showcase publish state (Step 7)
  const [cafeName, setCafeName] = useState<string>("");
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [publishSuccess, setPublishSuccess] = useState<boolean>(false);

  // Get current module object
  const activeModule: ModuleData = useMemo(() => {
    return MODULES.find((m) => m.id === currentStep) || MODULES[0];
  }, [currentStep]);

  // Evaluate tests in real time
  const [evaluation, setEvaluation] = useState<StepEvaluation>(() => {
    return evaluateStep(1, "", "");
  });

  // Re-run evaluation whenever code or current step changes
  useEffect(() => {
    const evalResult = evaluateStep(currentStep, htmlCode, cssCode);
    setEvaluation(evalResult);
  }, [currentStep, htmlCode, cssCode]);

  // Load participant and drafts from LocalStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedParticipant = localStorage.getItem("kopicode_participant");
      if (storedParticipant) {
        try {
          const parsed = JSON.parse(storedParticipant);
          setParticipant(parsed);
        } catch {
          // ignore
        }
      }

      // Load saved drafts
      const savedHtml = localStorage.getItem("kopicode_draft_html");
      const savedCss = localStorage.getItem("kopicode_draft_css");

      if (savedHtml) {
        setHtmlCode(savedHtml);
      } else {
        setHtmlCode(MODULES[0].starterHtml);
      }

      if (savedCss) {
        setCssCode(savedCss);
      } else {
        setCssCode(MODULES[0].starterCss);
      }
    }
  }, []);

  // Save to LocalStorage instantly on every keystroke
  const handleHtmlChange = useCallback((val: string) => {
    setHtmlCode(val);
    if (typeof window !== "undefined") {
      localStorage.setItem("kopicode_draft_html", val);
    }
  }, []);

  const handleCssChange = useCallback((val: string) => {
    setCssCode(val);
    if (typeof window !== "undefined") {
      localStorage.setItem("kopicode_draft_css", val);
    }
  }, []);

  // Debounced cloud sync to PostgreSQL (1500ms debounce)
  useEffect(() => {
    if (!participant?.id || participant.id.startsWith("local-")) return;

    const timer = setTimeout(async () => {
      setIsSyncing(true);
      try {
        await fetch("/api/sync-draft", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            participantId: participant.id,
            htmlDraft: htmlCode,
            cssDraft: cssCode,
            currentStep,
          }),
        });
        setLastSynced(new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }));
      } catch (err) {
        console.warn("Cloud sync error:", err);
      } finally {
        setIsSyncing(false);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [htmlCode, cssCode, currentStep, participant]);

  // Reset to starter code of current module
  const handleResetStarter = () => {
    if (window.confirm("Kembalikan kode ke template awal modul ini?")) {
      setHtmlCode(activeModule.solutionHtml || activeModule.starterHtml);
      setCssCode(activeModule.solutionCss || activeModule.starterCss);
    }
  };

  // Next step handler (checks validation)
  const handleNextStep = () => {
    if (currentStep < MODULES.length) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Prev step handler
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Publish to showcase (Step 7)
  const handlePublishShowcase = async () => {
    if (!cafeName.trim()) {
      alert("Silakan masukkan nama brand kedai kopimu terlebih dahulu.");
      return;
    }

    setIsPublishing(true);
    try {
      const res = await fetch("/api/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          participantId: participant?.id || "anonymous",
          participantName: participant?.name || "Kreator Kopi",
          cafeName: cafeName.trim(),
          htmlCode,
          cssCode,
        }),
      });

      if (res.ok) {
        setPublishSuccess(true);
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });
        setTimeout(() => {
          router.push("/showcase");
        }, 2200);
      }
    } catch {
      alert("Gagal mempublikasikan ke showcase, coba sesaat lagi.");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] flex flex-col">
      <Navbar />

      {/* Step Progress Top Bar */}
      <div className="bg-[#0a0a0a] border-b border-dashed border-[#333333] px-4 py-2 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Step Pill Indicators */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {MODULES.map((m) => {
              const isActive = m.id === currentStep;
              const isPast = m.id < currentStep;

              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setCurrentStep(m.id)}
                  className={`flex items-center gap-1 px-2.5 py-1 text-xs font-mono rounded transition-all ${
                    isActive
                      ? "bg-white text-black font-bold shadow"
                      : isPast
                      ? "bg-[#161616] text-emerald-400 hover:bg-[#202020] border border-emerald-950"
                      : "bg-[#111111] text-[#777777] hover:text-white border border-[#222222]"
                  }`}
                >
                  {isPast ? <CheckCircle2 size={12} className="text-emerald-400" /> : <span>0{m.id}</span>}
                  <span className="hidden md:inline truncate max-w-[100px]">{m.title.split(",")[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Sync & Sidebar Toggle Action */}
          <div className="flex items-center gap-3 shrink-0 text-xs font-mono">
            <span className="hidden sm:inline-block text-[#777777]">
              {isSyncing ? "☁️ Menyimpan..." : lastSynced ? `☁️ Tersimpan (${lastSynced})` : "💾 Disimpan Lokal"}
            </span>

            <button
              type="button"
              onClick={() => setIsSidebarOpen((prev) => !prev)}
              className="bracket-framer text-xs text-[#888888] hover:text-white flex items-center gap-1"
            >
              {isSidebarOpen ? <PanelRightClose size={13} /> : <PanelRightOpen size={13} />}
              {isSidebarOpen ? "Tutup Sidebar" : "Buka Sidebar"}
            </button>
          </div>
        </div>
      </div>

      {/* Main Learning Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden max-w-7xl mx-auto w-full">
        {/* Left Column: Course Theory & Tasks */}
        <div
          className={`flex-1 p-4 sm:p-8 overflow-y-auto transition-all ${
            isSidebarOpen ? "lg:max-w-[55%]" : "w-full max-w-4xl mx-auto"
          }`}
        >
          {/* Module Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-[#1a1a1a] border border-[#333333] rounded text-[11px] font-mono text-amber-400 font-semibold">
                {activeModule.badge}
              </span>
              <span className="text-[11px] font-mono text-[#666666]">
                STEP {activeModule.id} DARI 7
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
              {activeModule.title}
            </h1>
            <p className="text-xs sm:text-sm font-mono text-[#aaaaaa]">
              // {activeModule.subtitle}
            </p>
          </div>

          {/* Theory Section */}
          <div className="space-y-6 text-sm text-[#cccccc] leading-relaxed mb-8">
            {/* Analogy Callout Card */}
            <div className="p-4 bg-[#0e0e0e] border border-dashed border-[#333333] rounded">
              <div className="flex items-start gap-2.5">
                <span className="p-1 bg-[#1a1a1a] border border-[#333333] rounded text-amber-400 mt-0.5">
                  <Lightbulb size={15} />
                </span>
                <div>
                  <h4 className="font-mono text-xs font-semibold text-white mb-1">
                    ANALOGI KEDAI KOPI:
                  </h4>
                  <p className="text-xs text-[#aaaaaa] leading-relaxed">
                    {activeModule.theory.analogy}
                  </p>
                </div>
              </div>
            </div>

            {/* Concept Paragraph */}
            <div>
              <h3 className="text-base font-semibold text-white mb-2 font-mono">
                &gt; Konsep Dasar:
              </h3>
              <p className="text-[#cccccc]">{activeModule.theory.concept}</p>
            </div>

            {/* Supporting Tips Callout Box */}
            {activeModule.theory.supportingTips && (
              <div className="p-4 bg-[#111111] border border-[#2b2b2b] rounded">
                <h4 className="font-mono text-xs font-bold text-amber-400 mb-3 uppercase tracking-wider">
                  {activeModule.theory.supportingTips.title}
                </h4>
                <div className="space-y-2.5">
                  {activeModule.theory.supportingTips.items.map((item, idx) => (
                    <div key={idx} className="text-xs border-l-2 border-[#444444] pl-3 py-0.5">
                      <div className="flex items-center gap-2 mb-0.5">
                        {item.tag && (
                          <code className="text-amber-300 bg-[#1c1c1c] px-1.5 py-0.5 rounded font-mono font-bold">
                            {item.tag}
                          </code>
                        )}
                        <span className="font-semibold text-white">{item.name}</span>
                      </div>
                      <p className="text-[#999999]">{item.explanation}</p>
                      {item.example && (
                        <code className="text-[11px] font-mono text-[#777777] block mt-1">
                          Contoh: {item.example}
                        </code>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Code Snippet Example */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-[#888888] mb-1">
                <span>{activeModule.theory.codeExample.title}</span>
                <span className="uppercase">{activeModule.theory.codeExample.language}</span>
              </div>
              <pre className="p-4 bg-[#0a0a0a] border border-[#222222] rounded overflow-x-auto text-xs font-mono text-[#e0e0e0] leading-relaxed">
                <code>{activeModule.theory.codeExample.code}</code>
              </pre>
            </div>

            {/* Action Tasks Checklist */}
            <div className="p-4 bg-[#141414] border border-[#333333] rounded">
              <h3 className="font-mono text-xs font-bold text-white mb-3 flex items-center gap-2">
                <Code2 size={15} className="text-amber-400" />
                INSTRUKSI PRAKTEK DI SIDEBAR:
              </h3>
              <ol className="space-y-2 text-xs list-decimal list-inside text-[#cccccc]">
                {activeModule.tasks.map((task, i) => (
                  <li key={i} className="leading-relaxed">
                    <span>{task}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Navigation Controls in Left Column */}
          <div className="flex items-center justify-between pt-6 border-t border-dashed border-[#333333] mt-8">
            <button
              type="button"
              onClick={handlePrevStep}
              disabled={currentStep === 1}
              className="bracket-framer text-xs flex items-center gap-1 disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronLeft size={14} /> Step Sebelumnya
            </button>

            <span className="font-mono text-xs text-[#666666]">
              {currentStep} / {MODULES.length}
            </span>

            {currentStep < MODULES.length ? (
              <button
                type="button"
                onClick={handleNextStep}
                disabled={!evaluation.allPassed}
                className={`px-4 py-2 font-mono text-xs font-bold rounded flex items-center gap-2 transition-all ${
                  evaluation.allPassed
                    ? "bg-white text-black hover:bg-neutral-200 cursor-pointer shadow-lg"
                    : "bg-[#1a1a1a] text-[#555555] border border-[#2a2a2a] cursor-not-allowed"
                }`}
              >
                {!evaluation.allPassed && <Lock size={12} />}
                Lanjut ke Step {currentStep + 1}
                <ChevronRight size={14} />
              </button>
            ) : (
              <span className="text-xs font-mono text-emerald-400">Modul Terakhir ✓</span>
            )}
          </div>
        </div>

        {/* Right Column: Practice Sidebar (Editor, Tests, Preview) */}
        {isSidebarOpen && (
          <div className="lg:w-[45%] border-l border-dashed border-[#333333] bg-[#0c0c0c] flex flex-col h-full lg:h-[calc(100vh-89px)] overflow-hidden">
            {/* Sidebar Top Toolbar */}
            <div className="flex items-center justify-between px-3 py-2 bg-[#080808] border-b border-dashed border-[#333333]">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-white flex items-center gap-1">
                  <Code2 size={13} className="text-amber-400" />
                  CODE LAB // RUNNER
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleResetStarter}
                  title="Kembalikan kode ke contoh modul ini"
                  className="p-1 text-[#777777] hover:text-white rounded transition-colors"
                >
                  <RotateCcw size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => setFullscreenMode("zen-split")}
                  title="Mode Zen Layar Penuh"
                  className="bracket-framer text-xs text-[#aaaaaa] hover:text-white flex items-center gap-1"
                >
                  <Maximize2 size={12} /> Zen Mode
                </button>
              </div>
            </div>

            {/* Code Editor (Upper Section) */}
            <div className="h-[280px] shrink-0">
              <CodeEditor
                activeTab={editorTab}
                onTabChange={setEditorTab}
                htmlCode={htmlCode}
                cssCode={cssCode}
                onHtmlChange={handleHtmlChange}
                onCssChange={handleCssChange}
                height="230px"
              />
            </div>

            {/* Test Checklist (Middle Section) */}
            <div className="shrink-0 p-2">
              <TestChecklist
                evaluation={evaluation}
                onRunTests={() => {
                  const evalResult = evaluateStep(currentStep, htmlCode, cssCode);
                  setEvaluation(evalResult);
                }}
              />
            </div>

            {/* Live Preview (Lower Section) */}
            <div className="flex-1 min-h-[220px] overflow-hidden">
              <LivePreview
                htmlCode={htmlCode}
                cssCode={cssCode}
                onOpenFullscreen={() => setFullscreenMode("preview-only")}
                height="100%"
              />
            </div>

            {/* Step 7 Publish Action Bar */}
            {currentStep === 7 && (
              <div className="p-3 bg-[#111111] border-t border-dashed border-[#333333] shrink-0">
                <label className="block text-[11px] font-mono text-[#888888] mb-1">
                  NAMA BRAND KEDAI KOPI ANDA:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={cafeName}
                    onChange={(e) => setCafeName(e.target.value)}
                    placeholder="Contoh: Kopi Senja Bahagia"
                    className="flex-1 px-3 py-1.5 bg-[#080808] border border-[#333333] rounded text-white text-xs font-mono focus:outline-none focus:border-white"
                  />
                  <button
                    type="button"
                    onClick={handlePublishShowcase}
                    disabled={isPublishing || !cafeName.trim()}
                    className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-black font-mono font-bold text-xs rounded transition-colors flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <Upload size={13} />
                    {isPublishing ? "Menyimpan..." : "Publish Karya 🚀"}
                  </button>
                </div>
                {publishSuccess && (
                  <div className="mt-2 text-center text-xs font-mono text-emerald-400">
                    🎉 Sukses dipublikasikan! Mengalihkan ke Showcase Gallery...
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Fullscreen Zen / Preview Modal */}
      <FullscreenModal
        isOpen={fullscreenMode !== "none"}
        onClose={() => setFullscreenMode("none")}
        mode={fullscreenMode === "preview-only" ? "preview-only" : "zen-split"}
        htmlCode={htmlCode}
        cssCode={cssCode}
        onHtmlChange={handleHtmlChange}
        onCssChange={handleCssChange}
        activeTab={editorTab}
        onTabChange={setEditorTab}
        stepTitle={activeModule.title}
      />
    </div>
  );
}
