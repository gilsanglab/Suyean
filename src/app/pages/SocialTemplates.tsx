import { useState } from "react";

// ─── @103moment Palette ───────────────────────────────────────────────────────
const DK      = "#2D2D2D"; // Charcoal
const DK2     = "#4A4A4A"; // Graphite
const MID     = "#6B5D50"; // Stone
const WALNUT  = "#8B6F47"; // Walnut
const CHEST   = "#A0826D"; // Chestnut
const LINEN   = "#D4C4B0"; // Linen
const CREAM   = "#E8DDD0"; // Cream
const BG      = "#F5F0E8"; // Ivory
const AC      = "#8B6F47"; // Walnut — primary accent
const AC2     = "#7A9B6E"; // Sage — green accent

// ─── Images ───────────────────────────────────────────────────────────────────
const IMG_1 = "https://images.unsplash.com/photo-1769473357493-319cbde6b248?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwY2FmZSUyMGludGVyaW9yJTIwbmF0dXJhbCUyMGxpZ2h0fGVufDF8fHx8MTc3MzM0NjA5NHww&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_2 = "https://images.unsplash.com/photo-1716444511299-9fd14892b87c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBhZXN0aGV0aWMlMjBiZWlnZXxlbnwxfHx8fDE3NzMzODU0NjN8MA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_3 = "https://images.unsplash.com/photo-1770573318949-bd4f75d1f9bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwd29vZCUyMGludGVyaW9yJTIwZGVzaWdufGVufDF8fHx8MTc3MzM4NTQ2NHww&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_4 = "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1080&q=80";
const IMG_5 = "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1080&q=80";
const IMG_6 = "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=1080&q=80";

type TemplateKey = "feed" | "reels" | "cover" | "bodyA" | "bodyB" | "cta";
const templates: { key: TemplateKey; label: string; dim: string }[] = [
  { key: "feed",   label: "피드",          dim: "1080 × 1350" },
  { key: "reels",  label: "릴스 표지",     dim: "1080 × 1920" },
  { key: "cover",  label: "카드뉴스 표지", dim: "1080 × 1350" },
  { key: "bodyA",  label: "본문 A",        dim: "1080 × 1350" },
  { key: "bodyB",  label: "본문 B",        dim: "1080 × 1350" },
  { key: "cta",    label: "마무리 CTA",    dim: "1080 × 1350" },
];

const SectionTitle = ({ index, title }: { index: string; title: string }) => (
  <div className="flex items-center gap-4 mb-8">
    <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 10, letterSpacing: "0.2em", color: AC }}>{index}</span>
    <div className="flex-1 h-px" style={{ background: LINEN }} />
    <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: DK2 }}>{title}</span>
    <div className="w-8 h-px" style={{ background: LINEN }} />
  </div>
);

