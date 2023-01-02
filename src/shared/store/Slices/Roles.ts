import {createSlice} from "@reduxjs/toolkit";

interface IRole {
    id: string
    name: string
}

interface IRoles {
    lista: IRole[]
}

const initialState: IRoles = {
    lista: []
};

const rolesSlice = createSlice({
    name: "cadastroUsuario",
    initialState,
    reducers: {
        adicionarRoles: (state, {payload}) => {
            state.lista.push(...payload);
        }
    }
});

export const {adicionarRoles} = rolesSlice.actions;
export default rolesSlice.reducer;

