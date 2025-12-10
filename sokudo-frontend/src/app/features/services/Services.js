import apiClient from '../../utils/Base';

export const submitContactForm = async (formData) => {
   try {
      const data = {
         name: formData.name,
         email: formData.email,
         phone: formData.phone,
         message: formData.message,
      };

      const response = await apiClient.post('/contacts', data);

      if (!response.data) {
         throw new Error('No response data received');
      }

      return response.data;
   } catch (error) {
      console.error('Contact Form Error:', {
         message: error.message,
         response: error.response?.data,
         status: error.response?.status,
      });
      throw error;
   }
};
export const submitDealershipForm = async (formData) => {
   try {
      const data = {
         name: formData.name,
         email: formData.email,
         contact: formData.contact,
         age: formData.age,
         qualification: formData.qualification,
         presentBusiness: formData.presentBusiness,
         address: formData.address,
         years: formData.years,
         turnover: formData.turnover,
         investment: formData.investment,
         comments: formData.comments,
         type: 'dealership',
      };

      const response = await apiClient.post('/dealership', data);

      if (!response.data) {
         throw new Error('No response data received');
      }

      return response.data;
   } catch (error) {
      console.error('Dealership Form Error:', {
         message: error.message,
         response: error.response?.data,
         status: error.response?.status,
      });
      throw error;
   }
};
