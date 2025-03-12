import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // React Strict Mode 활성화 (디버깅 도움)
  experimental: {}, // 빈 객체로 설정하여 `serverActions` 오류 방지
};

export default nextConfig;
