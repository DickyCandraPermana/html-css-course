"use client";

import React, { useMemo } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { oneDark } from "@codemirror/theme-one-dark";
import { FileCode, FileType } from "lucide-react";

interface CodeEditorProps {
  activeTab: "html" | "css";
  onTabChange: (tab: "html" | "css") => void;
  htmlCode: string;
  cssCode: string;
  onHtmlChange: (val: string) => void;
  onCssChange: (val: string) => void;
  height?: string;
}

export default function CodeEditor({
  activeTab,
  onTabChange,
  htmlCode,
  cssCode,
  onHtmlChange,
  onCssChange,
  height = "340px",
}: CodeEditorProps) {
  const extensions = useMemo(() => {
    return activeTab === "html" ? [html(), oneDark] : [css(), oneDark];
  }, [activeTab]);

  return (
    <div className="flex flex-col h-full bg-[#111111] border border-[#333333] overflow-hidden">
      {/* Tab Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#0a0a0a] border-b border-dashed border-[#333333]">
        <div className="flex items-center space-x-1">
          <button
            type="button"
            onClick={() => onTabChange("html")}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-mono transition-all ${
              activeTab === "html"
                ? "bg-[#1a1a1a] text-white border-b-2 border-white font-semibold"
                : "text-[#888888] hover:text-white"
            }`}
          >
            <FileCode size={13} className="text-amber-500" />
            index.html
          </button>
          <button
            type="button"
            onClick={() => onTabChange("css")}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-mono transition-all ${
              activeTab === "css"
                ? "bg-[#1a1a1a] text-white border-b-2 border-white font-semibold"
                : "text-[#888888] hover:text-white"
            }`}
          >
            <FileType size={13} className="text-blue-400" />
            style.css
          </button>
        </div>
        <span className="text-[10px] font-mono text-[#666666] tracking-wider uppercase">
          {activeTab.toUpperCase()} EDITOR // LIVE
        </span>
      </div>

      {/* Editor Body */}
      <div className="flex-1 overflow-auto">
        <CodeMirror
          value={activeTab === "html" ? htmlCode : cssCode}
          height={height}
          extensions={extensions}
          theme={oneDark}
          onChange={(value) => {
            if (activeTab === "html") {
              onHtmlChange(value);
            } else {
              onCssChange(value);
            }
          }}
          className="text-xs"
          basicSetup={{
            lineNumbers: true,
            foldGutter: true,
            autocompletion: true,
            bracketMatching: true,
            closeBrackets: true,
          }}
        />
      </div>
    </div>
  );
}
