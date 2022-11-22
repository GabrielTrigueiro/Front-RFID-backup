import { Box, TableContainer, TableBody, Typography, Button, SelectChangeEvent, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { GridColDef, DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { IUser } from "../../../service/api/users";
import { SearchInput } from "../../search";
import { TableStyled, TableRowStyled, TableCellStyled } from "../alert-table";

interface tipos {
    roles: "ROLE_ADMIN"
}

interface IUserTableProps {
    lista: IUser[]
    update: () => void
    pageSize: number
}

export const UserTable: React.FC<IUserTableProps> = ({ lista, update }) => {

    //campos da tabela
    const columns: GridColDef[] = [
        { field: "username", headerName: "Nome", width: 120 },
        { field: "id", headerName: "Id", width: 210 },
        { field: "roles", headerName: "Cargo", width: 120 }
    ];

    //role, setor, search
    const [role, setRole] = useState("");
    const [branch, setBranch] = useState("");
    const handleChangeRole = (event: SelectChangeEvent) => {
        setRole(event.target.value as string);
    };
    const handleChangeBranch = (event: SelectChangeEvent) => {
        setBranch(event.target.value as string);
    };

    return (
        <Box sx={{ height: 400, width: "100%", display: "flex", flexDirection: "column" }}>

            <Box
                sx={{
                    bgcolor: "#fff",
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: 1
                }}
            >
                <Button sx={{ bgcolor: "red", color: "#fff" }}>
                    Excluir
                </Button>

                <Box sx={{ display: "flex" }}>

                    <Box sx={{ minWidth: 120 }}>
                        <FormControl size="small" fullWidth>
                            <InputLabel id="demo-simple-select-label">Cargo</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={role}
                                label="Cargo"
                                onChange={handleChangeRole}
                            >
                                <MenuItem value={10}>Gestor</MenuItem>
                                <MenuItem value={20}>Cliente</MenuItem>
                                <MenuItem value={30}>Vendedor</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <Box sx={{ minWidth: 120, marginLeft: 1 }}>
                        <FormControl size="small" fullWidth>
                            <InputLabel id="demo-simple-select-label">Setor</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={branch}
                                label="Setor"
                                onChange={handleChangeBranch}
                            >
                                <MenuItem value={10}>Departamento</MenuItem>
                                <MenuItem value={20}>Bola</MenuItem>
                                <MenuItem value={30}>RH</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <SearchInput change={() => console.log("a")} />
                </Box>

            </Box>

            <Box
                sx={{
                    bgcolor: "#fff",
                    flex: 5
                }}
            >
                {lista.map((row) => {
                    <Box>oi</Box>;
                })}
            </Box>

            {/* <DataGrid
                rows={lista}
                columns={columns}
                pageSize={5}
                checkboxSelection
            /> */}

        </Box>
    );
};
