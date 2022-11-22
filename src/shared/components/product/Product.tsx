import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Grid, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { useContext, useState } from "react";
import place from "../../../assets/camisa.jpg";
import { Snack, SnackbarContext } from "../../context/AlertCardContext";
import { IProduct, Product_Service } from "../../service/api/products";
import { Confirm_Dialog } from "../dialog";
import { Edit_Product_Form } from "../forms";
import { Product_Modal } from "../modal";


type TInfoProduct = IProduct & {
  key: string,
  update: () => void,
  produto: IProduct
  saveProduct: (e: IProduct) => void;
}

export const Product: React.FC<TInfoProduct> = ({
    description,
    info,
    codeRFID,
    update,
    produto,
    saveProduct
}) => {
  
    const { setSnack } = useContext(SnackbarContext);
    const [edit, setEdit] = useState<boolean>();
    const [dialog, setDialog] = useState<boolean>(false);
    const menuId = "primary-search-account-menu";
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);
    //gerencia modal de edição
    const [editModal, setEditModal] = useState(false);
    const handleEditOpen = () => setEditModal(true);
    const handleEditClose = () => setEditModal(false);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    //func para deletar produto
    const handleDelete = (e: IProduct) => {
        if (e.id)
            Product_Service.Delete(e.id)
                .then((result) => {
                    setSnack(new Snack({
                        message: "Produto removido com sucesso",
                        color: "success",
                        open: true
                    }));
                    console.log(e.id);
                    update();
                });
    };
    //func para editar produto
    const editProduct = (e: IProduct) => {
        if (e.id) {
            Product_Service.UpdateById(e.id, e)
                .then((result) => {
                    if(result instanceof AxiosError){
                        setSnack(new Snack({
                            message: result.response?.data.message,
                            color: "error",
                            open: true
                        }));
                    }else{
                        setSnack(new Snack({
                            message: "Alterações salvas",
                            color: "success",
                            open: true
                        }));
                        handleEditClose();
                        update();
                    }
                });
        }
    };
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
            <MenuItem onClick={()=>handleEditOpen()}>
                <BorderColorIcon sx={{ marginRight: 1 }} fontSize="small" />
                <Typography fontSize={"16px"}>Editar</Typography>
            </MenuItem>
            <MenuItem onClick={() => setDialog(true)}>
                <DeleteOutlineIcon sx={{ marginRight: 1 }} fontSize="small" />
                <Typography fontSize={"16px"}>Excluir</Typography>
            </MenuItem>
        </Menu>
    );
    return (
        <Box
            sx={{
                height: "250px",
                width: "200px",
                bgcolor: "#fff",
                borderRadius: 3,
                m:1
            }}>
            <Grid height={"70%"}
                sx={{ borderRadius: 2 }}
                style={{
                    backgroundImage: `url(${place})`,
                    backgroundSize: "cover"
                }}>
            </Grid>
            <>
                <Box p={1} height={"20%"} display={"flex"} flexDirection={"column"}  alignItems={"center"} justifyContent={"space-between"}>
                    <Box sx={{width:"100%", display:"flex", justifyContent:"space-between"}}>
                        <Typography fontSize={"16px"} fontWeight={700} color={"#505050"}>{produto.info}</Typography>
                        <Typography fontSize={"16px"} fontWeight={700} color={"#505050"}>{produto.price}</Typography>
                    </Box>
                    <Box sx={{width:"100%", display:"flex", justifyContent:"space-between"}}>
                        <Box>
                            <Typography fontSize={"12px"} fontWeight={500} color={"#505050"}>Descrição: {produto.description}</Typography>
                            <Typography fontSize={"12px"} fontWeight={500} color={"#505050"}>{produto.Quantidade}</Typography>
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

                <Confirm_Dialog
                    tittle={"Deseja excluir produto?  "}
                    messageOne={"Cancelar"}
                    messageTwo={"Excluir"}
                    funcDialog={() => setDialog(false)}
                    funcModal={() => handleDelete(produto)}
                    state={dialog}
                />

                <Product_Modal closeModal={handleEditClose} outState={editModal}>
                    <Edit_Product_Form
                        product={produto}
                        editProduct={editProduct}
                    />
                </Product_Modal>
            </>
        </Box>
    );
};