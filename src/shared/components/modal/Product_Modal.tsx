import { Modal, Box, Dialog, Button } from "@mui/material";
import { useState } from "react";
import { Confirm_Dialog } from "../dialog";

interface props{
    outState: boolean
    closeModal: ()=>void
}
//todo componente que usar o modal terá que enviar uma func de close e uma var do estado
export const Product_Modal: React.FC<props> = ({children, outState, closeModal}) =>{
    const [dialog, setDialog] = useState<boolean>(false)
    return(
      <>
        <Modal
        open={outState}
        onClose={()=>setDialog(true)}
        >
          <Box
          sx={{
            display:'flex',
            alignItems:'center',
            justifyContent:'center',

            position:'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',

            width: 600,
            height:450,

            bgcolor:"#F0F5F8",
            borderRadius:2,
            p: 2
          }}
          >
            {children}
          </Box>
        </Modal>
        <Confirm_Dialog
        messageOne={'Não'}
        messageTwo={'Sim'}
        tittle={'Deseja fechar?'}
        state={dialog}
        funcDialog={()=>setDialog(false)}
        funcModal={closeModal}
        />
      </>
    )
}