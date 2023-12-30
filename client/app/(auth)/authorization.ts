
import axios from "axios";


export async function Auth() {

    try{
        const token = localStorage.getItem("authToken")
        console.log(JSON.parse(token!));
        const response = await axios.get(`http://${process.env.NEXT_PUBLIC_BACKEND_HOST}/auth/protected`,{
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