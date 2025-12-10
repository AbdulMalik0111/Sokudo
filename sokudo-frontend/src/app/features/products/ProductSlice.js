import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllProducts } from './ProductServices';

export const fetchAllProducts = createAsyncThunk(
   'products/fetchAll',
   async (_, { rejectWithValue }) => {
      try {
         const products = await getAllProducts();
         return products || [];
      } catch (error) {
         let message = 'Failed to fetch products';
         if (
            error.response &&
            error.response.data &&
            error.response.data.message
         ) {
            message = error.response.data.message;
         } else if (error.message) {
            message = error.message;
         }
         return rejectWithValue(message);
      }
   }
);

const initialState = {
   items: [],
   status: 'idle',
   error: null,
   message: null,
};

const productSlice = createSlice({
   name: 'products',
   initialState,
   reducers: {
      clearProducts(state) {
         state.items = [];
         state.status = 'idle';
         state.error = null;
         state.message = null;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchAllProducts.pending, (state) => {
            state.status = 'loading';
            state.error = null;
            state.message = 'Loading products...';
         })
         .addCase(fetchAllProducts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.items = action.payload;
            state.error = null;
            state.message = 'Products fetched successfully';
         })
         .addCase(fetchAllProducts.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload || 'Unknown error';
            state.message = 'Failed to fetch products';
         });
   },
});

export const { clearProducts } = productSlice.actions;
export default productSlice.reducer;
