import { Box, styled } from "@mui/system";
import { ContentLayout } from "../../shared/layout";
import { InboxItem } from "../../shared";
import { Button } from "@mui/material";

const InBoxContainer = styled(Box)({
    backgroundColor: "#FFF",
    display: "flex",
    width: "100%",
    height: "100%",
    borderRadius: 10,
    padding: 10
});

const InterContainer = styled(Box)({
    backgroundColor: "#F2F2F2",
    margin: 5,
    borderRadius: 10,
    padding: 10
});

export const Inbox = () => {

    return (
        <ContentLayout tittle={"Caixa"}>
            
            <InBoxContainer>
                {/* lista de item */}
                <InterContainer flex={4}>
                    <InboxItem></InboxItem>
                </InterContainer>

                {/* parte do caixa */}
                <InterContainer flex={1}>
                    <Box>Valor total: </Box>
                    <Button variant="contained">Finalizar</Button>
                </InterContainer>
            </InBoxContainer>
            
        </ContentLayout>
    );
};
