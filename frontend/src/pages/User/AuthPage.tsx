import React, { useState } from "react"

import AuthInputs from "../../components/AuthInputs/AuthInputs"
import { signIn , signUp } from "../../features/auth/authSlice"

import { useAppDispatch } from "../../redux/hooks"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import type { RootState } from "../../store/store"

const AuthPage : React.FC = () => {

  const navigate = useNavigate()

  const [isSignUp , setIsSignUp] = useState(true)

  const [ formData , setFormData ] = useState({
    name : '',
    email : '',
    password : '',
    confirmPassword : ''
  })

  const [errors , setErrors] = useState<{ [key : string] : string}>({})

  const dispatch = useAppDispatch()

  const { isFetchingUser   } = useSelector((state : RootState) => state.auth)
  const isLoading = isFetchingUser


  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const { name , value } = e.target
    setFormData({...formData , [name] : value})
  }

  const validateForm = () => {

    const newErrors : { [key : string] : string} = {}

    if(isSignUp && !formData.name.trim()){
      newErrors.name = 'Name is required!'
    }
    if(!formData.email){
      newErrors.email = 'Email is required'
    }
    if(!formData.password){
      newErrors.password = 'Password is required'
    }
    if(isSignUp && formData.password !== formData.confirmPassword){
      newErrors.confirmPassword = 'Passwords do not match!'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }


  const handleSubmit = async(e : React.FormEvent) => {
    e.preventDefault()

    if(!validateForm()) return 

    try {
      let result

      if(isSignUp) {
        result = await dispatch(
          signUp({
            name : formData.name,
            email : formData.email,
            password : formData.password
          })
        ).unwrap()
        
      }else{
        result = await dispatch(
          signIn({
            email : formData.email,
            password : formData.password
          })
        ).unwrap()
      }
      localStorage.setItem('token',result.token)

      navigate('/')
      
    } catch (error : any) {
      console.log('Auth Failed :',error)
    }
  }
 
    

  return (


      <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">{isSignUp ? 'Create an Account' : 'Sign in to your account'}</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
        
        { isSignUp &&
        <AuthInputs
        label='Name' name='name' type='text' placeholder='Enter your Name' 
        value={formData.name} onChange={handleChange} error={errors.name}
        />}

        <AuthInputs
        label='Email' name='email' type='email' placeholder='Enter your Email'
        value={formData.email} onChange={handleChange} error={errors.email}
        />

        <AuthInputs
        label='Password' name='password' type='password' placeholder='Enter Password'
        value={formData.password} onChange={handleChange} error={errors.password}
        />
        
        { isSignUp &&
        <AuthInputs
        label='Confirm Password' name='confirmPassword' type='password' placeholder='Re-enter Password'
        value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword}
        />}
         
          <button
            type="submit"
            className="w-full bg-gray-700 hover:bg-black text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            {isLoading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        {
            isSignUp ? 
            <p className="mt-4 text-sm text-center text-gray-600">
                Already have an account? <a onClick={() => setIsSignUp(false)} className="text-black hover:underline">Sign in</a>
            </p>
        :
            <p className="mt-4 text-sm text-center text-gray-600">
                Dont have an Account? <a onClick={() => setIsSignUp(true)} className="text-black hover:underline">Sign Up</a>
            </p>
        }
      </div>
    </div>
  )
}

export default AuthPage
