import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { domToPng } from "modern-screenshot";
import html2canvas from "html2canvas";

// ─── @103moment Generator ────────────────────────────────────────────────────
// ─── Palette ─────────────────────────────────────────────────────��────────────
const DK      = "#2D2D2D";
const DK2     = "#4A4A4A";
const MID     = "#6B5D50";
const WALNUT  = "#8B6F47";
const CHEST   = "#A0826D";
const LINEN   = "#D4C4B0";
const CREAM   = "#E8DDD0";
const BG      = "#F5F0E8";
const AC      = "#8B6F47";
const AC2     = "#7A9B6E";
const ACCENT  = AC2;
const CONC = MID; const STONE = "#9E9E9E"; const SAND = LINEN;
const PLASTER = CREAM;
const AMBER = WALNUT; const AMBER2 = CHEST;

// ─── Fallback images ─────────────────────────────────────────────────────────
const FALLBACKS: Record<string, string> = {
  feed:  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1080&q=80",
  reels: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=1080&q=80",
  cover: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1080&q=80",
  bodyA: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1080&q=80",
  cta:   "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1080&q=80",
};

// ��── Types ────────────────────────────────────────────────────────────────────
type TemplateType = "feed" | "reels" | "cover" | "bodyA" | "bodyB" | "cta";
type Variant = "dark" | "light" | "wood" | "green" | "rainbow";
type TitleFont = "pretendard-light" | "pretendard-medium";

const TITLE_FONT_DEFS: Record<TitleFont, { family: string; weight: number; label: string; sublabel: string; lineH: number; spacing: string }> = {
  "pretendard-light":  { family: "'Pretendard',sans-serif",  weight: 300, label: "\uAC00\uB294\uCCB4", sublabel: "Light",  lineH: 1.3, spacing: "-0.02em" },
  "pretendard-medium": { family: "'Pretendard',sans-serif",  weight: 500, label: "\uC911\uAC04\uCCB4", sublabel: "Medium", lineH: 1.3, spacing: "-0.02em" },
};

interface Fields {
  imageDataUrl: string;
  imgX: number; imgY: number; imgZoom: number;
  topSloganSize: number; topSloganTop: number;
  titleSize: number;
  rainbowColor: string;
  projectNumber: string; category: string; titleKR: string; location: string;
  episodeNumber: string; reelsTitle: string; reelsSubtitle: string;
  seriesNumber: string; seriesLabel: string; coverTitle: string; coverSubtitle: string;
  pointNumber: string; pointLabel: string; bodyATitle: string; bodyABody: string; pageOf: string;
  bigNumber: string; bodyBCategory: string; bodyBTitle: string;
  bodyBBody: string;
  ctaTitle: string; ctaBody: string; ctaButton: string; instagramHandle: string;
}

const DEFAULT_FIELDS: Fields = {
  imageDataUrl: "", imgX: 50, imgY: 50, imgZoom: 1,
  topSloganSize: 20, topSloganTop: 48,
  titleSize: 88,
  rainbowColor: "#FF00FF",
  projectNumber: "", category: "\uACF5\uAC04 \uD0D0\uAD6C",
  titleKR: "\uC65C\n\uC6B0\uB9AC\uB294 \uC2A4\uD0C0\uBC85\uC2A4\uC5D0\n\uC624\uB798 \uC788\uC744\uAE4C?",
  location: "\uC6B0\uB9AC\uAC00 \uBA38\uBB34\uB294 \uACF5\uAC04\uC5D0 \uB300\uD558\uC5EC |",
  episodeNumber: "",
  reelsTitle: "\uB098\uB97C \uC2E0\uACBD\uC4F0\uC9C0 \uC54A\uB294\n\uACFC\uC678\uC120\uC0DD\uB2D8\uCC98\uB7FC",
  reelsSubtitle: "\uAC04\uC12D\uD558\uC9C0 \uC54A\uC9C0\uB9CC, \uBC29\uCE58\uD558\uC9C0\uB3C4 \uC54A\uB294\uB2E4.\n\uC801\uB2F9\uD55C \uAC70\uB9AC\uC5D0\uC11C \uC9D1\uC911\uC744 \uC9C0\uCF1C\uBCF8\uB2E4.",
  seriesNumber: "01",
  seriesLabel: "\uACF5\uAC04 \uAD00\uCC30 \u2460",
  coverTitle: "\uB098\uAC00\uB77C\uB294\n\uC2E0\uD638\uAC00 \uC5C6\uB2E4",
  coverSubtitle: "\uB208\uCE58 \uC5C6\uB294 \uC790\uB9AC, \uB113\uC740 \uC5C5\uBB34.\n\uAC00\uAE4C\uC6B0\uC9C0\uB3C4, \uBA40\uC9C0\uB3C4 \uC54A\uC740 \uD14C\uC774\uBE14.\n\uBD80\uB52A\uD788\uC9C0 \uC54A\uB294 \uC2DC\uC120.\n\n\uADF8\uB798\uC11C \uC774\uACF3\uC740\n\uBA38\uBB3C\uB7EC\uB3C4 \uB418\uB294 \uACF5\uAC04\uC73C\uB85C \uC778\uC2DD\uB41C\uB2E4.",
  pointNumber: "02",
  pointLabel: "\uACF5\uAC04 \uAD00\uCC30 \u2461",
  bodyATitle: "\uD3B8\uD788 \uC9D1\uC911 \uB418\uB294\n\uBD84\uC704\uAE30",
  bodyABody: "\uD280\uC9C0 \uC54A\uB294 \uC0C9,\n\uB0AE\uC740 \uC870\uB3C4\n\n\uCEE4\uD53C\uBCF4\uB2E4 '\uC11C\uC7AC'\uC5D0 \uAC00\uAE4D\uB2E4.",
  pageOf: "2 / 6",
  bigNumber: "03",
  bodyBCategory: "\uACF5\uAC04 \uAD00\uCC30 \u2462",
  bodyBTitle: "\uD558\uB8E8 \uC138\uBC88\n\uB2E4\uB978 \uC5BC\uAD74",
  bodyBBody: "\uC544\uCE68\uC740 \uC11C\uC7AC\n\uC624\uD6C4\uB294 \uC5C5\uBB34\uC640 \uB300\uD654\uAC00 \uC11E\uC774\uACE0\n\uC800\uB141\uC740 \uB77C\uC6B4\uC9C0\uAC00 \uB41C\uB2E4\n\n\uAC19\uC740 \uC7A5\uC18C, \uB2E4\uB978 \uBD84\uC704\uAE30.",
  ctaTitle: "\uC6B0\uB9AC\uB294 \uCEE4\uD53C\uAC00 \uC544\uB2C8\uB77C\n\uB098\uB9CC\uC758 \uC2DC\uAC04\uC744\n\uC0AC\uB7EC\uAC04\uB2E4",
  ctaBody: "\uC2A4\uD0C0\uBC85\uC2A4\uB97C \uB5A0\uB098\uC9C0 \uBABB\uD558\uB294 \uC9C4\uC9DC \uC774\uC720,\n\uACF5\uAC10\uD558\uC2DC\uB098\uC694?",
  ctaButton: "DM\uC73C\uB85C \uC0DD\uAC01 \uB098\uB204\uAE30 \u2192",
  instagramHandle: "@103moment",
};

const TEMPLATE_META = [
  { key: "feed"  as TemplateType, label: "\uBA54\uC778",       dim: "1080\u00D71350", w: 1080, h: 1350 },
  { key: "cover" as TemplateType, label: "\uC778\uC0AC\uC774\uD2B8 1", dim: "1080\u00D71350", w: 1080, h: 1350 },
  { key: "bodyA" as TemplateType, label: "\uC778\uC0AC\uC774\uD2B8 2", dim: "1080\u00D71350", w: 1080, h: 1350 },
  { key: "bodyB" as TemplateType, label: "\uC778\uC0AC\uC774\uD2B8 3", dim: "1080\u00D71350", w: 1080, h: 1350 },
  { key: "reels" as TemplateType, label: "\uD398\uB974\uC18C\uB098",   dim: "1080\u00D71350", w: 1080, h: 1350 },
  { key: "cta"   as TemplateType, label: "\uB9C8\uBB34\uB9AC",     dim: "1080\u00D71350", w: 1080, h: 1350 },
];

