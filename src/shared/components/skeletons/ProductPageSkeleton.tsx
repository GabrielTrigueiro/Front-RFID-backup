import { Skeleton, Stack } from "@mui/material";

export const ProductPageSkeleton: React.FC = () => {
    return (
    
        <Stack 
            sx={{
                height:"100%",
                width:"100%",
                display:"flex",
                alignItems:"center",
                justifyContent:"center"
            }}
        >
            <Skeleton
                variant="rectangular"
                sx={{
                    marginTop: 15,
                    width:"90%",
                    height:"65%"
                }}
            />
        </Stack>
    );
};
