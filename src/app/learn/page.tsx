"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  CheckCircle2,
  Lock,
  RotateCcw,
  Upload,
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

  // Active module step: 0 to 7
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
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
    currentStep?: number;
    completedSteps?: number[];
  } | null>(null);

  // Sync state
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSynced, setLastSynced] = useState<string | null>(null);

  // Showcase publish state (Step 7)
  const [cafeName, setCafeName] = useState<string>("");
  const [isPublishing, setIsPublishing] = useState<boolean>(false);

  // Get current module object
  const activeModule: ModuleData = useMemo(() => {
    return MODULES.find((m) => m.id === currentStep) || MODULES[0];
  }, [currentStep]);

  // CSS visibility
  const showCssTab = activeModule.requiresCss ?? false;

  // If active module does not need CSS and active tab is CSS, force back to HTML
  useEffect(() => {
    if (!showCssTab && editorTab === "css") {
      setEditorTab("html");
    }
  }, [showCssTab, editorTab]);

  // Calculate highest unlocked step
  const maxUnlockedStep = useMemo(() => {
    if (completedSteps.length === 0) return 0;
    return Math.max(0, ...completedSteps.map((s) => s + 1));
  }, [completedSteps]);

  const isStepUnlocked = useCallback(
    (stepId: number) => {
      return stepId === 0 || completedSteps.includes(stepId) || stepId <= maxUnlockedStep;
    },
    [completedSteps, maxUnlockedStep]
  );

  // Evaluate tests in real time
  const [evaluation, setEvaluation] = useState<StepEvaluation>(() => {
    return evaluateStep(0, "", "");
  });

  // Re-run evaluation whenever code or current step changes
  useEffect(() => {
    const evalResult = evaluateStep(currentStep, htmlCode, cssCode);
    setEvaluation(evalResult);
  }, [currentStep, htmlCode, cssCode]);

  // Automatically register completed step when all tests pass
  useEffect(() => {
    if (evaluation.allPassed && !completedSteps.includes(currentStep)) {
      setCompletedSteps((prev) => {
        const next = [...prev, currentStep];
        if (typeof window !== "undefined") {
          localStorage.setItem("kopicode_completed_steps", JSON.stringify(next));
        }
        return next;
      });
    }
  }, [evaluation.allPassed, currentStep, completedSteps]);

  // Load participant and drafts from LocalStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedParticipant = localStorage.getItem("kopicode_participant");
      if (storedParticipant) {
        try {
          const parsed = JSON.parse(storedParticipant);
          setParticipant(parsed);
          if (typeof parsed.currentStep === "number") {
            setCurrentStep(parsed.currentStep);
          }
          if (Array.isArray(parsed.completedSteps)) {
            setCompletedSteps(parsed.completedSteps);
          }
        } catch {
          // ignore
        }
      }

      const savedCompleted = localStorage.getItem("kopicode_completed_steps");
      if (savedCompleted) {
        try {
          const parsedArr = JSON.parse(savedCompleted);
          if (Array.isArray(parsedArr)) {
            setCompletedSteps(parsedArr);
          }
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
            completedSteps,
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
  }, [htmlCode, cssCode, currentStep, completedSteps, participant]);

  // Reset to starter code of current module (NO SOLUTION LEAK)
  const handleResetStarter = () => {
    if (
      window.confirm(
        "Reset kode ke template awal modul ini? Pekerjaan Anda pada modul ini akan dikembalikan ke kondisi awal."
      )
    ) {
      setHtmlCode(activeModule.starterHtml);
      setCssCode(activeModule.starterCss);
      if (typeof window !== "undefined") {
        localStorage.setItem("kopicode_draft_html", activeModule.starterHtml);
        localStorage.setItem("kopicode_draft_css", activeModule.starterCss);
      }
    }
  };

  // Next step handler (checks validation and unlocks next step)
  const handleNextStep = () => {
    if (!evaluation.allPassed) return;

    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps((prev) => {
        const next = [...prev, currentStep];
        if (typeof window !== "undefined") {
          localStorage.setItem("kopicode_completed_steps", JSON.stringify(next));
        }
        return next;
      });
    }

    if (currentStep < MODULES.length - 1) {
      const nextStepId = currentStep + 1;
      setCurrentStep(nextStepId);

      const nextModule = MODULES.find((m) => m.id === nextStepId);
      if (nextModule && !nextModule.requiresCss) {
        setEditorTab("html");
      }
    }
  };

  // Prev step handler
  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
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
    <div className="h-screen w-screen max-h-screen overflow-hidden bg-[#050505] text-[#F5F5F5] flex flex-col select-none">
      <Navbar />

      {/* Step Progress Top Bar (shrink-0) */}
      <div className="bg-[#0a0a0a] border-b border-dashed border-[#333333] px-4 py-2 overflow-x-auto shrink-0">
        <div className="max-w-[1920px] mx-auto flex items-center justify-between gap-4">
          {/* Step Pill Indicators */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
            {MODULES.map((m) => {
              const isActive = m.id === currentStep;
              const isCompleted = completedSteps.includes(m.id);
              const unlocked = isStepUnlocked(m.id);

              return (
                <button
                  key={m.id}
                  type="button"
                  disabled={!unlocked}
                  onClick={() => {
                    if (unlocked) {
                      setCurrentStep(m.id);
                      const mod = MODULES.find((modItem) => modItem.id === m.id);
                      if (mod && !mod.requiresCss) {
                        setEditorTab("html");
                      }
                    }
                  }}
                  title={
                    !unlocked
                      ? "Modul ini terkunci. Selesaikan modul sebelumnya terlebih dahulu."
                      : `${m.badge}: ${m.title}`
                  }
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-white text-black font-bold shadow-md ring-1 ring-white"
                      : isCompleted
                      ? "bg-[#141414] text-emerald-400 hover:bg-[#1f1f1f] border border-emerald-950 cursor-pointer"
                      : unlocked
                      ? "bg-[#111111] text-[#aaaaaa] hover:text-white border border-[#222222] cursor-pointer"
                      : "bg-[#090909] text-[#444444] border border-[#181818] cursor-not-allowed opacity-40"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 size={12} className="text-emerald-400" />
                  ) : !unlocked ? (
                    <Lock size={11} className="text-[#555555]" />
                  ) : (
                    <span>0{m.id}</span>
                  )}
                  <span className="hidden md:inline truncate max-w-[120px]">{m.title.split(",")[0]}</span>
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
              className="bracket-framer text-xs text-[#aaaaaa] hover:text-white flex items-center gap-1"
            >
              {isSidebarOpen ? <PanelRightClose size={13} /> : <PanelRightOpen size={13} />}
              {isSidebarOpen ? "Tutup Sidebar" : "Buka Sidebar"}
            </button>
          </div>
        </div>
      </div>

      {/* Main Learning Workspace (1x1 Viewport 2-Column Pane) */}
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row overflow-hidden w-full select-text">
        {/* Left Column: Course Theory & Tasks (Independently scrollable) */}
        <div
          className={`flex-1 min-h-0 h-full overflow-y-auto p-6 sm:p-10 transition-all ${
            isSidebarOpen ? "lg:max-w-[52%] xl:max-w-[55%]" : "w-full max-w-4xl mx-auto"
          }`}
        >
          {/* Module Header */}
          <div className="mb-8 pb-6 border-b border-dashed border-[#222222]">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-1 bg-[#1a1a1a] border border-[#333333] rounded text-[11px] font-mono text-amber-400 font-semibold tracking-wider">
                {activeModule.badge}
              </span>
              <span className="text-[11px] font-mono text-[#666666]">
                STEP {activeModule.id} DARI {MODULES.length - 1}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-2">
              {activeModule.title}
            </h1>
            <p className="text-xs sm:text-sm font-mono text-[#aaaaaa]">
              // {activeModule.subtitle}
            </p>
          </div>

          {/* Theory Section with course-prose */}
          <div className="course-prose space-y-6 text-sm text-[#cccccc] leading-relaxed mb-8">
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
          <div className="flex items-center justify-between pt-6 border-t border-dashed border-[#333333] mt-8 mb-6">
            <button
              type="button"
              onClick={handlePrevStep}
              disabled={currentStep === 0}
              className="bracket-framer text-xs flex items-center gap-1 disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronLeft size={14} /> Step Sebelumnya
            </button>

            <span className="font-mono text-xs text-[#666666]">
              {currentStep} / {MODULES.length - 1}
            </span>

            {currentStep < MODULES.length - 1 ? (
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

        {/* Right Column: Practice Sidebar (Editor, Tests, Preview - Fixed independent column) */}
        {isSidebarOpen && (
          <div className="w-full lg:w-[48%] xl:w-[45%] shrink-0 h-full border-l border-dashed border-[#333333] bg-[#0c0c0c] flex flex-col min-h-0 overflow-hidden">
            {/* Sidebar Top Toolbar (shrink-0) */}
            <div className="flex items-center justify-between px-3 py-2 bg-[#080808] border-b border-dashed border-[#333333] shrink-0">
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
                  title="Kembalikan kode ke template awal modul ini"
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

            {/* Code Editor (flex-[1.15] shrink-0 flex flex-col min-h-0) */}
            <div className="flex-[1.15] min-h-[190px] max-h-[340px] shrink-0 flex flex-col min-h-0">
              <CodeEditor
                activeTab={editorTab}
                onTabChange={setEditorTab}
                htmlCode={htmlCode}
                cssCode={cssCode}
                onHtmlChange={handleHtmlChange}
                onCssChange={handleCssChange}
                height="100%"
                showCssTab={showCssTab}
              />
            </div>

            {/* Test Checklist (shrink-0 p-2) */}
            <div className="shrink-0 p-2 border-t border-b border-[#222222]">
              <TestChecklist
                evaluation={evaluation}
                onRunTests={() => {
                  const evalResult = evaluateStep(currentStep, htmlCode, cssCode);
                  setEvaluation(evalResult);
                }}
              />
            </div>

            {/* Live Preview (flex-1 min-h-[180px] flex flex-col min-h-0 overflow-hidden) */}
            <div className="flex-1 min-h-[180px] flex flex-col min-h-0 overflow-hidden">
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
                    className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-black font-mono font-bold text-xs rounded transition-colors flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
                  >
                    <Upload size={13} />
                    {isPublishing ? "Menyimpan..." : "Publish Karya 🚀"}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Zen Fullscreen Modal */}
      <FullscreenModal
        isOpen={fullscreenMode !== "none"}
        onClose={() => setFullscreenMode("none")}
        mode={fullscreenMode === "zen-split" ? "zen-split" : "preview-only"}
        htmlCode={htmlCode}
        cssCode={cssCode}
        onHtmlChange={handleHtmlChange}
        onCssChange={handleCssChange}
        activeTab={editorTab}
        onTabChange={setEditorTab}
        stepTitle={activeModule.title}
        showCssTab={showCssTab}
      />
    </div>
  );
}
