import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import { Button } from "@mui/material"
import { SelectChangeEvent } from '@mui/material/Select'
import { Box } from "@mui/system"
import { FormHandles } from "@unform/core"
import { AxiosError } from "axios"
import { useContext, useEffect, useRef, useState } from "react"
import * as Yup from "yup"
import { Product_Modal, Register_Product_Form, SearchInput } from "../../shared/components"
import { Product_Table } from "../../shared/components/table/product-table"
import { Snack, SnackbarContext } from "../../shared/context/AlertCardContext"
import { ContentLayout } from "../../shared/layout"
import { IProduct, ISendPagination, Product_Service } from "../../shared/service/api/products"
import "./style.css"

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
  const [selectContent, setSelectContent] = useState('')//não foi colocado esse componente ainda

  const [value, setValue] = useState<string>("");
  let ProductPaginationConf: ISendPagination = {
    page: actualpage,
    pageSize: pageSize,
    param: "name",
    sortDiresction: "DESC",
    sortField: "name",
    value: value,
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
    })
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
          if (result instanceof AxiosError) {
            console.log(result.response?.data.message,)
            setSnack(new Snack({
              message: result.response?.data.message,
              color: 'error',
              open: true
            }))
          } else {
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
          <SearchInput change={(value) => { setValue(value.target.value) }} />
        </Box>
        <Button variant="contained" onClick={handleOpen}>
          <AddBoxOutlinedIcon sx={{ pr: 1 }} /> Cadastrar Produto
        </Button>
      </Box>
      <Box sx={{ height: '100%', width: '100%' }}>
        <Product_Table
          saveProduct={handleSave}
          update={update}
          lista={rows}
          actualpage={actualpage + 1}
          handleChangeArrow={()=>handleChangeArrow}
          pages={pages}
        />
      </Box>
      <Product_Modal closeModal={handleClose} outState={open}>
        <Register_Product_Form saveProduct={handleSave}/>
      </Product_Modal>
    </ContentLayout>
  )
}