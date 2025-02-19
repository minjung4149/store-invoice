"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import ClientRegisterModal from "@/components/main/ClientModal";
import { updateClient, updateFavorite } from '@/utils/api';


// 공통 타입 정의
interface Client {
  id: number | null;
  name: string;
  phone: string;
  note?: string;
  isFavorite: boolean;
}

const initialClients: Client[] = [
  {id:1, name: "ABC마트", phone: "010-1234-5678", note: "VIP 고객", isFavorite: false},
  {id:2, name: "나이스 마트", phone: "010-1234-5678", note: "", isFavorite: true},
];

export default function ClientList() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null); // ✅ 오류 해결

  // 최초 로딩 시 정렬 적용 (이름순 정렬)
  useEffect(() => {
    fetchClients().then(clientList => {
      setClients(
        [...clientList].sort((a, b) => Number(b.isFavorite) - Number(a.isFavorite) || a.name.localeCompare(b.name, "ko-KR"))
      );
    });

    setClients(
      [...initialClients].sort((a, b) => a.name.localeCompare(b.name, "ko-KR"))
    );
  }, []);

  // 거래처 수정 버튼 클릭
  const handleEditClick = (client: Client) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  // 거래처 수정 (모달에서 입력 후 저장)
  const handleRegisterClient = async (updatedClient: Client) => {
    setClients((prev) =>
      [...prev.map((client) =>
        client.id === updatedClient.id ? { ...updatedClient, isFavorite: client.isFavorite } : client
      )].sort((a, b) =>
        Number(b.isFavorite) - Number(a.isFavorite) || a.name.localeCompare(b.name, "ko-KR")
      )
    );
    
    try {
      const updated = await updateClient(updatedClient);
      console.log('Updated client:', updated);
      alert('고객 정보가 갱신되었습니다.');
    } catch (error) {
      console.error('정보 갱신 실패:', error);
      alert('고객 정보 갱신에 실패했습니다.');
    }
    setIsModalOpen(false);
  };

  // 즐겨찾기 버튼 클릭 (별 아이콘 색상 변경 + 즐겨찾기 우선 정렬)
  const toggleFavorite = async (id: number, isFavorite: boolean) => {
    setClients((prev) =>
      [...prev.map((client) =>
        client.id === id ? { ...client, isFavorite: !client.isFavorite } : client
      )].sort((a, b) =>
        Number(b.isFavorite) - Number(a.isFavorite) || a.name.localeCompare(b.name, "ko-KR")
      )
    );

    try {
      const updated = await updateFavorite({id, isFavorite:!isFavorite});
      console.log('Updated client:', updated);
    } catch (error) {
      console.error('정보 갱신 실패:', error);
    }
  };

  async function fetchClients() {
    try {
      const response = await fetch('/api/client'); // API 엔드포인트 호출
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Clients:', data.clients);
      return data.clients;
    } catch (error) {
      console.error('Error fetching clients:', error);
      return [];
    }
  }

  return (
    <div className="client-list">
      <h2 className="under-line"> 거래처 리스트</h2>
      <ul>
        {clients.map((client) => (
          <li key={client.name}>
            <div className="client-action">
              {/* 수정 */}
              <button onClick={() => handleEditClick(client)}>
                <img src="/images/edit.png" alt="수정" />
              </button>

              {/* 즐겨찾기 */}
              <button onClick={() => toggleFavorite(client.id ?? 0, client.isFavorite)}>
                <img
                  src={client.isFavorite ? "/images/favorite-on.png" : "/images/favorite-off.png"}
                  alt="즐겨찾기"
                />
              </button>
            </div>
            <div className="client-info">
              <Link href={`/client-detail/${encodeURIComponent(client.name.replace(/\s/g, "-"))}`} passHref>
                <h3>{client.name}</h3>
              </Link>
            </div>

          </li>
        ))}
      </ul>

      {/* 거래처 수정 모달 (기존 등록 모달 재사용) */}
      {isModalOpen && (
        <ClientRegisterModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedClient(null);
          }}
          onRegister={handleRegisterClient}
          initialData={selectedClient}
        />
      )}
    </div>
  );
}
