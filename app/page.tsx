// src/app/page.tsx

// 1. Supabase 클라이언트와 데이터베이스 타입 정의를 가져옵니다.
import { supabase } from "@/lib/supabase";

// 2. 이 컴포넌트를 서버에서 실행하도록 지정합니다. (Next.js 핵심 기능!)
// 서버에서 데이터를 가져와서 HTML을 미리 만들게 됩니다.
export const dynamic = "force-dynamic";

// 3. 페이지 컴포넌트 (비동기 함수로 정의)
export default async function Home() {
  // ==========================================================
  // 4. 데이터베이스에서 데이터 가져오기 (Model 역할)
  // .from('guide_posts')는 Supabase에서 만든 테이블 이름입니다.
  const { data: guidePosts, error } = await supabase
    .from("guide_posts")
    .select("id, title, desc, tag") // 필요한 컬럼만 선택
    .order("id", { ascending: true }); // ID 순서로 정렬

  // 데이터베이스 연결에 문제가 생겼을 경우 (옵션)
  if (error) {
    console.error("Supabase Error:", error);
    return (
      <div className="p-10 text-center text-red-500">
        데이터를 불러오는 중 오류가 발생했습니다. 콘솔을 확인하세요.
      </div>
    );
  }
  // ==========================================================

  // 5. 화면 렌더링 (View 역할)
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-20">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">
        Next.js 아키텍처 가이드 (Supabase Ver.)
      </h1>
      <p className="text-gray-500 mb-12">JS와 React로 만드는 웹의 구조</p>

      <div className="grid gap-6 w-full max-w-2xl px-4">
        {/* guidePosts 데이터가 없으면 빈 배열([])을 사용하여 오류 방지 */}
        {(guidePosts || []).map((item) => (
          <div
            key={item.id}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold text-gray-800">{item.title}</h2>
              <span className="bg-blue-100 text-blue-600 text-xs font-bold px-2 py-1 rounded">
                {item.tag}
              </span>
            </div>
            <p className="text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
