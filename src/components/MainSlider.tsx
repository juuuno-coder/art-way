"use client";

import { useState } from "react";
// import Image from "next/image"; // 사용하지 않음
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function MainSlider({ exhibitions, fallbackYoutubeUrl }: { exhibitions: any[], fallbackYoutubeUrl?: string | null }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? exhibitions.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === exhibitions.length - 1 ? 0 : prev + 1));
  };

  const current = exhibitions[currentIndex];

  // 유튜브 ID 추출
  const getYoutubeId = (url: string | null | undefined) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const currentYoutubeId = getYoutubeId(current.youtube_url || fallbackYoutubeUrl);

  return (
    <div className="relative w-full h-full flex items-center justify-center block-select-none">
      
      {/* 📺 [배경 레이어] 슬라이드별 동적 배경 */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        {currentYoutubeId ? (
          <div className="absolute inset-0 w-full h-full">
            <iframe
              key={currentYoutubeId} // ID가 바뀌면 새로 렌더링
              className="absolute top-1/2 left-1/2 w-[177.77vh] h-[56.25vw] min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 scale-[1.3] pointer-events-none"
              src={`https://www.youtube.com/embed/${currentYoutubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${currentYoutubeId}&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&origin=http://localhost:3000`}
              allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
            />
            {/* 반투명 오버레이 */}
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ) : (
          // 영상 없음: 심플한 그라디언트나 텍스트 배경
           <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
               <span className="text-white/10 text-9xl font-bold select-none">ARTWAY</span>
           </div>
        )}
      </div>

      {/* 🧭 [네비게이션 버튼] */}
      <button onClick={prevSlide} className="absolute left-4 md:left-10 z-20 text-white/50 hover:text-white transition">
        <ChevronLeft size={40} strokeWidth={1} />
      </button>
      <button onClick={nextSlide} className="absolute right-4 md:right-10 z-20 text-white/50 hover:text-white transition">
        <ChevronRight size={40} strokeWidth={1} />
      </button>

      {/* 📝 [컨텐츠 영역] */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl px-6 animate-fade-in">
        
        {/* 1. 포스터 이미지 (Next/Image 대신 img 태그 사용으로 호환성 개선) */}
        {current.poster_url && (
          <div className="relative w-[200px] h-[280px] md:w-[300px] md:h-[400px] mb-8">
            <img
              src={current.poster_url}
              alt={current.title}
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>
        )}

        {/* 텍스트 정보 */}
        <p className="text-sm md:text-base text-gray-200 font-medium tracking-widest mb-2">
          {current.artist}
        </p>
        <h2 className="text-3xl md:text-5xl font-serif text-white font-bold mb-6 drop-shadow-md">
          {current.title}
        </h2>

        {/* 2. 설명글 */}
        <div 
          className="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl line-clamp-3 mb-8 prose prose-invert prose-p:my-0"
          dangerouslySetInnerHTML={{ __html: current.description || "" }}
        />

        {/* 자세히 보기 버튼 */}
        <Link href={`/archive`}>
           <button className="border border-white/30 text-white px-8 py-3 text-xs tracking-[0.2em] hover:bg-white hover:text-black transition uppercase">
             View Exhibition
           </button>
        </Link>
      </div>
    </div>
  );
}