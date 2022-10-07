import { Dialog, Button, Typography } from "@mui/material";

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
            <Typography>{tittle}</Typography>
            <Button onClick={() => funcDialog()}>{messageOne}</Button>
            <Button onClick={() => { funcDialog(); funcModal() }}>{messageTwo}</Button>
        </Dialog>
    )
}