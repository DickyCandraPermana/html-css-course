"use client";

import React, { useEffect } from "react";
import { X, SplitSquareVertical } from "lucide-react";
import CodeEditor from "./CodeEditor";
import LivePreview from "./LivePreview";

interface FullscreenModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "zen-split" | "preview-only";
  htmlCode: string;
  cssCode: string;
  onHtmlChange: (val: string) => void;
  onCssChange: (val: string) => void;
  activeTab: "html" | "css";
  onTabChange: (tab: "html" | "css") => void;
  stepTitle?: string;
}

export default function FullscreenModal({
  isOpen,
  onClose,
  mode,
  htmlCode,
  cssCode,
  onHtmlChange,
  onCssChange,
  activeTab,
  onTabChange,
  stepTitle,
}: FullscreenModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#050505] flex flex-col overflow-hidden">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0c0c0c] border-b border-dashed border-[#333333]">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[#888888]">
            [ ZEN FOCUS MODE ]_
          </span>
          {stepTitle && (
            <span className="text-xs text-white font-medium">
              // {stepTitle}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="bracket-framer text-xs text-[#aaaaaa] hover:text-white flex items-center gap-1.5"
        >
          <X size={14} /> Exit Fullscreen (Esc)
        </button>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {mode === "zen-split" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full gap-0">
            {/* Editor Half */}
            <div className="h-full border-r border-dashed border-[#333333]">
              <CodeEditor
                activeTab={activeTab}
                onTabChange={onTabChange}
                htmlCode={htmlCode}
                cssCode={cssCode}
                onHtmlChange={onHtmlChange}
                onCssChange={onCssChange}
                height="calc(100vh - 120px)"
              />
            </div>
            {/* Preview Half */}
            <div className="h-full">
              <LivePreview
                htmlCode={htmlCode}
                cssCode={cssCode}
                height="calc(100vh - 120px)"
              />
            </div>
          </div>
        ) : (
          /* Pure Full Preview */
          <div className="w-full h-full">
            <LivePreview
              htmlCode={htmlCode}
              cssCode={cssCode}
              height="calc(100vh - 80px)"
            />
          </div>
        )}
      </div>
    </div>
  );
}
