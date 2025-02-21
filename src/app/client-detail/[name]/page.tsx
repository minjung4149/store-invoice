"use client";
import {useParams} from "next/navigation";
import {useState, useEffect} from "react";
import HeaderDetail from "@/components/header/HeaderDetail";
import ClientInputForm from "@/components/clientDetail/ClientInputForm";
import InvoiceTemplate from "@/components/clientDetail/InvoiceTemplate";
import {getLatestInvoiceByClientId} from "@/utils/api";

interface InvoiceItem {
  name: string;
  quantity: string;
  price: string;
  total: string;
}

interface InvoiceData {
  invoiceNumber: string;
  year: string;
  month: string;
  day: string;
  items: InvoiceItem[];
  payment: string;
  note: string;
}

const ClientDetailPage = () => {
  const currentYear = new Date().getFullYear().toString();
  const params = useParams();
  const clientName = decodeURIComponent((params.name as string) || "").replace(/-/g, " ");
  const [invoiceNumber, setInvoiceNumber] = useState(clientName + "-"); // 변경된 코드

  // getLatestInvoiceByClientId 함수로 최신 invoiceId를 가져온다.
  // 최신 invoiceId에 +1 하여 invoiceNumber로 설정한다.
  // getLatestInvoiceByClientId 받아오는 함수
  const getInvoiceId = async (clientId: number) => {
    try {
      const data = await getLatestInvoiceByClientId(clientId);
      console.log("latestInvoiceId", data.latestInvoice.id);
    } catch (error) {
      console.error(`Failed to fetch latest invoice ID for client with ID ${clientId}:`, error);
      throw error;
    }
  }

  // 영수증 페이지로 이동 시 Client ID를 받아와야 한다
  getInvoiceId(1);

  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    invoiceNumber: "",
    year: currentYear,
    month: "",
    day: "",
    items: [],
    payment: "",
    note: "",
  });

  const [isUpdated, setIsUpdated] = useState(false); // 추가된 상태

  return (
    <>
      <HeaderDetail clientName={clientName}/>
      <main className="site-content">
        <div className="container">
          <div className="main-wrapper">
            <div className="layout-half" id="invoice">
              <div className="input-group">
                <ClientInputForm
                  invoiceData={invoiceData}
                  setInvoiceData={setInvoiceData}
                  setIsUpdated={setIsUpdated}
                />
              </div>
              <div className="viewer-group">
                <InvoiceTemplate
                  invoiceData={invoiceData}
                  clientName={clientName}
                  isUpdated={isUpdated}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ClientDetailPage;
