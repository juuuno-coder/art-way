import { supabase } from "@/lib/supabase";
// 🚨 주의: MainSlider가 있는 경로를 확인하세요. 
// 스크린샷 기준으로는 "@/components/ui/MainSlider" 가 맞습니다.
import MainSlider from "@/components/MainSlider"; 

// 데이터가 계속 바뀌므로 캐싱하지 않음 (새로고침 시 즉시 반영)
export const dynamic = "force-dynamic";

export default async function HomePage() {
  console.log("--------------- [메인 페이지 로드 시작] ---------------");

  // 1. 메인 슬라이더용 전시 데이터 가져오기
  // (테이블에 is_main_slider 컬럼이 없으면 에러가 날 수 있으니 꼭 추가해주세요!)
  const { data: exhibitions, error: exError } = await supabase
    .from("exhibitions")
    .select("*")
    .eq("is_main_slider", true) 
    .order("created_at", { ascending: false });

  if (exError) console.error("❌ 전시 데이터 에러:", exError.message);
  else console.log(`✅ 전시 데이터: ${exhibitions?.length}개 로드됨`);


  // 2. 배경 유튜브 URL 가져오기
  const { data: bannerData, error: bnError } = await supabase
    .from("main_banner")
    .select("youtube_url")
    .eq("is_active", true) // 활성화된 것만
    .limit(1)
    .maybeSingle(); // 데이터가 없어도 에러내지 않고 null 반환

  if (bnError) console.error("❌ 배너 데이터 에러:", bnError.message);
  console.log("✅ 배너 데이터:", bannerData);


  // 3. 데이터 가공
  const slides = exhibitions || [];

  // 유튜브 ID 추출 함수 (URL에서 ID만 쏙 빼냄)
  const getYoutubeId = (url: string | null | undefined) => {
    if (!url) return null;
    // 다양한 유튜브 URL 패턴 대응 정규식
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const youtubeId = getYoutubeId(bannerData?.youtube_url);
  console.log("🎥 추출된 유튜브 ID:", youtubeId);


  return (
    // relative: 자식 요소들의 기준점
    // h-screen: 화면 꽉 채움
    // overflow-hidden: 영상이 튀어나가는 것 방지
    // bg-black: 영상 로딩 전 깜빡임 방지용 검은 배경
    <div className="relative w-full h-screen overflow-hidden bg-black">
      
      {/* =========================================
          📺 [1] 배경 레이어 (유튜브 영상)
      ========================================= */}
      {youtubeId ? (
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* iframe wrapper: 화면 비율 유지 및 확대를 위해 필요 */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
             <iframe
              className="absolute top-1/2 left-1/2 w-[177.77vh] h-[56.25vw] min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 scale-[1.3]"
              // 유튜브 파라미터 설명:
              // autoplay=1: 자동재생
              // mute=1: 소리끔 (브라우저 정책상 필수)
              // controls=0: 재생바 숨김
              // loop=1 & playlist={ID}: 무한 반복
              // playsinline=1: 모바일에서 전체화면 안 되게
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${youtubeId}&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&origin=http://localhost:3000`}
              allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
              style={{ pointerEvents: "none" }} // 클릭 방지
            />
          </div>
          
          {/* 영상 위를 덮는 반투명 검은막 (글씨 잘 보이게) */}
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ) : (
        // 영상 데이터가 없을 때 보여줄 기본 배경
        <div className="absolute inset-0 bg-gray-900 z-0 flex items-center justify-center">
           {/* 배경 이미지가 있다면 여기에 <Image fill ... /> 사용 */}
           <span className="text-gray-800 text-9xl font-bold opacity-20">ARTWAY</span>
        </div>
      )}


      {/* =========================================
          🖼️ [2] 컨텐츠 레이어 (슬라이더)
          헤더(fixed)가 위에 있으므로 pt-16 등으로 여백을 줄 필요가 있을 수 있으나
          MainSlider 내부 디자인에 따라 flex로 중앙 정렬함
      ========================================= */}
      <div className="relative z-10 h-full w-full pt-16">
        {slides.length > 0 ? (
          <MainSlider exhibitions={slides} />
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-white/40 gap-4">
            <p className="text-lg font-light tracking-widest">EXHIBITION PREPARING</p>
            <p className="text-xs">현재 진행 중인 전시가 준비 중입니다.</p>
          </div>
        )}
      </div>

    </div>
  );
}