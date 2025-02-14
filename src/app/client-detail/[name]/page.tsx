"use client";
import {useParams} from "next/navigation";
import {useState} from "react";
import HeaderDetail from "@/components/header/HeaderDetail";
import ClientInputForm from "@/components/ClientInputForm";
import InvoiceTemplate from "@/components/InvoiceTemplate";

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


  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    invoiceNumber: "",
    year: currentYear,
    month: "",
    day: "",
    items: [],
    payment: "",
    note: "",
  });

  return (
    <>
      <HeaderDetail clientName={clientName}/>
      <main className="site-content">
        <div className="container">
          <div className="main-wrapper">
            <div className="layout-half" id="invoice">
              <div className="input-group">
                <ClientInputForm invoiceData={invoiceData} setInvoiceData={setInvoiceData}/>
              </div>
              <div className="viewer-group">
                <InvoiceTemplate invoiceData={invoiceData} clientName={clientName}/>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ClientDetailPage;
