import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // ✅ React Strict Mode 활성화
  experimental: {}, // ✅ Next.js의 실험적 기능 비활성화하여 빌드 오류 방지
  pageExtensions: ["tsx", "ts"], // ✅ Next.js가 `error.tsx`를 감지하도록 확장자 지정
};

export default nextConfig;