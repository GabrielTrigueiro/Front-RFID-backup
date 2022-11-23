import { ImageList, ImageListItem, Box, Pagination, Stack, Container } from "@mui/material";
import { IProduct } from "../../../service/api/products";
import { Product } from "../../product";

export const Product_Table: React.FC<{
    lista: IProduct[];
    update: () => void;
    pages: number;
    actualpage: number;
    handleChangeArrow: () => void
}> = ({ lista, update, pages, actualpage, handleChangeArrow }) => {
    return (
        <>
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
                        // saveProduct={saveProduct}
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
            {/* <Box sx={{ width: "100", display:"flex", justifyContent:"center", mt:1}}>
                <Box sx={{borderRadius:"20px", padding:1}}>
                    <Stack>
                        <Pagination
                            count={pages}
                            variant="outlined"
                            shape="circular"
                            page={actualpage}
                            onChange={handleChangeArrow}
                        />
                    </Stack>
                </Box>
            </Box> */}
        </>
    );
};