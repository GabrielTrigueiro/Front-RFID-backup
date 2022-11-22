import { Modal, Box, Dialog, Button } from "@mui/material";
import { useState } from "react";
import { Confirm_Dialog } from "../dialog";

interface props{
    outState: boolean
    closeModal: ()=>void
}
//todo componente que usar o modal terá que enviar uma func de close e uma var do estado
export const Register_User_Modal: React.FC<props> = ({
    children, outState, closeModal
}) =>{

    const [dialog, setDialog] = useState<boolean>(false);
    
    return(
        <>
            <Modal
                open={outState}
                onClose={()=>setDialog(true)}
            >
                <Box
                    sx={{
                        display:"flex",
                        alignItems:"center",
                        justifyContent:"center",

                        position:"absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",

                        width: 420,
                        height:510,

                        bgcolor:"#fff",
                        borderRadius:"18px",
                        p: 2
                    }}
                >
                    <Box
                        sx={{
                            width:"100%",
                            height:"100%",
                            display:"flex",
                            flexDirection:"column"
                        }}
                    >
                        {children}
                    </Box>
                </Box>
            </Modal>
            <Confirm_Dialog
                messageOne={"Não"}
                messageTwo={"Sim"}
                tittle={"Cancelar registro?"}
                state={dialog}
                funcDialog={()=>setDialog(false)}
                funcModal={closeModal}
            />
        </>
    );
};