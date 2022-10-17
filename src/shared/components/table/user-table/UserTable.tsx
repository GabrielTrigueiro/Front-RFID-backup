import { Box, TableContainer, TableBody, Typography } from "@mui/material";
import { GridColDef, DataGrid } from "@mui/x-data-grid";
import { IUser } from "../../../service/api/users";
import { TableStyled, TableRowStyled, TableCellStyled } from "../alert-table";

interface tipos{
    roles: "ROLE_ADMIN"
}

interface IUserTableProps {
    lista: IUser[]
    update: ()=>void
    pageSize: number
}

export const UserTable: React.FC<IUserTableProps> = ({lista, update}) => {

    //campos da tabela
    const columns: GridColDef[] = [
        {field: 'username', headerName: 'Nome', width: 120},
        {field: 'id', headerName: 'Id', width: 210},
        {field: 'roles', headerName: 'Cargo', width: 120}
    ]

    return (
        <Box
        sx={{height:400, width:'100%'}}
        >
            <DataGrid
                rows={lista}
                columns={columns}
                pageSize={5}
                checkboxSelection
            />
        </Box>
    )
}
