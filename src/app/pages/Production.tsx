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

const IMG_DARK = "https://images.unsplash.com/photo-1769473357493-319cbde6b248?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwY2FmZSUyMGludGVyaW9yJTIwbmF0dXJhbCUyMGxpZ2h0fGVufDF8fHx8MTc3MzM0NjA5NHww&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_LIGHT = "https://images.unsplash.com/photo-1716444511299-9fd14892b87c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBhZXN0aGV0aWMlMjBiZWlnZXxlbnwxfHx8fDE3NzMzODU0NjN8MA&ixlib=rb-4.1.0&q=80&w=1080";

// ─── Data ─────────────────────────────────────────────────────────────────────
const fileSections = [
  {
    label: "A",
    title: "브랜드 시스템",
    files: [
      { name: "103moment_BrandSystem_v2.0.fig", size: "2.1 MB", desc: "컬러, 타이포, 여백, 컴포넌트 전체", status: "완료" },
      { name: "103moment_LogoPackage.zip",       size: "950 KB", desc: "SVG / PNG 포맷 로고 패키지",   status: "완료" },
      { name: "103moment_ColorPalette.ase",       size: "11 KB",  desc: "Adobe Swatch Exchange 컬러 팔레트", status: "완료" },
      { name: "103moment_TypeRamp.fig",           size: "680 KB", desc: "타이포그래피 스타일 가이드",         status: "완료" },
    ],
  },
  {
    label: "B",
    title: "소셜 템플릿",
    files: [
      { name: "103moment_Feed_1080x1350.fig",    size: "2.8 MB", desc: "인스타그램 피드 — 2종 (다크/라이트)", status: "완료" },
      { name: "103moment_Reels_1080x1920.fig",   size: "3.2 MB", desc: "릴스 표지 — 2종 (세이지/크림)",  status: "완료" },
      { name: "103moment_CardNews_Cover.fig",    size: "2.5 MB", desc: "카드뉴스 표지 — 2종 (다크/라이트)", status: "완료" },
      { name: "103moment_CardNews_BodyA.fig",    size: "2.7 MB", desc: "본문형 A — 텍스트 중심 2종",          status: "완료" },
      { name: "103moment_CardNews_BodyB.fig",    size: "2.4 MB", desc: "본문형 B — 리스트형 2종",          status: "완료" },
      { name: "103moment_CardNews_CTA.fig",      size: "2.2 MB", desc: "마무리 CTA — 2종 (다크/라이트)", status: "완료" },
    ],
  },
  {
    label: "C",
    title: "발행용 내보내기",
    files: [
      { name: "103moment_Feed_Export_Set01.zip",     size: "16 MB", desc: "피드 1080×1350 PNG 내보내기 (300dpi)",  status: "준비 중" },
      { name: "103moment_Reels_Export_Set01.zip",    size: "22 MB", desc: "릴스 1080×1920 PNG 내보내기 (300dpi)", status: "준비 중" },
      { name: "103moment_CardNews_Set01_6ea.zip",    size: "38 MB", desc: "카드뉴스 1세트 6장 PNG (300dpi)",      status: "준비 중" },
    ],
  },
];

const publishingCalendar = [
  { week: "W1", day: "월", type: "피드",     title: "스타벅스 공간 관찰",           format: "1080×1350", status: "발행 완료", color: AC },
  { week: "W1", day: "수", type: "카드뉴스", title: "왜 우리는 스타벅스에 오래 있을까", format: "카드 6장",  status: "발행 완료", color: AC },
  { week: "W1", day: "금", type: "릴스",     title: "나를 신경쓰지 않는 과외선생님처럼",         format: "1080×1920", status: "발행 완료", color: AC },
  { week: "W2", day: "화", type: "피드",     title: "카페에서 찾는 나만의 시간",     format: "1080×1350", status: "예약됨",    color: DK2 },
  { week: "W2", day: "목", type: "카드뉴스", title: "공간이 주는 신호",          format: "카드 6장",  status: "작업 중",   color: AC2 },
  { week: "W2", day: "토", type: "릴스",     title: "편히 집중되는 분위기",           format: "1080×1920", status: "대기 중",   color: MID },
  { week: "W3", day: "월", type: "피드",     title: "하루 세번 다른 얼굴",     format: "1080×1350", status: "대기 중",   color: MID },
  { week: "W3", day: "수", type: "카드뉴스", title: "우리는 커피가 아니라 시간을 사러간다",      format: "카드 6장",  status: "대기 중",   color: MID },
];

const tagSets = [
  {
    label: "브랜드 태그",
    tags: ["#103moment", "#공간철학", "#공간관찰", "#라이프스타일인사이트", "#인사이트"],
    bg: DK, color: AC2,
  },
  {
    label: "콘텐츠 태그",
    tags: ["#공간심리", "#공간디자인", "#카페인테리어", "#공간탐구", "#일상관찰"],
    bg: CREAM, color: MID, border: LINEN,
  },
  {
    label: "검색 태그",
    tags: ["#스타벅스", "#카페", "#공간경험", "#공간철학", "#라이프스타일"],
    bg: "#FFFFFF", color: DK, border: CREAM,
  },
  {
    label: "감성 태그",
    tags: ["#공간스타그램", "#일상의미학", "#공간인사이트", "#관찰일기", "#생각나누기"],
    bg: DK2, color: LINEN,
  },
];

