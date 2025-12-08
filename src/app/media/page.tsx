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
                <Link href={`/media/${item.id}`} className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs text-blue-600 font-bold mb-1 block">
                      {item.press_name || "NEWS"}
                    </span>
                    <h3 className="text-lg md:text-xl font-medium group-hover:underline decoration-1 underline-offset-4">
                      {item.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm shrink-0">
                    <span>{new Date(item.created_at).toLocaleDateString()}</span>
                    <ExternalLink size={14} />
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