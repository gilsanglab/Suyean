import { Outlet, NavLink, useLocation } from "react-router";
import { useState } from "react";

// ─── @103moment Palette ───────────────────────────────────────────────────────
const DK   = "#2D2D2D"; // Charcoal
const MID  = "#6B5D50"; // Stone
const AC   = "#8B6F47"; // Walnut
const AC2  = "#7A9B6E"; // Sage
const BG   = "#F5F0E8"; // Ivory

const navItems = [
  {
    section: "A. Brand System",
    path: "/",
    subsections: [
      "사진 색상 분석",
      "컬러 스타일",
      "타이포 스타일",
      "여백 규칙",
      "버튼 / 라벨 / 번호칩",
      "로고 & 워드마크",
      "카드뉴스 공통 컴포넌트",
    ],
  },
  {
    section: "B. Social Templates",
    path: "/templates",
    subsections: [
      "피드 1080×1350",
      "릴스 표지 1080×1920",
      "카드뉴스 표지형",
      "카드뉴스 본문형 A",
      "카드뉴스 본문형 B",
      "마무리 CTA형",
    ],
  },
  {
    section: "C. Production",
    path: "/production",
    subsections: [
      "작업 파일 목록",
      "발행 캘린더",
      "발행 전 체크리스트",
      "해시태그 세트",
      "보이스 & 톤 가이드",
    ],
  },
  {
    section: "D. 콘텐츠 메이커",
    path: "/generator",
    subsections: [
      "소재 입력 → 브랜드 이미지",
      "피드 생성",
      "릴스 표지 생성",
      "카드뉴스 생성",
      "CTA 생성",
      "PNG 다운로드",
    ],
  },
];

export function Layout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div style={{ fontFamily: "'Noto Sans KR', sans-serif", background: BG }} className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className="flex flex-col transition-all duration-300"
        style={{ width: sidebarOpen ? 264 : 0, minWidth: sidebarOpen ? 264 : 0, overflow: "hidden", background: DK }}
      >
        {/* Logo */}
        <div className="flex flex-col items-center px-6 pt-8 pb-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 32, fontWeight: 300, color: BG, letterSpacing: "0.02em" }}>
            @103moment
          </div>
          <div className="mt-3 text-center" style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 9, letterSpacing: "0.18em", color: MID }}>
            BRAND DESIGN SYSTEM
          </div>
          {/* Palette mini strip */}
          <div className="flex w-full mt-4" style={{ height: 3 }}>
            {[DK,"#4A4A4A",MID,AC,"#A0826D","#D4C4B0","#E8DDD0",BG,AC2].map(c => (
              <div key={c} style={{ flex: 1, background: c }} />
            ))}
          </div>
          <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 7, color: "#4A4A4A", letterSpacing: "0.14em", marginTop: 4 }}>
            BEIGE × BROWN × GREEN
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
          {navItems.map((item) => {
            const isActive =
              item.path === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(item.path);
            return (
              <div key={item.path}>
                <NavLink to={item.path} end={item.path === "/"}>
                  {({ isActive: active }) => (
                    <div className="flex items-center gap-2 mb-3 cursor-pointer">
                      <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 9, letterSpacing: "0.15em", color: active ? AC2 : MID }}>
                        {item.section.split(".")[0]}.
                      </span>
                      <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.08em", color: active ? BG : MID, textTransform: "uppercase" as const }}>
                        {item.section.split(". ")[1]}
                      </span>
                      {active && (
                        <span className="ml-auto" style={{ width: 4, height: 4, borderRadius: "50%", background: AC2, flexShrink: 0 }} />
                      )}
                    </div>
                  )}
                </NavLink>
                {isActive && (
                  <ul className="space-y-1 pl-3" style={{ borderLeft: `1px solid rgba(122,155,110,0.25)` }}>
                    {item.subsections.map((sub) => (
                      <li
                        key={sub}
                        style={{ fontSize: 11, color: MID, padding: "3px 0 3px 8px", letterSpacing: "0.02em", fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 300 }}
                      >
                        {sub}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-6 py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", fontFamily: "'Noto Sans KR', sans-serif", fontSize: 9, color: "#4A4A4A", letterSpacing: "0.1em" }}>
          © 2026 @103MOMENT<br />
          BRAND SYSTEM v2.0
        </div>
      </aside>

      {/* Toggle button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-5 z-50 flex items-center justify-center"
        style={{
          width: 32, height: 32,
          background: sidebarOpen ? BG : DK,
          border: "1px solid",
          borderColor: sidebarOpen ? "rgba(45,45,45,0.12)" : DK,
          cursor: "pointer",
          left: sidebarOpen ? 264 : 12,
          transition: "left 0.3s",
          borderRadius: 0,
        }}
      >
        <span style={{ fontSize: 12, color: sidebarOpen ? DK : BG, lineHeight: 1 }}>
          {sidebarOpen ? "←" : "→"}
        </span>
      </button>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}