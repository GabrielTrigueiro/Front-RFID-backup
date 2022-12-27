import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Dashboard, Historic, Login, NotFound, Product_Page, Users } from "../pages";
import { useSideBarContext } from "../shared/context/SideBarContext";
import { Layout } from "../shared/layout";
import { Inbox } from "../pages/inbox";

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
            {
                label: "Caixa",
                icon: "inbox",
                path: "/home/caixa",
            },
        ]);
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login/>}/>
                <Route path='/home' element={<Layout/>}>
                    <Route path='dashboard' element={<Dashboard/>}/>
                    <Route path='produtos' element={<Product_Page/>}/>
                    <Route path='usuarios' element={<Users/>}/>
                    <Route path='historico' element={<Historic/>}/>
                    <Route path='caixa' element={<Inbox/>}/>
                </Route>
                <Route path='/home/' element={<Navigate to="/login"/>}/>
                <Route path='/' element={<Navigate to="/login"/>}/>
                <Route path='*' element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    );
};
