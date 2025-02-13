'use client';
import Link from "next/link";

interface HeaderDetailProps {
  clientName: string;
}

const HeaderDetail = ({clientName}: HeaderDetailProps) => {
  return (
    <header>
      <div className="container">
        <div className="header_wrapper">
          <h2><span>
            <img src="/images/mango.png" alt="과일"/>
          </span>{clientName}</h2>

          <div className="btn-area">
            <Link href="/" passHref>
              <button className="default">홈</button>
            </Link>
            <Link href="/" passHref>
              <button className="default navy">거래처 내역 보기</button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderDetail;
