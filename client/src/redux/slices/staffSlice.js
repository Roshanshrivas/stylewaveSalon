import { createSlice } from "@reduxjs/toolkit";

const staffSlice = createSlice({
    name:"staff",
    initialState: {
        staffList:[],
        loading: false,
    },
    reducers: {
        setStaff: (state, action) => {
            state.staffList = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
});

export const {setStaff, setLoading} = staffSlice.actions;
export default staffSlice.reducer;
