import { Box } from "@mui/material"
import { Card_Page_Layout } from "../../shared/layout/Card_Page_layout"

//dados novo usario
interface newUser_data{
    username: string
    password: string
    role: "cliente" | "colaborador" | "admin"
}

export const Register_User: React.FC = () => {
    
    return(
    <Card_Page_Layout tittle="Cadastro">
        soi
    </Card_Page_Layout>
    )
}