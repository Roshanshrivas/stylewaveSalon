// redux/slices/bookingSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pendingBooking: null, // store booking before login
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
  },
});

export const { setPendingBooking, clearPendingBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
