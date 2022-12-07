import { AxiosError } from "axios";
import { api } from "../axios";
import {environment}  from "../../../environment";
import { newUser_data } from "../../../components";

//info de cada usuário
export interface IUser{
    id:string
    username:string
    roles:[{
        id: string
        name: string
    }]
}

//o que vai ser recebido da api
export interface IUserPackage{
    data: IUser[]
    message: string,
    errors: string,
    success: boolean
}

//resposta do search
export interface IUserSearch {
    numberOfPages: number
    actualPage: number
    totalElements: number
    hasNext: boolean
    data: IUser[]
}

//paginas pedindo
export interface ISendUserPagination{
    page: number
    pageSize: number
    sortField: string
    sortDiresction: string
    param: string
    value: string
}

//paginas recebendo
export interface IReceiveUserPagination{
    numberOfPages:number
    actualPage: number
    hasNext: boolean
}

//tudo
export type TAllUsers = {
    data: IUserPackage
}

const getUserInfo = async (): Promise<any | Error> => {
    const token = {
        headers:{
            Authorization: 
          `Bearer ${localStorage.getItem("Acess_Token")?.replace(/"/g,"")}`
        }
    };
    return await api.get(environment.url_user_info, token)
        .then(data => {
            if(data instanceof AxiosError){
                return data;
            }
            return data;
        })
        .catch(err => {
            console.error(err);
            console.log("abacate azul");
        });
};

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
            console.log("erro ao pegar as rotas");
        });
};

const getAll = async (dados: ISendUserPagination): Promise<any | Error> => {
    const token = {
        headers:{
            Authorization: 
          `Bearer ${localStorage.getItem("Acess_Token")?.replace(/"/g,"")}`
        }
    };
    return await api.post<IUserSearch>(environment.url_users_Search, dados, token)
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

const Create = async (dados: newUser_data): Promise<any | Error> => {
    const token = {
        headers:{
            Authorization: 
          `Bearer ${localStorage.getItem("Acess_Token")?.replace(/"/g,"")}`
        }
    };
    return await api.post<IUserPackage>(environment.url_users_Search, dados, token)
        .then(data => {
            if (data instanceof AxiosError){
                return data.response?.data;
            }
            return data.data;
        })
        .catch(err => { 
            return err;
            console.error(err);
        });
};

const Delete = async (id: string): Promise<void | Error> => {
    const token = {
        headers:{
            Authorization: 
          `Bearer ${localStorage.getItem("Acess_Token")?.replace(/"/g,"")}`
        }
    };
    return await api.delete(environment.url_users + `${id}`, token)
        .then(data => {
            if (data instanceof AxiosError){
                return data.response?.data;
            }
            return data.data;
        })
        .catch(err => { 
            console.error(err);
        });
};

const UpdateById = async (id: string, dados: IUser): Promise<void | Error> => {
    const token = {
        headers:{
            Authorization: 
          `Bearer ${localStorage.getItem("Acess_Token")?.replace(/"/g,"")}`
        }
    };
    return  await api.put<IUser>(environment.url_users + `${id}`, dados, token)
        .then(data => {
            if (data instanceof AxiosError){
                return data.response?.data;
            }
            return data.data;
        })
        .catch(err => { 
            return err;
            console.error(err);
        });
};

export const User_Service = {
    getAll,
    Create,
    Delete,
    UpdateById,
    getUserInfo,
    getRoles
};