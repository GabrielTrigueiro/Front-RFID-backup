import { Box, TableContainer, TableBody, Typography } from "@mui/material";
import { IUser } from "../../../service/api/users";
import { TableStyled, TableRowStyled, TableCellStyled } from "../alert-table";

export const UserTable: React.FC<{lista: IUser[]; update: ()=>void}> = ({lista, update}) => {

  return (
    <Box>
        <Box className={'boxContainer'}
        sx={{ 
            height:450,
            overflowY: "scroll",
            '::-webkit-scrollbar': {
                width: '20px'
            },
            '::-webkit-scrollbar-track': {
                backgroundColor: 'transparent'
            },
            '::-webkit-scrollbar-thumb': {
                backgroundColor: '#d6dee1',
                borderRadius: '20px',
                border: '6px solid transparent',
                backgroundClip: 'content-box',
            },
            '::-webkit-scrollbar-thumb:hover': {
                backgroundColor: '#a8bbbf'
            }
        }}
        >
        <TableContainer className="table-container">
            <TableStyled sx={{ minWidth: 700 }}>
            <TableBody>
                {lista.map((row) => (
                <TableRowStyled
                    key={row.id}
                    sx={{ boxShadow: "inherit" }}
                    className="MuiTableRow-root"
                >
                    <TableCellStyled>
                    <Typography>Nome: {row.username}</Typography>
                    </TableCellStyled>
                    <TableCellStyled align="right">
                    <Typography>Id: {row.id}</Typography>
                    </TableCellStyled>
                    <TableCellStyled align="right">
                    <Typography>Cargo: {row.roles.name}</Typography>
                    </TableCellStyled>
                </TableRowStyled>
                ))}
            </TableBody>
            </TableStyled>
        </TableContainer>
        </Box>
    </Box>
  );
};
