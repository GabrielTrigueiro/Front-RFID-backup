import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import {
    Button, Checkbox, CircularProgress, FormControl, FormControlLabel, FormGroup, InputAdornment
} from "@mui/material";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import * as Yup from "yup";
import { FormInput, Notification } from "../../shared/components";
import { useAuthContext } from "../../shared/context/AuthContext";
import { Card_Page_Layout } from "../../shared/layout/Card_Page_layout";
import "./style.css";

//dados pro login
interface State {
  password: string;
  usuario: string;
}

//pagina de login
export const Login: React.FC = () => {
    const { isAuthenticated, login } = useAuthContext();
    const timer = useRef<number>();
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const formRef = useRef<FormHandles>(null);
    const [values, setValues] = useState({
        password: "",
        usuario: "",
        showPassword: false,
    });

    //on/off mostrar senha
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    //loading ao clicar no botã-o de logar
    const handleButtonClick = () => {
        if (!loading) {
            setSuccess(false);
            setLoading(true);
            timer.current = window.setTimeout(() => {
                setSuccess(true);
                setLoading(false);
            }, 2000);
        }
    };

    //atualizar loading
    useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    //yup
    const schema: Yup.Schema<State> = Yup.object().shape({
        usuario:
      Yup.string()
          .required("Usuário obrigatório")
          .min(6, "Usuário mínimo 6 digitos"),
        password:
      Yup.string()
          .required("Senha obrigatória")
          .min(4, "Senha mínimo 4 digitos")
    });

    //login
    const HandleLogin = (dados: State) => {
        schema
            .validate(dados, { abortEarly: false })
            .then((dadosValidados) => {
                login(dados.usuario, dados.password);
                handleButtonClick();
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

    //auth? redirecionado, caso não continua na tela
    if (isAuthenticated) return <Navigate replace to="/home/dashboard" />;
    return (
        <Card_Page_Layout tittle="Login">
            <Form
                ref={formRef}
                onSubmit={(dados) => HandleLogin(dados)}
                className="form-login"
            >
                <FormControl
                    sx={{ marginTop: "10px", "& fieldset": {border: 1, borderColor: "#6B6B6B"}}}
                    className="form-item"
                >
                    <FormInput
                        sx={{"& fieldset": { border: "-moz-initial" },}}
                        name="usuario"
                        autoComplete="off"
                        type={"text"}
                        label="Usuário"
                        value={values.usuario}
                        onChange={handleChange("usuario")}
                        
                        endAdornment={
                            <InputAdornment position="end">
                                <PersonOutlineOutlinedIcon />
                            </InputAdornment>
                        }
                    />
                </FormControl>

                <FormControl
                    sx={{ marginTop: "10px", "& fieldset": {border: 1, borderColor: "#6B6B6B"}}}
                    className="form-item"
                >
                    <FormInput
                        sx={{"& fieldset": { border: "-moz-initial" },}}
                        name="password"
                        autoComplete="off"
                        id="outlined-adornment-password"
                        type={values.showPassword ? "text" : "password"}
                        value={values.password}
                        onChange={handleChange("password")}
                        endAdornment={
                            <InputAdornment position="end">
                                <LockOutlinedIcon />
                            </InputAdornment>
                        }
                        label="senha"
                    />
                </FormControl>

                <FormGroup sx={{ alignSelf: "start", marginLeft: 2.5 }}>
                    <FormControlLabel
                        control={<Checkbox onChange={handleClickShowPassword} />}
                        label={"Mostrar Senha"} />
                </FormGroup>

                <Button
                    type="submit"
                    disabled={loading}
                    sx={{
                        mt: 2,
                        width: "90%",
                        fontSize: "20px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        boxShadow: "none",
                        borderRadius: 1,
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    variant="contained"
                >
          Login
                    {loading && (
                        <CircularProgress
                            size={24}
                            sx={{
                                color: "#23A0C9",
                            }}
                        />
                    )}
                </Button>
            </Form>
        </Card_Page_Layout>


    );
};
