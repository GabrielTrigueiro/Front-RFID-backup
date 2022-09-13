import { Box } from "@mui/system";
import { Navigate, Outlet } from "react-router-dom";
import { SideBar } from "../components/side-bar";
import { useAuthContext } from "../context/AuthContext";

export const Layout = () => {
  const { isAuthenticated } = useAuthContext()
  if (!isAuthenticated) return <Navigate replace to="/login" />;
  return (
    <Box width="100vw" height="100vh">
      <SideBar>
        <Outlet />
      </SideBar>
    </Box>
  );
};
