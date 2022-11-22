import { Modal, Box, Dialog, Button } from "@mui/material";
import { useState } from "react";
import { Confirm_Dialog } from "../dialog";

interface props {
  outState: boolean
  closeModal: () => void
}
//todo componente que usar o modal terá que enviar uma func de close e uma var do estado
export const Product_Modal: React.FC<props> = ({ children, outState, closeModal }) => {

    const [dialog, setDialog] = useState<boolean>(false);

    return (
        <>
            <Modal
                sx={{borderRadius:"20px"}}
                open={outState}
                onClose={() => setDialog(true)}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",

                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",

                        width: {
                            sm: 600,
                            md: 1100,
                            xl: 1100,
                        },
                        height: {
                            sm: 400,
                            md: 600,
                            xl: 600,
                        },
                    }}
                >
                    {children}
                </Box>
            </Modal>
            <Confirm_Dialog
                messageOne={"Não"}
                messageTwo={"Sim"}
                tittle={"Deseja fechar?"}
                state={dialog}
                funcDialog={() => setDialog(false)}
                funcModal={closeModal}
            />
        </>
    );
};