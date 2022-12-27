import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled } from "@mui/material";
import { IUser } from "../../../service/api/users";
import {Checkbox, FormControlLabel} from "@mui/material";
import {useEffect, useState} from "react";

interface IUserTableProps {
    lista: IUser[]
    pageSize: number
    update: () => void
    setDelet: (e: boolean) => void
}

const Teste = styled(TableContainer)({
    overflowY: "scroll",
    height: "100%",
    width: "100%",
    justifyContent: "space-between",
    "::-webkit-scrollbar": {
        width: "15px",
    },
    "::-webkit-scrollbar-track": {
        backgroundColor: "transparent"
    },
    "::-webkit-scrollbar-thumb": {
        backgroundColor: "#d6dee1",
        borderRadius: "20px",
        border: "6px solid transparent",
        backgroundClip: "content-box",
    },
    "::-webkit-scrollbar-thumb:hover": {
        backgroundColor: "#a8bbbf"
    },
});

export const UserTable: React.FC<IUserTableProps> = ({lista, update, setDelet}) => {

    //controles de check-box
    const [isChecked, setIsChecked] = useState<string[]>([]);

    const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {        
        let updateList = [...isChecked];
        if (event.target.checked) {
            updateList = [...isChecked, event.target.value];
        }
        else {
            updateList.splice(isChecked.indexOf(event.target.value),1);
        }
        setIsChecked(updateList);
    };

    const verifyCheck = (id: string) => {
        if (isChecked.includes(id)){
            return true;
        }
        else {
            return false;
        }
    };

    //atualiza o estado do botão de excluir
    useEffect(()=>{
        if (isChecked.length >= 1) {
            setDelet(false);
        }
        else {
            setDelet(true);
        }
    },[isChecked]);

    return (
        <>
            <Teste>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Nome</TableCell>
                            <TableCell>Role</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {lista.map((row, index) => (
                            <TableRow key={row.id}>

                                {/* Checkbox */}
                                <TableCell>
                                    <FormControlLabel
                                        label=""
                                        control={
                                            <Checkbox
                                                value={row.id}
                                                checked={verifyCheck(row.id)}
                                                onChange={handleCheck}
                                            />
                                        }
                                    />
                                </TableCell>

                                <TableCell>{row.username}</TableCell>
                                <TableCell>{row.roles[0].name == "ROLE_ADMIN" ? "Admin" : "Usuário"}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Teste>
        </>
    );
};
