import { Modal, Box } from "@mui/material";
import { useState } from "react";


export const BaseModal: React.FC = ({children}) =>{
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return(
        <Modal
        open={open}
        onClose={handleClose}
        >
          <Box
          sx={{
            display:'flex',
            alignItems:'center',

            position:'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',

            width: 300,
            height:450,

            bgcolor:"#F0F5F8",
            borderRadius:4,
            p: 2
          }}
          >
            {children}
          </Box>
        </Modal>
    )
}