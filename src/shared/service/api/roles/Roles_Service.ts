import { AxiosError } from "axios";
import { environment } from "../../../environment";
import { api } from "../axios";

interface IRolesResposta{
    data: [{id: string, name: "string"}]
    errors: [{field: string, message: string}]
    message: string
    success: boolean
}

const getRoles = async (): Promise<any | Error> => {
    const token = {
        headers:{
            Authorization: 
          `Bearer ${localStorage.getItem("Acess_Token")?.replace(/"/g,"")}`
        }
    };
    return await api.get(environment.url_roles, token)
        .then(data => {
            if(data instanceof AxiosError){
                return data;
            }
            return data;
        })
        .catch(err => {
            console.error(err);
        });
};

export const Roles_Service = {
    getRoles
};