function TemplateWrapper({ children, width, height, scale, label, dim }: {
  children: React.ReactNode; width: number; height: number; scale: number; label: string; dim: string;
}) {
  return (
    <div className="flex flex-col items-start gap-3">
      <div className="flex items-center gap-3">
        <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 9, letterSpacing: "0.16em", color: MID }}>{dim}</div>
        <div style={{ width: 1, height: 12, background: LINEN }} />
        <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 9, letterSpacing: "0.12em", color: AC }}>{label}</div>
        <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 9, letterSpacing: "0.1em", color: MID }}>({Math.round(scale * 100)}%)</div>
      </div>
      <div style={{ width: width * scale, height: height * scale, position: "relative", overflow: "hidden", boxShadow: "0 8px 40px rgba(45,45,45,0.18)", flexShrink: 0 }}>
        <div style={{ width, height, transform: `scale(${scale})`, transformOrigin: "top left", position: "absolute" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export function SocialTemplates() {
  const [activeTemplate, setActiveTemplate] = useState<TemplateKey>("feed");
  return (
    <div className="min-h-screen" style={{ background: BG, fontFamily: "'Noto Sans KR', sans-serif" }}>
      {/* Header */}
      <div style={{ background: DK }} className="px-12 pt-16 pb-12">
        <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 10, letterSpacing: "0.22em", color: AC2, marginBottom: 12 }}>B. SOCIAL TEMPLATES</div>
        <h1 style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 48, fontWeight: 300, letterSpacing: "0.02em", color: BG, lineHeight: 1.2 }}>
          Social Media<br /><span style={{ color: AC2 }}>Templates</span>
        </h1>
        <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 13, color: MID, marginTop: 16, letterSpacing: "0.04em", fontWeight: 300 }}>
          인스타그램 피드 · 릴스 · 카드뉴스 — @103moment 베이지 × 브라운 × 그린 팔레트
        </p>
        {/* palette strip */}
        <div className="flex mt-8" style={{ height: 4 }}>
          {[DK,DK2,MID,WALNUT,CHEST,LINEN,CREAM,BG,AC2].map((c, idx) => (
            <div key={`color-${idx}`} style={{ flex: 1, background: c }} />
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-0 z-10 flex overflow-x-auto border-b" style={{ background: "#FFFFFF", borderColor: CREAM }}>
        {templates.map(t => (
          <button key={t.key} onClick={() => setActiveTemplate(t.key)}
            className="flex flex-col items-center px-6 py-4 shrink-0 transition-all"
            style={{ borderBottom: activeTemplate === t.key ? `2px solid ${AC}` : "2px solid transparent", background: activeTemplate === t.key ? BG : "transparent", cursor: "pointer" }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: activeTemplate === t.key ? DK : MID, letterSpacing: "0.04em" }}>{t.label}</span>
            <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 8, color: AC, letterSpacing: "0.12em", marginTop: 2 }}>{t.dim}</span>
          </button>
        ))}
      </div>

      <div className="px-12 py-12">
        {activeTemplate === "feed"  && <FeedTemplate />}
        {activeTemplate === "reels" && <ReelsTemplate />}
        {activeTemplate === "cover" && <CardCoverTemplate />}
        {activeTemplate === "bodyA" && <CardBodyATemplate />}
        {activeTemplate === "bodyB" && <CardBodyBTemplate />}
        {activeTemplate === "cta"   && <CTATemplate />}
      </div>
    </div>
  );
}

