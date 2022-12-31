import { configureStore } from "@reduxjs/toolkit";
import CadastroUsuario from "./Slices/Usuario";

const store = configureStore({
    reducer: {
        cadastroUsuario: CadastroUsuario,
    }
});

export default store;
export type RootState = ReturnType<typeof store.getState>