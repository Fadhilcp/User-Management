
import { LogOut } from "lucide-react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logout } from "../features/auth/authSlice"

interface Props {
    activeTab : string,
    setActiveTab : (parm : string) => void
}

const Navbar : React.FC<Props> = ({activeTab , setActiveTab} : Props) => {

   const dispatch = useDispatch()
   const navigate = useNavigate()

    const handleLogOut = () => {
        dispatch(logout())
        navigate('/auth')
    }

  return (
    <>
      <nav className="w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white p-4 shadow-md flex items-center justify-between">
        <div className="text-xl font-semibold tracking-wide">My Dashboard</div>
        <div className="space-x-6 flex items-center">
          <button
            className={activeTab === "dashboard" ? "text-black font-semibold underline" : "hover:underline"}
            onClick={() => setActiveTab("dashboard")}
          >
            Dashboard
          </button>
          <button
            className={activeTab === "profile" ? "text-black font-semibold underline" : "hover:underline"}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>
          <button
            onClick={handleLogOut}
            className="flex items-center space-x-1 bg-white text-red-600 font-medium px-4 py-1 rounded hover:bg-gray-100 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </>
  )
}

export default Navbar
