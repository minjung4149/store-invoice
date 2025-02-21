
// 고객 정보 호출 api
export const getClientById = async (id: number) => {
  try {
    const response = await fetch(`/api/clients/search?id=${id}`);
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch client with ID ${id}:`, error);
    throw error;
  }
};

//  고객 전체 리스트 호출 api
export const getClientList = async () => {
  try {
    const response = await fetch('/api/clients'); // API 엔드포인트 호출
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
};

// 고객 정보 신규 등록 api
export const createClient = async (clientData: {
  name: string;
  phone: string;
  note?: string;
  isFavorite?: boolean;
}) => {
  try {
    const response = await fetch('/api/clients/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clientData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to create client:', error);
    throw error;
  }
};

// 고객 정보 업데이트 api
export const updateClient = async (clientData: {
  id: number | null;
  name: string;
  phone: string;
  note?: string;
  isFavorite: boolean;
}) => {
  if (clientData.id == null) {
    alert('업데이트하려면 유효한 ID가 필요합니다.');
    return;
  }

  try {
    const response = await fetch('/api/clients/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clientData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to update client:', error);
    throw error;
  }
};

// 고객 즐겨찾기 설정 api
export const updateFavorite = async (clientData: {
  id: number;
  isFavorite: boolean;
}) => {
  if (clientData.id == null) {
    alert('업데이트하려면 유효한 ID가 필요합니다.');
    return;
  }

  try {
    const response = await fetch('/api/clients/favorite', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clientData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to update client:', error);
    throw error;
  }
};


export const login = async () => {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to login:", error);
    throw error;
  }
};

// api/remain 의 api 호출 함수
// 거래처 잔금 확인용 api
export const getAllClientsWithLatestInvoice = async () => {
  try {
    const response = await fetch('/api/remain');
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch latest invoices for all clients:', error);
    throw error;
  }
};


// Invoice API
// 거래 내역 보기에서 리스트 클릭시 해당 거래 내역을 호출하는 api
export const getInvoiceById = async (invoiceId: number) => {
  try {
    const response = await fetch(`/api/invoices?id=${invoiceId}`);
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch invoice with ID ${invoiceId}:`, error);
    throw error;
  }
};


// 거래 내역 보기 눌렀을 때 고객별 거래 내역을 호출하는 api
export const getInvoicesByClientId = async (clientId: number) => {
  try {
    const response = await fetch(`/api/invoice/search?clientId=${clientId}`);
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch client with ID ${clientId}:`, error);
    throw error;
  }
};

// client-detail 페이지에서 신규 거래 등록 시 가장 마지막 invoice를 가져오는 api
// 영수증 번호에 invoice.id 에 +1을 해서 number 설정한다.
export const getLatestInvoiceByClientId = async (clientId: number) => {
  try {
    const response = await fetch(`/api/invoice/latest?clientId=${clientId}`);
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch client with ID ${clientId}:`, error);
    throw error;
  }
};


// 확정하기 버튼 클릭 시 invoice를 생성하는 api
//  getLatestInvoiceByClientId 로 가져온 invoice.balance + payment 값으로 balance 저장
// body 에 들어가는 json 형식 예시입니다
// {
//   "no": 1,
//   "clientId": 1,
//   "balance": 50000,
//   "payment": 20000,
//   "details": [
//     { "name": "상품 A", "quantity": 2, "price": 15000 },
//     { "name": "상품 B", "quantity": 1, "price": 30000 }
//   ]
// }

export const createInvoice = async (invoiceData: {
  clientId: number;
  title: string;
  amount: number;
  date: string;
}) => {
  try {
    const response = await fetch('/api/invoice/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invoiceData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to create invoice:', error);
    throw error;
  }
};
