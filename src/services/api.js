import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://localhost:19131/music/', 
});

// Interceptor para injetar o Token do Google se necessário
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('google_access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
