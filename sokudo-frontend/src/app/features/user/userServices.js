import apiClient from '../../utils/Base';

const normalizeResponse = (data) => {
   if (!data) return { user: null, token: null };

   // If token and nested user
   if (data.user || data.token) {
      const token = data.token ?? null;
      const user =
         data.user ??
         (() => {
            // remove success flag and treat remaining top-level fields as user
            const { success, token: _unused, ...rest } = data;
            if (rest && (rest._id || rest.email)) return rest;
            return null;
         })();
      return { user, token };
   }

   // Fallback: data might directly be the user object but no token
   if (data._id || data.email) return { user: data, token: null };

   return { user: null, token: null };
};

export const registerUser = async (userData) => {
   const response = await apiClient.post('/customers/register', userData);
   const { user, token } = normalizeResponse(response.data);
   return { user, token };
};

export const loginUser = async (credentials) => {
   const response = await apiClient.post('/customers/login', credentials);
   const { user, token } = normalizeResponse(response.data);
   return { user, token };
};
