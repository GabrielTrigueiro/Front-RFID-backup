import { AxiosError } from "axios";
import { environment } from "../../../environment";
import { api } from "../axios";

export interface IRole {
    id: string
    name: string
}

export interface Ierror{
    field: string
    message: string
}

export interface IRoleData{
    data: IRole[]
    errors: Ierror[] 
    message: string
    success: boolean
}

const getAll = async (): Promise<any | Error> => {
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
    getAll
};