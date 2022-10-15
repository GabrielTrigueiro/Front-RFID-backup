import { Box, Button, Divider, FormControl, Grid, IconButton, InputLabel, Menu, MenuItem, Modal, Typography } from "@mui/material"
import { IProduct, Product_Service } from "../../service/api/products"
import place from "../../../assets/camisa.jpg"
import { useState, useContext, useRef } from "react"
import MoreVertIcon from '@mui/icons-material/MoreVert'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Confirm_Dialog } from "../dialog"
import { Snack, SnackbarContext } from "../../context/AlertCardContext"
import { Form } from "@unform/web"
import { FormInput } from "../forms"
import { Product_Modal } from "../modal"
import { FormHandles } from "@unform/core"
import { AxiosError } from "axios"


type TInfoProduct = IProduct & {
  key: string,
  update: () => void,
  produto: IProduct
}

export const Product: React.FC<TInfoProduct> = ({
  description,
  info,
  codeRFID,
  update,
  produto
}) => {
  const formRef = useRef<FormHandles>(null)
  const { setSnack } = useContext(SnackbarContext)
  const [edit, setEdit] = useState<boolean>()
  const [dialog, setDialog] = useState<boolean>(false)
  const menuId = "primary-search-account-menu"
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const isMenuOpen = Boolean(anchorEl)
  //gerencia modal de edição
  const [editModal, setEditModal] = useState(false)
  const handleEditOpen = () => setEditModal(true)
  const handleEditClose = () => setEditModal(false)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null);
  }
  //func para deletar produto
  const handleDelete = (e: IProduct) => {
    if (e.id)
      Product_Service.Delete(e.id)
        .then((result) => {
          setSnack(new Snack({
            message: "Produto removido com sucesso",
            color: 'success',
            open: true
          }))
          console.log(e.id)
          update();
        });
  }
  //func para editar produto
  const editProduct = (e: IProduct) => {
    if (e.id) {
      Product_Service.UpdateById(e.id, e)
        .then((result) => {
          if(result instanceof AxiosError){
            setSnack(new Snack({
              message: result.response?.data.message,
              color: 'error',
              open: true
            }))
          }else{
            setSnack(new Snack({
              message: "Alterações salvas",
              color: 'success',
              open: true
            }))
            handleEditClose()
            update()
          }
        })
    }
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
      <MenuItem onClick={()=>handleEditOpen()}>
        <BorderColorIcon sx={{ marginRight: 1 }} fontSize="small" />
        <Typography fontSize={'16px'}>Editar</Typography>
      </MenuItem>
      <MenuItem onClick={() => setDialog(true)}>
        <DeleteOutlineIcon sx={{ marginRight: 1 }} fontSize="small" />
        <Typography fontSize={'16px'}>Excluir</Typography>
      </MenuItem>
    </Menu>
  )
  return (
    <Box
      sx={{
        height: '250px',
        width: '200px',
        bgcolor: '#fff',
        borderRadius: 3,
        m:1
      }}>
      <Grid height={'70%'}
        sx={{ borderRadius: 2 }}
        style={{
          backgroundImage: `url(${place})`,
          backgroundSize: 'cover'
        }}>
      </Grid>
      <>
        <Box p={1} height={'20%'} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
          <Box>
            <Typography fontSize={'16px'} fontWeight={700} color={'#505050'}>{info}</Typography>
            <Typography fontSize={'10px'} color={'#989898'}>{description}</Typography>
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
        <Confirm_Dialog
          tittle={'Deseja excluir produto?'}
          messageOne={'Cancelar'}
          messageTwo={'Excluir'}
          funcDialog={() => setDialog(false)}
          funcModal={() => handleDelete(produto)}
          state={dialog}
        />
        <Product_Modal closeModal={handleEditClose} outState={editModal}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 1
            }}
            flex={1}>
            <Typography>Cadastrar</Typography>
          </Box>
          <Divider />
          <Box flex={6}>
            <Form
              ref={formRef}
              initialData={produto}
              onSubmit={(dados) => {
                dados.id = produto?.id
                editProduct(dados)
              }}
              className="product-form"
            >
              <Box sx={{ p: 1, width: "100%" }}>
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel>Nome do Produto</InputLabel>
                  <FormInput
                    name="info"
                    type="text"
                    label="Nome do Produto"
                  />
                </FormControl>
              </Box>
              <FormControl sx={{ p: 1, width: "100%" }}>
                <InputLabel>Id de Referência</InputLabel>
                <FormInput
                  name="productReferenceId"
                  type="text"
                  label="Id de Referência"

                />
              </FormControl>
              <Box sx={{ p: 1, display: "flex", justifyContent: "space-between", width: "100%" }}>
                <FormControl sx={{ width: "49%" }}>
                  <InputLabel>RFID</InputLabel>
                  <FormInput
                    name="codeRFID"
                    type="text"
                    label="RFID"

                  />
                </FormControl>
                <FormControl sx={{ width: "49%" }}>
                  <InputLabel>Preço</InputLabel>
                  <FormInput
                    name="price"
                    type="number"
                    label="Preço"
                  />
                </FormControl>
              </Box>
              <Box sx={{ p: 1, display: "flex", justifyContent: "space-between", width: "100%" }}>
                <FormControl sx={{ width: "49%" }}>
                  <InputLabel>Id da compania</InputLabel>
                  <FormInput
                    name="companyId"
                    type="text"
                    label="Id da compania"
                  />
                </FormControl>
                <FormControl sx={{ width: "49%" }}>
                  <InputLabel>Id de fornecimento</InputLabel>
                  <FormInput
                    name="supplierId"
                    type="text"
                    label="Id de fornecimento"
                  />
                </FormControl>
              </Box>
              <Box sx={{ p: 1, width: "100%" }}>
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel>Descrição</InputLabel>
                  <FormInput
                    multiline
                    maxRows={4}
                    sx={{
                      height: 130,
                      display: "flex",
                      alignItems: "flex-start"
                    }}
                    name="description"
                    type="text"
                    label="Descrição"
                  />
                </FormControl>
              </Box>
              <Divider flexItem />
              <Box
                sx={{
                  p: 1,
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center"
                }}>
                <Button
                  type="submit"
                  sx={{
                    width: "100px",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    boxShadow: "none",
                    borderRadius: 1,
                    color: "#fff",
                  }}
                  variant="contained"
                >
                  Finalizar
                </Button>
              </Box>
            </Form>
          </Box>
        </Product_Modal>
      </>
    </Box>
  )
}