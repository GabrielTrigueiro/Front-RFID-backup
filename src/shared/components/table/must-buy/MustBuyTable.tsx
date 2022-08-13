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
  } from "@mui/material";
  import { styled } from "@mui/styles";
import { TableCellStyled, TableRowStyled, TableStyled } from "../alert-table";
  import "../alert-table/styles.css";
  
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
  ];
  
  export const MustBuyTable: React.FC<props> = () => {
    return (
      <TableContainer className="table-container">
        <TableStyled sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCellStyled>Dessert (100g serving)</TableCellStyled>
              <TableCellStyled align="right">Calories</TableCellStyled>
              <TableCellStyled align="right">Fat&nbsp;(g)</TableCellStyled>
              <TableCellStyled align="right">Carbs&nbsp;(g)</TableCellStyled>
              <TableCellStyled align="right">Protein&nbsp;(g)</TableCellStyled>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRowStyled
                key={row.name}
                sx={{ boxShadow: "inherit" }}
                className="MuiTableRow-root"
              >
                <TableCellStyled>
                  {row.name}
                </TableCellStyled>
                <TableCellStyled align="right">{row.calories}</TableCellStyled>
                <TableCellStyled align="right">{row.fat}</TableCellStyled>
                <TableCellStyled align="right">{row.carbs}</TableCellStyled>
                <TableCellStyled align="right">{row.protein}</TableCellStyled>
              </TableRowStyled>
            ))}
          </TableBody>
        </TableStyled>
      </TableContainer>
    );
  };
  