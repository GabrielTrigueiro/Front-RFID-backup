import { Badge, createTheme, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { SearchInput } from "../search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useState } from "react";

export const TopMenu = () => {
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
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      </Menu>
  );

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
    >
      <IconButton sx={{mr:1}} size="small" color="inherit">
        <Badge badgeContent={1} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <SearchInput />
      <IconButton
      sx={{
        "&:hover":{
            background: 'transparent',
        },
      }}
        size="large"
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
      >
        <AccountCircle />
        <Typography>Usuario</Typography>
      </IconButton>
      {renderMenu}
    </Box>
  );
};