// ─── B-1 Feed ─────────────────────────────────────────────────────────────────
function FeedTemplate() {
  return (
    <div>
      <SectionTitle index="B-01" title="피드 1080 × 1350 / Instagram Feed" />
      <div className="flex gap-10 flex-wrap">
        {/* Dark Version */}
        <div className="flex flex-col gap-3">
          <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 9, color: MID, letterSpacing: "0.14em" }}>VER. 1 — DARK CHARCOAL</div>
          <TemplateWrapper width={1080} height={1350} scale={0.28} label="피드 다크" dim="1080×1350">
            <div style={{ width: 1080, height: 1350, background: DK, position: "relative", overflow: "hidden" }}>
              <img src={IMG_1} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.35 }} alt="" />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${DK} 35%, transparent 75%)` }} />
              {/* Top */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, padding: "48px 60px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 20, color: "#FFFFFF", letterSpacing: "0.02em", fontWeight: 300 }}>우리가 머무는 공간에 대하여 |</span>
                <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 14, color: AC2, letterSpacing: "0.18em" }}>@103MOMENT</span>
              </div>
              {/* Bottom */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "60px" }}>
                <div style={{ width: 60, height: 2, background: AC, marginBottom: 40 }} />
                <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 88, fontWeight: 300, color: BG, lineHeight: 1.1, letterSpacing: "0.01em", marginBottom: 32 }}>
                  왜<br />우리는 스타벅스에<br />오래 있을까?
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid rgba(212,196,176,0.3)`, paddingTop: 28 }}>
                  <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 16, color: MID, letterSpacing: "0.12em" }}>@103moment</span>
                  <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 16, color: MID, letterSpacing: "0.12em" }}>공간 철학</span>
                </div>
              </div>
            </div>
          </TemplateWrapper>
        </div>

        {/* Light Version */}
        <div className="flex flex-col gap-3">
          <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 9, color: MID, letterSpacing: "0.14em" }}>VER. 2 — LIGHT IVORY</div>
          <TemplateWrapper width={1080} height={1350} scale={0.28} label="피드 라이트" dim="1080×1350">
            <div style={{ width: 1080, height: 1350, background: BG, position: "relative" }}>
              <div style={{ height: 780, overflow: "hidden", position: "relative" }}>
                <img src={IMG_2} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
                <div style={{ position: "absolute", top: 48, left: 60, right: 60, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 16, color: "#FFFFFF", letterSpacing: "0.14em", background: `rgba(45,45,45,0.75)`, padding: "10px 20px", fontWeight: 500 }}>SPACE INSIGHT</span>
                </div>
              </div>
              <div style={{ padding: "52px 60px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 28 }}>
                  <div style={{ width: 40, height: 2, background: AC }} />
                  <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 14, color: "#FFFFFF", letterSpacing: "0.16em" }}>공간 관찰</span>
                </div>
                <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 72, fontWeight: 300, color: DK, lineHeight: 1.15, letterSpacing: "0.01em", marginBottom: 20 }}>
                  나만의 시간을<br />찾는 공간
                </div>
                <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 22, color: MID, fontWeight: 300, lineHeight: 1.7, marginBottom: 36 }}>@103moment 라이프스타일 인사이트</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${LINEN}`, paddingTop: 28 }}>
                  <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 28, fontWeight: 300, color: DK, letterSpacing: "0.02em" }}>@103moment</span>
                  <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 14, color: MID, letterSpacing: "0.12em" }}>@103moment</span>
                </div>
              </div>
            </div>
          </TemplateWrapper>
        </div>
      </div>
    </div>
  );
}

// ─── B-2 Reels ────────────────────────────────────────────────────────────────
function ReelsTemplate() {
  return (
    <div>
      <SectionTitle index="B-02" title="릴스 표지 1080 × 1920 / Reels Cover" />
      <div className="flex gap-10 flex-wrap">
        {/* Sage Green */}
        <div className="flex flex-col gap-3">
          <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 9, color: MID, letterSpacing: "0.14em" }}>VER. 1 — SAGE GREEN</div>
          <TemplateWrapper width={1080} height={1920} scale={0.22} label="릴스 세이지" dim="1080×1920">
            <div style={{ width: 1080, height: 1920, background: AC2, position: "relative", overflow: "hidden" }}>
              <img src={IMG_3} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.3 }} alt="" />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(150deg, rgba(122,155,110,0.8) 0%, rgba(122,155,110,0.3) 50%, rgba(45,45,45,0.9) 100%)` }} />
              <div style={{ position: "absolute", top: 80, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
                <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 28, fontWeight: 300, color: BG, letterSpacing: "0.02em" }}>@103moment</span>
              </div>
              <div style={{ position: "absolute", top: "50%", left: 0, right: 0, transform: "translateY(-50%)", padding: "0 80px", textAlign: "center" }}>
                <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 20, color: "#FFFFFF", letterSpacing: "0.24em", marginBottom: 30 }}>공간 관찰</div>
                <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 100, fontWeight: 300, color: BG, lineHeight: 1.1, letterSpacing: "0.01em", marginBottom: 30 }}>
                  나를 신경쓰지 않는<br />과외선생님처럼
                </div>
                <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 26, color: LINEN, fontWeight: 300, letterSpacing: "0.02em", lineHeight: 1.6 }}>
                  간섭하지 않지만, 방치하지도 않는다.<br />적당한 거리에서 집중을 지켜본다.
                </div>
              </div>
              <div style={{ position: "absolute", bottom: 80, left: 80, right: 80 }}>
                <div style={{ height: 1, background: `rgba(212,196,176,0.4)`, marginBottom: 30 }} />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 16, color: CREAM, letterSpacing: "0.12em" }}>@103moment</span>
                  <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 16, color: CREAM, letterSpacing: "0.12em" }}>SPACE INSIGHT</span>
                </div>
              </div>
            </div>
          </TemplateWrapper>
        </div>

        {/* Cream Light */}
        <div className="flex flex-col gap-3">
          <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 9, color: MID, letterSpacing: "0.14em" }}>VER. 2 — CREAM LIGHT</div>
          <TemplateWrapper width={1080} height={1920} scale={0.22} label="릴스 크림" dim="1080×1920">
            <div style={{ width: 1080, height: 1920, background: CREAM, position: "relative" }}>
              <div style={{ height: 1200, overflow: "hidden" }}>
                <img src={IMG_4} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
              </div>
              <div style={{ height: 6, background: AC }} />
              <div style={{ padding: "70px 80px", display: "flex", flexDirection: "column", justifyContent: "space-between", height: 714 }}>
                <div>
                  <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 18, color: AC, letterSpacing: "0.18em", marginBottom: 28 }}>공간 철학</div>
                  <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 90, fontWeight: 300, color: DK, lineHeight: 1.1, letterSpacing: "0.01em" }}>
                    편히 집중 되는<br />분위기
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 24, color: MID, fontWeight: 300, marginBottom: 40, lineHeight: 1.6 }}>튀지 않는 색, 낮은 조도<br />커피보다 '서재'에 가깝다</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${LINEN}`, paddingTop: 32 }}>
                    <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 24, fontWeight: 300, color: DK, letterSpacing: "0.02em" }}>@103moment</span>
                    <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 14, color: MID, letterSpacing: "0.12em" }}>@103moment</span>
                  </div>
                </div>
              </div>
            </div>
          </TemplateWrapper>
        </div>
      </div>
    </div>
  );
}

// ─── B-3 Card Cover ───────────────────────────────────────────────────────────
function CardCoverTemplate() {
  return (
    <div>
      <SectionTitle index="B-03" title="카드뉴스 표지형 / Card News Cover" />
      <div className="flex gap-10 flex-wrap">
        {/* Dark */}
        <div className="flex flex-col gap-3">
          <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 9, color: MID, letterSpacing: "0.14em" }}>표지형 — DARK</div>
          <TemplateWrapper width={1080} height={1350} scale={0.28} label="카드뉴스 표지" dim="1080×1350">
            <div style={{ width: 1080, height: 1350, background: DK2, position: "relative", overflow: "hidden" }}>
              <img src={IMG_5} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.25 }} alt="" />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, rgba(45,45,45,0.6) 0%, rgba(45,45,45,0.95) 100%)` }} />
              <div style={{ position: "absolute", top: 60, left: 60, right: 60, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ background: AC, padding: "12px 28px" }}>
                  <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 16, color: "#FFFFFF", letterSpacing: "0.16em" }}>공간 관찰</span>
                </div>
                <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 20, fontWeight: 300, color: BG, letterSpacing: "0.02em" }}>@103moment</span>
              </div>
              <div style={{ position: "absolute", top: "50%", left: 60, transform: "translateY(-60%)" }}>
                <div style={{ width: 80, height: 80, border: `2px solid ${AC}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 40 }}>
                  <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 32, fontWeight: 300, color: AC }}>01</span>
                </div>
                <div style={{ width: 40, height: 2, background: AC, marginBottom: 32 }} />
                <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 20, color: "#FFFFFF", letterSpacing: "0.18em", marginBottom: 24 }}>공간 관찰 ①</div>
                <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 86, fontWeight: 300, color: BG, lineHeight: 1.1, letterSpacing: "0.01em" }}>
                  나가라는<br />신호가 없다
                </div>
              </div>
              <div style={{ position: "absolute", bottom: 60, left: 60, right: 60, borderTop: `1px solid rgba(212,196,176,0.3)`, paddingTop: 30, display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 18, color: MID, fontWeight: 300 }}>@103moment · 공간 철학</span>
                <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 16, color: DK2, letterSpacing: "0.12em" }}>1 / 6</span>
              </div>
            </div>
          </TemplateWrapper>
        </div>

        {/* Light */}
        <div className="flex flex-col gap-3">
          <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 9, color: MID, letterSpacing: "0.14em" }}>표지형 — LIGHT</div>
          <TemplateWrapper width={1080} height={1350} scale={0.28} label="표지 라이트" dim="1080×1350">
            <div style={{ width: 1080, height: 1350, background: CREAM, position: "relative" }}>
              <div style={{ height: 8, background: DK }} />
              <div style={{ padding: "52px 60px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${LINEN}` }}>
                <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 24, fontWeight: 300, color: DK, letterSpacing: "0.02em" }}>@103moment</span>
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 14, color: MID, letterSpacing: "0.16em" }}>INSIGHT</span>
                  <div style={{ width: 40, height: 40, background: DK, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 14, color: BG }}>01</span>
                  </div>
                </div>
              </div>
              <div style={{ margin: "0 60px", height: 580, overflow: "hidden" }}>
                <img src={IMG_6} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
              </div>
              <div style={{ padding: "52px 60px" }}>
                <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 18, color: "#FFFFFF", letterSpacing: "0.16em", marginBottom: 24 }}>공간 관찰</div>
                <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 74, fontWeight: 300, color: DK, lineHeight: 1.15, letterSpacing: "0.01em" }}>
                  나만의 시간을<br />찾는 공간
                </div>
              </div>
            </div>
          </TemplateWrapper>
        </div>
      </div>
    </div>
  );
}

