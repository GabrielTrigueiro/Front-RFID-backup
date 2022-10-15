import { Box, Typography } from "@mui/material";
import { TopMenu } from "../components";

interface props {
  tittle: string;
}

export const ContentLayout: React.FC<props> = ({ children, tittle }) => {
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
