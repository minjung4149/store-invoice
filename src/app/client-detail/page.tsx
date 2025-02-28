"use client";
import {useState, useEffect} from "react";
import {useSearchParams} from "next/navigation";
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
  const searchParams = useSearchParams();

  // clientId가 없거나 NaN이면 기본값 1로 설정
  const clientId = Number(searchParams.get("id")) || 1;
  const clientName = searchParams.get("name") || "";

  // invoiceData 상태 정의
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    invoiceNumber: "",
    year: currentYear,
    month: "",
    day: "",
    items: [],
    payment: "",
    note: "",
  });

  const [isUpdated, setIsUpdated] = useState(false);


  /**
   * 최신 인보이스 정보 가져와서 invoiceNumber 생성
   * @param clientId - 거래처 ID
   */
  const getInvoiceId = async (clientId: number) => {
    try {
      const data = await getLatestInvoiceByClientId(clientId);
      console.log("API 응답 데이터:", data); // 디버깅용 로그

      const latestInvoice = data?.latestInvoice;

      if (!latestInvoice) {
        console.warn(`latestInvoice가 없습니다. 기본값 설정: ${clientId}-1`);
        setInvoiceData((prev) => ({...prev, invoiceNumber: `${clientId}-1`}));
        return;
      }

      // 기존 invoiceNumber가 있다면 숫자 부분을 추출 후 +1
      const latestInvoiceNumber = latestInvoice.invoiceNumber || `${clientId}-0`;
      const match = latestInvoiceNumber.match(/(\d+)$/);
      const nextInvoiceNumber = match
        ? `${clientId}-${(parseInt(match[1], 10) + 1).toString().padStart(match[1].length, "0")}`
        : `${clientId}-1`;

      setInvoiceData((prev) => ({...prev, invoiceNumber: nextInvoiceNumber}));
    } catch (error) {
      console.error(`Failed to fetch latest invoice for client ${clientId}:`, error);
      setInvoiceData((prev) => ({...prev, invoiceNumber: `${clientId}-1`}));
    }
  };

  // clientId가 변경될 때만 실행
  useEffect(() => {
    if (clientId) getInvoiceId(clientId);
  }, [clientId]);


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
