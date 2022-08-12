import { Box, Typography } from "@mui/material";
import { TopMenu } from "../components";

interface props {
  tittle: string;
}

export const ContentLayout: React.FC<props> = ({ children, tittle }) => {
  return (
    <Box height={"100%"} bgcolor={"#F0F5F8"}>
      <Box
        pt={1}
        pl={4}
        pr={4}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography>{tittle}</Typography>
        <TopMenu />
      </Box>
      <Box pt={1} pl={4} pr={4}>
        {children}
      </Box>
    </Box>
  );
};
