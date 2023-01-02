import AccountCircle from "@mui/icons-material/AccountCircle";
import Brightness5Icon from "@mui/icons-material/Brightness5";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
    Badge, Divider,
    IconButton,
    Menu,
    MenuItem,
    Typography
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState, useCallback } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { User_Service } from "../../service/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import { pegarInfo } from "../../store/Slices/Info";

export const TopMenu = () => {
    const {logout} = useAuthContext();
    const menuId = "primary-search-account-menu";
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>
                <AccountCircle sx={{marginRight:1}} fontSize="small"/>
                <Typography fontSize={"12px"}>Perfil</Typography>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
                <Brightness5Icon sx={{marginRight:1}} fontSize="small"/>
                <Typography fontSize={"12px"}>Definições</Typography>
            </MenuItem>
            <Divider/>
            <MenuItem onClick={logout}>
                <Typography fontSize={"12px"}>Terminar sessão</Typography>
            </MenuItem>
        </Menu>
    );

    //setando as informaçoes
    const dispatch = useDispatch();

    const buscarInfo = useCallback(() => {
        const resposta = User_Service.getUserInfo();
        resposta.then(res => {
            dispatch(pegarInfo(res.username));
        });
    },[dispatch]);

    const info = useSelector((state: RootState) => state.info);

    useEffect(()=>{
        buscarInfo();
        console.log(info);
    },[buscarInfo]);

    return (
        <Box display={"flex"} alignItems={"center"}>
            <IconButton size="small" color="inherit">
                <Badge badgeContent={1} color="error">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            <Typography sx={{pl:2}}>Olá, {info}</Typography>
            <IconButton
                sx={{
                    "&:hover": {
                        background: "transparent",
                    },
                }}
                size="large"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
            >
                <AccountCircle sx={{pl:1}} fontSize="large"/>
            </IconButton>
            {renderMenu}
        </Box>
    );
};
