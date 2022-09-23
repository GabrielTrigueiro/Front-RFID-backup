import { Box, Typography } from "@mui/material"

export const Card_Page_Layout: React.FC<{tittle: string}> = ({ children, tittle }) => {
    return (
        //fundo
        <Box
            height={"100vh"}
            bgcolor={"#23A0C9"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={'center'}
        >
            {/* card */}
            <Box
                bgcolor={"#fff"}
                sx={{
                    height: {
                        xs: '100%',
                        sm: 450,
                    },
                    width: {
                        xs: '100%',
                        sm: 300,
                    },
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    borderRadius: '5px'
                }}
            >
                <Typography fontSize={40} fontWeight={500}>
                    {tittle}
                </Typography>
                {children}
            </Box>
        </Box>
    )
}