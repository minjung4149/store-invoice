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
