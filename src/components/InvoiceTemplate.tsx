"use client";
import React from "react";


interface InvoiceItem {
  name: string;
  quantity: string;
  price: string;
  total: string;
}

interface InvoiceData {
  year: string;
  month: string;
  day: string;
  items: InvoiceItem[];
  payment: string;
  note: string;
}

interface InvoiceTemplateProps {
  invoiceData: InvoiceData;
  clientName: string;
}

const InvoiceTemplate = ({invoiceData, clientName}: InvoiceTemplateProps) => {

  return (
    <div className="invoice">
      {/* 계산서 제목 */}
      <div className="invoice-title">
        <h2>計 算 書</h2>
        <h3>대구중앙청과(주) 지정 중도매인 20번</h3>
      </div>

      <div className="invoice-header">
        {/* 좌측: 업체 정보 */}
        <div className="header-left">
          <p className="store"><strong>{clientName}</strong> <span>貴下</span></p>
          <div className="invoice-date">
            <p>
              西紀 {invoiceData.year}년{" "}
              {invoiceData.month.padStart(2, "0")}월{" "}
              {invoiceData.day.padStart(2, "0")}일
            </p>
            <p>下記와 如히 計算함</p>
          </div>
        </div>


        {/* 우측: 판매자 정보 */}
        <div className="header-right">
          <p className="spacing"><strong>중앙영농 (주)</strong></p>
          <p className="spacing">서영민</p>
          <p>대구광역시 북구 매천로18길 34</p>
          <p><strong>전화:</strong> (053) 311-4149</p>
          <p><strong>휴대폰:</strong> 010-8596-4149</p>
          <p><strong>휴대폰:</strong> 010-3532-4149</p>
        </div>
      </div>

      <hr className="divider"/>

      {/* 품목 테이블 */}
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

      {/* ✅ 거래 요약 */}
      <div className="invoice-summary">
        <p><span>소계:</span> <span className="summary-value">원</span></p>
        <hr className="divider"/>
        <p><span>전잔금:</span> <span className="summary-value">원</span></p>
        <hr className="divider"/>
        <p><span>합계:</span> <span className="summary-value"> 원</span></p>
        <hr className="divider"/>
        <p><span>입금:</span> <span className="summary-value">{invoiceData.payment.toLocaleString()} 원</span></p>
        <hr className="divider"/>
        <p><span>잔액:</span> <span className="summary-value"> 원</span></p>
        <hr className="divider"/>
        <p><span>비고:</span> <span className="summary-value">{invoiceData.note ? invoiceData.note : "-"}</span></p>
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
