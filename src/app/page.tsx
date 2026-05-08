import Link from "next/link";
import { splitName, treatments } from "@/data/treatments";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

// 배경 위 가독성용 부드러운 글로우 (네온 느낌)
const TEXT_OUTLINE = {
  textShadow:
    "0 0 6px rgba(0,0,0,0.55), 0 0 14px rgba(0,0,0,0.45), 0 0 22px rgba(0,0,0,0.35)",
};

export default function Home() {
  return (
    <main
      className="min-h-screen relative overflow-hidden flex flex-col"
      style={{
        backgroundImage: `url('${BASE_PATH}/background.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >

      <div className="relative w-full max-w-[760px] mx-auto px-4 pt-10 pb-8 sm:pt-14 sm:pb-12 flex-1 flex flex-col">
        {/* 헤더 — 마크와 타이틀 가로 배치, 중앙 정렬 */}
        <header className="flex flex-col items-center text-center">
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${BASE_PATH}/specialist-mark.png`}
              alt="피부과 전문의"
              className="w-11 h-11 sm:w-14 sm:h-14 drop-shadow-[0_4px_10px_rgba(197,48,48,0.2)]"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${BASE_PATH}/lunn-logo.png`}
              alt="LUNN"
              className="h-16 sm:h-20 w-auto -translate-y-1 sm:-translate-y-1.5"
            />
          </div>
          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-3">
            <span className="block w-10 sm:w-14 h-px bg-white/40" />
            <p
              className="text-white text-base sm:text-lg tracking-tight font-medium"
              style={TEXT_OUTLINE}
            >
              시술 후 주의사항
            </p>
            <span className="block w-10 sm:w-14 h-px bg-white/40" />
          </div>
        </header>

        {/* 헤더와 그리드 사이 빈 공간 — 그리드를 중간 위치로 */}
        <div className="flex-1 min-h-[20px] sm:min-h-[40px]" />

        {/* 시술 그리드 — 표 형식, 바깥 테두리 없음 (셀 사이만 hairline) */}
        <div className="grid grid-cols-2">
          {treatments.map((t, idx) => {
            const { main, sub } = splitName(t.name);
            const isRightCol = idx % 2 === 1;
            const isFirstRow = idx < 2;
            return (
              <Link
                key={t.slug}
                href={`/${t.slug}/`}
                className={`group relative flex flex-col items-center justify-center text-center px-3 py-6 sm:px-5 sm:py-8 min-h-[88px] sm:min-h-[110px] hover:bg-white/[0.06] active:bg-white/[0.10] transition-colors ${
                  !isRightCol ? "border-r border-white/25" : ""
                } ${!isFirstRow ? "border-t border-white/25" : ""}`}
              >
                <span
                  className="text-white text-[15px] sm:text-lg font-bold leading-[1.25]"
                  style={{ wordBreak: "keep-all", ...TEXT_OUTLINE }}
                >
                  {main}
                </span>
                {sub ? (
                  <span
                    className="text-white text-[11px] sm:text-[12px] leading-[1.4] mt-1 font-medium"
                    style={{
                      wordBreak: "keep-all",
                      textShadow:
                        "0 0 5px rgba(0,0,0,0.7), 0 0 12px rgba(0,0,0,0.55), 0 0 20px rgba(0,0,0,0.4)",
                    }}
                  >
                    {sub}
                  </span>
                ) : null}
              </Link>
            );
          })}

          {/* LUNN 심볼 — 마지막 칸 */}
          <div className="relative flex items-center justify-center px-3 py-6 sm:px-5 sm:py-8 min-h-[88px] sm:min-h-[110px] border-t border-white/25">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${BASE_PATH}/lunn-symbol.png`}
              alt="LUNN"
              className="h-16 sm:h-24 w-auto"
            />
          </div>
        </div>

        {/* 그리드 아래 여백 — 그리드를 화면 중간 정도로 띄움 */}
        <div className="flex-1 min-h-[20px] sm:min-h-[40px]" />
      </div>
    </main>
  );
}
