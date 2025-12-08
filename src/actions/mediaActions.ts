// src/actions/mediaActions.ts
"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createMedia(formData: FormData) {
  const title = formData.get("title") as string;
  const press_name = formData.get("press_name") as string;
  const link_url = formData.get("link_url") as string;
  const content = formData.get("content") as string;
  const imageFile = formData.get("image") as File;

  if (!title || !link_url) return;

  let image_url = null;

  // 이미지가 있으면 Supabase Storage에 업로드
  if (imageFile && imageFile.size > 0) {
    // 파일명에서 확장자 추출
    const fileExt = imageFile.name.split('.').pop();
    // 안전한 파일명 생성 (한글 제거, 타임스탬프 사용)
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("media_images")
      .upload(fileName, imageFile);

    if (uploadError) {
      console.error("Image upload error:", uploadError);
    } else {
      const { data: urlData } = supabase.storage
        .from("media_images")
        .getPublicUrl(fileName);
      image_url = urlData.publicUrl;
    }
  }

  const { error } = await supabase.from("media_releases").insert({
    title,
    press_name,
    link_url,
    content,
    image_url,
  });

  if (error) {
    console.error("Error creating media:", error);
    throw new Error("글 작성 실패");
  }

  revalidatePath("/media");
  revalidatePath("/admin/media");
  redirect("/admin/media");
}

export async function deleteMedia(id: string) {
  const { error } = await supabase.from("media_releases").delete().eq("id", id);

  if (error) {
    throw new Error("보도자료 삭제 실패");
  }

  revalidatePath("/admin/media");
  revalidatePath("/media");
}
