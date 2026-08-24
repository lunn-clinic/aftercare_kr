import type { Metadata } from "next";
import "./globals.css";

const IS_DRAFT = process.env.NEXT_PUBLIC_DRAFT_BANNER === "true";

export const metadata: Metadata = {
  metadataBase: new URL("https://lunn-aftercare.local"),
  title: {
    default: "시술 후 주의사항 | 룬피부과의원",
    template: "%s | 룬피부과의원",
  },
  description:
    "룬피부과의원 환자분을 위한 시술 후 주의사항 안내. 시술별 회복·관리 포인트를 한 곳에서 확인하세요.",
  ...(IS_DRAFT && { robots: { index: false, follow: false } }),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className="h-full">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@300;400;500&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,300;0,400;1,300;1,400&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-text-primary">
        {IS_DRAFT ? (
          <div
            className="sticky top-0 z-50 w-full text-center text-[12px] font-semibold leading-none py-2 px-3"
            style={{ backgroundColor: "#D71D20", color: "#ffffff" }}
          >
            검수용 초안입니다 · 내용 수정 진행 중 (원내 확인용)
          </div>
        ) : null}
        {children}
      </body>
    </html>
  );
}
