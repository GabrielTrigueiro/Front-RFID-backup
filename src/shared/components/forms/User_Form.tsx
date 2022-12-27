import { FormControl, Button, Box, Divider, styled } from "@mui/material";
import { Form } from "@unform/web";
import { FormInput } from "./input";
import { useEffect, useRef } from "react";
import { FormHandles } from "@unform/core";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { TesteSelect } from "./input/testeSelect";
import { User_Service } from "../../service/api";
import { Notification } from "../notifications";
import { AxiosError } from "axios";
import * as Yup from "yup";

//dados novo usario
export interface newUser_data {
    username:   string
    password:   string
    role:      string[]
}

export const UserRegisterSchema: Yup.Schema<newUser_data> = Yup.object().shape({
    username:   Yup.string().required(),
    password:   Yup.string().required(),
    role:       Yup.array().required()
});

export const User_Form: React.FC<{
    update: () => void
    fechar: () => void
}> = ({update, fechar}) => {

    const formRef = useRef<FormHandles>(null);

    //salva o usuário
    const saveUser = (e: any) => {
        UserRegisterSchema
            .validate(e, { abortEarly: false })
            .then((dadosValidados) => {
                User_Service.Create(dadosValidados).then((result) => {
                    if (result instanceof AxiosError) {
                        Notification(result.response?.data.message, "error");
                    }
                    else {
                        Notification(result.message, "success");
                        fechar();
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

    useEffect(() => {
        update();
    },[]);

    const StyledFormControl = styled(FormControl)({
        width: 200,
    });

    const StyledInputContainer = styled(Box)({
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        height: 180,
        // background: "#000"
    });

    const StyledFormContainer = styled(Box)({
        flex: 1,    
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center"
    });

    return (
        <Form
            style={{
                height: "100%",
                display: "flex",
                flexDirection: "column"
            }}
            ref={formRef}
            onSubmit={(dados) => {
                const novo = {password: dados.password, username: dados.username, role: [dados.role], roles: [dados.role]};
                // console.log(novo);
                saveUser(novo);
            }}
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
            <StyledFormContainer>
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
                        <UploadFileIcon/>Upload
                    </Button>

                </Box>
                {/* box do formulário começa aqui */}
                <StyledInputContainer>
                    <StyledFormControl>
                        <FormInput
                            error
                            name="username"
                            type="text"
                            label="Nome de usuário"
                        />
                    </StyledFormControl>

                    <StyledFormControl>
                        <FormInput
                            error
                            name="password"
                            type="text"
                            label="Repetir senha"
                        />
                    </StyledFormControl>

                    <StyledFormControl>
                        <TesteSelect
                            name="role"
                        />
                    </StyledFormControl>
                </StyledInputContainer>
            </StyledFormContainer>

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