const FIELD_DEFS: Record<TemplateType, { key: keyof Fields; label: string; placeholder?: string; type: "text" | "textarea"; rows?: number }[]> = {
  feed:  [
    { key: "location",      label: "\uC0C1\uB2E8 \uC2AC\uB85C\uAC74",       placeholder: "\uC6B0\uB9AC\uAC00 \uBA38\uBB34\uB294 \uACF5\uAC04\uC5D0 \uB300\uD558\uC5EC |", type: "text" },
    { key: "titleKR",       label: "\uBA54\uC778 \uD0C0\uC774\uD2C0",       placeholder: "\uC65C\n\uC6B0\uB9AC\uB294 \uC2A4\uD0C0\uBC85\uC2A4\uC5D0\n\uC624\uB798 \uC788\uC744\uAE4C?", type: "textarea", rows: 3 },
  ],
  reels: [
    { key: "location",      label: "\uC0C1\uB2E8 \uC2AC\uB85C\uAC74",       placeholder: "\uC6B0\uB9AC\uAC00 \uBA38\uBB34\uB294 \uACF5\uAC04\uC5D0 \uB300\uD558\uC5EC |", type: "text" },
    { key: "reelsTitle",    label: "\uBA54\uC778 \uD0C0\uC774\uD2C0",   placeholder: "\uB098\uB97C \uC2E0\uACBD\uC4F0\uC9C0 \uC54A\uB294\n\uACFC\uC678\uC120\uC0DD\uB2D8\uCC98\uB7FC", type: "textarea", rows: 3 },
    { key: "reelsSubtitle", label: "\uC124\uBA85 \uD14D\uC2A4\uD2B8",   placeholder: "\uAC04\uC12D\uD558\uC9C0 \uC54A\uC9C0\uB9CC...", type: "textarea", rows: 3 },
  ],
  cover: [
    { key: "location",      label: "\uC0C1\uB2E8 \uC2AC\uB85C\uAC74",       placeholder: "\uC6B0\uB9AC\uAC00 \uBA38\uBB34\uB294 \uACF5\uAC04\uC5D0 \uB300\uD558\uC5EC |", type: "text" },
    { key: "seriesLabel",   label: "\uCE74\uD14C\uACE0\uB9AC",      placeholder: "\uACF5\uAC04 \uAD00\uCC30 \u2460",               type: "text" },
    { key: "coverTitle",    label: "\uBA54\uC778 \uC778\uC0AC\uC774\uD2B8", placeholder: "\uB098\uAC00\uB77C\uB294\n\uC2E0\uD638\uAC00 \uC5C6\uB2E4",   type: "textarea", rows: 3 },
    { key: "coverSubtitle", label: "\uC124\uBA85 \uBCF8\uBB38",     placeholder: "\uB208\uCE58 \uC5C6\uB294 \uC790\uB9AC, \uB113\uC740 \uC5C5\uBB34...", type: "textarea", rows: 4 },
  ],
  bodyA: [
    { key: "location",      label: "\uC0C1\uB2E8 \uC2AC\uB85C\uAC74",       placeholder: "\uC6B0\uB9AC\uAC00 \uBA38\uBB34\uB294 \uACF5\uAC04\uC5D0 \uB300\uD558\uC5EC |", type: "text" },
    { key: "pointLabel",    label: "\uCE74\uD14C\uACE0\uB9AC",      placeholder: "\uACF5\uAC04 \uAD00\uCC30 \u2461",            type: "text" },
    { key: "bodyATitle",    label: "\uBA54\uC778 \uC778\uC0AC\uC774\uD2B8", placeholder: "\uD3B8\uD788 \uC9D1\uC911 \uB418\uB294\n\uBD84\uC704\uAE30", type: "textarea", rows: 3 },
    { key: "bodyABody",     label: "\uC124\uBA85 \uBCF8\uBB38",     placeholder: "\uD280\uC9C0 \uC54A\uB294 \uC0C9,\n\uB0AE\uC740 \uC870\uB3C4...", type: "textarea", rows: 3 },
  ],
  bodyB: [
    { key: "location",      label: "\uC0C1\uB2E8 \uC2AC\uB85C\uAC74",       placeholder: "\uC6B0\uB9AC\uAC00 \uBA38\uBB34\uB294 \uACF5\uAC04\uC5D0 \uB300\uD558\uC5EC |", type: "text" },
    { key: "bodyBCategory", label: "\uCE74\uD14C\uACE0\uB9AC",      placeholder: "\uACF5\uAC04 \uAD00\uCC30 \u2462",            type: "text" },
    { key: "bodyBTitle",    label: "\uBA54\uC778 \uC778\uC0AC\uC774\uD2B8", placeholder: "\uD558\uB8E8 \uC138\uBC88\n\uB2E4\uB978 \uC5BC\uAD74",   type: "textarea", rows: 3 },
    { key: "bodyBBody",     label: "\uC124\uBA85 \uBCF8\uBB38",     placeholder: "\uC544\uCE68\uC740 \uC11C\uC7AC\n\uC624\uD6C4\uB294 \uC5C5\uBB34\uC640 \uB300\uD654\uAC00 \uC11E\uC774\uACE0\n\uC800\uB141\uC740 \uB77C\uC6B4\uC9C0\uAC00 \uB41C\uB2E4\n\n\uAC19\uC740 \uC7A5\uC18C, \uB2E4\uB978 \uBD84\uC704\uAE30.", type: "textarea", rows: 4 },
  ],
  cta: [
    { key: "location",        label: "\uC0C1\uB2E8 \uC2AC\uB85C\uAC74",       placeholder: "\uC6B0\uB9AC\uAC00 \uBA38\uBB34\uB294 \uACF5\uAC04\uC5D0 \uB300\uD558\uC5EC |", type: "text" },
    { key: "ctaTitle",        label: "\uBA54\uC778 \uBA54\uC2DC\uC9C0",    placeholder: "\uC6B0\uB9AC\uB294 \uCEE4\uD53C\uAC00 \uC544\uB2C8\uB77C\n\uB098\uB9CC\uC758 \uC2DC\uAC04\uC744\n\uC0AC\uB7EC\uAC04\uB2E4", type: "textarea", rows: 4 },
    { key: "ctaBody",         label: "\uBD80\uC81C",           placeholder: "\uC2A4\uD0C0\uBC85\uC2A4\uB97C \uB5A0\uB098\uC9C0 \uBABB\uD558\uB294 \uC9C4\uC9DC \uC774\uC720...", type: "textarea", rows: 2 },
    { key: "ctaButton",       label: "CTA \uBC84\uD2BC",       placeholder: "DM\uC73C\uB85C \uC0DD\uAC01 \uB098\uB204\uAE30 \u2192", type: "text" },
    { key: "instagramHandle", label: "\uC778\uC2A4\uD0C0\uADF8\uB7A8 \uD578\uB4E4", placeholder: "@103moment", type: "text" },
  ],
};

