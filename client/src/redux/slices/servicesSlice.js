import { createSlice } from "@reduxjs/toolkit";

const servicesSlice = createSlice({
    name:"services",
    initialState:{
        services: [],
        loading: false,
    },
    reducers:{
        setServices: (state, action) => {
            state.services = action.payload;
        },
        addService: (state, action) => {
            state.services.push(action.payload);
        },
        updateService: (state, action) => {
            const updated = action.payload;
            state.services = state.services.map(s => 
                s._id === updated._id ? updated : s
            );
        },
        deleteService: (state, action) => {
            state.services = state.services.filter(s => s._id !== action.payload);
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
});

export const { setServices, addService, updateService, deleteService, setLoading } = servicesSlice.actions;
export default servicesSlice.reducer;