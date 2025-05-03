import { makeApiReuest } from "./makeApiReuest"
export const getOrders = async (token : any) =>{
    const api = makeApiReuest(token)
    try{
        const response = (await api).get('/orders/')
        return response
    }catch(err){
        return err
    }
}