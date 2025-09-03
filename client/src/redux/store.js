import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import servicesSlice from './slices/servicesSlice';
import staffSlice from './slices/staffSlice';
import slotsSlice from "./slices/slotsSlice";
import bookingSlice from "./slices/bookingSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        services: servicesSlice,
        staff: staffSlice,
        slots: slotsSlice,
        booking: bookingSlice,
    }
});

export default store;