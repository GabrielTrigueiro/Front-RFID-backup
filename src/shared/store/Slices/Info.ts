import {createSlice} from "@reduxjs/toolkit";

interface IData {username: string}

const initialState:IData = {username: ""};

const infoSlice = createSlice({
    name: "infoUsuario",
    initialState,
    reducers: {
        pegarInfo: (state, {payload}) => {
            return payload;
        }
    }
});

export const {pegarInfo} = infoSlice.actions;
export default infoSlice.reducer;
