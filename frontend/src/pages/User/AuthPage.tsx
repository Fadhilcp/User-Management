import { useState } from "react"

import AuthInputs from "../../components/AuthInputs/AuthInputs"

const AuthPage = () => {

    const [isSignUp , setIsSignUp] = useState(true)

  return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">{isSignUp ? 'Create an Account' : 'Sign in to your account'}</h2>

        <form className="space-y-4">
        
        { isSignUp &&
        <AuthInputs
        label='Name' name='name' type='text' placeholder='Enter your Name'
        />}

        <AuthInputs
        label='Email' name='email' type='email' placeholder='Enter your Email'
        />

        <AuthInputs
        label='Password' name='password' type='password' placeholder='Enter Password'
        />
        
        { isSignUp &&
        <AuthInputs
        label='Confirm Password' name='confirmPassword' type='password' placeholder='Re-enter Password'
        />}
         
          <button
            type="submit"
            className="w-full bg-gray-700 hover:bg-black text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Sign Up
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
