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
        <Dialog open={state}>
            <Box
            sx={{
                bgcolor:"#fff",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                flexDirection:"column"
            }}>
                <Typography sx={{margin:2}}>{tittle}</Typography>
                <Box
                sx={{
                    margin:2,
                    width:":100%",
                    display:"flex",
                    justifyContent:"space-bet"
                }}
                >
                    <Button
                    sx={{
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