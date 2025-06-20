// Exemplo de como você pode ter implementado
import axios from 'axios';
import Cookies from 'js-cookie';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Interceptor de requisição
api.interceptors.request.use(
  (request) => {

    const headers = request.headers ?? {}

    const token = Cookies.get("session-token")

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Opcional: Interceptor de resposta para lidar com tokens expirados, etc.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Lógica para deslogar o usuário ou refrescar o token
      console.log('Token expirado ou não autorizado. Redirecionando para login...');
      // Exemplo: window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);