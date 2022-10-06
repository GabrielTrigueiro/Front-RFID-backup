import { Box } from "@mui/system"
import { IProduct } from "../../../service/api/products" 
import { Product } from "../../product";

export const Product_Table: React.FC<{lista: IProduct[]; update: ()=>void}> = ({lista, update}) =>{
    return(
        <Box bgcolor={'#fff'} display={'flex'} width={'100%'} height={'100%'}>
            {lista.map((row) => (
                <Product/>
            ))}
        </Box>
    )
}