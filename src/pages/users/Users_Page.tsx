import { Box, Button } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { Notification, ProductPageSkeleton, Register_User_Modal, SearchInput, UserTable, User_Form } from "../../shared/components";
import { ContentLayout } from "../../shared/layout";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { ISendUserPagination, IUser, User_Service } from "../../shared/service/api/users";
import { useDispatch, useSelector } from "react-redux";
import { Roles_Service } from "../../shared/service/api/roles/Roles_Service";
import { adicionarRoles } from "../../shared/store/Slices/Roles";
import { RootState } from "../../shared/store/Store";

export const Users = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [rows, setRows] = useState<IUser[]>([]);

    //gerenciar páginas
    const [pages, setPages] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(20);
    const [actualpage, setActualPage] = useState<number>(0);
    const [value, setValue] = useState<string>("");

    //gerencia o modal de registro
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //excluir?
    const [delet, setDelet] = useState<boolean>(false);
    const [listToDelete, setListToDelete] =  useState<string[]>([]);
    
    const UserPaginationConf: ISendUserPagination = {
        page: actualpage,
        pageSize: pageSize,
        param: "name",
        sortDiresction: "DESC",
        sortField: "name",
        value: value,
    };

    const ListUser = () => {
        User_Service.getAll(UserPaginationConf).then((result) => {
            if (result instanceof Error) {
                alert(result.message);
            } else {
                setIsLoading(false);
                setPages(result.data.numberOfPages);
                setRows(result.data.data);
            }   
        });
    };

    const update = () => {
        ListUser();
    };

    const deletUser = (idList: string[]) => {
        User_Service.Delete(idList).then((result => {
            Notification("Removido com sucesso", "success");
            setListToDelete([]);
        })).catch(err => { 
            console.error(err);
        });
    };

    const dispatch = useDispatch();

    const buscarRoles = useCallback(() => {
        const resposta = Roles_Service.getRoles();
        resposta.then(res => {
            dispatch(adicionarRoles(res.data.data));
        });
    },[dispatch]);

    const estadoRoles = useSelector((state: RootState) => state.roles.lista);

    const dispararBuscaRoles = () => {
        if(estadoRoles.length == 0){
            buscarRoles();
        }
    };
    
    useEffect(() => {
        update();
        dispararBuscaRoles();
    },[value, actualpage, pageSize, listToDelete]);
    
    return (
        <ContentLayout tittle={"Usuários"}>

            {/* menu superior */}
            <Box sx={{display: "flex", justifyContent: "space-between"}}>

                {/* excluir */}
                <Button
                    onClick={()=>{deletUser(listToDelete);}}
                    disabled={delet}
                    variant="contained"
                    sx={{color: "#fff", justifySelf: "flex-start"}}
                >
                    Excluir
                </Button>
                
                {/* search e cadastrar */}
                <Box sx={{display: "flex"}}>
                    <Box sx={{ display: "flex", marginRight: 5}}>
                        <SearchInput change={(value) => { setValue(value.target.value); }} />
                    </Box> 
                    <Button variant="contained" onClick={handleOpen}>
                        <PersonAddAltIcon sx={{pr:1}}/>
                        Cadastrar Usuário
                    </Button>
                </Box>
            </Box>

            {/* tabela */}
            <Box sx={{height: "100%"}}>
                {isLoading ? <Box sx={{height: "100%", marginTop: 3}}><ProductPageSkeleton/></Box> :
                    <UserTable
                        listaDelet={listToDelete}
                        setListaDelet={setListToDelete}
                        setDelet={setDelet}
                        lista={rows}
                        update={update}
                        pageSize={pageSize}
                    />
                }
            </Box>

            {/* modal cadastro usuário */}
            <Register_User_Modal
                outState={open}
                closeModal={handleClose}
            >
                <User_Form fechar={handleClose} update={update}/>
            </Register_User_Modal>
        </ContentLayout>
    );
};