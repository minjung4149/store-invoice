import type {NextConfig} from "next";
import fs from "fs";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ["tsx", "ts"], // ✅ Next.js가 `error.tsx`를 감지하도록 확장자 지정
  experimental: {}, // ✅ Next.js의 실험적 기능 비활성화하여 오류 방지
  webpack: (config, {isServer}) => {
    if (isServer) {
      console.log("✅ 서버 빌드 중: _error.js 자동 삭제 설정");
      config.plugins.push({
        apply: (compiler: any) => {
          compiler.hooks.done.tap("RemoveErrorJS", () => {
            const errorPath = ".next/server/pages/_error.js";
            if (fs.existsSync(errorPath)) {
              console.log("🚨 _error.js 삭제 중...");
              fs.rmSync(errorPath, {force: true});
            }
          });
        },
      });
    }
    return config;
  },
};

export default nextConfig;
