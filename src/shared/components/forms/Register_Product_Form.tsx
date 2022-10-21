import { Box, FormControl, InputLabel, Button, Divider } from "@mui/material"
import { Form } from "@unform/web"
import { FormInput } from "./input"
import { useRef } from "react"
import { FormHandles } from "@unform/core"
import { IProduct } from "../../service/api"
import UploadFileIcon from '@mui/icons-material/UploadFile';
import "./register_Product.css"

export const Register_Product_Form: React.FC<{
    saveProduct: (e: IProduct) => void
}> = ({
    saveProduct
}) => {
        //props form
        const formRef = useRef<FormHandles>(null)

        return (

            <Form
                ref={formRef}
                className="product-form"
                onSubmit={(dados) => saveProduct(dados)}
            >
                <Box className="tittle">
                    Cadastrar
                </Box>
                <Divider flexItem />
                <Box className="form_box">
                    <Box className="container da imagem e form"
                        bgcolor={"#fff"}
                        display={"flex"}
                        flexDirection={"row"}
                        alignItems={"center"}
                    >
                        <Box className="imagem"
                            sx={{
                                minWidth: {
                                    sm: 100,
                                    md: 300,
                                    xl: 300,
                                },
                                height: {
                                    sm: 100,
                                    md: 300,
                                    xl: 300,
                                },
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                bgcolor:"#D9D9D9",
                                margin:6
                            }}
                        >
                            <Button
                                type="submit"
                                variant="contained"
                            >
                                <UploadFileIcon />Upload
                            </Button>

                        </Box>
                        <Box
                        sx={{
                            height: {
                                sm: 100,
                                md: 300,
                                xl: 300,
                            },
                            width:"100%",
                        }}
                        >
                            <Box className="form"
                                sx={{
                                    width:"90%",
                                    display:"flex",
                                    flexDirection:"column",
                                    padding:1
                                }}
                                // bgcolor={"#ccc"}
                            >
                                <FormControl size="small" className="input">
                                    <InputLabel>Nome do Produto</InputLabel>
                                    <FormInput
                                        name="info"
                                        type="text"
                                        label="Nome do Produto"
                                    />
                                </FormControl>

                                <Box sx={{display:"flex"}}>
                                    <Box sx={{display:"flex", flexDirection:"column"}}>
                                        <FormControl size="small" className="input">
                                            <InputLabel>Quantidade</InputLabel>
                                            <FormInput
                                                name="Quantidade"
                                                type="text"
                                                label="Quantidade"
                                            />
                                        </FormControl>

                                        <FormControl size="small" className="input">
                                            <InputLabel>Id da compania</InputLabel>
                                            <FormInput
                                                name="companyId"
                                                type="text"
                                                label="Id da compania"
                                            />
                                        </FormControl>


                                        <FormControl size="small" className="input">
                                            <InputLabel>Tamanho</InputLabel>
                                            <FormInput
                                                name="Tamanho"
                                                type="text"
                                                label="Tamanho"
                                            />
                                        </FormControl>

                                        <FormControl size="small" className="input">
                                            <InputLabel>Cor</InputLabel>
                                            <FormInput
                                                name="Cor"
                                                type="text"
                                                label="Cor"
                                            />
                                        </FormControl>

                                    </Box>

                                    <Box  sx={{display:"flex", flexDirection:"column"}}>
                                        <FormControl size="small" className="input">
                                            <InputLabel>Preço</InputLabel>
                                            <FormInput
                                                name="price"
                                                type="number"
                                                label="Preço"
                                            />
                                        </FormControl>

                                        <FormControl size="small" className="input">
                                            <InputLabel>Id de fornecimento</InputLabel>
                                            <FormInput
                                                name="supplierId"
                                                type="text"
                                                label="Id de fornecimento"
                                            />
                                        </FormControl>

                                        <FormControl size="small" className="input">
                                            <InputLabel>Genero</InputLabel>
                                            <FormInput
                                                name="Genero"
                                                type="text"
                                                label="Genero"
                                            />
                                        </FormControl>

                                        <FormControl size="small" className="input">
                                            <InputLabel>Tipo</InputLabel>
                                            <FormInput
                                                name="Tipo"
                                                type="text"
                                                label="Tipo"
                                            />
                                        </FormControl>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Divider flexItem />
                <Box className="foot">
                    <Box p={2}>
                        <Button
                            type="submit"
                            variant="contained"
                        >
                            Finalizar
                        </Button>
                    </Box>
                </Box>
            </Form>

        )
    }
