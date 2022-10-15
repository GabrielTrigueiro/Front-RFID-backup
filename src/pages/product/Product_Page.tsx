import { Box } from "@mui/system"
import { FormInput, Product_Modal, SearchInput } from "../../shared/components"
import { ContentLayout } from "../../shared/layout"
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { Button, FormControl, InputLabel, CircularProgress, Stack, Pagination, Divider, Typography, Stepper, Step, StepLabel } from "@mui/material";
import { useEffect, useRef, useState, useContext } from "react";
import { Product_Table } from "../../shared/components/table/product-table";
import { IProduct, ISendPagination, Product_Service, TAllProducts } from "../../shared/service/api/products";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import "./style.css"
import { Snack, SnackbarContext } from "../../shared/context/AlertCardContext";
import { AxiosError } from "axios";

export const ProductRegisterSchema: Yup.SchemaOf<IProduct> = Yup.object().shape({
  id: Yup.string(),
  productReferenceId: Yup.string().required("Campo Obrigatório"),
  codeRFID: Yup.string().required("Campo Obrigatório"),
  companyId: Yup.string().required("Campo Obrigatório"),
  supplierId: Yup.string().required("Campo Obrigatório"),
  price: Yup.number().required("Campo Obrigatório"),
  //isActive: Yup.boolean(),
  description: Yup.string().required("Campo Obrigatório"),
  info: Yup.string().required("Campo Obrigatório"),
})

export const Product_Page = () => {

  const { setSnack } = useContext(SnackbarContext)
  const formRef = useRef<FormHandles>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [rows, setRows] = useState<IProduct[]>([])
  //gerencia o modal de registro
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  //gerenciar paginas
  const [pages, setPages] = useState<number>(0)
  const [pageSize, setPageSize] = useState<number>(20)
  const [actualpage, setActualPage] = useState<number>(0)
  const [value, setValue] = useState<string>("")
  const [selectContent, setSelectContent] = useState('')//não foi colocado esse componente ainda
  let ProductPaginationConf: ISendPagination = {
    page: actualpage,
    pageSize: pageSize,
    param: "name",
    sortDiresction: "DESC",
    sortField: "name",
    value: value,
  }
  //gerenciar steps
  const steps = ['Upload da foto', 'Informações do produto']
  const [activeStep, setActiveStep] = useState(0)
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const update = () => {
    Product_Service.getAll(ProductPaginationConf).then((result) => {
      if (result instanceof Error) {
        alert(result.message);
      } else {
        setIsLoading(false);
        setPages(result.data.numberOfPages)
        setRows(result.data.data);
      }
    });
  }

  const handleChangeArrow = (
    event: React.ChangeEvent<unknown>, value: number
  ) => {
    setActualPage(value - 1)
  }

  const selectChangePage = (event: SelectChangeEvent) => {
    setSelectContent(event.target.value as string);
    const translate = parseInt(event.target.value as string)
    setActualPage(0)
    setPageSize(translate)
  }

  //func para registrar produto
  const handleSave = (dados: IProduct) => {
    console.log(dados)
    ProductRegisterSchema
      .validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        Product_Service.Create(dadosValidados).then((result) => {
          if(result instanceof AxiosError){
            console.log(result.response?.data.message,)
            setSnack(new Snack({
              message: result.response?.data.message,
              color: 'error',
              open: true
            }))
          }else{
            setSnack(new Snack({
              message: "Produto cadastrado com sucesso",
              color: 'success',
              open: true
            }))
            handleClose()
            update()
          }
        })
      })
      .catch((erros: Yup.ValidationError) => {
        const validandoErros: { [key: string]: string } = {}
        erros.inner.forEach(erros => {
          if (!erros.path) return
          validandoErros[erros.path] = erros.message
        })
        formRef.current?.setErrors(validandoErros)
      })
  }

  useEffect(() => {
    update();
  }, [value, actualpage, pageSize])

  return (
    <ContentLayout tittle={'Produtos'}>
      <Box
        mb={'20px'}
        justifyContent={'flex-end'}
        display={'flex'}
        alignItems={'center'}
      >
        <Box mr={5} width={300}>
          <SearchInput />
        </Box>
        <Button variant="contained" onClick={handleOpen}>
          <AddBoxOutlinedIcon sx={{ pr: 1 }} /> Cadastrar Produto
        </Button>
      </Box>
      <Box sx={{ height: 420, width: '100%' }}>
        <Product_Table update={update} lista={rows} />
      </Box>
      <Box display="flex" justifyContent="flex-end" mt={1}>
        <Stack>
          <Pagination
            count={pages}
            variant="outlined"
            shape="circular"
            page={actualpage + 1}
            onChange={handleChangeArrow}
          />
        </Stack>
      </Box>

      <Product_Modal closeModal={handleClose} outState={open}>
        <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p:1
        }}
        flex={1}>
          <Typography>Cadastrar</Typography>
        </Box>
        <Divider />

        <Box flex={6}>
          <Form
            ref={formRef}
            onSubmit={(values) => handleSave(values)}
            className="product-form"
          >
            <Box sx={{p:1, width:"100%"}}>
              <FormControl sx={{width:"100%"}}>
                <InputLabel>Nome do Produto</InputLabel>
                <FormInput
                  name="info"
                  type="text"
                  label="Nome do Produto"
                />
              </FormControl>
            </Box>

            <FormControl sx={{p:1, width:"100%"}}>
                <InputLabel>Id de Referência</InputLabel>
                <FormInput
                  name="productReferenceId"
                  type="text"
                  label="Id de Referência"

                />
              </FormControl>

            <Box sx={{p:1, display:"flex", justifyContent:"space-between", width:"100%"}}>
              <FormControl sx={{width:"49%"}}>
                <InputLabel>RFID</InputLabel>
                <FormInput
                  name="codeRFID"
                  type="text"
                  label="RFID"

                />
              </FormControl>
              <FormControl sx={{width:"49%"}}>
                <InputLabel>Preço</InputLabel>
                <FormInput
                  name="price"
                  type="number"
                  label="Preço"
                />
              </FormControl>
            </Box>
            <Box sx={{p:1, display:"flex", justifyContent:"space-between", width:"100%"}}>
              <FormControl  sx={{width:"49%"}}>
                <InputLabel>Id da compania</InputLabel>
                <FormInput
                  name="companyId"
                  type="text"
                  label="Id da compania"
                />
              </FormControl>
              <FormControl  sx={{width:"49%"}}>
                <InputLabel>Id de fornecimento</InputLabel>
                <FormInput
                  name="supplierId"
                  type="text"
                  label="Id de fornecimento"
                />
              </FormControl>
            </Box>
            <Box sx={{p:1, width:"100%"}}>
              <FormControl sx={{width:"100%"}}>
                <InputLabel>Descrição</InputLabel>
                <FormInput
                  multiline
                  maxRows={4}
                  sx={{
                    height: 130,
                    display:"flex",
                    alignItems:"flex-start"
                  }}
                  name="description"
                  type="text"
                  label="Descrição"
                />
              </FormControl>
            </Box>
            <Divider flexItem/>
            <Box
            sx={{
              p:1,
              width:"100%",
              display:"flex",
              justifyContent:"flex-end",
              alignItems:"center"
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
    </ContentLayout>
  )
}