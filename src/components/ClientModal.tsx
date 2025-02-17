"use client"
import {useState, useEffect} from "react";

interface Client {
  name: string;
  phone: string;
  note?: string;
  isFavorite: boolean;
}

interface ClientRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (client: Client) => void;
  initialData?: Client | null;
}

export default function ClientRegisterModal({
                                              isOpen,
                                              onClose,
                                              onRegister,
                                              initialData,
                                            }: ClientRegisterModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  // 모달이 열릴 때 기존 데이터 로드
  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setPhone(initialData.phone);
      setNote(initialData.note || "");
      setIsFavorite(initialData.isFavorite);
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (!name) {
      alert("거래처명은 필수 입력입니다.");
      return;
    }

    onRegister({name, phone, note, isFavorite});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button onClick={onClose} className="close-btn">✕</button>
        <div className="modal-header">
          <h2 className="under-line">{initialData ? "거래처 정보 수정" : "신규 거래처 등록"}</h2>
        </div>
        <div className="modal-content">
          <div className="wrapper">
            <label>거래처 명</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="거래처 명을 입력하세요"/>
          </div>
          <div className="wrapper">
            <label>거래처 전화 번호</label>
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="전화번호를 입력하세요"/>
          </div>
          <div className="wrapper">
            <label>비고</label>
            <input type="text" value={note} onChange={(e) => setNote(e.target.value)} placeholder="비고 사항을 입력하세요"/>
          </div>
        </div>
        <div className="modal-footer">
          <button className="default primary" onClick={handleSubmit}>
            {initialData ? "수정 완료" : "등록"}
          </button>
        </div>
      </div>
    </div>
  );
}
