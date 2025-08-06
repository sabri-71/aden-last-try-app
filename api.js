import axios from 'axios';

const API_BASE_URL = 'https://aden-last-try-app-3.onrender.com'; // غيّر الرابط حسب عنوان الـ Backend

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// مثال على دالة لجلب بيانات من الـ Backend
export const fetchData = async (endpoint) => {
  const response = await api.get(endpoint);
  return response.data;
};

// مثال على دالة لإرسال بيانات إلى الـ Backend
export const postData = async (endpoint, data) => {
  const response = await api.post(endpoint, data);
  return response.data;
};

// دالة لفحص الاتصال بالـ Backend
export const pingBackend = async () => {
  try {
    const response = await api.get('/ping'); // تأكد أن لديك endpoint /ping في الـ Backend
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
};
