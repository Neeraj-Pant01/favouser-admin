import { makeApiReuest } from "./makeApiReuest"
export const getProducts = async (token : any) =>{
    const api = makeApiReuest(token)
    try{
        const response = (await api).get('/products/admin/list')
        return response
    }catch(err){
        return err
    }
}


export const uploadNewProduct = async (token: any, product:any) =>{
    const api = makeApiReuest(token)
    try{
        const response = (await api).post(`/products/`, product)
        return response;
    }catch(err){
        return err
    }
}