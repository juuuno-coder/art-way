// src/app/layout.tsx

import type { Metadata } from "next";
import { Noto_Serif_KR, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header"; // 👈 새로 만든 헤더 가져오기

const serif = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-serif",
});
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Artway Gallery",
  description: "부산 동구 문화 예술 공간",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${serif.variable} ${sans.variable}`}>
      <body className="font-sans text-gray-900 bg-white selection:bg-black selection:text-white">
        
        {/* 기존 header 코드 다 지우고 이거 한 줄이면 끝! */}
        <Header />

        <main className="min-h-screen">
            {children}
        </main>

        <footer className="py-12 border-t border-gray-100 mt-20">
             {/* ...기존 footer 내용 유지... */}
             <div className="max-w-screen-2xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 text-gray-400 text-xs font-light">
            <div>
              <p className="mb-2 font-serif text-black text-sm">
                아트웨이 갤러리 ARTWAY GALLERY
              </p>
              <p>부산광역시 동구 정공단로 9</p>
              <p>T. 0507-1369-8386 | E. artway_gallery@naver.com</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}