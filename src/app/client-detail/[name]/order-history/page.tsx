"use client";
import React, {useState} from 'react';
import OrderHistoryTable from "@/components/OrderHistoryTable";
import HistoryTemplate from "@/components/header/HistoryTemplate";

const OrderHistoryPage = () => {
  const [selectedOrder, setSelectedOrder] = useState({
    id: 0,
    date: "",
    total: "0",
    balance: "0",
  });

  return (
    <>
      <main className="site-content">
        <div className="container">
          <div className="main-wrapper">
            <div className="history">
              {/* 주문 테이블에서 선택한 주문 데이터를 저장 */}
              <OrderHistoryTable onSelectOrder={setSelectedOrder}/>
              {/* 선택된 주문 정보 전달 */}
              <HistoryTemplate selectedOrder={selectedOrder}/>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default OrderHistoryPage;
