'use client';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllBlogs } from './BlogServices';

export const fetchAllBlogs = createAsyncThunk('blogs/fetchAll', async () => {
   try {
      const blogs = await getAllBlogs();
      return blogs || [];
   } catch (err) {
      return Promise.reject('Failed to fetch blogs');
   }
});

const initialState = {
   items: [],
   status: 'idle',
   error: null,
   message: null,
};

const blogSlice = createSlice({
   name: 'blogs',
   initialState,
   reducers: {
      clearBlogs(state) {
         state.items = [];
         state.status = 'idle';
         state.error = null;
         state.message = null;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchAllBlogs.pending, (state) => {
            state.status = 'loading';
            state.error = null;
            state.message = 'Loading blogs...';
         })
         .addCase(fetchAllBlogs.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.items = [...action.payload].reverse();
            state.error = null;
            state.message = 'Blogs fetched successfully';
         })
         .addCase(fetchAllBlogs.rejected, (state) => {
            state.status = 'failed';
            state.error = 'Failed to fetch blogs';
            state.message = 'Failed to fetch blogs';
         });
   },
});

export const { clearBlogs } = blogSlice.actions;
export default blogSlice.reducer;
