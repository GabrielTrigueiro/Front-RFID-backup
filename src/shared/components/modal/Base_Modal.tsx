import { Modal, Box } from "@mui/material";
import { useState } from "react";

interface props{
    outState: boolean
    closeModal: ()=>void
}
export const BaseModal: React.FC<props> = ({children, outState, closeModal}) =>{
    return(
        <Modal
        open={outState}
        onClose={closeModal}
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

            width: 300,
            height:450,

            bgcolor:"#F0F5F8",
            borderRadius:2,
            p: 2
          }}
          >
            {children}
          </Box>
        </Modal>
    )
}