import axios from 'axios';
import AuthError from '../errors/AuthError';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: { 'Content-Type': 'application/json' },
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('HTTP Error:', error.response.status, error.response.data);
      if (error.response.status === 401) {
        Promise.reject(new AuthError('Unauthorized access'));
        localStorage.removeItem('authToken');
        window.location.href = '/login';
      }
    } else {
      console.error('Network Error:', error.message);
    }
    return Promise.reject(error);
  }
);

http.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);  

export default http;