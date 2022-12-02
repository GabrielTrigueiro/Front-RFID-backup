import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { IUser } from "../../../service/api/users";
import {Checkbox, FormControlLabel} from "@mui/material";
import {useState} from "react";

interface IUserTableProps {
    lista: IUser[]
    update: () => void
    pageSize: number
}

export const UserTable: React.FC<IUserTableProps> = ({ lista, update }) => {

    //controles de check-box
    const label = { inputProps: { "aria-label": "Checkbox demo" } };
    const [checked, setChecked] = useState<boolean>(false);
    const handleChangeCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    return (
        <>
            <TableContainer sx={{height: "100%"}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Nome</TableCell>
                            <TableCell>Role</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {lista.map((row) => (
                            <TableRow key={row.id}>

                                {/* Checkbox */}
                                <TableCell>
                                    <FormControlLabel
                                        label="Selecionado"
                                        control={
                                            <Checkbox
                                                checked={checked}
                                                onChange={handleChangeCheck}
                                            />
                                        }
                                    />
                                </TableCell>

                                <TableCell>{row.username}</TableCell>
                                <TableCell>{row.roles[0].name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};