const voiceGuide = [
  {
    type: "피드 캡션",
    do: "공간은 우리가 머무는 곳이 아니라, 우리를 이해하는 곳입니다. 당신은 어떤 공간에서 편안함을 느끼시나요?",
    dont: "핫플레이스 대공개! 지금 바로 팔로우하고 정보 받으세요!",
    tone: "관찰적 · 성찰적",
  },
  {
    type: "카드뉴스 헤드라인",
    do: "왜 우리는 스타벅스에 오래 있을까? — 공간 심리학으로 풀어보는 질문",
    dont: "대박꿀팁! 카페에서 오래 머무는 비결 총정리!",
    tone: "통찰력 · 질문형",
  },
  {
    type: "릴스 자막",
    do: "간섭하지 않지만, 방치하지도 않는다.\n적당한 거리에서 집중을 지켜본다.",
    dont: "역대급 팩트폭격!! 이거 보고 깜놀 ㅋㅋ",
    tone: "시적 · 간결",
  },
  {
    type: "CTA",
    do: "공감하시나요? DM으로 생각을 나눠주세요.",
    dont: "좋아요 + 팔로우 필수! 댓글 남기면 선물 증정!",
    tone: "초대형 · 부드러움",
  },
];

const checklist = [
  { id: 1, item: "이미지 해상도 확인 (1080��1350 또는 1080×1920)", checked: false, priority: "high" },
  { id: 2, item: "브랜드 컬러 팔레트 일관성 검토 (베이지 × 브라운 × 그린)", checked: false, priority: "high" },
  { id: 3, item: "폰트 사용 확인 (Noto Sans KR 전용)", checked: false, priority: "high" },
  { id: 4, item: "인스타그램 핸들 @103moment 포함 여부", checked: false, priority: "high" },
  { id: 5, item: "톤 앤 매너 일치 여부 (관찰적·성찰적)", checked: false, priority: "medium" },
  { id: 6, item: "해시태그 세트 적용 (브랜드+콘텐츠+검색+감성)", checked: false, priority: "medium" },
  { id: 7, item: "텍스트 가독성 검토 (라이트/다크 대비)", checked: false, priority: "medium" },
  { id: 8, item: "모바일 화면 미리보기 확인", checked: false, priority: "medium" },
  { id: 9, item: "캡션 초안 작성 완료", checked: false, priority: "low" },
  { id: 10, item: "발행 시간대 확정 (오전 10시 / 오후 7시 권장)", checked: false, priority: "low" },
];

const SectionTitle = ({ index, title }: { index: string; title: string }) => (
  <div className="flex items-center gap-4 mb-8">
    <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 10, letterSpacing: "0.2em", color: AC }}>{index}</span>
    <div className="flex-1 h-px" style={{ background: LINEN }} />
    <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: DK2 }}>{title}</span>
    <div className="w-8 h-px" style={{ background: LINEN }} />
  </div>
);

