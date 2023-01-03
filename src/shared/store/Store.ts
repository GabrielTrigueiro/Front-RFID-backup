import { configureStore } from "@reduxjs/toolkit";
import rolesSlice from "./Slices/Roles";
import infoSlice from "./Slices/Info";
import caixaSlice from "./Slices/Caixa";

const store = configureStore({
    reducer: {
        roles: rolesSlice,
        info: infoSlice,
        caixa: caixaSlice
    }
});

export default store;
export type RootState = ReturnType<typeof store.getState>