import { Box, Button } from "@mui/material"
import { useState, useEffect, useContext } from "react";
import { BaseModal, UserTable, User_Form } from "../../shared/components"
import { ContentLayout } from "../../shared/layout"
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { ISendUserPagination, IUser, User_Service } from "../../shared/service/api/users";
import { SnackbarContext } from "../../shared/context/AlertCardContext"

export const Users = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [rows, setRows] = useState<IUser[]>([])
    const { setSnack } = useContext(SnackbarContext)

    //gerenciar paginas
    const [pages, setPages] = useState<number>(0)
    const [pageSize, setPageSize] = useState<number>(20)
    const [actualpage, setActualPage] = useState<number>(0)
    const [value, setValue] = useState<string>("");
    let UserPaginationConf: ISendUserPagination = {
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

    //gerencia o modal de registro
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    //atualizar a cada alteração nas seguintes vars
    useEffect(() => {
        update();
    }, [value, actualpage, pageSize])
    
    return (
      <ContentLayout tittle={'Usuários'}>
        <Box sx={{mb:'20px', display:'flex', justifyContent:'flex-end'}}>
            <Button variant="contained" onClick={handleOpen}>
                <PersonAddAltIcon sx={{pr:1}}/> Cadastrar Usuário
            </Button>
        </Box>
        <Box>
          <UserTable
            lista={rows}
            update={update}
            pageSize={pageSize}
          />
        </Box>
        <BaseModal outState={open} closeModal={handleClose}>
            <User_Form update={update}/>
        </BaseModal>
      </ContentLayout>
    )
  }