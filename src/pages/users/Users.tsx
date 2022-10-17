import { Box, Button, CircularProgress, FormControl, InputAdornment, InputLabel, OutlinedInput, Typography } from "@mui/material"
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { useRef, useState, useEffect } from "react";
import { BaseModal, FormInput, UserTable } from "../../shared/components"
import { FormSelect } from "../../shared/components/forms/input/FormSelect";
import { ContentLayout } from "../../shared/layout"
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { ISendPagination, IUser, User_Service } from "../../shared/service/api/users";

//dados novo usario
interface newUser_data {
  username: string
  password: string
  role: string
}

export const Users = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [rows, setRows] = useState<IUser[]>([])

    //gerenciar paginas
    const [pages, setPages] = useState<number>(0)
    const [pageSize, setPageSize] = useState<number>(20)
    const [actualpage, setActualPage] = useState<number>(0)

    const [value, setValue] = useState<string>("");
        let UserPaginationConf: ISendPagination = {
            page: actualpage,
            pageSize: pageSize,
            param: "name",
            sortDiresction: "DESC",
            sortField: "name",
            value: value,
        }

    const update = () => {
        User_Service.getAll(UserPaginationConf).then((result) => {
        if (result instanceof Error) {
            alert(result.message);
        } else {
            setIsLoading(false);
            setPages(result.data.numberOfPages)
            setRows(result.data.data);
        }
        })
    }

    useEffect(() => {
        update();
      }, [value, actualpage, pageSize])
  
    //gerencia o modal de registro
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const [loading, setLoading] = useState(false)
    const formRef = useRef<FormHandles>(null)
    const [values, setValues] = useState({
      password: "",
      usuario: "",
      posicao: ""
    })

    //func duplicada de login, inxutar isso depois
    const handleChange = (prop: keyof newUser_data) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value })
    };

    return (
      <ContentLayout tittle={'Usuários'}>
        
        <Box sx={{mb:'20px', display:'flex', justifyContent:'flex-end'}}>
            <Button variant="contained" onClick={handleOpen}>
                <PersonAddAltIcon sx={{pr:1}}/> Cadastrar Usuário
            </Button>
        </Box>
        <Box>
          <UserTable lista={rows} update={update}/>
        </Box>
        <BaseModal outState={open} closeModal={handleClose}>
            <Form 
                ref={formRef}
                onSubmit={(dados) => console.log(dados)}
                className="form-cadastro"
            >
              <Typography fontSize={40} fontWeight={500}>Cadastrar</Typography>
                <FormControl
                    className="form-item"
                    sx={{mt:'10px'}}
                >
                    <InputLabel htmlFor="outlined-adornment-user">Usuário</InputLabel>
                    <FormInput
                        name="usuario"
                        autoComplete="off"
                        type={"text"}
                        label="Usuário"
                        value={values.usuario}
                        onChange={handleChange("username")}
                        endAdornment={
                            <InputAdornment position="end">
                                <PersonOutlineOutlinedIcon />
                            </InputAdornment>
                        }
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
                        // type={values.showPassword ? "text" : "password"}
                        value={values.password}
                        onChange={handleChange("password")}
                        endAdornment={
                            <InputAdornment position="end">
                                <LockOutlinedIcon />
                            </InputAdornment>
                        }
                        label="Senha"
                    />
                </FormControl>
                <FormControl
                    sx={{ marginTop: '10px' }}
                    className="form-item"
                >
                    <InputLabel htmlFor="outlined-adornment-password">
                        Repetir senha
                    </InputLabel>
                    <OutlinedInput
                        autoComplete="off"
                        id="outlined-adornment-password"
                        value={values.password}
                        onChange={handleChange("password")}
                        endAdornment={
                            <InputAdornment position="end">
                                <LockOutlinedIcon />
                            </InputAdornment>
                        }
                        label="Repetir senha"
                    />
                </FormControl>
                <FormControl 
                    className="form-item" sx={{ marginTop: "10px" }}>
                    <FormSelect name="posicao"/>
                </FormControl>
                <Button
                    type="submit"
                    disabled={loading}
                    sx={{
                        mt: 2,
                        width: '90%',
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
                    Registrar
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
        </BaseModal>
      </ContentLayout>
    )
  }