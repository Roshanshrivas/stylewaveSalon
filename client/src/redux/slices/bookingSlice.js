// redux/slices/bookingSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pendingBooking: null, // store booking before login
  bookings: [],
  loading: false,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setPendingBooking: (state, action) => {
      state.pendingBooking = action.payload;
    },
    clearPendingBooking: (state) => {
      state.pendingBooking = null;
    },
    setBookings: (state, action) => {
      state.bookings = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  },
});

export const { setPendingBooking, clearPendingBooking, setBookings, setLoading } = bookingSlice.actions;
export default bookingSlice.reducer;
