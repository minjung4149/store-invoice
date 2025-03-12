import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ["tsx", "ts"], // ✅ Next.js가 `error.tsx`를 감지하도록 확장자 지정
  experimental: {}, // ✅ Next.js의 실험적 기능을 비활성화하여 오류 방지
};

export default nextConfig;
