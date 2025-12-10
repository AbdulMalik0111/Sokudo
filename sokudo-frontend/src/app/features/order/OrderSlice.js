import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../utils/Base';
import toast from 'react-hot-toast';

const initialState = {
   orders: [],
   currentOrder: null,
   loading: false,
   error: null,
};

export const createOrderThunk = createAsyncThunk(
   'order/create',
   async ({ formDetails, bookingAmount, productName }, { rejectWithValue }) => {
      try {
         const payload = {
            productName: productName,
           
            customerName: formDetails.name,
            email: formDetails.email,
            contactNumber: formDetails.contact,
            amount: bookingAmount,
            paymentMethod: 'Online',

            model: formDetails.model,
            color: formDetails.color,
            state: formDetails.state,
            city: formDetails.city,
            pincode: formDetails.pincode,
            landmark:formDetails.landmark,
            address: formDetails.address,
         };

         const response = await apiClient.post('/transactions/create', payload);
         return response.data;
      } catch (err) {
         return rejectWithValue(
            err.response?.data?.message || 'Error creating order'
         );
      }
   }
);


// This thunk will now call: POST /transactions/verify
export const verifyPaymentThunk = createAsyncThunk(
   'order/verify',
   async (paymentData, { rejectWithValue }) => {
      try {
         const response = await apiClient.post(
            '/transactions/verify',
            paymentData
         );
         return response.data;
      } catch (err) {
         return rejectWithValue(
            err.response?.data?.message || 'Payment verification failed'
         );
      }
   }
);

// This thunk will now call: POST /transactions/failure
export const logPaymentFailureThunk = createAsyncThunk(
   'order/logFailure',
   async (failureData, { rejectWithValue }) => {
      try {
         const response = await apiClient.post(
            '/transactions/failure',
            failureData
         );
         return response.data;
      } catch (err) {
         return rejectWithValue(
            err.response?.data?.message || 'Failed to log payment error'
         );
      }
   }
);

// This thunk will now call: GET /orders/myorders
// (I am assuming this one is correct based on our previous chat)
export const getMyOrdersThunk = createAsyncThunk(
   'order/getMyOrders',
   async (_, { rejectWithValue }) => {
      try {
         const response = await apiClient.get('/orders/myorders');
         return response.data;
      } catch (err) {
         return rejectWithValue(
            err.response?.data?.message || 'Failed to fetch orders'
         );
      }
   }
);

const orderSlice = createSlice({
   name: 'order',
   initialState,
   reducers: {
      clearOrderState: (state) => {
         state.currentOrder = null;
         state.loading = false;
         state.error = null;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(createOrderThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.currentOrder = null;
         })
         .addCase(createOrderThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.currentOrder = action.payload;
         })
         .addCase(createOrderThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })
         .addCase(verifyPaymentThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(verifyPaymentThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.currentOrder = null;
            toast.success(action.payload.message || 'Payment Verified!');
         })
         .addCase(verifyPaymentThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            toast.error(action.payload);
         })
         .addCase(getMyOrdersThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(getMyOrdersThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload;
         })
         .addCase(getMyOrdersThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         });
   },
});

export const { clearOrderState } = orderSlice.actions;
export default orderSlice.reducer;
