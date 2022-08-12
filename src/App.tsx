import { AppRoutes } from "./routes";
import { AppThemeProvider } from "./shared/context";
import { SideBarProvider } from "./shared/context/SideBarContext";

export const App = () => {
  return (
    <AppThemeProvider>
      <SideBarProvider>
        <AppRoutes/>
      </SideBarProvider>
    </AppThemeProvider>
  );
}