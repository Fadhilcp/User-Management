import axios from "../../api/axios";


export const login = async (credentials : {email : string , password : string}) => {
    const response = await axios.post('/admin/login',credentials)
    return response.data
}