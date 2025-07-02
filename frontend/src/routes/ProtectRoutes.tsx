import { Navigate , Outlet } from "react-router-dom";

export const PublicRoute = () => {
    const token = localStorage.getItem('token')
    return token ? <Navigate to='/'/> : <Outlet/> 
}

export const UserProtectRoute = () => {
    const token = localStorage.getItem('token')
    return token ? <Outlet/> : <Navigate to='/auth'/>
}

export const AdminPublicRoute = () => {
    const token = localStorage.getItem('token')
    return token ? <Navigate to='/dashboard'/> : <Outlet/>
}

export const AdminProtectRoute = () => {
    const token = localStorage.getItem('token')
    return token ? <Outlet/> : <Navigate to='/admin'/>
}