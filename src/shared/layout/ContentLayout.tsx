import { Box, Typography } from "@mui/material";
import { TopMenu } from "../components";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { User_Service } from "../service/api";
import { pegarInfo } from "../store/Slices/Info";
import { useNavigate } from "react-router-dom";

interface props {
  tittle: string;
}

export const ContentLayout: React.FC<props> = ({ children, tittle }) => {
    
    const dispatch = useDispatch();
    
    const buscarInfo = useCallback(() => {
        const resposta = User_Service.getUserInfo();
        resposta.then(res => {
            dispatch(pegarInfo(res));
        });
    },[dispatch]);
    
    useEffect(()=>{
        buscarInfo();
    },[buscarInfo]);

    return (
        <Box height={"100vh"} bgcolor={"#F0F5F8"}>
            <Box
                height={"10%"}
                pt={1}
                pl={4}
                pr={2}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
            >
                <Typography>{tittle}</Typography>
                <TopMenu />
            </Box>
            <Box height={"65%"} p={4}>
                {children}
            </Box>
        </Box>
    );
};
