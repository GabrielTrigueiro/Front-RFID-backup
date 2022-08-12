import { useEffect } from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { Dashboard, Historic, Login, NotFound, Product, Users } from '../pages';
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
          <Route path='/home' element={<Layout/>}>
            <Route path='dashboard' element={<Dashboard/>}/>
            <Route path='produtos' element={<Product/>}/>
            <Route path='usuarios' element={<Users/>}/>
            <Route path='historico' element={<Historic/>}/>
          </Route>
          <Route path='/home/' element={<Navigate to="/login"/>}/>
          <Route path='/' element={<Navigate to="/login"/>}/>
          <Route path='*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}
