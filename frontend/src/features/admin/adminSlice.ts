import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";

import { login } from "./adminAPIs";

interface AuthState {
    admin : null | {name : string , email : string , token : string}
    isFetchingUsers :boolean,
    isCheckingAdmin : boolean
    error : string | null
}

const initialState : AuthState = {
    admin : null,
    isFetchingUsers : false,
    isCheckingAdmin : false,
    error : null
}


export const adminLogin = createAsyncThunk('/admin/login',
    async(credentials : {email : string , password : string} , {rejectWithValue}) => {
        try {
            return await login(credentials)
        } catch (error : any) {
            return rejectWithValue(error.response.data.message || "Login failed")
        }
    }
)



const adminSlice = createSlice({
    name : 'admin',
    initialState,
    reducers : {
        adminLogout : (state) => {
            state.admin = null
        }
    },
    extraReducers : (builder) => {
        builder
        .addCase(adminLogin.pending , (state) => {
            state.isCheckingAdmin = true,
            state.error = null
        })
        .addCase(adminLogin.fulfilled , (state , action) => {
            state.isCheckingAdmin = false,
            state.admin = action.payload
        })
        .addCase(adminLogin.rejected , (state , action) => {
            state.isCheckingAdmin = false,
            state.error = action.payload as string
        })
    }
})

export const { adminLogout } = adminSlice.actions
export default adminSlice.reducer
