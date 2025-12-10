import { Suspense } from "react";
import { getDashboardStats } from "@/actions/statsActions";
import Link from "next/link";
import { Users, Image as ImageIcon, Newspaper, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-serif font-bold mb-2">Dashboard</h1>
        <p className="text-gray-500">아트웨이 갤러리 관리자 현황판입니다.</p>
      </div>

      {/* 1. 통계 카드 섹션 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* 방문자 카드 */}
        <div className="bg-black text-white p-6 rounded-xl shadow-lg relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-white/60 text-sm font-medium mb-1">Today Visitors</p>
            <h3 className="text-4xl font-bold">{stats.todayVisitorCount}</h3>
            <p className="text-xs text-white/40 mt-2">
               * 세션 기준 (새로고침 제외)
            </p>
          </div>
          <Users className="absolute right-4 bottom-4 text-white/10 group-hover:scale-110 transition duration-500" size={64} />
        </div>

        {/* 전시 카드 */}
        <div className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm hover:shadow-md transition relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-gray-500 text-sm font-medium mb-1">Total Exhibitions</p>
            <h3 className="text-4xl font-bold text-gray-900">{stats.exhibitionCount}</h3>
            <Link href="/admin/exhibition" className="text-xs text-blue-600 mt-2 inline-flex items-center gap-1 hover:underline">
              관리 바로가기 <ArrowRight size={10} />
            </Link>
          </div>
          <ImageIcon className="absolute right-4 bottom-4 text-gray-100 group-hover:text-gray-200 transition duration-500" size={64} />
        </div>

        {/* 미디어 카드 */}
        <div className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm hover:shadow-md transition relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-gray-500 text-sm font-medium mb-1">Press Releases</p>
            <h3 className="text-4xl font-bold text-gray-900">{stats.mediaCount}</h3>
            <Link href="/admin/media" className="text-xs text-blue-600 mt-2 inline-flex items-center gap-1 hover:underline">
               관리 바로가기 <ArrowRight size={10} />
            </Link>
          </div>
          <Newspaper className="absolute right-4 bottom-4 text-gray-100 group-hover:text-gray-200 transition duration-500" size={64} />
        </div>
      </div>

      {/* 2. 방문자 차트 (CSS Simple Bar Chart) */}
      <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
        <h3 className="text-xl font-bold mb-8">Weekly Visitor Trend</h3>
        
        {stats.visitorStats.length > 0 ? (
          <div className="flex items-end justify-between gap-2 h-64 w-full">
            {/* 최근 14일 또는 7일 데이터만 표시 (공간 고려) */}
            {stats.visitorStats.slice(-14).map((stat) => {
              // 최대값 기준으로 높이 퍼센트 계산 (단, 0이면 1px)
              const maxVal = Math.max(...stats.visitorStats.map((s) => s.count), 10); // 최소 10 기준
              const heightPercent = Math.max((stat.count / maxVal) * 100, 5); // 최소높이 5%
              
              return (
                <div key={stat.date} className="flex flex-col items-center justify-end flex-1 gap-2 group">
                  <div className="relative w-full max-w-[40px] bg-gray-100 rounded-t-md hover:bg-blue-500 transition-colors duration-300" 
                       style={{ height: `${heightPercent}%` }}>
                    {/* 툴팁 (호버시 숫자 표시) */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      {stat.count}명
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-400 rotate-0 md:rotate-0 truncate w-full text-center">
                    {/* 날짜 포맷 MM.DD */}
                    {stat.date.substring(5).replace('-', '.')}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="h-64 flex items-center justify-center text-gray-400 bg-gray-50 rounded-lg">
             아직 집계된 방문자 데이터가 없습니다.
          </div>
        )}
      </div>

    </div>
  );
}
