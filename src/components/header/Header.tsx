'use client';
import {useState, useCallback} from "react";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faWonSign} from "@fortawesome/free-solid-svg-icons";
import ClientRegisterModal from "@/components/main/ClientModal";
import {createClient} from '@/utils/api';

const Header = () => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  return (
    <header>
      <div className="container">
        <div className="header_wrapper">
          <Link href="/main">
            {/*<h1>중앙청과 20번</h1>*/}
            <h1>
              테스트</h1>
          </Link>
          <div className="btn-area">
            <button className="primary default" onClick={() => setIsRegisterModalOpen(true)}>
              <FontAwesomeIcon icon={faPlus} className="icon"/>
              신규 거래처 등록
            </button>
            <Link href="/remaining-balance" className="default">
              <FontAwesomeIcon icon={faWonSign} className="icon"/>
              거래처 잔금 확인
            </Link>
          </div>
        </div>
      </div>

      {/* 거래처 등록 모달 */}
      <ClientRegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onRegister={useCallback(async (client) => {
          try {
            const newClient = await createClient(client);
            console.log('Created client:', newClient);
            alert('고객이 성공적으로 추가되었습니다.');
          } catch (error) {
            console.error('고객 추가 실패:', error);
            alert('고객 추가에 실패했습니다.');
          }
        }, [])}
      />
    </header>
  );
};

export default Header;
