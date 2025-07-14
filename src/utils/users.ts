import { makeApiReuest } from "./makeApiReuest"
export const getusers = async (token : any) =>{
    const api = makeApiReuest(token)
    try{
        const response = (await api).get('/user/admin/all')
        return response
    }catch(err){
        return err
    }
} 

export const getUserFeedbacks = async (token : any) =>{
    const api = makeApiReuest(token);
    try{
        const response = (await api).get('/contact')
        return response;
    }catch(err){
        return err
    }
}