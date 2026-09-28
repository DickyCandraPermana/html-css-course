"use client";

import React, { useMemo, useState } from "react";
import { Monitor, Tablet, Smartphone, Maximize2, RotateCcw } from "lucide-react";

interface LivePreviewProps {
  htmlCode: string;
  cssCode: string;
  onOpenFullscreen?: () => void;
  height?: string;
}

export type ViewportMode = "desktop" | "tablet" | "mobile";

export default function LivePreview({
  htmlCode,
  cssCode,
  onOpenFullscreen,
  height = "320px",
}: LivePreviewProps) {
  const [viewport, setViewport] = useState<ViewportMode>("desktop");
  const [key, setKey] = useState<number>(0);

  // Combine HTML and CSS safely for iframe srcDoc
  const srcDoc = useMemo(() => {
    // If the HTML already has </head>, inject style before it; otherwise append
    const cleanHtml = htmlCode || "";
    const cleanCss = cssCode || "";

    const injectedStyle = `<style>${cleanCss}</style>`;

    if (cleanHtml.includes("</head>")) {
      return cleanHtml.replace("</head>", `${injectedStyle}</head>`);
    } else if (cleanHtml.includes("<body")) {
      return `${injectedStyle}${cleanHtml}`;
    }
    return `<!DOCTYPE html><html><head><meta charset="utf-8">${injectedStyle}</head><body>${cleanHtml}</body></html>`;
  }, [htmlCode, cssCode]);

  const viewportWidth = useMemo(() => {
    switch (viewport) {
      case "mobile":
        return "375px";
      case "tablet":
        return "768px";
      case "desktop":
      default:
        return "100%";
    }
  }, [viewport]);

  return (
    <div className="flex flex-col h-full bg-[#0d0d0d] border border-[#333333] overflow-hidden">
      {/* Preview Header & Controls */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#050505] border-b border-dashed border-[#333333]">
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#161616] border border-[#262626] rounded text-[11px] font-mono text-[#aaaaaa]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            SANDBOX PREVIEW
          </div>
        </div>

        {/* Viewport Toggles & Actions */}
        <div className="flex items-center gap-1">
          <div className="flex items-center bg-[#111111] p-0.5 border border-[#2a2a2a] rounded">
            <button
              type="button"
              title="Desktop (100%)"
              onClick={() => setViewport("desktop")}
              className={`p-1 rounded transition-colors ${
                viewport === "desktop" ? "bg-[#262626] text-white" : "text-[#777777] hover:text-white"
              }`}
            >
              <Monitor size={13} />
            </button>
            <button
              type="button"
              title="Tablet (768px)"
              onClick={() => setViewport("tablet")}
              className={`p-1 rounded transition-colors ${
                viewport === "tablet" ? "bg-[#262626] text-white" : "text-[#777777] hover:text-white"
              }`}
            >
              <Tablet size={13} />
            </button>
            <button
              type="button"
              title="Mobile (375px)"
              onClick={() => setViewport("mobile")}
              className={`p-1 rounded transition-colors ${
                viewport === "mobile" ? "bg-[#262626] text-white" : "text-[#777777] hover:text-white"
              }`}
            >
              <Smartphone size={13} />
            </button>
          </div>

          <button
            type="button"
            title="Reload Iframe"
            onClick={() => setKey((prev) => prev + 1)}
            className="p-1.5 text-[#888888] hover:text-white hover:bg-[#1a1a1a] rounded transition-colors"
          >
            <RotateCcw size={13} />
          </button>

          {onOpenFullscreen && (
            <button
              type="button"
              title="Fullscreen Preview"
              onClick={onOpenFullscreen}
              className="p-1.5 text-[#888888] hover:text-white hover:bg-[#1a1a1a] rounded transition-colors"
            >
              <Maximize2 size={13} />
            </button>
          )}
        </div>
      </div>

      {/* Frame Container */}
      <div className="flex-1 bg-[#0a0a0a] flex items-center justify-center p-2 overflow-auto" style={{ minHeight: height }}>
        <div
          className="h-full bg-white shadow-2xl transition-all duration-300 relative border border-[#333333]"
          style={{
            width: viewportWidth,
            minHeight: height,
          }}
        >
          <iframe
            key={key}
            title="Live Runner Sandbox"
            srcDoc={srcDoc}
            sandbox="allow-scripts"
            className="w-full h-full min-h-[300px] border-none bg-white block"
          />
        </div>
      </div>
    </div>
  );
}
