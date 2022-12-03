import { ImageList, styled } from "@mui/material";
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
        gridTemplateColumns: "repeat(auto-fill, minmax(0px, 200px))!important",
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

    return (
        <>
            {type == "box" ? 
                <ProductImageListBox>
                    {lista.map((row) => (
                        <BoxProduct
                            key={row.description}
                            produto={row}
                            update={update}
                        />
                    ))}
                </ProductImageListBox>
                :
                <ProductImageListBox
                    sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    {lista.map((row) => (
                        <ListProduct
                            key={row.description}
                            produto={row}
                            update={update}
   
                        />
                    ))}
                </ProductImageListBox>
            }
        </>
    );
};