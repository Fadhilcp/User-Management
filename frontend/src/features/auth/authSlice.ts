import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import { signUpAPI , signInAPI , getCurrentUserAPI , updateProfileAPI } from "./authAPIs";

interface AuthState {
    isLoggingOut : boolean,
    isUpdatingProfile : boolean,
    isFetchingUser : boolean
    user : any,
    error : string | null
}

const initialState : AuthState = {
    isLoggingOut : false,
    isUpdatingProfile : false,
    isFetchingUser : false,
    user : null,
    error : null
}

export const signUp = createAsyncThunk('auth/signUp',
    async (credential : {name : string , email : string , password : string} , {rejectWithValue} ) => {
        try {
            return await signUpAPI(credential)
        } catch (error : any) {
            return rejectWithValue(error.response?.data?.message || error.message || 'Something went wrong')
        }
    }
)

export const signIn = createAsyncThunk('auth/signIn',
    async (credential : {email : string , password : string}, {rejectWithValue}) => {
        try {
            return await signInAPI(credential)
        } catch (error : any) {
            return rejectWithValue(error.response?.data?.message || error.message || 'Something went wrong')
        }
    }
) 

export const getCurrentUser = createAsyncThunk('auth/getCurrentUser',

    async (_ , {rejectWithValue}) => {
        try {

            return await getCurrentUserAPI()
            
        } catch (error : any) {
            return rejectWithValue(error.response?.data?.message || error.message)
        }
    }
)

export const updateProfile = createAsyncThunk('auth/updateProfile',
    async (formData : FormData , {rejectWithValue}) => {
        try {
            return await updateProfileAPI(formData)
        } catch (error : any) {
            return rejectWithValue(error.response?.data?.message || error.message)
        }
    } 
)



const authSlice = createSlice({
    name : 'auth' , 
    initialState , 
    reducers : {
        logout(state) {
            state.user = null
            localStorage.removeItem('token')
        }
    },
    extraReducers : (builder) => {
        builder
        //for signUp
        .addCase(signUp.pending, (state) => {
            state.isFetchingUser = true
            state.error = null
        })
        .addCase(signUp.fulfilled , (state , action) => {
            state.isFetchingUser = false;
            state.user = action.payload;
            localStorage.setItem('token', action.payload.user.token);
        })
        .addCase(signUp.rejected, (state ,action) => {
            state.isFetchingUser = false
            state.error = action.payload as string
        })
        //for signIn
        .addCase(signIn.pending , (state) => {
            state.isFetchingUser = true
            state.error = null
        })
        .addCase(signIn.fulfilled , (state , action) => {
            state.isFetchingUser = false
            state.user = action.payload
        })
        .addCase(signIn.rejected , (state , action) => {
            state.isFetchingUser = false
            state.error = action.payload as string
        })
        //current user token
        .addCase(getCurrentUser.pending, (state) => {
            state.isFetchingUser = true;
            state.error = null;
        })
        .addCase(getCurrentUser.fulfilled, (state, action) => {
            state.isFetchingUser = false;
            state.user = action.payload ;
        })
        .addCase(getCurrentUser.rejected, (state, action) => {
            state.isFetchingUser = false;
            state.user = null;
            state.error = action.payload as string;
        })
        //update Profile
        .addCase(updateProfile.pending, (state) => {
            state.isUpdatingProfile = true;
            state.error = null;
        })
        .addCase(updateProfile.fulfilled, (state, action) => {
            state.isUpdatingProfile = false;
            state.user = action.payload ;
        })
        .addCase(updateProfile.rejected, (state, action) => {
            state.isUpdatingProfile = false;
            state.error = action.payload as string;
        })
    }
})

export const { logout } = authSlice.actions
export default authSlice.reducer