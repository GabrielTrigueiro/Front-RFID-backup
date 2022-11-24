import { ToastContainer } from "react-toastify";
import { AppRoutes } from "./routes";
import { AppThemeProvider } from "./shared/context";
import { AuthProvider } from "./shared/context/AuthContext";
import { SideBarProvider } from "./shared/context/SideBarContext";
import "react-toastify/dist/ReactToastify.css";

export const App = () => {
    return (

        <AuthProvider>
            <ToastContainer />
            <AppThemeProvider>
                <SideBarProvider>
                    <AppRoutes />
                </SideBarProvider>
            </AppThemeProvider>
        </AuthProvider>

    );
};