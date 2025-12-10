import apiClient from '../../utils/Base';

export const getAllBlogs = async () => {
   try {
      const response = await apiClient.get('/blogs');
      return response.data.blogs || [];
   } catch (error) {
      console.error('API Error:', error);
      throw error;
   }
};
