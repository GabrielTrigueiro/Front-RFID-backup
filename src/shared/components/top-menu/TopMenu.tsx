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
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { User_Service } from "../../service/api";

interface userData {
    data: {
        id: string
        roles: [{
          authority: string,
          id: string,
          name: string
        }],
        username: string
    },
    errors: [{
        field: string
        message: string
    }],
    message: string,
    success: true
}

export const TopMenu = () => {
    const {logout} = useAuthContext();
    const menuId = "primary-search-account-menu";
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);

    //info do usuário, por enquanto apenas seu nome
    const [userInfo, setUserInfo] = useState<string>("");

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

    //coletar informaçoes do usuário no primeiro load
    useEffect(()=>{
        User_Service.getUserInfo().then((result) => {
            if (result instanceof Error) {
                console.log("erro no use effect");
            } else {
                setUserInfo(result.data.data.username);
            }
        });
    },[]);

    return (
        <Box display={"flex"} alignItems={"center"}>
            <IconButton size="small" color="inherit">
                <Badge badgeContent={1} color="error">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            <Typography sx={{pl:2}}>Olá, {userInfo}</Typography>
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
