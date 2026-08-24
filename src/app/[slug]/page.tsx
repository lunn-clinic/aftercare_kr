import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getTreatment,
  splitName,
  treatments,
} from "@/data/treatments";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

const NAVY = "#00394e";
const NUMBER_COLOR = "#7C9CA7";
const NOTE_TEXT_COLOR = "#E3E3E3";

// 시안 .text-wrapper-3 — 부제 5-stop 그라데이션
const SUBTITLE_GRAD: React.CSSProperties = {
  background:
    "linear-gradient(121deg, rgba(215,215,215,1) 0%, rgba(227,227,227,1) 62%, rgba(255,255,255,1) 75%, rgba(227,227,227,1) 88%, rgba(215,215,215,1) 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
  color: "transparent",
};

const DIAMOND_COLOR = "#A2C5D2";

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

// 시안 .line + .group-4: 351×1px 가로선 + 좌우 끝 3×3 흰 동그라미
function NoteDivider() {
  return (
    <div className="relative w-full h-[5px] my-0">
      <div
        aria-hidden="true"
        className="absolute top-1/2 -translate-y-1/2 left-0 right-0"
        style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.25)" }}
      />
      <span
        aria-hidden="true"
        className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/2 rounded-full"
        style={{ width: "3px", height: "3px", backgroundColor: "#FFFFFF" }}
      />
      <span
        aria-hidden="true"
        className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2 rounded-full"
        style={{ width: "3px", height: "3px", backgroundColor: "#FFFFFF" }}
      />
    </div>
  );
}

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

  const { main } = splitName(t.name);

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

      <div className="relative w-full max-w-[402px] mx-auto px-6 pt-[88px] pb-12 flex-1 flex flex-col">
        {/* 좌측 상단 — 전체 시술로 돌아가기 */}
        <Link
          href="/"
          className="absolute top-4 left-4 sm:top-6 sm:left-6 inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium transition-colors text-white/70 hover:text-white z-10"
        >
          <span className="text-base">←</span>
          전체 시술
        </Link>

        {/* 헤더 — 시안 .div (피부과 전문의 + LUNN) */}
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

          {/* 부제 — 시안 group-2/group-3 (다이아몬드 + dash) + text-wrapper-3 */}
          <div className="flex items-center justify-center mt-[26px]">
            <DashWithDiamond side="left" />
            <p
              className="text-[19px] font-semibold leading-[22.3px] whitespace-nowrap mx-[5px]"
              style={{ letterSpacing: "-0.57px", ...SUBTITLE_GRAD }}
            >
              시술 후 주의사항
            </p>
            <DashWithDiamond side="right" />
          </div>

          {/* 시술명 흰 알약 — 시안 .frame-2: 흰색 배경, 네이비 텍스트 */}
          <div
            className="inline-flex items-center justify-center mt-[34px] px-5 py-[3px] rounded-[3px]"
            style={{ backgroundColor: "#ffffff" }}
          >
            <span
              className="text-[14px] font-semibold leading-[19.1px] whitespace-nowrap"
              style={{
                letterSpacing: "-0.42px",
                color: NAVY,
                fontWeight: 600,
              }}
            >
              {main}
            </span>
          </div>
        </header>

        {/* 시안 .frame-3: 노트목록 + 푸터 라인 + 푸터 텍스트, gap-30 외부 간격 */}
        <div className="mt-[30px] w-full flex flex-col items-center gap-[30px]">
          {t.intro ? (
            <p
              className="w-full text-center text-[13px] font-medium leading-[19.1px]"
              style={{
                letterSpacing: "-0.39px",
                wordBreak: "keep-all",
                color: "rgba(227,227,227,0.85)",
              }}
            >
              {t.intro}
            </p>
          ) : null}
          {/* 노트 목록 — 각 항목 사이 30px 고정 gap (보톡스 기준 동일 리듬) */}
          <div className="w-full flex flex-col items-stretch gap-[30px]">
            {t.notes.map((note, idx) => {
              const text = typeof note === "string" ? note : note.text;
              const caution = typeof note === "string" ? null : note.caution;
              return (
                <div key={idx} className="contents">
                  <div className="flex items-start gap-[9px]">
                    <span
                      aria-hidden="true"
                      className="flex-shrink-0"
                      style={{
                        fontFamily:
                          '"Newsreader", "Noto Serif KR", Georgia, serif',
                        fontWeight: 300,
                        fontStyle: "italic",
                        fontSize: "25px",
                        lineHeight: "35px",
                        letterSpacing: "-1.75px",
                        color: NUMBER_COLOR,
                      }}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1 pt-[8px]">
                      <p
                        className="text-[14px] font-medium leading-[19.1px]"
                        style={{
                          letterSpacing: "-0.42px",
                          wordBreak: "keep-all",
                          color: NOTE_TEXT_COLOR,
                        }}
                      >
                        {text}
                      </p>
                      {caution ? (
                        <div
                          className="mt-[10px] rounded-[4px] px-3 py-2.5"
                          style={{
                            backgroundColor: "rgba(255,255,255,0.06)",
                            border: "0.5px solid rgba(162,197,210,0.55)",
                          }}
                        >
                          <p
                            className="text-[13px] font-semibold leading-[18px]"
                            style={{
                              letterSpacing: "-0.39px",
                              wordBreak: "keep-all",
                              color: "#A2C5D2",
                            }}
                          >
                            ※ 주의
                          </p>
                          <p
                            className="mt-[3px] text-[13px] font-medium leading-[18px]"
                            style={{
                              letterSpacing: "-0.39px",
                              wordBreak: "keep-all",
                              color: NOTE_TEXT_COLOR,
                            }}
                          >
                            {caution}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  {idx < t.notes.length - 1 ? <NoteDivider /> : null}
                </div>
              );
            })}
          </div>

        {/* 푸터 — 짧은 hairline + 안내문 (frame-3 children, gap-30 적용됨) */}
        <div className="flex flex-col items-center text-center">
          <span
            aria-hidden="true"
            className="block"
            style={{
              width: "40px",
              height: "1px",
              backgroundColor: NUMBER_COLOR,
            }}
          />
          <p
            className="mt-4 text-[10px] font-medium leading-[15px]"
            style={{ letterSpacing: "-0.3px", color: NUMBER_COLOR }}
          >
            본 안내는 룬피부과의원에서 시술받으신 환자분의 회복을 돕기 위한 일반 안내입니다.
            <br className="hidden sm:inline" />
            의료 상담이 필요하신 경우 반드시 내원하여 진료 받으시길 권장드립니다.
          </p>
        </div>
        </div>
      </div>
    </main>
  );
}
