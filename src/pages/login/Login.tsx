import { VisibilityOff, Visibility } from "@mui/icons-material";
import { Box } from "@mui/system";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import React, { useRef, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import { FormLoginInput } from "../../shared/components";
import "./style.css"
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Navigate } from "react-router-dom";
import {
  Typography,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  Button,
  CircularProgress,
  Grid,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { placeholderAuth } from "../../shared/context/AuthContext";

interface data {
  password: string;
  user: string;
}

export const Login: React.FC = () => {
  const timer = useRef<number>();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const [values, setValues] = useState({
    password: "",
    user: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleChange =
    (prop: keyof data) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

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

  if (placeholderAuth.auth) return <Navigate replace to="/home/dashboard" />;
  return (
    <Box
      height={"100vh"}
      bgcolor={"#23A0C9"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={'center'}
    >
      <Box
        bgcolor={"#fff"}
        sx={{
          height:'600px',
          width:'400px',
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          borderRadius:'10px'
        }}
      >
        <Typography fontSize={40} fontWeight={500}>
          Login
        </Typography>

        <Form
          ref={formRef}
          onSubmit={(dados) => console.log(dados)}
          className="form-login"
        >
          <FormControl
          className="form-item"
          >
            <InputLabel htmlFor="outlined-adornment-user">Usuario</InputLabel>
            <FormLoginInput
              name="usuario"
              autoComplete="off"
              type={"text"}
              label="Usuário"
              value={values.user}
              onChange={handleChange("user")}
              endAdornment={
                <InputAdornment position="end">
                  <PersonOutlineOutlinedIcon />
                </InputAdornment>
              }
            />
          </FormControl>

          <FormControl 
          sx={{marginTop:'20px'}}
          className="form-item"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <FormLoginInput
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
              label="Password"
            />
          </FormControl>

          <FormGroup sx={{alignSelf:'start', marginLeft:2.5}}>
            <FormControlLabel
              control={<Checkbox onChange={handleClickShowPassword}/>}
              label={'Mostrar Senha'}/>
          </FormGroup>

          <Button
            type="submit"
            disabled={loading}
            sx={{
              mt: 2,
              width:'90%',
              fontSize: "20px",
              fontStyle: "normal",
              fontWeight: 500,
              boxShadow: "none",
              borderRadius: 10,
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
                  color: "#E4DB00",
                }}
              />
            )}
          </Button>
        </Form>
      </Box>
    </Box>
  );
};
