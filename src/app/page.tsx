import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import { getCategorized, treatments } from "@/data/treatments";

export default function Home() {
  const categorized = getCategorized();
  const totalCount = treatments.length;

  return (
    <>
      <PageBanner
        title="시술 후 주의사항"
        breadcrumb={[{ label: "Aftercare Notes" }]}
      />

      {/* 인트로 */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[860px] mx-auto px-6 text-center">
          <p className="text-[10px] tracking-[0.4em] font-bold mb-5 text-primary-navy">
            AFTERCARE · NOTES
          </p>
          <div className="w-10 h-px mx-auto mb-8 bg-primary-navy" />
          <h2 className="text-primary-navy text-3xl lg:text-4xl font-extrabold leading-tight mb-6 whitespace-pre-line">
            받으신 시술별 주의사항을{"\n"}한 곳에서 확인하세요
          </h2>
          <p className="text-text-secondary text-[15px] leading-[1.9]">
            {totalCount}개 시술
          </p>

          <div className="flex flex-wrap justify-center gap-2 mt-10">
            {categorized.map((c) => (
              <a
                key={c.key}
                href={`#cat-${c.key}`}
                className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border-light text-primary-navy text-xs font-semibold hover:border-primary-navy transition-all"
              >
                <span className="w-2 h-2 rounded-full bg-primary-navy" />
                {c.name}
                <span className="text-text-muted">{c.items.length}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 카테고리별 그룹 */}
      <section className="pb-16 lg:pb-24 bg-bg-warm">
        <div className="max-w-[1140px] mx-auto px-6 py-16 lg:py-24 space-y-20 lg:space-y-28">
          {categorized.map((cat, catIdx) => (
            <div key={cat.key} id={`cat-${cat.key}`} className="scroll-mt-24">
              <div className="flex items-end justify-between gap-6 mb-8 flex-wrap">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-[0.25em] text-white bg-primary-navy">
                      {String(catIdx + 1).padStart(2, "0")} · CATEGORY
                    </span>
                    <span className="text-text-muted text-xs">
                      {cat.items.length}개 시술
                    </span>
                  </div>
                  <h3 className="text-2xl lg:text-[2rem] font-extrabold leading-tight mb-2 text-primary-navy">
                    {cat.name}
                  </h3>
                </div>
                <div className="h-px flex-1 mb-4 bg-primary-navy/20" />
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-6 lg:p-8 rounded-3xl bg-primary-navy/[0.03]">
                {cat.items.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/${t.slug}/`}
                    className="block h-full"
                  >
                    <div
                      className="relative h-full bg-white rounded-2xl border-l-[3px] border border-border-light p-6 lg:p-7 transition-all hover:shadow-[0_10px_40px_rgba(22,55,75,0.08)] hover:-translate-y-0.5"
                      style={{ borderLeftColor: "#16374B" }}
                    >
                      <p
                        className="text-[10px] tracking-[0.25em] font-bold mb-3"
                        style={{ color: "#16374B" }}
                      >
                        AFTERCARE
                      </p>
                      <h4 className="text-primary-navy text-xl font-extrabold mb-2.5 leading-tight">
                        {t.name}
                      </h4>
                      <p className="text-text-secondary text-[13px] leading-relaxed mb-5">
                        주의사항 {t.notes.length}건
                      </p>
                      <p className="text-xs font-semibold tracking-wide" style={{ color: "#16374B" }}>
                        주의사항 보기 →
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