// ─── B-4 Card Body A ──────────────────────────────────────────────────────────
function CardBodyATemplate() {
  return (
    <div>
      <SectionTitle index="B-04" title="카드뉴스 본문 A / Card News Body A" />
      <div className="flex gap-10 flex-wrap">
        <div className="flex flex-col gap-3">
          <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 9, color: MID, letterSpacing: "0.14em" }}>본문 A — 텍스트 중심</div>
          <TemplateWrapper width={1080} height={1350} scale={0.28} label="본문 A" dim="1080×1350">
            <div style={{ width: 1080, height: 1350, background: BG, position: "relative" }}>
              <div style={{ padding: "60px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 80 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ width: 50, height: 50, background: AC, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 16, color: "#FFFFFF" }}>02</span>
                    </div>
                    <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 16, color: "#FFFFFF", letterSpacing: "0.16em" }}>공간 관찰 ②</span>
                  </div>
                  <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 14, color: MID, letterSpacing: "0.12em" }}>2 / 6</span>
                </div>

                <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 88, fontWeight: 300, color: DK, lineHeight: 1.1, letterSpacing: "0.01em", marginBottom: 80 }}>
                  편히 집중 되는<br />분위기
                </div>

                <div style={{ height: 420, display: "flex", alignItems: "center" }}>
                  <div style={{ borderLeft: `3px solid ${AC}`, paddingLeft: 40 }}>
                    <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 42, color: DK2, fontWeight: 300, lineHeight: 1.7, letterSpacing: "0.01em" }}>
                      튀지 않는 색,<br />낮은 조도<br /><br />커피보다 '서재'에 가깝다.
                    </div>
                  </div>
                </div>

                <div style={{ borderTop: `1px solid ${LINEN}`, paddingTop: 32, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 18, fontWeight: 300, color: DK, letterSpacing: "0.02em" }}>@103moment</span>
                  <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 12, color: MID, letterSpacing: "0.14em" }}>공간 철학</span>
                </div>
              </div>
            </div>
          </TemplateWrapper>
        </div>
      </div>
    </div>
  );
}

