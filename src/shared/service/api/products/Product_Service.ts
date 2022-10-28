import { AxiosError } from "axios"
import { api } from "../axios"
import {environment}  from "../../../environment"

//info de cada produto
export interface IProduct{
    id?: string
    
    productReferenceId: string
    codeRFID: string
    companyId: string
    supplierId: string
    price: number
    description: string
    info: string

    Tipo:string
    Genero:string
    Cor:string
    Tamanho:string
    Quantidade:string
    //Active?: boolean
    // createAt: date
}

//o que vai ser recebido da api
export interface IProductPackage{
    data: IProduct[]
    message: string,
    errors: string,
    success: boolean
}

//resposta do search
export interface IProductSearch {
    numberOfPages: number
    actualPage: number
    totalElements: number
    hasNext: boolean
    data: IProduct[]
}

//paginas pedindo
export interface ISendPagination {
    page: number
    pageSize: number
    sortField: string
    sortDiresction: string
    param: string
    value: string
}

//paginas recebendo
export interface IReceivePagination{
    numberOfPages:number
    actualPage: number
    hasNext: boolean
}

//tudo
export type TAllProducts = {
    data: IProductPackage
}

const getAll = async (dados: ISendPagination): Promise<any | Error> => {
    const token = {
        headers:{
          Authorization: 
          `Bearer ${localStorage.getItem('Acess_Token')?.replace(/"/g,'')}`
         }
     }
    return await api.post<IProductSearch>(environment.url_product_Search, dados, token)
    .then(data => {
        if(data instanceof AxiosError){
            return data
        }
        return data
    })
    .catch(err => {
        console.error(err)
    })
}

const Create = async (dados: IProduct): Promise<any | Error> => {
    const token = {
        headers:{
          Authorization: 
          `Bearer ${localStorage.getItem('Acess_Token')?.replace(/"/g,'')}`
         }
     }
    return await api.post<IProductPackage>(environment.url_product, dados, token)
    .then(data => {
        if (data instanceof AxiosError){
            return data.response?.data
        }
        return data.data
      })
      .catch(err => { 
        return err
        console.error(err)
      })
}

const Delete = async (id: string): Promise<void | Error> => {
    const token = {
        headers:{
          Authorization: 
          `Bearer ${localStorage.getItem('Acess_Token')?.replace(/"/g,'')}`
         }
     }
    return await api.delete(environment.url_product + `${id}`, token)
    .then(data => {
        if (data instanceof AxiosError){
            return data.response?.data
        }
        return data.data
      })
      .catch(err => { 
        console.error(err)
      })
}

const UpdateById = async (id: string, dados: IProduct): Promise<void | Error> => {
    const token = {
        headers:{
          Authorization: 
          `Bearer ${localStorage.getItem('Acess_Token')?.replace(/"/g,'')}`
         }
     }
    return  await api.put<IProduct>(environment.url_product + `${id}`, dados, token)
    .then(data => {
        if (data instanceof AxiosError){
            return data.response?.data
        }
        return data.data
      })
      .catch(err => { 
        return err
        console.error(err)
      })
}

export const Product_Service = {
    getAll,
    Create,
    Delete,
    UpdateById
}