import { Navigate, Outlet } from "react-router-dom"
import { useUserStore } from "../../../service/useAuthStore"


export const GuestRoute = () => {
    const isAuthenticated = useUserStore((state) => state.isAuthenticated)
    return isAuthenticated ? <Navigate to="/" replace/> : <Outlet/>
}


export const PrivateRoute = () => {
    const isAuthenticated = useUserStore((state) => state.isAuthenticated)
    return isAuthenticated ? <Outlet/> : <Navigate to='/login' replace/>
}

