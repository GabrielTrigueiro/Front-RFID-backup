import { ImageList, ImageListItem, Box} from "@mui/material"
import { IProduct } from "../../../service/api/products" 
import { Product } from "../../product";

export const Product_Table: React.FC<{lista: IProduct[]; update: ()=>void}> = ({lista, update}) =>{
    return(

        <ImageList 
        sx={{
            width: '100%',
            height: '100%',
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
        cols={5}
        gap={20}
        >
            {lista.map((row) => (
                <Product
                key={row.codeRFID}
                productReferenceId={row.productReferenceId}
                codeRFID={row.codeRFID} 
                companyId={row.companyId} 
                supplierId={row.supplierId} 
                price={row.price} 
                description={row.description} 
                info={row.info} 
                />
            ))}
        </ImageList>
    )
}