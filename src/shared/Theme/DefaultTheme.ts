import { createTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const DefaultTheme = createTheme({
    typography: {
        body1:{
            color: '#727272'
        }
    },
    palette:{
        background:{
            paper: '#23A0C9',
            default: '#F0F5F8'
        },
    }
})