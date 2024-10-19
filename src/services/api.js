import axios from 'axios';

const API_URL =   'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const register = (userData) => api.post('/auth/register', userData);
export const login = (credentials) => api.post('/auth/login', credentials);
export const verifyEmail = (data) => api.post('/auth/verify-email', data);
export const verifyMobile = (data) => api.post('/auth/verify-mobile', data);
export const createJob = (jobData) => api.post('/jobs', jobData);
export const getJobs = () => api.get('/jobs');

export default api;