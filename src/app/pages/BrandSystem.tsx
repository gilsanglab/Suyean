import referenceImg from "@/assets/2f45f2338902f49156a39251baaf5bb63cfd575f.png";

// ─── @103moment Palette (extracted from reference photo) ─────────────────────
const colors = [
  { name: "Charcoal",  hex: "#2D2D2D", label: "차콜 Charcoal",     usage: "메인 텍스트, 헤더 배경" },
  { name: "Graphite",  hex: "#4A4A4A", label: "그라파이트 Graphite", usage: "보조 다크, 그림자" },
  { name: "Stone",     hex: "#6B5D50", label: "스톤 Stone",        usage: "서브 텍스트, 캡션" },
  { name: "Walnut",    hex: "#8B6F47", label: "월넛 Walnut",       usage: "목재 톤, 워밍 포인트" },
  { name: "Chestnut",  hex: "#A0826D", label: "체스넛 Chestnut",   usage: "밝은 우드, 액센트" },
  { name: "Linen",     hex: "#D4C4B0", label: "리넨 Linen",        usage: "보더, 구분선" },
  { name: "Cream",     hex: "#E8DDD0", label: "크림 Cream",        usage: "섹션 배경" },
  { name: "Ivory",     hex: "#F5F0E8", label: "아이보리 Ivory",    usage: "기본 배경" },
  { name: "White",     hex: "#FFFFFF", label: "화이트 White",      usage: "카드, 패널 배경" },
  { name: "Sage",      hex: "#7A9B6E", label: "세이지 Sage",       usage: "자연 그린 액센트" },
  { name: "Olive",     hex: "#95B88D", label: "올리브 Olive",      usage: "밝은 그린, CTA" },
];

// ─── Photo Colour Extraction ─────────────────────────────────────────────────
const photoSwatches = [
  { hex: "#F5F0E8", area: "베이지 벽면", note: "→ Ivory" },
  { hex: "#E8DDD0", area: "밝은 벽 영역", note: "→ Cream" },
  { hex: "#8B6F47", area: "나무 프레임", note: "→ Walnut" },
  { hex: "#A0826D", area: "밝은 우드", note: "→ Chestnut" },
  { hex: "#7A9B6E", area: "창밖 녹음", note: "→ Sage" },
  { hex: "#95B88D", area: "밝은 잎사귀", note: "→ Olive" },
  { hex: "#6B5D50", area: "자연 톤", note: "→ Stone" },
  { hex: "#4A4A4A", area: "그림자 영역", note: "→ Graphite" },
  { hex: "#2D2D2D", area: "텍스트 톤", note: "→ Charcoal" },
  { hex: "#D4C4B0", area: "부드러운 베이지", note: "→ Linen" },
];

const typeStyles = [
  { label: "Display XL", sample: "공간의 철학", sampleEn: "Philosophy of Space", font: "'Noto Sans KR', sans-serif", size: 52, weight: 300, tracking: "0.02em", usage: "히어로 타이틀" },
  { label: "Display L",  sample: "나만의 시간", sampleEn: "My Moment", font: "'Noto Sans KR', sans-serif", size: 40, weight: 400, tracking: "0.01em", usage: "섹션 헤드라인" },
  { label: "Heading 1",  sample: "공간 관찰", sampleEn: "Space Observation", font: "'Noto Sans KR', sans-serif", size: 30, weight: 500, tracking: "0.01em", usage: "페이지 제목" },
  { label: "Heading 2",  sample: "라이프스타일", sampleEn: "Lifestyle Insight", font: "'Noto Sans KR', sans-serif", size: 20, weight: 500, tracking: "0.02em", usage: "카드 / 섹션 제목" },
  { label: "Body KR",    sample: "우리는 공간에서 의미를 찾습니다.", sampleEn: "", font: "'Noto Sans KR', sans-serif", size: 15, weight: 400, tracking: "0.01em", usage: "본문 KR" },
  { label: "Caption",    sample: "SPACE INSIGHT · @103MOMENT", sampleEn: "", font: "'Noto Sans KR', sans-serif", size: 11, weight: 400, tracking: "0.1em", usage: "캡션, 라벨" },
];

