"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

// 정적 생성 방지
export const dynamic = "force-dynamic";

export default function EditMediaPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);
    const [media, setMedia] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function loadMedia() {
            const { data, error } = await supabase
                .from("media_releases")
                .select("*")
                .eq("id", id)
                .single();

            if (error) {
                alert("보도자료 정보를 불러올 수 없습니다.");
                router.push("/admin/media");
                return;
            }

            setMedia(data);
            setLoading(false);
        }

        loadMedia();
    }, [id, router]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const imageFile = formData.get("image") as File;

        let image_url = media.image_url;

        // 새 이미지가 업로드된 경우
        if (imageFile && imageFile.size > 0) {
            const fileExt = imageFile.name.split('.').pop();
            const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

            const { data: uploadData, error: uploadError } = await supabase.storage
                .from("media_images")
                .upload(fileName, imageFile);

            if (uploadError) {
                alert("이미지 업로드 실패");
                setIsLoading(false);
                return;
            }

            const { data: urlData } = supabase.storage
                .from("media_images")
                .getPublicUrl(fileName);
            image_url = urlData.publicUrl;
        }

        const { error } = await supabase
            .from("media_releases")
            .update({
                press_name: formData.get("press_name") as string,
                title: formData.get("title") as string,
                link_url: formData.get("link_url") as string,
                content: formData.get("content") as string,
                image_url,
            })
            .eq("id", id);

        if (error) {
            alert("수정 실패");
            setIsLoading(false);
            return;
        }

        alert("수정 완료!");
        router.push("/admin/media");
    };

    if (loading) {
        return <div className="max-w-3xl mx-auto py-20 px-6">로딩 중...</div>;
    }

    if (!media) {
        return <div className="max-w-3xl mx-auto py-20 px-6">보도자료를 찾을 수 없습니다.</div>;
    }

    return (
        <div className="max-w-3xl mx-auto py-20 px-6 animate-fade-in-up">
            <h1 className="text-3xl font-serif font-bold mb-10 border-b pb-4">
                보도자료 수정
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-bold mb-2">언론사명 *</label>
                    <input
                        name="press_name"
                        type="text"
                        defaultValue={media.press_name}
                        className="w-full border-b border-gray-300 p-2 focus:outline-none focus:border-black transition"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2">기사 제목 *</label>
                    <input
                        name="title"
                        type="text"
                        defaultValue={media.title}
                        className="w-full border-b border-gray-300 p-2 focus:outline-none focus:border-black transition"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2">원문 링크 *</label>
                    <input
                        name="link_url"
                        type="url"
                        defaultValue={media.link_url}
                        className="w-full border-b border-gray-300 p-2 focus:outline-none focus:border-black transition"
                        placeholder="https://..."
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2">내용</label>
                    <textarea
                        name="content"
                        defaultValue={media.content || ""}
                        rows={6}
                        className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-black transition"
                        placeholder="보도자료 내용 (선택사항)"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2">대표 이미지</label>
                    {media.image_url && (
                        <div className="mb-4">
                            <p className="text-sm text-gray-500 mb-2">현재 이미지:</p>
                            <img src={media.image_url} alt="현재 이미지" className="w-48 h-auto rounded" />
                        </div>
                    )}
                    <input
                        name="image"
                        type="file"
                        accept="image/*"
                        className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-black transition"
                    />
                    <p className="text-xs text-gray-500 mt-1">새 이미지를 선택하지 않으면 기존 이미지가 유지됩니다.</p>
                </div>

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-black text-white py-6 text-lg font-bold hover:bg-gray-800 transition"
                >
                    {isLoading ? "수정 중..." : "수정 완료"}
                </Button>
            </form>
        </div>
    );
}
