import { Box } from "@mui/system";
import { Navigate, Outlet } from "react-router-dom";
import { SideBar } from "../components/side-bar";
import { placeholderAuth } from "../context/AuthContext";

export const Layout = () => {
  if (!placeholderAuth.auth) return <Navigate replace to="/login" />;
  return (
    <Box width="100vw" height="100vh">
      <SideBar>
        <Outlet />
      </SideBar>
    </Box>
  );
};
