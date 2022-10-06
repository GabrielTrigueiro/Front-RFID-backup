import { Box, Grid, Typography } from "@mui/material"
import { IProduct } from "../../service/api/products"
import  place from "../../../assets/camisa.jpg"

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
            height:'250px',
            width:'200px',
            bgcolor:'#fff',
            borderRadius:3,
            m:1,
        }}>
            <Grid height={'70%'}
            sx={{borderRadius:2}}
            style={{backgroundImage: `url(${place})`,   
            backgroundSize:'cover'
            }}>
            </Grid> 
            <Box p={1}>
                <Typography fontSize={'16px'} fontWeight={700} color={'#505050'}>{description}</Typography>
                <Typography fontSize={'10px'} color={'#989898'}>{info}</Typography>
                <Typography fontSize={'12px'} fontWeight={500} color={'#505050'}>{codeRFID}</Typography>
            </Box>
        </Box>
    )
}