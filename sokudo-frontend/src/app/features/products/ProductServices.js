import apiClient from '../../utils/Base';

export const getAllProducts = async () => {
   try {
      const response = await apiClient.get('/products');
      console.log('Fetched Products:', response.data);
      return response.data.products || [];
   } catch (error) {
      console.error('API Error:', error);
      throw error;
   }
};
