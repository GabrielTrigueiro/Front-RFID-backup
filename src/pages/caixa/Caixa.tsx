import { Typography } from "@mui/material";
import { ContentLayout } from "../../shared/layout";
import "./caixa.css";
import { SearchInput } from "../../shared";
import { useState } from "react";

export const Caixa = () => {

    const [value, setValue] = useState<string>("");

    return (
        <ContentLayout tittle={"Caixa"}>
            
            <div className="container-externo">
                <div className="container-interno">
                    <div className="produtos">
                        <div className="search">
                            <Typography>Código RFID</Typography>
                            <SearchInput change={(value) => { setValue(value.target.value);}}/>
                        </div>
                        <div className="ultimoProduto">
                            ultimo produto
                        </div>
                        <div className="carrinho">
                            carrinho
                        </div>
                    </div>
                    <div className="pagamento">
                        pagamento
                    </div>
                </div>
            </div>
            
        </ContentLayout>
    );
};
