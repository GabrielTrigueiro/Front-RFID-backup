import { configureStore } from "@reduxjs/toolkit";
import rolesSlice from "./Slices/Roles";
import infoSlice from "./Slices/Info";

const store = configureStore({
    reducer: {
        roles: rolesSlice,
        info: infoSlice
    }
});

export default store;
export type RootState = ReturnType<typeof store.getState>