// ─── Image position adjuster ──────────────────────────────────────────────────
function ImageAdjuster({ src, posX, posY, zoom, onChange }: {
  src: string; posX: number; posY: number; zoom: number;
  onChange: (p: { x?: number; y?: number; zoom?: number }) => void;
}) {
  const dragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const W = 256, H = 160;

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    lastMouse.current = { x: e.clientX, y: e.clientY };
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastMouse.current.x;
    const dy = e.clientY - lastMouse.current.y;
    lastMouse.current = { x: e.clientX, y: e.clientY };
    const sens = 0.25 / zoom;
    onChange({
      x: Math.max(0, Math.min(100, posX + dx * sens)),
      y: Math.max(0, Math.min(100, posY + dy * sens)),
    });
  };
  const onPointerUp = () => { dragging.current = false; };

  const pct = (v: number) => `${Math.round(v)}%`;

  return (
    <div style={{ marginTop: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <span style={{ fontFamily: "'Pretendard', sans-serif", fontWeight: 500, fontSize: 11, color: CONC, letterSpacing: "0.05em" }}>
          {"\uC774\uBBF8\uC9C0 \uC704\uCE58 \uC870\uC815"}
        </span>
        <button
          onClick={() => onChange({ x: 50, y: 50, zoom: 1 })}
          style={{ fontFamily: "'Pretendard', sans-serif", fontWeight: 500, fontSize: 11, color: STONE, letterSpacing: "0.05em", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          {"\uCD08\uAE30\uD654"}
        </button>
      </div>
      <div
        onPointerDown={onPointerDown} onPointerMove={onPointerMove}
        onPointerUp={onPointerUp} onPointerCancel={onPointerUp}
        style={{ width: W, height: H, overflow: "hidden", cursor: "grab", position: "relative", border: `1px solid ${SAND}`, touchAction: "none", userSelect: "none" }}>
        <img src={src} draggable={false}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block",
            transform: `scale(${zoom})`, transformOrigin: `${posX}% ${posY}%`,
            pointerEvents: "none" }}
        />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", opacity: 0.5 }}>
          <div style={{ width: 20, height: 1, background: "#fff", position: "absolute" }} />
          <div style={{ height: 20, width: 1, background: "#fff", position: "absolute" }} />
          <div style={{ width: 6, height: 6, border: "1.5px solid #fff", borderRadius: "50%", position: "absolute" }} />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
        <span style={{ fontFamily: "'Pretendard', sans-serif", fontSize: 11, color: MID, letterSpacing: "0.05em" }}>
          X {pct(posX)} · Y {pct(posY)}
        </span>
        <span style={{ fontFamily: "'Pretendard', sans-serif", fontSize: 11, color: AC, letterSpacing: "0.05em" }}>
          {Math.round(zoom * 100)}% {"\uC90C"}
        </span>
      </div>
      <div style={{ marginTop: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ fontFamily: "'Pretendard', sans-serif", fontWeight: 500, fontSize: 11, color: CONC, letterSpacing: "0.05em" }}>{"\uD655\uB300"}</span>
          <span style={{ fontFamily: "'Pretendard', sans-serif", fontSize: 13, color: MID }}>100% — 250%</span>
        </div>
        <input type="range" min={100} max={250} step={1} value={Math.round(zoom * 100)}
          onChange={e => onChange({ zoom: parseInt(e.target.value) / 100 })}
          style={{ width: "100%", accentColor: AC, cursor: "pointer" }}
        />
      </div>
    </div>
  );
}

// ─── Shared template image component ─────────────────────────────────────────
function TImg({ src, fallback, posX, posY, zoom, style }: {
  src: string; fallback: string;
  posX: number; posY: number; zoom: number;
  style?: React.CSSProperties;
}) {
  return (
    <div style={{ overflow: "hidden", ...style }}>
      <img src={src || fallback} crossOrigin="anonymous" draggable={false}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block",
          transform: `scale(${zoom})`, transformOrigin: `${posX}% ${posY}%`,
          pointerEvents: "none", userSelect: "none" }}
      />
    </div>
  );
}

