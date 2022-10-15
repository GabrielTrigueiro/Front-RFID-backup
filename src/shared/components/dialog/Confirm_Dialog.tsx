import { Dialog, Button, Typography, Box } from "@mui/material";

//func modal está sendo passado na pagina que abre o modal
export const Confirm_Dialog: React.FC<{
    messageOne: string,
    messageTwo: string,
    tittle:string,
    state: boolean,
    funcModal:()=>void,
    funcDialog:()=>void,
}> = ({state, funcModal, funcDialog, tittle, messageOne, messageTwo}) => {

    return (
        <Dialog PaperProps={{style:{borderRadius:"12px"}}} open={state}>
            <Box
            sx={{
                width: 300,
                height:150,
                bgcolor:"#fff",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                flexDirection:"column",

            }}>
                <Typography sx={{}}>{tittle}</Typography>
                <Box
                sx={{
                    marginTop:3,
                    width:"100%",
                    borderRadius:"12px",
                    display:"flex",
                    justifyContent:"space-evenly"
                }}
                >
                    <Button
                    sx={{
                        width:100,
                        ":hover":{
                            bgcolor:"#23A0C9",
                            color:"#fff",
                            borderColor:"#fff"
                        }
                    }}
                    variant="outlined"
                    onClick={() => funcDialog()}
                    >
                        {messageOne}
                    </Button>

                    <Button
                    sx={{
                        width:100,
                        ":hover":{
                            bgcolor:"#23A0C9",
                            color:"#fff",
                            borderColor:"#fff"
                        }
                    }}
                    variant="outlined"
                    onClick={() => { funcDialog(); funcModal() }}
                    >
                        {messageTwo}
                    </Button>
                </Box>
            </Box>
        </Dialog>
    )
}