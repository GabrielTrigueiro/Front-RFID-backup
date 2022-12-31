import {createSlice} from "@reduxjs/toolkit";

interface cadastroUsuarioStates {
    modal: boolean
    dialog: boolean
}

const initialState: cadastroUsuarioStates = {
    modal: false,
    dialog: false
};

const cadastroUsuarioSlice = createSlice({
    name: "cadastroUsuario",
    initialState,
    reducers: {
        abrirModal: (state) => {
            state.modal = true;
        },
        fecharModal: (state) => {
            state.modal = false;
        },
        abrirDialog: (state) => {
            state.dialog = true;
        },
        fecharDialog: (state) => {
            state.dialog = false;
        },
        fecharTudo: (state) => {
            state.dialog = false;
            state.modal = false;
        },
    }
});

export const {abrirDialog, abrirModal, fecharModal, fecharDialog, fecharTudo} = cadastroUsuarioSlice.actions;
export default cadastroUsuarioSlice.reducer;