// ─── useWindowWidth ──────────────────────────────────────────────────────────
function useWindowWidth() {
  const [w, setW] = useState(() => typeof window !== "undefined" ? window.innerWidth : 1280);
  useEffect(() => {
    const handler = () => setW(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return w;
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export function Generator() {
  const [activeTemplate, setActiveTemplate] = useState<TemplateType>("feed");
  const [variant, setVariant] = useState<Variant>("dark");
  const [titleFont, setTitleFont] = useState<TitleFont>("pretendard-medium");
  const [fields, setFields] = useState<Fields>(DEFAULT_FIELDS);
  const [isDragging, setIsDragging] = useState(false);
  const [exportState, setExportState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [mobileTab, setMobileTab] = useState<"edit" | "preview">("edit");
  const captureRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const winW = useWindowWidth();
  const isMobile = winW < 640;
  const isTablet = winW >= 640 && winW < 1024;
  const leftPanelW = isTablet ? 260 : 292;

  const meta = TEMPLATE_META.find(t => t.key === activeTemplate)!;
  const { MAX_W, MAX_H } = useMemo(() => {
    if (isMobile) return { MAX_W: winW - 32, MAX_H: Math.round(winW * 1.05) };
    if (isTablet) { const a = winW - leftPanelW - 48; return { MAX_W: a, MAX_H: Math.round(a * 1.3) }; }
    return { MAX_W: 520, MAX_H: 680 };
  }, [isMobile, isTablet, winW, leftPanelW]);
  const scale = Math.min(MAX_W / meta.w, MAX_H / meta.h);
  const needsImage = activeTemplate !== "bodyB";

  const updateField = useCallback(<K extends keyof Fields>(key: K, value: Fields[K]) => {
    setFields(f => ({ ...f, [key]: value }));
  }, []);

  const handleImageFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = e => {
      setFields(f => ({ ...f, imageDataUrl: e.target?.result as string, imgX: 50, imgY: 50, imgZoom: 1 }));
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDownload = async () => {
    if (!captureRef.current) return;
    setExportState("loading");
    try {
      const allText = captureRef.current.innerText || "";
      const tfd = TITLE_FONT_DEFS[titleFont];
      await Promise.all([
        document.fonts.load(`${tfd.weight} 64px Pretendard`, allText),
        document.fonts.load("300 24px Pretendard", allText),
        document.fonts.load("400 18px Pretendard", allText),
        document.fonts.load("500 18px Pretendard", allText),
        document.fonts.load("400 16px Pretendard", allText),
      ]);
      await document.fonts.ready;
      const imgs = Array.from(captureRef.current.querySelectorAll("img"));
      await Promise.all(
        imgs.map(img => {
          if (img.complete && img.naturalWidth > 0) return Promise.resolve();
          return new Promise<void>(resolve => {
            img.onload  = () => resolve();
            img.onerror = () => resolve();
            if (img.src) { const s = img.src; img.src = ""; img.src = s; }
          });
        })
      );
      await new Promise(resolve => setTimeout(resolve, 200));
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
        || (navigator.userAgent.includes("Mac") && "ontouchend" in document);
      let dataUrl: string;
      const h2cCapture = async () => {
        const el = captureRef.current!;
        const canvas = await html2canvas(el, {
          width: meta.w, height: meta.h, scale: 1, useCORS: true, allowTaint: true, backgroundColor: null, scrollX: 0, scrollY: 0,
          onclone: (clonedDoc: Document, clonedEl: HTMLElement) => {
            clonedDoc.documentElement.style.cssText = "margin:0!important;padding:0!important;overflow:hidden!important;";
            const body = clonedDoc.body;
            body.style.cssText = "margin:0!important;padding:0!important;position:relative!important;width:" + meta.w + "px!important;height:" + meta.h + "px!important;overflow:hidden!important;";
            while (body.firstChild) body.removeChild(body.firstChild);
            body.appendChild(clonedEl);
            clonedEl.style.position = "absolute"; clonedEl.style.top = "0"; clonedEl.style.left = "0"; clonedEl.style.margin = "0"; clonedEl.style.transform = "none";
            clonedEl.style.width = meta.w + "px"; clonedEl.style.height = meta.h + "px"; clonedEl.style.overflow = "hidden"; clonedEl.style.boxSizing = "border-box";
            clonedEl.querySelectorAll("*").forEach(child => { (child as HTMLElement).style.boxSizing = "border-box"; });
            const clonedTextareas = Array.from(clonedEl.querySelectorAll("textarea"));
            const originalTextareas = Array.from(el.querySelectorAll("textarea"));
            clonedTextareas.forEach((textarea, index) => {
              const orig = originalTextareas[index];
              if (!orig) return;
              const div = clonedDoc.createElement("div");
              const computedStyle = window.getComputedStyle(orig);
              div.style.cssText = computedStyle.cssText;
              div.style.width = computedStyle.width; div.style.height = computedStyle.height;
              div.style.whiteSpace = "pre-wrap"; div.style.wordBreak = "break-word"; div.style.overflow = "hidden"; div.style.resize = "none";
              div.className = orig.className; div.textContent = orig.value;
              textarea.parentNode?.replaceChild(div, textarea);
            });
          },
        });
        return canvas.toDataURL("image/png");
      };
      if (isIOS) { dataUrl = await h2cCapture(); }
      else {
        try {
          dataUrl = await domToPng(captureRef.current, { width: meta.w, height: meta.h, scale: 1, features: { removeControlCharacter: false } });
          if (!dataUrl || dataUrl.length < 5000) { dataUrl = await h2cCapture(); }
        } catch { dataUrl = await h2cCapture(); }
      }
      const fileName = `103moment_${activeTemplate}_${variant}_${Date.now()}.png`;
      if (isIOS) {
        const byteStr = atob(dataUrl.split(",")[1]);
        const buf = new Uint8Array(byteStr.length);
        for (let i = 0; i < byteStr.length; i++) buf[i] = byteStr.charCodeAt(i);
        const blob = new Blob([buf], { type: "image/png" });
        const file = new File([blob], fileName, { type: "image/png" });
        let saved = false;
        if (navigator.share && navigator.canShare?.({ files: [file] })) {
          try { await navigator.share({ files: [file], title: fileName }); saved = true; }
          catch (shareErr: any) { console.log("Share cancelled or failed", shareErr); }
        }
        if (!saved) {
          setGeneratedImage(dataUrl);
        }
      } else { 
        const a = document.createElement("a"); a.href = dataUrl; a.download = fileName; a.click(); 
      }
      setExportState("done"); setTimeout(() => setExportState("idle"), 2000);
    } catch (err) { console.error("Export failed:", err); setExportState("error"); setTimeout(() => setExportState("idle"), 3000); }
  };

  const btnLabel = { idle: "PNG \uB2E4\uC6B4\uB85C\uB4DC \u2193", loading: "\uC0DD\uC131 \uC911\u2026", done: "\u2713 \uC800\uC7A5 \uC644\uB8CC!", error: "\uC624\uB958 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4" }[exportState];
  const btnBg = { idle: AC, loading: DK2, done: "#2a5e2e", error: "#8B3A2C" }[exportState];

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "6px 8px", border: `1px solid ${PLASTER}`, background: BG,
    fontFamily: "'Pretendard', sans-serif", fontSize: 13, color: DK, outline: "none", boxSizing: "border-box", lineHeight: 1.5,
  };

  const editPanelContent = (
    <div style={{ width: isMobile ? "100%" : leftPanelW, flexShrink: 0, background: "#ffffff", borderRight: isMobile ? "none" : `1px solid ${PLASTER}`, overflowY: "auto", display: isMobile ? (mobileTab === "edit" ? "flex" : "none") : "flex", flexDirection: "column", flex: isMobile ? 1 : undefined, paddingBottom: isMobile ? 80 : 0 }}>
      <div style={{ padding: "16px 16px 0" }}>
        <div style={{ fontFamily: "'Pretendard', sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: "0.05em", color: CONC, marginBottom: 8 }}>TEMPLATE TYPE</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4 }}>
          {TEMPLATE_META.map(t => (
            <button key={t.key} onClick={() => setActiveTemplate(t.key)}
              style={{ padding: "7px 4px", background: activeTemplate === t.key ? DK : BG, border: `1px solid ${activeTemplate === t.key ? DK : SAND}`, cursor: "pointer", textAlign: "center", transition: "all 0.15s" }}>
              <div style={{ fontSize: 11, fontWeight: 500, color: activeTemplate === t.key ? BG : DK }}>{t.label}</div>
              <div style={{ fontFamily: "'Pretendard', sans-serif", fontSize: 11, color: activeTemplate === t.key ? AC2 : STONE, marginTop: 1, letterSpacing: "0.05em" }}>{t.dim}</div>
            </button>
          ))}
        </div>
      </div>
      <div style={{ padding: "12px 16px 0" }}>
        <div style={{ fontFamily: "'Pretendard', sans-serif", fontWeight: 600, fontSize: 11, letterSpacing: "0.05em", color: CONC, marginBottom: 6 }}>{"\uBC30\uACBD \uC2A4\uD0C0\uC77C"}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {([
            { key: "dark", dot: "\u25CF", label: "\uB2E4\uD06C", sub: "Dark Charcoal", bg: DK, fg: BG, accent: AC2 },
            { key: "light", dot: "\u25CB", label: "\uB77C\uC774\uD2B8", sub: "Light Ivory", bg: BG, fg: DK, accent: DK },
            { key: "wood", dot: "\u25CF", label: "\uBAA9", sub: "Warm Amber", bg: DK, fg: BG, accent: AMBER },
            { key: "green", dot: "\u25CB", label: "\uCD08\uB85D", sub: "Sage Green", bg: BG, fg: DK, accent: AC2 },
            { key: "rainbow", dot: "\uD83C\uDF08", label: "\uBB34\uC9C0\uAC1C", sub: "Custom Color", bg: DK, fg: BG, accent: AMBER },
          ] as { key: Variant; dot: string; label: string; sub: string; bg: string; fg: string; accent: string }[]).map(opt => (
            <button key={opt.key} onClick={() => setVariant(opt.key)}
              style={{ width: "100%", padding: "8px 10px", background: variant === opt.key ? opt.bg : "#fff", border: `1px solid ${variant === opt.key ? opt.accent : PLASTER}`, cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 8, transition: "all 0.15s" }}>
              <span style={{ fontSize: 10, color: variant === opt.key ? opt.accent : STONE }}>{opt.dot}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: variant === opt.key ? opt.fg : DK, letterSpacing: "0.05em" }}>{opt.label}</div>
                <div style={{ fontFamily: "'Pretendard', sans-serif", fontSize: 11, color: variant === opt.key ? opt.accent : STONE, letterSpacing: "0.05em", marginTop: 1 }}>{opt.sub}</div>
              </div>
              {variant === opt.key && (<div style={{ marginLeft: "auto", width: 24, height: 3, background: opt.accent }} />)}
            </button>
          ))}
        </div>
        {variant === "rainbow" && (
          <div style={{ marginTop: 8, padding: "10px", background: BG, border: `1px solid ${PLASTER}`, borderRadius: 4 }}>
            <div style={{ fontFamily: "'Pretendard', sans-serif", fontWeight: 500, fontSize: 11, color: MID, letterSpacing: "0.05em", marginBottom: 6 }}>{"\uBC30\uACBD \uC0C9\uC0C1 \uC120\uD0DD"}</div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input type="color" value={fields.rainbowColor} onChange={e => updateField("rainbowColor", e.target.value)} style={{ width: 48, height: 48, border: `2px solid ${PLASTER}`, cursor: "pointer", borderRadius: 4 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Pretendard', sans-serif", fontSize: 13, color: DK, letterSpacing: "0.05em", fontWeight: 600 }}>{(fields.rainbowColor || "#FF00FF").toUpperCase()}</div>
                <div style={{ fontFamily: "'Pretendard', sans-serif", fontSize: 11, color: MID, marginTop: 2 }}>{"\uD074\uB9AD\uD558\uC5EC \uC0C9\uC0C1 \uBCC0\uACBD"}</div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div style={{ padding: "12px 16px 0" }}>
        <div style={{ fontFamily: "'Pretendard', sans-serif", fontWeight: 600, fontSize: 11, letterSpacing: "0.05em", color: CONC, marginBottom: 6 }}>{"\uD0C0\uC774\uD2C0 \uD3F0\uD2B8"}</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
          {(["pretendard-light", "pretendard-medium"] as TitleFont[]).map(fk => {
            const fd = TITLE_FONT_DEFS[fk]; const isActive = titleFont === fk;
            return (
              <button key={fk} onClick={() => setTitleFont(fk)}
                style={{ padding: "12px 8px", background: isActive ? DK : "#fff", border: `1px solid ${isActive ? DK : PLASTER}`, cursor: "pointer", textAlign: "center", transition: "all 0.15s" }}>
                <div style={{ fontFamily: fd.family, fontWeight: fd.weight, fontSize: 24, color: isActive ? BG : DK, lineHeight: 1.2, marginBottom: 6 }}>{"\uACF5\uAC04"}</div>
                <div style={{ fontFamily: "'Pretendard', sans-serif", fontSize: 11, color: isActive ? AC2 : STONE, letterSpacing: "0.05em", marginBottom: 2 }}>{fd.label}</div>
                <div style={{ fontFamily: "'Pretendard', sans-serif", fontSize: 13, color: isActive ? STONE : CONC, letterSpacing: "0.05em" }}>{fd.sublabel}</div>
              </button>
            );
          })}
        </div>
      </div>
      <div style={{ height: 1, background: PLASTER, margin: "14px 0 0" }} />
      <div style={{ padding: "12px 16px 0" }}>
        <div style={{ fontFamily: "'Pretendard', sans-serif", fontWeight: 600, fontSize: 11, letterSpacing: "0.05em", color: CONC, marginBottom: 8 }}>{"\uD14D\uC2A4\uD2B8 \uD06C\uAE30 & \uC704\uCE58"}</div>
        <div style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontFamily: "'Pretendard', sans-serif", fontWeight: 500, fontSize: 11, color: MID, letterSpacing: "0.02em" }}>{"\uC0C1\uB2E8 \uC2AC\uB85C\uAC74 \uD06C\uAE30"}</span>
            <span style={{ fontFamily: "'Pretendard', sans-serif", fontSize: 13, color: AC }}>{fields.topSloganSize}px</span>
          </div>
          <input type="range" min={14} max={32} step={1} value={fields.topSloganSize} onChange={e => updateField("topSloganSize", parseInt(e.target.value))} style={{ width: "100%", accentColor: AC, cursor: "pointer" }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontFamily: "'Pretendard', sans-serif", fontWeight: 500, fontSize: 11, color: MID, letterSpacing: "0.02em" }}>{"\uC0C1\uB2E8 \uC2AC\uB85C\uAC74 \uC704\uCE58"}</span>
            <span style={{ fontFamily: "'Pretendard', sans-serif", fontSize: 13, color: AC }}>{fields.topSloganTop}px</span>
          </div>
          <input type="range" min={30} max={100} step={1} value={fields.topSloganTop} onChange={e => updateField("topSloganTop", parseInt(e.target.value))} style={{ width: "100%", accentColor: AC, cursor: "pointer" }} />
        </div>
        {activeTemplate === "feed" && (
          <div style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontFamily: "'Pretendard', sans-serif", fontWeight: 500, fontSize: 11, color: MID, letterSpacing: "0.02em" }}>{"\uBA54\uC778 \uD0C0\uC774\uD2C0 \uD06C\uAE30"}</span>
              <span style={{ fontFamily: "'Pretendard', sans-serif", fontSize: 13, color: AC }}>{fields.titleSize}px</span>
            </div>
            <input type="range" min={48} max={120} step={1} value={fields.titleSize} onChange={e => updateField("titleSize", parseInt(e.target.value))} style={{ width: "100%", accentColor: AC, cursor: "pointer" }} />
          </div>
        )}
        <button onClick={() => setFields(f => ({ ...f, topSloganSize: 20, topSloganTop: 48, titleSize: 88 }))}
          style={{ width: "100%", padding: "5px", background: "transparent", border: `1px solid ${PLASTER}`, cursor: "pointer", fontFamily: "'Pretendard', sans-serif", fontSize: 11, color: STONE, letterSpacing: "0.1em" }}>{"\uCD08\uAE30\uD654"}</button>
      </div>
      <div style={{ height: 1, background: PLASTER, margin: "14px 0 0" }} />
      {needsImage && (
        <div style={{ padding: "12px 16px 0" }}>
          <div style={{ fontFamily: "'Pretendard', sans-serif", fontSize: 11, letterSpacing: "0.16em", color: CONC, marginBottom: 6, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>{"\uC0AC\uC9C4 \uC5C5\uB85C\uB4DC"}</span>
            {fields.imageDataUrl && <span style={{ color: AC2 }}>{"\u2713 \uC5C5\uB85C\uB4DC\uB428"}</span>}
          </div>
          <div onDragOver={e => { e.preventDefault(); setIsDragging(true); }} onDragLeave={() => setIsDragging(false)}
            onDrop={e => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files[0]; if (f) handleImageFile(f); }}
            onClick={() => fileInputRef.current?.click()}
            style={{ border: `2px dashed ${isDragging ? AC : fields.imageDataUrl ? AC2 : SAND}`, background: isDragging ? "rgba(46,68,48,0.05)" : BG, padding: fields.imageDataUrl ? 0 : "14px", textAlign: "center", cursor: "pointer", transition: "all 0.2s", overflow: "hidden" }}>
            {fields.imageDataUrl ? (
              <img src={fields.imageDataUrl} style={{ width: "100%", height: 100, objectFit: "cover", display: "block" }} alt="" />
            ) : (
              <>
                <div style={{ fontSize: 20, marginBottom: 4 }}>{"\uD83D\uDCF7"}</div>
                <div style={{ fontFamily: "'Pretendard', sans-serif", fontSize: 13, color: MID, fontWeight: 300 }}>{"\uB4DC\uB798\uADF8 \uB610\uB294 \uD074\uB9AD"}</div>
                <div style={{ fontFamily: "'Pretendard', sans-serif", fontSize: 11, color: STONE, letterSpacing: "0.1em", marginTop: 3 }}>JPG · PNG · WEBP</div>
              </>
            )}
            <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={e => { const f = e.target.files?.[0]; if (f) handleImageFile(f); }} />
          </div>
          {fields.imageDataUrl && (
            <button onClick={() => updateField("imageDataUrl", "")}
              style={{ width: "100%", marginTop: 3, padding: "3px", background: "transparent", border: `1px solid ${PLASTER}`, cursor: "pointer", fontFamily: "'Pretendard', sans-serif", fontSize: 11, color: STONE, letterSpacing: "0.1em" }}>{"\u00D7 \uC0AC\uC9C4 \uC81C\uAC70"}</button>
          )}
          {fields.imageDataUrl && (
            <ImageAdjuster src={fields.imageDataUrl} posX={fields.imgX} posY={fields.imgY} zoom={fields.imgZoom}
              onChange={p => setFields(f => ({ ...f, imgX: p.x ?? f.imgX, imgY: p.y ?? f.imgY, imgZoom: p.zoom ?? f.imgZoom }))} />
          )}
        </div>
      )}
      <div style={{ height: 1, background: PLASTER, margin: "14px 0 0" }} />
      <div style={{ padding: "12px 16px", flex: 1 }}>
        <div style={{ fontFamily: "'Pretendard', sans-serif", fontWeight: 600, fontSize: 11, letterSpacing: "0.05em", color: CONC, marginBottom: 10 }}>{"\uD14D\uC2A4\uD2B8 \uC785\uB825"}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {FIELD_DEFS[activeTemplate].map(fd => (
            <div key={fd.key as string}>
              <label style={{ fontFamily: "'Pretendard', sans-serif", fontSize: 11, color: MID, letterSpacing: "0.1em", display: "block", marginBottom: 3 }}>{fd.label}</label>
              {fd.type === "textarea" ? (
                <textarea value={fields[fd.key] as string} onChange={e => updateField(fd.key, e.target.value)} rows={fd.rows || 2} placeholder={fd.placeholder} style={{ ...inputStyle, resize: "vertical" }} />
              ) : (
                <input type="text" value={fields[fd.key] as string} onChange={e => updateField(fd.key, e.target.value)} placeholder={fd.placeholder} style={inputStyle} />
              )}
            </div>
          ))}
        </div>
      </div>
      {!isMobile && (
        <div style={{ padding: "12px 16px 16px", borderTop: `1px solid ${PLASTER}`, background: "#fff", flexShrink: 0 }}>
          <button onClick={handleDownload} disabled={exportState === "loading"}
            style={{ width: "100%", padding: "16px", background: btnBg, color: "#fff", border: "none", cursor: exportState === "loading" ? "not-allowed" : "pointer", fontFamily: "'Pretendard', sans-serif", fontSize: 15, fontWeight: 600, letterSpacing: "0.05em", transition: "background 0.2s" }}>{btnLabel}</button>
          <div style={{ fontFamily: "'Pretendard', sans-serif", fontSize: 11, color: STONE, letterSpacing: "0.08em", marginTop: 5, textAlign: "center" }}>
            {meta.w} × {meta.h}px · {"\uC6D0\uBCF8 \uD574\uC0C1\uB3C4 PNG"}
          </div>
        </div>
      )}
    </div>
  );

  const previewPanelContent = (
    <div style={{ flex: 1, overflowY: "auto", display: isMobile ? (mobileTab === "preview" ? "flex" : "none") : "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", padding: isMobile ? "20px 16px 88px" : "36px 40px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <span style={{ fontFamily: "'Pretendard', sans-serif", fontSize: 11, color: "#555", letterSpacing: "0.16em" }}>LIVE PREVIEW</span>
        <div style={{ width: 1, height: 10, background: "#333" }} />
        <span style={{ fontFamily: "'Pretendard', sans-serif", fontSize: 11, color: AC2, letterSpacing: "0.12em" }}>{meta.dim}</span>
        <div style={{ width: 1, height: 10, background: "#333" }} />
        <span style={{ fontFamily: "'Pretendard', sans-serif", fontSize: 11, color: "#555", letterSpacing: "0.05em" }}>{Math.round(scale * 100)}% {"\uBBF8\uB9AC\uBCF4\uAE30"}</span>
      </div>
      <div style={{ width: meta.w * scale, height: meta.h * scale, overflow: "hidden", position: "relative", flexShrink: 0, boxShadow: "0 20px 80px rgba(0,0,0,0.7)" }}>
        <div style={{ width: meta.w, height: meta.h, transform: `scale(${scale})`, transformOrigin: "top left", position: "absolute" }}>
          <TemplatePicker type={activeTemplate} variant={variant} fields={fields} titleFont={titleFont} />
        </div>
      </div>
      <div style={{ marginTop: 14, fontFamily: "'Pretendard', sans-serif", fontSize: 13, color: "#444", fontWeight: 300, textAlign: "center", lineHeight: 1.8 }}>
        {"\uC0AC\uC9C4 \uC5C5\uB85C\uB4DC \uD6C4 \uBBF8\uB9AC\uBCF4\uAE30\uC5D0\uC11C \uC704\uCE58\uB97C \uD655\uC778\uD558\uC138\uC694"}<br />
        <span style={{ fontFamily: "'Pretendard', sans-serif", fontWeight: 500, fontSize: 11, color: AC, letterSpacing: "0.05em" }}>
          {"PNG \uB2E4\uC6B4\uB85C\uB4DC \u2192 "}{meta.w}×{meta.h}{"px \uC6D0\uBCF8 \uD574\uC0C1\uB3C4"}
        </span>
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily: "'Pretendard', sans-serif", background: "#1A1A18", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ background: DK, padding: isMobile ? "12px 16px" : "20px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, borderBottom: `1px solid ${DK2}` }}>
        <div>
          <div style={{ fontFamily: "'Pretendard', sans-serif", fontSize: 11, letterSpacing: "0.22em", color: AC2, marginBottom: isMobile ? 2 : 4 }}>@103MOMENT</div>
          <h1 style={{ fontFamily: "'Pretendard', sans-serif", fontSize: isMobile ? 20 : 26, fontWeight: 500, letterSpacing: "0.02em", color: BG, lineHeight: 1.2 }}>
            {isMobile ? <>{"\uACF5\uAC04 \uC778\uC0AC\uC774\uD2B8 "}<em style={{ color: AC2 }}>{"\uC0DD\uC131"}</em></> : <>{"\uACF5\uAC04 \uCCA0\uD559 \uCF58\uD150\uCE20 "}<em style={{ color: AC2 }}>{"\uBA54\uC774\uCEE4"}</em></>}
          </h1>
        </div>
        {!isMobile && (<div style={{ display: "flex", gap: 2, height: 3, width: 120 }}>{[DK, DK2, AC, AC2].map((c, idx) => <div key={`color-${idx}`} style={{ flex: 1, background: c }} />)}</div>)}
      </div>
      <div style={{ flex: 1, display: "flex", overflow: isMobile ? "visible" : "hidden", minHeight: 0 }}>
        {editPanelContent}
        {previewPanelContent}
      </div>
      {isMobile && (
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100, background: DK, borderTop: "1px solid #333", display: "flex" }}>
          <button onClick={() => setMobileTab("edit")} style={{ flex: 1, padding: "12px 0 10px", background: mobileTab === "edit" ? "#2E2E2C" : DK, border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 13.5V15h1.5l8.25-8.25-1.5-1.5L3 13.5z" fill={mobileTab === "edit" ? AC2 : STONE}/><path d="M14.85 4.15a1 1 0 0 0 0-1.41l-1.09-1.09a1 1 0 0 0-1.41 0l-1.06 1.06 2.5 2.5 1.06-1.06z" fill={mobileTab === "edit" ? AC2 : STONE}/></svg>
            <span style={{ fontFamily: "'Pretendard', sans-serif", fontWeight: 500, fontSize: 13, color: mobileTab === "edit" ? AC2 : STONE, letterSpacing: "0.05em" }}>{"\uD3B8\uC9D1"}</span>
            {mobileTab === "edit" && <div style={{ width: 20, height: 2, background: AC, marginTop: 1 }} />}
          </button>
          <button onClick={() => setMobileTab("preview")} style={{ flex: 1, padding: "12px 0 10px", background: mobileTab === "preview" ? "#2E2E2C" : DK, border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><ellipse cx="9" cy="9" rx="7" ry="5" stroke={mobileTab === "preview" ? AC2 : STONE} strokeWidth="1.4" fill="none"/><circle cx="9" cy="9" r="2.2" fill={mobileTab === "preview" ? AC2 : STONE}/></svg>
            <span style={{ fontFamily: "'Pretendard', sans-serif", fontWeight: 500, fontSize: 13, color: mobileTab === "preview" ? AC2 : STONE, letterSpacing: "0.05em" }}>{"\uBBF8\uB9AC\uBCF4\uAE30"}</span>
            {mobileTab === "preview" && <div style={{ width: 20, height: 2, background: AC, marginTop: 1 }} />}
          </button>
          <button onClick={handleDownload} disabled={exportState === "loading"} style={{ flex: 1.3, padding: "12px 0 10px", background: btnBg, border: "none", cursor: exportState === "loading" ? "not-allowed" : "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, opacity: exportState === "loading" ? 0.7 : 1, transition: "background 0.2s" }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2v9M6 8l3 3 3-3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 13h12" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <span style={{ fontFamily: "'Pretendard', sans-serif", fontSize: 13, color: "#fff", letterSpacing: "0.1em" }}>
              {exportState === "idle" ? "PNG \uC800\uC7A5" : exportState === "loading" ? "\uC0DD\uC131 \uC911\u2026" : exportState === "done" ? "\uC644\uB8CC!" : "\uC624\uB958"}
            </span>
          </button>
        </div>
      )}
      <div style={{ position: "fixed", top: 0, left: 0, transform: "translateX(-9999px)", pointerEvents: "none" }}>
        <div ref={captureRef} data-capture style={{ width: meta.w, height: meta.h, overflow: "hidden" }}>
          <TemplatePicker type={activeTemplate} variant={variant} fields={fields} titleFont={titleFont} />
        </div>
      </div>
      {generatedImage && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.9)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px", cursor: "pointer" }} onClick={() => setGeneratedImage(null)}>
          <img src={generatedImage} alt="Generated" style={{ maxWidth: "100%", maxHeight: "80vh", objectFit: "contain", borderRadius: 8, boxShadow: "0 10px 25px rgba(0,0,0,0.5)", pointerEvents: "auto", userSelect: "auto", WebkitUserSelect: "auto", WebkitTouchCallout: "default" }} onClick={(e) => e.stopPropagation()} />
          <p style={{ color: "#fff", marginTop: 24, fontSize: 16, textAlign: "center", lineHeight: 1.5, fontFamily: "'Pretendard', sans-serif", pointerEvents: "none" }}>
            이미지를 길게 눌러 <b>[사진 앱에 저장]</b>을 선택하세요.<br/>
            <span style={{ fontSize: 14, color: "#aaa" }}>(화면을 터치하면 닫힙니다)</span>
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Template router ─────────────────────────────────────────────────────────
function TemplatePicker({ type, variant: v, fields: f, titleFont: tf }: { type: TemplateType; variant: Variant; fields: Fields; titleFont: TitleFont }) {
  if (type === "feed")  return <TFeed  v={v} f={f} tf={tf} rainbowColor={f.rainbowColor} />;
  if (type === "reels") return <TReels v={v} f={f} tf={tf} rainbowColor={f.rainbowColor} />;
  if (type === "cover") return <TCover v={v} f={f} tf={tf} rainbowColor={f.rainbowColor} />;
  if (type === "bodyA") return <TBodyA v={v} f={f} tf={tf} rainbowColor={f.rainbowColor} />;
  if (type === "bodyB") return <TBodyB v={v} f={f} tf={tf} rainbowColor={f.rainbowColor} />;
  if (type === "cta")   return <TCTA   v={v} f={f} tf={tf} rainbowColor={f.rainbowColor} />;
  return null;
}

const Mono = ({ ch, size = 22, color = AC2, spacing = "0.22em", style }: { ch: React.ReactNode; size?: number; color?: string; spacing?: string; style?: React.CSSProperties }) => (
  <div style={{ fontFamily: "'Pretendard', sans-serif", fontSize: size, color, letterSpacing: spacing, ...style }}>{ch}</div>
);
const Rule = ({ color = AC }: { color?: string }) => <div style={{ width: 60, height: 2, background: color }} />;

function getVariantColors(v: Variant, rainbowColor?: string) {
  const isDark = v === "dark" || v === "wood" || v === "rainbow";
  const bgColor = v === "dark" ? DK : v === "light" ? BG : v === "wood" ? LINEN : v === "rainbow" ? (rainbowColor || "#FF00FF") : CREAM;
  const textColor = isDark ? BG : DK;
  const sloganColor = v === "dark" ? "#9BA89F" : v === "wood" ? "#C4B89F" : v === "green" ? AC2 : v === "rainbow" ? "#E8E8E8" : "#6B6B6B";
  const subtitleColor = v === "dark" ? "#C4CCC7" : v === "wood" ? "#D4CCC7" : v === "green" ? "#7A9B6E" : v === "rainbow" ? "#F0F0F0" : "#6B6B6B";
  const badgeColor = v === "dark" ? "#9BA89F" : v === "wood" ? "#C4B89F" : v === "green" ? AC2 : v === "rainbow" ? "#E8E8E8" : "#6B6B6B";
  const badgeBorder = v === "dark" ? "#5A6D5F" : v === "wood" ? "#A0826D" : v === "green" ? AC2 : v === "rainbow" ? "#FFFFFF" : "#D4D4D4";
  const buttonBg = v === "dark" ? AC2 : v === "wood" ? WALNUT : v === "green" ? AC2 : v === "rainbow" ? "#FFFFFF" : DK;
  const buttonTextColor = v === "rainbow" ? DK : "#fff";
  let overlayGradient;
  if (v === "rainbow" && rainbowColor) {
    const hexToRgb = (hex: string) => { const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex); return r ? { r: parseInt(r[1], 16), g: parseInt(r[2], 16), b: parseInt(r[3], 16) } : { r: 255, g: 0, b: 255 }; };
    const rgb = hexToRgb(rainbowColor);
    overlayGradient = `linear-gradient(to top, rgba(${rgb.r},${rgb.g},${rgb.b},0.95) 0%, rgba(${rgb.r},${rgb.g},${rgb.b},0.85) 40%, transparent 70%)`;
  } else {
    overlayGradient = v === "dark" ? "linear-gradient(to top, rgba(45,45,45,0.95) 0%, rgba(45,45,45,0.85) 40%, transparent 70%)"
      : v === "wood" ? "linear-gradient(to top, rgba(139,111,71,0.95) 0%, rgba(139,111,71,0.85) 40%, transparent 70%)"
      : v === "green" ? "linear-gradient(to top, rgba(122,155,110,0.95) 0%, rgba(122,155,110,0.85) 40%, transparent 70%)"
      : "linear-gradient(to top, rgba(245,240,232,0.95) 0%, rgba(245,240,232,0.85) 40%, transparent 70%)";
  }
  return { isDark, bgColor, textColor, sloganColor, subtitleColor, badgeColor, badgeBorder, buttonBg, buttonTextColor, overlayGradient };
}

function TFeed({ v, f, tf, rainbowColor }: { v: Variant; f: Fields; tf: TitleFont; rainbowColor?: string }) {
  const colors = getVariantColors(v, rainbowColor); const tfd = TITLE_FONT_DEFS[tf];
  return (
    <div style={{ boxSizing: "border-box", width: 1080, height: 1350, background: colors.bgColor, position: "relative", overflow: "hidden" }}>
      <TImg src={f.imageDataUrl} fallback={FALLBACKS.feed} posX={f.imgX} posY={f.imgY} zoom={f.imgZoom} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.5 }} />
      <div style={{ position: "absolute", inset: 0, background: colors.overlayGradient }} />
      <div style={{ position: "absolute", top: f.topSloganTop, left: 0, right: 0, padding: "0 80px", textAlign: "center" }}>
        <div style={{ fontFamily: "'Pretendard', sans-serif", fontSize: f.topSloganSize, color: colors.sloganColor, fontWeight: 300, letterSpacing: "-0.01em" }}>{f.location}</div>
      </div>
      <div style={{ position: "absolute", bottom: 120, left: 0, right: 0, padding: "0 80px", textAlign: "center" }}>
        <div style={{ fontFamily: tfd.family, fontSize: f.titleSize, fontWeight: tfd.weight, color: colors.textColor, lineHeight: tfd.lineH, letterSpacing: tfd.spacing, whiteSpace: "pre", wordBreak: "keep-all" }}>{f.titleKR}</div>
      </div>
    </div>
  );
}

function TReels({ v, f, tf, rainbowColor }: { v: Variant; f: Fields; tf: TitleFont; rainbowColor?: string }) {
  const colors = getVariantColors(v, rainbowColor); const tfd = TITLE_FONT_DEFS[tf];
  return (
    <div style={{ boxSizing: "border-box", width: 1080, height: 1350, background: colors.bgColor, position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px" }}>
      <div style={{ position: "absolute", top: f.topSloganTop, left: 0, right: 0, textAlign: "center" }}>
        <div style={{ fontFamily: "'Pretendard', sans-serif", fontSize: f.topSloganSize, color: colors.sloganColor, fontWeight: 300, letterSpacing: "-0.01em" }}>{f.location}</div>
      </div>
      {f.imageDataUrl && (
        <div style={{ width: 480, height: 320, marginBottom: 60, overflow: "hidden", borderRadius: 8 }}>
          <TImg src={f.imageDataUrl} fallback={FALLBACKS.reels} posX={f.imgX} posY={f.imgY} zoom={f.imgZoom} style={{ width: "100%", height: "100%" }} />
        </div>
      )}
      <div style={{ textAlign: "center", marginBottom: 40, flexShrink: 0, width: "100%", overflow: "visible" }}>
        <div style={{ fontFamily: tfd.family, fontSize: 52, fontWeight: tfd.weight, color: colors.textColor, lineHeight: tfd.lineH, whiteSpace: "pre", wordBreak: "keep-all" }}>{f.reelsTitle}</div>
      </div>
      <div style={{ textAlign: "center", maxWidth: 700, flexShrink: 0, overflow: "visible" }}>
        <div style={{ fontFamily: "'Pretendard', sans-serif", fontSize: 24, color: colors.subtitleColor, fontWeight: 300, lineHeight: 1.7, whiteSpace: "pre", wordBreak: "keep-all" }}>{f.reelsSubtitle}</div>
      </div>
    </div>
  );
}

function TCover({ v, f, tf, rainbowColor }: { v: Variant; f: Fields; tf: TitleFont; rainbowColor?: string }) {
  const colors = getVariantColors(v, rainbowColor); const tfd = TITLE_FONT_DEFS[tf];
  return (
    <div style={{ boxSizing: "border-box", width: 1080, height: 1350, background: colors.bgColor, position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 120px", textAlign: "center" }}>
      <div style={{ position: "absolute", top: f.topSloganTop, left: 0, right: 0, textAlign: "center" }}>
        <div style={{ fontFamily: "'Pretendard', sans-serif", fontSize: f.topSloganSize, color: colors.sloganColor, fontWeight: 300, letterSpacing: "-0.01em" }}>{f.location}</div>
      </div>
      <div style={{ marginBottom: 50, flexShrink: 0 }}>
        <div style={{ fontFamily: "'Pretendard', sans-serif", fontSize: 22, color: colors.badgeColor, fontWeight: 400, letterSpacing: "-0.01em", lineHeight: 1.3, overflow: "visible" }}>{f.seriesLabel}</div>
      </div>
      <div style={{ marginBottom: 50, flexShrink: 0, width: "100%", overflow: "visible" }}>
        <div style={{ fontFamily: tfd.family, fontSize: 64, fontWeight: tfd.weight, color: colors.textColor, lineHeight: tfd.lineH, whiteSpace: "pre", wordBreak: "keep-all" }}>{f.coverTitle}</div>
      </div>
      <div style={{ maxWidth: 700, flexShrink: 0, overflow: "visible" }}>
        <div style={{ fontFamily: "'Pretendard', sans-serif", fontSize: 24, color: colors.subtitleColor, fontWeight: 300, lineHeight: 1.7, whiteSpace: "pre", wordBreak: "keep-all" }}>{f.coverSubtitle}</div>
      </div>
    </div>
  );
}

function TBodyA({ v, f, tf, rainbowColor }: { v: Variant; f: Fields; tf: TitleFont; rainbowColor?: string }) {
  const colors = getVariantColors(v, rainbowColor); const tfd = TITLE_FONT_DEFS[tf];
  return (
    <div style={{ boxSizing: "border-box", width: 1080, height: 1350, background: colors.bgColor, position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 120px", textAlign: "center" }}>
      <div style={{ position: "absolute", top: f.topSloganTop, left: 0, right: 0, textAlign: "center" }}>
        <div style={{ fontFamily: "'Pretendard', sans-serif", fontSize: f.topSloganSize, color: colors.sloganColor, fontWeight: 300, letterSpacing: "-0.01em" }}>{f.location}</div>
      </div>
      <div style={{ marginBottom: 50, flexShrink: 0 }}>
        <div style={{ fontFamily: "'Pretendard', sans-serif", fontSize: 22, color: colors.badgeColor, fontWeight: 400, letterSpacing: "-0.01em", lineHeight: 1.3, overflow: "visible" }}>{f.pointLabel}</div>
      </div>
      <div style={{ marginBottom: 50, flexShrink: 0, width: "100%", overflow: "visible" }}>
        <div style={{ fontFamily: tfd.family, fontSize: 64, fontWeight: tfd.weight, color: colors.textColor, lineHeight: tfd.lineH, whiteSpace: "pre", wordBreak: "keep-all" }}>{f.bodyATitle}</div>
      </div>
      <div style={{ maxWidth: 700, flexShrink: 0, overflow: "visible" }}>
        <div style={{ fontFamily: "'Pretendard', sans-serif", fontSize: 24, color: colors.subtitleColor, fontWeight: 300, lineHeight: 1.7, whiteSpace: "pre", wordBreak: "keep-all" }}>{f.bodyABody}</div>
      </div>
    </div>
  );
}

function TBodyB({ v, f, tf, rainbowColor }: { v: Variant; f: Fields; tf: TitleFont; rainbowColor?: string }) {
  const colors = getVariantColors(v, rainbowColor); const tfd = TITLE_FONT_DEFS[tf];
  return (
    <div style={{ boxSizing: "border-box", width: 1080, height: 1350, background: colors.bgColor, position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 120px", textAlign: "center" }}>
      <div style={{ position: "absolute", top: f.topSloganTop, left: 0, right: 0, textAlign: "center" }}>
        <div style={{ fontFamily: "'Pretendard', sans-serif", fontSize: f.topSloganSize, color: colors.sloganColor, fontWeight: 300, letterSpacing: "-0.01em" }}>{f.location}</div>
      </div>
      <div style={{ marginBottom: 50, flexShrink: 0 }}>
        <div style={{ fontFamily: "'Pretendard', sans-serif", fontSize: 22, color: colors.badgeColor, fontWeight: 400, letterSpacing: "-0.01em", lineHeight: 1.3, overflow: "visible" }}>{f.bodyBCategory}</div>
      </div>
      <div style={{ marginBottom: 50, flexShrink: 0, width: "100%", overflow: "visible" }}>
        <div style={{ fontFamily: tfd.family, fontSize: 64, fontWeight: tfd.weight, color: colors.textColor, lineHeight: tfd.lineH, whiteSpace: "pre", wordBreak: "keep-all" }}>{f.bodyBTitle}</div>
      </div>
      <div style={{ maxWidth: 700, flexShrink: 0, overflow: "visible" }}>
        <div style={{ fontFamily: "'Pretendard', sans-serif", fontSize: 24, color: colors.subtitleColor, fontWeight: 300, lineHeight: 1.7, whiteSpace: "pre", wordBreak: "keep-all" }}>{f.bodyBBody}</div>
      </div>
    </div>
  );
}

function TCTA({ v, f, tf, rainbowColor }: { v: Variant; f: Fields; tf: TitleFont; rainbowColor?: string }) {
  const colors = getVariantColors(v, rainbowColor); const tfd = TITLE_FONT_DEFS[tf];
  return (
    <div style={{ boxSizing: "border-box", width: 1080, height: 1350, background: colors.bgColor, position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 120px", textAlign: "center" }}>
      <div style={{ position: "absolute", top: f.topSloganTop, left: 0, right: 0, textAlign: "center" }}>
        <div style={{ fontFamily: "'Pretendard', sans-serif", fontSize: f.topSloganSize, color: colors.sloganColor, fontWeight: 300, letterSpacing: "-0.01em" }}>{f.location}</div>
      </div>
      <div style={{ marginBottom: 50, flexShrink: 0, width: "100%", overflow: "visible" }}>
        <div style={{ fontFamily: tfd.family, fontSize: 56, fontWeight: tfd.weight, color: colors.textColor, lineHeight: tfd.lineH, whiteSpace: "pre", wordBreak: "keep-all" }}>{f.ctaTitle}</div>
      </div>
      <div style={{ marginBottom: 60, maxWidth: 700, flexShrink: 0, overflow: "visible" }}>
        <div style={{ fontFamily: "'Pretendard', sans-serif", fontSize: 24, color: colors.subtitleColor, fontWeight: 300, lineHeight: 1.7, whiteSpace: "pre", wordBreak: "keep-all" }}>{f.ctaBody}</div>
      </div>
      <div style={{ marginBottom: 40, overflow: "visible", borderBottom: `2px solid ${colors.textColor}`, paddingBottom: 16 }}>
        <div style={{ fontFamily: "'Pretendard', sans-serif", fontSize: 32, fontWeight: 600, color: colors.textColor, letterSpacing: "-0.01em", lineHeight: 1.3 }}>{f.ctaButton}</div>
      </div>
      <div>
        <div style={{ fontFamily: "'Pretendard', sans-serif", fontSize: 24, fontWeight: 500, color: colors.sloganColor, letterSpacing: "0.1em" }}>{f.instagramHandle}</div>
      </div>
    </div>
  );
}