const spacings = [4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 128];

// ─── Color palette ────────────────────────────────────────────────────────────
const AC  = "#8B6F47"; // Walnut — primary accent
const AC2 = "#7A9B6E"; // Sage — green accent
const BG  = "#F5F0E8"; // Ivory background
const DK  = "#2D2D2D"; // Charcoal dark

const SectionTitle = ({ index, title }: { index: string; title: string }) => (
  <div className="flex items-center gap-4 mb-10">
    <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 10, letterSpacing: "0.2em", color: AC }}>{index}</span>
    <div className="flex-1 h-px" style={{ background: "#D4C4B0" }} />
    <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#4A4A4A" }}>
      {title}
    </span>
    <div className="w-8 h-px" style={{ background: "#D4C4B0" }} />
  </div>
);

const Spec = ({ label, value }: { label: string; value: string }) => (
  <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 9, letterSpacing: "0.1em", color: "#6B5D50", marginRight: 12 }}>
    <span style={{ color: "#D4C4B0" }}>{label} </span>{value}
  </span>
);

export function BrandSystem() {
  return (
    <div className="min-h-screen" style={{ background: BG, fontFamily: "'Noto Sans KR', sans-serif" }}>

      {/* ── PAGE HEADER ───────────────────────────────────────────────────── */}
      <div style={{ background: DK }} className="px-12 pt-14 pb-12">
        <div className="flex items-start gap-10">
          <div className="flex-1">
            <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 10, letterSpacing: "0.22em", color: "#FFFFFF", marginBottom: 12 }}>
              A. BRAND SYSTEM
            </div>
            <h1 style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 48, fontWeight: 300, letterSpacing: "0.02em", color: "#F5F0E8", lineHeight: 1.2, marginBottom: 8 }}>
              @103moment<br /><span style={{ color: "#FFFFFF" }}>Brand Identity</span>
            </h1>
            <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 13, color: "#6B5D50", marginTop: 16, letterSpacing: "0.04em", fontWeight: 300 }}>
              공간 철학 × 라이프스타일 인사이트 — 브랜드 디자인 시스템 v2.0
            </p>
            {/* Palette preview strip */}
            <div className="flex gap-0 mt-8" style={{ height: 8 }}>
              {colors.map(c => <div key={c.hex} style={{ flex: 1, background: c.hex }} />)}
            </div>
            <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 8, color: "#4A4A4A", letterSpacing: "0.14em", marginTop: 6 }}>
              베이지 × 브라운 × 그린 — 11 COLOURS
            </div>
          </div>
          {/* Reference Photo */}
          <div style={{ width: 380, flexShrink: 0 }}>
            <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 8, color: "#4A4A4A", letterSpacing: "0.16em", marginBottom: 8 }}>
              COLOUR SOURCE — REFERENCE PHOTO
            </div>
            <img src={referenceImg} style={{ width: "100%", height: 220, objectFit: "cover", display: "block" }} alt="Reference Interior" />
            <div style={{ display: "flex", gap: 0, height: 20 }}>
              {photoSwatches.map(s => <div key={s.hex} title={s.area} style={{ flex: 1, background: s.hex }} />)}
            </div>
            <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 10, color: "#6B5D50", marginTop: 6, fontWeight: 300 }}>
              베이지 벽면 · 나무 프레임 · 자연 그린 — 사진에서 직접 추출
            </div>
          </div>
        </div>
      </div>

      <div className="px-12 py-14 max-w-[1100px]">

        {/* ── A-0 COLOUR ANALYSIS ─────────────────────── */}
        <section className="mb-20">
          <SectionTitle index="A-00" title="사진 색상 분석 / Colour Extraction" />
          <div className="flex gap-6">
            {/* Photo with annotation areas */}
            <div style={{ width: 420, flexShrink: 0 }}>
              <img src={referenceImg} style={{ width: "100%", objectFit: "cover", display: "block" }} alt="Reference" />
            </div>
            {/* Extracted swatches */}
            <div className="flex-1">
              <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 9, color: "#6B5D50", letterSpacing: "0.16em", marginBottom: 16 }}>
                EXTRACTED FROM PHOTO
              </div>
              <div className="grid grid-cols-2 gap-3">
                {photoSwatches.map(s => (
                  <div key={s.hex} className="flex items-center gap-3">
                    <div style={{ width: 52, height: 52, background: s.hex, flexShrink: 0, border: s.hex === "#FFFFFF" ? "1px solid #E8DDD0" : "none" }} />
                    <div>
                      <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 10, color: AC, letterSpacing: "0.1em" }}>{s.hex}</div>
                      <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 12, color: "#4A4A4A", marginTop: 1, fontWeight: 400 }}>{s.area}</div>
                      <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 9, color: "#6B5D50", letterSpacing: "0.1em" }}>{s.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Palette tone comparison */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { title: "베이지 × 아이보리 스케일", sub: "Beige–Ivory Scale", swatches: ["#F5F0E8","#E8DDD0","#D4C4B0","#C0AE98","#A89780"], desc: "따뜻하고 부드러운 중성 톤 — 공간의 배경이 되는 색상" },
              { title: "브라운 × 우드 스케일", sub: "Brown–Wood Scale", swatches: ["#8B6F47","#A0826D","#B89580","#CCA893","#E0BBA6"], desc: "자연스러운 목재 톤 — 따뜻함과 신뢰를 주는 메인 컬러" },
              { title: "그린 × 세이지 스케일", sub: "Green–Sage Scale", swatches: ["#5F8457","#7A9B6E","#95B88D","#AFD4A3","#C9EFB9"], desc: "자연에서 온 그린 — 생동감과 균형을 주는 액센트" },
            ].map(g => (
              <div key={g.title} className="bg-white p-5" style={{ border: "1px solid #E8DDD0" }}>
                <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 9, color: AC, letterSpacing: "0.14em", marginBottom: 4 }}>{g.sub}</div>
                <div style={{ fontSize: 13, fontWeight: 500, color: DK, marginBottom: 12 }}>{g.title}</div>
                <div className="flex gap-1 mb-4" style={{ height: 32 }}>
                  {g.swatches.map(c => <div key={c} style={{ flex: 1, background: c }} />)}
                </div>
                <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 11, color: "#6B5D50", lineHeight: 1.6, fontWeight: 300 }}>{g.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── A-1 COLOUR PALETTE ──────────────────────── */}
        <section className="mb-20">
          <SectionTitle index="A-01" title="컬러 스타일 / Color Palette" />

          {/* Full palette */}
          <div className="space-y-3">
            <div className="flex gap-3">
              {colors.slice(0, 3).map(c => <ColorSwatch key={c.hex} {...c} large />)}
            </div>
            <div className="flex gap-3">
              {colors.slice(3, 6).map(c => <ColorSwatch key={c.hex} {...c} large />)}
            </div>
            <div className="flex gap-3">
              {colors.slice(6, 9).map(c => <ColorSwatch key={c.hex} {...c} large />)}
            </div>
            <div className="flex gap-3">
              {colors.slice(9).map(c => <ColorSwatch key={c.hex} {...c} large accent />)}
              <div className="flex-1" />
            </div>
          </div>

          {/* Usage matrix */}
          <div className="mt-8 p-6 bg-white" style={{ borderLeft: `3px solid ${AC}` }}>
            <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 9, letterSpacing: "0.15em", color: AC, marginBottom: 16 }}>COLOR USAGE MATRIX</p>
            <div className="grid grid-cols-4 gap-6">
              {[
                { label: "Background", swatches: ["#FFFFFF","#F5F0E8","#E8DDD0"], desc: "기본 / 섹션 / 강조 배경" },
                { label: "Typography", swatches: ["#2D2D2D","#4A4A4A","#6B5D50"], desc: "제목 / 본문 / 부제" },
                { label: "Warm Tones", swatches: ["#8B6F47","#A0826D","#D4C4B0"], desc: "목재 / 우드 / 보더" },
                { label: "Accent (Nature)", swatches: ["#7A9B6E","#95B88D","#8B6F47"], desc: "그린 / 세이지 / 월넛" },
              ].map(g => (
                <div key={g.label}>
                  <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 11, fontWeight: 500, color: "#4A4A4A", letterSpacing: "0.08em", textTransform: "uppercase" as const, marginBottom: 8 }}>{g.label}</div>
                  <div className="flex gap-1 mb-3">
                    {g.swatches.map(c => <div key={c} style={{ width: 24, height: 24, background: c, border: c === "#FFFFFF" ? "1px solid #E8DDD0" : "none" }} />)}
                  </div>
                  <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 11, color: "#6B5D50", fontWeight: 300 }}>{g.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Two palette options side-by-side */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="p-5" style={{ background: DK }}>
              <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 9, color: AC2, letterSpacing: "0.18em", marginBottom: 16 }}>DARK VARIANT — Charcoal Background</div>
              <div className="flex gap-2 mb-4">
                {["#2D2D2D","#8B6F47","#7A9B6E","#A0826D","#F5F0E8"].map(c => (
                  <div key={c} style={{ flex: 1, height: 40, background: c }} />
                ))}
              </div>
              <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 28, fontWeight: 300, color: "#F5F0E8", letterSpacing: "0.02em", marginBottom: 6 }}>
                공간에 머무는 순간
              </div>
              <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 9, color: "#6B5D50", letterSpacing: "0.12em" }}>
                @103MOMENT · 공간 철학
              </div>
            </div>
            <div className="p-5" style={{ background: "#F5F0E8" }}>
              <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 9, color: AC, letterSpacing: "0.18em", marginBottom: 16 }}>LIGHT VARIANT — Ivory Background</div>
              <div className="flex gap-2 mb-4">
                {["#F5F0E8","#E8DDD0","#D4C4B0","#8B6F47","#7A9B6E","#2D2D2D"].map(c => (
                  <div key={c} style={{ flex: 1, height: 40, background: c, border: c === "#F5F0E8" ? "1px solid #E8DDD0" : "none" }} />
                ))}
              </div>
              <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 28, fontWeight: 300, color: DK, letterSpacing: "0.02em", marginBottom: 6 }}>
                나만의 시간을 찾다
              </div>
              <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 9, color: "#6B5D50", letterSpacing: "0.12em" }}>
                @103MOMENT · 라이프스타일
              </div>
            </div>
          </div>
        </section>

        {/* ── A-2 TYPOGRAPHY ──────────────────────────── */}
        <section className="mb-20">
          <SectionTitle index="A-02" title="타이포 스타일 / Typography" />
          <div className="space-y-2">
            {typeStyles.map(t => (
              <div key={t.label} className="bg-white border p-6 flex items-start justify-between gap-6" style={{ borderColor: "#E8DDD0" }}>
                <div className="flex-1">
                  <div style={{ fontFamily: t.font, fontSize: Math.min(t.size, 44), fontWeight: t.weight, letterSpacing: t.tracking, color: DK, lineHeight: 1.3 }}>
                    {t.sample}
                  </div>
                  {t.sampleEn && (
                    <div style={{ fontFamily: t.font, fontSize: Math.min(t.size * 0.7, 30), fontWeight: t.weight - 100, letterSpacing: t.tracking, color: "#6B5D50", lineHeight: 1.3, marginTop: 4 }}>
                      {t.sampleEn}
                    </div>
                  )}
                </div>
                <div className="text-right shrink-0" style={{ minWidth: 180 }}>
                  <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 10, color: AC, letterSpacing: "0.12em", marginBottom: 6 }}>{t.label}</div>
                  <Spec label="FONT" value="Noto Sans KR" />
                  <div style={{ marginTop: 4 }}>
                    <Spec label="SIZE" value={`${t.size}px`} />
                    <Spec label="WEIGHT" value={`${t.weight}`} />
                    <Spec label="TRACK" value={t.tracking} />
                  </div>
                  <div className="mt-3 px-2 py-1 inline-block" style={{ background: "#E8DDD0", fontSize: 9, fontFamily: "'Noto Sans KR', sans-serif", color: "#6B5D50", letterSpacing: "0.1em" }}>
                    {t.usage}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-5 flex gap-8" style={{ background: DK }}>
            {[
              { name: "Noto Sans KR", role: "All Typography", sub: "모든 타이포그래피 — 통일감 있는 미니멀리즘" },
            ].map(f => (
              <div key={f.name} className="flex-1">
                <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 8, color: AC2, letterSpacing: "0.15em" }}>{f.role}</div>
                <div style={{ fontSize: 13, fontWeight: 500, color: "#F5F0E8", marginTop: 3 }}>{f.name}</div>
                <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 11, color: "#6B5D50", marginTop: 2 }}>{f.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── A-3 SPACING ─────────────────────────────── */}
        <section className="mb-20">
          <SectionTitle index="A-03" title="여백 규칙 / Spacing System" />
          <div className="bg-white border p-8" style={{ borderColor: "#E8DDD0" }}>
            <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 9, color: "#6B5D50", letterSpacing: "0.14em", marginBottom: 24 }}>
              BASE UNIT — 4px GRID SYSTEM
            </div>
            <div className="flex items-end gap-3 flex-wrap">
              {spacings.map(s => (
                <div key={s} className="flex flex-col items-center">
                  <div style={{ width: Math.min(s * 1.5, 128), height: Math.min(s * 1.5, 128), background: s <= 16 ? "#D4C4B0" : s <= 48 ? "#8B6F47" : s <= 80 ? "#6B5D50" : DK }} />
                  <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 9, color: "#6B5D50", marginTop: 6, letterSpacing: "0.1em" }}>{s}px</div>
                  <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 8, color: "#D4C4B0", letterSpacing: "0.08em" }}>t-{s / 4}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── A-4 BUTTONS / LABELS / CHIPS ────────────── */}
        <section className="mb-20">
          <SectionTitle index="A-04" title="버튼 / 라벨 / 번호칩" />
          <div className="bg-white border p-8 space-y-10" style={{ borderColor: "#E8DDD0" }}>
            {/* Buttons */}
            <div>
              <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 9, letterSpacing: "0.18em", color: "#6B5D50", marginBottom: 16 }}>BUTTONS</div>
              <div className="flex flex-wrap gap-4 items-center">
                <button style={{ background: DK, color: "#F5F0E8", padding: "12px 28px", fontFamily: "'Noto Sans KR', sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: "0.08em", border: "none", cursor: "pointer" }}>Primary Charcoal</button>
                <button style={{ background: "transparent", color: DK, padding: "11px 28px", fontFamily: "'Noto Sans KR', sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: "0.08em", border: `1px solid ${DK}`, cursor: "pointer" }}>Secondary</button>
                <button style={{ background: AC, color: "#FFFFFF", padding: "12px 28px", fontFamily: "'Noto Sans KR', sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: "0.08em", border: "none", cursor: "pointer" }}>Walnut CTA</button>
                <button style={{ background: AC2, color: "#FFFFFF", padding: "12px 28px", fontFamily: "'Noto Sans KR', sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: "0.08em", border: "none", cursor: "pointer" }}>Sage Accent</button>
                <button style={{ background: "#E8DDD0", color: "#6B5D50", padding: "12px 28px", fontFamily: "'Noto Sans KR', sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: "0.08em", border: "none", cursor: "not-allowed" }} disabled>Disabled</button>
              </div>
            </div>
            {/* Labels */}
            <div>
              <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 9, letterSpacing: "0.18em", color: "#6B5D50", marginBottom: 16 }}>LABELS / TAGS</div>
              <div className="flex flex-wrap gap-3 items-center">
                {[
                  { text: "공간 관찰", bg: DK, color: "#FFFFFF" },
                  { text: "인사이트", bg: AC, color: "#FFFFFF" },
                  { text: "라이프스타일", bg: "#E8DDD0", color: "#4A4A4A" },
                  { text: "공간 철학", bg: "#FFFFFF", color: "#6B5D50", border: "#D4C4B0" },
                  { text: "진행 중", bg: "#D4C4B0", color: DK },
                  { text: "@103MOMENT", bg: AC2, color: "#FFFFFF" },
                ].map(l => (
                  <span key={l.text} style={{ background: l.bg, color: l.color, border: l.border ? `1px solid ${l.border}` : "none", padding: "5px 12px", fontFamily: "'Noto Sans KR', sans-serif", fontSize: 9, letterSpacing: "0.12em", display: "inline-block" }}>
                    {l.text}
                  </span>
                ))}
              </div>
            </div>
            {/* Number Chips */}
            <div>
              <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 9, letterSpacing: "0.18em", color: "#6B5D50", marginBottom: 16 }}>NUMBER CHIPS — 카드뉴스 순서 표기</div>
              <div className="flex flex-wrap gap-4 items-center">
                {[1,2,3,4].map(n => (
                  <div key={`k${n}`} style={{ width: 40, height: 40, background: DK, color: "#F5F0E8", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Noto Sans KR', sans-serif", fontSize: 13 }}>
                    {String(n).padStart(2,"0")}
                  </div>
                ))}
                <div style={{ width: 1, height: 40, background: "#E8DDD0" }} />
                {[1,2,3].map(n => (
                  <div key={`f${n}`} style={{ width: 40, height: 40, background: AC, color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Noto Sans KR', sans-serif", fontSize: 13 }}>
                    {String(n).padStart(2,"0")}
                  </div>
                ))}
                <div style={{ width: 1, height: 40, background: "#E8DDD0" }} />
                {[1,2,3].map(n => (
                  <div key={`o${n}`} style={{ width: 40, height: 40, border: `1px solid ${DK}`, color: DK, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Noto Sans KR', sans-serif", fontSize: 13 }}>
                    {String(n).padStart(2,"0")}
                  </div>
                ))}
                <div style={{ width: 1, height: 40, background: "#E8DDD0" }} />
                {[1,2].map(n => (
                  <div key={`lg${n}`} style={{ width: 56, height: 56, background: AC2, color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Noto Sans KR', sans-serif", fontSize: 22, fontWeight: 300 }}>
                    {n}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── A-5 LOGO SYSTEM ─────────────────────────── */}
        <section className="mb-20">
          <SectionTitle index="A-05" title="로고 & 워드마크 / Logo System" />
          <div className="grid grid-cols-3 gap-4">
            {[
              { bg: "#FFFFFF", label: "ON WHITE", textColor: DK },
              { bg: DK, label: "ON CHARCOAL", textColor: "#F5F0E8" },
              { bg: "#E8DDD0", label: "ON CREAM", textColor: DK },
              { bg: AC, label: "ON WALNUT", textColor: "#FFFFFF" },
              { bg: AC2, label: "ON SAGE", textColor: "#FFFFFF" },
              { bg: "#F5F0E8", label: "ON IVORY", textColor: DK },
            ].map(v => (
              <div key={v.label} className="flex flex-col items-center justify-center p-8" style={{ minHeight: 180, background: v.bg, border: v.bg === "#FFFFFF" || v.bg === "#F5F0E8" ? "1px solid #E8DDD0" : "none" }}>
                <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 32, fontWeight: 300, color: v.textColor, letterSpacing: "0.02em" }}>@103moment</div>
                <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 8, letterSpacing: "0.16em", color: v.textColor, opacity: 0.5, marginTop: 14 }}>{v.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── A-6 COMPONENTS ──────────────────────────── */}
        <section className="mb-20">
          <SectionTitle index="A-06" title="카드뉴스 공통 컴포넌트" />
          <div className="space-y-4">
            <div className="bg-white border p-6" style={{ borderColor: "#E8DDD0" }}>
              <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 8, color: "#6B5D50", letterSpacing: "0.16em", marginBottom: 10 }}>COMPONENT — Header Strip</div>
              <HeaderStrip />
            </div>
            <div className="bg-white border p-6" style={{ borderColor: "#E8DDD0" }}>
              <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 8, color: "#6B5D50", letterSpacing: "0.16em", marginBottom: 10 }}>COMPONENT — Footer Strip</div>
              <FooterStrip />
            </div>
            <div className="bg-white border p-6" style={{ borderColor: "#E8DDD0" }}>
              <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 8, color: "#6B5D50", letterSpacing: "0.16em", marginBottom: 16 }}>COMPONENT — Quote / Highlight Block</div>
              <div style={{ borderLeft: `3px solid ${AC}`, paddingLeft: 20, paddingTop: 4, paddingBottom: 4 }}>
                <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 22, fontWeight: 300, color: "#FFFFFF", lineHeight: 1.6, letterSpacing: "0.01em" }}>
                  "공간은 우리가 머무는 곳이 아니라,<br />우리를 이해하는 곳입니다."
                </div>
                <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 9, color: "#6B5D50", letterSpacing: "0.14em", marginTop: 10 }}>
                  — @103MOMENT
                </div>
              </div>
            </div>
            {/* Dividers */}
            <div className="bg-white border p-6 space-y-5" style={{ borderColor: "#E8DDD0" }}>
              <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 8, color: "#6B5D50", letterSpacing: "0.16em", marginBottom: 8 }}>COMPONENT — Dividers</div>
              {[
                { color: DK, label: "RULE — CHARCOAL FULL" },
                { color: "#8B6F47", label: "RULE — WALNUT" },
                { color: AC2, label: "RULE — SAGE ACCENT" },
              ].map(d => (
                <div key={d.label} className="flex items-center gap-4">
                  <div style={{ flex: 1, height: d.color === AC2 ? 2 : 1, background: d.color }} />
                  <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 8, color: "#6B5D50", letterSpacing: "0.1em", flexShrink: 0 }}>{d.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────
function ColorSwatch({ name, hex, label, usage, large = false, accent = false }: { name: string; hex: string; label: string; usage: string; large?: boolean; accent?: boolean }) {
  return (
    <div className="flex-1" style={{ minWidth: accent ? 180 : 100 }}>
      <div style={{ background: hex, height: large ? 80 : 60, border: hex === "#FFFFFF" ? "1px solid #E8DDD0" : "none" }} />
      <div style={{ background: "#FFFFFF", padding: "8px 0 0" }}>
        <div style={{ fontSize: 11, fontWeight: 500, color: DK }}>{name}</div>
        <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 9, color: AC, letterSpacing: "0.1em", marginTop: 2 }}>{hex}</div>
        <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 10, color: "#6B5D50", marginTop: 2, fontWeight: 300 }}>{usage}</div>
      </div>
    </div>
  );
}

function HeaderStrip() {
  return (
    <div className="flex items-center justify-between px-8 py-6" style={{ background: "#F5F0E8", borderBottom: "1px solid #E8DDD0" }}>
      <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 10, color: "#6B5D50", letterSpacing: "0.16em" }}>
        SPACE INSIGHT
      </div>
      <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 18, fontWeight: 500, color: DK, letterSpacing: "0.02em" }}>
        @103moment
      </div>
      <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 10, color: "#6B5D50", letterSpacing: "0.16em" }}>
        01
      </div>
    </div>
  );
}

function FooterStrip() {
  return (
    <div className="flex items-center justify-between px-8 py-5" style={{ background: DK }}>
      <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 9, color: AC2, letterSpacing: "0.18em" }}>
        @103MOMENT
      </div>
      <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 11, color: "#F5F0E8", letterSpacing: "0.1em" }}>
        공간 철학 · 라이프스타일 인사이트
      </div>
    </div>
  );
}