// ─── B-5 Card Body B ──────────────────────────────────────────────────────────
function CardBodyBTemplate() {
  return (
    <div>
      <SectionTitle index="B-05" title="카드뉴스 본문 B / Card News Body B" />
      <div className="flex gap-10 flex-wrap">
        <div className="flex flex-col gap-3">
          <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 9, color: MID, letterSpacing: "0.14em" }}>본문 B — 리스트형</div>
          <TemplateWrapper width={1080} height={1350} scale={0.28} label="본문 B" dim="1080×1350">
            <div style={{ width: 1080, height: 1350, background: BG, position: "relative" }}>
              <div style={{ padding: "60px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 60 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ width: 70, height: 70, border: `2px solid ${AC}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 28, fontWeight: 300, color: AC }}>03</span>
                    </div>
                    <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 16, color: "#FFFFFF", letterSpacing: "0.16em" }}>공간 관찰 ③</span>
                  </div>
                  <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 14, color: MID, letterSpacing: "0.12em" }}>3 / 6</span>
                </div>

                <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 74, fontWeight: 300, color: DK, lineHeight: 1.15, letterSpacing: "0.01em", marginBottom: 80 }}>
                  하루 세번<br />다른 얼굴
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
                  {[
                    { num: "01", text: "아침은 서재" },
                    { num: "02", text: "오후는 업무와 대화가 섞이고" },
                    { num: "03", text: "저녁은 라운지가 된다" },
                    { num: "04", text: "같은 장소, 다른 분위기." },
                  ].map(item => (
                    <div key={item.num} style={{ display: "flex", alignItems: "start", gap: 28 }}>
                      <div style={{ width: 48, height: 48, background: AC, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 14, color: "#FFFFFF" }}>{item.num}</span>
                      </div>
                      <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 34, fontWeight: 300, color: DK, letterSpacing: "0.01em", paddingTop: 4 }}>
                        {item.text}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 80, borderTop: `1px solid ${LINEN}`, paddingTop: 32, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 18, fontWeight: 300, color: DK, letterSpacing: "0.02em" }}>@103moment</span>
                  <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 12, color: MID, letterSpacing: "0.14em" }}>공간 철학</span>
                </div>
              </div>
            </div>
          </TemplateWrapper>
        </div>
      </div>
    </div>
  );
}

