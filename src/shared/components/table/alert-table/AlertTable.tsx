import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Box,
  Typography,
} from "@mui/material";
import { styled } from "@mui/styles";
import "./styles.css";

interface props {}

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export const TableStyled = styled(Table)({
  borderSpacing: "0px 8px",
  borderCollapse: "separate",
  thead: {
    borderSpacing: 0,
  },
});
export const TableRowStyled = styled(TableRow)({
  backgroundColor: "#fff",
  borderEndEndRadius: "10px",
});
export const TableCellStyled = styled(TableCell)({
  height:"20px",
  borderColor: "transparent",
});

export const AlertTable: React.FC<props> = () => {
  return (
    <Box 
      sx={{
        height:450,
        width: {
          xs: '100%',
          sm: '100%',
        },
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
            {rows.map((row) => (
              <TableRowStyled
                key={row.name}
                sx={{ boxShadow: "inherit" }}
                className="MuiTableRow-root"
              >
                <TableCellStyled><Typography>{row.name}</Typography></TableCellStyled>
                <TableCellStyled align="right"><Typography>{row.calories}</Typography></TableCellStyled>
                <TableCellStyled align="right"><Typography>{row.fat}</Typography></TableCellStyled>
                <TableCellStyled align="right"><Typography>{row.carbs}</Typography></TableCellStyled>
                <TableCellStyled align="right"><Typography>{row.protein}</Typography></TableCellStyled>
              </TableRowStyled>
            ))}
          </TableBody>
        </TableStyled>
      </TableContainer>
    </Box>
  );
};
