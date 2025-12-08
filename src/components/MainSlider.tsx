"use client";
import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react"; // npm install lucide-react

export default function MainSlider({ exhibitions }: { exhibitions: any[] }) {
  const [idx, setIdx] = useState(0);
  const current = exhibitions[idx];

  const prev = () => setIdx(idx === 0 ? exhibitions.length - 1 : idx - 1);
  const next = () => setIdx(idx === exhibitions.length - 1 ? 0 : idx + 1);

  return (
    <div className="h-[calc(100vh-64px)] w-full flex flex-col items-center justify-center relative bg-[#fafafa]">
      {/* 작품 영역 (벽에 걸린 액자) */}
      <div className="relative z-10 p-8 bg-white shadow-2xl shadow-gray-200 border border-gray-100 max-w-[90vw] md:max-w-[500px] aspect-[3/4]">
        <div className="relative w-full h-full overflow-hidden">
          <Image
            src={current.image_url}
            alt={current.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-700"
            priority
          />
        </div>
      </div>

      {/* 텍스트 설명 (캡션) */}
      <div className="mt-12 text-center space-y-2 px-4 animate-fade-in-up">
        <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">
          {current.artist}
        </p>
        <h1 className="text-2xl md:text-3xl font-serif font-medium text-gray-900">
          {current.title}
        </h1>
        <p className="text-sm text-gray-500 font-light max-w-md mx-auto pt-2 leading-relaxed">
          {current.description}
        </p>
      </div>

      {/* 네비게이션 버튼 (얇고 심플하게) */}
      <button
        onClick={prev}
        className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 p-4 text-gray-300 hover:text-black transition duration-300"
      >
        <ArrowLeft strokeWidth={1} size={40} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 p-4 text-gray-300 hover:text-black transition duration-300"
      >
        <ArrowRight strokeWidth={1} size={40} />
      </button>
    </div>
  );
}
