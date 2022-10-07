import { Box, Grid, IconButton, Menu, MenuItem, Typography } from "@mui/material"
import { IProduct } from "../../service/api/products"
import  place from "../../../assets/camisa.jpg"
import { useState } from "react"
import MoreVertIcon from '@mui/icons-material/MoreVert'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import BorderColorIcon from '@mui/icons-material/BorderColor';

type TInfoProduct = IProduct &{
    key: string
}

export const Product: React.FC<TInfoProduct> = ({
    description,
    info,
    codeRFID
}) => {
    const menuId = "primary-search-account-menu";
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    }

    const renderMenu = (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          id={menuId}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={isMenuOpen}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <BorderColorIcon sx={{marginRight:1}} fontSize="small"/>
            <Typography fontSize={'16px'}>Editar</Typography>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <DeleteOutlineIcon sx={{marginRight:1}} fontSize="small"/>
            <Typography fontSize={'16px'}>Excluir</Typography>
          </MenuItem>
        </Menu>
      );

    //adicionar func para as opçoes e os confirmar para cada ação
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
                    onClick={handleClick}
                    aria-haspopup="true"
                    aria-controls={menuId}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    {renderMenu}
                </Box>
            </Box>
        </Box>
    )
}