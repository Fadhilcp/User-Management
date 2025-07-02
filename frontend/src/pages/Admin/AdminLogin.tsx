import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { adminLogin } from "../../features/admin/adminSlice"
import type { AppDispatch } from "../../store/store"
import AuthInputs from "../../components/AuthInputs/AuthInputs"
import { useNavigate } from "react-router-dom"

const AdminLogin : React.FC = () => {


    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const [formData , setFormData] = useState({
        email : '',
        password : ''
    })

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {name , value} = e.target
        setFormData((prev) => ({...prev,[name]:value}))
    }

    const handleLogin = async(e : React.FormEvent ) => {
        e.preventDefault()

        try {
            const result = await dispatch(adminLogin(formData)).unwrap()
        
            if(result.token){
                localStorage.setItem('token',result.token)
                navigate('/dashboard')
            }
        } catch (error) {
            console.error("Login failed:", error)
        }
    }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Admin Panel</h2>
        <p className="text-center text-gray-500 mb-8">Login to manage the dashboard</p>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Field */}
          <AuthInputs type="email" label="Name" name="email" value={formData.email} onChange={handleChange} 
          placeholder="Enter Email" error=""/>

          {/* Password Field */}
          <AuthInputs type="password" label="Password" name="password" value={formData.password} onChange={handleChange}
          placeholder="Enter Password" error=""/>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin
