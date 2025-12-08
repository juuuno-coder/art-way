// src/app/media/page.tsx
import { supabase } from "@/lib/supabase"; // DB 연결 도구
import Link from "next/link";
import { ExternalLink, Youtube } from "lucide-react";

// 페이지에 들어올 때마다 최신 데이터를 가져오도록 설정 (캐시 방지)
export const dynamic = "force-dynamic";

export default async function MediaPage() {
  // 1. Supabase DB에서 데이터 가져오기 (created_at 최신순 정렬)
  const { data: pressReleases } = await supabase
    .from("media_releases")
    .select("*")
    .order("created_at", { ascending: false });

  // 데이터가 없을 경우 빈 배열로 처리
  const items = pressReleases || [];

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-12 space-y-24">
      {/* 섹션 1: Press Release (DB 데이터 연동됨) */}
      <section>
        <div className="flex justify-between items-end mb-8 border-b border-black pb-4">
          <h2 className="text-3xl font-serif">Press Release</h2>
        </div>

        <ul className="space-y-0">
          {items.length > 0 ? (
            items.map((item) => (
              <li
                key={item.id}
                className="group border-b border-gray-100 py-6 hover:bg-gray-50 transition-colors"
              >
                <Link
                  href={`/media/${item.id}`}
                  className="flex flex-col md:flex-row md:items-center justify-between gap-2"
                >
                  <div>
                    <span className="text-xs text-blue-600 font-bold mb-1 block">
                      {item.press_name || "NEWS"} {/* DB 컬럼명: press_name */}
                    </span>
                    <h3 className="text-lg md:text-xl font-medium group-hover:underline decoration-1 underline-offset-4">
                      {item.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm shrink-0">
                    {/* 날짜 형식 변환 (2024-02-14) */}
                    <span>
                      {new Date(item.created_at).toLocaleDateString()}
                    </span>
                    <ExternalLink size={14} />
                  </div>
                </Link>
              </li>
            ))
          ) : (
            <li className="py-10 text-center text-gray-400">
              등록된 보도자료가 없습니다.
            </li>
          )}
        </ul>
      </section>

      {/* 섹션 2: 인스타그램 피드 (기존 유지) */}
      {/* import InstagramFeed from "@/components/InstagramFeed" 가 상단에 있어야 함 */}
      <section>
        <h2 className="text-3xl font-serif mb-8 border-b border-black pb-4">
          Instagram
        </h2>
        {/* 기존에 만드신 컴포넌트 사용 */}
        {/* <InstagramFeed />  <-- 주석 해제하여 사용하세요 */}
        <div className="bg-gray-50 h-64 flex items-center justify-center text-gray-400">
          인스타그램 피드 영역 (InstagramFeed 컴포넌트)
        </div>
      </section>
    </div>
  );
}