export function Production() {
  return (
    <div className="min-h-screen" style={{ background: BG, fontFamily: "'Noto Sans KR', sans-serif" }}>
      {/* Header */}
      <div style={{ background: DK }} className="px-12 pt-16 pb-12">
        <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 10, letterSpacing: "0.22em", color: AC2, marginBottom: 12 }}>C. PRODUCTION</div>
        <h1 style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 48, fontWeight: 300, letterSpacing: "0.02em", color: BG, lineHeight: 1.2 }}>
          Production<br /><span style={{ color: AC2 }}>Workflow</span>
        </h1>
        <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 13, color: MID, marginTop: 16, letterSpacing: "0.04em", fontWeight: 300 }}>
          작업 파일 · 발행 캘린더 · 체크리스트 · 해시태그 · 보이스 톤
        </p>
        <div className="flex mt-8" style={{ height: 4 }}>
          {[DK,DK2,MID,WALNUT,CHEST,LINEN,CREAM,BG,AC2].map((c, idx) => (
            <div key={`color-${idx}`} style={{ flex: 1, background: c }} />
          ))}
        </div>
      </div>

      <div className="px-12 py-14 max-w-[1200px]">
        {/* C-1 File List */}
        <section className="mb-20">
          <SectionTitle index="C-01" title="작업 파일 목록 / File Inventory" />
          <div className="space-y-4">
            {fileSections.map(sec => (
              <div key={sec.label} className="bg-white border p-6" style={{ borderColor: CREAM }}>
                <div className="flex items-center gap-3 mb-5">
                  <div style={{ width: 40, height: 40, background: DK, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 16, color: BG }}>{sec.label}</span>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: DK, letterSpacing: "0.04em" }}>{sec.title}</div>
                </div>
                <div className="space-y-2">
                  {sec.files.map(f => (
                    <div key={f.name} className="flex items-center justify-between p-3" style={{ background: BG }}>
                      <div className="flex-1">
                        <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 12, color: DK, marginBottom: 2 }}>{f.name}</div>
                        <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 10, color: MID }}>{f.desc}</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 9, color: MID, letterSpacing: "0.1em" }}>{f.size}</span>
                        <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 9, color: f.status === "완료" ? AC : AC2, background: f.status === "완료" ? CREAM : "#FFFFFF", padding: "4px 10px", letterSpacing: "0.08em", border: `1px solid ${f.status === "완료" ? LINEN : AC2}` }}>{f.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* C-2 Publishing Calendar */}
        <section className="mb-20">
          <SectionTitle index="C-02" title="발행 캘린더 / Publishing Calendar" />
          <div className="bg-white border p-6" style={{ borderColor: CREAM }}>
            <div className="space-y-2">
              {publishingCalendar.map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4" style={{ background: BG }}>
                  <div style={{ width: 48, flexShrink: 0, fontFamily: "'Noto Sans KR', sans-serif", fontSize: 10, color: MID, letterSpacing: "0.12em" }}>{item.week}</div>
                  <div style={{ width: 32, height: 32, background: item.color, color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Noto Sans KR', sans-serif", fontSize: 12, flexShrink: 0 }}>{item.day}</div>
                  <div className="flex-1">
                    <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 13, color: DK, marginBottom: 2 }}>{item.title}</div>
                    <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 9, color: MID, letterSpacing: "0.08em" }}>{item.type} · {item.format}</div>
                  </div>
                  <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 10, color: item.status === "발행 완료" ? AC : item.status === "예약됨" ? AC2 : MID, letterSpacing: "0.1em", background: "#FFFFFF", padding: "4px 12px", border: `1px solid ${item.status === "발행 완료" ? AC : item.status === "예약됨" ? AC2 : LINEN}` }}>{item.status}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* C-3 Checklist */}
        <section className="mb-20">
          <SectionTitle index="C-03" title="발행 전 체크리스트 / Pre-Publish Checklist" />
          <div className="bg-white border p-6" style={{ borderColor: CREAM }}>
            <div className="space-y-3">
              {checklist.map(item => (
                <div key={item.id} className="flex items-start gap-4 p-3" style={{ background: BG }}>
                  <div style={{ width: 20, height: 20, border: `2px solid ${item.priority === "high" ? AC : item.priority === "medium" ? AC2 : LINEN}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                    {item.checked && <span style={{ fontSize: 10, color: AC }}>✓</span>}
                  </div>
                  <div className="flex-1">
                    <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 12, color: DK }}>{item.item}</div>
                  </div>
                  <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 8, color: item.priority === "high" ? AC : item.priority === "medium" ? AC2 : MID, letterSpacing: "0.12em", background: "#FFFFFF", padding: "3px 8px", border: `1px solid ${item.priority === "high" ? AC : item.priority === "medium" ? AC2 : LINEN}`, textTransform: "uppercase" as const }}>
                    {item.priority}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* C-4 Hashtag Sets */}
        <section className="mb-20">
          <SectionTitle index="C-04" title="해시��그 세트 / Hashtag Sets" />
          <div className="grid grid-cols-2 gap-4">
            {tagSets.map(set => (
              <div key={set.label} className="border p-5" style={{ background: set.bg, borderColor: set.border || "transparent" }}>
                <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 11, color: set.color, letterSpacing: "0.12em", marginBottom: 12, opacity: 0.7 }}>{set.label}</div>
                <div className="flex flex-wrap gap-2">
                  {set.tags.map(tag => (
                    <span key={tag} style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 11, color: set.color, background: set.border ? "#FFFFFF" : "rgba(255,255,255,0.15)", padding: "4px 10px", border: set.border ? `1px solid ${set.border}` : "none" }}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* C-5 Voice & Tone */}
        <section className="mb-20">
          <SectionTitle index="C-05" title="보이스 & 톤 가이드 / Voice & Tone" />
          <div className="space-y-4">
            {voiceGuide.map((guide, i) => (
              <div key={i} className="bg-white border p-6" style={{ borderColor: CREAM }}>
                <div className="flex items-center justify-between mb-5">
                  <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 12, fontWeight: 500, color: DK }}>{guide.type}</div>
                  <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 9, color: AC, letterSpacing: "0.14em", background: CREAM, padding: "4px 12px" }}>{guide.tone}</div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div style={{ borderLeft: `3px solid ${AC}`, paddingLeft: 16 }}>
                    <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 9, color: AC, letterSpacing: "0.12em", marginBottom: 8 }}>✓ DO (권장)</div>
                    <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 12, color: DK, lineHeight: 1.7 }}>{guide.do}</div>
                  </div>
                  <div style={{ borderLeft: `3px solid ${DK2}`, paddingLeft: 16 }}>
                    <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 9, color: DK2, letterSpacing: "0.12em", marginBottom: 8 }}>✗ DON'T (지양)</div>
                    <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 12, color: MID, lineHeight: 1.7, textDecoration: "line-through", opacity: 0.7 }}>{guide.dont}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}