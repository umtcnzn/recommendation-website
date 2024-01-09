
import axios from "axios";


export async function Auth() {

    try{
        const token = localStorage.getItem("authToken")
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/auth/protected`,{
            headers:{
                Authorization: "Bearer " + JSON.parse(token!) as string
            }
        });
        return response
    }
    catch(error){
        throw error;
    }
}

