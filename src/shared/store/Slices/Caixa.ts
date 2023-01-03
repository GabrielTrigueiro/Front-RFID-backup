import { createSlice } from "@reduxjs/toolkit";

interface ICaixaItem {
    id: string,
    codeRFID: string,
    quantidade: string,
    preco: number,
    nome: string
}

interface ICaixaListaDeItem {
    lista: ICaixaItem[]
}

const initialState: ICaixaListaDeItem = {lista:[]};

const caixaSlice = createSlice({
    name: "caixa",
    initialState,
    reducers:{
        colocarItemNaLista: (state, {payload}) => {
            state.lista.push(payload);
        },
        limparLista: () => initialState
    }
});

export const {colocarItemNaLista, limparLista} = caixaSlice.actions;

export default caixaSlice.reducer;