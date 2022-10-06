import { Box, Typography } from "@mui/material"
import { IProduct } from "../../service/api/products"

type TInfoProduct = IProduct &{
    key: string
}

export const Product: React.FC<TInfoProduct> = ({
    description,
    info,
    codeRFID
}) => {
    return(
        <Box
        sx={{
            height:'200px',
            width:'200px',
            bgcolor:'#453',
            m:1,
            color:'#fff'
        }}>
            <Box>
                
            </Box> 
            <Box>
                <Typography>{description}</Typography>
                <Typography>{info}</Typography>
                <Typography>{codeRFID}</Typography>
            </Box>
        </Box>
    )
}