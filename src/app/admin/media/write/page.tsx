"use client";

import { useState } from "react";
import { createMedia } from "@/actions/mediaActions";
import dynamicImport from "next/dynamic";
import { Button } from "@/components/ui/button";

// Editor를 동적으로 import (SSR 방지)
const Editor = dynamicImport(() => import("@/components/Editor"), {
    ssr: false,
    loading: () => <div className="min-h-[200px] border rounded-md p-4 flex items-center justify-center text-gray-400">에디터 로딩 중...</div>
});

// 정적 생성 방지 (클라이언트 전용 컴포넌트)
export const dynamic = "force-dynamic";

export default function AdminMediaWrite() {
    const [contentHtml, setContentHtml] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        setIsLoading(true);
        await createMedia(formData);
    };

    return (
        <div className="max-w-3xl mx-auto py-20 px-6 animate-fade-in-up">
            <h1 className="text-3xl font-serif font-bold mb-10 border-b pb-4">
                보도자료 등록
            </h1>

            <form action={handleSubmit} className="space-y-8">
                {/* 1. 기본 정보 */}
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <label className="block text-sm font-bold mb-2">언론사명 *</label>
                        <input
                            name="press_name"
                            type="text"
                            placeholder="예: 부산일보"
                            className="w-full border-b border-gray-300 p-2 focus:outline-none focus:border-black transition"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2">기사 제목 *</label>
                        <input
                            name="title"
                            type="text"
                            className="w-full border-b border-gray-300 p-2 focus:outline-none focus:border-black transition"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2">원문 링크 *</label>
                        <input
                            name="link_url"
                            type="url"
                            placeholder="https://..."
                            className="w-full border-b border-gray-300 p-2 focus:outline-none focus:border-black transition"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2">기사 작성일</label>
                        <input
                            name="published_date"
                            type="date"
                            className="w-full border-b border-gray-300 p-2 focus:outline-none focus:border-black transition"
                        />
                        <p className="text-xs text-gray-500 mt-1">기사가 작성된 날짜를 선택하세요. 입력하지 않으면 등록일이 표시됩니다.</p>
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2">대표 이미지</label>
                        <input
                            name="image"
                            type="file"
                            accept="image/*"
                            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-black transition"
                        />
                        <p className="text-xs text-gray-500 mt-1">선택사항: 보도자료 대표 이미지</p>
                    </div>
                </div>

                {/* 2. 요약 내용 (Editor) - 선택사항이지만 에디터 사용 */}
                <div>
                    <label className="block text-sm font-bold mb-2">
                        요약/발췌 내용
                    </label>
                    <div className="min-h-[200px] border rounded-md p-1">
                        <Editor onChange={(html: string) => setContentHtml(html)} />
                    </div>
                    <input type="hidden" name="content" value={contentHtml} />
                </div>

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-black text-white py-6 text-lg font-bold hover:bg-gray-800 transition"
                >
                    {isLoading ? "업로드 중..." : "등록하기"}
                </Button>
            </form>
        </div>
    );
}