// ─── B-6 CTA ──────────────────────────────────────────────────────────────────
function CTATemplate() {
  return (
    <div>
      <SectionTitle index="B-06" title="마무리 CTA / Closing CTA" />
      <div className="flex gap-10 flex-wrap">
        <div className="flex flex-col gap-3">
          <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 9, color: MID, letterSpacing: "0.14em" }}>CTA — 마무리형</div>
          <TemplateWrapper width={1080} height={1350} scale={0.28} label="CTA" dim="1080×1350">
            <div style={{ width: 1080, height: 1350, background: DK, position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "100px 80px" }}>
              <div style={{ textAlign: "center", marginBottom: 80 }}>
                <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 88, fontWeight: 300, color: BG, lineHeight: 1.2, letterSpacing: "0.01em", marginBottom: 48 }}>
                  우리는 커피가 아니라<br />나만의 시간을<br />사러간다
                </div>
                <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 28, color: LINEN, fontWeight: 300, letterSpacing: "0.01em", lineHeight: 1.6 }}>
                  스타벅스를 떠나지 못하는 진짜 이유,<br />공감하시나요?
                </div>
              </div>

              <div style={{ width: "100%", maxWidth: 600, background: AC, padding: "32px 48px", textAlign: "center", marginBottom: 60 }}>
                <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 24, color: "#FFFFFF", letterSpacing: "0.08em" }}>
                  DM으로 생각 나누기 →
                </div>
              </div>

              <div style={{ width: "100%", borderTop: `1px solid rgba(212,196,176,0.3)`, paddingTop: 40, textAlign: "center" }}>
                <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 32, fontWeight: 300, color: AC2, letterSpacing: "0.02em", marginBottom: 16 }}>
                  @103moment
                </div>
                <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 16, color: MID, letterSpacing: "0.12em" }}>
                  공간 철학 · 라이프스타일 인사이트
                </div>
              </div>
            </div>
          </TemplateWrapper>
        </div>
      </div>
    </div>
  );
}