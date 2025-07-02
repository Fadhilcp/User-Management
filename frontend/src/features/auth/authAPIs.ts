
import axios from '../../api/axios'

export const signUpAPI = async( credential : {name : string , email : string , password : string} ) => {
        const response = await axios.post('/register',credential)
        return response.data
}

export const signInAPI = async(credential : {email : string , password : string} ) => {
        const response = await axios.post('/login',credential)
        return response.data
}

export const getCurrentUserAPI = async() => {
        const token = localStorage.getItem('token')

        const response = await axios.get('/verify',{
                headers : {
                        Authorization : `Bearer ${token}`
                }
        })
        return response.data
}


export const updateProfileAPI = async(formData : FormData) => {
        const token = localStorage.getItem('token')

        const response = await axios.put('/profile',formData , {
                headers : {
                        Authorization: `Bearer ${token}`,
                        'Content-Type' : 'multipart/form-data'
                }
        })
        return response.data
}