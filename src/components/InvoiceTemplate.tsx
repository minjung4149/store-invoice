"use client";
import {useState} from "react";

interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

interface InvoiceData {
  buyerStoreName: string;
  buyer: string;
  seller: string;
  date: string;
  address: string;
  phone: string;
  mobile1: string;
  mobile2: string;
  items: InvoiceItem[];
  subtotal: number;
  previousBalance: number;
  total: number;
  payment: number;
  remainingBalance: number;
}


const InvoiceTemplate = () => {
  const [invoiceData] = useState<InvoiceData>({
    buyerStoreName: "대구중앙청과(주) 지정 중도매인 20번",
    buyer: "중앙영농 (주)",
    seller: "서영민",
    date: "2025년 7월 8일",
    address: "대구광역시 북구 매천로18길 34",
    phone: "(053) 311-4149",
    mobile1: "010-8596-4149",
    mobile2: "010-3532-4149",
    items: [
      {name: "사과", quantity: 26, price: 8000, total: 368000},
      {name: "망고", quantity: 18, price: 120000, total: 378000},
      {name: "천혜향", quantity: 5, price: 24000, total: 15000},
      {name: "사과", quantity: 2, price: 8000, total: 1640000},
    ],
    subtotal: 5038600,
    previousBalance: 21869000,
    total: 26907500,
    payment: 26907500,
    remainingBalance: 26907500,
  });

  return (
    <div className="invoice">
      {/* 계산서 제목 */}
      <div className="invoice-title">
        <h2>計 算 書</h2>
        <h3>{invoiceData.buyerStoreName}</h3>
      </div>
      {/* 업체 정보 & 거래처명 */}
      <div className="invoice-header">

        {/* 좌측: 업체 정보 */}
        <div className="header-left">
          <p className="store"><strong>나이스 마트</strong> <span>貴下</span></p>
          <div className="invoice-date">
            <p>西紀 {invoiceData.date}</p>
            <p>下記와 如히 計算함</p>
          </div>
        </div>


        {/* 우측: 판매자 정보 */}
        <div className="header-right">
          <p className="spacing"><strong>{invoiceData.buyer}</strong></p>
          <p className="spacing">{invoiceData.seller}</p>
          <p>{invoiceData.address}</p>
          <p><strong>전화:</strong> {invoiceData.phone}</p>
          <p><strong>휴대폰:</strong> {invoiceData.mobile1}</p>
          <p><strong>휴대폰:</strong> {invoiceData.mobile2}</p>
        </div>
      </div>


      {/* ✅ 구분선 */}
      <hr className="divider"/>

      {/* ✅ 품목 테이블 */}
      <table className="invoice-table">
        <thead>
        <tr>
          <th className="no">No.</th>
          <th className="name">품명</th>
          <th className="quantity">수량</th>
          <th className="price">단가</th>
          <th className="total">금액</th>
        </tr>
        </thead>
        <tbody>
        {invoiceData.items.map((item, index) => (
          <tr key={index}>
            <td className="no">{index + 1}</td>
            <td className="name">{item.name}</td>
            <td className="quantity">{item.quantity}</td>
            <td className="price">{item.price ? item.price.toLocaleString() : "-"}</td>
            <td className="total">{item.total ? item.total.toLocaleString() : "-"}</td>
          </tr>
        ))}
        </tbody>
      </table>

      {/* 구분선 */}
      <hr className="divider"/>

      {/* 거래 요약 */}
      <div className="invoice-summary">
        <p><span>소계:</span> {invoiceData.subtotal.toLocaleString()} 원</p>
        <p><span>전잔금:</span> {invoiceData.previousBalance.toLocaleString()} 원</p>
        <p><span>합계:</span> {invoiceData.total.toLocaleString()} 원</p>
        <p><span>입금:</span> {invoiceData.payment.toLocaleString()} 원</p>
        <p><span>잔액:</span> {invoiceData.remainingBalance.toLocaleString()} 원</p>
      </div>

      {/* 구분선 */}
      <hr className="divider"/>

      {/* 푸터 */}
      <div className="invoice-footer">
        <p>농협: 317-0003-6690-11 중앙영농(주)</p>
      </div>
    </div>
  );
};

export default InvoiceTemplate;
