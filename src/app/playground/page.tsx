"use client";

import React, { useState, useEffect } from "react";
import { Copy, RotateCcw, Sparkles, Check, Download, Maximize2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import CodeEditor from "@/components/CodeEditor";
import LivePreview from "@/components/LivePreview";
import FullscreenModal from "@/components/FullscreenModal";

const DEFAULT_PLAYGROUND_HTML = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Laboratorium HTML & CSS Bebas</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="playground-card">
    <h1>Selamat Datang di Live Playground! ☕</h1>
    <p>Di sini kamu bebas bereksperimen dengan tag HTML dan styling CSS apa pun secara instan.</p>
    <button class="btn-demo" onclick="alert('Halo dari Playground!');">Klik Saya!</button>
  </div>
</body>
</html>`;

const DEFAULT_PLAYGROUND_CSS = `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: #0c0a09;
  color: #f5f5f4;
  font-family: 'Plus Jakarta Sans', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

.playground-card {
  background: linear-gradient(135deg, #1c1917 0%, #292524 100%);
  border: 1px dashed #44403c;
  border-radius: 12px;
  padding: 32px;
  max-width: 500px;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
}

h1 {
  font-size: 1.5rem;
  margin-bottom: 12px;
  color: #f59e0b;
}

p {
  font-size: 0.9rem;
  color: #a8a29e;
  line-height: 1.6;
  margin-bottom: 20px;
}

.btn-demo {
  background-color: #d97706;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-demo:hover {
  background-color: #f59e0b;
  transform: translateY(-2px);
}`;

export default function PlaygroundPage() {
  const [editorTab, setEditorTab] = useState<"html" | "css">("html");
  const [htmlCode, setHtmlCode] = useState<string>(DEFAULT_PLAYGROUND_HTML);
  const [cssCode, setCssCode] = useState<string>(DEFAULT_PLAYGROUND_CSS);
  const [copied, setCopied] = useState<boolean>(false);
  const [fullscreenMode, setFullscreenMode] = useState<"none" | "preview-only">("none");

  // Load from local storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedHtml = localStorage.getItem("kopicode_playground_html");
      const savedCss = localStorage.getItem("kopicode_playground_css");
      if (savedHtml) setHtmlCode(savedHtml);
      if (savedCss) setCssCode(savedCss);
    }
  }, []);

  const handleHtmlChange = (val: string) => {
    setHtmlCode(val);
    if (typeof window !== "undefined") {
      localStorage.setItem("kopicode_playground_html", val);
    }
  };

  const handleCssChange = (val: string) => {
    setCssCode(val);
    if (typeof window !== "undefined") {
      localStorage.setItem("kopicode_playground_css", val);
    }
  };

  const handleCopyCode = () => {
    const combined = `<!-- INDEX.HTML -->\n${htmlCode}\n\n/* STYLE.CSS */\n${cssCode}`;
    navigator.clipboard.writeText(combined);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInsertSnippet = (type: "form" | "table" | "flex" | "reset") => {
    if (type === "reset") {
      if (window.confirm("Kembalikan playground ke template awal?")) {
        handleHtmlChange(DEFAULT_PLAYGROUND_HTML);
        handleCssChange(DEFAULT_PLAYGROUND_CSS);
      }
      return;
    }

    if (type === "form") {
      const snippet = `\n<form class="custom-form">\n  <label>Nama Tamu:</label>\n  <input type="text" placeholder="Nama..." required>\n  <button type="submit">Kirim Form</button>\n</form>\n`;
      handleHtmlChange(htmlCode + snippet);
    } else if (type === "table") {
      const snippet = `\n<table border="1">\n  <thead><tr><th>Item</th><th>Harga</th></tr></thead>\n  <tbody><tr><td>Espresso</td><td>Rp 18.000</td></tr></tbody>\n</table>\n`;
      handleHtmlChange(htmlCode + snippet);
    } else if (type === "flex") {
      const snippet = `\n<nav style="display: flex; justify-content: space-between; padding: 12px; background: #222;">\n  <div>LOGO</div>\n  <div style="display: flex; gap: 12px;"><span>Beranda</span><span>Kontak</span></div>\n</nav>\n`;
      handleHtmlChange(htmlCode + snippet);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] flex flex-col">
      <Navbar />

      {/* Playground Action Bar */}
      <div className="bg-[#0b0b0b] border-b border-dashed border-[#333333] px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-white flex items-center gap-1.5">
              <Sparkles size={14} className="text-amber-400" />
              PLAYGROUND // LIVE SCRATCHPAD
            </span>
            <span className="hidden sm:inline-block text-[11px] font-mono text-[#666666]">
              (Penyimpanan independen, tidak mengubah draft materi)
            </span>
          </div>

          {/* Quick Tag Snippets */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-mono text-[#777777] hidden md:inline">Sisip Snippet:</span>
            <button
              type="button"
              onClick={() => handleInsertSnippet("form")}
              className="px-2 py-1 bg-[#1a1a1a] hover:bg-[#252525] border border-[#333333] rounded text-[11px] font-mono text-white transition-colors"
            >
              + Form
            </button>
            <button
              type="button"
              onClick={() => handleInsertSnippet("table")}
              className="px-2 py-1 bg-[#1a1a1a] hover:bg-[#252525] border border-[#333333] rounded text-[11px] font-mono text-white transition-colors"
            >
              + Tabel
            </button>
            <button
              type="button"
              onClick={() => handleInsertSnippet("flex")}
              className="px-2 py-1 bg-[#1a1a1a] hover:bg-[#252525] border border-[#333333] rounded text-[11px] font-mono text-white transition-colors"
            >
              + Flexbox
            </button>

            <span className="text-[#444444] px-1">|</span>

            <button
              type="button"
              onClick={handleCopyCode}
              className="bracket-framer text-xs text-[#aaaaaa] hover:text-white flex items-center gap-1"
            >
              {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
              {copied ? "Tersalin!" : "Salin Kode"}
            </button>

            <button
              type="button"
              onClick={() => handleInsertSnippet("reset")}
              title="Reset ke Default"
              className="p-1.5 text-[#777777] hover:text-white rounded transition-colors"
            >
              <RotateCcw size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Split Workspace */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 max-w-7xl mx-auto w-full border-x border-dashed border-[#333333]">
        {/* Editor Side */}
        <div className="h-[450px] lg:h-[calc(100vh-105px)] border-b lg:border-b-0 lg:border-r border-dashed border-[#333333]">
          <CodeEditor
            activeTab={editorTab}
            onTabChange={setEditorTab}
            htmlCode={htmlCode}
            cssCode={cssCode}
            onHtmlChange={handleHtmlChange}
            onCssChange={handleCssChange}
            height="calc(100vh - 165px)"
          />
        </div>

        {/* Live Preview Side */}
        <div className="h-[450px] lg:h-[calc(100vh-105px)]">
          <LivePreview
            htmlCode={htmlCode}
            cssCode={cssCode}
            onOpenFullscreen={() => setFullscreenMode("preview-only")}
            height="calc(100vh - 165px)"
          />
        </div>
      </div>

      <FullscreenModal
        isOpen={fullscreenMode !== "none"}
        onClose={() => setFullscreenMode("none")}
        mode="preview-only"
        htmlCode={htmlCode}
        cssCode={cssCode}
        onHtmlChange={handleHtmlChange}
        onCssChange={handleCssChange}
        activeTab={editorTab}
        onTabChange={setEditorTab}
        stepTitle="Live Playground Preview"
      />
    </div>
  );
}
