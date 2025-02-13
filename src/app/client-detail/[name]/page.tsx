"use client";
import {useParams} from "next/navigation";
import HeaderDetail from "@/components/header/HeaderDetail";
import InvoiceTemplate from "@/components/InvoiceTemplate";

const ClientDetailPage = () => {
  const params = useParams();
  const clientName = decodeURIComponent((params.name as string) || "").replace(/-/g, " ");

  return (
    <>
      <HeaderDetail clientName={clientName}/>
      <main className="site-content">
        <div className="container">
          <div className="main-wrapper">
            <div className="layout-half" id="invoice">
              <div className="input-group"></div>
              <div className="viewer-group">
                <InvoiceTemplate/>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ClientDetailPage;
