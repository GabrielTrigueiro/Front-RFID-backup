import { Box, Modal, Divider, Typography, Button, TextField, Grid, ImageList, Chip } from "@mui/material";
import { equal } from "assert";
import { useEffect, useState } from "react";

interface RFID {
    id: string
}

export type RFID_List = string[]

export const Register_RFID: React.FC<{
    open: boolean,
    handleClose: () => void,
    setFatherList: (e: RFID_List)=> void,

}> = ({ open, handleClose, setFatherList}) => {

    //consts para manipular lista de RFID
    const [RFIDLIST, setRFIDLIST] = useState<RFID_List>([]);
    const [tempRFID, setTempRFID] = useState<string>("");

    //func para validar se existe RFID repetido
    const validate = (e:string) =>{
        // console.log(RFIDLIST.filter(id => id == e).length)
        const aux = RFIDLIST.find(id => id == e);
        if(!aux){
            RFIDLIST.push(e);
            //RFIDLIST.push(e?.replace("[^0-9]", "ig"))
        }
    };

    //func para adicionar RFID
    const addRFID = (e:string) => {
        if (e.length == 24){
            validate(e);
            setTempRFID("");
        }
    };

    //func para ler o que está sendo digitado no input
    const handleChange = (prop: keyof RFID) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setTempRFID(event.target.value);
        addRFID(event.target.value);
    };

    //func para deletar o RFID
    const handleDelete = (e: string) => {
        setRFIDLIST(RFIDLIST.filter(item => item !== e));
    };

    return (
        <Modal
            sx={{ borderRadius: "20px" }}
            open={open}
            onClose={() => handleClose()}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    bgcolor:"#fff",
                    borderRadius: "18px",

                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",

                    width: {
                        sm: 600,
                        md: 600,
                        xl: 600,
                    },
                    height: {
                        sm: 400,
                        md: 400,
                        xl: 400,
                    },
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        height: "100%",

                        display: "flex",
                        flexDirection: "column"
                    }}
                >
                    <Box
                        sx={{
                            bgcolor: "#fff",

                            flex: 1,
                            borderTopLeftRadius: "18px",
                            borderTopRightRadius: "18px",
                            padding: 1,

                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Typography>Cadastrar</Typography>
                    </Box>
                    <Divider color={"#F1F1F1"} />
                    <Box
                        sx={{
                            bgcolor: "#fff",
                            flex: 5,
                            padding: 1
                        }}
                    >
                        <Box sx={{ height: "100%", width: "100%" }}>
                            <Box sx={{padding: 1}}>
                                <Typography>Quantidade: {RFIDLIST.length}</Typography>
                            </Box>
                            <Box>
                                <TextField
                                    sx={{
                                        bgcolor: "#F4F4F4",
                                        "& fieldset": { border: "none" },
                                        width: "100%",
                                    }}
                                    placeholder={"digite um código RFID"}
                                    size={"small"}
                                    value={tempRFID}
                                    onChange={handleChange("id")}
                                />
                            </Box>

                            {/* lista dos códigos rfid sendo cadastrados */}
                            <ImageList
                                sx={{
                                    padding: 2,
                                    height: 200,
                                    
                                    overflowY: "scroll",
                                    justifyContent: "center",
                                    "::-webkit-scrollbar": {
                                        width: "20px",
                                    },
                                    "::-webkit-scrollbar-track": {
                                        backgroundColor: "transparent"
                                    },
                                    "::-webkit-scrollbar-thumb": {
                                        backgroundColor: "#d6dee1",
                                        borderRadius: "20px",
                                        border: "6px solid transparent",
                                        backgroundClip: "content-box",
                                    },
                                    "::-webkit-scrollbar-thumb:hover": {
                                        backgroundColor: "#a8bbbf"
                                    },
                                }}
                                gap={12}
                                cols={2}
                            >
                                {RFIDLIST.map((row) => (
                                    <Chip 
                                        key={row}
                                        sx={{ bgcolor: "#F4F4F4" }}
                                        label={row}
                                        onDelete={()=>handleDelete(row)}
                                    />
                                ))}
                            </ImageList>
                        </Box>
                    </Box>
                    <Divider color={"#F1F1F1"} />
                    <Box
                        sx={{
                            bgcolor: "#fff",
                            flex: 1,
                            borderBottomLeftRadius: "18px",
                            borderBottomRightRadius: "18px",
                            padding: 1,

                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center"
                        }}
                    >
                        <Box>
                            <Button variant="contained"
                                onClick={()=>{
                                    setFatherList(RFIDLIST),
                                    handleClose();
                                }}
                            >   
                                Finalizar
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};
