import Link from "next/link";
import { treatments } from "@/data/treatments";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-warm flex items-start justify-center px-4 py-6 sm:py-10">
      <div className="w-full max-w-[640px] bg-white rounded-2xl border border-border-light shadow-[0_4px_24px_rgba(22,55,75,0.04)] p-5 sm:p-8">
        {/* 헤더 — 피부과 전문의 마크 + 병원명 */}
        <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-3">
          <div
            className="flex-shrink-0 inline-flex flex-col items-center justify-center bg-[#C53030] text-white rounded-md leading-[1.1] font-extrabold tracking-tight px-2.5 py-2 sm:px-3 sm:py-2.5 text-[11px] sm:text-[13px]"
          >
            <span>피부과</span>
            <span>전문의</span>
          </div>
          <h1
            className="text-text-secondary text-2xl sm:text-4xl font-bold tracking-tight"
            style={{ fontFamily: '"Noto Serif KR", serif', fontWeight: 400 }}
          >
            LUNN 피부과
          </h1>
        </div>

        <h2 className="text-text-muted text-base sm:text-xl font-medium tracking-tight mb-5 sm:mb-7 pl-[60px] sm:pl-[76px]">
          시술 후 주의사항
        </h2>

        {/* 시술 그리드 — 2열 고정, 모바일에서도 2열 유지 */}
        <div className="grid grid-cols-2 border-t border-l border-border-light">
          {treatments.map((t) => (
            <Link
              key={t.slug}
              href={`/${t.slug}/`}
              className="group flex items-center justify-center text-center border-b border-r border-border-light px-2 py-5 sm:px-4 sm:py-7 min-h-[80px] sm:min-h-[100px] transition-colors hover:bg-primary-navy/[0.03] active:bg-primary-navy/[0.06]"
            >
              <span
                className="text-text-primary text-[13px] sm:text-base leading-[1.45] font-medium break-keep"
                style={{ wordBreak: "keep-all" }}
              >
                {t.name}
              </span>
            </Link>
          ))}

          {/* 마지막 칸 — 병원 안내/CTA 자리 */}
          <div className="flex flex-col items-center justify-center text-center border-b border-r border-border-light px-2 py-5 sm:px-4 sm:py-7 min-h-[80px] sm:min-h-[100px] bg-primary-navy/[0.02]">
            <p className="text-text-muted text-[10px] sm:text-xs tracking-[0.2em] font-bold mb-1">
              FOR OUR PATIENTS
            </p>
            <p className="text-text-secondary text-[12px] sm:text-sm leading-tight">
              박형권 원장
              <br />
              진료 안내
            </p>
          </div>
        </div>

        {/* 하단 안내 */}
        <p className="text-text-muted text-[10px] sm:text-xs leading-relaxed text-center mt-4 sm:mt-6">
          시술별 상세 안내를 보시려면 항목을 선택해 주세요
        </p>
      </div>
    </main>
  );
}
