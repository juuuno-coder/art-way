// src/app/archive/page.tsx
import { supabase } from "@/lib/supabase"; // 데이터 조회용 (공용)
import { createServerClient } from "@supabase/ssr"; // 인증 체크용 (서버)
import { cookies } from "next/headers";
import Link from "next/link";
import { Plus } from "lucide-react";
import ArchiveClient from "@/components/ArchiveClient";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function ArchivePage() {
  // 1. 전시 데이터 가져오기 (DB)
  const { data: exhibitions } = await supabase
    .from("exhibitions")
    .select("*")
    .order("start_date", { ascending: false });

  // 2. 관리자 로그인 여부 확인 (서버 사이드)
  const cookieStore = await cookies();
  const supabaseServer = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll() {}, // 읽기 전용이라 setAll은 비워둠
      },
    }
  );

  const {
    data: { user },
  } = await supabaseServer.auth.getUser();
  const isAdmin = !!user; // 유저가 있으면 true (관리자)

  return (
    <div className="max-w-screen-2xl mx-auto px-6 mt-8 py-12 md:py-20 relative">
      <div className="flex justify-between items-end mb-12 border-b border-black pb-4">
        <h2 className="font-serif text-2xl md:text-3xl">Exhibition Archive</h2>

        {/* 3. 관리자에게만 보이는 등록 버튼 */}
        {isAdmin && (
          <Button
            asChild
            className="bg-black text-white hover:bg-gray-800 gap-2"
          >
            <Link href="/admin/exhibition">
              <Plus size={16} /> 전시 등록 및 관리
            </Link>
          </Button>
        )}
      </div>

      {/* 4. 기존 모달 스타일 유지 */}
      <ArchiveClient initialData={exhibitions || []} />
    </div>
  );
}
