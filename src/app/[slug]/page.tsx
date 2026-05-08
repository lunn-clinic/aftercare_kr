import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getTreatment,
  splitName,
  treatments,
} from "@/data/treatments";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

const NAVY = "#253749";

export function generateStaticParams() {
  return treatments.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = getTreatment(slug);
  if (!t) return { title: "주의사항" };
  return {
    title: `${t.name} 시술 후 주의사항`,
  };
}

export default async function TreatmentDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = getTreatment(slug);
  if (!t) notFound();

  const { main, sub } = splitName(t.name);

  return (
    <main
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url('${BASE_PATH}/background-detail.png?v=2')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        color: NAVY,
      }}
    >
      <div className="relative w-full max-w-[720px] mx-auto px-4 pt-10 pb-10 sm:pt-14 sm:pb-14">
        {/* 좌측 상단 — 전체 시술로 돌아가기 (절대 배치, 헤더 위치에 영향 X) */}
        <Link
          href="/"
          className="absolute top-4 left-4 sm:top-6 sm:left-6 inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium transition-colors hover:opacity-80 z-10"
          style={{ color: `${NAVY}cc` }}
        >
          <span className="text-base">←</span>
          전체 시술
        </Link>

        {/* 헤더 — 1페이지와 동일 (마크 + LUNN 네이비 로고 + 시술 후 주의사항) */}
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
              src={`${BASE_PATH}/lunn-logo-navy.png?v=2`}
              alt="LUNN"
              className="h-16 sm:h-20 w-auto -translate-y-1 sm:-translate-y-1.5"
            />
          </div>
          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-3">
            <span className="block w-10 sm:w-14 h-px" style={{ backgroundColor: `${NAVY}66` }} />
            <p className="text-base sm:text-lg tracking-tight font-medium" style={{ color: NAVY }}>
              시술 후 주의사항
            </p>
            <span className="block w-10 sm:w-14 h-px" style={{ backgroundColor: `${NAVY}66` }} />
          </div>

          {/* 시술명 — 1페이지 그리드와 동일한 폰트/스타일 */}
          <div className="mt-7 sm:mt-9">
            <p
              className="text-[1.5rem] sm:text-[1.875rem] font-bold tracking-tight leading-[1.25]"
              style={{ wordBreak: "keep-all", color: NAVY }}
            >
              {main}
            </p>
            {sub ? (
              <p
                className="text-sm sm:text-base font-medium mt-1.5"
                style={{ wordBreak: "keep-all", color: `${NAVY}cc` }}
              >
                {sub}
              </p>
            ) : null}
          </div>
        </header>

        {/* 주의사항 — 표 형식 (헤어라인만, 박스 없음) */}
        <ol className="mt-8 sm:mt-10">
          {t.notes.map((note, idx) => (
            <li
              key={idx}
              className="relative flex items-start gap-4 sm:gap-5 px-2 py-4 sm:px-3 sm:py-5"
              style={
                idx > 0
                  ? { borderTop: `1px solid ${NAVY}33` }
                  : undefined
              }
            >
              <span
                className="flex-shrink-0 text-[18px] sm:text-[22px] leading-none italic tracking-[0.04em] pt-[2px] sm:pt-[3px]"
                style={{
                  fontFamily: '"Noto Serif KR", serif',
                  fontWeight: 400,
                  color: `${NAVY}b3`,
                }}
                aria-hidden="true"
              >
                {String(idx + 1).padStart(2, "0")}
              </span>
              <p
                className="text-[13px] sm:text-[15px] leading-[1.7] flex-1 min-w-0 font-semibold"
                style={{ wordBreak: "keep-all", color: NAVY }}
              >
                {note}
              </p>
            </li>
          ))}
        </ol>

        {/* 하단 안내 + 뒤로가기 */}
        <div className="text-center mt-10 sm:mt-12">
          <div className="h-px w-12 mx-auto mb-5" style={{ backgroundColor: `${NAVY}55` }} />
          <p className="text-[11px] sm:text-xs leading-[1.85] italic px-4" style={{ color: `${NAVY}b3` }}>
            본 안내는 룬피부과의원에서 시술받으신 환자분의 회복을 돕기 위한 일반 안내입니다.
            <br className="hidden sm:inline" />
            의료 상담이 필요하신 경우 반드시 내원하여 진료 받으시길 권장드립니다.
          </p>
        </div>
      </div>
    </main>
  );
}
