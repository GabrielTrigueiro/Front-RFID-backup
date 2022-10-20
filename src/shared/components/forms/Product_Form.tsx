import { Box, FormControl, InputLabel, Divider, Button } from "@mui/material"
import { Form } from "@unform/web"
import { FormInput } from "./input"
import { useRef } from "react"
import { FormHandles } from "@unform/core"
import { IProduct } from "../../service/api"

export const Product_Form: React.FC<{
    productData: IProduct,
    editProduct: (e: IProduct)=> void
    saveProduct: (e: IProduct)=> void
}> = ({
    productData,
    editProduct,
    saveProduct
}) => {
    //props form
    const formRef = useRef<FormHandles>(null)

    //func salvar ou editar produto
    const handleSubmit = (e: IProduct) =>{
        if(e.id){
            editProduct(e)
        }else{
            saveProduct(e)
        }
    }

    return (
        <div>
            <Form
                ref={formRef}
                initialData={productData}
                className="product-form"
                onSubmit={(dados) => {
                    dados.id = productData?.id
                    handleSubmit(dados)
                }}
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
        </div>
    )
}
