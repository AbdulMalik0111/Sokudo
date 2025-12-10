import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, registerUser } from './userServices';
import { setAuthToken } from '../../utils/Base';

export const userRegister = createAsyncThunk(
   'user/register',
   async (userData, { rejectWithValue }) => {
      try {
         const data = await registerUser(userData);
         if (data?.token) setAuthToken(data.token);
         return data;
      } catch (error) {
         return rejectWithValue(error.response?.data || 'Registration failed');
      }
   }
);

export const userLogin = createAsyncThunk(
   'user/login',
   async (credentials, { rejectWithValue }) => {
      try {
         const data = await loginUser(credentials);
         if (data?.token) setAuthToken(data.token);
         return data;
      } catch (error) {
         return rejectWithValue(error.response?.data || 'Login failed');
      }
   }
);

// Static initial state for SSR safety
const initialState = {
   user: null,
   token: null,
   isLoggedIn: false,
   loading: false,
   error: null,
};

const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      logout: (state) => {
         state.user = null;
         state.token = null;
         state.isLoggedIn = false;
         setAuthToken(null);
         if (typeof window !== 'undefined') {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
         }
      },

      setCredentials: (state, action) => {
         const { user, token } = action.payload;
         state.user = user || state.user;
         state.token = token || state.token;
         state.isLoggedIn = !!(token || state.token);
         if (typeof window !== 'undefined') {
            if (token) {
               localStorage.setItem('token', token);
               setAuthToken(token);
            }
            if (user) localStorage.setItem('user', JSON.stringify(user));
         }
      },

      setUserAfterGoogle: (state, action) => {
         const { user, token } = action.payload;
         state.user = user;
         state.token = token;
         state.isLoggedIn = true;
         if (typeof window !== 'undefined') {
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', token);
         }
      },
      // Hydrate from localStorage on client
      hydrateUser: (state) => {
         if (typeof window !== 'undefined') {
            const user = JSON.parse(localStorage.getItem('user')) || null;
            const token = localStorage.getItem('token') || null;
            state.user = user;
            state.token = token;
            state.isLoggedIn = !!token;
            if (token) setAuthToken(token);
         }
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(userRegister.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(userRegister.fulfilled, (state, action) => {
            state.loading = false;
            const payload = action.payload || {};
            state.token = payload.token || state.token;
            state.user =
               payload.user ??
               (payload._id || payload.email ? payload : state.user);
            state.isLoggedIn = !!state.token;
            if (typeof window !== 'undefined') {
               if (state.token) {
                  localStorage.setItem('token', state.token);
                  setAuthToken(state.token);
               }
               if (state.user)
                  localStorage.setItem('user', JSON.stringify(state.user));
            }
         })
         .addCase(userRegister.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })
         .addCase(userLogin.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(userLogin.fulfilled, (state, action) => {
            state.loading = false;
            const payload = action.payload || {};
            state.token = payload.token || state.token;
            state.user =
               payload.user ??
               (payload._id || payload.email ? payload : state.user);
            state.isLoggedIn = !!state.token;
            if (typeof window !== 'undefined') {
               if (state.token) {
                  localStorage.setItem('token', state.token);
                  setAuthToken(state.token);
               }
               if (state.user)
                  localStorage.setItem('user', JSON.stringify(state.user));
            }
         })
         .addCase(userLogin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         });
   },
});

export const { logout, setCredentials, setUserAfterGoogle, hydrateUser } =
   userSlice.actions;
export default userSlice.reducer;
