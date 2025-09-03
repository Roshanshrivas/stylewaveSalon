import { createSlice } from "@reduxjs/toolkit";

const slotsSlice = createSlice({
  name: "slots",
  initialState: {
    slots: [],
    loading: false,
  },
  reducers: {
    setSlots: (state, action) => {
      state.slots = action.payload;
    },
  },
  setLoading: (state, action) => {
    state.loading = action.payload;
  },
});


export const {setSlots, setLoading} = slotsSlice.actions;
export default slotsSlice.reducer;