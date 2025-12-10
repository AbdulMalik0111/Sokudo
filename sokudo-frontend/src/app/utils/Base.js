import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const apiClient = axios.create({
   baseURL,
   headers: {
      'Content-Type': 'application/json',
   },
   timeout: 25000,
});

export const setAuthToken = (token) => {
   if (token)
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
   else delete apiClient.defaults.headers.common['Authorization'];
};

apiClient.interceptors.response.use(
   (response) => response,
   (error) => {
      if (error.response) {
         console.error(
            'API Error:',
            error.response.status,
            error.response.data
         );
      }
      return Promise.reject(error);
   }
);

export default apiClient;
