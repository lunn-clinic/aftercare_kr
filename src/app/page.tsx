import Link from "next/link";
import { splitName, treatments, type Treatment } from "@/data/treatments";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

const NAVY = "#00394e";

const SILVER_GRAD_SUBTITLE: React.CSSProperties = {
  background:
    "linear-gradient(180deg, rgba(227,227,227,1) 0%, rgba(164,164,164,1) 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
  color: "transparent",
};

const SILVER_GRAD_LABEL: React.CSSProperties = {
  background:
    "linear-gradient(180deg, rgba(164,164,164,1) 0%, rgba(227,227,227,1) 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
  color: "transparent",
};

const LINE_COLOR = "#547A88";
const DOT_COLOR = "#FFFFFF";
const DOT_SIZE = 3;
const DIAMOND_COLOR = "#A2C5D2";

// 시안 group/group-2 (77×12): dash 71.38px + 다이아몬드 ~8px 묶음 (고정폭)
function DashWithDiamond({ side }: { side: "left" | "right" }) {
  const dash = (
    <span
      aria-hidden="true"
      className="block"
      style={{
        width: "71.38px",
        height: "0.7px",
        backgroundColor: "#A4A4A4",
      }}
    />
  );
  return (
    <span
      aria-hidden="true"
      className="inline-flex items-center flex-shrink-0"
      style={{ width: "77px", height: "12px" }}
    >
      {side === "left" ? (
        <>
          <Diamond />
          {dash}
        </>
      ) : (
        <>
          {dash}
          <Diamond />
        </>
      )}
    </span>
  );
}

// 두 겹 다이아몬드 — 외곽 light-blue + 내부 흰 하이라이트
function Diamond() {
  return (
    <span
      aria-hidden="true"
      className="relative inline-block flex-shrink-0"
      style={{ width: "10px", height: "10px" }}
    >
      <span
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45"
        style={{
          width: "7px",
          height: "7px",
          backgroundColor: DIAMOND_COLOR,
          boxShadow: "0 0 3px rgba(255,255,255,0.85)",
        }}
      />
      <span
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45"
        style={{
          width: "3px",
          height: "3px",
          backgroundColor: "#E3E3E3",
        }}
      />
    </span>
  );
}

function Dot({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute top-1/2 -translate-y-1/2 rounded-full z-10 ${className}`}
      style={{
        width: `${DOT_SIZE}px`,
        height: `${DOT_SIZE}px`,
        backgroundColor: DOT_COLOR,
      }}
    />
  );
}

// 시안 분리선: 0.5px 가로선 + 좌우 끝 3px 동그라미 (중앙 dot 없음)
function HLine() {
  return (
    <div className="relative w-full h-[5px] my-0">
      <div
        aria-hidden="true"
        className="absolute top-1/2 -translate-y-1/2 left-0 right-0"
        style={{ height: "0.5px", backgroundColor: LINE_COLOR }}
      />
      <Dot className="left-0 -translate-x-1/2" />
      <Dot className="right-0 translate-x-1/2" />
    </div>
  );
}

// 2열 셀 행 (내부 세로선 포함)
function Row({ left, right }: { left: Treatment; right: Treatment }) {
  return (
    <div className="relative grid grid-cols-2">
      <Cell t={left} />
      <Cell t={right} />
      {/* 세로 0.5px hairline */}
      <div
        aria-hidden="true"
        className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2"
        style={{ width: "0.5px", backgroundColor: LINE_COLOR }}
      />
    </div>
  );
}

function formatBracket(sub: string | null): string | null {
  if (!sub) return null;
  const inner = sub.replace(/^[\(\[]\s*|\s*[\)\]]$/g, "");
  return `[ ${inner} ]`;
}

function Cell({ t }: { t: Treatment }) {
  const { main, sub } = splitName(t.name);
  const brackets = formatBracket(sub);
  return (
    <Link
      href={`/${t.slug}/`}
      className="relative flex flex-col items-center justify-center text-center px-3 py-5 min-h-[119px] hover:bg-white/[0.04] active:bg-white/[0.08] transition-colors"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${BASE_PATH}/icons/${t.slug}.svg`}
        alt=""
        aria-hidden="true"
        className="h-[47px] w-auto mb-2"
      />
      <p
        className="text-[14px] font-bold leading-[19.1px]"
        style={{
          letterSpacing: "-0.42px",
          wordBreak: "keep-all",
          ...SILVER_GRAD_LABEL,
        }}
      >
        {main}
      </p>
      {brackets ? (
        <p
          className="text-[10px] font-medium leading-[19.1px] mt-0.5"
          style={{
            letterSpacing: "-0.3px",
            wordBreak: "keep-all",
            ...SILVER_GRAD_LABEL,
          }}
        >
          {brackets}
        </p>
      ) : null}
    </Link>
  );
}

