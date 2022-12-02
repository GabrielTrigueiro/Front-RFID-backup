import { Box, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { Register_User_Modal, SearchInput, UserTable, User_Form } from "../../shared/components";
import { ContentLayout } from "../../shared/layout";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { ISendUserPagination, IUser, User_Service } from "../../shared/service/api/users";

export const Users = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [rows, setRows] = useState<IUser[]>([]);

    //gerenciar páginas
    const [pages, setPages] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(20);
    const [actualpage, setActualPage] = useState<number>(0);
    const [value, setValue] = useState<string>("");

    const UserPaginationConf: ISendUserPagination = {
        page: actualpage,
        pageSize: pageSize,
        param: "name",
        sortDiresction: "DESC",
        sortField: "name",
        value: value,
    };

    const update = () => {
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

    //gerencia o modal de registro
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //atualizar a cada alteração nas seguintes vars
    useEffect(() => {
        update();
    },[value, actualpage, pageSize]);
    
    return (
        <ContentLayout tittle={"Usuários"}>
            <Box sx={{display: "flex", justifyContent: "space-between"}}>

                {/* excluir */}
                <Button variant="contained" sx={{color: "#fff", justifySelf: "flex-start"}}>
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
            <Box sx={{width: "100%", height: "100%"}}>
                <UserTable
                    lista={rows}
                    update={update}
                    pageSize={pageSize}
                />
            </Box>
            <Register_User_Modal outState={open} closeModal={handleClose}>
                <User_Form update={update}/>
            </Register_User_Modal>
        </ContentLayout>
    );
};