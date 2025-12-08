// src/app/page.tsx

import { supabase } from "@/lib/supabase";
import MainSlider from "@/components/MainSlider";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { data: exhibitions } = await supabase
    .from("exhibitions")
    .select("*")
    .eq("is_main_slider", true) 
    .order("created_at", { ascending: false });

  const { data: bannerData } = await supabase
    .from("main_banner")
    .select("youtube_url")
    .limit(1)
    .single(); // 여기서 에러나면 .maybeSingle()로 변경

  const slides = exhibitions || [];
  
  // 유튜브 ID 추출
  const getYoutubeId = (url: string | null) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const youtubeId = getYoutubeId(bannerData?.youtube_url);

  return (
    // Header가 fixed이므로 -mt-16 필요 없음, 대신 배경을 꽉 채우기 위해 relative
    <div className="relative w-full h-screen overflow-hidden bg-black">
      
      {/* 📺 배경 유튜브 영상 */}
      {youtubeId ? (
        <div className="absolute inset-0 z-0">
          <iframe
            className="w-full h-full scale-[1.35]" // scale을 키워서 레터박스 제거
            // 👇 파라미터 수정됨: origin, mute, loop, playlist 필수
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${youtubeId}&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&origin=${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}`}
            allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
            style={{ pointerEvents: 'none' }} // 사용자가 영상 클릭 못하게 막음
          />
          {/* 영상 위 어두운 오버레이 */}
          <div className="absolute inset-0 bg-black/50" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gray-900 z-0" />
      )}

      {/* 🖼️ 슬라이더 컨텐츠 (헤더 높이만큼 패딩) */}
      <div className="relative z-10 h-full w-full pt-16">
         {slides.length > 0 ? (
            <MainSlider exhibitions={slides} />
         ) : (
            <div className="h-full flex items-center justify-center text-white/50">
              <p>준비 중입니다.</p>
            </div>
         )}
      </div>
    </div>
  );
}