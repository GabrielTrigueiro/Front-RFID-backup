import { FormControl, Button, Box, Divider } from "@mui/material";
import { Form } from "@unform/web";
import { FormInput } from "./input";
import { useRef, useState } from "react";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import { AxiosError } from "axios";
import { User_Service } from "../../service/api";
import { Notification } from "../notifications";
import UploadFileIcon from "@mui/icons-material/UploadFile";

//dados novo usario
export interface newUser_data {
    username:   string
    password:   string
    roles:     string
}

//avaliar erros de preenchimento ao criar user
const UserRegisterSchema: Yup.Schema<newUser_data> = Yup.object().shape({
    username:   Yup.string().required("Campo Obrigatório"),
    password:   Yup.string().required("Campo Obrigatório"),
    roles:      Yup.string().required("Campo Obrigatório"),
});

export const User_Form: React.FC<{
    update: () => void
}> = ({update}) => {

    //prop do form
    const formRef = useRef<FormHandles>(null);

    //state para guardar novos usuários
    const [newUser, setNewUser] = useState<newUser_data>({
        password:"",
        roles:"",
        username:"",
    });

    //func para mudar valor de newUser ao digitar
    const handleChange = (prop: keyof newUser_data) => (
        event: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser({ ...newUser, [prop]: event.target.value });
    };

    //func para registrar usuário
    const handleSave = (dados: newUser_data) => {
        console.log(dados);
        UserRegisterSchema
            .validate(dados, { abortEarly: false })
            .then((dadosValidados) => {
                User_Service.Create(dadosValidados).then((result) => {
                    if (result instanceof AxiosError) {
                        console.log(result.response?.data.message,);
                        Notification(result.message, "error");
                    } else {
                        Notification(result.message, "success");
                        //handleClose()
                        update();
                    }
                });
            })
            .catch((erros: Yup.ValidationError) => {
                const validandoErros: { [key: string]: string } = {};
                erros.inner.forEach(erros => {
                    if (!erros.path) return;
                    validandoErros[erros.path] = erros.message;
                });
                formRef.current?.setErrors(validandoErros);
            });
    };

    //#6B6B6B cor imput

    return (
        <Form
            style={{
                height: "100%",
                display: "flex",
                flexDirection: "column"
            }}
            ref={formRef}
            onSubmit={(dados) => {console.log("submit form");}}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    padding: 3,
                }}
            >
                Cadastrar
            </Box>
            <Divider flexItem />

            {/* INPUTS */}
            <Box
                sx={{
                    flex: 1,    
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <Box    
                    sx={{
                        width: 150,
                        height: 150,
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
                <Box>
                    {/* box do formulário começa aqui */}
                    <Box 
                        sx={{
                            display: "flex",
                            flexDirection: "column"
                        }}
                    >
                        <FormControl>
                            <FormInput
                                error
                                name="username"
                                type="text"
                                label="Nome de usuário"
                            />
                        </FormControl>

                        <FormControl>
                            <FormInput
                                error
                                name="password"
                                type="text"
                                label="Senha"
                            />
                        </FormControl>

                        <FormControl>
                            <FormInput
                                error
                                name="password"
                                type="text"
                                label="Repetir senha"
                            />
                        </FormControl>
                    </Box>
                </Box>
            </Box>

            <Divider flexItem />
            
            <Box sx={{padding: 2, display: "flex", justifyContent: "flex-end"}}>
                <Button
                    type="submit"
                    variant="contained"
                >
                        Finalizar
                </Button>
            </Box>
            
        </Form>
    );
};