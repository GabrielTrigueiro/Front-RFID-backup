import { Box, styled } from "@mui/system";
import { ContentLayout } from "../../shared/layout";

const InBoxContainer = styled(Box)({
    backgroundColor: "#FFF",
    display: "flex",
    width: "100%",
    height: "100%",
    paddingBottom: 100
});

const InterContainer = styled(Box)({
    backgroundColor: "#FFF",
    width: "100%",
    height: "100%",
    paddingBottom: 100
});

export const Inbox = () => {

    return (
        <ContentLayout tittle={"Caixa"}>
            
            <InBoxContainer>
                
            </InBoxContainer>
            
        </ContentLayout>
    );
};
