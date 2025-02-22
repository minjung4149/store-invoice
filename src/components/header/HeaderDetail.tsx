'use client';
import Link from "next/link";
import {usePathname} from "next/navigation";

interface HeaderDetailProps {
  clientName: string;
}

const HeaderDetail = ({clientName}: HeaderDetailProps) => {
  const pathname = usePathname();
  // 공백을 하이픈(-)으로 변환
  const formattedClientName = clientName.replace(/\s+/g, '-');
  const isOrderHistoryPage = pathname.includes("/order-history");

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
            {clientName && (
              <Link
                href={isOrderHistoryPage ? `/client-detail/${formattedClientName}` : `/client-detail/${formattedClientName}/order-history`}
                passHref
              >
                <button className="default primary">
                  {isOrderHistoryPage ? "계산서 작성" : "거래 내역 보기"}
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderDetail;
