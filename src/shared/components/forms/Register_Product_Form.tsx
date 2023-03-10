import { Box, FormControl, Button, Divider, Chip, ImageList, Typography } from "@mui/material";
import { Form } from "@unform/web";
import { FormInput } from "./input";
import React, { useRef, useState } from "react";
import { FormHandles } from "@unform/core";
import { IProduct, Product_Service } from "../../service/api";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import "./register_Product.css";
import { Register_RFID, RFID_List } from "../RFID";
import { AxiosError } from "axios";
import { ProductRegisterSchema } from "../../../pages";
import Yup from "yup";
import { Notification } from "../notifications/Notifications";

export const Register_Product_Form: React.FC<{RegisterClose: ()=> void, update: ()=> void}> = ({
    RegisterClose,
    update
}) => {
    
    //props form
    const formRef = useRef<FormHandles>(null);
    //gerenciar modal RFID
    const [RFID, setRFID] = useState<boolean>(false);
    const handleOpenRFID = () => {
        setRFID(true);
    };
    const handleCloseRFID = () => {
        setRFID(false);
    };
    //salvar info do form RFID
    const [RFIDColection, setRFIDColection] = useState<RFID_List>([]);

    //seta a coleção deste componente através do filho
    const setFatherColection = (e: RFID_List) => {
        setRFIDColection(e);
    };

    //salva o produto
    const handleSave = (dados: IProduct) => {
        ProductRegisterSchema
            .validate(dados, { abortEarly: false })
            .then((dadosValidados) => {
                Product_Service.Create(dadosValidados).then((result) => {
                    if (result instanceof AxiosError) {
                        Notification(result.response?.data.message, "error");
                    }
                    else {
                        Notification(result.message, "success");
                        RegisterClose();
                        update();
                    }
                });
            })
            .catch((erros: Yup.ValidationError) => {
                const validandoErros: { [key: string]: string } = {};
                erros.inner.forEach((erros) => {
                    if (!erros.path) return;
                    validandoErros[erros.path] = erros.message;
                    Notification(erros.message, "error");
                });
                formRef.current?.setErrors(validandoErros);
            });
    };

    const [quantidade, setQuantidade] = useState<string>("");

    return (

        <>
            <Form
                ref={formRef}
                className="product-form"
                onSubmit={(dados) => {
                    dados.codesRFID = RFIDColection;
                    handleSave(dados);
                }}
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
                            borderRadius: "4px",
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
                        {/* box do formulário começa aqui */}
                        <Box className="form"
                            sx={{
                                width: "90%",
                                maxHeight: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center"
                                //bgcolor: "#788",
                            }}
                        >
                            <FormControl sx={{ margin: 1 }} size="small" className="input">
                                <FormInput
                                    error
                                    name="description"
                                    type="text"
                                    label="Nome do Produto"
                                />
                            </FormControl>

                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
                                    <FormControl sx={{ margin: 1, borderRadius: 1 }} size="small" className="input">
                                        <FormInput
                                            name="quantity"
                                            type="text"
                                            label="Quantidade"
                                        />
                                    </FormControl>

                                    <FormControl sx={{ margin: 1, borderRadius: 1 }} size="small" className="input">
                                        <FormInput
                                            name="productReferenceId"
                                            type="text"
                                            label="Id de referência"
                                        />
                                    </FormControl>


                                    <FormControl sx={{ margin: 1, borderRadius: 1 }} size="small" className="input">
                                        <FormInput
                                            name="size"
                                            type="text"
                                            label="Tamanho"
                                        />
                                    </FormControl>

                                    <FormControl sx={{ margin: 1, borderRadius: 1 }} size="small" className="input">
                                        <FormInput
                                            name="color"
                                            type="text"
                                            label="Cor"
                                        />
                                    </FormControl>
                                </Box>

                                <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
                                    <FormControl sx={{ margin: 1, borderRadius: 1 }} size="small" className="input">
                                        <FormInput
                                            name="price"
                                            type="number"
                                            label="Preço"
                                        />
                                    </FormControl>

                                    <FormControl sx={{ margin: 1, borderRadius: 1 }} size="small" className="input">
                                        <FormInput
                                            name="supplierId"
                                            type="text"
                                            label="Id de fornecimento"
                                        />
                                    </FormControl>

                                    <FormControl sx={{ margin: 1, borderRadius: 1 }} size="small" className="input">
                                        <FormInput
                                            name="genre"
                                            type="text"
                                            label="Genero"
                                        />
                                    </FormControl>

                                    <FormControl sx={{ margin: 1, borderRadius: 1 }} size="small" className="input">
                                        <FormInput
                                            name="type"
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
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}>
                                <Box
                                    sx={{
                                        margin: 1,
                                        height: "80%",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Button
                                        onClick={
                                            () => {
                                                handleOpenRFID() ;
                                            }
                                        }
                                        variant={"contained"}
                                        sx={{
                                            fontSize: "11px",
                                            width: 110,
                                            height: 40,
                                        }}
                                    >
                                        <Typography fontSize={12} color={"#FFF"}>Cadastrar RFID</Typography>
                                    </Button>

                                    <Box
                                        sx={{
                                            bgcolor: "#D9D9D9",
                                            height: 40,
                                            width: 60,

                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",

                                            borderRadius: "4px",
                                        }}
                                    >
                                        <Typography>nº : {RFIDColection.length}</Typography>
                                    </Box>
                                </Box>

                                <ImageList
                                    cols={1}
                                    sx={{
                                        borderRadius: "4px",
                                        alignItems: "flex-start",
                                        margin: 1,
                                        alignContent:"center",
                                        width: "60%",
                                        height: 100,
                                        bgcolor: "#F4F4F4",
                                        overflowY: "scroll",
                                        "::-webkit-scrollbar": {
                                            width: "20px",
                                        },
                                        "::-webkit-scrollbar-track": {
                                            backgroundColor: "transparent"
                                        },
                                        "::-webkit-scrollbar-thumb": {
                                            backgroundColor: "#d6dee1",
                                            borderRadius: "20px",
                                            border: "6px solid transparent",
                                            backgroundClip: "content-box",
                                        },
                                        "::-webkit-scrollbar-thumb:hover": {
                                            backgroundColor: "#a8bbbf"
                                        },
                                    }}
                                >
                                    {RFIDColection.map((row) => (
                                        <Chip
                                            key={row}
                                            sx={{
                                                bgcolor: "#F4F4F4",
                                            }}
                                            label={row}
                                        />
                                    ))}
                                </ImageList>
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
                            onClick={()=>{handleCloseRFID();}}
                        >
                                Finalizar
                        </Button>
                    </Box>
                </Box>
            </Form>

            <Register_RFID
                setFatherList={setFatherColection}
                handleClose={handleCloseRFID}
                open={RFID}
            />
        </>
    );
};
