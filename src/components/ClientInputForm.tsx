"use client";
import React, {useState} from "react";

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

interface ClientInputFormProps {
  invoiceData: InvoiceData;
  setInvoiceData: React.Dispatch<React.SetStateAction<InvoiceData>>;
}

//과일 데이터
const fruitCategories: Record<string, string[]> = {
  사과: ["사과", "사과(부사)", "사과(홍로)", "사과(시나몬골드)", "사과(아오리)"],
  배: ["배", "배(신고)", "배(원황)"],
  포도: ["포도(켐벨)", "포도(머루)", "거봉 2kg", "거봉 4kg", "샤인 2kg", "샤인 4kg"],
  복숭아: ["복숭아", "복숭아(백도)", "복숭아(황도)", "천도복숭아"],
  딸기: ["딸기", "딸기(설향)", "딸기(죽향)", "딸기(금실)", "딸기(스치)"],
  귤: ["밀감", "밀감S", "밀감M", "밀감L", "밀감2L", "한라봉", "천혜향", "레드향", "황금향"],
  여름: ["수박", "참외", "자두", "자두(후무사)", "토마토"],
  감: ["단감", "대봉", "홍시"],
  오렌지: ["오렌지", "오렌지(56)", "오렌지(72)"],
  키위: ["키위(그린키위)", "키위(골드키위)"],
  바나나: ["바나나", "바나나(6)", "바나나(9)"],
  수입: ["레몬", "석류", "아보카도", "자몽", "파인애플", "파인(골드)", "망고", "애플망고", "체리"],
  기타: ["무화과", "블루베리", "멜론", "멜론(3)", "멜론(4)", "용과"],
};

