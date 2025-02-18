'use client';
import {useParams} from 'next/navigation';
import HeaderDetail from "@/components/header/HeaderDetail";

export default function ClientDetailLayout({children}: { children: React.ReactNode }) {
  const params = useParams();

  // params.name이 배열일 가능성 고려 + URL 디코딩 적용
  const clientName = params.name
    ? decodeURIComponent(Array.isArray(params.name) ? params.name[0] : params.name).replace(/-/g, ' ')
    : '';

  return (
    <>
      <HeaderDetail clientName={clientName}/>
      <main>{children}</main>
    </>
  );
}
