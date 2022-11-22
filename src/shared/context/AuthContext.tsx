import { AxiosError } from "axios";
import jwtDecode from "jwt-decode";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AuthService } from "../service";
import { Snack, SnackbarContext } from "./AlertCardContext";


//dados user
interface IUser{
    name: string
    sub: string //id
}

//dados Auth
interface IAuthContext{
    isAuthenticated: boolean
    dados?: IUser
    logout: ()=> void
    login: (username:string, password:string) =>
    Promise<string|void>
}

//contexto auth
const AuthContext = createContext({} as IAuthContext);

//var token do local storage
export const AcessToken = "Acess_Token";

export const AuthProvider: React.FC = ({children}) =>{
    const [acessToken, setAcessToken] = useState<string>();
    const [dados, setDados] = useState<IUser>();
    const {setSnack} = useContext(SnackbarContext);

    //atualiza toda vez que o token é mudado e o salva
    useEffect(() => {
        const acessToken = localStorage.getItem(AcessToken);
    
        if (acessToken) {
            setDados(jwtDecode(acessToken));
            setAcessToken(acessToken);
        } else {
            setAcessToken(undefined);
        }
    }, [acessToken]);

    //login e validação
    const handleLogin = useCallback(
        async (username: string, password: string) => {
            await AuthService.auth(username, password)
                .then( result => {
                    if (result instanceof AxiosError) {
                        setSnack(new Snack({
                            message: result.response?.data.message,
                            color:"error",
                            open: true}));
                    }else{
                        setSnack(new Snack({
                            message: "Login realizado com sucesso",
                            color:"success",
                            open: true
                        }));
                        localStorage.setItem(
                            "Acess_Token", JSON.stringify(result.acessToken)
                        );
                        setAcessToken(result.acessToken);
                    }
                });     
        },[]
    );

    //logout
    const handleLogout = useCallback(() => {
        localStorage.removeItem(AcessToken);
        setAcessToken(undefined);
    }, []
    );

    //status auth ou não
    const isAuthenticated = useMemo(() => 
        acessToken !== undefined, [acessToken]
    );

    return (
        <AuthContext.Provider
            value={{
                dados,
                isAuthenticated,
                login: handleLogin,
                logout: handleLogout }}
        >
            {children}
        </AuthContext.Provider>
    );
    
};
export const useAuthContext = () => useContext(AuthContext);