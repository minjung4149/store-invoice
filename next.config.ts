import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // ✅ React Strict Mode 활성화
  experimental: {}, // ✅ Next.js의 실험적 기능 비활성화하여 빌드 오류 방지
  pageExtensions: ["tsx", "ts"], // ✅ Next.js가 `error.tsx`를 감지하도록 확장자 지정
  onDemandEntries: {
    maxInactiveAge: 60 * 1000, // ✅ 오래된 페이지를 빠르게 삭제하도록 설정
  },
  generateBuildId: async () => {
    return "custom-build-id"; // ✅ Next.js의 캐시를 완전히 초기화하는 역할
  },
};

export default nextConfig;
