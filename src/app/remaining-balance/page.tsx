import React from 'react';
import Header from "@/components/header/Header";
import BalanceTable from "@/components/balance/BalanceTable";
import HeaderHome from "@/components/header/HeaderHome";

const BalancePage = () => {
  return (
    <>
      <HeaderHome/>
      <main className="site-content">
        <div className="container">
          <div className="main-wrapper">

            <div className="balance-list">
              <BalanceTable/>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default BalancePage;
