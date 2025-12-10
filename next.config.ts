import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // 기존 설정
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // 기존 설정 (나중을 대비한 것)
      {
        protocol: "https",
        hostname: "supa.gl",
      },
      // ✅ [추가됨] 현재 오류가 발생하는 Supabase 프로젝트 주소
      {
        protocol: "https",
        hostname: "mbldqbzucgynrlhutfda.supabase.co",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb", // 기본값 1MB -> 50MB로 대폭 상향
    },
  },
};

export default nextConfig;
