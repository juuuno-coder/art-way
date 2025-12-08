import type { Metadata } from "next";
import { Noto_Serif_KR, Inter } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";
import MobileMenu from "@/components/MobileMenu";

// 감성적인 세리프 폰트와 깔끔한 고딕 폰트 로드
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
        {/* 헤더: 투명 배경, 스크롤 시 블러 처리 추천 */}
        <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100/50">
          <div className="max-w-screen-2xl mx-auto px-6 h-16 flex items-center justify-between">
            {/* 로고 */}
            <Link
              href="/"
              className="hover:opacity-70 transition"
            >
              <Image
                src="/logo.png"
                alt="ARTWAY"
                width={130}
                height={40}
                className="h-8 w-auto object-contain"
                priority
              />
            </Link>

            {/* 네비게이션 */}
            <nav className="hidden md:flex gap-12 text-[16px] bg-white font-medium tracking-widest text-gray-500">
              <Link
                href="/about"
                className="hover:text-black transition-colors"
              >
                소개
              </Link>
              <Link
                href="/archive"
                className="hover:text-black transition-colors"
              >
                전시기록
              </Link>
              <Link
                href="/media"
                className="hover:text-black transition-colors"
              >
                언론보도
              </Link>
              <Link href="/mall" className="hover:text-black transition-colors">
                SHOP
              </Link>
              <Link
                href="/contact"
                className="hover:text-black transition-colors"
              >
                찾아오시는길
              </Link>
            </nav>

            {/* 모바일 메뉴 버튼 */}
            <MobileMenu />
          </div>
        </header>

        <main className="pt-16 min-h-screen">{children}</main>

        <footer className="py-12 border-t border-gray-100 mt-20">
          <div className="max-w-screen-2xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 text-gray-400 text-xs font-light">
            <div>
              <p className="mb-2 font-serif text-black text-sm">
                아트웨이 갤러리 ARTWAY GALLERY
              </p>
              <p>부산광역시 동구 정공단로 9</p>
              <p>T. 0507-1369-8386 | E. artway_gallery@naver.com</p>
            </div>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/artwaygallery_story/"
                target="_blank"
                className="hover:text-black transition"
              >
                INSTAGRAM
              </a>
              <a
                href="https://blog.naver.com/art_way_"
                target="_blank"
                className="hover:text-black transition"
              >
                BLOG
              </a>
              <a
                href="https://www.youtube.com/@artwaygallerybusan"
                target="_blank"
                className="hover:text-black transition"
              >
                YOUTUBE
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
