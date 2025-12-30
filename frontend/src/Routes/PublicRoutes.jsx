import { useAuth } from '@/context/AuthContext'
import React from 'react'
import { Navigate } from 'react-router-dom'

export const PublicRoutes = ({children}) => {
 const { token } = useAuth(); 

    if(token){
        return <Navigate to="/dashboard" replace/>
    }
    else{
        return children
    }
}
