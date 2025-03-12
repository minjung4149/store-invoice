"use client"; // 클라이언트 컴포넌트 선언
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div style={{textAlign: "center", marginTop: "50px"}}>
      <h1> 페이지를 찾을 수 없습니다.</h1>
      <p>요청하신 페이지가 존재하지 않습니다.</p>
      <Link href="/" style={{color: "blue", textDecoration: "underline"}}>
        홈으로 이동
      </Link>
    </div>
  );
}
