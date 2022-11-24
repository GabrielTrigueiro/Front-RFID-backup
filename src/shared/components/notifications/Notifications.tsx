import { toast } from "react-toastify";

export function ToastNotification(message: string, type: string){
    return(
        toast.error({ message }, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
    );
}