import { ImageList, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled } from "@mui/material";
import { IUser } from "../../../service/api/users";
import {Checkbox, FormControlLabel} from "@mui/material";
import {useEffect, useState} from "react";

interface IUserTableProps {
    lista: IUser[]
    pageSize: number
    update: () => void
    setDelet: (e: boolean) => void
    listaDelet: string[],
    setListaDelet: (e: string[]) => void
}

const ProductImageListBox = styled(ImageList) ({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))!important",
    height: "90%",
    width: "100%",
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

const MyTableBody = styled(TableBody) ({
    width: "100%",
    //backgroundColor: "#322"
});

const MyTableRow = styled(TableRow) ({
    width: "100%",
    display: "flex",
    justifyContent: "space-between"
});

const MyTableCell = styled(TableCell) ({
    flex: 1
});

export const UserTable: React.FC<IUserTableProps> = ({lista, update, setDelet, listaDelet, setListaDelet}) => {

    const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {        
        let updateList = [...listaDelet];
        if (event.target.checked) {
            updateList = [...listaDelet, event.target.value];
        }
        else {
            updateList.splice(listaDelet.indexOf(event.target.value),1);
        }
        setListaDelet(updateList);
    };

    const verifyCheck = (id: string) => {
        if (listaDelet.includes(id)){
            return true;
        }
        else {
            return false;
        }
    };

    useEffect(()=>{
        if (listaDelet.length >= 1) {
            setDelet(false);
        }
        else {
            setDelet(true);
        }
    },[listaDelet]);

    return (
        <>
            <TableHead sx={{width:"100%", display:"flex"}}>
                <TableRow sx={{width:"100%", display:"flex"}}>
                    <MyTableCell></MyTableCell>
                    <MyTableCell>nome</MyTableCell>
                    <MyTableCell>role</MyTableCell>
                </TableRow>
            </TableHead>
            <ProductImageListBox
                sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <MyTableBody>
                    {lista.map((row) => (
                        <MyTableRow key={row.id}>
                            {/* Checkbox */}
                            <MyTableCell>
                                <FormControlLabel
                                    label
                                    control={
                                        <Checkbox
                                            value={row.id}
                                            checked={verifyCheck(row.id)}
                                            onChange={handleCheck}
                                        />
                                    }
                                />
                            </MyTableCell>
                            <MyTableCell>{row.username}</MyTableCell>
                            <MyTableCell>{row.roles[0].name == "ROLE_ADMIN" ? "Admin" : "Usuário"}</MyTableCell>
                        </MyTableRow>
                    ))}
                </MyTableBody>
            </ProductImageListBox>
        </>
    );
};
