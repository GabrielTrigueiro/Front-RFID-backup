import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { styled } from "@mui/styles";
import { useState } from "react";
import { IProduct, Product_Service } from "../../service/api/products";
import { Confirm_Dialog } from "../dialog";
import { Edit_Product_Form } from "../forms";
import { Product_Modal } from "../modal";
import { Notification } from "../notifications";

type TInfoProduct =  {
  key: string,
  update: () => void,
  produto: IProduct
}

export const ListProduct: React.FC<TInfoProduct> = ({
    update,
    produto,
}) => {
  
    const [edit, setEdit] = useState<boolean>();
    const [dialog, setDialog] = useState<boolean>(false);

    //gerenciar menu
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
                    Notification(result.message, "success");
                    console.log(e.id);
                    update();
                });
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
            <MenuItem onClick={()=>{handleEditOpen(); handleClose();} }>
                <BorderColorIcon sx={{ marginRight: 1 }} fontSize="small" />
                <Typography fontSize={"16px"}>Editar</Typography>
            </MenuItem>
            <MenuItem onClick={() => {setDialog(true); handleClose();}}>
                <DeleteOutlineIcon sx={{ marginRight: 1 }} fontSize="small" />
                <Typography fontSize={"16px"}>Excluir</Typography>
            </MenuItem>
        </Menu>
    );

    const TextBox = styled(Box)({
        display: "flex",
        minWidth: 200,
        maxWidth: 200
    });

    return (
        <>
            <Box
                sx={{
                    minHeight: "40px",
                    maxHeight: "40px",
                    width: "93%",
                    bgcolor: "#fff",
                    borderRadius: 3,
                    m:1,
                    padding: 1,

                    display: "flex",
                    alignItems: "center",
                }}>
                <TextBox>
                    <Typography sx={{marginRight: 1}} fontWeight={"bold"}>Produto:</Typography>
                    <Typography>{produto.description}</Typography>
                </TextBox>

                <TextBox sx={{display: "flex"}}>
                    <Typography sx={{marginRight: 1}} fontWeight={"bold"}>Quantidade:</Typography>
                    <Typography>{produto.quantity}</Typography>
                </TextBox>

                <TextBox sx={{display: "flex"}}>
                    <Typography sx={{marginRight: 1}} fontWeight={"bold"}>Descrição:</Typography>
                    <Typography>{produto.info}</Typography>
                </TextBox>

                <TextBox sx={{display: "flex"}}>
                    <Typography sx={{marginRight: 1}} fontWeight={"bold"}>Cor:</Typography>
                    <Typography>{produto.color}</Typography>
                </TextBox>

                <TextBox sx={{display: "flex"}}>
                    <Typography sx={{marginRight: 1}} fontWeight={"bold"}>Tamanho:</Typography>
                    <Typography>{produto.size}</Typography>
                </TextBox>
                
                <Box sx={{display: "flex", width: "100%", justifyContent: "flex-end"}}>
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
                    RegisterClose={handleEditClose}
                    update={update}
                />
            </Product_Modal>
        </>
    );
};