import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const customerApi = {
  verify: (data: { type: string; value: string }) => api.post('/customer/verify', data),
};

export const debtApi = {
  create: (data: any) => api.post('/debts', data),
  list: () => api.get('/debts'),
  updateStatus: (id: string, status: string) => api.patch(`/debts/${id}/status`, { status }),
};

export default api;
