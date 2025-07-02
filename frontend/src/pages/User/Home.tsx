
import type { RootState } from "../../store/store"
import { useState } from "react"
import Profile from "../../components/Profile"
import { useSelector } from "react-redux"
import Navbar from "../../components/Navbar"


const Home : React.FC = () => {



  const { isFetchingUser, isUpdatingProfile } = useSelector((state : RootState) => state.auth)

  const user = useSelector((state: RootState) => state.auth.user?.user)

  const isLoading = isFetchingUser || isUpdatingProfile

  const [activeTab, setActiveTab] = useState("dashboard")





  return (

       <div className="min-h-screen flex flex-col bg-white">

        {/* Navbar */}
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab}/>
      

      {/* main content */}
      <div className="flex-grow flex flex-col items-center justify-center text-center px-8 py-12">
        {isLoading || !user ? (
          <div className="flex flex-col items-center justify-center h-full w-full">
              <svg
              className="w-8 h-8 text-blue-500 mb-2 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"
              ></circle>
              <path
                className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>

          <p className="text-base font-medium tracking-wide">Loading, please wait...</p>

      </div>
        ) 
        : activeTab === "dashboard" ? (
          // dashboard
          <>
           <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome, {user.name}</h1>
           <p className="text-gray-600 text-base">Email: {user.email}</p>
            <p className="text-gray-700 font-bold mb-6">
              You're now on the home page
            </p>
          </>
        ) : (

          // Profile
          <Profile/>

        )}
      </div>
    </div>

  )
}

export default Home
