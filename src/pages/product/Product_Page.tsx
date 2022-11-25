import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { Button, FormControl, InputLabel, MenuItem, Pagination, Typography } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Box } from "@mui/system";
import { FormHandles } from "@unform/core";
import { useEffect, useRef, useState } from "react";
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
    quantity:           Yup.number().typeError("Preencher com números").min(0).required("Campo Obrigatório")
        .test(
            "ok",
            "inválido",
            function(value){
                const { codesRFID } = this.parent;
                return Object.keys(codesRFID).length <= value ? true : false;
            }   
        ),
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
    const [size, setSize] = useState<number>(6);
    const [pageSize, setPageSize] = useState<number>(size);
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

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setActualPage(value - 1);
    };

    const changeSize = (event: SelectChangeEvent) => {
        setSize(Number(event.target.value));
        setPageSize(Number(event.target.value));
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
                <Box sx={{ minWidth: 120,  mr: 5}}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Items</InputLabel>
                        <Select
                            size="small"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={String(size)}
                            label="Items"
                            onChange={changeSize}
                        >
                            <MenuItem value={6}>6</MenuItem>
                            <MenuItem value={12}>12</MenuItem>
                            <MenuItem value={20}>20</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Button variant="contained" onClick={handleOpen}>
                    <AddBoxOutlinedIcon sx={{ pr: 1 }} /> Cadastrar Produto
                </Button>
            </Box>
            <Box height={"100%"}>
                {loading ? <ProductPageSkeleton/> :
                    <Product_Table
                        update={update}
                        lista={rows}
                        actualpage={actualpage + 1}
                        handleChangeArrow={()=>handleChangeArrow}
                        pages={pages}
                    />
                }
                <Box
                    sx={{
                        width: "100%",
                        marginTop: 2,
                        display:"flex",
                        justifyContent:"center"
                    }}
                >
                    <Pagination
                        count={pages}
                        shape="rounded"
                        onChange={handleChange}
                    />
                </Box>
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