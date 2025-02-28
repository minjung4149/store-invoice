"use client";
import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck, faPrint} from "@fortawesome/free-solid-svg-icons";
import {createInvoice} from "@/utils/api";
import { useSearchParams } from "next/navigation";


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
  isUpdated: boolean;
}

const InvoiceTemplate = ({invoiceData, clientName, isUpdated}: InvoiceTemplateProps) => {
  // 확인 여부 상태 (제출 후 true)
  const [isConfirmed, setIsConfirmed] = useState(false);

  // 소계 계산 (각 품목의 total 값을 숫자로 변환 후 합산)
  const subtotal = invoiceData.items.reduce((sum, item) => {
    return sum + (parseInt(item.total.replace(/,/g, ""), 10) || 0);
  }, 0);

  // 전잔금 (기본값 0, 추후 DB에서 받아올 예정)
  // getLatestInvoiceByClientId() 함수로 최신 Invoice 정보를 가져온다.
  // Invoice 정보에 balance가 있으면 previousBalance로 설정한다.
  const previousBalance = 0;

  // 합계 (소계 + 전잔금)
  const totalAmount = subtotal + previousBalance;

  // 잔액 (합계 - 입금)
  const balance =
    totalAmount - (parseInt(invoiceData.payment.replace(/,/g, ""), 10) || 0);

  // 서버로 데이터 전송

  const handleConfirm = async () => {
    if (!isUpdated) {
      alert("먼저 반영하기 버튼을 눌러주세요.");
      return;
    }


    setIsConfirmed(true);
    alert("확정 처리되었습니다.");
  };

  return (
    <>
      <div className="invoice">
        <div className="action-buttons">
          <button
            className={isConfirmed ? "active" : "inactive"}
            onClick={handleConfirm}
          >
            <FontAwesomeIcon icon={faCircleCheck} className="icon"/>
            확정하기
          </button>
        </div>

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

        {/* 거래 요약 */}
        <div className="invoice-summary">
          <p>
            <span>소계:</span>
            <span className="summary-value">{subtotal.toLocaleString()} 원</span>
          </p>
          <hr className="divider"/>
          <p>
            {/* Client의 balance */}
            <span>전잔금:</span>
            <span className="summary-value">{previousBalance.toLocaleString()} 원</span>
          </p>
          <hr className="divider"/>
          <p>
            <span>합계:</span>
            <span className="summary-value">{totalAmount.toLocaleString()} 원</span>
          </p>
          <hr className="divider"/>
          <p>
            <span>입금:</span>
            <span className="summary-value">
            {invoiceData.payment
              ? parseInt(invoiceData.payment.replace(/,/g, ""), 10).toLocaleString()
              : "0"}{" "}
              원
          </span>
          </p>
          <hr className="divider"/>
          <p>
            <span>잔금:</span>
            <span className="summary-value">{balance.toLocaleString()} 원</span>
          </p>
          <hr className="divider"/>
          <p>
            <span>비고:</span>
            <span className="summary-value">
            {invoiceData.note ? invoiceData.note : "-"}
          </span>
          </p>
        </div>

        {/* 구분선 */
        }
        <hr className="divider"/>

        {/* 푸터 */
        }
        <div className="invoice-footer">
          <p>농협: 317-0003-6690-11 중앙영농(주)</p>
        </div>
      </div>
      <button className="print-btn">
        <FontAwesomeIcon icon={faPrint} className="icon"/>
        인쇄하기
      </button>
    </>
  )
};

export default InvoiceTemplate;
