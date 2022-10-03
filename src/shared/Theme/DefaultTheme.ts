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
            paper: '#F0F5F8',
            default: '#F0F5F8'
        },
        primary:{
            main:'#23A0C9',
        },
        secondary:{
            main:'#fff'
        }
    },
})