const formatNumber = (value: string) => {
  return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ClientInputForm = ({setInvoiceData}: ClientInputFormProps) => {
  const currentYear = new Date().getFullYear().toString();
  const initialItems = Array.from({length: 5}, () => ({name: "", quantity: "", price: "", total: ""}));

  const [formData, setFormData] = useState<InvoiceData>({
    invoiceNumber: "INVOICE-01",
    year: currentYear,
    day: "",
    month: "",
    items: initialItems,
    payment: "",
    note: "",
  });

  const [isConfirmed, setIsConfirmed] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null); // 현재 포커스된 `input`의 index 저장
  const [showFruitOptions, setShowFruitOptions] = useState(false);

  const [errors, setErrors] = useState<{ items: boolean[]; month: boolean; day: boolean }>({
    items: new Array(initialItems.length).fill(false),
    month: false,
    day: false,
  });

// 🔹 포커스된 `input` 업데이트
  const handleFocus = (index: number) => {
    setFocusedIndex(index);
  };

  // 🔹 과일 선택 (소분류 클릭 시)
  const handleFruitClick = (fruit: string) => {
    if (focusedIndex === null) return; // 포커스된 input이 없으면 실행 안 함

    setFormData((prev) => {
      const updatedItems = prev.items.map((item, i) =>
        i === focusedIndex ? {...item, name: fruit} : item
      );
      return {...prev, items: updatedItems};
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "payment" ? formatNumber(value) : value,
    }));
  };

  const handleItemChange = (index: number, field: keyof InvoiceItem, value: string) => {
    const formattedValue = field === "quantity" || field === "price" ? formatNumber(value) : value;

    setFormData((prev) => {
      const updatedItems = prev.items.map((item, i) => {
        if (i === index) {
          const newItem = {...item, [field]: formattedValue};
          const quantity = parseInt(newItem.quantity.replace(/,/g, ""), 10) || 0;
          const price = parseInt(newItem.price.replace(/,/g, ""), 10) || 0;
          const total = quantity * price;

          return {...newItem, total: total.toLocaleString()};
        }
        return item;
      });

      return {...prev, items: updatedItems};
    });

    setErrors((prev) => {
      const newErrors = {...prev};
      newErrors.items[index] = false;
      return newErrors;
    });
  };

  const handleRemoveItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));

    setErrors((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleAddItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, {name: "", quantity: "", price: "", total: ""}],
    }));

    setErrors((prev) => ({
      ...prev,
      items: [...prev.items, false],
    }));
  };

  const handleSubmit = () => {
    const monthError = !formData.month.trim();
    const dayError = !formData.day.trim();

    const newErrors = formData.items.map((item) => {
      const hasInput = !!item.name.trim() || !!item.quantity.trim() || !!item.price.trim();
      const isIncomplete = !item.name.trim() || !item.quantity.trim() || !item.price.trim();
      return hasInput && isIncomplete;
    });

    setErrors({items: newErrors, month: monthError, day: dayError});

    if (monthError || dayError || newErrors.includes(true)) {
      alert("입력되지 않은 필드가 있습니다. 확인 후 다시 시도하세요.");
      return;
    }

    setInvoiceData(formData);
    setIsConfirmed(true);
  };

  return (
    <>
      <div className="invoice-number">영수증 번호: {formData.invoiceNumber}</div>

      <div className="action-buttons">
        <button className={isConfirmed ? "active" : "inactive"} onClick={handleSubmit}>
          반영하기
        </button>
      </div>

      <div className="date-group">
        <span className="year">{formData.year}년</span>
        <input
          type="text"
          name="month"
          placeholder="MM"
          value={formData.month}
          maxLength={2}
          onChange={handleInputChange}
          className={errors.month ? "error-border" : ""}
        />
        <span>월</span>
        <input
          type="text"
          name="day"
          placeholder="DD"
          value={formData.day}
          maxLength={2}
          onChange={handleInputChange}
          className={errors.day ? "error-border" : ""}
        />
        <span>일</span>
      </div>

      <hr className="divider"/>

      <button className="toggle-fruit-btn" onClick={() => setShowFruitOptions(!showFruitOptions)}>
        {showFruitOptions ? "과일 목록 닫기" : "과일 목록 보기"}
      </button>

      {showFruitOptions && (
        <div className="fruit-options">
          <button className="close-btn" onClick={() => setShowFruitOptions(false)}>✕</button>
          {Object.entries(fruitCategories).map(([category, fruits]) => (
            <div key={category} className="fruit-category">
              <h4>{category}</h4>
              <div className="fruit-buttons">
                {fruits.map((fruit) => (
                  <button key={fruit} onClick={() => handleFruitClick(fruit)}>
                    {fruit}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      <hr className="divider"/>
      <div className=" item-group">
        <div className="input-header">
          <span className="left">No.</span>
          <span>품명</span>
          <span>수량</span>
          <span>단가</span>
          <span></span>
        </div>

        {formData.items.map((item, index) => (
          <div key={index} className="input-row">
            <span>{index + 1}</span>
            <input
              type="text"
              placeholder="품명"
              value={item.name}
              className={errors.items[index] && !item.name ? "error-border" : ""}
              onFocus={() => handleFocus(index)} // 🔹 포커스 감지
              onChange={(e) => handleItemChange(index, "name", e.target.value)}
            />
            <input
              type="text"
              className={`quantity ${errors.items[index] && !item.quantity ? "error-border" : ""}`}
              placeholder="수량"
              value={item.quantity}
              onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
            />
            <input
              type="text"
              className={`price ${errors.items[index] && !item.price ? "error-border" : ""}`}
              placeholder="단가"
              value={item.price}
              onChange={(e) => handleItemChange(index, "price", e.target.value)}
            />
            <button className="remove-btn" onClick={() => handleRemoveItem(index)}>✕</button>
          </div>
        ))}

        <button className="add-item" onClick={handleAddItem}>+ 품목 추가</button>
      </div>

      <hr className="divider"/>

      <div className="payment-group">
        <label>입금액</label>
        <input type="text" name="payment" placeholder="입금액" value={formData.payment} onChange={handleInputChange}/>
      </div>

      <label>비고</label>
      <textarea name="note" placeholder="비고" value={formData.note} onChange={handleInputChange}/>
    </>
  );
};

export default ClientInputForm;

