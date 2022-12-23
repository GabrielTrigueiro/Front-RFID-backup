import { Box, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { ProductPageSkeleton, Register_User_Modal, SearchInput, UserTable, User_Form } from "../../shared/components";
import { ContentLayout } from "../../shared/layout";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { ISendUserPagination, IUser, User_Service } from "../../shared/service/api/users";
import { Roles_Service } from "../../shared/service/api/roles/Roles_Service";

export const Users = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [rows, setRows] = useState<IUser[]>([]);

    //gerenciar páginas
    const [pages, setPages] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(20);
    const [actualpage, setActualPage] = useState<number>(0);
    const [value, setValue] = useState<string>("");

    const [roles, setRoles] = useState<any>();

    const UserPaginationConf: ISendUserPagination = {
        page: actualpage,
        pageSize: pageSize,
        param: "name",
        sortDiresction: "DESC",
        sortField: "name",
        value: value,
    };
    
    const ListRoles = () => {
        Roles_Service.getAll().then((result) => {
            if (result instanceof Error) {
                alert(result.message);
            } else {
                setRoles(result.data.data);
            }
        });
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
        ListRoles();
        ListUser();
    };

    //gerencia o modal de registro
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //excluir?
    const [delet, setDelet] = useState<boolean>(false);

    //atualizar a cada alteração nas seguintes vars
    useEffect(() => {
        update();
    },[value, actualpage, pageSize]);
    
    return (
        <ContentLayout tittle={"Usuários"}>
            {/* menu superior */}
            <Box sx={{display: "flex", justifyContent: "space-between"}}>

                {/* excluir */}
                <Button 
                    disabled={delet}
                    variant="contained"
                    sx={{color: "#fff", justifySelf: "flex-start"}}
                >
                    Excluir
                </Button>
                
                {/* search e cadastrar */}
                <Box sx={{display: "flex"}}>
                    <Box sx={{ display: "flex", marginRight: 5}}>
                        <SearchInput change={() => console.log("a")} />
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
                <User_Form listRoles={roles} update={update}/>
            </Register_User_Modal>
        </ContentLayout>
    );
};