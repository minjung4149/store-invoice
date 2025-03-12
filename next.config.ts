import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // React의 Strict Mode 활성화 (디버깅 도움)
  output: undefined, //  `standalone` 설정이 있으면 비활성화
};

export default nextConfig;