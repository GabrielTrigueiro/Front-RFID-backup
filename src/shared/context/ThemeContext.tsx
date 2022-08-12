import { Box, ThemeProvider } from "@mui/material";
import { DefaultTheme } from "../Theme/DefaultTheme";

export const AppThemeProvider: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={DefaultTheme}>
      <Box width="100vw" height="100vh">
        {children}
      </Box>
    </ThemeProvider>
  );
};
