import React from "react";
import '@/styles/style.scss';

export default function RootLayout({children}: { children: React.ReactNode }) {
  console.log("✅ [layout.tsx] RootLayout 실행됨");
  return (
    <html lang="ko">
    <head>
      {/*<title>중앙청과 20번 계산서</title>*/}
      <title>계산서</title>
      <meta name="robots" content="noindex"/>
      <meta name="keywords"
            content="계산서, 영수증, 거래처관리"/>
      <meta name="description"
            content="거래처 관리 및 계산서 페이지입니다."/>
    </head>
    <body className="site">
    {children}
    </body>
    </html>
  );
}
