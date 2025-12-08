// src/app/page.tsx
import { supabase } from "@/lib/supabase";
import MainSlider from "@/components/MainSlider"; // <-- 여기 수정됨 (@/src 제거)

// 데이터가 계속 바뀌므로 캐싱하지 않음
export const dynamic = "force-dynamic";

export default async function HomePage() {
  // 1. DB에서 '메인 슬라이더' 체크된 전시만 가져오기
  const { data: exhibitions } = await supabase
    .from("exhibitions")
    .select("*")
    .eq("is_main_slider", true) // 메인 노출 체크된 것만
    .order("created_at", { ascending: false });

  // 2. 만약 등록된 게 없으면 빈 배열 넘기기
  const slides = exhibitions || [];

  return (
    <div className="h-full w-full">
      {slides.length > 0 ? (
        <MainSlider exhibitions={slides} />
      ) : (
        // 데이터가 없을 때 보여줄 화면
        <div className="h-[calc(100vh-64px)] flex items-center justify-center text-gray-400">
          <p>현재 진행 중인 전시가 준비 중입니다.</p>
        </div>
      )}
    </div>
  );
}
