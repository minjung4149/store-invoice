import React from 'react';

// 거래처 데이터 (잔금 기준 내림차순 정렬)
const balanceData = [
  {id: 1, store: "나이스 마트", date: "2025-02-10 (토)", balance: 500000},
  {id: 2, store: "굿스토어", date: "2025-02-08 (목)", balance: 300000},
  {id: 3, store: "행복 슈퍼", date: "2025-02-07 (수)", balance: 0},
  {id: 4, store: "웰빙 마트", date: "2025-02-06 (화)", balance: 100000},
  {id: 5, store: "스마일 편의점", date: "2025-02-05 (월)", balance: 0},
  {id: 6, store: "나이스 마트", date: "2025-02-10 (토)", balance: 500000},
  {id: 7, store: "굿스토어", date: "2025-02-08 (목)", balance: 300000},
  {id: 8, store: "행복 슈퍼", date: "2025-02-07 (수)", balance: 0},
  {id: 9, store: "웰빙 마트", date: "2025-02-06 (화)", balance: 100000},
  {id: 10, store: "스마일 편의점", date: "2025-02-05 (월)", balance: 0},
  {id: 11, store: "나이스 마트", date: "2025-02-10 (토)", balance: 500000},
  {id: 12, store: "굿스토어", date: "2025-02-08 (목)", balance: 300000},
  {id: 13, store: "행복 슈퍼", date: "2025-02-07 (수)", balance: 0},
  {id: 14, store: "웰빙 마트", date: "2025-02-06 (화)", balance: 100000},
  {id: 15, store: "스마일 편의점", date: "2025-02-05 (월)", balance: 0},
].sort((a, b) => b.balance - a.balance); // 잔금 기준 내림차순 정렬

const BalanceTable = () => {
  return (
    <div className="table-container">
      {/* 주문 내역 테이블 */}
      <table className="balance-table">
        <thead>
        <tr>
          <th>No</th>
          <th>최근 거래 날짜</th>
          <th>거래처 명</th>
          <th>잔금</th>
        </tr>
        </thead>
        <tbody>
        {balanceData.map(({id, store, date, balance}) => (
          <tr key={id}>
            <td className="id">{id}</td>
            <td className="date">{date}</td>
            <td className="store">{store}</td>
            {/* 잔금이 0보다 크면 'balance-positive' 클래스 추가 */}
            <td className={`balance ${balance > 0 ? "balance-positive" : ""}`}>
              {balance.toLocaleString()}
            </td>
          </tr>
        ))}
        </tbody>
      </table>

      {/* 스크롤 감지를 위한 div */}
      <div className="observer-trigger"></div>
    </div>
  );
};

export default BalanceTable;
