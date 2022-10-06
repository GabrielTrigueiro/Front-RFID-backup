import { Box, Grid, IconButton, Typography } from "@mui/material"
import { IProduct } from "../../service/api/products"
import  place from "../../../assets/camisa.jpg"
import { useState } from "react"
import MoreVertIcon from '@mui/icons-material/MoreVert';

type TInfoProduct = IProduct &{
    key: string
}

export const Product: React.FC<TInfoProduct> = ({
    description,
    info,
    codeRFID
}) => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    }

    //falta colocar coisa no menu e adicionar as funções

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
            <Box p={1} height={'20%'} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                <Box>
                    <Typography fontSize={'16px'} fontWeight={700} color={'#505050'}>{description}</Typography>
                    <Typography fontSize={'10px'} color={'#989898'}>{info}</Typography>
                    <Typography fontSize={'12px'} fontWeight={500} color={'#505050'}>{codeRFID}</Typography>
                </Box>
                <Box>
                    <IconButton
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                    >
                        <MoreVertIcon />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    )
}