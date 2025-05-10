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


export const deleteProduct = async (token: any, productId:any) =>{
    const api = makeApiReuest(token)
    try{
        const response = (await api).delete(`/products/${productId}`)
        return response;
    }catch(err){
        return err
    }
}


export const updateProduct = async (token: any, productId:any, updatedData:any) =>{
    const api = makeApiReuest(token)
    try{
        const response = (await api).put(`/products/${productId}`,updatedData)
        return response;
    }catch(err){
        return err
    }
}