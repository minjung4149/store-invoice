import React from "react";
import '@/styles/style.scss';
import GlobalError from "./global-error"; // error.tsx 강제 import
import NotFoundPage from "./not-found"; // not-found.tsx 강제 import

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
    {/* Next.js가 `error.tsx`를 감지하도록 강제 실행 */}
    <GlobalError error={new Error("Test Error")} reset={() => {
    }}/>
    <NotFoundPage/>
    </body>
    </html>
  );
}
