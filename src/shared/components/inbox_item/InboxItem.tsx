import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import { useState } from "react";
import { IProduct } from "../../service/api";

const Item = styled(Box)({
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    height: 90
});

export const InboxItem: React.FC = () => {

    //caixa
    const [productList, setProductList] = useState<IProduct[]>([]);

    return(
        <Item>
            oi eu sou um item
        </Item>
    );
};