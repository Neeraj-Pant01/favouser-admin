import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL!;

export const loginAdmin = async (logindata : any) =>{
    try{
        const respponse = await axios.post(`${apiUrl}/auth/login`, logindata)
        return respponse
    }catch(err){
        return err
    }
}