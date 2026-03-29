import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "아가골드 공식몰 | 베트남 직수입 프리미엄 침향오일",
  description:
    "단 1방울, 몸이 먼저 알아보는 진짜 침향. 베트남 직수입 프리미엄 아가골드 오일을 만나보세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
