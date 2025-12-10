// src/app/media/page.tsx

import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import SocialConnect from "@/components/SocialConnect"; // 👈 여기 바뀜!

export const dynamic = "force-dynamic";

export default async function MediaPage() {
  const { data: pressReleases } = await supabase
    .from("media_releases")
    .select("*")
    .order("created_at", { ascending: false });

  const items = pressReleases || [];

  return (
    <div className="max-w-screen-xl mx-auto px-6 mt-8 py-12 space-y-24">
      
      {/* 섹션 1: Press Release */}
      <section>
        <div className="flex justify-between items-end mb-8 border-b border-black pb-4">
          <h2 className="text-3xl font-serif">Press Release</h2>
        </div>

        <ul className="space-y-0">
          {items.length > 0 ? (
            items.map((item) => (
              <li key={item.id} className="group border-b border-gray-100 py-6 transition-colors">
                <Link href={`/media/${item.id}`} className="flex flex-col md:flex-row gap-6 group">
                  {/* 1. 썸네일 이미지 (왼쪽) */}
                  {item.image_url && (
                    <div className="w-full md:w-48 aspect-video shrink-0 overflow-hidden rounded-md bg-gray-100">
                      <img 
                        src={item.image_url} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}

                  {/* 2. 텍스트 정보 (오른쪽) */}
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs text-blue-600 font-bold">
                          {item.press_name || "NEWS"}
                        </span>
                        {/* 날짜 표시: 기사게시일 우선 */}
                        <div className="flex items-center gap-1 text-gray-400 text-sm shrink-0">
                          <span>
                            {item.published_date 
                              ? new Date(item.published_date).toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" })
                              : new Date(item.created_at).toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" })}
                          </span>
                        </div>
                      </div>
                      
                      <h3 className="text-lg md:text-xl font-medium leading-snug group-hover:underline decoration-1 underline-offset-4 mb-3">
                        {item.title}
                      </h3>
                      
                      {/* 간단한 미리보기 텍스트 (옵션) */}
                      {/* <p className="text-gray-500 text-sm line-clamp-2">...</p> */}
                    </div>
                    
                    <div className="flex items-center text-xs text-gray-400 mt-2">
                      <ExternalLink size={12} className="mr-1" /> 자세히 보기
                    </div>
                  </div>
                </Link>
              </li>
            ))
          ) : (
            <li className="py-10 text-center text-gray-400">등록된 보도자료가 없습니다.</li>
          )}
        </ul>
      </section>

      {/* 섹션 2: Social Connect (수정됨) */}
      <section>
        {/* 타이틀 변경: Instagram -> Connect */}
        <h2 className="text-3xl font-serif mb-10 border-b border-black pb-4">
          Connect
        </h2>
        
        {/* 통합 소셜 배너 컴포넌트 */}
        <div className="py-8">
          <SocialConnect />
        </div>
      </section>

    </div>
  );
}