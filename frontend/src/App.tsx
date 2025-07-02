import AuthPage from "./pages/User/AuthPage"
import Home from "./pages/User/Home"
import { BrowserRouter , Routes , Route } from "react-router-dom"
import { PublicRoute , UserProtectRoute , AdminPublicRoute , AdminProtectRoute} from "./routes/ProtectRoutes"
import { useEffect } from "react"
import { getCurrentUser } from "./features/auth/authSlice"
import { useAppDispatch } from "./redux/hooks"
import AdminLogin from "./pages/Admin/AdminLogin"
import Dashboard from "./pages/Admin/Dashboard"



const App : React.FC = () => {
  
  const dispatch = useAppDispatch()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token) {
      dispatch(getCurrentUser())
    }
  },[])

  return (
    <div>
     

        <BrowserRouter>

        <Routes>

          <Route element={<PublicRoute/>}>
             <Route path="/auth" element={<AuthPage/>}/>
          </Route>
          
          <Route element={<UserProtectRoute/>}>
            <Route path="/" element={<Home/>}/>
          </Route>

          <Route element={<AdminPublicRoute/>}>
            <Route path="/admin" element={<AdminLogin/>}/>
          </Route>

          <Route element={<AdminProtectRoute/>}>
          <Route path="/dashboard" element={<Dashboard/>}/>

          </Route>

        </Routes>

        </BrowserRouter>
    </div>
  )
}

export default App
