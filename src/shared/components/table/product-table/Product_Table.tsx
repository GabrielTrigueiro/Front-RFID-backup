import { ImageList, styled, TableCell, TableHead, TableRow, TableBody } from "@mui/material";
import Box from "@mui/material/Box/Box";
import { IProduct } from "../../../service/api/products";
import { ListProduct, BoxProduct } from "../../product";

export const Product_Table: React.FC<{
    update: () => void;
    handleChangeArrow: () => void
    lista: IProduct[];
    pages: number;
    actualpage: number;
    type: string;
}> = ({lista, update, pages, actualpage, handleChangeArrow, type}) => {

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
    });

    const MyTableCell = styled(TableCell) ({
        width: 235
    });

    return (
        <>
            {type == "box" ? 
                <ProductImageListBox sx={{height: "100%"}}>
                    {lista.map((row) => (
                        <BoxProduct
                            key={row.description}
                            produto={row}
                            update={update}
                        />
                    ))}
                </ProductImageListBox>
                :
                <>
                    <TableHead>
                        <TableRow>
                            <MyTableCell>Produto</MyTableCell>
                            <MyTableCell>Quantidade</MyTableCell>
                            <MyTableCell>Descrição</MyTableCell>
                            <MyTableCell>Cor</MyTableCell>
                            <MyTableCell>Tamanho</MyTableCell>
                        </TableRow>
                    </TableHead>
                    <ProductImageListBox
                        sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <MyTableBody>
                            {lista.map((row) => (
                                <MyTableRow key={row.id}>
                                    <MyTableCell>{row.description}</MyTableCell>
                                    <MyTableCell>{row.quantity}</MyTableCell>
                                    <MyTableCell>{row.info}</MyTableCell>
                                    <MyTableCell>{row.color}</MyTableCell>
                                    <MyTableCell>{row.size}</MyTableCell>
                                </MyTableRow>
                            ))}
                        </MyTableBody>
                    </ProductImageListBox>
                </>
            }
        </>
    );
};