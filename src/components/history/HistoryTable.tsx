"use client";
import React, {useState, useEffect, useRef} from "react";

interface OrderData {
  id: number;
  date: string;
  total: string;
  balance: string;
}

interface HistoryTableProps {
  onSelectOrder: (order: OrderData) => void; // 선택된 주문을 부모 컴포넌트로 전달
}

// getInvoicesByClientId 함수를 사용하여 해당 거래처의 주문 내역을 가져옴
const HistoryTable: React.FC<HistoryTableProps> = ({onSelectOrder}) => {
  const data: OrderData[] = [
    {id: 3, date: "2025-02-10 (수)", total: "150000", balance: "30000"},
    {id: 2, date: "2025-02-10 (목)", total: "150000", balance: "30000"},
    {id: 1, date: "2025-02-10 (토)", total: "150000", balance: "30000"},
  ];

  const itemsPerPage = 10;
  // 현재 화면에 표시할 데이터 상태
  const [visibleData, setVisibleData] = useState(data.slice(0, itemsPerPage));

  // 현재까지 로드된 항목 개수
  const [loadedItems, setLoadedItems] = useState(itemsPerPage);

  // Intersection Observer를 사용할 요소 참조
  const observerRef = useRef<HTMLDivElement | null>(null);

  // 기본 선택된 주문 (가장 최근 데이터)
  const [selectedOrder, setSelectedOrder] = useState<OrderData>(data[0]);

  useEffect(() => {
    // Intersection Observer 인스턴스 생성
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];

        // 화면에 감지된 요소가 보이고, 아직 로드되지 않은 데이터가 남아있다면 추가 로드
        if (target.isIntersecting && loadedItems < data.length) {
          setTimeout(() => {
            setVisibleData(data.slice(0, loadedItems + itemsPerPage));  // 기존 데이터 + 추가 로드
            setLoadedItems((prev) => prev + itemsPerPage); // 로드된 개수 업데이트
          }, 500);
        }
      },
      {threshold: 1.0}
    );

    // observer가 감지할 요소를 설정
    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      // 컴포넌트 언마운트 시 observer 해제
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [loadedItems, data.length]);  // loadedItems, data.length 변경 시 다시 실행

  const handleRowClick = (order: OrderData) => {
    setSelectedOrder(order);
    onSelectOrder(order); // 부모 컴포넌트에 선택된 데이터 전달
  };

  return (
    <div className="table-container">
      {/* 주문 내역 테이블 */}
      <table className="order-table">
        <thead>
        <tr>
          <th>No</th>
          <th>구매 날짜</th>
          <th>합계 금액</th>
          <th>잔금</th>
          <th>상세</th>
        </tr>
        </thead>
        <tbody>
        {visibleData.map((order) => (
          <tr
            key={order.id}
            className={selectedOrder.id === order.id ? "selected-row" : ""}
            onClick={() => handleRowClick(order)}
          >
            <td className="id">{order.id}</td>
            <td className="date">{order.date}</td>
            <td className="total">{parseInt(order.total, 10).toLocaleString()}</td>
            <td className="balance">{parseInt(order.balance, 10).toLocaleString()}</td>
            <td>
              <button className="detail-button">수정 하기</button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>

      {/* 스크롤 감지를 위한 div */}
      <div ref={observerRef} className="observer-trigger"></div>
    </div>
  );
};

export default HistoryTable;
