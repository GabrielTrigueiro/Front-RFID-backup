import { Typography, FormControl, InputLabel, InputAdornment, OutlinedInput, Button } from "@mui/material"
import { Form } from "@unform/web"
import { FormInput } from "./input"
import { FormSelect } from "./input/FormSelect"
import { useContext, useRef, useState } from "react"
import { FormHandles } from "@unform/core"
import * as Yup from "yup"
import { AxiosError } from "axios"
import { IUser, User_Service } from "../../service/api"
import { Snack, SnackbarContext } from "../../context"

//dados novo usario
export interface newUser_data {
    username:   string
    password:   string
    roles:     string
}

//avaliar erros de preenchimento ao criar user
const UserRegisterSchema: Yup.SchemaOf<newUser_data> = Yup.object().shape({
    username:   Yup.string().required("Campo Obrigatório"),
    password:   Yup.string().required("Campo Obrigatório"),
    roles:      Yup.string().required("Campo Obrigatório"),
})

export const User_Form: React.FC<{
    update: () => void
}> = ({update}) => {

    //prop do form
    const formRef = useRef<FormHandles>(null)

    //state para guardar novos usuários
    const [newUser, setNewUser] = useState<newUser_data>({
        password:"",
        roles:"",
        username:"",
    })

    //func para mudar valor de newUser ao digitar
    const handleChange = (prop: keyof newUser_data) => (
        event: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser({ ...newUser, [prop]: event.target.value })
    }

    //func para usar o toast Alert
    const { setSnack } = useContext(SnackbarContext)

    //func para registrar usuário
    const handleSave = (dados: newUser_data) => {
        console.log(dados)
        UserRegisterSchema
        .validate(dados, { abortEarly: false })
        .then((dadosValidados) => {
          User_Service.Create(dadosValidados).then((result) => {
            if (result instanceof AxiosError) {
              console.log(result.response?.data.message,)
              setSnack(new Snack({
                message: result.response?.data.message,
                color: 'error',
                open: true
              }))
            } else {
              setSnack(new Snack({
                message: "Produto cadastrado com sucesso",
                color: 'success',
                open: true
              }))
              //handleClose()
              update()
            }
          })
        })
        .catch((erros: Yup.ValidationError) => {
          const validandoErros: { [key: string]: string } = {}
          erros.inner.forEach(erros => {
            if (!erros.path) return
            validandoErros[erros.path] = erros.message
          })
          formRef.current?.setErrors(validandoErros)
        })
    }

    return (
        <Form
            className="form-cadastro"
            ref={formRef}
            onSubmit={(dados) => {
                console.log(dados); 
                handleSave(dados)
            }}
        >
            <Typography
                fontSize={21}
                fontWeight={500}
            >
                Cadastrar Usuário
            </Typography>
            <FormControl
                className="form-item"
                sx={{ mt: '10px' }}
            >
                <InputLabel htmlFor="outlined-adornment-user">Usuário</InputLabel>
                <FormInput
                    name="usuario"
                    autoComplete="off"
                    type={"text"}
                    label="Usuário"
                    value={"username"}
                    // endAdornment={
                    //     <InputAdornment position="end">
                    //         <PersonOutlineOutlinedIcon />
                    //     </InputAdornment>
                    // }
                />
            </FormControl>
            <FormControl
                sx={{ marginTop: '10px' }}
                className="form-item"
            >
                <InputLabel htmlFor="outlined-adornment-password">
                    Senha
                </InputLabel>
                <FormInput
                    name="password"
                    autoComplete="off"
                    id="outlined-adornment-password"
                    label="Senha"
                    value={"password"}
                    // endAdornment={
                    //     <InputAdornment position="end">
                    //         <LockOutlinedIcon />
                    //     </InputAdornment>
                    // }
                />
            </FormControl>
            <FormControl
                className="form-item" sx={{ marginTop: "10px" }}>
                <FormSelect name="authority" />
            </FormControl>
            <Button
            type="submit"
            >
                Registrar
            </Button>
        </Form> 
    )
}