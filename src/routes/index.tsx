import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Dashboard, Historic, Login, NotFound, Product_Page, Users } from "../pages";
import { Register_User } from "../pages/register_user/Register_User";
import { useSideBarContext } from "../shared/context/SideBarContext";
import { Layout } from "../shared/layout";

export const AppRoutes = () => {

    const { setSideBarOption } = useSideBarContext();

    useEffect(() => {

        setSideBarOption([
            {
                label: "DashBoard",
                icon: "data_saver_off_outlined_icon",
                path: "/home/dashboard",
            },
            {
                label: "Produtos",
                icon: "local_mall",
                path: "/home/produtos",
            },
            {
                label: "Usuários",
                icon: "person_outline_icon",
                path: "/home/usuarios",
            },
            {
                label: "Histórico",
                icon: "history",
                path: "/home/historico",
            },
        ]);
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login/>}/>
                <Route path='/cadastro' element={<Register_User/>}/>
                <Route path='/home' element={<Layout/>}>
                    <Route path='dashboard' element={<Dashboard/>}/>
                    <Route path='produtos' element={<Product_Page/>}/>
                    <Route path='usuarios' element={<Users/>}/>
                    <Route path='historico' element={<Historic/>}/>
                </Route>
                <Route path='/home/' element={<Navigate to="/login"/>}/>
                <Route path='/' element={<Navigate to="/login"/>}/>
                <Route path='*' element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    );
};