export default function Home() {
  const grid = treatments.filter((t) => t.slug !== "skincare");
  const skincare = treatments.find((t) => t.slug === "skincare");
  const rows: Array<[Treatment, Treatment]> = [];
  for (let i = 0; i < grid.length; i += 2) {
    rows.push([grid[i], grid[i + 1]]);
  }

  return (
    <main
      className="min-h-screen relative overflow-hidden flex flex-col"
      style={{ backgroundColor: NAVY }}
    >
      {/* 배경 오버레이 — 상단 웨이브(top 고정) + 하단 웨이브(bottom 고정) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex justify-center pointer-events-none"
      >
        <div
          className="w-full max-w-[425px] h-full"
          style={{
            backgroundImage: `url('${BASE_PATH}/bg-detail-top.png'), url('${BASE_PATH}/bg-detail-bottom.png')`,
            backgroundSize: "100% auto, 100% auto",
            backgroundRepeat: "no-repeat, no-repeat",
            backgroundPosition: "top center, bottom center",
          }}
        />
      </div>
      {/* 상단 그라데이션 페이드 */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[187px] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(2,59,80,0.8) 0%, rgba(2,59,80,0) 100%)",
        }}
      />

      <div className="relative w-full max-w-[402px] mx-auto px-6 pt-[88px] pb-12 flex-1 flex flex-col">
        {/* 헤더 */}
        <header className="flex flex-col items-center text-center">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${BASE_PATH}/specialist-mark.png`}
              alt="피부과 전문의"
              className="h-[44px] w-[44px] drop-shadow-[0_2px_8px_rgba(215,29,32,0.35)]"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${BASE_PATH}/lunn-wordmark.svg`}
              alt="LUNN"
              className="h-[52px] w-auto"
            />
          </div>

          {/* 부제 — 시안 group/group-2 고정폭 77px dash+다이아몬드 양옆 + 5px 간격 + 텍스트 */}
          <div className="flex items-center justify-center mt-[42px]">
            <DashWithDiamond side="left" />
            <p
              className="text-[19px] font-semibold leading-[22.3px] whitespace-nowrap mx-[5px]"
              style={{ letterSpacing: "-0.57px", ...SILVER_GRAD_SUBTITLE }}
            >
              시술 후 주의사항
            </p>
            <DashWithDiamond side="right" />
          </div>
        </header>

        {/* 그리드 — 명시적 가로 분리선 + 행 단위 구성 */}
        <div className="mt-[20px]">
          <HLine />
          {rows.map((row, i) => (
            <div key={i}>
              <Row left={row[0]} right={row[1]} />
              <HLine />
            </div>
          ))}

          {/* 피부관리 — 가운데 정렬 단일 셀 (시안 좌표 left=112, width=178: 약 1/2 폭 가운데 정렬) */}
          {skincare ? (
            <div className="flex justify-center">
              <div className="w-1/2">
                <Cell t={skincare} />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
