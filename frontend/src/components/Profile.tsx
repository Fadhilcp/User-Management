import { useSelector , useDispatch } from "react-redux"
import type { RootState } from "../store/store"
import type { AppDispatch } from "../store/store"
import React, { useState , useRef, useEffect} from "react"
import { updateProfile } from "../features/auth/authSlice"

const Profile : React.FC = () => {

    const user = useSelector((state : RootState) => state.auth.user?.user)

    const dispatch = useDispatch<AppDispatch>()

    const [name , setName] = useState(user?.name || '')
    const [email , setEmail] = useState(user?.email || '')
    const [photo , setPhoto] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string>('')

    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleImage = () => {
      fileInputRef.current?.click()
    }

    useEffect(() => {
      if(photo){

        const reader = new FileReader()

        reader.onloadend = () => {
          setPreviewUrl(reader.result as string)
        }
        reader.readAsDataURL(photo)
      }else{
        setPreviewUrl('')
      }
    }, [photo]);


    const handleSubmit = (e : React.FormEvent) => {
        e.preventDefault()    

        const formData = new FormData()

        formData.append('name',name)
        formData.append('email',email)
        if(photo) formData.append('photo',photo)

        dispatch(updateProfile(formData))
    }


  return (
    <>
    
  <h1 className="text-4xl font-bold text-gray-800 mb-4">Your Profile</h1>
  <p className="text-gray-600 mb-6">Update your personal information below.</p>
  <div className="w-full max-w-md bg-gray-100 shadow-md rounded-xl p-6">
    {/* Profile Photo Circle */}
    <div className="flex justify-center mb-2">
      <div className="w-28 h-28 rounded-full border-4 border-pink-500 overflow-hidden"
      onClick={handleImage}
      >
        <img
          src={previewUrl ||user?.photo ||  `https://ui-avatars.com/api/?name=${user?.name || "User"}`}
          alt="Profile"
          className="w-full h-full object-cover"
        />
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files?.[0] || null)}
          className="hidden"
        />
      </div>
  </div>
  <label className="block text-gray-700 font-medium mb-1">Profile Photo</label>

  
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <div>
        <label className="block text-gray-700 font-medium mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>


      <button
        type="submit"
        className="w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:shadow-md transition"
      >
        Save Changes
      </button> 
    </form>
  </div>
</>
  )
}

export default Profile
