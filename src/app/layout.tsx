import React from "react";
import '@/styles/style.scss';

export default function RootLayout({children}: { children: React.ReactNode }) {

  return (
    <html lang="ko">
    <head>
      <title>중앙청과 20번 계산서</title>
      <meta name="robots" content="noindex"/>
      <meta name="keywords"
            content=""/>
      <meta name="description"
            content=""/>
    </head>
    <body>
    {children}
    </body>
    </html>
  );
}
