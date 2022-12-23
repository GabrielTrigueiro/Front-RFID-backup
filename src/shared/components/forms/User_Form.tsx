import { FormControl, Button, Box, Divider } from "@mui/material";
import { Form } from "@unform/web";
import { FormInput } from "./input";
import { useEffect, useRef, useState } from "react";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import { AxiosError } from "axios";
import { User_Service } from "../../service/api";
import { Notification } from "../notifications";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { FormSelect } from "./input/FormSelect";
import { TesteSelect } from "./input/testeSelect";

//dados novo usario
export interface newUser_data {
    username:   string
    password:   string
    roles:      string
}

export const User_Form: React.FC<{
    update: () => void
    listRoles: any

}> = ({update, listRoles}) => {

    //prop do form
    const formRef = useRef<FormHandles>(null);

    useEffect(() => {
        update();
    },[]);

    return (
        <Form
            style={{
                height: "100%",
                display: "flex",
                flexDirection: "column"
            }}
            ref={formRef}
            onSubmit={(dados) => console.log(dados)}
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
                                label="Repetir senha"
                            />
                        </FormControl>

                        <FormControl>
                            <TesteSelect
                                lista={listRoles}
                                name="roles"
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