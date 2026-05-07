import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageBanner from "@/components/PageBanner";
import {
  categoryNames,
  getTreatment,
  treatments,
} from "@/data/treatments";

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

  return (
    <>
      <PageBanner
        title={t.name}
        subtitle="시술 후 주의사항"
        breadcrumb={[
          { label: "Aftercare Notes", href: "/" },
          { label: t.name },
        ]}
      />

      {/* 안내 인트로 */}
      <section className="bg-[#EFECE8]">
        <div className="max-w-[860px] mx-auto px-6 py-16 lg:py-20 text-center">
          <p className="text-accent-gold text-[10px] tracking-[0.4em] font-bold mb-4">
            {categoryNames[t.category]}
          </p>
          <div className="w-10 h-px bg-accent-gold mx-auto mb-6" />
          <h2
            className="text-primary-navy text-2xl lg:text-3xl leading-[1.4]"
            style={{ fontFamily: '"Noto Serif KR", serif', fontWeight: 400 }}
          >
            {t.name} 시술 후 안내드리는 주의사항입니다
          </h2>
          <p className="text-text-muted text-xs mt-5 tracking-[0.15em]">
            For Our Patients · 명함 QR 전용 페이지
          </p>
        </div>
      </section>

      {/* 주의사항 번호 매김 */}
      <section className="bg-white">
        <div className="max-w-[860px] mx-auto px-6 py-20 lg:py-28">
          <ol className="space-y-5 lg:space-y-6">
            {t.notes.map((note, idx) => (
              <li
                key={idx}
                className="flex items-start gap-4 lg:gap-5 rounded-2xl border border-border-light bg-bg-warm p-6 lg:p-8"
              >
                <span
                  className="flex-shrink-0 inline-flex items-center justify-center w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-primary-navy text-white text-sm lg:text-base font-bold"
                >
                  {idx + 1}
                </span>
                <p className="text-text-primary text-[15px] lg:text-base leading-[1.85] flex-1 min-w-0">
                  {note}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 하단 안내 */}
      <section className="bg-white">
        <div className="max-w-[720px] mx-auto px-6 py-16 text-center">
          <div className="h-px w-16 bg-accent-gold/30 mx-auto mb-8" />
          <p className="text-text-muted text-xs leading-[1.85] italic">
            본 안내는 룬피부과의원에서 시술받으신 환자분의 회복을 돕기 위한 일반 안내입니다. 의료 상담이 필요하신 경우 반드시 내원하여 박형권 원장의 진료를 받으세요.
          </p>
        </div>
      </section>
    </>
  );
}
