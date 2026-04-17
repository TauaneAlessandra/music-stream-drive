import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:19131/music/', // Base URL aligned with Smart Dash Backend
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
