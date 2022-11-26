import { ImageList } from "@mui/material";
import Box from "@mui/material/Box/Box";
import { IProduct } from "../../../service/api/products";
import { ListProduct, Product } from "../../product";

export const Product_Table: React.FC<{
    update: () => void;
    handleChangeArrow: () => void
    lista: IProduct[];
    pages: number;
    actualpage: number;
    type: string;
}> = ({lista, update, pages, actualpage, handleChangeArrow, type}) => {
    return (
        <>
            {type == "box" ? 
                <ImageList
                    sx={{
                        gridTemplateColumns: "repeat(auto-fill, minmax(0px, 200px))!important", //truque milenar
                        overflowY: "scroll",
                        height: "100%",
                        justifyContent: "center",
                        "::-webkit-scrollbar": {
                            width: "20px",
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
                    }}
                    gap={12}
                >
                    {lista.map((row) => (
                        <Product
                            produto={row}
                            update={update}

                            key={row.description}

                            productReferenceId={row.productReferenceId}
                            codesRFID={row.codesRFID}
                            companyId={row.companyId}
                            supplierId={row.supplierId}
                            price={row.price}
                            description={row.description}
                            info={row.info}

                            type={row.type}
                            genre={row.genre}
                            color={row.color}
                            size={row.size}
                            quantity={row.quantity}
                        />
                    ))}
                </ImageList>
                :
                <ImageList
                    sx={{
                        gridTemplateColumns: "repeat(auto-fill, minmax(0px, 200px))!important", //truque milenar
                        overflowY: "scroll",

                        height: "100%",
                        width: "100%",

                        display: "flex",
                        flexDirection: "column",

                        alignItems: "center",

                        "::-webkit-scrollbar": {
                            width: "20px",
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
                    }}
                >
                    {lista.map((row) => (
                        <ListProduct
                            key={row.description}

                            produto={row}
                            update={update}
                            productReferenceId={row.productReferenceId}
                            codesRFID={row.codesRFID}
                            companyId={row.companyId}
                            supplierId={row.supplierId}
                            price={row.price}
                            description={row.description}
                            info={row.info}
                            type={row.type}
                            genre={row.genre}
                            color={row.color}
                            size={row.size}
                            quantity={row.quantity}
                        />
                    ))}
                </ImageList>
            }
        </>
    );
};