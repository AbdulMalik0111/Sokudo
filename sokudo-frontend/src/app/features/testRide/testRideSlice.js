import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* 🔹 Fetch logged-in customer's test rides */
export const getMyTestRidesThunk = createAsyncThunk(
  "testRide/getMyTestRides",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().user.token;

      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/test-ride/my-test-rides`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data.rides;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch test rides"
      );
    }
  }
);

const testRideSlice = createSlice({
  name: "testRide",
  initialState: {
    rides: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMyTestRidesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyTestRidesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.rides = action.payload;
      })
      .addCase(getMyTestRidesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default testRideSlice.reducer;
