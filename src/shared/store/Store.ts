import { configureStore } from "@reduxjs/toolkit";
import rolesSlice from "./Slices/Roles";

const store = configureStore({
    reducer: {
        roles: rolesSlice,
    }
});

export default store;
export type RootState = ReturnType<typeof store.getState>