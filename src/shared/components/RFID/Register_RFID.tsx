import { Box, Modal, Divider, Typography, Button, TextField, Grid, ImageList } from "@mui/material"
import { useState } from "react"

interface RFID {
    number: number
}

type RFID_List = RFID[]

export const Register_RFID: React.FC<{
    open: boolean,
    handleClose: () => void
}> = ({ open, handleClose }) => {

    const [RFIDLIST, setRFIDLIST] = useState<RFID_List>([
        { number: 232432 },
        { number: 665546 },
        { number: 546888 },
        { number: 234324 },
        { number: 232432 },
        { number: 665546 },
        { number: 546888 },
        { number: 234324 },
        { number: 232432 },
        { number: 665546 },
        { number: 546888 },
        { number: 234324 },
        { number: 232432 },
        { number: 665546 },
        { number: 546888 },
        { number: 234324 },
        { number: 232432 },
        { number: 665546 },
        { number: 546888 },
        { number: 234324 },
        { number: 232432 },
        { number: 665546 },
        { number: 546888 },
        { number: 234324 },
        { number: 234324 },
        { number: 232432 },
        { number: 665546 },
        { number: 546888 },
        { number: 232432 },
        { number: 665546 },
        { number: 546888 },
        { number: 234324 },
        { number: 232432 },
        { number: 665546 },
        { number: 546888 },
        { number: 234324 },
        { number: 232432 },
        { number: 665546 },
        { number: 546888 },
        { number: 234324 },
        { number: 234324 },
        { number: 232432 },
        { number: 665546 },
        { number: 546888 },
        { number: 232432 },
        { number: 665546 },
        { number: 546888 },
        { number: 234324 },
        { number: 232432 },
        { number: 665546 },
        { number: 546888 },
        { number: 234324 },
        { number: 232432 },
        { number: 665546 },
        { number: 546888 },
        { number: 234324 },
        { number: 234324 },
        { number: 232432 },
        { number: 665546 },
        { number: 546888 },
        { number: 232432 },
        { number: 665546 },
        { number: 546888 },
        { number: 234324 },
        { number: 232432 },
        { number: 665546 },
        { number: 546888 },
        { number: 234324 },
        { number: 232432 },
        { number: 665546 },
        { number: 546888 },
        { number: 234324 },
    ])

    const [tempRFID, setTempRFID] = useState<string>()

    const handleChange = (prop: keyof RFID) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setTempRFID(event.target.value)
    }

    return (
        <Modal
            sx={{ borderRadius: "20px" }}
            open={open}
            onClose={() => handleClose()}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',

                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',

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
                            <Box>
                                <TextField
                                    sx={{
                                        bgcolor: "#F4F4F4",
                                        "& fieldset": { border: 'none' },
                                        width: "100%",
                                    }}
                                    placeholder={"digite um código RFID"}
                                    size={"small"}
                                    label=""
                                    value={tempRFID}
                                    onChange={() => handleChange}
                                />
                            </Box>

                            {/* lista dos códigos rfid sendo cadastrados */}
                            <ImageList
                                sx={{
                                    padding:2,
                                    height: 200,
                                    overflowY: "scroll",
                                    justifyContent: "center",
                                    '::-webkit-scrollbar': {
                                        width: '20px',
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
                                    },
                                }}
                                gap={12}
                                cols={6}
                            >
                                {RFIDLIST.map((row) => (
                                    <Box sx={{ bgcolor: "#F4F4F4" }}>{row.number}</Box>
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
                            <Button variant="contained">Finalizar</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}
