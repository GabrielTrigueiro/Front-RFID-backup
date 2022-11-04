import { Box, FormControl, InputLabel, Button, Divider, Chip } from "@mui/material"
import { Form } from "@unform/web"
import { FormInput } from "./input"
import { useEffect, useRef, useState } from "react"
import { FormHandles } from "@unform/core"
import { IProduct } from "../../service/api"
import UploadFileIcon from '@mui/icons-material/UploadFile';
import "./register_Product.css"
import { Register_RFID, RFID_List } from "../RFID"

export const Register_Product_Form: React.FC<{
    saveProduct: (e: IProduct) => void
}> = ({
    saveProduct
}) => {
        //props form
        const formRef = useRef<FormHandles>(null)

        //gerenciar modal RFID
        const [RFID, setRFID] = useState<boolean>(false)
        const handleOpenRFID = () => {
            setRFID(true)
        }
        const handleCloseRFID = () => {
            setRFID(false)
        }

        //salvar info do form RFID
        const [RFIDColection, setRFIDColection] = useState<RFID_List>([])

        const teste = (e: RFID_List) => {
            setRFIDColection(e)
        }

        return (

            <>
                <Form
                    ref={formRef}
                    className="product-form"
                    onSubmit={(dados) => saveProduct(dados)}
                >
                    <Box className="tittle">
                        Cadastrar
                    </Box>
                    <Divider flexItem />
                    <Box className="form_box"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                            flexDirection: "row",
                            width: "100%"
                        }}
                    >
                        <Box className="imagem"
                            sx={{
                                minWidth: {
                                    sm: 100,
                                    md: 350,
                                    xl: 350,
                                },
                                height: {
                                    sm: 100,
                                    md: 350,
                                    xl: 350,
                                },
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                bgcolor: "#D9D9D9",
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
                                height: "100%",
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Box className="form"
                                sx={{
                                    width: "90%",
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center"
                                    //bgcolor: "#788",
                                }}
                            >
                                <FormControl sx={{ margin: 1 }} size="small" className="input">
                                    <InputLabel>Nome do Produto</InputLabel>
                                    <FormInput
                                        name="info"
                                        type="text"
                                        label="Nome do Produto"
                                    />
                                </FormControl>

                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
                                        <FormControl sx={{ margin: 1, borderRadius: 1 }} size="small" className="input">
                                            <InputLabel>Quantidade</InputLabel>
                                            <FormInput
                                                name="Quantidade"
                                                type="text"
                                                label="Quantidade"
                                            />
                                        </FormControl>

                                        <FormControl sx={{ margin: 1, borderRadius: 1 }} size="small" className="input">
                                            <InputLabel>Id de referência</InputLabel>
                                            <FormInput
                                                name="productReferenceId"
                                                type="text"
                                                label="Id de referência"
                                            />
                                        </FormControl>


                                        <FormControl sx={{ margin: 1, borderRadius: 1 }} size="small" className="input">
                                            <InputLabel>Tamanho</InputLabel>
                                            <FormInput
                                                name="Tamanho"
                                                type="text"
                                                label="Tamanho"
                                            />
                                        </FormControl>

                                        <FormControl sx={{ margin: 1, borderRadius: 1 }} size="small" className="input">
                                            <InputLabel>Cor</InputLabel>
                                            <FormInput
                                                name="Cor"
                                                type="text"
                                                label="Cor"
                                            />
                                        </FormControl>
                                    </Box>

                                    <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
                                        <FormControl sx={{ margin: 1, borderRadius: 1 }} size="small" className="input">
                                            <InputLabel>Preço</InputLabel>
                                            <FormInput
                                                name="price"
                                                type="number"
                                                label="Preço"
                                            />
                                        </FormControl>

                                        <FormControl sx={{ margin: 1, borderRadius: 1 }} size="small" className="input">
                                            <InputLabel>Id de fornecimento</InputLabel>
                                            <FormInput
                                                name="supplierId"
                                                type="text"
                                                label="Id de fornecimento"
                                            />
                                        </FormControl>

                                        <FormControl sx={{ margin: 1, borderRadius: 1 }} size="small" className="input">
                                            <InputLabel>Genero</InputLabel>
                                            <FormInput
                                                name="Gênero"
                                                type="text"
                                                label="Genero"
                                            />
                                        </FormControl>

                                        <FormControl sx={{ margin: 1, borderRadius: 1 }} size="small" className="input">
                                            <InputLabel>Tipo</InputLabel>
                                            <FormInput
                                                name="Tipo"
                                                type="text"
                                                label="Tipo"
                                            />
                                        </FormControl>
                                    </Box>
                                </Box>

                                <Box
                                    sx={{
                                        display: "flex",
                                        width: "100%",
                                        justifyContent: "space-evenly",
                                        alignItems: "center",
                                        //bgcolor:"#000",
                                    }}>
                                    <Box
                                        sx={{
                                            height: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Button
                                            onClick={handleOpenRFID}
                                            variant={"contained"}
                                            sx={{
                                                fontSize: "11px",
                                                width: 110,
                                                height: 40,
                                            }}
                                        >
                                            Cadastrar RFID
                                        </Button>

                                        <Box
                                            sx={{
                                                bgcolor: "#D9D9D9",
                                                height: "42px",
                                                width: "62px",
                                            }}
                                        >
                                            nº
                                        </Box>
                                    </Box>

                                    <Box
                                        sx={{
                                            width: "70%",
                                            height: 100,
                                            bgcolor: "#F4F4F4",
                                        }}>
                                        {RFIDColection.map((row) => (
                                            <Chip
                                                key={row}
                                                sx={{ bgcolor: "#F4F4F4" }}
                                                label={row}
                                            />
                                        ))}
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

                <Register_RFID
                    setFatherList={teste}
                    handleClose={handleCloseRFID}
                    open={RFID}
                />
            </>
        )
    }
