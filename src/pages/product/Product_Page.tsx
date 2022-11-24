import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { Button } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { Box } from "@mui/system";
import { FormHandles } from "@unform/core";
import { AxiosError } from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { ProductPageSkeleton, Product_Modal, Register_Product_Form, SearchInput } from "../../shared/components";
import { Product_Table } from "../../shared/components/table/product-table";
import { ContentLayout } from "../../shared/layout";
import { IProduct, ISendPagination, Product_Service } from "../../shared/service/api/products";
import "./style.css";

export const ProductRegisterSchema: Yup.Schema<IProduct> = Yup.object().shape({
    productReferenceId: Yup.string().required("Campo Obrigatório"),
    codesRFID:          Yup.array().min(1).required(),
    supplierId:         Yup.string().required("Campo Obrigatório"),
    price:              Yup.number().typeError("Preencher com números").min(0).required("Campo Obrigatório"),
    description:        Yup.string().required("Campo Obrigatório"),

    type:               Yup.string().required("Campo Obrigatório"),
    genre:              Yup.string().required("Campo Obrigatório"),
    color:              Yup.string().required("Campo Obrigatório"),
    size:               Yup.string().required("Campo Obrigatório"),
    quantity:           Yup.number().typeError("Preencher com números").min(0).required("Campo Obrigatório"),
});

export const Product_Page = () => {

    const formRef = useRef<FormHandles>(null);
    const [rows, setRows] = useState<IProduct[]>([]);

    //gerenciar o loading
    const [loading, setLoading] = useState(true);

    //gerencia o modal de registro
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    //gerenciar paginas
    const [pages, setPages] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(20);
    const [actualpage, setActualPage] = useState<number>(0);
    const [selectContent, setSelectContent] = useState("");//não foi colocado esse componente ainda

    const [value, setValue] = useState<string>("");

    const ProductPaginationConf: ISendPagination = {
        page: actualpage,
        pageSize: pageSize,
        param: "name",
        sortDiresction: "DESC",
        sortField: "name",
        value: value,
    };

    const update = () => {
        Product_Service.getAll(ProductPaginationConf).then((result) => {
            if (result instanceof Error) {
                alert(result.message);
            } else {
                setLoading(false);
                setPages(result.data.numberOfPages);
                setRows(result.data.data);
            }
        });
    };

    const handleChangeArrow = (
        event: React.ChangeEvent<unknown>, value: number
    ) => {
        setActualPage(value - 1);
    };

    const selectChangePage = (event: SelectChangeEvent) => {
        setSelectContent(event.target.value as string);
        const translate = parseInt(event.target.value as string);
        setActualPage(0);
        setPageSize(translate);
    };
    
    useEffect(() => {
        update();
    }, [value, actualpage, pageSize]);

    return (
        <ContentLayout tittle={"Produtos"}>
            <Box
                mb={"20px"}
                justifyContent={"flex-end"}
                display={"flex"}
                alignItems={"center"}
            >
                <Box mr={5} width={300}>
                    <SearchInput change={(value) => { setValue(value.target.value); }} />
                </Box>
                <Button variant="contained" onClick={handleOpen}>
                    <AddBoxOutlinedIcon sx={{ pr: 1 }} /> Cadastrar Produto
                </Button>
            </Box>
            <Box height={"100%"}>
                { loading ? <ProductPageSkeleton/> :
                    <Product_Table
                        // vai ser handleEdit saveProduct={handleSave}
                        update={update}
                        lista={rows}
                        actualpage={actualpage + 1}
                        handleChangeArrow={()=>handleChangeArrow}
                        pages={pages}
                    />}
            </Box>
            <Product_Modal closeModal={handleClose} outState={open}>
                <Register_Product_Form
                    RegisterClose={handleClose}
                    update={update}
                />
            </Product_Modal>
        </ContentLayout>
    );
};